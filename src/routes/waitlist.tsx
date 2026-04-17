import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
        content: "Join the waitlist for our next White German Shepherd litter.",
      },
    ],
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
