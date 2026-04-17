import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

// Legacy route — redirects to /portal/admin (role-based auth).
export const Route = createFileRoute("/admin")({
  component: LegacyAdminRedirect,
});

function LegacyAdminRedirect() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/portal/admin", replace: true });
  }, [navigate]);
  return null;
}
