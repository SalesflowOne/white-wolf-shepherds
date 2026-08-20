import {
  Outlet,
  Link,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { googleAdsHeadScripts, initAnalytics, trackPageView } from "@/lib/analytics";
import { handleContactLinkClick } from "@/lib/contact-tracking";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "White Wolf Shepherds — White German Shepherd Puppies" },
      {
        name: "description",
        content:
          "White Wolf Shepherds raises health-tested, family-raised white German Shepherd puppies for select homes. Vet-checked, microchipped, 1-year genetic health guarantee.",
      },
      { name: "author", content: "White Wolf Shepherds" },
      { property: "og:title", content: "White Wolf Shepherds — White German Shepherd Puppies" },
      { property: "og:site_name", content: "White Wolf Shepherds" },
      {
        property: "og:description",
        content:
          "White Wolf Shepherds raises health-tested, family-raised white German Shepherd puppies for select homes. Vet-checked, microchipped, 1-year genetic health guarantee.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      
      { name: "twitter:title", content: "White Wolf Shepherds — White German Shepherd Puppies" },
      {
        name: "twitter:description",
        content:
          "White Wolf Shepherds raises health-tested, family-raised white German Shepherd puppies for select homes. Vet-checked, microchipped, 1-year genetic health guarantee.",
      },
    ],
    scripts: [
      ...googleAdsHeadScripts(),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "White Wolf Shepherds",
          description:
            "Breeder of health-tested white German Shepherd puppies, family-raised for select homes.",
          url: "https://stellar-shepherd-sanctuary.lovable.app",
          image: "https://stellar-shepherd-sanctuary.lovable.app/dogs/haki/haki-golden-hour-05.webp",
          priceRange: "$$",
        }),
      },
    ],
    links: [
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700;800&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-accent-foreground"
        >
          Skip to main content
        </a>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    trackPageView(pathname);
  }, [pathname]);

  useEffect(() => {
    document.addEventListener("click", handleContactLinkClick);
    return () => document.removeEventListener("click", handleContactLinkClick);
  }, []);

  return <Outlet />;
}
