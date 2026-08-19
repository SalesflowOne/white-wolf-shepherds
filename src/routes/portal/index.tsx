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
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (!session) {
        setChecking(false);
        return;
      }
      const role = await resolveRole(session.user.id);
      navigate({ to: role === "admin" ? "/portal/admin" : "/portal/me" });
    });
  }, [navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setNotice("");
    setLoading(true);

    const { data, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password,
    });

    setLoading(false);

    if (authError || !data.session) {
      setError(authError?.message ?? "Invalid email or password.");
      return;
    }

    const role = await resolveRole(data.session.user.id);
    navigate({ to: role === "admin" ? "/portal/admin" : "/portal/me" });
  }

  async function handleForgot() {
    setError("");
    setNotice("");
    const normalized = email.trim().toLowerCase();
    if (!normalized) {
      setError("Enter your email first, then click “Set or reset password”.");
      return;
    }
    setLoading(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(normalized, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setNotice(`We sent a password setup link to ${normalized}.`);
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
              Sign in with your email and password.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-card p-8 shadow-card">
            <form onSubmit={handleLogin}>
              {error && (
                <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}
              {notice && (
                <div className="mb-6 rounded-lg border border-accent/30 bg-accent/10 p-3 text-sm text-foreground">
                  {notice}
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

              <label className="mt-5 mb-2 block text-sm font-medium text-foreground">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20"
                placeholder="••••••••"
              />

              <button
                type="submit"
                disabled={loading || !email || !password}
                className="mt-6 w-full rounded-xl bg-accent py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Signing in..." : "Sign In"}
              </button>

              <button
                type="button"
                onClick={handleForgot}
                disabled={loading}
                className="mt-4 w-full text-center text-xs font-semibold text-accent hover:text-accent/80 disabled:opacity-50"
              >
                Set or reset password
              </button>

              <p className="mt-6 text-center text-xs text-muted-foreground">
                New here?{" "}
                <Link to="/apply" className="font-semibold text-accent hover:text-accent/80">
                  Apply for this litter
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
