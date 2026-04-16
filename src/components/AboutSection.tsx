import aboutImg from "@/assets/about-breeder.jpg";

export default function AboutSection() {
  const stats = [
    { value: "15+", label: "Years of Experience" },
    { value: "200+", label: "Happy Families" },
    { value: "100%", label: "Health Guaranteed" },
    { value: "5★", label: "Average Rating" },
  ];

  return (
    <section id="about" className="bg-gradient-frost py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-2xl shadow-wolf">
              <img
                src={aboutImg}
                alt="Breeder with white German Shepherd puppy"
                className="h-[500px] w-full object-cover"
                loading="lazy"
                width={800}
                height={1000}
              />
            </div>
            <div className="absolute -bottom-6 -right-6 -z-10 h-full w-full rounded-2xl bg-accent/10" />
          </div>

          {/* Content */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Our Story</p>
            <h2 className="mt-3 font-display text-4xl font-bold leading-tight text-foreground lg:text-5xl">
              A Legacy of Excellence
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              For over 15 years, White Wolf Shepherds has been dedicated to preserving and perfecting
              the white German Shepherd bloodline. Our breeding philosophy centers on three pillars:
              exceptional health, balanced temperament, and breathtaking beauty.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Every puppy is raised in a loving home environment, socialized from birth, and
              health-tested through comprehensive veterinary protocols. We don't just breed dogs —
              we raise family members.
            </p>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="font-display text-3xl font-bold text-accent">{s.value}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
