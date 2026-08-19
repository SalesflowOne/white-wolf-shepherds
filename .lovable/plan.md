# White Wolf Shepherds — Inspection Report

No code changes are proposed in this plan. This is a read-only inspection as requested.

## 1. Supabase project ref / URL

- **Project ref:** `ebjzdcnphkfpxfldnatm`
- **Project URL:** `https://ebjzdcnphkfpxfldnatm.supabase.co`
- Confirmed in `.env`, `src/integrations/supabase/client.ts`, and `supabase/config.toml`.

## 2. Table that stores dogs / puppies

- **Physical table:** `public.wws_puppies`
- **Logical alias in code:** `T.puppies` from `src/integrations/supabase/client.ts`
- All White Wolf Shepherds tables are prefixed with `wws_` to coexist with other apps in the same Supabase project.

## 3. Spring 2026 litter and its nine puppies

- **Litter record:** `Spring 2026` — `id: 425cee50-12cb-48e1-82af-169d0dd57d9b`
- Born: 2026-03-01, Ready: 2026-05-01, Expected count: 9, Status: available

The nine Spring 2026 puppies (excluding the two parent dogs, Haki and Mia, which share the same `litter_id` but have `status = 'parent'`):

| # | Name | ID | Sex | Collar color | Image URL | Status |
|---|------|----|-----|--------------|-----------|--------|
| 1 | Apollo | `fbadf426-c9e9-4033-8e30-1d92407c64fe` | male | red | `/puppies/apollo.jpg` | available |
| 2 | Artemis | `94f18588-81a7-47d9-9a2c-13dd385d9708` | male | blue | `/puppies/atlas.jpg` | available |
| 3 | Aura`` | `38c5ae70-6213-4c29-b32a-0252239d189b` | female | white | `/puppies/aurora.jpg` | available |
| 4 | Lala | `4488b02e-43c7-4860-bf38-13f0b981d8a8` | female | pink | `/puppies/luna.jpg` | available |
| 5 | Orion | `eaa3e998-1b78-40dc-ba8f-ec37bb0df26a` | male | black | `/puppies/orion.jpg` | available |
| 6 | Stella | `a453e129-9611-4044-a61b-6db7b9d21b3a` | female | yellow | `/puppies/stella.jpg` | available |
| 7 | Titan | `48cd844b-e2b2-4652-b0fa-b1bbd91ad068` | male | orange | `/puppies/titan.jpg` | available |
| 8 | Zeus | `cb174615-a515-419b-8b75-1f4d59d24232` | male | green | `/puppies/zeus.jpg` | available |
| 9 | Zoro | `aca4fd4a-6350-4497-b918-ef673fb64970` | male | purple | `/puppies/nova.jpg` | available |

Notes:
- All nine puppies are currently `status = 'available'`.
- `Aura`` has two backticks in the `name` column (`Aura``).
- Image URLs are relative paths (`/puppies/...`) except for Haki and Mia, which use full Supabase Storage URLs.

## 4. Components / pages that render puppy images

| Page | File | Component(s) that render puppy images |
|------|------|----------------------------------------|
| Homepage (`/`) | `src/routes/index.tsx` | `PuppiesSection` (`src/components/PuppiesSection.tsx`) |
| Puppy profile pages (`/puppies/:slug`) | `src/routes/puppies/$slug.tsx` | `PuppyProfilePage` (primary image + gallery + sibling cards) |
| Spring 2026 litter page (`/litter`) | `src/routes/litter.tsx` | `LitterPage` (puppy grid + parent cards in "Champion Bloodlines" section) |

Additional related pages:
- `src/routes/pack-family.tsx` renders parent dog cards for Haki and Mia, but does not render the Spring 2026 puppy grid.
- `src/routes/portal/admin.tsx` is the admin dog/litter management UI and also renders puppy/parent thumbnails.
