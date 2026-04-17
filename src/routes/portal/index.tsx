import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase, T } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/portal/")({
  component: PortalLoginPage,
  head: () => ({
    meta: [
      { title: "My Portal — White Wolf Shepherds" },
      {
        name: "description",
        content: "Log in to access your White Wolf Shepherds portal.",
      },
    ],
  }),
});

type RoleName = "admin" | "applicant" | "owner" | "alumni";

async function resolveRole(userId: string): Promise<RoleName> {
  const { data } = await supabase
    .from(T.profiles)
    .select("role")
    .eq("id", userId)
    .maybeSingle();
  return ((data?.role ?? "applicant") as RoleName);
}

function PortalLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  // Already logged in? Route to the right place.
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        setChecking(false);
        return;
      }
      const role = await resolveRole(session.user.id);
      navigate({ to: role === "admin" ? "/portal/admin" : "/portal/me" });
    });

    // Watch for magic-link session creation
    const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session) {
        const role = await resolveRole(session.user.id);
        navigate({ to: role === "admin" ? "/portal/admin" : "/portal/me" });
      }
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const normalized = email.trim().toLowerCase();
    const siteUrl =
      import.meta.env.VITE_PUBLIC_SITE_URL ??
      import.meta.env.NEXT_PUBLIC_SITE_URL ??
      (typeof window !== "undefined" ? window.location.origin : "");

    const { error: authError } = await supabase.auth.signInWithOtp({
      email: normalized,
      options: {
        emailRedirectTo: `${siteUrl}/portal`,
        shouldCreateUser: false,
      },
    });

    setLoading(false);

    if (authError) {
      if (
        authError.message.toLowerCase().includes("user not found") ||
        authError.message.toLowerCase().includes("signups not allowed")
      ) {
        setError(
          "We don't have an account for that email. If you've submitted an application, use the email you applied with."
        );
      } else {
        setError(authError.message);
      }
      return;
    }

    setSent(true);
  }

  if (checking) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center pt-20">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="flex min-h-[80vh] items-center justify-center bg-gradient-frost px-6 pt-28 pb-16">
        <div className="w-full max-w-sm">
          <div className="text-center">
            <div className="mx-auto mb-6 inline-flex font-display text-2xl font-bold tracking-wide text-foreground">
              White Wolf <span className="ml-1 text-accent">Shepherds</span>
            </div>
            <h1 className="font-display text-3xl font-bold text-foreground">Welcome Back</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Enter the email you applied with to access your portal.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-card p-8 shadow-card">
            {sent ? (
              <div className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="font-display text-lg font-bold text-foreground">Check your email</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  We've sent you a secure link. No password needed.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setEmail("");
                  }}
                  className="mt-6 text-xs font-semibold text-accent hover:text-accent/80"
                >
                  Send another link
                </button>
              </div>
            ) : (
              <form onSubmit={handleSend}>
                {error && (
                  <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                  placeholder="you@example.com"
                />

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="mt-6 w-full rounded-xl bg-accent py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send My Access Link"}
                </button>

                <p className="mt-6 text-center text-xs text-muted-foreground">
                  New here?{" "}
                  <Link to="/apply" className="font-semibold text-accent hover:text-accent/80">
                    Apply for this litter
                  </Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
