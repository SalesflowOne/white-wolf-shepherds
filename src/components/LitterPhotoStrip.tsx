import { useEffect, useState } from "react";
import { supabase, T } from "@/integrations/supabase/client";

/** Group litter photos shown on an individual puppy profile. */
export default function LitterPhotoStrip({ puppyName }: { puppyName: string }) {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from(T.litters)
        .select("gallery_urls, priority_order")
        .order("priority_order", { ascending: true })
        .limit(1);
      const row = data?.[0] as { gallery_urls: string[] | null } | undefined;
      if (row?.gallery_urls) setUrls(row.gallery_urls);
    })();
  }, []);

  if (urls.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="font-display text-lg font-bold text-foreground">From the litter</h3>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {urls.slice(0, 6).map((url, i) => (
          <div key={url} className="overflow-hidden rounded-xl">
            <img
              src={url}
              alt={`${puppyName}'s litter, group photo ${i + 1}`}
              loading="lazy"
              className="h-28 w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
