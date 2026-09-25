// app/legal/cookies-policy/page.tsx

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
    title: 'Cookies Policy | Cornor Tech Pvt. Ltd.',
    description: 'Cookies Policy for Cornor Tech Pvt. Ltd. — Learn how we use cookies and tracking technologies on our website.',
};

const sections = [
    {
        id: '01',
        title: 'What Are Cookies',
        content: `Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites work more efficiently, remember your preferences, and provide information to website owners. Cookies do not contain personally identifiable information on their own, but they can be linked to personal data we hold about you.`,
    },
    {
        id: '02',
        title: 'How We Use Cookies',
        content: `Cornor Tech Pvt. Ltd. uses cookies and similar tracking technologies on our website for the following purposes:\n\n— To ensure our website functions correctly and securely\n— To remember your preferences and settings\n— To analyze how visitors use our website\n— To measure the effectiveness of our content and marketing\n— To improve the overall user experience\n\nWe do not use cookies to serve third-party advertisements or sell your data to advertisers.`,
    },
    {
        id: '03',
        title: 'Types of Cookies We Use',
        content: `Essential Cookies: These cookies are strictly necessary for our website to function. They enable core features such as page navigation, security, and access to protected areas. Without these cookies, the website cannot operate properly. These cannot be disabled.\n\nAnalytics Cookies: These help us understand how visitors interact with our website by collecting anonymous information such as pages visited, time spent, and traffic sources. We use this data to improve our website. (e.g., Google Analytics)\n\nPreference Cookies: These remember your choices and settings to provide a more personalized experience. For example, language preferences or display settings.\n\nPerformance Cookies: These collect information about how our website performs, including error reports and load times, helping us identify and fix issues quickly.`,
    },
    {
        id: '04',
        title: 'Third-Party Cookies',
        content: `Some cookies on our website are placed by third-party services we use. These third parties may include:\n\n— Google Analytics (website usage analysis)\n— Google Fonts (typography rendering)\n— Cloudinary (media delivery)\n— Stripe (payment processing)\n\nThese third parties have their own privacy and cookie policies. We have no control over the cookies they set. We encourage you to review their respective policies for more information on how they use cookies.`,
    },
    {
        id: '05',
        title: 'Cookie Duration',
        content: `Cookies can be classified by how long they remain on your device:\n\nSession Cookies: These are temporary cookies that expire when you close your browser. They are used to maintain your session while you navigate our website.\n\nPersistent Cookies: These remain on your device for a set period of time, or until you manually delete them. They are used to remember your preferences across multiple visits.\n\nMost analytics and preference cookies we use are persistent and typically expire between 30 days and 2 years depending on the specific cookie.`,
    },
    {
        id: '06',
        title: 'Managing Your Cookie Preferences',
        content: `You have the right to accept or decline cookies. You can manage your cookie preferences in the following ways:\n\nBrowser Settings: Most browsers allow you to control cookies through their settings. You can set your browser to block cookies, delete existing cookies, or alert you when cookies are being set. Please refer to your browser's help documentation for instructions.\n\nOpt-Out Tools: For analytics cookies, you can opt out of Google Analytics tracking by installing the Google Analytics Opt-out Browser Add-on available at tools.google.com/dlpage/gaoptout.\n\nPlease note that disabling certain cookies may affect the functionality of our website and your user experience.`,
    },
    {
        id: '07',
        title: 'Cookies & Personal Data',
        content: `Some cookies may collect data that, when combined with other information we hold, could identify you as an individual. In such cases, our Privacy Policy also applies. We process any personal data collected through cookies in accordance with applicable data protection laws.\n\nFor analytics purposes, IP addresses collected through cookies are anonymized before processing. We do not use cookie data to build personal profiles or make automated decisions about you.`,
    },
    {
        id: '08',
        title: 'Do Not Track Signals',
        content: `Some browsers include a "Do Not Track" (DNT) feature that signals to websites that you do not want to be tracked. Currently, there is no universally accepted standard for how websites should respond to DNT signals. Our website does not currently respond to DNT browser signals. However, you can use the cookie management options described in this policy to limit tracking.`,
    },
    {
        id: '09',
        title: 'Cookies on Mobile Devices',
        content: `If you access our website through a mobile device, we may use mobile-specific tracking technologies in addition to standard cookies, such as device identifiers and mobile analytics SDKs. You can limit the use of these technologies through your device's privacy settings. Refer to your device manufacturer's documentation for specific instructions on managing tracking preferences.`,
    },
    {
        id: '10',
        title: 'Updates to This Policy',
        content: `We may update this Cookies Policy from time to time to reflect changes in technology, legislation, or our business practices. When we make significant changes, we will update the effective date at the top of this page. We encourage you to review this policy periodically to stay informed about how we use cookies. Your continued use of our website following any changes constitutes your acceptance of the updated policy.`,
    },
    {
        id: '11',
        title: 'Governing Law',
        content: `This Cookies Policy is governed by and construed in accordance with the laws of Nepal. Any disputes arising in connection with this policy shall be subject to the exclusive jurisdiction of the courts of Butwal, Lumbini Province, Nepal.`,
    },
    {
        id: '12',
        title: 'Contact Us',
        content: `If you have any questions, concerns, or requests regarding our use of cookies or this Cookies Policy, please contact us at:\n\nCornor Tech Pvt. Ltd.\nTilottama, Butwal, Lumbini Province, Nepal\nEmail: info@cornortech.com\nPhone: +977 9828750115`,
    },
];

export default function CookiesPolicyPage() {
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
                    {/* Noise overlay */}
                    <div
                        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
                        style={{
                            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                        }}
                        aria-hidden="true"
                    />

                    {/* Ambient blobs */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
                        <div
                            className="absolute -top-32 -left-32 w-96 h-96 rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)' }}
                        />
                        <div
                            className="absolute -bottom-20 right-0 w-80 h-80 rounded-full"
                            style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%)' }}
                        />
                    </div>

                    {/* Ghost watermark */}
                    <p
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[12vw] font-black uppercase tracking-tighter text-white/[0.035] select-none pointer-events-none leading-none"
                        aria-hidden="true"
                    >
                        Cookies
                    </p>

                    <div className="container-custom relative z-10">

                        {/* Breadcrumb */}
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
                            <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
                                Cookies Policy
                            </span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight mb-6">
                            Cookies
                            <br />
                            <span
                                className="text-transparent bg-clip-text"
                                style={{ backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #818cf8 60%, #a855f7 100%)' }}
                            >
                                Policy
                            </span>
                        </h1>

                        <p className="text-white/70 text-base max-w-xl leading-relaxed">
                            This policy explains how Cornor Tech uses cookies and similar tracking
                            technologies when you visit our website.
                        </p>

                    </div>
                </div>
                {/* ===== End Heading Section ===== */}


                {/* ===== Main Section ===== */}
                <div className="container-custom py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

                        {/* LEFT: sticky sidebar (desktop only) */}
                        <aside className="hidden lg:block lg:col-span-3">
                            <div className="sticky top-28 flex flex-col gap-6">

                                {/* Table of contents */}
                                <div className="bg-white border border-[#9333EA]/10 rounded-2xl p-5 shadow-[0_4px_24px_rgba(147,51,234,0.06)]">
                                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#9333EA] mb-4">
                                        On This Page
                                    </p>
                                    <nav className="flex flex-col gap-0.5">
                                        {sections.map((s) => (
                                            
                                             <a   key={s.id}
                                                href={`#section-${s.id}`}
                                                className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-[12px] font-medium text-[#1e003a]/60 hover:text-[#9333EA] hover:bg-[#9333EA]/5 transition-all duration-150 group"
                                            >
                                                <span className="text-[9px] font-black tabular-nums text-[#9333EA]/35 group-hover:text-[#9333EA]/80 transition-colors shrink-0 w-5">
                                                    {s.id}
                                                </span>
                                                <span className="leading-snug">{s.title}</span>
                                            </a>
                                        ))}
                                    </nav>
                                </div>

                                {/* Contact card */}
                                <div className="bg-white border border-[#9333EA]/10 rounded-2xl p-5 shadow-[0_4px_24px_rgba(147,51,234,0.06)]">
                                    <div className="w-8 h-8 rounded-xl bg-[#9333EA]/10 border border-[#9333EA]/20 flex items-center justify-center mb-3">
                                        <svg className="w-4 h-4 text-[#9333EA]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <p className="text-[12px] font-bold text-[#1e003a] mb-1">Have questions?</p>
                                    <p className="text-[11.5px] text-[#1e003a]/60 leading-relaxed mb-3">
                                        Reach out to us directly and we&apos;ll get back to you within 24 hours.
                                    </p>
                                    
                                     <a   href="mailto:info@cornortech.com"
                                        className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#9333EA] hover:text-[#7c3aed] transition-colors"
                                    >
                                        info@cornortech.com
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </a>
                                </div>

                                {/* Other legal links */}
                                <div className="bg-white border border-[#9333EA]/10 rounded-2xl p-5 shadow-[0_4px_24px_rgba(147,51,234,0.06)]">
                                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[#9333EA] mb-3">
                                        Other Legal Pages
                                    </p>
                                    <div className="flex flex-col gap-1">
                                        {[
                                            { title: 'Terms of Service',     href: '/legal/terms-of-service' },
                                            { title: 'Privacy Policy',       href: '/legal/privacy-policy' },
                                            { title: 'License Agreement',    href: '/legal/license-agreement' },
                                            { title: 'Creator Terms',        href: '/legal/creator-terms' },
                                            { title: 'Community Guidelines', href: '/legal/community-guidelines' },
                                        ].map((link) => (
                                            
                                             <a   key={link.title}
                                                href={link.href}
                                                className="flex items-center justify-between px-2.5 py-2 rounded-lg text-[12px] font-medium text-[#1e003a]/60 hover:text-[#9333EA] hover:bg-[#9333EA]/5 transition-all duration-150 group"
                                            >
                                                {link.title}
                                                <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                                </svg>
                                            </a>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </aside>
                        {/* End LEFT */}


                        {/* RIGHT: sections */}
                        <div className="lg:col-span-9 flex flex-col">
                            {sections.map((s) => (
                                <div
                                    key={s.id}
                                    id={`section-${s.id}`}
                                    className="group flex flex-col lg:flex-row gap-4 lg:gap-10 py-10 border-b border-[#9333EA]/10 last:border-0 scroll-mt-28 hover:bg-[#9333EA]/2 -mx-4 px-4 rounded-xl transition-colors duration-200"
                                >
                                    {/* Section number + line */}
                                    <div className="shrink-0 lg:w-14 flex lg:flex-col items-center lg:items-start gap-3 lg:gap-0 pt-0.5">
                                        <span className="text-[13px] font-black tabular-nums text-[#9333EA]/40 group-hover:text-[#9333EA] transition-colors duration-200">
                                            {s.id}
                                        </span>
                                        <div className="flex-1 h-px lg:h-auto lg:w-px lg:flex-1 bg-[#9333EA]/10 lg:mt-3" />
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <h2 className="text-lg lg:text-xl font-black text-[#1e003a] mb-4 leading-snug group-hover:text-[#9333EA] transition-colors duration-200">
                                            {s.title}
                                        </h2>
                                        <p className="text-[14.5px] text-[#1e003a]/70 leading-[1.82] whitespace-pre-line">
                                            {s.content}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* End RIGHT */}

                    </div>
                </div>
                {/* ===== End Main Section ===== */}

            </main>

            <Footer />
        </>
    );
}