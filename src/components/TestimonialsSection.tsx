import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import SectionHeading from "@/components/SectionHeading";

type Testimonial = {
  id: string;
  name: string;
  location: string | null;
  quote: string;
  photo_url: string | null;
  puppy_name: string | null;
  rating: number | null;
};

/** Shown only until the first published testimonial exists in the database. */
const FALLBACK: Testimonial[] = [
  {
    id: "f1",
    name: "The Anderson Family",
    location: "Colorado",
    quote:
      "Our Arctic from White Wolf Shepherds is the gentlest, most loving companion we've ever had. The kids are absolutely inseparable from him.",
    photo_url: null,
    puppy_name: "Arctic",
    rating: 5,
  },
  {
    id: "f2",
    name: "Sarah & Michael Chen",
    location: "Oregon",
    quote:
      "The professionalism and care that goes into every puppy is unmatched. From health testing to socialization — you can see the love in every detail.",
    photo_url: null,
    puppy_name: null,
    rating: 5,
  },
  {
    id: "f3",
    name: "Dr. James Harlow",
    location: "Montana",
    quote:
      "We've had German Shepherds for 20 years. The White Wolf bloodline is something truly special — intelligence, beauty, and the sweetest temperament.",
    photo_url: null,
    puppy_name: null,
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [items, setItems] = useState<Testimonial[]>(FALLBACK);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase
        .from("wws_testimonials")
        .select("id,name,location,quote,photo_url,puppy_name,rating")
        .eq("published", true)
        .order("sort_order", { ascending: true })
        .limit(6);
      if (active && data && data.length > 0) setItems(data as Testimonial[]);
    })();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="testimonials" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="Happy Families"
          subtitle="Every family here started exactly where you are — with one email and a few questions."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {items.map((t) => (
            <figure
              key={t.id}
              className="flex flex-col rounded-2xl bg-card p-8 shadow-card transition-all hover:shadow-wolf motion-reduce:transition-none"
            >
              <div className="flex gap-1 text-accent" aria-label={`${t.rating ?? 5} out of 5 stars`}>
                {Array.from({ length: t.rating ?? 5 }).map((_, i) => (
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
