import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products } from "@/data/products";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) {
        return {
            title: "Product Not Found | Ultron Solar",
        };
    }

    return {
        title: `${product.name} | Ultron Solar Products`,
        description: product.shortDescription,
    };
}

export async function generateStaticParams() {
    return products.map((product) => ({
        slug: product.slug,
    }));
}

export default async function ProductPage({ params }: Props) {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <div className="pt-24 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Breadcrumb */}
                    <nav className="flex mb-8 text-sm text-gray-500">
                        <Link href="/" className="hover:text-solar-red">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/products" className="hover:text-solar-red">Products</Link>
                        <span className="mx-2">/</span>
                        <span className="text-navy-dark font-medium">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
                        {/* Product Image */}
                        <div className="bg-gray-100 rounded-2xl overflow-hidden h-[400px] lg:h-[500px] relative flex items-center justify-center">
                            {/* Placeholder for actual product image */}
                            <span className="text-6xl">☀️</span>
                            {/*
              <Image
                src={product.imageUrl}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              */}
                        </div>

                        {/* Product Info */}
                        <div>
                            <div className="text-solar-red font-bold uppercase tracking-wide mb-2">
                                {product.category}
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-navy-dark mb-6">
                                {product.name}
                            </h1>
                            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                {product.description}
                            </p>

                            {/* Features */}
                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-navy-dark mb-4">Key Features</h3>
                                <ul className="space-y-3">
                                    {product.features.map((feature, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-energy-green mr-3 mt-1">✓</span>
                                            <span className="text-gray-700">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* CTA */}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link
                                    href="/#contact"
                                    className="bg-solar-red text-white text-center font-bold py-4 px-8 rounded-lg hover:bg-solar-red-dark transition-colors text-lg shadow-lg shadow-solar-red/20"
                                >
                                    Get a Quote
                                </Link>
                                <a
                                    href="tel:+919422787438"
                                    className="bg-navy-dark text-white text-center font-bold py-4 px-8 rounded-lg hover:bg-navy-light transition-colors text-lg"
                                >
                                    Call for Details
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Specifications */}
                    <div className="mt-20">
                        <h2 className="text-2xl font-bold text-navy-dark mb-8">Technical Specifications</h2>
                        <div className="bg-gray-50 rounded-2xl p-8 overflow-hidden">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} className="flex justify-between border-b border-gray-200 pb-3">
                                        <span className="font-medium text-gray-600">{key}</span>
                                        <span className="font-bold text-navy-dark">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
