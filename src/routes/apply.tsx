import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { persistFunnelState, startLead } from "@/lib/wws-funnel";
import { Field } from "@/components/forms/Field";
import { trackEvent, trackOnce } from "@/lib/analytics";
import { trackConversion } from "@/lib/conversions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/apply")({
  component: ApplyPage,
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    waitlist?: string;
    ref?: string;
    parent?: string;
  } => {
    const out: { waitlist?: string; ref?: string; parent?: string } = {};
    if (typeof search.waitlist === "string") out.waitlist = search.waitlist;
    if (typeof search.ref === "string") out.ref = search.ref;
    if (typeof search.parent === "string") out.parent = search.parent;
    return out;
  },
  head: () => ({
    meta: [
      { title: "Apply to Adopt — White Wolf Shepherds" },
      {
        name: "description",
        content: "Start your adoption journey: share your contact info, book a Family Fit Call, and reserve your spot for our White German Shepherd litter.",
      },
      { property: "og:title", content: "Apply to Adopt — White Wolf Shepherds" },
      {
        property: "og:description",
        content: "Start your adoption journey: share your contact info, book a Family Fit Call, and reserve your spot for our White German Shepherd litter.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/apply` },
      { property: "og:image", content: `${SITE_URL}/puppies/litter/litter-park-group-05.webp` },
      { name: "twitter:image", content: `${SITE_URL}/puppies/litter/litter-park-group-05.webp` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Apply to Adopt — White Wolf Shepherds" },
      {
        name: "twitter:description",
        content: "Start your adoption journey: share your contact info, book a Family Fit Call, and reserve your spot for our White German Shepherd litter.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/apply` }],
  }),
});

const applySchema = z.object({
  firstName: z.string().trim().min(1, "Please enter your first name").max(50, "Max 50 characters"),
  lastName: z.string().trim().min(1, "Please enter your last name").max(50, "Max 50 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email — that's where your portal link goes")
    .email("That doesn't look like a valid email address")
    .max(255),
  phone: z
    .string()
    .trim()
    .min(1, "Please enter a phone number")
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Enter a full 10-digit number"),
  city: z.string().trim().min(1, "Please enter your city").max(80),
  state: z.string().trim().min(1, "Please enter your state").max(40),
});

type ApplyValues = z.infer<typeof applySchema>;
type ApplyField = keyof ApplyValues;

function ApplyPage() {
  const { waitlist, ref, parent } = Route.useSearch();
  const navigate = useNavigate();
  const isWaitlist = waitlist === "true";

  const [busy, setBusy] = useState(false);
  const [values, setValues] = useState<ApplyValues>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    state: "",
  });
  const [errors, setErrors] = useState<Partial<Record<ApplyField, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<ApplyField, boolean>>>({});
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    if (ref) sessionStorage.setItem("wwreferral", ref);
  }, [ref]);

  useEffect(() => {
    trackOnce("apply_view", "form_view", { form: "apply", metadata: { waitlist: isWaitlist } });
  }, [isWaitlist]);

  function fieldError(name: ApplyField, next: ApplyValues) {
    const parsed = applySchema.safeParse(next);
    if (parsed.success) return undefined;
    return parsed.error.issues.find((i) => i.path[0] === name)?.message;
  }

  const setField = (name: ApplyField) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = { ...values, [name]: e.target.value };
    trackOnce("apply_start", "form_start", { form: "apply" });
    setValues(next);
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: fieldError(name, next) }));
  };

  const blurField = (name: ApplyField) => () => {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: fieldError(name, values) }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    const parsed = applySchema.safeParse(values);
    if (!parsed.success) {
      const next: Partial<Record<ApplyField, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as ApplyField;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setTouched({
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        city: true,
        state: true,
      });
      trackEvent("form_error", { form: "apply", metadata: { fields: Object.keys(next) } });
      const firstKey = Object.keys(next)[0];
      if (firstKey) document.getElementById(`apply-${firstKey}`)?.focus();
      return;
    }

    setBusy(true);
    try {
      const referralCode = sessionStorage.getItem("wwreferral") ?? null;
      const normalizedEmail = parsed.data.email.toLowerCase();
      const result = await startLead({
        firstName: parsed.data.firstName,
        lastName: parsed.data.lastName,
        email: normalizedEmail,
        phone: parsed.data.phone,
        city: parsed.data.city,
        state: parsed.data.state,
        referralCode,
        waitlist: isWaitlist,
      });

      trackEvent("generate_lead", {
        form: "apply",
        leadId: result.leadId,
        metadata: { waitlist: isWaitlist, state: parsed.data.state },
      });

      if (isWaitlist) {
        trackConversion("waitlist_signup", result.leadId);
      } else {
        trackConversion("application_submitted", result.leadId);
      }

      const name = `${parsed.data.firstName} ${parsed.data.lastName}`.trim();
      persistFunnelState({
        leadId: result.leadId,
        name,
        email: normalizedEmail,
        phone: parsed.data.phone,
      });

      if (isWaitlist) {
        sessionStorage.removeItem("wwreferral");
        navigate({ to: "/thank-you", search: { name: result.firstName } });
        return;
      }

      await supabase.auth.signInWithOtp({
        email: normalizedEmail,
        options: { emailRedirectTo: `${window.location.origin}/portal/onboarding` },
      });

      sessionStorage.removeItem("wwreferral");
      navigate({ to: "/portal/onboarding" });
    } catch (err) {
      trackEvent("form_error", { form: "apply", metadata: { reason: "server" } });
      setFormError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="bg-gradient-frost pt-28 pb-20 lg:pt-36">
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-foreground lg:text-4xl">
              {isWaitlist ? "Join the Waitlist" : "Let's Get Started"}
            </h1>
            <p className="mt-3 text-muted-foreground">
              {isWaitlist
                ? "Share your contact info and we'll reach out the moment a spot opens."
                : "Step 1 of 3 — takes about a minute. We'll email a secure link to your private puppy portal."}
            </p>
            {parent && (
              <p className="mt-2 text-sm font-medium text-accent">
                Inquiring about a puppy from {parent}
              </p>
            )}
          </div>

          <div className="mt-10 rounded-2xl bg-card p-8 shadow-card sm:p-10">
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <p className="text-xs text-muted-foreground">
                Fields marked <span className="text-destructive">*</span> are required.
              </p>

              {formError && (
                <div
                  role="alert"
                  className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm font-medium text-destructive"
                >
                  {formError}
                </div>
              )}

              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="apply-firstName" label="First name" required error={errors.firstName}>
                  {(p) => (
                    <input
                      {...p}
                      type="text"
                      value={values.firstName}
                      onChange={setField("firstName")}
                      onBlur={blurField("firstName")}
                      autoComplete="given-name"
                      placeholder="John"
                    />
                  )}
                </Field>
                <Field id="apply-lastName" label="Last name" required error={errors.lastName}>
                  {(p) => (
                    <input
                      {...p}
                      type="text"
                      value={values.lastName}
                      onChange={setField("lastName")}
                      onBlur={blurField("lastName")}
                      autoComplete="family-name"
                      placeholder="Doe"
                    />
                  )}
                </Field>
              </div>

              <Field
                id="apply-email"
                label="Email"
                required
                error={errors.email}
                hint="We'll email you a secure sign-in link — no password required."
              >
                {(p) => (
                  <input
                    {...p}
                    type="email"
                    inputMode="email"
                    value={values.email}
                    onChange={setField("email")}
                    onBlur={blurField("email")}
                    autoComplete="email"
                    placeholder="john@example.com"
                  />
                )}
              </Field>

              <Field
                id="apply-phone"
                label="Phone"
                required
                error={errors.phone}
                hint="Used only for your Family Fit Call — never shared."
              >
                {(p) => (
                  <input
                    {...p}
                    type="tel"
                    inputMode="tel"
                    value={values.phone}
                    onChange={setField("phone")}
                    onBlur={blurField("phone")}
                    autoComplete="tel"
                    placeholder="(555) 123-4567"
                  />
                )}
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field id="apply-city" label="City" required error={errors.city}>
                  {(p) => (
                    <input
                      {...p}
                      type="text"
                      value={values.city}
                      onChange={setField("city")}
                      onBlur={blurField("city")}
                      autoComplete="address-level2"
                      placeholder="Charlotte"
                    />
                  )}
                </Field>
                <Field id="apply-state" label="State" required error={errors.state}>
                  {(p) => (
                    <input
                      {...p}
                      type="text"
                      value={values.state}
                      onChange={setField("state")}
                      onBlur={blurField("state")}
                      autoComplete="address-level1"
                      placeholder="NC"
                    />
                  )}
                </Field>
              </div>

              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-xl bg-accent py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110 disabled:opacity-50"
              >
                {busy
                  ? "Saving…"
                  : isWaitlist
                    ? "Claim My Spot on the Waitlist →"
                    : "Reserve My Place in Line →"}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                No deposit required at this step · Your info stays private
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

