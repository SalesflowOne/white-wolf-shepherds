const COLLAR_SWATCHES: Record<string, string> = {
  red: "#dc2626",
  blue: "#2563eb",
  teal: "#0d9488",
  pink: "#ec4899",
  black: "#111111",
  purple: "#7c3aed",
  orange: "#f97316",
  "lime green": "#84cc16",
  "yellow-gold": "#eab308",
  white: "#f8fafc",
};

export function collarSwatch(color?: string | null): string {
  if (!color) return "#94a3b8";
  return COLLAR_SWATCHES[color.trim().toLowerCase()] ?? "#94a3b8";
}

export default function CollarBadge({
  color,
  className = "",
}: {
  color?: string | null;
  className?: string;
}) {
  if (!color) return null;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold text-foreground shadow-sm ring-1 ring-border ${className}`}
    >
      <span
        className="h-3 w-3 rounded-full ring-1 ring-black/20"
        style={{ backgroundColor: collarSwatch(color) }}
        aria-hidden="true"
      />
      {color} collar
    </span>
  );
}
