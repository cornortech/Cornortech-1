import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
    title: 'Terms of Service | Cornor Tech Pvt. Ltd.',
    description: 'Terms of Service for Cornor Tech Pvt. Ltd. — Read our terms and conditions before using our services.',
};

const sections = [
    {
        id: '01',
        title: 'Acceptance of Terms',
        content: `By accessing or using the website and services provided by Cornor Tech Pvt. Ltd. ("Cornor Tech", "we", "us", or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services. These terms apply to all visitors, clients, and anyone who accesses or uses our services.`,
    },
    {
        id: '02',
        title: 'Services Provided',
        content: `Cornor Tech provides a range of digital services including but not limited to web development, mobile app development, UI/UX design, graphic design, digital marketing, cloud solutions, e-commerce development, branding & strategy, and content creation. The scope of services is defined in individual project agreements or contracts signed between Cornor Tech and the client.`,
    },
    {
        id: '03',
        title: 'Client Responsibilities',
        content: `Clients are responsible for providing accurate, complete, and timely information required for the execution of services. This includes project briefs, content, assets, feedback, and approvals. Delays caused by the client's failure to provide required materials may affect project timelines and deadlines, for which Cornor Tech shall not be held responsible.`,
    },
    {
        id: '04',
        title: 'Payment Terms',
        content: `Payment terms are outlined in individual project proposals or service agreements. Unless otherwise agreed, a deposit is required before project commencement. Final deliverables will be released upon receipt of full payment. Cornor Tech reserves the right to suspend or terminate services in the event of non-payment or delayed payment beyond the agreed terms.`,
    },
    {
        id: '05',
        title: 'Intellectual Property',
        content: `Upon full payment, clients receive ownership rights to the final deliverables as specified in the project agreement. Cornor Tech retains the right to display completed work in our portfolio unless a confidentiality agreement is in place. All source code, design files, and proprietary tools developed internally by Cornor Tech remain our intellectual property unless explicitly transferred in writing.`,
    },
    {
        id: '06',
        title: 'Confidentiality',
        content: `Both parties agree to keep confidential any proprietary or sensitive information shared during the course of the engagement. Cornor Tech will not disclose client information to third parties without prior written consent, except where required by law. This obligation survives the termination of any service agreement.`,
    },
    {
        id: '07',
        title: 'Revisions & Scope Changes',
        content: `Revisions within the agreed scope of work are included as specified in the project proposal. Requests for work outside the agreed scope will be treated as change requests and may incur additional costs and timeline adjustments. All scope changes must be agreed upon in writing before implementation begins.`,
    },
    {
        id: '08',
        title: 'Limitation of Liability',
        content: `Cornor Tech shall not be liable for any indirect, incidental, special, or consequential damages arising from the use or inability to use our services. Our total liability for any claim arising from our services shall not exceed the total amount paid by the client for the specific service in question. We do not guarantee uninterrupted or error-free operation of delivered products.`,
    },
    {
        id: '09',
        title: 'Third-Party Services',
        content: `Some services may involve the use of third-party tools, platforms, APIs, or services (e.g., AWS, Stripe, Google services). Cornor Tech is not responsible for the availability, performance, or terms of third-party services. Clients are responsible for complying with the terms of any third-party services used in their projects.`,
    },
    {
        id: '10',
        title: 'Termination',
        content: `Either party may terminate a service agreement with written notice as specified in the individual contract. In the event of termination, the client agrees to pay for all work completed up to the date of termination. Cornor Tech reserves the right to terminate services immediately if the client violates these terms or engages in unlawful activity.`,
    },
    {
        id: '11',
        title: 'Governing Law',
        content: `These Terms of Service are governed by and construed in accordance with the laws of Nepal. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts of Butwal, Lumbini Province, Nepal.`,
    },
    {
        id: '12',
        title: 'Changes to Terms',
        content: `Cornor Tech reserves the right to update or modify these Terms of Service at any time without prior notice. Changes will be effective immediately upon posting to our website. Your continued use of our services following any changes constitutes your acceptance of the revised terms. We encourage you to review these terms periodically.`,
    },
    {
        id: '13',
        title: 'Contact Us',
        content: `If you have any questions, concerns, or requests regarding these Terms of Service, please contact us at:\n\nCornor Tech Pvt. Ltd.\nTilottama, Butwal, Lumbini Province, Nepal\nEmail: info@cornortech.com\nPhone: +977 9828750115`,
    },
];

export default function TermsOfServicePage() {
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
                    {/* End Noise overlay */}


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
                    {/*End Ambient blobs */}


                    {/* Ghost watermark */}
                    <p
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[12vw] font-black uppercase tracking-tighter text-white/[0.035] select-none pointer-events-none leading-none"
                        aria-hidden="true"
                    >
                        Terms
                    </p>
                    {/* End Ghost watermark */}


                    <div className="container-custom relative z-10">

                        {/*  Breadcrumb — replaces the "Legal" pill  */}
                        <div className="flex items-center gap-2 mb-6">
                            <Link href="/" className="text-[11px] font-semibold text-white/40 hover:text-white/70 transition-colors uppercase tracking-wider">
                                Home
                            </Link>
                            <svg className="w-3 h-3 text-white/20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                            </svg>
                            <span className="text-[11px] font-semibold text-white/70 uppercase tracking-wider">
                                Terms of Service
                            </span>
                        </div>
                        {/* End Breadcrumb — replaces the "Legal" pill  */}


                        <h1 className="text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight mb-6">
                            Terms of
                            <br />
                            <span
                                className="text-transparent bg-clip-text"
                                style={{ backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #818cf8 60%, #a855f7 100%)' }}
                            >
                                Service
                            </span>
                        </h1>

                        <p className="text-white/70 text-base max-w-xl leading-relaxed">
                            Please read these terms carefully before using our services.
                            By engaging with Cornor Tech, you agree to be bound by the following conditions.
                        </p>

                    </div>
                </div>
                {/* ===== End Heading Section ===== */}


                {/* ===== Main Section ===== */}
                <div className="container-custom py-16 lg:py-24">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">

                        {/*  LEFT: sticky sidebar (desktop only)  */}
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
                                            { title: 'Privacy Policy', href: '/legal/privacy-policy' },
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
                        {/* End LEFT: sticky sidebar (desktop only)  */}

                        {/*  RIGHT: sections */}
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
                        {/* End RIGHT: sections */}

                    </div>
                </div>
                {/* ===== End Main Section ===== */}


            </main>

            <Footer />
        </>
    );
}