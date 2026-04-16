import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PuppiesSection from "@/components/PuppiesSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "White Wolf Shepherds — Premium White German Shepherd Breeder" },
      {
        name: "description",
        content:
          "Discover exceptional white German Shepherd puppies from champion bloodlines. Health-tested, family-raised, and bred for beauty, temperament, and loyalty.",
      },
      { property: "og:title", content: "White Wolf Shepherds — Premium White German Shepherd Breeder" },
      {
        property: "og:description",
        content:
          "Discover exceptional white German Shepherd puppies from champion bloodlines.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <PuppiesSection />
      <GallerySection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
