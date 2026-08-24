-- Mark Aura and Orion as reserved in the Spring 2026 litter.

UPDATE public.wws_puppies
SET status = 'reserved'
WHERE slug IN ('aura', 'orion')
  AND status = 'available';
