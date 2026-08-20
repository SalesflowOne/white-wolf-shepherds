import { Link } from "@tanstack/react-router";
import SmartImage from "@/components/SmartImage";
import { useParents, formatLongDate, ageFrom, type ParentDog } from "@/hooks/useParents";

function roleOf(p: ParentDog) {
  return p.sex === "male" ? "Sire" : p.sex === "female" ? "Dam" : "Parent";
}

function ParentCardBody({ parent }: { parent: ParentDog }) {
  const role = roleOf(parent);
  const born = formatLongDate(parent.dob);
  const age = ageFrom(parent.dob);

  return (
    <div className="overflow-hidden rounded-2xl bg-card shadow-card transition-shadow hover:shadow-wolf">
      {parent.image_url ? (
        <SmartImage
          src={parent.image_url}
          alt={`${parent.name}, White Wolf Shepherds ${role.toLowerCase()}`}
          sizes="(min-width: 1024px) 45vw, 100vw"
          className="aspect-[4/5] w-full object-cover object-center"
        />
      ) : (
        <div className="flex aspect-[4/5] w-full items-center justify-center bg-muted">
          <span className="font-display text-5xl font-bold text-muted-foreground/25">
            {parent.name[0]}
          </span>
        </div>
      )}

      <div className="p-6">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="font-display text-2xl font-bold text-card-foreground">{parent.name}</h3>
          <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-accent">
            {role}
          </span>
        </div>

        <p className="mt-2 text-sm font-medium text-accent">
          OFA Health Tested &middot; AKC Registered
        </p>

        {(born || age) && (
          <p className="mt-1 text-sm text-muted-foreground">
            {born ? `Born ${born}` : null}
            {born && age ? " · " : null}
            {age}
          </p>
        )}

        {parent.personality_bio && (
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {parent.personality_bio}
          </p>
        )}

        {parent.gallery_urls && parent.gallery_urls.length > 1 && (
          <div className="mt-4 grid grid-cols-4 gap-2">
            {parent.gallery_urls.slice(0, 4).map((url, i) => (
              <SmartImage
                key={url + i}
                src={url}
                alt={`${parent.name} photo ${i + 1}`}
                sizes="(min-width: 1024px) 15vw, 30vw"
                className="aspect-[4/5] w-full rounded-lg object-cover object-center"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function MeetTheParents({
  eyebrow = "The Foundation",
  title = "Meet the Parents",
  subtitle = "Every puppy we place is the product of two health-tested, temperament-proven White Shepherds. You are not buying a puppy — you are inheriting their bloodline.",
  showCta = true,
  className = "",
}: {
  eyebrow?: string | null;
  title?: string | null;
  subtitle?: string | null;
  showCta?: boolean;
  className?: string;
}) {
  const { parents, loading } = useParents();

  if (loading || parents.length === 0) return null;

  return (
    <section className={className}>
      {(eyebrow || title || subtitle) && (
        <div className="text-center">
          {eyebrow && (
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="mt-3 font-display text-3xl font-bold text-foreground lg:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {parents.map((p) => (
          <ParentCard key={p.id} parent={p} />
        ))}
      </div>

      {showCta && (
        <div className="mt-8 text-center">
          <Link
            to="/parents"
            className="text-sm font-semibold text-accent transition-colors hover:text-accent/80"
          >
            View Full Parent Profiles &rarr;
          </Link>
        </div>
      )}
    </section>
  );
}
