import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WeServe from "@/components/WeServe";
import Features from "@/components/Features";
import Products from "@/components/Products";
import SpecialOffer from "@/components/SpecialOffer";
import Brands from "@/components/Brands";
import Gallery from "@/components/Gallery";
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

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden w-full max-w-[100vw]">
      <Navbar />
      <Hero />
      <WeServe />
      <About />
      <Features />
      <Products />
      <SpecialOffer />
      <Brands />
      <Gallery />
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

