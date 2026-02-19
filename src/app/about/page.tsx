import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import About from "@/components/About";

export const metadata: Metadata = {
    title: "About Us | Ultron Power Systems - Solar Experts in Dhule",
    description:
        "Learn about Ultron Power Systems — trusted solar installation experts serving Dhule, Jalgaon, and North Maharashtra with residential, commercial, and agricultural solar solutions.",
    alternates: {
        canonical: "https://www.ultronsolar.in/about",
    },
    openGraph: {
        title: "About Ultron Power Systems - Solar Experts in Dhule",
        description:
            "Trusted solar installation experts serving Dhule and North Maharashtra.",
        url: "https://www.ultronsolar.in/about",
        type: "website",
    },
};

export default function AboutPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-20">
                <About />
            </div>
            <Footer />
        </main>
    );
}
