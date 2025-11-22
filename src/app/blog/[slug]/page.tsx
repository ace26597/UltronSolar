import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostData, getAllPostIds } from "@/lib/blog";

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props) {
    const { slug } = await params;
    try {
        const post = await getPostData(slug);
        return {
            title: `${post.title} | Ultron Solar Blog`,
            description: post.excerpt,
        };
    } catch (error) {
        return {
            title: "Post Not Found | Ultron Solar",
        };
    }
}

export async function generateStaticParams() {
    const paths = getAllPostIds();
    return paths.map((path) => path.params);
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params;
    let post;

    try {
        post = await getPostData(slug);
    } catch (error) {
        notFound();
    }

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white">
            <Navbar />

            <article className="pt-24 pb-16">
                {/* Hero Image */}
                <div className="relative h-[400px] md:h-[500px] w-full mb-12">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute inset-0 flex items-end">
                        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 text-white">
                            <div className="flex items-center space-x-4 text-sm md:text-base mb-4 opacity-90">
                                <span className="bg-solar-red px-3 py-1 rounded-full font-semibold">{post.tags[0]}</span>
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4">
                                {post.title}
                            </h1>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-xl">
                                    👤
                                </div>
                                <span className="font-medium text-lg">{post.author}</span>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-8">
                            {post.tags.map((tag) => (
                                <span key={tag} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-default">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Back to Blog */}
                    <div className="mt-12">
                        <Link href="/blog" className="inline-flex items-center text-solar-red font-bold hover:underline">
                            ← Back to All Articles
                        </Link>
                    </div>
                </div>
            </article>

            <Footer />
        </main >
    );
}
