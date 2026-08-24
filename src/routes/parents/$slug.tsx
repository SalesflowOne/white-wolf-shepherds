import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase, T } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmartImage from "@/components/SmartImage";
import TrustStrip from "@/components/TrustStrip";
import { formatLongDate, ageFrom } from "@/hooks/useParents";
import { SITE_URL } from "@/lib/site";

type Parent = {
  id: string;
  name: string;
  slug: string;
  sex: string | null;
  dob: string | null;
  status: string | null;
  temperament_tags: string[] | null;
  personality_bio: string | null;
  ideal_home: string | null;
  image_url: string | null;
  gallery_urls: string[] | null;
  video_url: string | null;
};

type SeoParent = {
  name: string;
  sex: string | null;
  personality_bio: string | null;
  image_url: string | null;
};

function roleFor(sex?: string | null) {
  return sex === "male" ? "Sire" : sex === "female" ? "Dam" : "Parent";
}

export const Route = createFileRoute("/parents/$slug")({
  component: ParentProfilePage,
  loader: async ({ params }) => {
    const { data } = await supabase
      .from(T.puppies)
      .select("name,sex,personality_bio,image_url")
      .eq("slug", params.slug)
      .eq("status", "parent")
      .maybeSingle();
    return { seo: (data as SeoParent | null) ?? null };
  },
  head: ({ params, loaderData }) => {
    const url = `${SITE_URL}/parents/${params.slug}`;
    const p = loaderData?.seo;
    if (!p) {
      return {
        meta: [
          { title: "Parent Unavailable — White Wolf Shepherds" },
          { name: "robots", content: "noindex" },
        ],
        links: [{ rel: "canonical", href: url }],
      };
    }
    const role = roleFor(p.sex);
    const title = `${p.name} — Our ${role} | White Wolf Shepherds`;
    const description =
      p.personality_bio?.slice(0, 155) ??
      `Meet ${p.name}, the ${role.toLowerCase()} behind our white German Shepherd litters. Health tested and AKC registered.`;
    const image = p.image_url ? `${SITE_URL}${p.image_url}` : null;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "profile" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
});

function Vital({ label, value }: { label: string; value?: string | null }) {
  if (!value) return null;
  return (
    <div className="rounded-xl bg-muted/50 p-4">
      <dt className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-semibold capitalize text-foreground">{value}</dd>
    </div>
  );
}

function ParentProfilePage() {
  const { slug } = Route.useParams();
  const [parent, setParent] = useState<Parent | null>(null);
  const [siblings, setSiblings] = useState<Parent[]>([]);
  const [loading, setLoading] = useState(true);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setMissing(false);
    (async () => {
      const { data, error } = await supabase
        .from(T.puppies)
        .select("*")
        .eq("slug", slug)
        .eq("status", "parent")
        .maybeSingle();

      if (!active) return;
      if (error || !data) {
        setMissing(true);
        setLoading(false);
        return;
      }
      setParent(data as Parent);

      const { data: others } = await supabase
        .from(T.puppies)
        .select("id,name,slug,sex,image_url,status,dob,gallery_urls,personality_bio,ideal_home,temperament_tags,video_url")
        .eq("status", "parent")
        .neq("slug", slug);
      if (!active) return;
      setSiblings((others ?? []) as Parent[]);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-5xl px-4 py-24">
          <div className="h-8 w-40 animate-pulse rounded bg-muted" />
          <div className="mt-6 aspect-[4/5] w-full max-w-md animate-pulse rounded-2xl bg-muted" />
        </div>
        <Footer />
      </div>
    );
  }

  if (missing || !parent) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-3xl px-4 py-24 text-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Parent not found</h1>
          <p className="mt-3 text-muted-foreground">
            That profile is no longer available. Meet the rest of our pack instead.
          </p>
          <Link
            to="/parents"
            className="mt-6 inline-block rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
          >
            View All Parents
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const role = roleFor(parent.sex);
  const born = formatLongDate(parent.dob);
  const age = ageFrom(parent.dob);
  const gallery = parent.gallery_urls ?? [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-12 lg:py-16">
        <nav className="mb-6 text-sm text-muted-foreground">
          <Link to="/parents" className="font-medium text-accent hover:underline">
            Parents
          </Link>
          <span className="mx-2">/</span>
          <span>{parent.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            {parent.image_url ? (
              <SmartImage
                src={parent.image_url}
                alt={`${parent.name}, White Wolf Shepherds ${role.toLowerCase()}`}
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="aspect-[4/5] w-full rounded-2xl object-cover object-center shadow-card"
              />
            ) : (
              <div className="flex aspect-[4/5] w-full items-center justify-center rounded-2xl bg-muted">
                <span className="font-display text-6xl font-bold text-muted-foreground/25">
                  {parent.name[0]}
                </span>
              </div>
            )}
          </div>

          <div>
            <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
              {role}
            </span>
            <h1 className="mt-4 font-display text-4xl font-bold text-foreground lg:text-5xl">
              {parent.name}
            </h1>
            <p className="mt-2 text-sm font-semibold text-accent">
              Health Tested &middot; AKC Registered
            </p>

            {parent.personality_bio && (
              <p className="mt-5 leading-relaxed text-muted-foreground">
                {parent.personality_bio}
              </p>
            )}

            <dl className="mt-6 grid grid-cols-2 gap-3">
              <Vital label="Role" value={role} />
              <Vital label="Sex" value={parent.sex} />
              <Vital label="Born" value={born} />
              <Vital label="Age" value={age} />
            </dl>

            {parent.temperament_tags && parent.temperament_tags.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {parent.temperament_tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-muted px-3 py-1 text-xs font-medium capitalize text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {parent.ideal_home && (
              <div className="mt-6 rounded-xl border border-border p-4">
                <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  What {parent.name} Passes On
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {parent.ideal_home}
                </p>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/get-started"
                className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-opacity hover:opacity-90"
              >
                Reserve a Puppy &rarr;
              </Link>
              <Link
                to="/litter"
                className="rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                See Current Litter
              </Link>
            </div>
          </div>
        </div>

        {parent.video_url && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {parent.name} in Motion
            </h2>
            <div className="mt-4 overflow-hidden rounded-2xl bg-muted">
              <video src={parent.video_url} controls preload="none" className="w-full" />
            </div>
          </section>
        )}

        {gallery.length > 0 && (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold text-foreground">
              {parent.name}&rsquo;s Gallery
            </h2>
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {gallery.map((url, i) => (
                <SmartImage
                  key={url + i}
                  src={url}
                  alt={`${parent.name} photo ${i + 1}`}
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="aspect-[4/5] w-full rounded-xl object-cover object-center"
                />
              ))}
            </div>
          </section>
        )}

        {siblings.length > 0 && (
          <section className="mt-16">
            <h2 className="font-display text-2xl font-bold text-foreground">Meet the Other Half</h2>
            <div className="mt-5 grid gap-6 sm:grid-cols-2">
              {siblings.map((s) => (
                <Link
                  key={s.id}
                  to="/parents/$slug"
                  params={{ slug: s.slug }}
                  className="group flex items-center gap-4 rounded-2xl bg-card p-4 shadow-card transition-shadow hover:shadow-wolf"
                >
                  {s.image_url ? (
                    <SmartImage
                      src={s.image_url}
                      alt={s.name}
                      sizes="96px"
                      className="h-24 w-20 shrink-0 rounded-xl object-cover object-center"
                    />
                  ) : (
                    <div className="flex h-24 w-20 shrink-0 items-center justify-center rounded-xl bg-muted">
                      <span className="font-display text-2xl font-bold text-muted-foreground/25">
                        {s.name[0]}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wider text-accent">
                      {roleFor(s.sex)}
                    </p>
                    <p className="font-display text-xl font-bold text-card-foreground">{s.name}</p>
                    <p className="mt-1 text-sm text-accent group-hover:underline">
                      View profile &rarr;
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-16">
          <TrustStrip />
        </div>
      </main>

      <Footer />
    </div>
  );
}
