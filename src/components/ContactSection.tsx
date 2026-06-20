import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const waitlistSchema = z.object({
  first_name: z.string().trim().min(1, "First name is required").max(50),
  last_name: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  preferred_sex: z.enum(["male", "female", "either"]),
  message: z.string().trim().max(1000).optional().or(z.literal("")),
});

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    preferred_sex: "either" as "male" | "female" | "either",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = waitlistSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Please check the form");
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
      toast.error("Something went wrong. Please try again.");
      return;
    }
    setSuccess(true);
    toast.success("You're on the waitlist! We'll be in touch.");
    setForm({
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      preferred_sex: "either",
      message: "",
    });
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
            className="mt-12 space-y-6 rounded-2xl bg-card p-8 shadow-wolf sm:p-10"
          >
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">First Name</label>
                <input
                  name="first_name"
                  value={form.first_name}
                  onChange={handleChange}
                  type="text"
                  required
                  maxLength={50}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Last Name</label>
                <input
                  name="last_name"
                  value={form.last_name}
                  onChange={handleChange}
                  type="text"
                  required
                  maxLength={50}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                  placeholder="Doe"
                />
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  required
                  maxLength={255}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  Phone (optional)
                </label>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  type="tel"
                  maxLength={30}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Preferred Puppy
              </label>
              <select
                name="preferred_sex"
                value={form.preferred_sex}
                onChange={handleChange}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
              >
                <option value="either">No preference</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                Tell Us About Your Home (optional)
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={4}
                maxLength={1000}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                placeholder="Tell us about your home, family, and experience with dogs..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-accent py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110 disabled:opacity-60"
            >
              {submitting ? "Joining…" : "Join the Waitlist"}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              No deposit required. We'll only contact you about upcoming litters.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
