import { CONTACT } from "@/lib/site";

export default function Footer() {
  const hasPhone = Boolean(CONTACT.phone && CONTACT.phoneDisplay);
  const hasEmail = Boolean(CONTACT.email);

  return (
    <footer className="bg-primary py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row md:items-start">
          <div>
            <span className="font-display text-lg font-bold text-primary-foreground">
              White Wolf <span className="text-ice">Shepherds</span>
            </span>
            <p className="mt-1 text-sm text-primary-foreground/50">
              Premium White German Shepherd Bloodlines
            </p>
            {(hasPhone || hasEmail) && (
              <div className="mt-4 flex flex-col gap-1 text-sm text-primary-foreground/70">
                {hasPhone && (
                  <a href={`tel:${CONTACT.phone}`} className="hover:text-primary-foreground">
                    {CONTACT.phoneDisplay}
                  </a>
                )}
                {hasEmail && (
                  <a href={`mailto:${CONTACT.email}`} className="hover:text-primary-foreground">
                    {CONTACT.email}
                  </a>
                )}
              </div>
            )}
          </div>
          <div className="flex gap-8 text-sm text-primary-foreground/50">
            <a href="#about" className="transition-colors hover:text-primary-foreground">
              About
            </a>
            <a href="#puppies" className="transition-colors hover:text-primary-foreground">
              Puppies
            </a>
            <a href="#gallery" className="transition-colors hover:text-primary-foreground">
              Gallery
            </a>
            <a href="#contact" className="transition-colors hover:text-primary-foreground">
              Contact
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-primary-foreground/10 pt-6 text-center text-xs text-primary-foreground/30">
          © {new Date().getFullYear()} White Wolf Shepherds. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
