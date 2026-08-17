import galleryPile from "@/assets/gallery-pile.jpg";
import galleryYard from "@/assets/gallery-yard.jpg";
import galleryHouses from "@/assets/gallery-houses.jpg";

const images = [
  { src: galleryYard, alt: "White shepherd mother with her pack in the yard" },
  {
    src: "/parents/haki-golden-main.webp",
    alt: "Haki, our white German Shepherd sire, posing in a park at golden hour",
  },
  {
    src: "/parents/mia-profile.webp",
    alt: "Mia, our white German Shepherd dam, posing in warm golden-hour light",
  },
  { src: galleryPile, alt: "Litter of white shepherd puppies cuddled together" },
  {
    src: "/parents/haki-golden-happy.webp",
    alt: "Haki relaxing on the grass in warm golden-hour light",
  },
  {
    src: "/parents/mia.jpg",
    alt: "Mia, our white German Shepherd dam",
  },
  { src: galleryHouses, alt: "White shepherds resting by their dog houses" },
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
        </div>

        <div className="mt-16 grid auto-rows-[220px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((img, i) => (
            <div key={i} className="overflow-hidden rounded-xl">
              <img
                src={img.src}
                alt={img.alt}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
