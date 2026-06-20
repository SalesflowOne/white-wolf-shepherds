## Rename "Alumni" → "Pack Family"

User-facing label only. The underlying database tables, role names, and storage paths keep their existing `alumni` identifiers — renaming those is a bigger migration with risk to existing data and isn't needed for the UI relabel.

### Changes

**`src/routes/portal/admin.tsx`**

- Sidebar/mobile nav tab labeled "Alumni" → **"Pack Family"**
- Section heading and any in-page copy referring to "Alumni Posts" → "Pack Family Posts"
- Keep the internal tab key `"alumni"` (no routing/state churn)

**`src/routes/portal/me.tsx`**

- Owner-facing tab currently labeled around the alumni/pack concept → ensure it reads **"Pack Family"** consistently (the section comment already says "Pack Tab")
- Any visible copy like "Alumni" / "Alumni community" → "Pack Family"

**Not changing (intentionally):**

- `RoleName` type values (`"alumni"`)
- DB tables (`wws_alumni_posts`), storage prefix (`alumni/...`), table key in `client.ts`
- Type names in code (`AlumniPost`)
- `src/integrations/supabase/types.ts` (auto-generated)

### Why scope it this way

The word "Alumni" only needs to disappear from what owners and admins _see_. Renaming the role enum, table, and storage bucket would require a coordinated Supabase migration plus data backfill, with no user-visible benefit beyond what the label change already accomplishes.
