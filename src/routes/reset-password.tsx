import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/reset-password")({
  component: ResetPasswordPage,
  head: () => ({
    meta: [
      { title: "Set Your Password — White Wolf Shepherds" },
      {
        name: "description",
        content:
          "Create a new password for your White Wolf Shepherds portal account and sign in securely.",
      },
      { property: "og:title", content: "Set Your Password — White Wolf Shepherds" },
      {
        property: "og:description",
        content: "Create a new password for your White Wolf Shepherds portal account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

const inputCls =
  "w-full rounded-lg border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-ring/20";

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Supabase parses the recovery hash/code on load; wait for the session.
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setBusy(true);
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setDone(true);
    setTimeout(() => navigate({ to: "/portal" }), 1500);
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex min-h-[80vh] items-center justify-center bg-gradient-frost px-6 pt-28 pb-16">
        <div className="w-full max-w-sm">
          <h1 className="text-center font-display text-3xl font-bold text-foreground">
            Set Your Password
          </h1>
          <div className="mt-8 rounded-2xl bg-card p-8 shadow-card">
            {done ? (
              <p className="text-center text-sm text-foreground">
                Password updated. Taking you to the portal…
              </p>
            ) : !ready ? (
              <p className="text-center text-sm text-muted-foreground">
                Open this page from the link in your email to set a new password.
              </p>
            ) : (
              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="mb-6 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}
                <label className="mb-2 block text-sm font-medium text-foreground">
                  New password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  className={inputCls}
                />
                <label className="mt-5 mb-2 block text-sm font-medium text-foreground">
                  Confirm password
                </label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  autoComplete="new-password"
                  className={inputCls}
                />
                <button
                  type="submit"
                  disabled={busy}
                  className="mt-6 w-full rounded-xl bg-accent py-3 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {busy ? "Saving..." : "Save Password"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
