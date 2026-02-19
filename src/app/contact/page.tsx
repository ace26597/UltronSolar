import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
    title: "Contact Us | Ultron Power Systems - Get a Free Solar Quote",
    description:
        "Contact Ultron Power Systems for a free solar consultation. Visit us in Dhule, Maharashtra or call for residential, commercial, and agricultural solar solutions.",
    alternates: {
        canonical: "https://www.ultronsolar.in/contact",
    },
    openGraph: {
        title: "Contact Ultron Power Systems - Free Solar Consultation",
        description:
            "Get a free solar consultation from Ultron Power Systems in Dhule, Maharashtra.",
        url: "https://www.ultronsolar.in/contact",
        type: "website",
    },
};

export default function ContactPage() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <div className="pt-20">
                <Contact />
            </div>
            <Footer />
        </main>
    );
}
