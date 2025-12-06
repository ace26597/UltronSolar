import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getPostData, getAllPostIds, getSortedPostsData } from "@/lib/blog";

type BlogPostPageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    try {
        const post = await getPostData(slug);
        const url = `https://www.ultronsolar.in/blog/${slug}`;
        return {
            title: `${post.title} | Ultron Solar Blog`,
            description: post.excerpt,
            alternates: {
                canonical: url,
            },
            openGraph: {
                title: post.title,
                description: post.excerpt,
                url: url,
                siteName: "Ultron Solar",
                images: [
                    {
                        url: post.imageUrl.startsWith('http') ? post.imageUrl : `https://www.ultronsolar.in${post.imageUrl}`,
                        width: 1200,
                        height: 630,
                        alt: post.title,
                    },
                ],
                type: "article",
                publishedTime: post.date,
            },
        };
    } catch (error) {
        return {
            title: "Post Not Found | Ultron Solar",
        };
    }
}

export function generateStaticParams() {
    const paths = getAllPostIds();
    return paths.map((path) => path.params);
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;

    let post: Awaited<ReturnType<typeof getPostData>> | null = null;
    try {
        post = await getPostData(slug);
    } catch (error) {
        notFound();
    }

    if (!post) {
        notFound();
    }

    const relatedPosts = getSortedPostsData()
        .filter((related) => related.slug !== slug)
        .slice(0, 3);

    const primaryTag = post.tags?.[0] ?? "Solar Insights";

    return (
        <main className="min-h-screen bg-white overflow-x-hidden w-full">
            <Navbar />

            <article>
                <section className="relative h-[420px] md:h-[520px] w-full overflow-hidden">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        priority
                        className="object-cover object-center"
                        sizes="100vw"
                        quality={85}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/50 to-black/80"></div>
                    <div className="absolute inset-0 flex items-end">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 text-white">
                            <Link href="/blog" className="inline-flex items-center text-sm font-semibold uppercase tracking-wide text-white/80 hover:text-white transition-colors">
                                ← Back to all articles
                            </Link>
                            <div className="flex flex-wrap items-center gap-3 text-sm md:text-base mt-6">
                                <span className="bg-solar-red px-4 py-1 rounded-full font-semibold">{primaryTag}</span>
                                <span>{post.date}</span>
                                <span>•</span>
                                <span>{post.readTime}</span>
                                <span>•</span>
                                <span>By {post.author}</span>
                            </div>
                            <h1 className="text-3xl md:text-5xl font-bold leading-tight mt-6">
                                {post.title}
                            </h1>
                            {post.tags?.length > 1 && (
                                <div className="flex flex-wrap gap-2 mt-6">
                                    {post.tags.map((tag) => (
                                        <span key={tag} className="bg-white/10 border border-white/25 px-3 py-1 rounded-full text-sm font-medium">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid gap-12 lg:grid-cols-[minmax(0,3fr)_minmax(250px,1fr)]">
                        <div>
                            {(() => {
                                let contentHtml = post.content;
                                if (post.containerImageUrl) {
                                    const parts = contentHtml.split('</p>');
                                    if (parts.length > 2) {
                                        // Insert after the second paragraph
                                        const imageHtml = `
                                            <div class="float-none md:float-right ml-0 md:ml-6 mb-6 w-full md:w-1/2 relative h-64 md:h-80 rounded-xl overflow-hidden my-4">
                                                <img src="${post.containerImageUrl}" alt="Blog container image" class="object-cover object-center w-full h-full" style="max-width: 100%; height: auto;" />
                                            </div>
                                        `;
                                        // Reconstruct the content: first 2 paragraphs + image + rest
                                        // Note: split consumes '</p>', so we need to add it back for the parts we join
                                        const firstPart = parts.slice(0, 2).join('</p>') + '</p>';
                                        const rest = parts.slice(2).join('</p>');
                                        contentHtml = firstPart + imageHtml + rest;
                                    }
                                }
                                return <div className="blog-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />;
                            })()}

                            {post.footerImageUrl && (
                                <div className="mt-8 relative h-[300px] w-full rounded-2xl overflow-hidden">
                                    <Image
                                        src={post.footerImageUrl}
                                        alt="Blog footer image"
                                        fill
                                        className="object-cover object-center"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 800px"
                                        quality={85}
                                    />
                                </div>
                            )}

                            <div className="mt-12 rounded-3xl bg-navy-dark text-white p-8 space-y-4">
                                <p className="text-sm uppercase tracking-[0.25em] text-white/80">Need a solar partner?</p>
                                <h2 className="text-2xl font-bold">Let’s turn this insight into your next project.</h2>
                                <p className="text-white/80">
                                    Our engineers can design a custom solar system for your site, handle paperwork, and monitor performance once it is live.
                                </p>
                                <div className="flex flex-wrap gap-4">
                                    <Link href="/#contact" className="bg-white text-navy-dark font-semibold px-6 py-3 rounded-full hover:bg-gray-100 transition-colors">
                                        Talk to Ultron Solar
                                    </Link>
                                    <Link href="/products" className="border border-white/40 text-white font-semibold px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
                                        Explore solutions
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <aside className="space-y-8">
                            <div className="rounded-2xl border border-gray-100 p-6 shadow-sm">
                                <h3 className="text-lg font-semibold text-navy-dark mb-4">Quick facts</h3>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li><strong className="text-navy-dark">Primary topic:</strong> {primaryTag}</li>
                                    <li><strong className="text-navy-dark">Estimated read:</strong> {post.readTime}</li>
                                    <li><strong className="text-navy-dark">Published:</strong> {post.date}</li>
                                    <li><strong className="text-navy-dark">Author:</strong> {post.author}</li>
                                </ul>
                            </div>

                            <div className="rounded-2xl bg-gray-50 border border-gray-100 p-6">
                                <h3 className="text-lg font-semibold text-navy-dark mb-4">Related reads</h3>
                                <div className="space-y-4">
                                    {relatedPosts.length === 0 && <p className="text-sm text-gray-600">More articles coming soon.</p>}
                                    {relatedPosts.map((related) => (
                                        <Link key={related.slug} href={`/blog/${related.slug}`} className="block p-4 rounded-xl bg-white hover:shadow-md transition-shadow border border-gray-100">
                                            <p className="text-xs uppercase text-gray-500 tracking-wide mb-1">{related.tags?.[0] ?? "Solar Insights"}</p>
                                            <p className="text-base font-semibold text-navy-dark">{related.title}</p>
                                            <p className="text-sm text-gray-500 mt-1">{related.readTime}</p>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </section>
            </article>

            <Footer />
        </main>
    );
}
