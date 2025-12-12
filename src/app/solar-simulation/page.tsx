import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolarSimulation from "@/components/SolarSimulation";

export const metadata: Metadata = {
  title: "Solar Panel Visualization | Ultron Solar",
  description: "Upload a photo of your terrace and see how solar panels would look installed. AI-powered solar panel visualization for your rooftop.",
  alternates: {
    canonical: "https://www.ultronsolar.in/solar-simulation",
  },
  robots: {
    index: false, // Don't index this page until product is finalized
    follow: false,
  },
};

export default function SolarSimulationPage() {
  return (
    <main className="min-h-screen overflow-x-hidden w-full max-w-[100vw]">
      <Navbar />
      <SolarSimulation />
      <Footer />
    </main>
  );
}

