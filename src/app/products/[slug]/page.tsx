import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CtaButton from "@/components/cta/CtaButton";
import { products } from "@/data/products";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const product = products.find((p) => p.slug === slug);

    if (!product) {
        return {
            title: "Product Not Found | Ultron Solar",
        };
    }

    const url = `https://www.ultronsolar.in/products/${slug}`;
    return {
        title: `${product.name} | Ultron Solar Products`,
        description: product.shortDescription,
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: product.name,
            description: product.shortDescription,
            url: url,
            siteName: "Ultron Solar",
            images: [
                {
                    url: product.imageUrl.startsWith('http') ? product.imageUrl : `https://www.ultronsolar.in${product.imageUrl}`,
                    width: 1200,
                    height: 630,
                    alt: product.name,
                },
            ],
            type: "website",
        },
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
        <main className="min-h-screen bg-white font-sans">
            <Navbar />

            <div className="pt-32 pb-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Premium Breadcrumb */}
                    <nav className="flex mb-12 text-sm font-bold uppercase tracking-widest">
                        <Link href="/" className="text-gray-400 hover:text-solar-orange transition-colors">Home</Link>
                        <span className="mx-3 text-gray-300">/</span>
                        <Link href="/products" className="text-gray-400 hover:text-solar-orange transition-colors">Products</Link>
                        <span className="mx-3 text-gray-300">/</span>
                        <span className="text-navy">{product.name}</span>
                    </nav>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        {/* Product Image Stage */}
                        <div className="relative aspect-square lg:aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-brand-bg group">
                            <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <div className="absolute top-6 left-6">
                                <span className="bg-navy/90 backdrop-blur-md text-white text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl">
                                    {product.category}
                                </span>
                            </div>
                        </div>

                        {/* Product Intelligence */}
                        <div className="lg:sticky lg:top-32">
                            <h1 className="text-4xl md:text-5xl font-heading font-black text-navy-dark mb-6 leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-xl text-gray-600 mb-10 leading-relaxed font-medium">
                                {product.description}
                            </p>

                            {/* Features Grid */}
                            <div className="mb-12">
                                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest mb-6">Premium Advantages</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {product.features.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-3 p-4 bg-brand-bg rounded-2xl border border-gray-100 group hover:border-solar-orange transition-all">
                                            <span className="w-6 h-6 bg-solar-orange text-white rounded-full flex items-center justify-center text-xs">✓</span>
                                            <span className="text-navy font-bold text-sm">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Conversion Actions */}
                            <div className="flex flex-col sm:flex-row gap-6 p-8 bg-navy rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-solar-orange/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
                                <CtaButton
                                    ctaId="residential_quote_en"
                                    variantOverride={{ label: "Request Quote" }}
                                    className="px-10 py-5 text-lg font-bold shadow-xl shadow-solar-orange/20"
                                    trackEventName="product_page_cta_click"
                                />
                                <a
                                    href="tel:+919422787438"
                                    className="flex items-center justify-center gap-3 text-white font-black hover:text-solar-orange transition-all px-6"
                                >
                                    <svg className="w-5 h-5 text-solar-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                                    Expert Advice
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Technical Specification Hub */}
                    <div className="mt-32">
                        <div className="flex items-baseline gap-4 mb-12">
                            <h2 className="text-3xl md:text-4xl font-heading font-black text-navy-dark">Technical Datasheet</h2>
                            <div className="flex-1 h-1 bg-gray-100 rounded-full"></div>
                        </div>

                        <div className="bg-brand-bg rounded-[3rem] p-8 md:p-16 border border-gray-100 shadow-sm">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-10">
                                {Object.entries(product.specifications).map(([key, value]) => (
                                    <div key={key} className="flex flex-col border-b border-gray-200 pb-6 group">
                                        <span className="text-xs font-black text-gray-400 uppercase tracking-widest mb-2 group-hover:text-solar-orange transition-colors">{key}</span>
                                        <span className="text-xl font-bold text-navy">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mt-12 text-center">
                            <p className="text-gray-500 font-medium italic">
                                *Custom configurations and specialized sizes available upon request.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}
