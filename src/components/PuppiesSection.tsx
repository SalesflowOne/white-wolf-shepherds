import puppy1 from "@/assets/puppy-1.jpg";
import puppy2 from "@/assets/puppy-2.jpg";
import puppy3 from "@/assets/puppy-3.jpg";

const puppies = [
  {
    name: "Arctic Star",
    img: puppy1,
    status: "Available",
    gender: "Male",
    age: "10 weeks",
    lineage: "Sire: Champion Frost • Dam: Luna Blanche",
  },
  {
    name: "Snow Angel",
    img: puppy2,
    status: "Reserved",
    gender: "Female",
    age: "8 weeks",
    lineage: "Sire: Champion Frost • Dam: Aurora Borealis",
  },
  {
    name: "Winter Bloom",
    img: puppy3,
    status: "Available",
    gender: "Female",
    age: "12 weeks",
    lineage: "Sire: Silver Ghost • Dam: Luna Blanche",
  },
];

export default function PuppiesSection() {
  return (
    <section id="puppies" className="py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Our Puppies</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-foreground lg:text-5xl">
            Available Companions
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Each puppy comes with full health certifications, microchipping, and a lifetime of breeder support.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {puppies.map((p) => (
            <div
              key={p.name}
              className="group overflow-hidden rounded-2xl bg-card shadow-card transition-all hover:shadow-wolf"
            >
              <div className="relative overflow-hidden">
                <img
                  src={p.img}
                  alt={p.name}
                  className="h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                  width={800}
                  height={800}
                />
                <span
                  className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                    p.status === "Available"
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {p.status}
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-2xl font-bold text-card-foreground">{p.name}</h3>
                <div className="mt-3 flex gap-4 text-sm text-muted-foreground">
                  <span>{p.gender}</span>
                  <span>•</span>
                  <span>{p.age}</span>
                </div>
                <p className="mt-2 text-sm italic text-muted-foreground">{p.lineage}</p>
                <a
                  href="#contact"
                  className="mt-5 inline-block w-full rounded-xl bg-primary py-3 text-center text-sm font-bold uppercase tracking-wider text-primary-foreground transition-all hover:brightness-110"
                >
                  Inquire About {p.name}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
