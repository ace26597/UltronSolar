import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WeServe from "@/components/WeServe";

export const metadata: Metadata = {
    title: "Our Services | Ultron Power Systems - Solar Installation & EPC",
    description:
        "Explore solar services by Ultron Power Systems: rooftop solar, solar water pumps, EPC solutions, maintenance, and financing support in Dhule and North Maharashtra.",
    alternates: {
        canonical: "https://www.ultronsolar.in/services",
    },
    openGraph: {
        title: "Solar Services by Ultron Power Systems",
        description:
            "Rooftop solar, water pumps, EPC solutions, and maintenance in North Maharashtra.",
        url: "https://www.ultronsolar.in/services",
        type: "website",
    },
};

export default function ServicesPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-20">
                <WeServe />
            </div>
            <Footer />
        </main>
    );
}
