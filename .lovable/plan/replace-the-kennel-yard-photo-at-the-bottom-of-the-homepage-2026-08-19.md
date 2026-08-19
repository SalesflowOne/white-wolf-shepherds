# Replace the kennel-yard photo at the bottom of the homepage

The photo of the white dogs resting around the two dog houses should come out of the homepage gallery and be replaced with one of the real Haki / Mia / litter photos already on the site.

## What I found

The only image block near the bottom of the homepage is the "Life with White Wolves" gallery mosaic (`GallerySection`). It renders ten hard-coded photo paths — Mia portraits, Haki portraits, and three litter group shots. None of the paths I inspected shows the dog houses, so the tile you're seeing is either a photo I haven't opened yet in that set or a cached older build in the preview.

## Plan

1. Open every one of the ten gallery photos and pinpoint the dog-house shot.
2. Swap that entry for a different real photo already in the project (an unused Haki or Mia golden-hour frame, or a litter group shot), keeping the same grid span so the mosaic stays gap-free and balanced.
3. If the dog-house photo turns out not to be in the current code, it is a stale cached build — I'll confirm with a fresh render of the homepage and report that instead of making a blind edit.
4. Verify the finished gallery with a browser screenshot of the homepage so you can see the replacement in place.

## Technical notes

- Edit: `src/components/GallerySection.tsx` (the `images` array).
- Replacement candidates live in `public/dogs/haki/`, `public/dogs/mia/`, and `public/puppies/litter/`; responsive 400/800px variants already exist for these paths.
- No database or schema changes.
