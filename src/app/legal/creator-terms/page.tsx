import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
    title: 'Creator Terms | Cornor Tech Pvt. Ltd.',
    description: 'Creator Terms for Cornor Tech Pvt. Ltd. — Terms and conditions for content creators, freelancers, and partners working with Cornor Tech.',
};

const sections = [
    {
        id: '01',
        title: 'Introduction',
        content: `These Creator Terms ("Agreement") govern the relationship between Cornor Tech Pvt. Ltd. ("Cornor Tech", "we", "us", or "our") and individuals or entities ("Creators") who contribute content, services, or creative work to Cornor Tech or through our platforms. By registering as a creator, submitting content, or entering into a creative engagement with Cornor Tech, you agree to be bound by these terms.`,
    },
    {
        id: '02',
        title: 'Who Is a Creator',
        content: `For the purposes of this Agreement, a Creator is any individual or entity who:\n\n— Contributes written content, articles, or blog posts to Cornor Tech platforms\n— Produces video, audio, or multimedia content for Cornor Tech\n— Designs graphics, illustrations, or visual assets for Cornor Tech\n— Develops software, code, or technical content in collaboration with Cornor Tech\n— Participates in Cornor Tech's affiliate, ambassador, or referral programs\n— Provides freelance or contract creative services to Cornor Tech\n\nCreators may be individuals, agencies, or businesses operating under a formal agreement with Cornor Tech.`,
    },
    {
        id: '03',
        title: 'Creator Registration & Eligibility',
        content: `To become a Creator with Cornor Tech, you must:\n\n— Be at least 18 years of age or have verifiable parental or guardian consent\n— Provide accurate and complete information during registration or onboarding\n— Have the legal right to enter into this Agreement in your jurisdiction\n— Not be under any existing contractual obligation that prevents you from creating content for Cornor Tech\n— Agree to all applicable terms, policies, and guidelines set by Cornor Tech\n\nCornor Tech reserves the right to accept or reject Creator applications at our sole discretion without providing reasons.`,
    },
    {
        id: '04',
        title: 'Content Standards & Guidelines',
        content: `All content submitted by Creators must meet the following standards:\n\nQuality: Content must be original, well-researched, professionally written or produced, and free from grammatical or factual errors.\n\nOriginality: Content must not be plagiarized, AI-generated without disclosure, or copied from third-party sources without proper attribution and permission.\n\nAccuracy: Factual claims must be accurate and verifiable. Creators are responsible for fact-checking their submissions.\n\nAppropriateness: Content must not contain hate speech, explicit material, discriminatory language, misinformation, or content that violates applicable laws.\n\nBrand Alignment: Content must align with Cornor Tech's brand values, tone, and messaging guidelines provided during onboarding.\n\nCornor Tech reserves the right to reject, edit, or remove content that does not meet these standards.`,
    },
    {
        id: '05',
        title: 'Intellectual Property & Ownership',
        content: `Work for Hire: Unless otherwise agreed in writing, all content created by Creators specifically for Cornor Tech is considered "work for hire." Upon delivery and acceptance, full ownership of such content transfers to Cornor Tech.\n\nPre-Existing IP: Creators retain ownership of any intellectual property created prior to this Agreement. If pre-existing IP is incorporated into deliverables, the Creator grants Cornor Tech a perpetual, royalty-free, worldwide license to use that IP.\n\nPortfolio Rights: Creators may include work produced for Cornor Tech in their personal portfolio unless a confidentiality agreement is in place.\n\nMoral Rights: To the extent permitted by applicable law, Creators waive any moral rights in content delivered to Cornor Tech under this Agreement.`,
    },
    {
        id: '06',
        title: 'Compensation & Payment',
        content: `Compensation for Creator work will be outlined in individual project agreements, briefs, or contracts. General payment terms are as follows:\n\n— Payment amounts, schedules, and methods will be specified per engagement\n— Cornor Tech will process payments within the timeline agreed upon in the project brief\n— Creators are responsible for their own taxes, including income tax and any applicable VAT or GST\n— Cornor Tech will not withhold taxes on behalf of Creators unless required by Nepali law\n— Payment disputes must be raised in writing within 14 days of receiving a payment or payment notice\n\nCornor Tech reserves the right to withhold payment for content that does not meet agreed standards or is delivered outside agreed timelines.`,
    },
    {
        id: '07',
        title: 'Revisions & Feedback',
        content: `Cornor Tech may request revisions to submitted content to ensure it meets our quality and brand standards. The following revision policy applies:\n\n— Up to two rounds of revisions are included in standard engagements unless otherwise specified\n— Creators must respond to revision requests within the timeline specified in the project brief\n— Revisions that fall outside the original agreed scope may result in additional compensation\n— Persistent failure to meet revision requests may result in termination of the engagement\n\nCreators are encouraged to seek clarification on briefs before beginning work to minimize the need for extensive revisions.`,
    },
    {
        id: '08',
        title: 'Confidentiality',
        content: `Creators may be exposed to confidential information about Cornor Tech, our clients, projects, business strategies, and technologies. Creators agree to:\n\n— Keep all confidential information strictly private and not disclose it to third parties\n— Use confidential information only for the purposes of fulfilling their obligations under this Agreement\n— Not use confidential information for personal gain or to benefit competitors\n— Return or destroy confidential materials upon request or at the end of the engagement\n\nThis confidentiality obligation survives the termination of this Agreement and remains in effect for a period of three years thereafter.`,
    },
    {
        id: '09',
        title: 'Representations & Warranties',
        content: `By entering into this Agreement, each Creator represents and warrants that:\n\n— You have the full legal right and authority to enter into this Agreement\n— All content you submit is original and does not infringe any third-party intellectual property rights\n— Your content does not contain any defamatory, fraudulent, or unlawful material\n— You have obtained all necessary permissions for any third-party content included in your work\n— Your participation as a Creator does not violate any existing agreements or obligations\n— All information provided to Cornor Tech is accurate and up to date`,
    },
    {
        id: '10',
        title: 'Prohibited Activities',
        content: `Creators must not engage in the following activities:\n\n— Submitting plagiarized, copied, or improperly attributed content\n— Misrepresenting credentials, experience, or qualifications\n— Engaging in any fraudulent activity related to their work with Cornor Tech\n— Using Cornor Tech's name, brand, or logo without prior written approval\n— Making public statements about Cornor Tech without authorization\n— Soliciting Cornor Tech's clients directly for independent business\n— Sharing, leaking, or selling confidential Cornor Tech information\n— Creating content that could damage Cornor Tech's reputation or brand\n\nViolation of these prohibitions may result in immediate termination and potential legal action.`,
    },
    {
        id: '11',
        title: 'Relationship Between Parties',
        content: `Creators are independent contractors and not employees, agents, partners, or joint venturers of Cornor Tech. Nothing in this Agreement creates an employment relationship. As an independent contractor, you are:\n\n— Responsible for your own equipment, tools, and working environment\n— Free to work with other clients unless a specific exclusivity clause is agreed upon\n— Responsible for your own insurance, benefits, and professional development\n— Not entitled to employee benefits, including health insurance, paid leave, or retirement plans\n\nCornor Tech does not have the right to control the manner or means by which Creators complete their work, only the final output.`,
    },
    {
        id: '12',
        title: 'Termination',
        content: `Either party may terminate this Agreement at any time with written notice. Upon termination:\n\n— Cornor Tech will pay for all completed and accepted work delivered prior to termination\n— Creators must immediately cease representing themselves as affiliated with Cornor Tech\n— All confidential information must be returned or destroyed\n— Any unpublished content submitted before termination becomes the property of Cornor Tech if payment has been made\n\nCornor Tech may terminate this Agreement immediately and without notice if a Creator breaches any material provision of these terms, engages in fraudulent activity, or causes reputational harm to Cornor Tech.`,
    },
    {
        id: '13',
        title: 'Limitation of Liability',
        content: `To the maximum extent permitted by applicable law, Cornor Tech shall not be liable to Creators for any indirect, incidental, special, consequential, or punitive damages arising from this Agreement or the Creator relationship. Cornor Tech's total liability shall not exceed the total compensation paid to the Creator in the three months preceding the claim.\n\nCreators assume full responsibility for the accuracy, legality, and appropriateness of the content they submit.`,
    },
    {
        id: '14',
        title: 'Governing Law',
        content: `These Creator Terms are governed by and construed in accordance with the laws of Nepal. Any disputes arising from or relating to this Agreement shall be subject to the exclusive jurisdiction of the courts of Butwal, Lumbini Province, Nepal. Both parties agree to attempt good-faith negotiation before pursuing formal legal proceedings.`,
    },
    {
        id: '15',
        title: 'Changes to These Terms',
        content: `Cornor Tech reserves the right to update or modify these Creator Terms at any time. Updated terms will be posted on our website with a revised effective date. Continued participation as a Creator after changes are posted constitutes acceptance of the revised terms. We encourage Creators to review these terms periodically to stay informed of any updates.`,
    },
    {
        id: '16',
        title: 'Contact Us',
        content: `If you have any questions, concerns, or requests regarding these Creator Terms, please contact us at:\n\nCornor Tech Pvt. Ltd.\nTilottama, Butwal, Lumbini Province, Nepal\nEmail: info@cornortech.com\nPhone: +977 9828750115`,
    },
];

export default function CreatorTermsPage() {
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
                        Creator
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
                                Creator Terms
                            </span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight mb-6">
                            Creator
                            <br />
                            <span
                                className="text-transparent bg-clip-text"
                                style={{ backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #818cf8 60%, #a855f7 100%)' }}
                            >
                                Terms
                            </span>
                        </h1>

                        <p className="text-white/70 text-base max-w-xl leading-relaxed">
                            These terms govern the relationship between Cornor Tech and content
                            creators, freelancers, and partners who contribute creative work to our platform.
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
                                    <a
                                        href="mailto:info@cornortech.com"
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
                                            { title: 'Privacy Policy', href: '/legal/privacy-policy' },
                                            { title: 'Cookies Policy', href: '/legal/cookies-policy' },
                                            { title: 'License Agreement', href: '/legal/license-agreement' },
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

                    </div>
                </div >
                {/* ===== End Main Section ===== */}

            </main >

            <Footer />
        </>
    );
}
