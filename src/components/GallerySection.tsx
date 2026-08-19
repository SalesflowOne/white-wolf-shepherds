const images = [
  {
    src: "/dogs/mia/mia-golden-hour-01.webp",
    alt: "Mia, our white German Shepherd dam, in warm golden-hour light",
    span: "lg:col-span-2 lg:row-span-2",
  },
  {
    src: "/puppies/litter/litter-sunny-garden-02.webp",
    alt: "Spring 2026 litter playing in the sunny garden",
  },
  {
    src: "/dogs/haki/haki-golden-hour-03.webp",
    alt: "Haki, our white German Shepherd sire, at golden hour",
  },
  {
    src: "/dogs/mia/mia-pro-pose-03.webp",
    alt: "Mia posing for a studio-style portrait",
  },
  {
    src: "/dogs/haki/haki-indoor-pose-04.webp",
    alt: "Haki relaxing indoors",
  },
  {
    src: "/dogs/haki/haki-hero-front.webp",
    alt: "Haki standing square, facing the camera",
    span: "lg:row-span-2",
  },
  {
    src: "/puppies/litter/litter-garden-group-04.webp",
    alt: "White shepherd puppies exploring the garden together",
    span: "lg:col-span-2",
  },
  {
    src: "/dogs/mia/mia-golden-hour-06.webp",
    alt: "Mia out on an evening walk",
  },
  {
    src: "/dogs/haki/haki-front-2.webp",
    alt: "Close portrait of Haki",
  },
  {
    src: "/puppies/litter/litter-park-group-05.webp",
    alt: "The litter out on their first park adventure",
    span: "lg:col-span-2",
  },
];

export default function GallerySection() {
  return (
    <section id="gallery" className="bg-gradient-frost py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Gallery</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground lg:text-5xl">
            Life with White Wolves
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Everyday moments from our home — sunlit mornings with Haki and Mia, puppy piles, and
            first adventures in the yard.
          </p>
        </div>

        <div className="mt-16 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {images.map((img, i) => (
            <div key={i} className={`overflow-hidden rounded-xl ${img.span ?? ""}`}>
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover object-center transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
