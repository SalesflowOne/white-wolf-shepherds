# White Wolf Shepherds — Optimization & Conversion Master Plan

A full pass over the public site: one clear "Let's Get Started" conversion path, real trust content, transparent pricing and deposit terms, faster image delivery, and complete search metadata.

## 1. The "Let's Get Started" flow (primary conversion)

Today the site has three competing entry points (Begin Application, waitlist form, sticky bar) that all dump into `/apply`. Replace that with one guided flow.

- New `/get-started` route: a 3-step guided path
  1. **Pick your puppy** — live grid of available puppies (name, collar, sex, price), or "help me choose / next litter".
  2. **Tell us about your home** — short, high-intent questions (household, yard, experience, timeline).
  3. **Contact + submit** — name, email, phone, preferred contact; submits into the existing application table with the selected puppy attached.
- Progress indicator, one question group per screen, back/forward, answers preserved on refresh.
- Every CTA on the site (navbar, hero, sticky bar, puppy cards, litter page, parents page, footer) points at this flow, deep-linked with the puppy when clicked from a specific card.
- Keep the email-only waitlist as the secondary path for people not ready to apply, positioned as "Join the waitlist for the next litter".
- Confirmation screen with concrete next steps and expected reply time, plus the reservation/deposit explanation.

## 2. Trust and proof

- **Testimonials**: current three are placeholder copy and will be removed from the live homepage. The section becomes a database-driven testimonials block (admin can add name, location, quote, photo, puppy). Until you supply real quotes, the slot renders verifiable proof instead: health testing, guarantee highlights, and the breeder story.
- Admin gets a Testimonials panel to add/edit/reorder/publish real quotes.
- Health-guarantee and process content surfaced as compact trust strips near each CTA (vet-checked, dewormed, microchipped, 1-year genetic guarantee, lifetime breeder support) — pulled from your existing guarantee page so there's one source of truth.

## 3. Pricing and deposit transparency

- Puppy cards and profile pages show price ($2,000) plus deposit amount and exactly what it secures (holds the puppy, applied to balance, refund terms).
- A single shared pricing/terms component so the numbers change in one place.
- A "What's included" list next to price: vet exam, first shots, deworming, microchip, health guarantee, puppy pack, transport options.

## 4. Puppy and litter page polish

- Consistent card design across homepage, litter page, and profiles: same aspect ratio, same badge system, same CTA.
- Availability at a glance: available / pending / reserved with clear visual states, plus a live "X of 9 still available" counter.
- Puppy profile upgrades: sticky reserve bar on mobile, gallery lightbox with keyboard/swipe, sibling strip, parents block, vitals grid, and a "next available puppy" link so no page is a dead end.
- Empty and loading states everywhere (skeletons instead of blank space), and a graceful state when a litter is fully reserved.

## 5. Performance

- Puppy profile images are ~200 KB each at 1122×1402 and load at full size in small cards. Generate build-time responsive variants (multiple widths, AVIF + WebP) and serve with `srcset`/`sizes`.
- Explicit width/height on every image to stop layout shift; `loading="lazy"` everywhere except the hero.
- Preload the hero image as the LCP candidate on the homepage only.
- Defer non-critical sections below the fold.

## 6. SEO and metadata

- Unique `title`, `description`, `og:title`, `og:description`, `og:url`, canonical, and `og:image` on every public route, including each puppy profile (currently `/puppies/$slug` has no head metadata at all).
- Fix the root default: it currently reads "While Wold Shepherds" (typo) and lists Lovable as the author.
- Add `public/robots.txt` and `public/sitemap.xml` covering every public route plus each puppy profile; keep portal/admin routes out of the index.
- JSON-LD: Organization/LocalBusiness sitewide, Product schema per available puppy (price, availability, images), BreadcrumbList on deep routes.
- One `<h1>` per page, descriptive alt text on every photo, semantic sectioning.

## 7. Accessibility and polish

- Keyboard focus rings, skip-to-content link, labelled form fields with inline validation and error summaries.
- Contrast audit on the ice/accent tokens over photography.
- Motion: consistent, restrained entrance transitions honoring `prefers-reduced-motion`.
- Mobile pass on every page — tap targets, sticky bar overlap, gallery scroll behavior.

## 8. Production build fix

The current publish fails with `dist-check failed with exit status 1`. Diagnose against a real production build and correct the output configuration before shipping, so the polished site can actually go live.

## Technical notes

- New route `src/routes/get-started.tsx` with step state in the URL so steps are shareable and back/forward works; submission reuses the existing application server function and writes the selected puppy id.
- Shared components: `PuppyCard`, `PriceBlock`, `TrustStrip`, `SectionHeading` — replacing the near-duplicate markup now living in `PuppiesSection.tsx`, `litter.tsx`, and `puppies/$slug.tsx`.
- Testimonials: new `wws_testimonials` table (published flag, sort order) with public read policy plus explicit grants; admin CRUD in the existing portal admin page.
- Responsive images via `vite-imagetools` for bundled assets; `srcset` built from generated widths for the `/public` photo library.
- No changes to portal/admin auth, the reservation pipeline, or the database schema beyond the testimonials table.

## Suggested order

1. Production build fix
2. Get Started flow + CTA consolidation
3. Pricing/deposit + trust content (testimonials table and admin panel)
4. Puppy/litter card and profile polish
5. Image performance
6. SEO metadata, robots, sitemap, JSON-LD
7. Accessibility and mobile pass
