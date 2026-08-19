import { useEffect, useState } from "react";
import { supabase, T } from "@/integrations/supabase/client";

export type ParentDog = {
  id: string;
  name: string;
  slug: string | null;
  sex: string | null;
  dob: string | null;
  image_url: string | null;
  gallery_urls: string[] | null;
  personality_bio: string | null;
};

export type LitterInfo = {
  id: string;
  name: string | null;
  slug: string | null;
  born_date: string | null;
  ready_date: string | null;
  status: string | null;
  cover_image_url: string | null;
};

/** Pulls every dog flagged status='parent' straight from the profiles table. */
export function useParents() {
  const [parents, setParents] = useState<ParentDog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase
        .from(T.puppies)
        .select("id,name,slug,sex,dob,image_url,gallery_urls,personality_bio")
        .eq("status", "parent")
        .order("sex", { ascending: false });
      if (!active) return;
      setParents((data ?? []) as ParentDog[]);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  const dam = parents.find((p) => p.sex === "female") ?? null;
  const sire = parents.find((p) => p.sex === "male") ?? null;

  return { parents, dam, sire, loading };
}

/** Current litter record — the single source of truth for whelp/ready dates. */
export function useCurrentLitter() {
  const [litter, setLitter] = useState<LitterInfo | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      const { data } = await supabase
        .from(T.litters)
        .select("id,name,slug,born_date,ready_date,status,cover_image_url")
        .order("priority_order", { ascending: false })
        .limit(1)
        .maybeSingle();
      if (!active) return;
      setLitter((data ?? null) as LitterInfo | null);
    })();
    return () => {
      active = false;
    };
  }, []);

  return litter;
}

export function formatLongDate(dateStr?: string | null): string | null {
  if (!dateStr) return null;
  const d = new Date(`${dateStr.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

/** Human-readable age, e.g. "9 weeks old" or "2 yrs 3 mos". */
export function ageFrom(dateStr?: string | null): string | null {
  if (!dateStr) return null;
  const d = new Date(`${dateStr.slice(0, 10)}T00:00:00`);
  if (Number.isNaN(d.getTime())) return null;
  const days = Math.floor((Date.now() - d.getTime()) / 86_400_000);
  if (days < 0) return null;
  if (days < 14) return `${days} day${days === 1 ? "" : "s"} old`;
  if (days < 120) {
    const w = Math.floor(days / 7);
    return `${w} week${w === 1 ? "" : "s"} old`;
  }
  const months = Math.floor(days / 30.44);
  if (months < 24) return `${months} months old`;
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem ? `${years} yrs ${rem} mos` : `${years} years old`;
}
