import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase, T } from "@/integrations/supabase/client";

export default function MobileStickyBar() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    async function fetchCount() {
      const { count: c } = await supabase
        .from(T.puppies)
        .select("*", { count: "exact", head: true })
        .eq("status", "available");
      if (c !== null) setCount(c);
    }
    fetchCount();

    const channel = supabase
      .channel("mobile-bar-puppies")
      .on("postgres_changes", { event: "*", schema: "public", table: T.puppies }, () => {
        fetchCount();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (count === null) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-between bg-primary px-4 py-3 shadow-wolf md:hidden">
      <Link to="/portal" className="text-sm font-medium text-primary-foreground/80">
        My Portal
      </Link>
      <span className="text-xs text-primary-foreground/60">{count} available now</span>
      <Link
        to="/get-started"
        className="rounded-lg bg-accent px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110"
      >
        Get Started
      </Link>
    </div>
  );
}
