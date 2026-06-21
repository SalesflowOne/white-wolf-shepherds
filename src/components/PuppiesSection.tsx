import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase, T } from "@/integrations/supabase/client";

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
  litter_id: string | null;
  priority_order: number | null;
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
          .select("id, name, slug, sex, status, image_url, litter_id, priority_order")
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
                    ? `Born ${new Date(litter.born_date).toLocaleDateString(undefined, { month: "long", year: "numeric" })}`
                    : null,
                  litter.ready_date
                    ? `Ready ${new Date(litter.ready_date).toLocaleDateString(undefined, { month: "long", year: "numeric" })}`
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
            <PuppyCard key={p.id} puppy={p} />
          ))}
        </div>
      )}
    </div>
  );
}

function PuppyCard({ puppy }: { puppy: Puppy }) {
  const isAvailable = puppy.status === "available";
  return (
    <div className="group overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:shadow-wolf">
      <div className="relative overflow-hidden">
        {puppy.image_url ? (
          <img
            src={puppy.image_url}
            alt={puppy.name}
            className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            width={800}
            height={800}
          />
        ) : (
          <div className="flex h-72 w-full items-center justify-center bg-muted">
            <span className="font-display text-3xl text-muted-foreground/30">{puppy.name}</span>
          </div>
        )}
        {!puppy.image_url && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg">
              Real image coming soon
            </span>
          </div>
        )}
        <span
          className={`absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
            isAvailable ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          {puppy.status ?? "—"}
        </span>
      </div>
      <div className="p-6">
        <h4 className="font-display text-2xl font-bold text-card-foreground">{puppy.name}</h4>
        {puppy.sex && <p className="mt-2 text-sm capitalize text-muted-foreground">{puppy.sex}</p>}
        {puppy.slug ? (
          <Link
            to="/puppies/$slug"
            params={{ slug: puppy.slug }}
            className="mt-5 inline-block w-full rounded-xl bg-primary py-3 text-center text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110"
          >
            View {puppy.name}
          </Link>
        ) : (
          <Link
            to="/apply"
            className="mt-5 inline-block w-full rounded-xl bg-primary py-3 text-center text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110"
          >
            Inquire About {puppy.name}
          </Link>
        )}
      </div>
    </div>
  );
}
