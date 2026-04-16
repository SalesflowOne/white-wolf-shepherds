import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

type AvailablePuppy = {
  id: string;
  name: string;
  tier: string | null;
  price: number | null;
};

export const Route = createFileRoute("/apply")({
  component: ApplyPage,
  validateSearch: (search: Record<string, unknown>) => ({
    waitlist: (search.waitlist as string) || undefined,
  }),
  head: () => ({
    meta: [
      { title: "Apply — White Wolf Shepherds" },
      { name: "description", content: "Apply to reserve a White German Shepherd puppy from our Spring 2026 litter." },
    ],
  }),
});

function ApplyPage() {
  const { waitlist } = Route.useSearch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [availablePuppies, setAvailablePuppies] = useState<AvailablePuppy[]>([]);

  // Step 1 fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [preferredSex, setPreferredSex] = useState("either");
  const [timeline, setTimeline] = useState("");
  const [hasOwnedLargeDog, setHasOwnedLargeDog] = useState<string>("");
  const [readyForDeposit, setReadyForDeposit] = useState("");

  // Step 2 fields
  const [householdType, setHouseholdType] = useState("");
  const [hasFencedYard, setHasFencedYard] = useState("");
  const [familySize, setFamilySize] = useState<number | "">("");
  const [childrenAges, setChildrenAges] = useState("");
  const [otherPets, setOtherPets] = useState("");
  const [preferredPuppyId, setPreferredPuppyId] = useState("");
  const [reasonForBreed, setReasonForBreed] = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [source, setSource] = useState("");

  // Validation
  const [step1Errors, setStep1Errors] = useState<string[]>([]);
  const [step2Errors, setStep2Errors] = useState<string[]>([]);

  useEffect(() => {
    async function fetchPuppies() {
      const { data } = await supabase
        .from("puppies")
        .select("id, name, tier, price")
        .eq("status", "available")
        .order("priority_order", { ascending: true });
      if (data) setAvailablePuppies(data as AvailablePuppy[]);
    }
    fetchPuppies();
  }, []);

  function validateStep1(): boolean {
    const errors: string[] = [];
    if (!fullName.trim()) errors.push("Full name is required");
    if (!email.trim()) errors.push("Email is required");
    if (!phone.trim()) errors.push("Phone is required");
    if (!city.trim()) errors.push("City is required");
    if (!state.trim()) errors.push("State is required");
    if (!timeline) errors.push("Timeline is required");
    if (!hasOwnedLargeDog) errors.push("Large dog experience is required");
    if (!readyForDeposit) errors.push("Reservation readiness is required");
    setStep1Errors(errors);
    return errors.length === 0;
  }

  function validateStep2(): boolean {
    const errors: string[] = [];
    if (!householdType) errors.push("Household type is required");
    if (!hasFencedYard) errors.push("Fenced yard status is required");
    if (!familySize || familySize < 1) errors.push("Family size is required");
    if (!reasonForBreed.trim() || reasonForBreed.trim().length < 50)
      errors.push("Please share at least 50 characters about why you want this breed");
    if (!source) errors.push("How you heard about us is required");
    setStep2Errors(errors);
    return errors.length === 0;
  }

  function handleContinue() {
    if (validateStep1()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validateStep2()) return;

    setSubmitting(true);

    const readyBool = readyForDeposit === "yes";
    const ownedBool = hasOwnedLargeDog === "yes";
    const fencedBool = hasFencedYard === "yes";

    // Insert lead
    const { data: lead, error } = await supabase
      .from("leads")
      .insert({
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim(),
        city: city.trim(),
        state: state.trim(),
        preferred_sex: preferredSex,
        preferred_puppy_id: preferredPuppyId || null,
        timeline,
        has_owned_large_dog: ownedBool,
        has_fenced_yard: fencedBool,
        household_type: householdType,
        family_size: typeof familySize === "number" ? familySize : 1,
        children_ages: childrenAges.trim() || null,
        other_pets: otherPets.trim() || null,
        reason_for_breed: reasonForBreed.trim(),
        additional_notes: additionalNotes.trim() || null,
        ready_for_deposit: readyBool,
        source,
        stage: waitlist ? "waitlist" : "new_inquiry",
      })
      .select("id")
      .single();

    if (error || !lead) {
      setSubmitting(false);
      alert("There was an error submitting your application. Please try again.");
      return;
    }

    // Compute score
    let score = 0;
    if (timeline === "ready_now") score += 25;
    if (readyBool) score += 20;
    if (ownedBool) score += 15;
    if (fencedBool) score += 10;
    if (preferredPuppyId) score += 8;
    if (reasonForBreed.trim().length > 100) score += 7;
    if (timeline === "1_3_months") score += 5;
    if (householdType === "house") score += 5;
    if (additionalNotes.trim().length > 50) score += 5;

    // Update score
    await supabase
      .from("leads")
      .update({ score, updated_at: new Date().toISOString() })
      .eq("id", lead.id);

    // Redirect to thank you
    const firstName = fullName.trim().split(" ")[0];
    navigate({ to: "/thank-you", search: { name: firstName } });
  }

  const tierLabel = (tier: string | null) =>
    tier === "premier" ? "Premier" : tier === "preferred" ? "Preferred" : "Companion";

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="bg-gradient-frost pt-28 pb-20 lg:pt-36">
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold text-foreground lg:text-4xl">
              {waitlist ? "Join the Waitlist" : "Apply for This Litter"}
            </h1>
            <p className="mt-3 text-muted-foreground">
              {waitlist
                ? "All puppies from this litter are reserved. Join our waitlist to be notified about our next litter."
                : "We review every application personally and respond within 24\u201348 hours."}
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-10">
            <div className="flex items-center justify-between text-sm font-medium">
              <span className={step >= 1 ? "text-accent" : "text-muted-foreground"}>
                Step 1: Quick Qualifier
              </span>
              <span className={step >= 2 ? "text-accent" : "text-muted-foreground"}>
                Step 2: Full Screening
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-accent transition-all duration-300"
                style={{ width: step === 1 ? "50%" : "100%" }}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="mt-10 rounded-2xl bg-card p-8 shadow-card sm:p-10">
            {step === 1 && (
              <div className="space-y-6">
                {step1Errors.length > 0 && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <ul className="list-inside list-disc text-sm text-red-700">
                      {step1Errors.map((err) => (
                        <li key={err}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Full Name *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                    placeholder="John Smith"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Phone *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">City *</label>
                    <input
                      type="text"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                      placeholder="Austin"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">State *</label>
                    <input
                      type="text"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                      placeholder="TX"
                    />
                  </div>
                </div>

                <RadioGroup
                  label="Preferred Sex *"
                  name="preferred_sex"
                  value={preferredSex}
                  onChange={setPreferredSex}
                  options={[
                    { value: "male", label: "Male" },
                    { value: "female", label: "Female" },
                    { value: "either", label: "Either" },
                  ]}
                />

                <RadioGroup
                  label="Timeline *"
                  name="timeline"
                  value={timeline}
                  onChange={setTimeline}
                  options={[
                    { value: "ready_now", label: "Ready now (0\u201330 days)" },
                    { value: "1_3_months", label: "1\u20133 months" },
                    { value: "future", label: "Planning for a future litter" },
                  ]}
                />

                <RadioGroup
                  label="Have you owned a large breed dog before? *"
                  name="has_owned_large_dog"
                  value={hasOwnedLargeDog}
                  onChange={setHasOwnedLargeDog}
                  options={[
                    { value: "yes", label: "Yes" },
                    { value: "no", label: "No" },
                  ]}
                />

                <RadioGroup
                  label="Are you ready to place a $500 Reservation Fee if approved? *"
                  name="ready_for_deposit"
                  value={readyForDeposit}
                  onChange={setReadyForDeposit}
                  options={[
                    { value: "yes", label: "Yes, ready to place $500 Reservation Fee if approved" },
                    { value: "not_yet", label: "Not yet, still learning" },
                    { value: "need_info", label: "Need more information first" },
                  ]}
                />

                <button
                  type="button"
                  onClick={handleContinue}
                  className="w-full rounded-xl bg-accent py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
                >
                  Continue to Step 2 &rarr;
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                {step2Errors.length > 0 && (
                  <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                    <ul className="list-inside list-disc text-sm text-red-700">
                      {step2Errors.map((err) => (
                        <li key={err}>{err}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <RadioGroup
                  label="Household Type *"
                  name="household_type"
                  value={householdType}
                  onChange={setHouseholdType}
                  options={[
                    { value: "house", label: "House" },
                    { value: "apartment", label: "Apartment" },
                    { value: "farm", label: "Farm / Ranch" },
                    { value: "other", label: "Other" },
                  ]}
                />

                <RadioGroup
                  label="Do you have a fenced yard? *"
                  name="has_fenced_yard"
                  value={hasFencedYard}
                  onChange={setHasFencedYard}
                  options={[
                    { value: "yes", label: "Yes, fully fenced" },
                    { value: "no", label: "No" },
                    { value: "in_progress", label: "In progress" },
                  ]}
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Family Size *</label>
                  <input
                    type="number"
                    min={1}
                    value={familySize}
                    onChange={(e) => setFamilySize(e.target.value ? parseInt(e.target.value) : "")}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                    placeholder="Number of people in household"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Children Ages <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={childrenAges}
                    onChange={(e) => setChildrenAges(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                    placeholder="e.g. 4, 7, 12 — leave blank if none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Other Pets <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={otherPets}
                    onChange={(e) => setOtherPets(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                    placeholder="e.g. 1 cat, 1 small dog — leave blank if none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Preferred Puppy <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <select
                    value={preferredPuppyId}
                    onChange={(e) => setPreferredPuppyId(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                  >
                    <option value="">No preference / any available</option>
                    {availablePuppies.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} — {tierLabel(p.tier)} — ${p.price?.toLocaleString()}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Why a White German Shepherd specifically? *
                  </label>
                  <textarea
                    rows={4}
                    value={reasonForBreed}
                    onChange={(e) => setReasonForBreed(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                    placeholder="Tell us about your lifestyle, experience, and what draws you to this breed. The more you share, the better we can match you with the right puppy."
                  />
                  <p
                    className={`mt-1 text-xs ${
                      reasonForBreed.trim().length >= 50
                        ? "text-green-600"
                        : "text-muted-foreground"
                    }`}
                  >
                    {reasonForBreed.trim().length} / 50 minimum
                  </p>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    Anything else you'd like us to know?{" "}
                    <span className="text-muted-foreground">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">
                    How did you hear about us? *
                  </label>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                  >
                    <option value="">Select...</option>
                    <option value="google">Google Search</option>
                    <option value="instagram">Instagram</option>
                    <option value="facebook">Facebook</option>
                    <option value="referral">Referral</option>
                    <option value="breeder_directory">Breeder Directory</option>
                    <option value="tiktok">TikTok</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setStep(1);
                      window.scrollTo(0, 0);
                    }}
                    className="rounded-xl border border-border px-6 py-4 text-sm font-bold uppercase tracking-wider text-foreground transition-all hover:bg-muted"
                  >
                    &larr; Back
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 rounded-xl bg-accent py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting ? "Submitting..." : "Submit Application"}
                  </button>
                </div>

                <p className="text-center text-xs text-muted-foreground">
                  We review every application personally and respond within 24–48 hours.
                </p>
              </div>
            )}
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}

/* ── Reusable Radio Group ── */
function RadioGroup({
  label,
  name,
  value,
  onChange,
  options,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-foreground">{label}</legend>
      <div className="space-y-2">
        {options.map((opt) => (
          <label
            key={opt.value}
            className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors ${
              value === opt.value
                ? "border-accent bg-accent/5"
                : "border-input hover:bg-muted/50"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="accent-accent"
            />
            <span className="text-sm text-foreground">{opt.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
