import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Gallery from "@/components/Gallery";

export const metadata: Metadata = {
    title: "Project Gallery | Solar Installation Photos | Ultron Solar",
    description:
        "Browse our complete gallery of solar installations in Dhule, Jalgaon, and North Maharashtra. See residential, commercial, and agricultural solar projects by Ultron Power Systems.",
    alternates: {
        canonical: "https://www.ultronsolar.in/gallery",
    },
    openGraph: {
        title: "Project Gallery | Solar Installation Photos | Ultron Solar",
        description:
            "Browse our complete gallery of solar installations in Dhule, Jalgaon, and North Maharashtra.",
        url: "https://www.ultronsolar.in/gallery",
        type: "website",
    },
};

export default function GalleryPage() {
    return (
        <main className="min-h-screen overflow-x-hidden w-full max-w-[100vw]">
            <Navbar />
            <div className="pt-4">
                <Gallery />
            </div>
            <Footer />
        </main>
    );
}
