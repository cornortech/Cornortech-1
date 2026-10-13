import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
    title: 'License Agreement | Cornor Tech Pvt. Ltd.',
    description: 'License Agreement for Cornor Tech Pvt. Ltd. — Understand the terms under which our deliverables and intellectual property are licensed.',
};

const sections = [
    {
        id: '01',
        title: 'Introduction',
        content: `This License Agreement ("Agreement") governs the terms under which Cornor Tech Pvt. Ltd. ("Cornor Tech", "we", "us", or "our") licenses deliverables, software, design assets, and other intellectual property to clients and users. By receiving, downloading, or using any deliverable from Cornor Tech, you agree to be bound by this Agreement. If you do not agree, please do not use or retain any licensed materials.`,
    },
    {
        id: '02',
        title: 'Definitions',
        content: `For the purposes of this Agreement:\n\nDeliverables: Any software, code, design files, graphics, websites, mobile applications, or other creative works produced by Cornor Tech for a client.\n\nLicensor: Cornor Tech Pvt. Ltd., the creator and owner of the deliverables.\n\nLicensee: The client or individual who has engaged Cornor Tech and received deliverables under a signed project agreement.\n\nIntellectual Property (IP): All creative works, inventions, designs, code, trade secrets, and other proprietary materials created by Cornor Tech.\n\nThird-Party Components: Open-source libraries, stock assets, fonts, plugins, or tools incorporated into deliverables that are owned by parties other than Cornor Tech.`,
    },
    {
        id: '03',
        title: 'Grant of License',
        content: `Upon receipt of full payment as outlined in the project agreement, Cornor Tech grants the Licensee a non-exclusive, non-transferable, perpetual license to use the deliverables for the purposes specified in the project agreement.\n\nThis license permits the Licensee to:\n\n— Use the deliverables for their intended business purpose\n— Modify or adapt deliverables for internal use\n— Deploy software and digital products on their own platforms\n\nThis license does not permit the Licensee to sublicense, resell, or redistribute the deliverables to third parties without prior written consent from Cornor Tech.`,
    },
    {
        id: '04',
        title: 'Ownership & Intellectual Property',
        content: `Until full payment is received, all deliverables remain the exclusive intellectual property of Cornor Tech. Upon full payment, ownership of the final deliverables transfers to the Licensee as specified in the project agreement.\n\nCornor Tech retains ownership of:\n\n— Internal tools, frameworks, and methodologies used to create deliverables\n— Proprietary code libraries and design systems developed by Cornor Tech\n— Any work not explicitly transferred in the project agreement\n— All rights to work produced during unpaid or partially paid engagements\n\nCornor Tech reserves the right to showcase completed work in our portfolio, case studies, and marketing materials unless a confidentiality agreement is in place.`,
    },
    {
        id: '05',
        title: 'Third-Party Components',
        content: `Deliverables may incorporate third-party components such as open-source libraries, stock photography, fonts, icons, or plugins. These components are subject to their own respective licenses.\n\nCornor Tech will disclose any significant third-party components used in your project. The Licensee is responsible for:\n\n— Complying with the terms of all third-party licenses\n— Obtaining any required paid licenses for commercial use of third-party assets\n— Reviewing and accepting the terms of open-source licenses (e.g., MIT, GPL, Apache)\n\nCornor Tech is not liable for licensing violations arising from the Licensee's improper use of third-party components.`,
    },
    {
        id: '06',
        title: 'Restrictions',
        content: `The Licensee agrees NOT to:\n\n— Resell, sublicense, or redistribute deliverables as standalone products without written consent\n— Remove or alter any copyright, trademark, or proprietary notices from deliverables\n— Use deliverables in a manner that violates applicable laws or regulations\n— Reverse engineer proprietary tools or frameworks developed by Cornor Tech\n— Use deliverables to create competing products or services intended to directly compete with Cornor Tech\n— Transfer the license to a third party without prior written approval from Cornor Tech\n\nViolation of these restrictions may result in immediate termination of this license and legal action.`,
    },
    {
        id: '07',
        title: 'Source Code & Design Files',
        content: `Transfer of source code and raw design files (e.g., Figma files, PSD files, or repository access) is subject to explicit agreement in the project proposal. Unless otherwise stated:\n\n— Compiled or exported versions of deliverables are included by default\n— Source code transfer requires a specific clause in the project agreement\n— Design source files may be provided at an additional cost\n\nWhere source code is transferred, the Licensee receives ownership of that specific codebase but not of Cornor Tech's underlying proprietary frameworks or libraries used in its creation.`,
    },
    {
        id: '08',
        title: 'Warranties & Disclaimers',
        content: `Cornor Tech warrants that:\n\n— Deliverables will be original works created by Cornor Tech or its team\n— To the best of our knowledge, deliverables will not infringe third-party intellectual property rights\n— Any known third-party components will be disclosed to the Licensee\n\nCornor Tech does not warrant that:\n\n— Deliverables will be error-free or operate without interruption\n— Deliverables will meet all regulatory or compliance requirements specific to the Licensee's industry\n— Third-party services or components integrated into deliverables will remain available\n\nThe Licensee is responsible for ensuring deliverables meet their specific legal and regulatory requirements.`,
    },
    {
        id: '09',
        title: 'Indemnification',
        content: `The Licensee agrees to indemnify, defend, and hold harmless Cornor Tech and its directors, employees, and contractors from any claims, damages, losses, or expenses (including legal fees) arising from:\n\n— The Licensee's use of deliverables in violation of this Agreement\n— The Licensee's infringement of third-party intellectual property rights\n— The Licensee's failure to comply with applicable laws and regulations\n— Any modifications made to deliverables by the Licensee that result in harm to third parties`,
    },
    {
        id: '10',
        title: 'Termination',
        content: `This license remains in effect until terminated. Cornor Tech may terminate this Agreement immediately and without notice if the Licensee:\n\n— Breaches any provision of this Agreement\n— Fails to make required payments\n— Uses deliverables for unlawful purposes\n— Becomes insolvent or files for bankruptcy\n\nUpon termination, the Licensee must immediately cease all use of the licensed deliverables and destroy any copies in their possession. Termination does not entitle the Licensee to a refund of amounts already paid.`,
    },
    {
        id: '11',
        title: 'Limitation of Liability',
        content: `To the maximum extent permitted by law, Cornor Tech shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from the use or inability to use the licensed deliverables. Our total liability under this Agreement shall not exceed the total fees paid by the Licensee for the specific deliverables in question.\n\nSome jurisdictions do not allow the exclusion of certain warranties or limitations of liability, so some of the above limitations may not apply to you.`,
    },
    {
        id: '12',
        title: 'Governing Law',
        content: `This License Agreement is governed by and construed in accordance with the laws of Nepal. Any disputes arising from or relating to this Agreement shall be subject to the exclusive jurisdiction of the courts of Butwal, Lumbini Province, Nepal. Both parties agree to attempt to resolve disputes through good-faith negotiation before pursuing formal legal proceedings.`,
    },
    {
        id: '13',
        title: 'Amendments',
        content: `Cornor Tech reserves the right to amend this License Agreement at any time. Updated versions will be posted on our website with a revised effective date. For existing project engagements, the version of this Agreement in effect at the time of the project agreement shall govern unless both parties agree in writing to apply updated terms.`,
    },
    {
        id: '14',
        title: 'Contact Us',
        content: `If you have any questions, concerns, or requests regarding this License Agreement, please contact us at:\n\nCornor Tech Pvt. Ltd.\nTilottama, Butwal, Lumbini Province, Nepal\nEmail: info@cornortech.com\nPhone: +977 9828750115`,
    },
];

export default function LicenseAgreementPage() {
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
                        License
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
                                License Agreement
                            </span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight mb-6">
                            License
                            <br />
                            <span
                                className="text-transparent bg-clip-text"
                                style={{ backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #818cf8 60%, #a855f7 100%)' }}
                            >
                                Agreement
                            </span>
                        </h1>

                        <p className="text-white/70 text-base max-w-xl leading-relaxed">
                            This agreement defines how deliverables, software, and intellectual
                            property created by Cornor Tech may be used by clients and licensees.
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
                                            
                                            <a    key={s.id}
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
                                            { title: 'Cookies Policy',       href: '/legal/cookies-policy' },
                                            { title: 'Creator Terms',        href: '/legal/creator-terms' },
                                            { title: 'Community Guidelines', href: '/legal/community-guidelines' },
                                        ].map((link) => (
                                            
                                              <a  key={link.title}
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
