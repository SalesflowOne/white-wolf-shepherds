-- Fix stale placeholder names in Spring 2026 litter puppy bios (Haki x Mia).
-- Card titles, slugs, routes, and image paths were already correct; only prose needed updating.

UPDATE public.wws_puppies SET
  personality_bio = 'Lala is calm, deeply perceptive, and forms bonds quickly. She watches everything and misses nothing — a natural protector with a gentle soul.'
WHERE slug = 'lala';

UPDATE public.wws_puppies SET
  personality_bio = 'Artemis is the social butterfly of the litter. He loves everyone, plays hard, and recovers fast. Incredibly adaptable to different environments.'
WHERE slug = 'artemis';

UPDATE public.wws_puppies SET
  personality_bio = 'Zoro is sharp, fast-learning, and endlessly curious. He figured out the puppy puzzles first and has not slowed down since.'
WHERE slug = 'zoro';

UPDATE public.wws_puppies SET
  personality_bio = 'Aura is soft, nurturing, and completely unflappable — the puppy the others fall asleep on. A natural comfort presence.'
WHERE slug = 'aura';
