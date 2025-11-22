import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getSortedPostsData } from "@/lib/blog";

export const metadata = {
    title: "Blog | Ultron Solar - Solar Energy Insights",
    description: "Read the latest news, tips, and insights about solar energy, installation, and cost savings from Ultron Solar.",
};

export default function BlogPage() {
    const blogPosts = getSortedPostsData();

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Header */}
            <div className="bg-navy-dark text-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Solar Insights & News</h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Stay updated with the latest trends in renewable energy and learn how to maximize your solar investment.
                    </p>
                </div>
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post) => (
                        <article key={post.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                            <Link href={`/blog/${post.slug}`} className="relative h-48 w-full block group">
                                <Image
                                    src={post.imageUrl}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </Link>
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center text-sm text-gray-500 mb-3 space-x-4">
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <Link href={`/blog/${post.slug}`} className="block mb-3">
                                    <h2 className="text-xl font-bold text-navy-dark hover:text-solar-red transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                </Link>
                                <p className="text-gray-600 mb-4 line-clamp-3 flex-1">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
                                    <span className="text-sm font-medium text-navy-light">By {post.author}</span>
                                    <Link href={`/blog/${post.slug}`} className="text-solar-red font-semibold text-sm hover:underline">
                                        Read More →
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
