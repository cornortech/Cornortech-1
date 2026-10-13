// app/news-and-updates/[id]/page.tsx

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ARTICLES } from '@/data/news';
import { notFound } from 'next/navigation';
// import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import CTA from '@/components/ui/CTA';

export async function generateStaticParams() {
    return ARTICLES.filter(a => !a.external).map((article) => ({
        id: article.id,
    }));
}

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const article = ARTICLES.find((a) => a.id === id && !a.external);

    if (!article) {
        notFound();
    }

    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#faf8ff] space-y-2">

                {/* ===== Premium Hero Section ===== */}
                <div
                    className="relative pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden"
                    style={{
                        background: 'linear-gradient(135deg, #1e003a 0%, #2d0a52 50%, #3b1266 100%)',
                    }}
                >
                    <div
                        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        }}
                        aria-hidden="true"
                    />
                    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)' }} />
                        <div className="absolute -bottom-20 right-0 w-80 h-80 rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }} />
                    </div>
                    <p
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[12vw] font-black uppercase tracking-tighter text-white/[0.035] select-none pointer-events-none leading-none"
                        aria-hidden="true"
                    >
                        Article
                    </p>

                    <div className="container-custom relative z-10">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 mb-8">
                            <Link
                                href="/"
                                className="text-[11px] font-semibold text-white/40 hover:text-white/70 transition-colors uppercase tracking-wider"
                            >
                                Home
                            </Link>
                            <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            <Link
                                href="/news-and-updates"
                                className="text-[11px] font-semibold text-white/40 hover:text-white/70 transition-colors uppercase tracking-wider"
                            >
                                News & Update
                            </Link>
                            <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider truncate max-w-40 lg:max-w-none">
                                {article.title}
                            </span>
                        </div>

                        {/* Article Header Info */}
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-3 mb-6">
                                <span
                                    className="text-[10px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-full bg-white/10 text-white border border-white/12 backdrop-blur-sm"
                                >
                                    {article.category}
                                </span>
                                <span className="text-white/25 text-xs">·</span>
                                <span className="text-xs text-white/40 font-medium uppercase tracking-widest">{article.date}</span>
                            </div>

                            <h1 className="text-4xl lg:text-7xl font-black text-white leading-[0.95] tracking-tight mb-10">
                                {article.title}
                            </h1>

                            <div className="flex items-center gap-4">
                                <div
                                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-black shadow-lg overflow-hidden border border-white/10"
                                    style={{
                                        background: article.sourceColor,
                                        color: article.sourceColor === '#FFFFFF' ? '#9333EA' : '#FFFFFF'
                                    }}
                                >
                                    {article.sourceLogo.startsWith('/') || article.sourceLogo.startsWith('http') ? (
                                        <img
                                            src={article.sourceLogo}
                                            alt={article.source}
                                            className="w-full h-full object-contain p-2"
                                        />
                                    ) : (
                                        article.sourceLogo
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-base font-bold text-white">{article.source}</span>
                                    <span className="text-[11px] text-white/40 uppercase tracking-widest font-bold">Official Update</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* ===== End Hero Section ===== */}
                
                {/* <ScrollToTopButton/> */}
                <CTA/>
                
                {/* ===== Article Image Section ===== */}
                {article.articleImage && (
                    <div className="w-full flex justify-center py-12">

                        {/* articleImage container */}
                        <div className="w-md relative aspect-video rounded-2xl overflow-hidden shadow-2xl group/banner">
                            <img
                                src={article.articleImage}
                                alt={article.title}
                                className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-1000 group-hover/banner:scale-105"
                            />
                            <div className="absolute inset-0 bg-linear-to-t from-[#1e003a]/25 to-transparent pointer-events-none" />
                            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 pointer-events-none rounded-2xl" />
                        </div>
                    </div>
                )}

                {/* ===== Article Content ===== */}
                <div className="container-custom max-w-4xl py-16 lg:py-24">


                    {/* Article Content */}
                    <article className="prose prose-purple max-w-none text-[#1e003a]/80">
                        {/* We use dangerouslySetInnerHTML here as the content is trusted from our own data file */}
                        <div
                            className="space-y-8 leading-[1.8] text-[18px] lg:text-[20px]"
                            dangerouslySetInnerHTML={{ __html: article.content || '' }}
                        />
                    </article>

                    {/* Footer CTA */}
                    <div className="mt-24 p-8 lg:p-16 rounded-[40px] bg-linear-to-br from-[#1e003a] to-[#2d0a52] text-white overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none" />
                        <div className="relative z-10 text-center lg:text-left">
                            <h3 className="text-2xl lg:text-3xl font-bold mb-4">Want more updates?</h3>
                            <p className="text-white/70 mb-8 max-w-xl">
                                Subscribe to our newsletter or follow us on social media to stay connected with the Cornor Tech community.
                            </p>
                            <Link
                                href="/"
                                className="inline-flex items-center px-8 py-4 bg-white text-[#1e003a] rounded-xl font-bold hover:bg-gray-100 transition-all transform hover:scale-105"
                            >
                                Back to Home
                            </Link>
                        </div>
                    </div>

                </div>
                {/* ===== End Article Content ===== */}


            </main>

            <Footer />
        </>
    );
}
