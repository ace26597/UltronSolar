import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SolarSimulatorClient from "@/components/simulator/SolarSimulatorClient";

export const metadata: Metadata = {
    title: "Solar Simulator | Calculate Your Solar Savings | Ultron Solar",
    description:
        "Use our free solar calculator to estimate your savings, system size, and payback period. Draw your roof on the map or upload a photo to visualize solar panels.",
    alternates: {
        canonical: "https://www.ultronsolar.in/solar-simulator",
    },
    openGraph: {
        title: "Solar Simulator | Calculate Your Solar Savings | Ultron Solar",
        description:
            "Use our free solar calculator to estimate your savings, system size, and payback period.",
        url: "https://www.ultronsolar.in/solar-simulator",
        type: "website",
    },
};

export default function SolarSimulatorPage() {
    return (
        <main className="min-h-screen overflow-x-hidden w-full max-w-[100vw]">
            <Navbar />
            <SolarSimulatorClient />
            <Footer />
        </main>
    );
}
