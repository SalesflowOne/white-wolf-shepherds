-- Keep puppy slug + bio prose in sync whenever the display name changes
-- (admin UI, SQL console, or any other update path).

CREATE OR REPLACE FUNCTION public.wws_sync_puppy_name_fields()
RETURNS trigger
LANGUAGE plpgsql
AS $$
DECLARE
  base_slug text;
  candidate text;
  suffix int := 2;
  escaped_old_name text;
BEGIN
  IF TG_OP = 'INSERT' OR NEW.name IS DISTINCT FROM OLD.name THEN
    base_slug := lower(regexp_replace(trim(NEW.name), '[^a-zA-Z0-9]+', '-', 'g'));
    base_slug := trim(both '-' from base_slug);
    IF base_slug = '' THEN
      base_slug := 'dog';
    END IF;

    candidate := base_slug;
    WHILE EXISTS (
      SELECT 1
      FROM public.wws_puppies p
      WHERE p.slug = candidate
        AND p.id IS DISTINCT FROM NEW.id
    ) LOOP
      candidate := base_slug || '-' || suffix;
      suffix := suffix + 1;
    END LOOP;

    NEW.slug := candidate;
  END IF;

  IF TG_OP = 'UPDATE'
     AND OLD.name IS DISTINCT FROM NEW.name
     AND NEW.personality_bio IS NOT NULL
     AND btrim(NEW.personality_bio) <> '' THEN
    escaped_old_name := regexp_replace(OLD.name, '([.*+?^${}()|[\]\\])', '\\\1', 'g');
    NEW.personality_bio := regexp_replace(
      NEW.personality_bio,
      '\m' || escaped_old_name || '\M',
      NEW.name,
      'g'
    );
  END IF;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_wws_puppies_sync_name_fields ON public.wws_puppies;

CREATE TRIGGER trg_wws_puppies_sync_name_fields
BEFORE INSERT OR UPDATE OF name ON public.wws_puppies
FOR EACH ROW
EXECUTE FUNCTION public.wws_sync_puppy_name_fields();
