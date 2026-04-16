import heroImg from "@/assets/hero-dogs.jpg";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src={heroImg}
        alt="White German Shepherd family running through a sunlit meadow"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-ice">
          Premium White German Shepherd Bloodlines
        </p>
        <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-primary-foreground sm:text-6xl lg:text-7xl">
          Where Elegance Meets{" "}
          <span className="text-gradient-ice">Loyalty</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">
          Raising exceptional white shepherds with impeccable health, temperament, and beauty.
          Welcome to the White Wolf family.
        </p>
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#puppies"
            className="rounded-xl bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
          >
            View Available Puppies
          </a>
          <a
            href="#about"
            className="rounded-xl border border-primary-foreground/30 px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary-foreground/10"
          >
            Our Story
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary-foreground/50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
