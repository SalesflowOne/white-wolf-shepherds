import { useEffect, useState } from "react";
import { supabase, T } from "@/integrations/supabase/client";

export default function HeroSection() {
  const [warm, setWarm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [availableCount, setAvailableCount] = useState<number | null>(null);

  useEffect(() => {
    // Check warm state from localStorage
    const visited = localStorage.getItem("visited_litter");
    if (visited === "true") setWarm(true);

    // Fade in after check
    const timer = setTimeout(() => setMounted(true), 50);

    // Fetch live count
    async function fetchCount() {
      const { count } = await supabase
        .from(T.puppies)
        .select("*", { count: "exact", head: true })
        .eq("status", "available");
      if (count !== null) setAvailableCount(count);
    }
    fetchCount();

    // Realtime subscription
    const channel = supabase
      .channel("hero-puppies")
      .on("postgres_changes", { event: "*", schema: "public", table: T.puppies }, () => {
        fetchCount();
      })
      .subscribe();

    return () => {
      clearTimeout(timer);
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <img
        src="/dogs/haki/haki-golden-hour-05.webp"
        alt="Haki, our white German Shepherd sire, in a sunlit park at golden hour"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/65 to-primary/95" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p className="mb-7 text-xs font-medium uppercase tracking-[0.4em] text-ice/80 sm:text-sm">
          Rare White German Shepherd Puppies
        </p>
        <h1 className="font-display text-6xl font-semibold leading-[1.05] tracking-tight text-primary-foreground sm:text-7xl lg:text-8xl">
          Welcome to the <span className="text-gradient-ice font-bold">White Wolf</span> Bloodline
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/75 sm:text-xl">
          Health-tested, family-raised White German Shepherd puppies for select homes.
        </p>

        {/* Scarcity chip — minimal, refined */}
        {availableCount !== null && (
          <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-primary-foreground/15 bg-primary-foreground/[0.06] px-5 py-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
            </span>
            <span className="text-sm font-medium tracking-wide text-primary-foreground/85">
              Current litter: {availableCount} puppies available
            </span>
          </div>
        )}

        {/* CTAs */}
        <div
          className="mt-12 flex flex-col items-center gap-4 transition-opacity duration-300"
          style={{ opacity: mounted ? 1 : 0 }}
        >
          <a
            href="/apply"
            className="rounded-lg bg-accent px-10 py-5 text-sm font-bold uppercase tracking-[0.18em] text-accent-foreground shadow-wolf transition-all hover:brightness-110"
          >
            Meet the Puppies
          </a>
          <a
            href="/apply"
            className="text-sm font-medium uppercase tracking-[0.18em] text-primary-foreground/80 underline-offset-4 transition-colors hover:text-primary-foreground hover:underline"
          >
            Start Your Application
          </a>

          <p className="mt-2 max-w-xl text-xs leading-relaxed text-primary-foreground/55">
            Start with your contact info and a short Family Fit Call, then complete your
            application, place a $500 deposit (refundable if not approved), and meet the puppies on
            a private video call after approval.
          </p>

          <a
            href="/litter"
            className="text-xs font-medium uppercase tracking-[0.18em] text-primary-foreground/45 transition-colors hover:text-primary-foreground/70"
          >
            or view the current litter →
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-primary-foreground/50"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
