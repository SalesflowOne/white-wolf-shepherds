const testimonials = [
  {
    quote:
      "Our Arctic from White Wolf Shepherds is the gentlest, most loving companion we've ever had. The kids are absolutely inseparable from him.",
    name: "The Anderson Family",
    location: "Colorado",
  },
  {
    quote:
      "The professionalism and care that goes into every puppy is unmatched. From health testing to socialization — you can see the love in every detail.",
    name: "Sarah & Michael Chen",
    location: "Oregon",
  },
  {
    quote:
      "We've had German Shepherds for 20 years. The White Wolf bloodline is something truly special — intelligence, beauty, and the sweetest temperament.",
    name: "Dr. James Harlow",
    location: "Montana",
  },
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Testimonials
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground lg:text-5xl">
            Happy Families
          </h2>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl bg-card p-8 shadow-card transition-all hover:shadow-wolf"
            >
              {/* Stars */}
              <div className="flex gap-1 text-accent">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <blockquote className="mt-5 text-lg italic leading-relaxed text-foreground">
                "{t.quote}"
              </blockquote>
              <div className="mt-6 border-t border-border pt-4">
                <p className="font-display text-sm font-bold text-foreground">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
