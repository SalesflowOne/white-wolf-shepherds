import galleryPile from "@/assets/gallery-pile.jpg";
import galleryYard from "@/assets/gallery-yard.jpg";
import galleryHouses from "@/assets/gallery-houses.jpg";

const images = [
  { src: galleryYard, alt: "White shepherd mother with her pack in the yard" },
  { src: galleryPile, alt: "Litter of white shepherd puppies cuddled together" },
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

        <div className="mt-16 grid auto-rows-[220px] grid-cols-2 gap-4 lg:grid-cols-4">
          {images.map((img, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl"
            >
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
