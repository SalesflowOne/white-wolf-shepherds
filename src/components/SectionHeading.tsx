type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  as?: "h1" | "h2" | "h3";
};

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as: Tag = "h2",
}: Props) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <div className={align === "center" ? "text-center" : ""}>
      {eyebrow && (
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">{eyebrow}</p>
      )}
      <Tag className="mt-3 font-display text-4xl font-bold text-foreground lg:text-5xl">{title}</Tag>
      {subtitle && (
        <p className={`mt-4 max-w-2xl text-lg text-muted-foreground ${alignment}`}>{subtitle}</p>
      )}
    </div>
  );
}
