import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "404 - Page Not Found | Ultron Power Systems",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="text-center">
          <h1 className="text-7xl font-bold text-navy mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">
            This page could not be found.
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-navy text-white font-semibold rounded-xl hover:bg-navy/90 transition-colors"
          >
            Return Home
          </Link>
        </div>
      </div>
      <Footer />
    </main>
  );
}
