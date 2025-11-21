import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Products from "@/components/Products";
import SpecialOffer from "@/components/SpecialOffer";
import About from "@/components/About";
import Brands from "@/components/Brands";
import Gallery from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import FacebookPage from "@/components/FacebookPage";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWidget from "@/components/FloatingWidget";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Products />
      <SpecialOffer />
      <Brands />
      <About />
      <Gallery />
      <Testimonials />
      <FacebookPage />
      <Contact />
      <Footer />
      <FloatingWidget />
    </main>
  );
}

