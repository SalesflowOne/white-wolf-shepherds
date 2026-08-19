import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TrustStrip from "@/components/TrustStrip";
import CollarBadge from "@/components/CollarBadge";
import SmartImage from "@/components/SmartImage";
import StatusBadge from "@/components/StatusBadge";
import { supabase, T } from "@/integrations/supabase/client";
import { PRICING, SITE_URL, formatUSD } from "@/lib/site";
import { persistFunnelState, startLead, submitApplicationDetails } from "@/lib/wws-funnel";
import { trackEvent, trackOnce } from "@/lib/analytics";

const STEPS = ["puppy", "home", "contact", "done"] as const;
type Step = (typeof STEPS)[number];

const STORAGE_KEY = "wws_get_started";

type Answers = {
  puppy: string;
  preferredSex: "male" | "female" | "either";
  timeline: "ready_now" | "1_3_months" | "future";
  householdType: string;
  hasFencedYard: "yes" | "no" | "in_progress";
  familySize: string;
  childrenAges: string;
  otherPets: string;
  hasOwnedLargeDog: "yes" | "no";
  readyForDeposit: "yes" | "no" | "info";
  reasonForBreed: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  preferredContact: "text" | "call" | "email";
};

const EMPTY: Answers = {
  puppy: "",
  preferredSex: "either",
  timeline: "ready_now",
  householdType: "",
  hasFencedYard: "yes",
  familySize: "2",
  childrenAges: "",
  otherPets: "",
  hasOwnedLargeDog: "yes",
  readyForDeposit: "yes",
  reasonForBreed: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  state: "",
  preferredContact: "text",
};

type PuppyRow = {
  id: string;
  name: string;
  slug: string | null;
  sex: string | null;
  status: string | null;
  image_url: string | null;
  collar_color: string | null;
  price: number | null;
};

export const Route = createFileRoute("/get-started")({
  component: GetStartedPage,
  validateSearch: (search: Record<string, unknown>): { step?: Step; puppy?: string } => {
    const out: { step?: Step; puppy?: string } = {};
    if (typeof search.step === "string" && (STEPS as readonly string[]).includes(search.step)) {
      out.step = search.step as Step;
    }
    if (typeof search.puppy === "string" && search.puppy) out.puppy = search.puppy;
    return out;
  },
  head: () => ({
    meta: [
      { title: "Let's Get Started — Reserve a White Wolf Shepherds Puppy" },
      {
        name: "description",
        content:
          "Three quick steps: pick your puppy, tell us about your home, and send your details. We reply within one business day with next steps and deposit info.",
      },
      { property: "og:title", content: "Let's Get Started — White Wolf Shepherds" },
      {
        property: "og:description",
        content:
          "Pick your puppy, tell us about your home, and reserve. $2,000 all-in, $500 refundable deposit.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/get-started` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/get-started` }],
  }),
});

const inputCls =
  "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/30";

function GetStartedPage() {
  const { step = "puppy", puppy: puppyParam } = Route.useSearch();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [puppies, setPuppies] = useState<PuppyRow[]>([]);
  const [loadingPuppies, setLoadingPuppies] = useState(true);
  const [errors, setErrors] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    trackOnce("get_started_view", "form_view", { form: "get_started", step: "puppy" });
  }, []);

  // Restore answers on mount (survives refresh / back-forward).
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setAnswers((prev) => ({ ...prev, ...(JSON.parse(raw) as Partial<Answers>) }));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (puppyParam) setAnswers((prev) => ({ ...prev, puppy: puppyParam }));
  }, [puppyParam]);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
    } catch {
      /* ignore */
    }
  }, [answers]);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase
        .from(T.puppies)
        .select("id,name,slug,sex,status,image_url,collar_color,price")
        .neq("status", "parent")
        .order("priority_order", { ascending: true });
      if (!active) return;
      setPuppies((data ?? []) as PuppyRow[]);
      setLoadingPuppies(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const selected = useMemo(
    () => puppies.find((p) => p.slug === answers.puppy) ?? null,
    [puppies, answers.puppy],
  );
  const availableCount = puppies.filter((p) => p.status === "available").length;

  function set<K extends keyof Answers>(key: K, value: Answers[K]) {
    trackOnce("get_started_start", "form_start", { form: "get_started" });
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function goto(next: Step) {
    setErrors([]);
    if (next !== "done") trackEvent("form_step", { form: "get_started", step: next });
    navigate({
      to: "/get-started",
      search: { step: next, puppy: answers.puppy || undefined },
    });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function validateHome(): boolean {
    const errs: string[] = [];
    if (!answers.householdType.trim()) errs.push("Tell us about your household.");
    if (!answers.familySize.trim() || Number(answers.familySize) < 1)
      errs.push("Household size must be at least 1.");
    if (answers.reasonForBreed.trim().length < 50)
      errs.push("Please write at least 50 characters about why this breed fits your family.");
    setErrors(errs);
    return errs.length === 0;
  }

  function validateContact(): boolean {
    const errs: string[] = [];
    if (!answers.firstName.trim()) errs.push("First name is required.");
    if (!answers.lastName.trim()) errs.push("Last name is required.");
    if (!answers.email.includes("@")) errs.push("A valid email is required.");
    if (!answers.phone.trim()) errs.push("Phone is required.");
    if (!answers.city.trim()) errs.push("City is required.");
    if (!answers.state.trim()) errs.push("State is required.");
    setErrors(errs);
    return errs.length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateContact()) return;
    setBusy(true);
    try {
      const email = answers.email.trim().toLowerCase();
      const lead = await startLead({
        firstName: answers.firstName.trim(),
        lastName: answers.lastName.trim(),
        email,
        phone: answers.phone.trim(),
        city: answers.city.trim(),
        state: answers.state.trim(),
        source: "get_started",
      });

      persistFunnelState({
        leadId: lead.leadId,
        name: `${answers.firstName.trim()} ${answers.lastName.trim()}`.trim(),
        email,
        phone: answers.phone.trim(),
      });

      try {
        await submitApplicationDetails({
          leadId: lead.leadId,
          preferredSex: answers.preferredSex,
          timeline: answers.timeline,
          hasOwnedLargeDog: answers.hasOwnedLargeDog === "yes",
          readyForDeposit: answers.readyForDeposit,
          householdType: answers.householdType.trim(),
          hasFencedYard: answers.hasFencedYard,
          familySize: Number(answers.familySize) || 1,
          childrenAges: answers.childrenAges.trim() || null,
          otherPets: answers.otherPets.trim() || null,
          preferredPuppyId: selected?.id ?? null,
          reasonForBreed: answers.reasonForBreed.trim(),
          additionalNotes: `Preferred contact: ${answers.preferredContact}${
            selected ? ` · Interested in ${selected.name}` : ""
          }`,
          source: "get_started",
        });
      } catch {
        /* contact captured — details can be completed in the portal */
      }

      trackEvent("generate_lead", {
        form: "get_started",
        leadId: lead.leadId,
        metadata: { puppy: selected?.name ?? null, state: answers.state.trim() },
      });
      goto("done");
    } catch (err) {
      trackEvent("form_error", { form: "get_started", metadata: { reason: "server" } });
      setErrors([err instanceof Error ? err.message : "Something went wrong. Please try again."]);
    } finally {
      setBusy(false);
    }
  }

  const stepIndex = STEPS.indexOf(step);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main id="main" className="bg-gradient-frost pb-24 pt-28 lg:pt-36">
        <div className="mx-auto max-w-4xl px-6">
          <header className="text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {availableCount > 0
                ? `${availableCount} puppies still available`
                : "Next litter forming"}
            </p>
            <h1 className="mt-3 font-display text-4xl font-bold text-foreground lg:text-5xl">
              {step === "done" ? "You're on the list" : "Let's Get Started"}
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {step === "done"
                ? "Your details are with us. Here's exactly what happens next."
                : `Three short steps — about two minutes. ${formatUSD(PRICING.price)} all-in, ${formatUSD(
                    PRICING.deposit,
                  )} refundable deposit holds your puppy.`}
            </p>
          </header>

          {step !== "done" && <Progress index={stepIndex} />}

          {errors.length > 0 && (
            <div
              role="alert"
              aria-live="polite"
              className="mx-auto mt-8 max-w-2xl rounded-xl border border-destructive/30 bg-destructive/10 p-4"
            >
              <p className="text-sm font-semibold text-destructive">
                Please fix the following before continuing:
              </p>
              <ul className="mt-2 list-inside list-disc text-sm text-destructive">
                {errors.map((err) => (
                  <li key={err}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-10 rounded-2xl bg-card p-6 shadow-card sm:p-10">
            {step === "puppy" && (
              <StepPuppy
                puppies={puppies}
                loading={loadingPuppies}
                value={answers.puppy}
                onSelect={(slug) => set("puppy", slug)}
                onNext={() => goto("home")}
              />
            )}

            {step === "home" && (
              <StepHome
                answers={answers}
                set={set}
                onBack={() => goto("puppy")}
                onNext={() => validateHome() && goto("contact")}
              />
            )}

            {step === "contact" && (
              <StepContact
                answers={answers}
                set={set}
                busy={busy}
                selectedName={selected?.name ?? null}
                onBack={() => goto("home")}
                onSubmit={handleSubmit}
              />
            )}

            {step === "done" && <StepDone name={answers.firstName} puppyName={selected?.name ?? null} />}
          </div>

          <div className="mt-10">
            <TrustStrip />
          </div>

          {step !== "done" && (
            <p className="mt-8 text-center text-sm text-muted-foreground">
              Not ready to apply?{" "}
              <Link to="/waitlist" className="font-semibold text-accent hover:underline">
                Join the waitlist for the next litter
              </Link>
              .
            </p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

function Progress({ index }: { index: number }) {
  const labels = ["Pick your puppy", "About your home", "Your details"];
  return (
    <ol className="mx-auto mt-10 flex max-w-2xl items-center gap-3" aria-label="Progress">
      {labels.map((label, i) => {
        const state = i < index ? "done" : i === index ? "current" : "todo";
        return (
          <li key={label} className="flex flex-1 flex-col gap-2">
            <span
              className={`h-1.5 rounded-full ${
                state === "todo" ? "bg-border" : "bg-accent"
              } transition-colors motion-reduce:transition-none`}
            />
            <span
              aria-current={state === "current" ? "step" : undefined}
              className={`text-xs font-semibold uppercase tracking-wider ${
                state === "todo" ? "text-muted-foreground" : "text-accent"
              }`}
            >
              {i + 1}. {label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

function StepPuppy({
  puppies,
  loading,
  value,
  onSelect,
  onNext,
}: {
  puppies: PuppyRow[];
  loading: boolean;
  value: string;
  onSelect: (slug: string) => void;
  onNext: () => void;
}) {
  return (
    <section aria-labelledby="step-puppy">
      <h2 id="step-puppy" className="font-display text-2xl font-bold text-card-foreground">
        Which puppy caught your eye?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Pick a favorite or let us match you — nothing here is binding.
      </p>

      {loading ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="animate-pulse rounded-xl bg-muted p-3">
              <div className="aspect-[4/5] rounded-lg bg-muted-foreground/10" />
              <div className="mt-3 h-4 w-2/3 rounded bg-muted-foreground/10" />
            </div>
          ))}
        </div>
      ) : puppies.length === 0 ? (
        <p className="mt-8 rounded-xl bg-muted p-6 text-sm text-muted-foreground">
          No puppies are listed right now — choose “Help me choose” and we'll reach out as soon as
          the next litter is announced.
        </p>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {puppies.map((p) => {
            const active = value === p.slug;
            const disabled = p.status !== "available";
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => onSelect(p.slug ?? "")}
                aria-pressed={active}
                className={`overflow-hidden rounded-xl border-2 text-left transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:transition-none ${
                  active ? "border-accent shadow-wolf" : "border-border hover:border-accent/50"
                } ${disabled ? "opacity-70" : ""}`}
              >
                <div className="relative">
                  {p.image_url ? (
                    <SmartImage
                      src={p.image_url}
                      alt={`${p.name}, white German Shepherd puppy`}
                      sizes="(min-width: 640px) 200px, 45vw"
                      className="aspect-[4/5] w-full object-cover object-center"
                    />
                  ) : (
                    <div className="flex aspect-[4/5] items-center justify-center bg-muted text-muted-foreground/40">
                      {p.name}
                    </div>
                  )}
                  <StatusBadge status={p.status} className="absolute right-2 top-2 scale-90" />
                </div>
                <div className="p-3">
                  <p className="font-display text-lg font-bold text-card-foreground">{p.name}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2">
                    <span className="text-xs capitalize text-muted-foreground">{p.sex}</span>
                    <CollarBadge color={p.collar_color} />
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {formatUSD(p.price ?? PRICING.price)}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => onSelect("")}
          aria-pressed={value === ""}
          className={`rounded-xl border-2 px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            value === "" ? "border-accent text-accent" : "border-border text-muted-foreground"
          }`}
        >
          Help me choose / next litter
        </button>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="rounded-xl bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Continue →
        </button>
      </div>
    </section>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-medium text-foreground">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

function StepHome({
  answers,
  set,
  onBack,
  onNext,
}: {
  answers: Answers;
  set: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  return (
    <section aria-labelledby="step-home">
      <h2 id="step-home" className="font-display text-2xl font-bold text-card-foreground">
        Tell us about your home
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        This is how we match temperament to family — there are no wrong answers.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field label="Household type *">
          <select
            className={inputCls}
            value={answers.householdType}
            onChange={(e) => set("householdType", e.target.value)}
          >
            <option value="">Select…</option>
            <option value="single_family_home">Single-family home</option>
            <option value="townhouse">Townhouse</option>
            <option value="apartment">Apartment / condo</option>
            <option value="farm_acreage">Farm or acreage</option>
          </select>
        </Field>

        <Field label="Fenced yard *">
          <select
            className={inputCls}
            value={answers.hasFencedYard}
            onChange={(e) => set("hasFencedYard", e.target.value as Answers["hasFencedYard"])}
          >
            <option value="yes">Yes, fully fenced</option>
            <option value="in_progress">Planned / in progress</option>
            <option value="no">No fenced yard</option>
          </select>
        </Field>

        <Field label="People in the household *">
          <input
            type="number"
            min={1}
            className={inputCls}
            value={answers.familySize}
            onChange={(e) => set("familySize", e.target.value)}
          />
        </Field>

        <Field label="Children's ages" hint="Leave blank if none.">
          <input
            type="text"
            className={inputCls}
            placeholder="e.g. 6 and 11"
            value={answers.childrenAges}
            onChange={(e) => set("childrenAges", e.target.value)}
          />
        </Field>

        <Field label="Other pets">
          <input
            type="text"
            className={inputCls}
            placeholder="e.g. one senior lab, two cats"
            value={answers.otherPets}
            onChange={(e) => set("otherPets", e.target.value)}
          />
        </Field>

        <Field label="Owned a large-breed dog before? *">
          <select
            className={inputCls}
            value={answers.hasOwnedLargeDog}
            onChange={(e) => set("hasOwnedLargeDog", e.target.value as Answers["hasOwnedLargeDog"])}
          >
            <option value="yes">Yes</option>
            <option value="no">Not yet</option>
          </select>
        </Field>

        <Field label="Puppy preference">
          <select
            className={inputCls}
            value={answers.preferredSex}
            onChange={(e) => set("preferredSex", e.target.value as Answers["preferredSex"])}
          >
            <option value="either">Either — match me</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </Field>

        <Field label="Timeline *">
          <select
            className={inputCls}
            value={answers.timeline}
            onChange={(e) => set("timeline", e.target.value as Answers["timeline"])}
          >
            <option value="ready_now">Ready now — this litter</option>
            <option value="1_3_months">In the next 1–3 months</option>
            <option value="future">Later this year</option>
          </select>
        </Field>

        <Field
          label={`Ready to place a ${formatUSD(PRICING.deposit)} deposit if approved? *`}
        >
          <select
            className={inputCls}
            value={answers.readyForDeposit}
            onChange={(e) => set("readyForDeposit", e.target.value as Answers["readyForDeposit"])}
          >
            <option value="yes">Yes</option>
            <option value="info">I'd like more info first</option>
            <option value="no">Not yet</option>
          </select>
        </Field>
      </div>

      <div className="mt-6">
        <Field
          label="Why a White German Shepherd, and what will daily life look like? *"
          hint="At least 50 characters — this is the part we actually read."
        >
          <textarea
            rows={5}
            className={inputCls}
            value={answers.reasonForBreed}
            onChange={(e) => set("reasonForBreed", e.target.value)}
          />
        </Field>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onNext}
          className="rounded-xl bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Continue →
        </button>
      </div>
    </section>
  );
}

function StepContact({
  answers,
  set,
  busy,
  selectedName,
  onBack,
  onSubmit,
}: {
  answers: Answers;
  set: <K extends keyof Answers>(key: K, value: Answers[K]) => void;
  busy: boolean;
  selectedName: string | null;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <section aria-labelledby="step-contact">
      <h2 id="step-contact" className="font-display text-2xl font-bold text-card-foreground">
        Where should we reach you?
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        {selectedName
          ? `We'll hold ${selectedName} as your first choice while we review.`
          : "We'll match you to the best-fit puppy in this litter."}
      </p>

      <form onSubmit={onSubmit} className="mt-8 space-y-6" noValidate>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="First name *">
            <input
              className={inputCls}
              autoComplete="given-name"
              value={answers.firstName}
              onChange={(e) => set("firstName", e.target.value)}
            />
          </Field>
          <Field label="Last name *">
            <input
              className={inputCls}
              autoComplete="family-name"
              value={answers.lastName}
              onChange={(e) => set("lastName", e.target.value)}
            />
          </Field>
        </div>

        <Field label="Email *">
          <input
            type="email"
            className={inputCls}
            autoComplete="email"
            value={answers.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Phone *">
            <input
              type="tel"
              className={inputCls}
              autoComplete="tel"
              value={answers.phone}
              onChange={(e) => set("phone", e.target.value)}
            />
          </Field>
          <Field label="Preferred contact">
            <select
              className={inputCls}
              value={answers.preferredContact}
              onChange={(e) =>
                set("preferredContact", e.target.value as Answers["preferredContact"])
              }
            >
              <option value="text">Text message</option>
              <option value="call">Phone call</option>
              <option value="email">Email</option>
            </select>
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="City *">
            <input
              className={inputCls}
              autoComplete="address-level2"
              value={answers.city}
              onChange={(e) => set("city", e.target.value)}
            />
          </Field>
          <Field label="State *">
            <input
              className={inputCls}
              autoComplete="address-level1"
              value={answers.state}
              onChange={(e) => set("state", e.target.value)}
            />
          </Field>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={busy}
            className="rounded-xl bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110 disabled:opacity-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {busy ? "Sending…" : "Send my application →"}
          </button>
        </div>
      </form>
    </section>
  );
}

function StepDone({ name, puppyName }: { name: string; puppyName: string | null }) {
  return (
    <section aria-labelledby="step-done" className="text-center">
      <h2 id="step-done" className="font-display text-2xl font-bold text-card-foreground">
        Thank you{name ? `, ${name}` : ""} — we've got it.
      </h2>
      <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
        {puppyName
          ? `${puppyName} is flagged as your first choice.`
          : "We'll match you with the best-fit puppy in this litter."}{" "}
        A real person reviews every application — expect a reply{" "}
        <strong className="text-foreground">within one business day</strong> (Mon–Sat).
      </p>

      <ol className="mx-auto mt-8 max-w-xl space-y-4 text-left">
        {[
          {
            t: "1. Family Fit Call (15 minutes)",
            d: "A quick call so we can answer your questions and confirm the match.",
          },
          {
            t: `2. ${formatUSD(PRICING.deposit)} deposit`,
            d: PRICING.depositTerms,
          },
          {
            t: "3. Private video visit",
            d: "Meet your puppy live, then follow weekly updates in your owner portal.",
          },
          {
            t: "4. Go-home day",
            d: "Vet-checked, microchipped, and sent home with your puppy pack — travel help available.",
          },
        ].map((s) => (
          <li key={s.t} className="rounded-xl border border-border bg-background p-4">
            <p className="font-semibold text-foreground">{s.t}</p>
            <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/litter"
          className="rounded-xl bg-primary px-6 py-3 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110"
        >
          Browse the litter
        </Link>
        <Link
          to="/portal"
          className="rounded-xl border border-border px-6 py-3 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          Open my portal
        </Link>
      </div>
    </section>
  );
}
