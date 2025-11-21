import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Products from "@/components/Products";
import SpecialOffer from "@/components/SpecialOffer";
import About from "@/components/About";
import FacebookPage from "@/components/FacebookPage";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Products />
      <SpecialOffer />
      <About />
      <FacebookPage />
      <Contact />
      <Footer />
    </main>
  );
}

