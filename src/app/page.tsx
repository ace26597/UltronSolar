import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WeServe from "@/components/WeServe";
import Features from "@/components/Features";
import Products from "@/components/Products";
import SpecialOffer from "@/components/SpecialOffer";
import Brands from "@/components/Brands";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ServiceAreas from "@/components/ServiceAreas";
import FacebookPage from "@/components/FacebookPage";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWidget from "@/components/FloatingWidget";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <WeServe />
      <Features />
      <Products />
      <SpecialOffer />
      <Brands />
      <Gallery />
      <Testimonials />
      <FAQ />
      <ServiceAreas />
      <FacebookPage />
      <Contact />
      <Footer />
      <FloatingWidget />
    </main>
  );
}

