import { formatDateOnly } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase, T } from "@/integrations/supabase/client";
import PuppyCard from "@/components/PuppyCard";

type Litter = {
  id: string;
  name: string;
  slug: string;
  dam_name: string | null;
  sire_name: string | null;
  born_date: string | null;
  ready_date: string | null;
  expected_count: number | null;
  status: string;
  description: string | null;
  cover_image_url: string | null;
  priority_order: number;
};

type Puppy = {
  id: string;
  name: string;
  slug: string | null;
  sex: string | null;
  status: string | null;
  image_url: string | null;
  collar_color: string | null;
  litter_id: string | null;
  priority_order: number | null;
  price: number | null;
};

export default function PuppiesSection() {
  const [litters, setLitters] = useState<Litter[]>([]);
  const [puppies, setPuppies] = useState<Puppy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const [{ data: lits }, { data: pups }] = await Promise.all([
        supabase
          .from(T.litters)
          .select("*")
          .neq("status", "past")
          .order("priority_order", { ascending: false }),
        supabase
          .from(T.puppies)
          .select("id, name, slug, sex, status, image_url, collar_color, litter_id, priority_order, price, dob, tier, personality_bio")
          .neq("status", "parent")
          .order("priority_order", { ascending: true }),
      ]);
      setLitters((lits ?? []) as Litter[]);
      setPuppies((pups ?? []) as Puppy[]);
      setLoading(false);
    }
    fetchData();
  }, []);

  const grouped = litters
    .map((lit) => ({
      litter: lit,
      puppies: puppies.filter((p) => p.litter_id === lit.id),
    }))
    .filter((g) => g.puppies.length > 0 || g.litter.expected_count);

  return (
    <section id="puppies" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Our Puppies
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground lg:text-5xl">
            Available Companions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Each puppy comes with full health certifications, microchipping, and a lifetime of
            breeder support.
          </p>
        </div>

        {loading ? (
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-muted p-6">
                <div className="h-72 rounded-xl bg-muted-foreground/10" />
                <div className="mt-4 h-6 w-2/3 rounded bg-muted-foreground/10" />
              </div>
            ))}
          </div>
        ) : grouped.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">
            No active litters right now. Join the{" "}
            <Link to="/waitlist" className="font-semibold text-accent hover:underline">
              waitlist
            </Link>{" "}
            to be notified.
          </p>
        ) : (
          <div className="mt-16 space-y-20">
            {grouped.map(({ litter, puppies: pups }) => (
              <LitterBlock key={litter.id} litter={litter} puppies={pups} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function LitterBlock({ litter, puppies }: { litter: Litter; puppies: Puppy[] }) {
  const available = puppies.filter((p) => p.status === "available").length;
  const total = puppies.length || litter.expected_count || 0;

  return (
    <div>
      {/* Litter header */}
      <div className="border-b border-border pb-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              {litter.status === "upcoming" ? "Upcoming Litter" : "Current Litter"}
            </p>
            <h3 className="mt-2 font-display text-3xl font-bold text-foreground lg:text-4xl">
              {litter.name}
            </h3>
            {(litter.dam_name || litter.sire_name || litter.born_date || litter.ready_date) && (
              <p className="mt-2 text-sm text-muted-foreground">
                {[
                  litter.dam_name && litter.sire_name
                    ? `${litter.dam_name} × ${litter.sire_name}`
                    : null,
                  litter.born_date
                    ? `Born ${formatDateOnly(litter.born_date, { month: "long", year: "numeric" })}`
                    : null,
                  litter.ready_date
                    ? `Ready ${formatDateOnly(litter.ready_date, { month: "long", year: "numeric" })}`
                    : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </p>
            )}
          </div>
          {total > 0 && (
            <span className="rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
              {available} of {total} available
            </span>
          )}
        </div>
        {litter.description && (
          <p className="mt-4 max-w-3xl text-base text-muted-foreground">{litter.description}</p>
        )}
      </div>

      {/* Puppies grid */}
      {puppies.length === 0 ? (
        <p className="mt-8 text-center text-sm text-muted-foreground">
          Puppies for this litter will be announced soon.
        </p>
      ) : (
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {puppies.map((p) => (
            <PuppyCard key={p.id} puppy={p} sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw" />
          ))}
        </div>
      )}
    </div>
  );
}
