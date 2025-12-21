import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WeServe from "@/components/WeServe";
import Features from "@/components/Features";
import Products from "@/components/Products";
import SpecialOffer from "@/components/SpecialOffer";
import Brands from "@/components/Brands";
import GalleryPreview from "@/components/GalleryPreview";
import YouTubeVideos from "@/components/YouTubeVideos";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ServiceAreas from "@/components/ServiceAreas";
import FacebookPage from "@/components/FacebookPage";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import About from "@/components/About";

export const metadata: Metadata = {
  alternates: {
    canonical: "https://www.ultronsolar.in/",
  },
};

import TrustBar from "@/components/TrustBar";
import SolarWizard from "@/components/SolarWizard";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden w-full max-w-[100vw]">
      <Navbar />
      <Hero />
      <TrustBar />
      <SolarWizard />
      <WeServe />
      <About />
      <Features />
      <Products />
      <HowItWorks />
      <SpecialOffer />
      <GalleryPreview />
      <YouTubeVideos />
      <Testimonials />
      <FAQ />
      <ServiceAreas />
      <FacebookPage />
      <Contact />
      <Footer />
    </main>
  );
}

