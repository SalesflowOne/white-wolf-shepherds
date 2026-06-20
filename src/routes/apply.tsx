import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase, T } from "@/integrations/supabase/client";
import {
  startLead,
  markMatchCallBooked,
  submitApplicationDetails,
} from "@/lib/wws-actions.functions";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GhlCalendarEmbed from "@/components/GhlCalendarEmbed";

type AvailablePuppy = {
  id: string;
  name: string;
  tier: string | null;
  price: number | null;
};

const MATCH_CALL_URL = import.meta.env.VITE_PUBLIC_GHL_MATCH_CALL_URL as string | undefined;
const RESERVATION_LINK = import.meta.env.VITE_PUBLIC_STRIPE_RESERVATION_LINK as string | undefined;

const TOTAL_STEPS = 4;

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
      { title: "Meet the Puppies — White Wolf Shepherds" },
      {
        name: "description",
        content:
          "Start your Puppy Match: share your contact info, book a Puppy Match Call, and reserve your spot for our White German Shepherd litter.",
      },
    ],
  }),
});

function ApplyPage() {
  const { waitlist, ref, parent } = Route.useSearch();
  const navigate = useNavigate();
  const isWaitlist = waitlist === "true";

  const [step, setStep] = useState(1);
  const [busy, setBusy] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [availablePuppies, setAvailablePuppies] = useState<AvailablePuppy[]>([]);

  // Stage 1 — Contact
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  // Stage 3 — Application
  const [preferredSex, setPreferredSex] = useState<"male" | "female" | "either">("either");
  const [timeline, setTimeline] = useState<"" | "ready_now" | "1_3_months" | "future">("");
  const [hasOwnedLargeDog, setHasOwnedLargeDog] = useState<"" | "yes" | "no">("");
  const [readyForDeposit, setReadyForDeposit] = useState<"" | "yes" | "no" | "info">("");
  const [householdType, setHouseholdType] = useState("");
  const [hasFencedYard, setHasFencedYard] = useState<"" | "yes" | "no" | "in_progress">("");
  const [familySize, setFamilySize] = useState<number | "">("");
  const [childrenAges, setChildrenAges] = useState("");
  const [otherPets, setOtherPets] = useState("");
  const [preferredPuppyId, setPreferredPuppyId] = useState("");
  const [reasonForBreed, setReasonForBreed] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState(
    parent ? `Inquiry about parent dog: ${parent}` : "",
  );
  const [source, setSource] = useState("");

  const [contactErrors, setContactErrors] = useState<string[]>([]);
  const [appErrors, setAppErrors] = useState<string[]>([]);

  // Referral capture
  useEffect(() => {
    if (ref) sessionStorage.setItem("wwreferral", ref);
  }, [ref]);

  // Load available puppies for the application select
  useEffect(() => {
    async function fetchPuppies() {
      const { data } = await supabase
        .from(T.puppies)
        .select("id, name, tier, price")
        .eq("status", "available")
        .order("priority_order", { ascending: true });
      if (data) setAvailablePuppies(data as AvailablePuppy[]);
    }
    fetchPuppies();
  }, []);

  function validateContact(): boolean {
    const errs: string[] = [];
    if (!fullName.trim()) errs.push("Full name is required");
    if (!email.trim() || !email.includes("@")) errs.push("A valid email is required");
    if (!phone.trim()) errs.push("Phone is required");
    if (!city.trim()) errs.push("City is required");
    if (!state.trim()) errs.push("State is required");
    setContactErrors(errs);
    return errs.length === 0;
  }

  function validateApplication(): boolean {
    const errs: string[] = [];
    if (!timeline) errs.push("Timeline is required");
    if (!hasOwnedLargeDog) errs.push("Large dog experience is required");
    if (!readyForDeposit) errs.push("Reservation readiness is required");
    if (!householdType) errs.push("Household type is required");
    if (!hasFencedYard) errs.push("Fenced yard status is required");
    if (!familySize || familySize < 1) errs.push("Family size is required");
    if (!reasonForBreed.trim() || reasonForBreed.trim().length < 50)
      errs.push("Please share at least 50 characters about why you want this breed");
    if (!source) errs.push("How you heard about us is required");
    setAppErrors(errs);
    return errs.length === 0;
  }

  function persistFunnel(id: string) {
    try {
      localStorage.setItem(
        "wws_funnel",
        JSON.stringify({
          leadId: id,
          name: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
        }),
      );
    } catch {
      /* ignore storage failures */
    }
  }

  async function handleContactContinue() {
    if (!validateContact()) return;
    setBusy(true);
    try {
      const referralCode = sessionStorage.getItem("wwreferral") ?? null;
      const result = await startLead({
        data: {
          fullName: fullName.trim(),
          email: email.trim().toLowerCase(),
          phone: phone.trim(),
          city: city.trim(),
          state: state.trim(),
          referralCode,
          waitlist: isWaitlist,
        },
      });
      setLeadId(result.leadId);
      persistFunnel(result.leadId);

      if (isWaitlist) {
        sessionStorage.removeItem("wwreferral");
        navigate({ to: "/thank-you", search: { name: result.firstName } });
        return;
      }
      setStep(2);
      window.scrollTo(0, 0);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setContactErrors([`We couldn't save your info: ${msg}`]);
    } finally {
      setBusy(false);
    }
  }

  async function handleMatchCallBooked() {
    if (leadId) {
      try {
        await markMatchCallBooked({ data: { leadId } });
      } catch {
        /* non-blocking — don't trap the applicant if the marker write fails */
      }
    }
    setStep(3);
    window.scrollTo(0, 0);
  }

  async function handleApplicationSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateApplication()) return;
    if (!leadId) {
      setAppErrors(["Your session expired. Please start again from your contact info."]);
      setStep(1);
      return;
    }
    setBusy(true);
    try {
      await submitApplicationDetails({
        data: {
          leadId,
          preferredSex,
          timeline: timeline as "ready_now" | "1_3_months" | "future",
          hasOwnedLargeDog: hasOwnedLargeDog === "yes",
          readyForDeposit: readyForDeposit as "yes" | "no" | "info",
          householdType,
          hasFencedYard: hasFencedYard as "yes" | "no" | "in_progress",
          familySize: typeof familySize === "number" ? familySize : 1,
          childrenAges: childrenAges.trim() || null,
          otherPets: otherPets.trim() || null,
          preferredPuppyId: preferredPuppyId || null,
          reasonForBreed: reasonForBreed.trim(),
          additionalNotes: additionalNotes.trim() || null,
          source,
        },
      });
      sessionStorage.removeItem("wwreferral");
      setStep(4);
      window.scrollTo(0, 0);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Submission failed.";
      setAppErrors([`There was an error submitting your application: ${msg}`]);
    } finally {
      setBusy(false);
    }
  }

  function depositHref(): string {
    if (!RESERVATION_LINK) return "#";
    try {
      const url = new URL(RESERVATION_LINK);
      if (leadId) url.searchParams.set("client_reference_id", leadId);
      if (email.trim()) url.searchParams.set("prefilled_email", email.trim().toLowerCase());
      return url.toString();
    } catch {
      return RESERVATION_LINK;
    }
  }

  const tierLabel = (tier: string | null) =>
    tier === "premier" ? "Premier" : tier === "preferred" ? "Preferred" : "Companion";

  const charCount = reasonForBreed.trim().length;

  const stepTitle =
    step === 1
      ? isWaitlist
        ? "Join the Waitlist"
        : "Let's Start Your Puppy Match"
      : step === 2
        ? "Book Your Puppy Match Call"
        : step === 3
          ? "Your Application"
          : "Reserve Your Spot";

  const stepSubtitle =
    step === 1
      ? "Start with your contact info — it takes less than a minute."
      : step === 2
        ? "A short, friendly call so we can get to know you and answer your questions."
        : step === 3
          ? "Tell us a little more about your home so we can find the right match."
          : "Place your fully-refundable $500 deposit to hold your spot in line.";

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-gradient-frost pt-28 pb-20 lg:pt-36">
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-foreground lg:text-4xl">
              {stepTitle}
            </h1>
            <p className="mt-3 text-muted-foreground">{stepSubtitle}</p>
          </div>

          {/* Progress */}
          {!isWaitlist && (
            <div className="mt-10">
              <div className="flex items-center justify-between text-sm font-medium">
                <span className="text-accent">
                  Step {step} of {TOTAL_STEPS}
                </span>
                <span className="text-muted-foreground">
                  {step === 1
                    ? "Contact"
                    : step === 2
                      ? "Match Call"
                      : step === 3
                        ? "Application"
                        : "Deposit"}
                </span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-300"
                  style={{ width: `${(step / TOTAL_STEPS) * 100}%` }}
                />
              </div>
            </div>
          )}

          <div className="mt-10 rounded-2xl bg-card p-8 shadow-card sm:p-10">
            {/* ── Stage 1: Contact ── */}
            {step === 1 && (
              <div className="space-y-6">
                {contactErrors.length > 0 && <ErrorList errors={contactErrors} />}

                <Field label="Full Name *">
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className={inputCls}
                    placeholder="John Smith"
                  />
                </Field>

                <Field label="Email *">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputCls}
                    placeholder="john@example.com"
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    We'll use this to create your portal account and send you a magic link — no
                    password required.
                  </p>
                </Field>

                <Field label="Phone *">
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputCls}
                    placeholder="(555) 123-4567"
                  />
                </Field>

                <div className="grid grid-cols-2 gap-4">
                  <Field label="City *">
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className={inputCls}
                      placeholder="Nashville"
                    />
                  </Field>
                  <Field label="State *">
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className={inputCls}
                      placeholder="TN"
                    />
                  </Field>
                </div>

                <button
                  type="button"
                  onClick={handleContactContinue}
                  disabled={busy}
                  className="mt-2 w-full rounded-xl bg-accent py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {busy ? "Saving..." : isWaitlist ? "Join the Waitlist →" : "Continue →"}
                </button>
              </div>
            )}

            {/* ── Stage 2: Puppy Match Call ── */}
            {step === 2 && (
              <div className="space-y-6">
                <p className="text-sm text-muted-foreground">
                  Pick a time that works for you below. Once you've booked, tap
                  <span className="font-medium text-foreground"> continue</span> to finish your
                  application.
                </p>
                <GhlCalendarEmbed
                  src={MATCH_CALL_URL}
                  prefill={{ name: fullName, email, phone }}
                  onBooked={handleMatchCallBooked}
                  continueLabel="I've booked my call — continue →"
                />
                <button
                  type="button"
                  onClick={() => {
                    setStep(1);
                    window.scrollTo(0, 0);
                  }}
                  className="w-full rounded-xl border border-border py-3 text-sm font-bold uppercase tracking-wider text-foreground transition-all hover:bg-muted"
                >
                  ← Back
                </button>
              </div>
            )}

            {/* ── Stage 3: Application ── */}
            {step === 3 && (
              <form onSubmit={handleApplicationSubmit} className="space-y-6">
                {appErrors.length > 0 && <ErrorList errors={appErrors} />}

                <Field label="Preferred Sex">
                  <RadioRow
                    name="preferredSex"
                    value={preferredSex}
                    onChange={(v) => setPreferredSex(v as "male" | "female" | "either")}
                    options={[
                      { v: "male", l: "Male" },
                      { v: "female", l: "Female" },
                      { v: "either", l: "Either" },
                    ]}
                  />
                </Field>

                <Field label="Timeline *">
                  <RadioStack
                    name="timeline"
                    value={timeline}
                    onChange={(v) => setTimeline(v as typeof timeline)}
                    options={[
                      { v: "ready_now", l: "Ready now (0–30 days)" },
                      { v: "1_3_months", l: "1–3 months" },
                      { v: "future", l: "Future litter" },
                    ]}
                  />
                </Field>

                <Field label="Have you owned a large breed dog before? *">
                  <RadioRow
                    name="hasOwnedLargeDog"
                    value={hasOwnedLargeDog}
                    onChange={(v) => setHasOwnedLargeDog(v as "yes" | "no")}
                    options={[
                      { v: "yes", l: "Yes" },
                      { v: "no", l: "No" },
                    ]}
                  />
                </Field>

                <Field label="Are you ready to place a refundable Reservation Fee? *">
                  <RadioStack
                    name="readyForDeposit"
                    value={readyForDeposit}
                    onChange={(v) => setReadyForDeposit(v as typeof readyForDeposit)}
                    options={[
                      { v: "yes", l: "Yes, ready" },
                      { v: "no", l: "Not yet" },
                      { v: "info", l: "Need more information" },
                    ]}
                  />
                </Field>

                <Field label="Household Type *">
                  <SelectInput
                    value={householdType}
                    onChange={setHouseholdType}
                    options={[
                      { v: "", l: "Select..." },
                      { v: "house", l: "House" },
                      { v: "apartment", l: "Apartment" },
                      { v: "farm", l: "Farm" },
                      { v: "other", l: "Other" },
                    ]}
                  />
                </Field>

                <Field label="Do you have a fenced yard? *">
                  <RadioRow
                    name="fencedYard"
                    value={hasFencedYard}
                    onChange={(v) => setHasFencedYard(v as typeof hasFencedYard)}
                    options={[
                      { v: "yes", l: "Yes" },
                      { v: "no", l: "No" },
                      { v: "in_progress", l: "In progress" },
                    ]}
                  />
                </Field>

                <Field label="Family Size *">
                  <input
                    type="number"
                    min={1}
                    value={familySize}
                    onChange={(e) => setFamilySize(e.target.value ? parseInt(e.target.value) : "")}
                    className={inputCls}
                    placeholder="4"
                  />
                </Field>

                <Field label="Children's Ages (if applicable)">
                  <input
                    type="text"
                    value={childrenAges}
                    onChange={(e) => setChildrenAges(e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 6, 10"
                  />
                </Field>

                <Field label="Other Pets">
                  <input
                    type="text"
                    value={otherPets}
                    onChange={(e) => setOtherPets(e.target.value)}
                    className={inputCls}
                    placeholder="e.g. 2 cats, 1 dog"
                  />
                </Field>

                <Field label="Preferred Puppy">
                  <SelectInput
                    value={preferredPuppyId}
                    onChange={setPreferredPuppyId}
                    options={[
                      { v: "", l: "No preference" },
                      ...availablePuppies.map((p) => ({
                        v: p.id,
                        l: `${p.name} — ${tierLabel(p.tier)} — $${p.price?.toLocaleString()}`,
                      })),
                    ]}
                  />
                </Field>

                <Field label="Why a White German Shepherd for your family? *">
                  <textarea
                    value={reasonForBreed}
                    onChange={(e) => setReasonForBreed(e.target.value)}
                    rows={4}
                    className={inputCls}
                    placeholder="Tell us about your home, lifestyle, and what you're looking for in a companion."
                  />
                  <p
                    className={`mt-1 text-xs ${
                      charCount >= 50 ? "text-green-600" : "text-muted-foreground"
                    }`}
                  >
                    {charCount} / 50 minimum
                  </p>
                </Field>

                <Field label="Additional Notes">
                  <textarea
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    rows={3}
                    className={inputCls}
                    placeholder="Anything else we should know?"
                  />
                </Field>

                <Field label="How did you hear about us? *">
                  <SelectInput
                    value={source}
                    onChange={setSource}
                    options={[
                      { v: "", l: "Select..." },
                      { v: "google", l: "Google" },
                      { v: "instagram", l: "Instagram" },
                      { v: "facebook", l: "Facebook" },
                      { v: "referral", l: "Referral" },
                      { v: "breeder_directory", l: "Breeder Directory" },
                      { v: "tiktok", l: "TikTok" },
                      { v: "other", l: "Other" },
                    ]}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={busy}
                  className="w-full rounded-xl bg-accent py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {busy ? "Submitting..." : "Submit Application →"}
                </button>
              </form>
            )}

            {/* ── Stage 4: Refundable Deposit ── */}
            {step === 4 && (
              <div className="space-y-6 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent/10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-7 w-7 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Application received — let's hold your spot
                </h2>
                <p className="text-muted-foreground">
                  Your{" "}
                  <span className="font-semibold text-foreground">
                    $500 deposit is fully refundable
                  </span>{" "}
                  and simply holds your place in line. It isn't tied to a specific puppy — you'll
                  choose your puppy with us on your private video call.
                </p>
                <ul className="mx-auto max-w-sm space-y-2 text-left text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span> Fully refundable, no obligation
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span> Holds your spot in line for this litter
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent">✓</span> Unlocks your private puppy video call
                  </li>
                </ul>
                <a
                  href={depositHref()}
                  className="block w-full rounded-xl bg-accent py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110"
                >
                  Place $500 Refundable Deposit →
                </a>
                {!RESERVATION_LINK && (
                  <p className="text-xs text-muted-foreground">
                    (Reservation payment link isn't configured yet.)
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* ── Tiny helper components ── */

const inputCls =
  "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20";

function ErrorList({ errors }: { errors: string[] }) {
  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
      <ul className="list-inside list-disc text-sm text-red-700">
        {errors.map((err) => (
          <li key={err}>{err}</li>
        ))}
      </ul>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-foreground">{label}</label>
      {children}
    </div>
  );
}

function RadioRow({
  name,
  value,
  onChange,
  options,
}: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { v: string; l: string }[];
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <label
          key={o.v}
          className={`cursor-pointer rounded-lg border px-4 py-2 text-sm transition-colors ${
            value === o.v
              ? "border-accent bg-accent/10 text-accent"
              : "border-border text-foreground hover:bg-muted"
          }`}
        >
          <input
            type="radio"
            name={name}
            value={o.v}
            checked={value === o.v}
            onChange={() => onChange(o.v)}
            className="sr-only"
          />
          {o.l}
        </label>
      ))}
    </div>
  );
}

function RadioStack(props: {
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { v: string; l: string }[];
}) {
  return (
    <div className="space-y-2">
      {props.options.map((o) => (
        <label
          key={o.v}
          className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
            props.value === o.v
              ? "border-accent bg-accent/10 text-accent"
              : "border-border text-foreground hover:bg-muted"
          }`}
        >
          <input
            type="radio"
            name={props.name}
            value={o.v}
            checked={props.value === o.v}
            onChange={() => props.onChange(o.v)}
          />
          <span>{o.l}</span>
        </label>
      ))}
    </div>
  );
}

function SelectInput({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { v: string; l: string }[];
}) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className={inputCls}>
      {options.map((o) => (
        <option key={o.v} value={o.v}>
          {o.l}
        </option>
      ))}
    </select>
  );
}
