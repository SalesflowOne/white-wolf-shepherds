const STYLES: Record<string, string> = {
  available: "bg-accent text-accent-foreground",
  pending: "bg-amber-500 text-white",
  reserved: "bg-primary text-primary-foreground",
  sold: "bg-muted text-muted-foreground",
  placed: "bg-muted text-muted-foreground",
  parent: "bg-ice text-primary",
};

const LABELS: Record<string, string> = {
  available: "Available",
  pending: "Pending",
  reserved: "Reserved",
  sold: "Placed",
  placed: "Placed",
  parent: "Parent",
};

export default function StatusBadge({
  status,
  className = "",
}: {
  status: string | null | undefined;
  className?: string;
}) {
  const key = (status ?? "").toLowerCase();
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
        STYLES[key] ?? "bg-muted text-muted-foreground"
      } ${className}`}
    >
      {LABELS[key] ?? status ?? "—"}
    </span>
  );
}
