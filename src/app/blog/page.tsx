import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSortedPostsData } from "@/lib/blog";

export const metadata: Metadata = {
    title: "Blog | Ultron Solar - Solar Energy Insights",
    description: "Read the latest news, tips, and insights about solar energy, installation, and cost savings from Ultron Solar.",
    alternates: {
        canonical: "https://www.ultronsolar.in/blog",
    },
};

export default function BlogPage() {
    const blogPosts = getSortedPostsData();
    const featuredPost = blogPosts[0];
    const secondaryPosts = blogPosts.slice(1);
    const highlightTags = Array.from(new Set(blogPosts.flatMap((post) => post.tags ?? []))).slice(0, 6);

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            <section className="bg-navy-dark text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-sm uppercase tracking-[0.35em] text-white/70 mb-4">Ultron Solar Insights</p>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Solar knowledge you can act on</h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
                        Field learnings, project walkthroughs, and practical tactics for homeowners and industries across Maharashtra planning their solar journey.
                    </p>

                    {highlightTags.length > 0 && (
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            {highlightTags.map((tag) => (
                                <span key={tag} className="bg-white/10 text-white rounded-full px-4 py-1 text-sm font-medium border border-white/20">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {featuredPost ? (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
                    <article className="grid gap-8 lg:grid-cols-2 rounded-3xl overflow-hidden bg-white shadow-xl border border-gray-100">
                        <Link href={`/blog/${featuredPost.slug}`} className="relative block h-[320px] sm:h-[420px] lg:h-full">
                            <Image
                                src={featuredPost.imageUrl}
                                alt={featuredPost.title}
                                fill
                                priority
                                className="object-cover"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                            <span className="absolute top-4 left-4 bg-white text-navy-dark text-xs font-semibold tracking-wide px-3 py-1 rounded-full">Editor&rsquo;s pick</span>
                        </Link>
                        <div className="p-8 flex flex-col">
                            <div className="flex items-center text-sm text-gray-500 space-x-2 mb-3">
                                <span>{featuredPost.date}</span>
                                <span>•</span>
                                <span>{featuredPost.readTime}</span>
                            </div>
                            <Link href={`/blog/${featuredPost.slug}`}>
                                <h2 className="text-3xl font-bold text-navy-dark hover:text-solar-red transition-colors">{featuredPost.title}</h2>
                            </Link>
                            <p className="text-gray-600 text-lg mt-4 flex-1">{featuredPost.excerpt}</p>
                            <div className="flex flex-wrap gap-3 mt-6 text-sm text-gray-500">
                                {featuredPost.tags?.slice(0, 4).map((tag) => (
                                    <span key={tag} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">#{tag}</span>
                                ))}
                            </div>
                            <div className="mt-8 flex items-center justify-between flex-wrap gap-3">
                                <span className="text-sm font-medium text-navy-light">By {featuredPost.author}</span>
                                <Link href={`/blog/${featuredPost.slug}`} className="inline-flex items-center font-semibold text-solar-red hover:underline">
                                    Continue reading →
                                </Link>
                            </div>
                        </div>
                    </article>
                </section>
            ) : (
                <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <p className="text-lg text-gray-600">Our editorial team is drafting new solar insights. Please check back soon!</p>
                </section>
            )}

            {secondaryPosts.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-2xl font-bold text-navy-dark">Latest field notes</h3>
                        <p className="text-sm text-gray-500">Fresh perspectives from our engineers and consultants</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {secondaryPosts.map((post) => (
                            <article key={post.id} className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden flex flex-col hover:-translate-y-1 transition-transform">
                                <Link href={`/blog/${post.slug}`} className="relative h-48 w-full block group">
                                    <Image
                                        src={post.imageUrl}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    />
                                </Link>
                                <div className="p-6 flex flex-col flex-1">
                                    <div className="flex items-center text-xs uppercase tracking-wide text-gray-500 mb-3 gap-2">
                                        <span>{post.date}</span>
                                        <span className="text-gray-400">•</span>
                                        <span>{post.readTime}</span>
                                    </div>
                                    <Link href={`/blog/${post.slug}`} className="block mb-3">
                                        <h2 className="text-xl font-semibold text-navy-dark hover:text-solar-red transition-colors line-clamp-2">
                                            {post.title}
                                        </h2>
                                    </Link>
                                    <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags?.slice(0, 3).map((tag) => (
                                            <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                                        <span className="text-sm font-medium text-navy-light">By {post.author}</span>
                                        <Link href={`/blog/${post.slug}`} className="text-solar-red font-semibold text-sm hover:underline">
                                            Read more →
                                        </Link>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            )}

            <section className="bg-white border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <p className="text-sm font-semibold text-solar-red uppercase tracking-[0.3em]">Stay updated</p>
                    <h3 className="text-3xl font-bold text-navy-dark mt-4">Get future briefs before they go public</h3>
                    <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
                        Subscribe to quarterly insights about policy changes, new financing models, and engineering best practices—written for facility managers and homeowners who want to lead the energy transition.
                    </p>
                    <div className="mt-8 flex flex-wrap justify-center gap-4">
                        <Link href="/#contact" className="bg-navy-dark text-white px-8 py-3 rounded-full font-semibold hover:bg-navy-light transition-colors">
                            Request the briefing
                        </Link>
                        <Link href="/products" className="px-8 py-3 rounded-full font-semibold border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
                            Explore our products
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
