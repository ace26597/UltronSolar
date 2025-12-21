"use client";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WeServe from "@/components/WeServe";

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
