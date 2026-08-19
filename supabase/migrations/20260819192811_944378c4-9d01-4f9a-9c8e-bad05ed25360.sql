ALTER TABLE public.wws_litters ADD COLUMN IF NOT EXISTS gallery_urls text[];

UPDATE public.wws_litters SET
  cover_image_url = COALESCE(cover_image_url, '/puppies/litter/litter-sunny-garden-02.webp'),
  gallery_urls = ARRAY[
    '/puppies/litter/litter-sunny-garden-02.webp',
    '/puppies/litter/litter-garden-group-04.webp',
    '/puppies/litter/litter-park-group-05.webp'
  ]
WHERE id = '425cee50-12cb-48e1-82af-169d0dd57d9b';

UPDATE public.wws_puppies SET gallery_urls = ARRAY['/puppies/gallery/red/red-collar-03.webp'] WHERE slug='apollo';
UPDATE public.wws_puppies SET gallery_urls = ARRAY['/puppies/gallery/blue/blue-collar-01.webp','/puppies/gallery/blue/blue-collar-02.webp','/puppies/gallery/blue/blue-collar-03.webp'] WHERE slug='artemis';
UPDATE public.wws_puppies SET gallery_urls = ARRAY['/puppies/gallery/teal/teal-collar-02.webp','/puppies/gallery/teal/teal-collar-03.webp'] WHERE slug='aura';
UPDATE public.wws_puppies SET gallery_urls = ARRAY['/puppies/gallery/pink/pink-collar-01.webp','/puppies/gallery/pink/pink-collar-02.webp','/puppies/gallery/pink/pink-collar-03.webp'] WHERE slug='lala';
UPDATE public.wws_puppies SET gallery_urls = ARRAY['/puppies/gallery/black/black-collar-03.webp'] WHERE slug='orion';
UPDATE public.wws_puppies SET gallery_urls = ARRAY['/puppies/gallery/purple/purple-collar-03.webp'] WHERE slug='stella';
UPDATE public.wws_puppies SET gallery_urls = ARRAY['/puppies/gallery/orange/orange-collar-03.webp'] WHERE slug='titan';
UPDATE public.wws_puppies SET gallery_urls = ARRAY['/puppies/gallery/lime-green/lime-green-collar-01.webp','/puppies/gallery/lime-green/lime-green-collar-02.webp','/puppies/gallery/lime-green/lime-green-collar-03.webp'] WHERE slug='zeus';
UPDATE public.wws_puppies SET gallery_urls = ARRAY['/puppies/gallery/yellow-gold/yellow-gold-collar-03.webp'] WHERE slug='zoro';

UPDATE public.wws_puppies SET
  image_url = '/dogs/haki/haki-hero-front.webp',
  gallery_urls = ARRAY['/dogs/haki/haki-hero-front.webp','/dogs/haki/haki-front-1.webp','/dogs/haki/haki-front-2.webp','/dogs/haki/haki-front-3.webp','/dogs/haki/haki-side-1.webp','/dogs/haki/haki-side-2.webp','/dogs/haki/haki-standing-1.webp','/dogs/haki/haki-sniffing-1.webp','/dogs/haki/haki-golden-hour-01.webp','/dogs/haki/haki-golden-hour-02.webp','/dogs/haki/haki-golden-hour-03.webp','/dogs/haki/haki-golden-hour-04.webp','/dogs/haki/haki-golden-hour-05.webp','/dogs/haki/haki-golden-hour-06.webp','/dogs/haki/haki-golden-hour-07.webp','/dogs/haki/haki-golden-hour-08.webp','/dogs/haki/haki-golden-hour-09.webp','/dogs/haki/haki-golden-hour-10.webp','/dogs/haki/haki-indoor-pose-01.webp','/dogs/haki/haki-indoor-pose-02.webp','/dogs/haki/haki-indoor-pose-03.webp','/dogs/haki/haki-indoor-pose-04.webp','/dogs/haki/haki-indoor-pose-05.webp','/dogs/haki/haki-indoor-pose-06.webp','/dogs/haki/haki-indoor-pose-07.webp','/dogs/haki/haki-indoor-pose-08.webp','/dogs/haki/haki-indoor-pose-09.webp','/dogs/haki/haki-indoor-pose-10.webp']
WHERE slug='haki';

UPDATE public.wws_puppies SET
  image_url = '/dogs/mia/mia-pro-pose-01.webp',
  gallery_urls = ARRAY['/dogs/mia/mia-pro-pose-01.webp','/dogs/mia/mia-pro-pose-02.webp','/dogs/mia/mia-pro-pose-03.webp','/dogs/mia/mia-pro-pose-04.webp','/dogs/mia/mia-pro-pose-05.webp','/dogs/mia/mia-pro-pose-06.webp','/dogs/mia/mia-pro-pose-07.webp','/dogs/mia/mia-golden-hour-01.webp','/dogs/mia/mia-golden-hour-02.webp','/dogs/mia/mia-golden-hour-03.webp','/dogs/mia/mia-golden-hour-04.webp','/dogs/mia/mia-golden-hour-05.webp','/dogs/mia/mia-golden-hour-06.webp','/dogs/mia/mia-golden-hour-07.webp','/dogs/mia/mia-golden-hour-08.webp']
WHERE slug='mia';