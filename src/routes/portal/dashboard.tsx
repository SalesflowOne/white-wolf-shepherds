import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

// Legacy route — keeps old bookmarks working.
// Redirects to the unified /portal/me page.
export const Route = createFileRoute("/portal/dashboard")({
  component: LegacyDashboardRedirect,
});

function LegacyDashboardRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/portal/me", replace: true });
  }, [navigate]);
  return null;
}
