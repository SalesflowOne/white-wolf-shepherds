-- Mark Zoro as reserved in the Spring 2026 litter.

UPDATE public.wws_puppies
SET status = 'reserved'
WHERE slug = 'zoro'
  AND status = 'available';
