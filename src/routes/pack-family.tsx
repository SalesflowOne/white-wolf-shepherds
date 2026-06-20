import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase, T } from "@/integrations/supabase/client";
import demoSire from "@/assets/demo-sire.jpg";
import demoDam from "@/assets/demo-dam.jpg";

export const Route = createFileRoute("/pack-family")({
  component: PackFamilyPage,
  head: () => ({
    meta: [
      { title: "Pack Family — White Wolf Shepherds" },
      {
        name: "description",
        content:
          "Meet the parent dogs behind White Wolf Shepherds — Haki and Mia, our health-tested foundation sire and dam.",
      },
      { property: "og:title", content: "Pack Family — White Wolf Shepherds" },
      {
        property: "og:description",
        content: "Meet Haki and Mia, the parent dogs behind every White Wolf Shepherds litter.",
      },
    ],
  }),
});

type ParentDog = {
  id: string;
  name: string;
  slug: string | null;
  sex: string | null;
  image_url: string | null;
  personality_bio: string | null;
  ideal_home: string | null;
  dob: string | null;
};

function PackFamilyPage() {
  const [parents, setParents] = useState<ParentDog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from(T.puppies)
        .select("id, name, slug, sex, image_url, personality_bio, ideal_home, dob")
        .eq("status", "parent")
        .order("sex", { ascending: false }); // males first (sire), then females (dam)
      if (!cancelled) {
        setParents((data ?? []) as ParentDog[]);
        setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />

      <header className="bg-gradient-frost pt-28 pb-16 lg:pt-36">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
            Our Foundation
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold text-foreground lg:text-5xl">
            The Pack Family
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Every White Wolf puppy carries the temperament, structure, and heart of our parent dogs.
            Meet the dam and sire behind the program.
          </p>
        </div>
      </header>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-6">
          {loading ? (
            <p className="text-center text-sm text-muted-foreground">Loading the pack…</p>
          ) : parents.length === 0 ? (
            <p className="text-center text-sm text-muted-foreground">
              Pack family profiles coming soon.
            </p>
          ) : (
            <div className="grid gap-12 md:grid-cols-2">
              {parents.map((p) => (
                <article key={p.id} className="rounded-2xl bg-card p-8 shadow-card">
                  <div className="relative overflow-hidden rounded-xl bg-muted">
                    <img
                      src={p.image_url ?? (p.sex === "male" ? demoSire : demoDam)}
                      alt={`${p.name}, White Wolf Shepherds parent dog`}
                      loading="lazy"
                      className="h-72 w-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <span className="rounded-lg bg-white/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-black shadow-lg">
                        Real image coming soon
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <h2 className="font-display text-2xl font-bold text-foreground">{p.name}</h2>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground">
                      {p.sex === "male" ? "Sire" : p.sex === "female" ? "Dam" : "Parent"}
                    </span>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      OFA Certified
                    </span>
                    <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                      AKC Registered
                    </span>
                  </div>

                  <p className="mt-4 text-muted-foreground">
                    {p.personality_bio?.trim()
                      ? p.personality_bio
                      : `${p.name} is one of our foundation parents — health-tested, temperament-evaluated, and devoted to the pack.`}
                  </p>

                  {p.ideal_home?.trim() && (
                    <p className="mt-3 text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Notes: </span>
                      {p.ideal_home}
                    </p>
                  )}

                  <div className="mt-6">
                    <Link
                      to="/apply"
                      search={{ parent: p.name }}
                      className="inline-block rounded-xl bg-accent px-6 py-3 text-xs font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
                    >
                      Inquire about {p.name}
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}

          <div className="mt-16 text-center">
            <Link
              to="/litter"
              className="rounded-xl bg-accent px-8 py-4 text-sm font-bold uppercase tracking-wider text-accent-foreground shadow-wolf transition-all hover:brightness-110"
            >
              View the Current Litter
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
