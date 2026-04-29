// app/news-and-updates/page.tsx

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ARTICLES, NewsArticle } from '@/data/news';
// import ScrollToTopButton from '@/components/ui/ScrollToTopButton'
import CTA from '@/components/ui/CTA';

export const metadata = {
    title: 'News & Updates | Cornor Tech Pvt. Ltd.',
    description: 'Latest news, articles, and updates from Cornor Tech Pvt. Ltd.',
};

// OG metadata type 
interface OGData {
    title: string;
    description: string;
    image: string | null;
}

// Fetch OG tags from a URL (server-side) 
async function fetchOG(url: string): Promise<OGData> {
    try {
        const res = await fetch(url, {
            headers: { 'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1)' },
            next: { revalidate: 86400 }, // cache for 24 hours
        });
        const html = await res.text();

        const get = (property: string): string => {
            const match =
                html.match(new RegExp(`<meta[^>]*property=["']og:${property}["'][^>]*content=["']([^"']+)["']`, 'i')) ||
                html.match(new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:${property}["']`, 'i')) ||
                html.match(new RegExp(`<meta[^>]*name=["']${property}["'][^>]*content=["']([^"']+)["']`, 'i'));
            return match?.[1] ?? '';
        };

        const titleTag = html.match(/<title[^>]*>([^<]+)<\/title>/i);

        return {
            title: get('title') || titleTag?.[1] || 'Read Article',
            description: get('description') || '',
            image: get('image') || null,
        };
    } catch {
        return { title: 'Read Article', description: '', image: null };
    }
}

// Article type 
type Article = NewsArticle & { og: OGData };

//  News Card (Horizontal) — social preview style 
const NewsCardHorizontal = ({ article, isFeatured = false }: { article: Article; isFeatured?: boolean }) => (

    <Link href={article.href}
        target={article.external ? '_blank' : '_self'}
        rel={article.external ? 'noopener noreferrer' : undefined}
        className={`group grid grid-cols-1 lg:grid-cols-5 rounded-3xl overflow-hidden border border-[#1e003a]/08 hover:border-[#9333EA]/20 transition-all duration-500 hover:shadow-[0_12px_60px_rgba(147,51,234,0.10)] bg-white ${isFeatured ? 'ring-2 ring-[#9333EA]/10 shadow-lg' : ''}`}
    >
        {/* ── Left: OG image or branded fallback ── */}
        <div className="lg:col-span-2 relative min-h-64 lg:min-h-0 overflow-hidden bg-[#1e003a]">

            {article.og.image ? (
                <>
                    <img
                        src={article.og.image}
                        alt={article.og.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.25) 100%)' }}
                        aria-hidden="true"
                    />
                </>
            ) : (
                <>
                    <div
                        className="absolute inset-0"
                        style={{ background: 'linear-gradient(135deg, #1e003a 0%, #2d0a52 60%, #3b1266 100%)' }}
                    />
                    <div
                        className="absolute inset-0 opacity-[0.07] pointer-events-none"
                        style={{
                            backgroundImage: 'radial-gradient(circle, #a855f7 1px, transparent 1px)',
                            backgroundSize: '18px 18px',
                        }}
                        aria-hidden="true"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                        <div
                            className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)] group-hover:scale-110 transition-transform duration-500"
                            style={{ background: article.sourceColor }}
                        >
                            {article.sourceLogo}
                        </div>
                        <div className="flex flex-col items-center gap-1">
                            <span className="text-white/80 text-[11px] font-bold uppercase tracking-[0.25em]">{article.source}</span>
                            <span className="text-white/30 text-[10px] font-medium uppercase tracking-widest">Article Preview</span>
                        </div>
                    </div>
                </>
            )}

            {/* Featured badge */}
            {isFeatured && (
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/30 border border-white/15 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[9px] font-bold uppercase tracking-widest text-white/90">Featured</span>
                </div>
            )}

            {/* External indicator */}
            {article.external && (
                <div className="absolute top-4 right-4 w-7 h-7 rounded-full bg-black/25 border border-white/15 flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-3 h-3 text-white/80" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                </div>
            )}
        </div>

        {/* ── Right: OG content ── */}
        <div className="lg:col-span-3 flex flex-col justify-between p-7 lg:p-10">
            <div>
                {/* Category + date */}
                <div className="flex items-center gap-3 mb-5">
                    <span
                        className="text-[9px] font-black uppercase tracking-[0.2em] px-2.5 py-1 rounded-full"
                        style={{ background: `${article.categoryColor}12`, color: article.categoryColor }}
                    >
                        {article.category}
                    </span>
                    <span className="text-[#1e003a]/25 text-xs">·</span>
                    <span className="text-[11px] text-[#1e003a]/40 font-medium">{article.date}</span>
                </div>

                {/* Heading (Source + Title) */}
                <div className="space-y-2 mb-4">
                    <span className="text-[11px] font-black uppercase tracking-widest text-[#9333EA]/60 block">{article.source}</span>
                    <h2 className={`font-black text-[#1e003a] leading-[1.1] tracking-tight group-hover:text-[#9333EA] transition-colors duration-300 ${isFeatured ? 'text-2xl lg:text-3xl' : 'text-xl lg:text-2xl'}`}>
                        {article.og.title}
                    </h2>
                </div>

                {/* Description */}
                {article.og.description && (
                    <p className={`text-[#1e003a]/60 leading-[1.8] line-clamp-3 ${isFeatured ? 'text-[14px]' : 'text-[13px]'}`}>
                        {article.og.description}
                    </p>
                )}
            </div>

            {/* Footer row + CTA */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#1e003a]/06">
                <div className="flex items-center gap-2.5">
                    <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-[9px] font-black shrink-0 shadow-sm overflow-hidden border border-black/5"
                        style={{ 
                            background: article.sourceColor,
                            color: article.sourceColor === '#FFFFFF' ? '#9333EA' : '#FFFFFF' 
                        }}
                    >
                        {article.sourceLogo.startsWith('/') || article.sourceLogo.startsWith('http') ? (
                            <img 
                                src={article.sourceLogo} 
                                alt={article.source} 
                                className="w-full h-full object-contain p-1"
                            />
                        ) : (
                            article.sourceLogo
                        )}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[11px] font-bold text-[#1e003a]/70">{article.source}</span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-[12px] font-bold text-[#9333EA] group-hover:gap-3 transition-all duration-300 uppercase tracking-widest">
                    {article.external ? 'Read Full Article' : 'Read More'}
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                </div>
            </div>
        </div>
    </Link>
);

// Empty State 
const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-32 text-center">
        <div className="w-14 h-14 rounded-2xl bg-[#9333EA]/08 border border-[#9333EA]/15 flex items-center justify-center mb-4">
            <svg className="w-6 h-6 text-[#9333EA]/40" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
        </div>
        <p className="text-[13px] font-bold text-[#1e003a]/40 mb-1">No articles yet</p>
        <p className="text-[11px] text-[#1e003a]/25">Check back soon for the latest updates.</p>
    </div>
);

// Page (Server Component — fetches OG data at build time) 
export default async function BlogsPage() {

    // Fetch OG metadata for all articles in parallel
    const articlesWithOG: Article[] = await Promise.all(
        ARTICLES.map(async (article) => {
            if (article.external) {
                return {
                    ...article,
                    og: await fetchOG(article.href),
                };
            }
            // For internal articles, use static metadata
            return {
                ...article,
                og: {
                    title: article.title || 'Cornor Tech Update',
                    description: article.description || '',
                    image: article.cardImage || null,
                },
            };
        })
    );

    const featuredArticle = articlesWithOG.find((a) => a.featured);
    const restArticles = articlesWithOG.filter((a) => !a.featured);
    const categories = ['All', ...Array.from(new Set(ARTICLES.map((a) => a.category)))];

    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#faf8ff]">

                {/* ===== Heading Section ===== */}
                <div
                    className="relative pt-28 pb-12 lg:pt-36 lg:pb-16 overflow-hidden"
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
                        News & Update
                    </p>

                    <div className="container-custom relative z-10">
                        <div className="flex items-center gap-2 mb-6">
                            <Link
                                href="/"
                                className="text-[11px] font-semibold text-white/40 hover:text-white/70 transition-colors uppercase tracking-wider"
                            >
                                Home
                            </Link>
                            <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">News & Update</span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight mb-6">
                            News &amp;
                            <br />
                            <span
                                className="text-transparent bg-clip-text"
                                style={{ backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #818cf8 60%, #a855f7 100%)' }}
                            >
                                Updates
                            </span>
                        </h1>

                        <p className="text-white/70 text-base max-w-xl leading-relaxed">
                            Stay up to date with the latest news, press coverage, and insights
                            from Cornor Tech and the wider tech industry.
                        </p>

                        <div className="flex flex-wrap items-center gap-3 mt-8">
                            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                <span className="text-[11px] font-semibold text-white/75 uppercase tracking-wider">
                                    {ARTICLES.length} {ARTICLES.length === 1 ? 'Article' : 'Articles'}
                                </span>
                            </div>
                            {categories.filter((c) => c !== 'All').map((cat) => (
                                <div
                                    key={cat}
                                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/8 border border-white/12"
                                >
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#a855f7]" />
                                    <span className="text-[11px] font-semibold text-white/75 uppercase tracking-wider">{cat}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                {/* ===== End Heading Section ===== */}

                {/* <ScrollToTopButton /> */}
                <CTA />

                {/* ===== Articles Section ===== */}
                <div className="container-custom py-16 lg:py-24">
                    {articlesWithOG.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="flex flex-col gap-12">

                            {featuredArticle && (
                                <div>
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="h-px w-8 bg-[#9333EA] rounded-full" />
                                        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#9333EA]">
                                            Featured Story
                                        </span>
                                    </div>
                                    <NewsCardHorizontal article={featuredArticle} isFeatured={true} />
                                </div>
                            )}

                            {restArticles.length > 0 && (
                                <div className="space-y-12">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="h-px w-8 bg-[#9333EA] rounded-full" />
                                        <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#9333EA]">
                                            Recent Updates
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-8">
                                        {restArticles.map((article) => (
                                            <NewsCardHorizontal
                                                key={article.id}
                                                article={article}
                                            />
                                        ))}
                                    </div>
                                </div>
                            )}

                        </div>
                    )}
                </div>
                {/* ===== End Articles Section ===== */}

            </main>

            <Footer />
        </>
    );
}