import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import puppy2 from "@/assets/puppy-2.jpg";
import heroImg from "@/assets/hero-dogs.jpg";

const images = [
  { src: gallery1, alt: "Children playing with a white German Shepherd", span: "col-span-2 row-span-2" },
  { src: gallery2, alt: "White shepherd on a mountain trail at sunrise", span: "" },
  { src: gallery3, alt: "Mother shepherd with puppies in the snow", span: "" },
  { src: puppy2, alt: "Mother with her puppies", span: "" },
  { src: heroImg, alt: "Pack of white shepherds running", span: "col-span-2" },
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
              className={`overflow-hidden rounded-xl ${img.span}`}
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
