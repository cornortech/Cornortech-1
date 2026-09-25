import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
    title: 'Community Guidelines | Cornor Tech Pvt. Ltd.',
    description: 'Community Guidelines for Cornor Tech Pvt. Ltd. — Standards and expectations for engaging with our community, platforms, and team.',
};

const sections = [
    {
        id: '01',
        title: 'Introduction',
        content: `These Community Guidelines ("Guidelines") outline the standards of conduct expected from everyone who interacts with Cornor Tech Pvt. Ltd. ("Cornor Tech", "we", "us", or "our") — including clients, creators, partners, followers, and visitors across our website, social media platforms, events, and any other community spaces we operate.\n\nOur goal is to foster a respectful, inclusive, and productive environment where ideas can be shared openly and professionally. By engaging with any Cornor Tech platform or community space, you agree to follow these guidelines.`,
    },
    {
        id: '02',
        title: 'Our Core Values',
        content: `Everything we do at Cornor Tech is guided by the following core values:\n\nRespect: We treat every person with dignity regardless of their background, experience level, or perspective.\n\nInclusion: We welcome and celebrate diversity in all forms — nationality, gender, religion, age, and more.\n\nIntegrity: We communicate honestly and transparently, and we expect the same from our community.\n\nCollaboration: We believe the best outcomes come from working together and supporting one another.\n\nInnovation: We encourage curiosity, creativity, and constructive challenge of ideas.\n\nThese values are not just aspirational — they are the standard by which all community interactions are measured.`,
    },
    {
        id: '03',
        title: 'Respectful Communication',
        content: `All community members are expected to communicate respectfully and professionally at all times. This means:\n\n— Using polite, constructive language in all interactions\n— Disagreeing with ideas rather than attacking individuals\n— Listening actively and considering different perspectives\n— Avoiding sarcasm, condescension, or dismissive language\n— Providing feedback in a way that is helpful, not harmful\n— Acknowledging and appreciating the contributions of others\n\nDifferences of opinion are natural and welcome. How those differences are expressed is what matters. Debate and discussion should always be conducted with mutual respect.`,
    },
    {
        id: '04',
        title: 'Prohibited Behavior',
        content: `The following behaviors are strictly prohibited across all Cornor Tech community spaces:\n\nHarassment & Bullying: Any form of harassment, intimidation, threatening language, or bullying directed at any individual or group.\n\nHate Speech: Content that promotes discrimination, hostility, or violence based on race, ethnicity, nationality, religion, gender, sexual orientation, disability, or any other protected characteristic.\n\nSpam & Self-Promotion: Unsolicited promotional content, repetitive messaging, or irrelevant links posted for personal gain.\n\nMisinformation: Deliberately sharing false, misleading, or unverified information.\n\nPrivacy Violations: Sharing personal information about others without their consent, including phone numbers, addresses, or private messages.\n\nImpersonation: Pretending to be another person, brand, or Cornor Tech team member.\n\nViolation of any of the above may result in immediate removal from the community and, where applicable, legal action.`,
    },
    {
        id: '05',
        title: 'Content Standards',
        content: `Any content shared within Cornor Tech community spaces — including comments, posts, messages, portfolio submissions, or forum contributions — must meet the following standards:\n\n— Content must be relevant to the context in which it is shared\n— Content must not infringe copyright, trademarks, or other intellectual property rights\n— Content must not contain explicit, graphic, or adult material\n— Content must not promote illegal activities or products\n— Content must not contain malicious links, malware, or phishing attempts\n— Content must accurately represent its author and source\n\nCornor Tech reserves the right to remove any content that violates these standards without prior notice.`,
    },
    {
        id: '06',
        title: 'Social Media Conduct',
        content: `When engaging with Cornor Tech on social media platforms (Instagram, LinkedIn, Facebook, Twitter/X, TikTok, YouTube, or others), community members are expected to:\n\n— Follow the platform's own terms of service in addition to these guidelines\n— Refrain from tagging Cornor Tech in unrelated or negative content\n— Not use Cornor Tech's social media channels to air personal grievances publicly\n— Direct legitimate complaints or concerns to info@cornortech.com rather than public posts\n— Respect the purpose of each platform and post accordingly\n\nComments or posts that violate these guidelines may be hidden, deleted, or reported to the respective platform.`,
    },
    {
        id: '07',
        title: 'Client & Partner Interactions',
        content: `We hold our client and partner relationships to the highest standard of professionalism. All clients and partners engaging with Cornor Tech are expected to:\n\n— Communicate project requirements clearly and in good faith\n— Provide timely feedback and approvals within agreed timeframes\n— Treat Cornor Tech team members with respect in all interactions\n— Not make unreasonable demands outside the agreed project scope\n— Raise concerns through appropriate channels rather than publicly\n— Honor contractual commitments including payment terms\n\nCornor Tech similarly commits to treating all clients and partners with professionalism, transparency, and respect throughout every engagement.`,
    },
    {
        id: '08',
        title: 'Diversity & Inclusion',
        content: `Cornor Tech is committed to building and maintaining an inclusive community that welcomes people from all walks of life. We actively work to ensure that:\n\n— All community members feel safe, valued, and heard\n— No individual or group is marginalized or excluded\n— Diverse perspectives are actively sought and respected\n— Opportunities to contribute are accessible to all\n\nDiscrimination of any kind — whether based on gender, age, ethnicity, religion, disability, sexual orientation, or socioeconomic background — will not be tolerated in any Cornor Tech community space.\n\nIf you witness or experience discrimination within our community, please report it immediately to info@cornortech.com.`,
    },
    {
        id: '09',
        title: 'Intellectual Property in the Community',
        content: `When sharing content in Cornor Tech community spaces, please respect intellectual property rights:\n\n— Only share content you own or have explicit permission to share\n— Properly credit original creators when sharing their work\n— Do not reproduce copyrighted material without authorization\n— Do not share confidential or proprietary information belonging to others\n— Tag or mention sources when referencing external ideas or research\n\nCornor Tech respects intellectual property rights and expects the same from all community members. Reports of IP violations will be taken seriously and addressed promptly.`,
    },
    {
        id: '10',
        title: 'Reporting Violations',
        content: `If you witness or experience a violation of these Community Guidelines, we encourage you to report it. You can:\n\n— Email us at info@cornortech.com with details of the incident\n— Use the reporting tools available on the relevant social media platform\n— Contact us directly at +977 9828750115 for urgent matters\n\nAll reports will be handled with discretion and confidentiality. We take every report seriously and will investigate promptly. Retaliation against anyone who reports a violation in good faith is strictly prohibited and will itself be treated as a violation of these guidelines.`,
    },
    {
        id: '11',
        title: 'Enforcement & Consequences',
        content: `Cornor Tech reserves the right to enforce these guidelines at our sole discretion. Depending on the severity and frequency of a violation, consequences may include:\n\n— A formal warning issued via email or direct message\n— Removal or hiding of offending content\n— Temporary suspension from community spaces\n— Permanent ban from all Cornor Tech community platforms\n— Termination of any active business engagement or contract\n— Reporting to relevant authorities where illegal activity is involved\n\nWe aim to apply consequences proportionately and fairly. First-time minor violations may result in a warning, while severe or repeated violations may result in immediate and permanent removal.`,
    },
    {
        id: '12',
        title: 'Children & Minors',
        content: `Cornor Tech's community spaces and services are intended for individuals aged 18 and above. We do not knowingly allow minors to participate in our community platforms or engage with our services without verifiable parental or guardian consent.\n\nIf you become aware of a minor participating in our community spaces without consent, please notify us immediately at info@cornortech.com. We will take prompt action to address the situation in accordance with applicable child protection laws.`,
    },
    {
        id: '13',
        title: 'Updates to These Guidelines',
        content: `Cornor Tech may update these Community Guidelines from time to time to reflect changes in our community, platforms, or applicable laws. Updated guidelines will be posted on this page with a revised effective date.\n\nWe encourage all community members to review these guidelines periodically. Continued participation in any Cornor Tech community space after changes are posted constitutes your acceptance of the revised guidelines.`,
    },
    {
        id: '14',
        title: 'Governing Law',
        content: `These Community Guidelines are governed by and construed in accordance with the laws of Nepal. Any disputes arising from or relating to these guidelines or their enforcement shall be subject to the exclusive jurisdiction of the courts of Butwal, Lumbini Province, Nepal.`,
    },
    {
        id: '15',
        title: 'Contact Us',
        content: `If you have any questions, concerns, or feedback regarding these Community Guidelines, or if you wish to report a violation, please contact us at:\n\nCornor Tech Pvt. Ltd.\nTilottama, Butwal, Lumbini Province, Nepal\nEmail: info@cornortech.com\nPhone: +977 9828750115`,
    },
];

export default function CommunityGuidelinesPage() {
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
                        Community
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
                                Community Guidelines
                            </span>
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-black text-white leading-[0.95] tracking-tight mb-6">
                            Community
                            <br />
                            <span
                                className="text-transparent bg-clip-text"
                                style={{ backgroundImage: 'linear-gradient(135deg, #a855f7 0%, #818cf8 60%, #a855f7 100%)' }}
                            >
                                Guidelines
                            </span>
                        </h1>

                        <p className="text-white/70 text-base max-w-xl leading-relaxed">
                            Our community thrives on respect, inclusion, and collaboration.
                            These guidelines define the standards we hold for everyone who engages with Cornor Tech.
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
                                    
                                      <a  href="mailto:info@cornortech.com"
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
                                            { title: 'Terms of Service',  href: '/legal/terms-of-service' },
                                            { title: 'Privacy Policy',    href: '/legal/privacy-policy' },
                                            { title: 'Cookies Policy',    href: '/legal/cookies-policy' },
                                            { title: 'License Agreement', href: '/legal/license-agreement' },
                                            { title: 'Creator Terms',     href: '/legal/creator-terms' },
                                        ].map((link) => (
                                            
                                            <a    key={link.title}
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