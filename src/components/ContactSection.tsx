export default function ContactSection() {
  return (
    <section id="contact" className="bg-gradient-hero py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ice">Get in Touch</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-primary-foreground lg:text-5xl">
            Start Your Journey
          </h2>
          <p className="mt-4 text-lg text-primary-foreground/70">
            Interested in welcoming a White Wolf Shepherd into your family? Fill out the form below and we'll be in touch within 24 hours.
          </p>
        </div>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mt-12 space-y-6 rounded-2xl bg-card p-8 shadow-wolf sm:p-10"
        >
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">First Name</label>
              <input
                type="text"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                placeholder="John"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">Last Name</label>
              <input
                type="text"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                placeholder="Doe"
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
            <input
              type="email"
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
              placeholder="john@example.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-foreground">Tell Us About Yourself</label>
            <textarea
              rows={4}
              className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
              placeholder="Tell us about your home, family, and experience with dogs..."
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-xl bg-accent py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
          >
            Submit Inquiry
          </button>
        </form>
      </div>
    </section>
  );
}
