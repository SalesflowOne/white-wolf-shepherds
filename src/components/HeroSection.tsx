import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import heroImg from "@/assets/hero-dogs.jpg";

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
        .from("puppies")
        .select("*", { count: "exact", head: true })
        .eq("status", "available");
      if (count !== null) setAvailableCount(count);
    }
    fetchCount();

    // Realtime subscription
    const channel = supabase
      .channel("hero-puppies")
      .on("postgres_changes", { event: "*", schema: "public", table: "puppies" }, () => {
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
          Health-tested, family-raised White German Shepherd puppies placed with carefully selected homes.
        </p>

        {/* Live scarcity counter */}
        {availableCount !== null && (
          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-5 py-2 text-primary-foreground">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
            </span>
            <span className="text-sm font-medium">
              {availableCount} of 9 puppies available for reservation
            </span>
          </div>
        )}

        {/* Smart CTAs — fade in to avoid hydration mismatch */}
        <div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center transition-opacity duration-300"
          style={{ opacity: mounted ? 1 : 0 }}
        >
          {warm ? (
            <>
              <a
                href="/litter"
                className="rounded-xl bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
              >
                Secure Your Pick &mdash; $500 Reservation Fee
              </a>
              <a
                href="/litter"
                className="rounded-xl border border-primary-foreground/30 px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary-foreground/10"
              >
                View Remaining Puppies &rarr;
              </a>
            </>
          ) : (
            <>
              <a
                href="/apply"
                className="rounded-xl bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
              >
                Begin Application
              </a>
              <a
                href="/litter"
                className="rounded-xl border border-primary-foreground/30 px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:bg-primary-foreground/10"
              >
                View Current Litter &rarr;
              </a>
            </>
          )}
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
