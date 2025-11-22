import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

export const metadata = {
    title: "Our Products | Ultron Solar - Premium Solar Solutions",
    description: "Explore our range of high-quality solar panels, inverters, water heaters, and lighting solutions for residential and commercial use.",
};

export default function ProductsPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <div className="bg-navy-dark text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Solar Products</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        High-performance solar solutions designed for efficiency, durability, and long-term savings.
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full group">
                            <Link href={`/products/${product.slug}`} className="relative h-64 w-full block bg-gray-100 overflow-hidden">
                                <Image
                                    src={product.imageUrl}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                />
                            </Link>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="text-sm text-solar-red font-semibold mb-2 uppercase tracking-wide">
                                    {product.category}
                                </div>
                                <Link href={`/products/${product.slug}`} className="block mb-3">
                                    <h2 className="text-xl font-bold text-navy-dark hover:text-solar-red transition-colors">
                                        {product.name}
                                    </h2>
                                </Link>
                                <p className="text-gray-600 mb-6 flex-1">
                                    {product.shortDescription}
                                </p>

                                <div className="mt-auto pt-4 border-t border-gray-100">
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="block w-full text-center bg-navy-dark text-white font-bold py-3 rounded-lg hover:bg-solar-red transition-colors"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
