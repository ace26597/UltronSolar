import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthorBio from "@/components/blog/AuthorBio";
import LeadMagnet from "@/components/blog/LeadMagnet";
import ReadingProgress from "@/components/blog/ReadingProgress";
import TableOfContents from "@/components/blog/TableOfContents";
import ShareButtons from "@/components/blog/ShareButtons";
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
        <main className="min-h-screen bg-white">
            <ReadingProgress />
            <Navbar />

            <article>
                <section className="relative h-[420px] md:h-[520px] w-full">
                    <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-navy/50 to-navy/90"></div>
                    <div className="absolute inset-0 flex items-end">
                        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full pb-12 text-white">
                            <Link href="/blog" className="inline-flex items-center text-sm font-black uppercase tracking-[0.2em] text-white/80 hover:text-solar-orange transition-colors">
                                ← Dispatch Intelligence
                            </Link>
                            <div className="flex flex-wrap items-center gap-3 text-sm md:text-base mt-8">
                                <span className="bg-solar-orange text-white px-5 py-1.5 rounded-full font-black uppercase tracking-widest text-[10px]">{primaryTag}</span>
                                <span className="text-gray-300">{post.date}</span>
                                <span className="text-gray-500">•</span>
                                <span className="text-gray-300">{post.readTime}</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-heading font-black leading-tight mt-6 max-w-4xl">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-4 mt-8">
                                {post.authorDetails && (
                                    <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-solar-orange/30">
                                        <Image src={post.authorDetails.avatarUrl} alt={post.authorDetails.name} fill className="object-cover" />
                                    </div>
                                )}
                                <div className="text-sm">
                                    <div className="text-white/70 uppercase tracking-widest text-[9px] font-black">Prepared By</div>
                                    <div className="text-white font-bold">{post.authorDetails?.name || post.author}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="grid gap-12 lg:grid-cols-[80px_minmax(0,1fr)_300px] relative">
                        {/* Left Sidebar: Share Buttons */}
                        <aside className="hidden lg:block relative">
                            <div className="sticky top-32">
                                <ShareButtons title={post.title} />
                            </div>
                        </aside>

                        {/* Main Content */}
                        <div className="min-w-0">
                            {(() => {
                                let contentHtml = post.content;
                                if (post.containerImageUrl) {
                                    const parts = contentHtml.split('</p>');
                                    if (parts.length > 2) {
                                        // Insert after the second paragraph
                                        const imageHtml = `
                                            <div class="float-right ml-6 mb-6 w-full md:w-1/2 relative h-64 md:h-80 rounded-xl overflow-hidden my-4">
                                                <img src="${post.containerImageUrl}" alt="Blog container image" class="object-cover w-full h-full" />
                                            </div>
                                        `;
                                        const firstPart = parts.slice(0, 2).join('</p>') + '</p>';
                                        const rest = parts.slice(2).join('</p>');
                                        contentHtml = firstPart + imageHtml + rest;
                                    }
                                }

                                // Check for lead magnet placeholder
                                if (contentHtml.includes('[LEAD_MAGNET:')) {
                                    const parts = contentHtml.split(/\[LEAD_MAGNET:[^\]]+\]/);
                                    const magnetMatch = contentHtml.match(/\[LEAD_MAGNET:([^\]]+)\]/);
                                    const slug = magnetMatch ? magnetMatch[1] : '';

                                    return (
                                        <>
                                            <div className="blog-content" dangerouslySetInnerHTML={{ __html: parts[0] }} />
                                            <LeadMagnet
                                                title={
                                                    slug === 'dhule_roi' ? "Get Your Custom ROI Report" :
                                                        slug === 'solar_pump_guide' ? "Free Solar Pump Feasibility Report" :
                                                            "PM Surya Ghar Subsidy Guide 2024"
                                                }
                                                description={
                                                    slug === 'dhule_roi' ? "See exactly how much you can save in Dhule with the latest government subsidies." :
                                                        slug === 'solar_pump_guide' ? "Assess your borewell capacity and see how much diesel you can save with a solar irrigation system." :
                                                            "Download our step-by-step guide to claiming your solar subsidy."
                                                }
                                                buttonText={
                                                    slug === 'dhule_roi' ? "Calculate My Savings" :
                                                        slug === 'solar_pump_guide' ? "Get My Farm Assessment" :
                                                            "Download the Guide"
                                                }
                                            />
                                            <div className="blog-content" dangerouslySetInnerHTML={{ __html: parts[1] }} />
                                        </>
                                    );
                                }

                                return <div className="blog-content" dangerouslySetInnerHTML={{ __html: contentHtml }} />;
                            })()}

                            {post.footerImageUrl && (
                                <div className="mt-8 relative h-[300px] w-full rounded-2xl overflow-hidden">
                                    <Image
                                        src={post.footerImageUrl}
                                        alt="Blog footer image"
                                        fill
                                        className="object-cover"
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

                            {post.authorDetails && <AuthorBio author={post.authorDetails} />}

                            {/* Mobile Share Buttons */}
                            <div className="lg:hidden mt-8 pt-8 border-t border-gray-100">
                                <p className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-4">Share this post</p>
                                <ShareButtons title={post.title} />
                            </div>
                        </div>

                        {/* Right Sidebar: TOC and Related */}
                        <aside className="space-y-8 lg:sticky lg:top-24 lg:h-[calc(100vh-100px)] lg:overflow-y-auto hide-scrollbar">
                            <TableOfContents />

                            <div className="rounded-2xl border border-gray-100 p-6 shadow-sm bg-white">
                                <h3 className="text-lg font-semibold text-navy-dark mb-4">Quick facts</h3>
                                <ul className="space-y-3 text-sm text-gray-600">
                                    <li><strong className="text-navy-dark block mb-0.5">Primary topic</strong> {primaryTag}</li>
                                    <li><strong className="text-navy-dark block mb-0.5">Estimated read</strong> {post.readTime}</li>
                                    <li><strong className="text-navy-dark block mb-0.5">Published</strong> {post.date}</li>
                                    <li><strong className="text-navy-dark block mb-0.5">Author</strong> {post.author}</li>
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
        </main >
    );
}
