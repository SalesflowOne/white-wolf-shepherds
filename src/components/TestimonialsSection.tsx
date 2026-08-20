import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import SectionHeading from "@/components/SectionHeading";

export type Testimonial = {
  id: string;
  name: string;
  location: string | null;
  quote: string;
  photo_url: string | null;
  puppy_name: string | null;
  rating: number | null;
  date?: string | null;
};

export default function TestimonialsSection() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase
        .from("wws_testimonials")
        .select("id,name,location,quote,photo_url,puppy_name,rating,created_at")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .limit(6);
      if (!active) return;
      if (data && data.length > 0) {
        setItems(
          data.map((row) => ({
            ...row,
            date: row.created_at,
          })) as Testimonial[],
        );
      }
      setLoaded(true);
    })();
    return () => {
      active = false;
    };
  }, []);

  const hasPublished = items.length > 0;

  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="Happy Families"
          subtitle={
            hasPublished
              ? "Every family here started exactly where you are — with one application and a few questions."
              : "We're collecting stories from our first placements. Until then, here's what we stand behind."
          }
        />

        {!loaded ? (
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse rounded-2xl bg-muted p-8">
                <div className="h-4 w-24 rounded bg-muted-foreground/10" />
                <div className="mt-6 h-24 rounded bg-muted-foreground/10" />
                <div className="mt-6 h-4 w-32 rounded bg-muted-foreground/10" />
              </div>
            ))}
          </div>
        ) : hasPublished ? (
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {items.map((t) => (
              <figure
                key={t.id}
                className="flex flex-col rounded-2xl bg-card p-8 shadow-card transition-all hover:shadow-wolf motion-reduce:transition-none"
              >
                {t.rating != null && t.rating > 0 && (
                  <div className="flex gap-1 text-accent" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <svg
                        key={i}
                        aria-hidden="true"
                        className="h-5 w-5 fill-current"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                )}

                <blockquote className="mt-5 flex-1 text-lg italic leading-relaxed text-foreground">
                  “{t.quote}”
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-border pt-4">
                  {t.photo_url && (
                    <img
                      src={t.photo_url}
                      alt=""
                      loading="lazy"
                      width={44}
                      height={44}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-display text-sm font-bold text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {[t.location, t.puppy_name ? `puppy parent to ${t.puppy_name}` : null]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="mt-16 grid gap-8 lg:grid-cols-2">
            <div className="rounded-2xl bg-card p-8 shadow-card lg:col-span-2">
              <p className="font-display text-lg font-bold text-foreground">A note from the breeder</p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                White Wolf Shepherds is a small, family-run program. We don&apos;t publish reviews we
                can&apos;t stand behind — when our first families are ready to share their experience,
                their words will appear here. In the meantime, every puppy goes home with a written
                1-year genetic health guarantee and our lifetime return commitment: if you ever
                cannot keep your dog, you call us first.
              </p>
              <p className="mt-4 text-sm text-muted-foreground">
                Content slot: add published rows to the <code className="text-foreground">wws_testimonials</code>{" "}
                table in the admin portal when real testimonials are ready.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <h3 className="font-display text-base font-bold text-foreground">1-year genetic guarantee</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Health-tested parents, vet exam before go-home, and a written guarantee you can share
                with your own veterinarian before you pay.
              </p>
              <Link to="/health-guarantee" className="mt-4 inline-block text-sm font-semibold text-accent hover:underline">
                Read the full guarantee →
              </Link>
            </div>

            <div className="rounded-2xl border border-border bg-card p-8 shadow-card">
              <h3 className="font-display text-base font-bold text-foreground">Lifetime return commitment</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                If life changes and you cannot keep your White Wolf Shepherd, we take them back — at
                any age, for any reason. No dog from our program ends up in a shelter.
              </p>
              <Link to="/health-guarantee" className="mt-4 inline-block text-sm font-semibold text-accent hover:underline">
                See our policy →
              </Link>
            </div>
          </div>
        )}

        <div className="mt-12 text-center">
          <Link
            to="/get-started"
            className="inline-block rounded-xl bg-accent px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-accent-foreground transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Start your application
          </Link>
        </div>
      </div>
    </section>
  );
}
