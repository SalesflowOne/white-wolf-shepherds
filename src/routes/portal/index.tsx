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
  const { data } = await supabase.from(T.profiles).select("role").eq("id", userId).maybeSingle();
  return (data?.role ?? "applicant") as RoleName;
}

function PortalLoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        setChecking(false);
        return;
      }
      const role = await resolveRole(session.user.id);
      navigate({ to: role === "admin" ? "/portal/admin" : "/portal/me" });
    });

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
    const redirectTo = `${window.location.origin}/portal/me`;

    const { error: authError } = await supabase.auth.signInWithOtp({
      email: normalized,
      options: { emailRedirectTo: redirectTo },
    });

    setLoading(false);

    if (authError) {
      setError(authError.message);
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
              Enter the email you applied with and we'll send you a magic link.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-card p-8 shadow-card">
            {sent ? (
              <div className="text-center">
                <p className="text-sm text-foreground">
                  Check your inbox at <strong>{email}</strong> for your sign-in link.
                </p>
                <p className="mt-2 text-xs text-muted-foreground">
                  The link expires in about an hour. Check spam if you don't see it.
                </p>
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
                  autoComplete="email"
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                  placeholder="you@example.com"
                />

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="mt-6 w-full rounded-xl bg-accent py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Magic Link"}
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
