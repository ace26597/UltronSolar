import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WeServe from "@/components/WeServe";
import Features from "@/components/Features";
import Products from "@/components/Products";
import SpecialOffer from "@/components/SpecialOffer";
import GalleryPreview from "@/components/GalleryPreview";
import YouTubeVideos from "@/components/YouTubeVideos";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ServiceAreas from "@/components/ServiceAreas";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import TrustBar from "@/components/TrustBar";
import SolarWizard from "@/components/SolarWizard";
import HowItWorks from "@/components/HowItWorks";
import QuickTools from "@/components/QuickTools";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.ultronsolar.in/",
  },
};

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden w-full max-w-[100vw]">
      <Navbar />
      <Hero />
      <TrustBar />
      <SolarWizard />
      <SpecialOffer />
      <QuickTools />
      <Products />
      <Features />
      <HowItWorks />
      <WeServe />
      <GalleryPreview />
      <Testimonials />
      <FAQ />
      <YouTubeVideos />
      <ServiceAreas />
      <Contact />
      <Footer />
    </main>
  );
}
