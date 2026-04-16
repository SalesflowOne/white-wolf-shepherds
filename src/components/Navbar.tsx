import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { label: "About", href: "#about" },
    { label: "Puppies", href: "#puppies" },
    { label: "Gallery", href: "#gallery" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-primary/95 backdrop-blur-md border-b border-primary-foreground/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="font-display text-xl font-bold tracking-wide text-primary-foreground">
          White Wolf <span className="text-ice">Shepherds</span>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium tracking-wide text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-all hover:brightness-110"
          >
            Inquire Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="text-primary-foreground md:hidden"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-primary-foreground/10 bg-primary/95 px-6 pb-6 md:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-accent px-5 py-2.5 text-center text-sm font-semibold text-accent-foreground"
          >
            Inquire Now
          </a>
        </div>
      )}
    </nav>
  );
}
