import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { persistFunnelState, startLead } from "@/lib/wws-funnel";
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

const inputCls =
  "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20";

function ApplyPage() {
  const { waitlist, ref, parent } = Route.useSearch();
  const navigate = useNavigate();
  const isWaitlist = waitlist === "true";

  const [busy, setBusy] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    if (ref) sessionStorage.setItem("wwreferral", ref);
  }, [ref]);

  function validate(): boolean {
    const errs: string[] = [];
    if (!firstName.trim()) errs.push("First name is required");
    if (!lastName.trim()) errs.push("Last name is required");
    if (!email.trim() || !email.includes("@")) errs.push("A valid email is required");
    if (!phone.trim()) errs.push("Phone is required");
    if (!city.trim()) errs.push("City is required");
    if (!state.trim()) errs.push("State is required");
    setErrors(errs);
    return errs.length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setBusy(true);
    try {
      const referralCode = sessionStorage.getItem("wwreferral") ?? null;
      const normalizedEmail = email.trim().toLowerCase();
      const result = await startLead({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: normalizedEmail,
        phone: phone.trim(),
        city: city.trim(),
        state: state.trim(),
        referralCode,
        waitlist: isWaitlist,
      });

      const name = `${firstName.trim()} ${lastName.trim()}`.trim();
      persistFunnelState({
        leadId: result.leadId,
        name,
        email: normalizedEmail,
        phone: phone.trim(),
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
      setErrors([err instanceof Error ? err.message : "Something went wrong."]);
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
                ? "Share your contact info and we'll reach out when a spot opens."
                : "Start with your contact info — we'll send a magic link to your portal to continue."}
            </p>
          </div>

          <div className="mt-10 rounded-2xl bg-card p-8 shadow-card sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.length > 0 && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                  <ul className="list-inside list-disc text-sm text-red-700">
                    {errors.map((err) => (
                      <li key={err}>{err}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">First Name *</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className={inputCls}
                    autoComplete="given-name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">Last Name *</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className={inputCls}
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={inputCls}
                />
                <p className="mt-1 text-xs text-muted-foreground">
                  We'll email you a magic link — no password required.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Phone *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-sm font-medium">City *</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className={inputCls}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium">State *</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className={inputCls}
                  />
                </div>
              </div>

              {parent && <input type="hidden" name="parent" value={parent} readOnly aria-hidden />}

              <button
                type="submit"
                disabled={busy}
                className="w-full rounded-xl bg-accent py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground disabled:opacity-50"
              >
                {busy ? "Saving..." : isWaitlist ? "Join Waitlist →" : "Continue to Portal →"}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
