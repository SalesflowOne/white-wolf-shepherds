import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/waitlist")({
  component: WaitlistPage,
  head: () => ({
    meta: [
      { title: "Join the Waitlist — White Wolf Shepherds" },
      { name: "description", content: "Join the waitlist for our next White German Shepherd litter." },
    ],
  }),
});

function WaitlistPage() {
  // Redirect to /apply with waitlist param
  if (typeof window !== "undefined") {
    window.location.href = "/apply?waitlist=true";
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex min-h-[60vh] items-center justify-center pt-20">
        <p className="text-muted-foreground">Redirecting to waitlist application...</p>
      </div>
      <Footer />
    </div>
  );
}
