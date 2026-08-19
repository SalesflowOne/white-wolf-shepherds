import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Field } from "@/components/forms/Field";

const waitlistSchema = z.object({
  first_name: z.string().trim().min(1, "Please enter your first name").max(50, "Max 50 characters"),
  last_name: z.string().trim().min(1, "Please enter your last name").max(50, "Max 50 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Please enter your email so we can reach you")
    .email("That doesn't look like a valid email address")
    .max(255),
  phone: z
    .string()
    .trim()
    .max(30)
    .refine((v) => v === "" || v.replace(/\D/g, "").length >= 10, "Enter a full 10-digit number")
    .optional()
    .or(z.literal("")),
  preferred_sex: z.enum(["male", "female", "either"]),
  message: z.string().trim().max(1000, "Please keep it under 1000 characters").optional().or(z.literal("")),
});

type FormValues = z.infer<typeof waitlistSchema>;
type FieldName = keyof FormValues;

const EMPTY: FormValues = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  preferred_sex: "either",
  message: "",
};

const MESSAGE_MAX = 1000;

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});

  function fieldError(name: FieldName, values: FormValues): string | undefined {
    const parsed = waitlistSchema.safeParse(values);
    if (parsed.success) return undefined;
    return parsed.error.issues.find((i) => i.path[0] === name)?.message;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const name = e.target.name as FieldName;
    const next = { ...form, [name]: e.target.value } as FormValues;
    setForm(next);
    // Only clear/refresh an error once the user has already been told about it.
    if (touched[name]) setErrors((prev) => ({ ...prev, [name]: fieldError(name, next) }));
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const name = e.target.name as FieldName;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: fieldError(name, form) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = waitlistSchema.safeParse(form);
    if (!parsed.success) {
      const next: Partial<Record<FieldName, string>> = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as FieldName;
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      setTouched({
        first_name: true,
        last_name: true,
        email: true,
        phone: true,
        preferred_sex: true,
        message: true,
      });
      const firstKey = Object.keys(next)[0];
      if (firstKey) document.getElementById(`waitlist-${firstKey}`)?.focus();
      toast.error("Please fix the highlighted fields");
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("puppy_waitlist").insert({
      first_name: parsed.data.first_name,
      last_name: parsed.data.last_name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      preferred_sex: parsed.data.preferred_sex,
      message: parsed.data.message || null,
    });
    setSubmitting(false);
    if (error) {
      toast.error("We couldn't save your spot. Please try again in a moment.");
      return;
    }
    setSuccess(true);
    toast.success("You're on the waitlist! We'll be in touch.");
    setForm(EMPTY);
    setErrors({});
    setTouched({});
  };

  return (
    <section id="contact" className="bg-gradient-hero py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ice">
            Reserve Your Spot
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-primary-foreground lg:text-5xl">
            Join the Waitlist
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/70">
            Our litters are limited and reserved quickly. Add your name to the waitlist and we'll
            notify you the moment a puppy matching your preferences becomes available.
          </p>
        </div>

        {success ? (
          <div className="mt-12 rounded-2xl bg-card p-10 text-center shadow-wolf">
            <h3 className="font-display text-2xl font-bold text-foreground">
              You're on the list 🐾
            </h3>
            <p className="mt-3 text-muted-foreground">
              Thank you for joining the White Wolf Shepherd waitlist. We'll reach out personally
              with updates on upcoming litters.
            </p>
            <button
              onClick={() => setSuccess(false)}
              className="mt-6 text-sm font-semibold text-accent hover:underline"
            >
              Add another person
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="mt-12 space-y-6 rounded-2xl bg-card p-8 shadow-wolf sm:p-10"
          >
            <p className="text-xs text-muted-foreground">
              Fields marked <span className="text-destructive">*</span> are required. Takes about 60
              seconds.
            </p>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                id="waitlist-first_name"
                label="First name"
                required
                error={errors.first_name}
              >
                {(p) => (
                  <input
                    {...p}
                    name="first_name"
                    value={form.first_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    autoComplete="given-name"
                    maxLength={50}
                    placeholder="John"
                  />
                )}
              </Field>
              <Field id="waitlist-last_name" label="Last name" required error={errors.last_name}>
                {(p) => (
                  <input
                    {...p}
                    name="last_name"
                    value={form.last_name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    autoComplete="family-name"
                    maxLength={50}
                    placeholder="Doe"
                  />
                )}
              </Field>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field
                id="waitlist-email"
                label="Email"
                required
                error={errors.email}
                hint="This is where litter updates are sent."
              >
                {(p) => (
                  <input
                    {...p}
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    maxLength={255}
                    placeholder="john@example.com"
                  />
                )}
              </Field>
              <Field
                id="waitlist-phone"
                label="Phone"
                error={errors.phone}
                hint="Only used if a puppy matches your preference."
              >
                {(p) => (
                  <input
                    {...p}
                    name="phone"
                    value={form.phone ?? ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    maxLength={30}
                    placeholder="(555) 123-4567"
                  />
                )}
              </Field>
            </div>

            <Field id="waitlist-preferred_sex" label="Preferred puppy" required>
              {(p) => (
                <select
                  {...p}
                  name="preferred_sex"
                  value={form.preferred_sex}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <option value="either">No preference</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              )}
            </Field>

            <div>
              <Field
                id="waitlist-message"
                label="Tell us about your home"
                error={errors.message}
                hint="Families who share a little about their home usually hear back first."
              >
                {(p) => (
                  <textarea
                    {...p}
                    name="message"
                    value={form.message ?? ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    maxLength={MESSAGE_MAX}
                    placeholder="Yard, kids, other dogs, experience with the breed…"
                  />
                )}
              </Field>
              <p className="mt-1 text-right text-xs text-muted-foreground">
                {(form.message ?? "").length}/{MESSAGE_MAX}
              </p>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-accent py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110 disabled:opacity-60"
            >
              {submitting ? "Saving your spot…" : "Claim My Spot on the Waitlist →"}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              Free · No deposit required · We never share your info, and you can unsubscribe
              anytime.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
