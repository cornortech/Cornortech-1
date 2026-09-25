import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
    title: 'Privacy Policy | Cornor Tech Pvt. Ltd.',
    description: 'Privacy Policy for Cornor Tech Pvt. Ltd. — Learn how we collect, use, and protect your personal information.',
};

const sections = [
    {
        id: '01',
        title: 'Introduction',
        content: `Cornor Tech Pvt. Ltd. ("Cornor Tech", "we", "us", or "our") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services. Please read this policy carefully. If you disagree with its terms, please discontinue use of our services.`,
    },
    {
        id: '02',
        title: 'Information We Collect',
        content: `We may collect information about you in the following ways:\n\nPersonal Data: Name, email address, phone number, company name, and other identifiers you voluntarily provide when contacting us, filling out forms, or engaging our services.\n\nUsage Data: Information automatically collected when you visit our website, including IP address, browser type, operating system, referring URLs, pages visited, and time spent on pages.\n\nCommunication Data: Records of correspondence if you contact us via email, phone, or our contact forms.\n\nProject Data: Information shared with us in the course of delivering services, including business documents, briefs, assets, and feedback.`,
    },
    {
        id: '03',
        title: 'How We Use Your Information',
        content: `We use the information we collect for the following purposes:\n\n— To deliver, manage, and improve our services\n— To communicate with you regarding projects, proposals, and support\n— To send newsletters or updates (only with your consent)\n— To process payments and manage billing\n— To comply with legal obligations\n— To analyze website usage and improve user experience\n— To prevent fraudulent activity and ensure security\n\nWe will never sell your personal information to third parties.`,
    },
    {
        id: '04',
        title: 'Cookies & Tracking Technologies',
        content: `Our website uses cookies and similar tracking technologies to enhance your browsing experience. Cookies are small data files stored on your device. We use:\n\nEssential Cookies: Required for the website to function correctly.\n\nAnalytics Cookies: Help us understand how visitors interact with our site (e.g., Google Analytics).\n\nPreference Cookies: Remember your settings and preferences.\n\nYou can control cookie settings through your browser. Disabling cookies may affect some website functionality. For full details, see our Cookies Policy.`,
    },
    {
        id: '05',
        title: 'Sharing Your Information',
        content: `We do not sell, trade, or rent your personal information. We may share your information only in the following circumstances:\n\nService Providers: Trusted third-party vendors who assist in delivering our services (e.g., hosting providers, payment processors, analytics tools). These parties are bound by confidentiality agreements.\n\nLegal Requirements: When required by law, court order, or governmental authority.\n\nBusiness Transfers: In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.\n\nWith Your Consent: When you have explicitly authorized us to share your information.`,
    },
    {
        id: '06',
        title: 'Data Storage & Security',
        content: `Your information is stored on secure servers. We implement industry-standard security measures including SSL encryption, access controls, and regular security audits to protect your data from unauthorized access, disclosure, alteration, or destruction.\n\nWhile we take all reasonable precautions, no method of transmission over the internet or electronic storage is 100% secure. We cannot guarantee absolute security but are committed to protecting your information to the best of our ability.`,
    },
    {
        id: '07',
        title: 'Data Retention',
        content: `We retain your personal information only for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, resolve disputes, and enforce agreements. Project-related data is typically retained for the duration of the engagement plus a reasonable period thereafter. You may request deletion of your data at any time, subject to our legal obligations.`,
    },
    {
        id: '08',
        title: 'Your Rights',
        content: `Depending on your location, you may have the following rights regarding your personal data:\n\n— Right to Access: Request a copy of the personal data we hold about you.\n— Right to Correction: Request correction of inaccurate or incomplete data.\n— Right to Deletion: Request deletion of your personal data ("right to be forgotten").\n— Right to Restriction: Request that we limit how we use your data.\n— Right to Portability: Request your data in a portable, machine-readable format.\n— Right to Object: Object to our processing of your data for certain purposes.\n\nTo exercise any of these rights, contact us at info@cornortech.com.`,
    },
    {
        id: '09',
        title: 'Third-Party Links',
        content: `Our website may contain links to third-party websites, tools, or services. These are not operated by Cornor Tech and we have no control over their content or privacy practices. We strongly advise you to review the privacy policy of any third-party site you visit. We are not responsible for the privacy practices or content of those sites.`,
    },
    {
        id: '10',
        title: 'Children\'s Privacy',
        content: `Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that a child has provided us with personal information without parental consent, we will take steps to delete that information. If you believe your child has provided us with personal data, please contact us immediately.`,
    },
    {
        id: '11',
        title: 'International Data Transfers',
        content: `Cornor Tech is based in Nepal. If you are accessing our services from outside Nepal, please be aware that your information may be transferred to and processed in Nepal or other countries where our service providers operate. By using our services, you consent to the transfer of your information to countries that may have different data protection laws than your country of residence.`,
    },
    {
        id: '12',
        title: 'Changes to This Policy',
        content: `We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with a revised effective date. We encourage you to review this policy periodically to stay informed about how we protect your information. Your continued use of our services after any changes constitutes your acceptance of the updated policy.`,
    },
    {
        id: '13',
        title: 'Contact Us',
        content: `If you have any questions, concerns, or requests regarding this Privacy Policy or your personal data, please contact us at:\n\nCornor Tech Pvt. Ltd.\nTilottama, Butwal, Lumbini Province, Nepal\nEmail: info@cornortech.com\nPhone: +977 9828750115`,
    },
];

export default function PrivacyPolicyPage() {
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
                        Privacy
                    </p>

                    <div className="container-custom relative z-10">

                        {/* Breadcrumb */}
                        <div className="flex items-center gap-2 mb-6">
                            <Link href="/" className="text-[11px] font-semibold text-white/40 hover:text-white/70 transition-colors uppercase tracking-wider">
                                Home
                            </Link>
                            <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
                                Privacy Policy
                            </span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight mb-6">
                            Privacy
                            <br />
                            <span
                                className="text-transparent bg-clip-text"
                                style={{ backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #818cf8 60%, #a855f7 100%)' }}
                            >
                                Policy
                            </span>
                        </h1>

                        <p className="text-white/70 text-base max-w-xl leading-relaxed">
                            Your privacy matters to us. This policy explains how Cornor Tech collects,
                            uses, and protects your personal information.
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

                                            <a key={s.id}
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

                                    <a href="mailto:info@cornortech.com"
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
                                            { title: 'Terms of Service', href: '/legal/terms-of-service' },
                                            { title: 'Cookies Policy', href: '/legal/cookies-policy' },
                                            { title: 'License Agreement', href: '/legal/license-agreement' },
                                            { title: 'Creator Terms', href: '/legal/creator-terms' },
                                            { title: 'Community Guidelines', href: '/legal/community-guidelines' },
                                        ].map((link) => (

                                            <a key={link.title}
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

                    </div >
                </div >
                {/* ===== End Main Section ===== */}

            </main >

            <Footer />
        </>
    );
}