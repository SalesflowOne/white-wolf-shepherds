import { supabase, T } from "@/integrations/supabase/client";

export type AvailablePuppy = {
  id: string;
  name: string;
  tier: string | null;
  price: number | null;
};

export type ApplicationFormValues = {
  preferredSex: "male" | "female" | "either";
  timeline: "" | "ready_now" | "1_3_months" | "future";
  hasOwnedLargeDog: "" | "yes" | "no";
  readyForDeposit: "" | "yes" | "no" | "info";
  householdType: string;
  hasFencedYard: "" | "yes" | "no" | "in_progress";
  familySize: number | "";
  childrenAges: string;
  otherPets: string;
  preferredPuppyId: string;
  reasonForBreed: string;
  additionalNotes: string;
  source: string;
};

export const emptyApplicationValues = (): ApplicationFormValues => ({
  preferredSex: "either",
  timeline: "",
  hasOwnedLargeDog: "",
  readyForDeposit: "",
  householdType: "",
  hasFencedYard: "",
  familySize: "",
  childrenAges: "",
  otherPets: "",
  preferredPuppyId: "",
  reasonForBreed: "",
  additionalNotes: "",
  source: "",
});

export function validateApplication(values: ApplicationFormValues): string[] {
  const errs: string[] = [];
  if (!values.timeline) errs.push("Timeline is required");
  if (!values.hasOwnedLargeDog) errs.push("Large dog experience is required");
  if (!values.readyForDeposit) errs.push("Reservation readiness is required");
  if (!values.householdType) errs.push("Household type is required");
  if (!values.hasFencedYard) errs.push("Fenced yard status is required");
  if (!values.familySize || values.familySize < 1) errs.push("Family size is required");
  if (!values.reasonForBreed.trim() || values.reasonForBreed.trim().length < 50)
    errs.push("Please share at least 50 characters about why you want this breed");
  if (!values.source) errs.push("How you heard about us is required");
  return errs;
}

export async function fetchAvailablePuppies(): Promise<AvailablePuppy[]> {
  const { data } = await supabase
    .from(T.puppies)
    .select("id, name, tier, price")
    .eq("status", "available")
    .order("priority_order", { ascending: true });
  return (data ?? []) as AvailablePuppy[];
}

const inputCls =
  "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20";

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

function RadioStack({
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
    <div className="space-y-2">
      {options.map((o) => (
        <label
          key={o.v}
          className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-sm transition-colors ${
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

const tierLabel = (tier: string | null) =>
  tier === "premier" ? "Premier" : tier === "preferred" ? "Preferred" : "Companion";

type ApplicationFormProps = {
  values: ApplicationFormValues;
  onChange: (patch: Partial<ApplicationFormValues>) => void;
  puppies: AvailablePuppy[];
  errors?: string[];
};

export default function ApplicationForm({
  values,
  onChange,
  puppies,
  errors = [],
}: ApplicationFormProps) {
  const charCount = values.reasonForBreed.trim().length;

  return (
    <div className="space-y-6">
      {errors.length > 0 && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <ul className="list-inside list-disc text-sm text-red-700">
            {errors.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      <Field label="Preferred Sex">
        <RadioRow
          name="preferredSex"
          value={values.preferredSex}
          onChange={(v) => onChange({ preferredSex: v as ApplicationFormValues["preferredSex"] })}
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
          value={values.timeline}
          onChange={(v) => onChange({ timeline: v as ApplicationFormValues["timeline"] })}
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
          value={values.hasOwnedLargeDog}
          onChange={(v) =>
            onChange({ hasOwnedLargeDog: v as ApplicationFormValues["hasOwnedLargeDog"] })
          }
          options={[
            { v: "yes", l: "Yes" },
            { v: "no", l: "No" },
          ]}
        />
      </Field>

      <Field label="Are you ready to place a $500 Reservation Fee? *">
        <RadioStack
          name="readyForDeposit"
          value={values.readyForDeposit}
          onChange={(v) =>
            onChange({ readyForDeposit: v as ApplicationFormValues["readyForDeposit"] })
          }
          options={[
            { v: "yes", l: "Yes, ready" },
            { v: "no", l: "Not yet" },
            { v: "info", l: "Need more information" },
          ]}
        />
      </Field>

      <Field label="Household Type *">
        <SelectInput
          value={values.householdType}
          onChange={(v) => onChange({ householdType: v })}
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
          value={values.hasFencedYard}
          onChange={(v) => onChange({ hasFencedYard: v as ApplicationFormValues["hasFencedYard"] })}
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
          value={values.familySize}
          onChange={(e) => onChange({ familySize: e.target.value ? parseInt(e.target.value) : "" })}
          className={inputCls}
          placeholder="4"
        />
      </Field>

      <Field label="Children's Ages (if applicable)">
        <input
          type="text"
          value={values.childrenAges}
          onChange={(e) => onChange({ childrenAges: e.target.value })}
          className={inputCls}
          placeholder="e.g. 6, 10"
        />
      </Field>

      <Field label="Other Pets">
        <input
          type="text"
          value={values.otherPets}
          onChange={(e) => onChange({ otherPets: e.target.value })}
          className={inputCls}
          placeholder="e.g. 2 cats, 1 dog"
        />
      </Field>

      <Field label="Preferred Puppy">
        <SelectInput
          value={values.preferredPuppyId}
          onChange={(v) => onChange({ preferredPuppyId: v })}
          options={[
            { v: "", l: "No preference" },
            ...puppies.map((p) => ({
              v: p.id,
              l: `${p.name} — ${tierLabel(p.tier)} — $${p.price?.toLocaleString()}`,
            })),
          ]}
        />
      </Field>

      <Field label="Why a White German Shepherd for your family? *">
        <textarea
          value={values.reasonForBreed}
          onChange={(e) => onChange({ reasonForBreed: e.target.value })}
          rows={4}
          className={inputCls}
          placeholder="Tell us about your home, lifestyle, and what you're looking for in a companion."
        />
        <p
          className={`mt-1 text-xs ${charCount >= 50 ? "text-green-600" : "text-muted-foreground"}`}
        >
          {charCount} / 50 minimum
        </p>
      </Field>

      <Field label="Additional Notes">
        <textarea
          value={values.additionalNotes}
          onChange={(e) => onChange({ additionalNotes: e.target.value })}
          rows={3}
          className={inputCls}
          placeholder="Anything else we should know?"
        />
      </Field>

      <Field label="How did you hear about us? *">
        <SelectInput
          value={values.source}
          onChange={(v) => onChange({ source: v })}
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
    </div>
  );
}
