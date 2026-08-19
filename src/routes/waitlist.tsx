import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import { useEffect } from "react";

// Waitlist is a thin redirect to /apply with the waitlist flag preset.
// The /apply form writes stage='waitlist' when ?waitlist=true is present.
export const Route = createFileRoute("/waitlist")({
  component: WaitlistRedirect,
  head: () => ({
    meta: [
      { title: "Join the Waitlist — White Wolf Shepherds" },
      {
        name: "description",
        content: "Join the waitlist for our next White German Shepherd litter and get first notice when puppies become available.",
      },
      { property: "og:title", content: "Join the Waitlist — White Wolf Shepherds" },
      {
        property: "og:description",
        content: "Join the waitlist for our next White German Shepherd litter and get first notice when puppies become available.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `${SITE_URL}/waitlist` },
      { property: "og:image", content: `${SITE_URL}/puppies/litter/litter-sunny-garden-02.webp` },
      { name: "twitter:image", content: `${SITE_URL}/puppies/litter/litter-sunny-garden-02.webp` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Join the Waitlist — White Wolf Shepherds" },
      {
        name: "twitter:description",
        content: "Join the waitlist for our next White German Shepherd litter and get first notice when puppies become available.",
      },
    ],
    links: [{ rel: "canonical", href: `${SITE_URL}/waitlist` }],
  }),
});

function WaitlistRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/apply", search: { waitlist: "true" }, replace: true });
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <p className="text-muted-foreground">Loading the waitlist form...</p>
    </div>
  );
}
