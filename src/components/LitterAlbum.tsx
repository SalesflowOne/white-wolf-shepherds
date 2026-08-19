import { useEffect, useState } from "react";
import SmartImage from "@/components/SmartImage";
import { Link } from "@tanstack/react-router";
import { supabase, T } from "@/integrations/supabase/client";

type LitterRow = {
  id: string;
  name: string | null;
  slug: string | null;
  born_date: string | null;
  ready_date: string | null;
  description: string | null;
  cover_image_url: string | null;
  gallery_urls: string[] | null;
};

type PuppyShot = {
  name: string;
  slug: string;
  image_url: string | null;
  collar_color: string | null;
};

/**
 * Litter profile: group photos of the litter plus a handful of
 * individual puppy portraits pulled from the puppy records.
 */
export default function LitterAlbum({ maxPuppyShots = 6 }: { maxPuppyShots?: number }) {
  const [litter, setLitter] = useState<LitterRow | null>(null);
  const [shots, setShots] = useState<PuppyShot[]>([]);

  useEffect(() => {
    (async () => {
      const { data: litters } = await supabase
        .from(T.litters)
        .select("id, name, slug, born_date, ready_date, description, cover_image_url, gallery_urls")
        .order("priority_order", { ascending: true })
        .limit(1);
      if (litters && litters.length > 0) setLitter(litters[0] as LitterRow);

      const { data: pups } = await supabase
        .from(T.puppies)
        .select("name, slug, image_url, collar_color, priority_order, status")
        .neq("status", "parent")
        .not("image_url", "is", null)
        .order("priority_order", { ascending: true });
      if (pups) setShots((pups as PuppyShot[]).slice(0, maxPuppyShots));
    })();
  }, [maxPuppyShots]);

  const groupPhotos = litter?.gallery_urls ?? [];
  if (groupPhotos.length === 0 && shots.length === 0) return null;

  return (
    <section className="py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Litter Profile
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-foreground lg:text-4xl">
            {litter?.name ?? "Our Current Litter"}
          </h2>
          {litter?.description && (
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{litter.description}</p>
          )}
        </div>

        {groupPhotos.length > 0 && (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {groupPhotos.map((url, i) => (
              <div key={url} className="overflow-hidden rounded-2xl shadow-card">
                <SmartImage
                  src={url}
                  alt={`${litter?.name ?? "Litter"} group photo ${i + 1}`}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="aspect-[3/4] w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}

        {shots.length > 0 && (
          <>
            <h3 className="mt-16 text-center font-display text-2xl font-bold text-foreground">
              Faces of the Litter
            </h3>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {shots.map((p) => (
                <Link
                  key={p.slug}
                  to="/puppies/$slug"
                  params={{ slug: p.slug }}
                  className="group overflow-hidden rounded-xl shadow-card"
                >
                  <SmartImage
                    src={p.image_url!}
                    alt={`${p.name}${p.collar_color ? ` — ${p.collar_color} collar` : ""}`}
                    sizes="(min-width: 1024px) 16vw, (min-width: 640px) 33vw, 50vw"
                    className="aspect-[4/5] w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="bg-card px-2 py-2 text-center text-xs font-semibold text-card-foreground">
                    {p.name}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
