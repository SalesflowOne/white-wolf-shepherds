import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import PuppiesSection from "@/components/PuppiesSection";
import GallerySection from "@/components/GallerySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "White Wolf Shepherds — Premium White German Shepherd Breeder" },
      {
        name: "description",
        content:
          "Discover exceptional white German Shepherd puppies. Health-tested, family-raised, and bred for beauty, temperament, and loyalty.",
      },
      {
        property: "og:title",
        content: "White Wolf Shepherds — Premium White German Shepherd Breeder",
      },
      {
        property: "og:description",
        content:
          "Health-tested, family-raised white German Shepherd puppies. $2,000 all-in with a $500 refundable reservation fee until placement is approved.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      {
        property: "og:image",
        content: `${SITE_URL}/dogs/haki/haki-golden-hour-05.webp`,
      },
      { name: "twitter:image", content: `${SITE_URL}/dogs/haki/haki-golden-hour-05.webp` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "canonical", href: SITE_URL },
      {
        rel: "preload",
        as: "image",
        href: "/dogs/haki/haki-golden-hour-05.webp",
        fetchPriority: "high",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="min-h-screen pb-16 md:pb-0">
      <Navbar />
      <main id="main">
        <HeroSection />
        <AboutSection />
        <PuppiesSection />
        <GallerySection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
