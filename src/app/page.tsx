import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WeServe from "@/components/WeServe";
import Features from "@/components/Features";
import Products from "@/components/Products";
import SpecialOffer from "@/components/SpecialOffer";
import Brands from "@/components/Brands";
import ProjectsSummary from "@/components/ProjectsSummary";
import YouTubeVideos from "@/components/YouTubeVideos";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ServiceAreas from "@/components/ServiceAreas";
import FacebookPage from "@/components/FacebookPage";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatingWidget from "@/components/FloatingWidget";
import About from "@/components/About";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <WeServe />
      <About />
      <Features />
      <Products />
      <SpecialOffer />
      <Brands />
      <ProjectsSummary />
      <YouTubeVideos />
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

