// app/careers/page.tsx

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Link from 'next/link';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton'
import CTA from '@/components/ui/CTA'
import { OPENINGS } from '@/data/openings';

const PERKS = [
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, label: 'Competitive Salary', desc: 'Market-rate pay reviewed annually' },
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"/></svg>, label: 'Remote Friendly', desc: 'Work from anywhere, anytime' },
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>, label: 'Learning Budget', desc: 'NPR 30k/yr for courses & books' },
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>, label: 'Health Insurance', desc: 'Full medical coverage for you' },
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>, label: 'Fast Career Growth', desc: 'Clear paths, real promotions' },
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, label: 'Great Culture', desc: 'Inclusive, async-first team' },
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>, label: 'Flexible Time Off', desc: 'Take the time you need' },
    { icon: <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>, label: 'Cutting-edge Stack', desc: 'Latest tools, no legacy mess' },
];

const PROCESS = [
    { step: '01', title: 'Apply Online',        desc: 'Submit your CV and a short note on why you want to join Cornor Tech. No cover letter needed.' },
    { step: '02', title: 'Intro Call',           desc: '30-min video call with our team. We talk about your experience, what you are looking for, and answer your questions.' },
    { step: '03', title: 'Technical Round',      desc: 'A practical take-home task or live session relevant to the role. We keep it focused and respectful of your time.' },
    { step: '04', title: 'Final Interview',      desc: 'Meet the leadership team. We discuss culture fit, growth, and make sure this is the right move for both sides.' },
    { step: '05', title: 'Offer & Onboarding',  desc: 'We move fast. Offer within 48 hours of the final round. Full onboarding support from day one.' },
];

export default function CareersPage() {
    const openRoles = OPENINGS.filter(j => j.status === 'Open');
    const closedRoles = OPENINGS.filter(j => j.status === 'Closed');

    return (
        <main className="min-h-screen bg-white" id='career'>

            <Header/>

            {/* ==== Hero ==== */}
            <section className="relative bg-linear-to-br from-[#1e003a] via-[#2d0a52] to-[#3b1266] pt-24 pb-20 px-4 overflow-hidden">

            {/* Decorative rings */}
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-purple-500/20 pointer-events-none" />
                <div className="absolute top-10 right-10 w-48 h-48 rounded-full border border-purple-400/10 pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-purple-500/15 pointer-events-none" />

                <div className="max-w-4xl mx-auto text-center relative z-10">

                    <span className="inline-block px-4 py-1.5 bg-[#a3e635]/20 text-[#a3e635] rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-[#a3e635]/30">
                        We&apos;re Hiring — {openRoles.length} open roles
                    </span>

                    <h1 className="text-4xl lg:text-6xl font-black text-white leading-[1.05] mb-6">
                        Start your journey<br />
                        <span className="text-[#a855f7]">with Cornor Tech</span>
                    </h1>

                    <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                        Join our internship program to gain hands-on experience with real-world projects. Work alongside experts to build the software of tomorrow.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <a
                            href="#openings"
                            className="flex items-center gap-2 px-6 py-3 bg-[#9333EA] text-white rounded-xl font-semibold hover:bg-[#7c3aed] transition-colors shadow-lg shadow-[#9333EA]/30"
                        >
                            View Open Roles
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                        </a>
                        <a
                            href="mailto:info@cornortech.com"
                            className="flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/20 rounded-xl font-semibold hover:bg-white/20 transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            General Application
                        </a>
                    </div>

                </div>
            </section>
            {/* ==== End Hero ==== */}

            <ScrollToTopButton/>
            <CTA/>

            {/* ==== Perks section ==== */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#9333EA]/60 mb-3">Why Cornor Tech</p>
                        <h2 className="text-2xl lg:text-3xl font-black text-gray-900">What we offer</h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {PERKS.map((perk, i) => (
                            <div key={i} className="flex flex-col gap-3 p-5 bg-[#9333EA]/4 rounded-2xl border border-[#9333EA]/10 hover:border-[#9333EA]/25 transition-all duration-200">
                                <div className="w-11 h-11 bg-[#9333EA]/10 rounded-xl flex items-center justify-center text-[#9333EA]">
                                    {perk.icon}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-900 text-sm">{perk.label}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{perk.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* ==== End Perks section ==== */}

            {/* ==== Open Positions ==== */}
            <section id="openings" className="py-24 px-4 bg-[#faf9ff]">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-16">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#9333EA]/60 mb-3">Join our team</p>
                        <h2 className="text-2xl lg:text-4xl font-black text-gray-900 leading-tight">Current Openings</h2>
                        <p className="text-gray-500 text-sm mt-3">{openRoles.length} positions available right now</p>
                    </div>

                    {/* Open Positions */}
                    <div className="space-y-8 mb-24">
                        {openRoles.map((job, i) => (
                            <div
                                key={i}
                                className="group bg-white rounded-3xl border border-purple-100/50
                                           hover:border-[#9333EA]/25 hover:shadow-[0_20px_50px_rgba(147,51,234,0.08)]
                                           transition-all duration-500 p-6 lg:p-8"
                            >
                                <div className="flex flex-col gap-8">
                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <h3 className="font-black text-gray-900 text-xl group-hover:text-[#9333EA] transition-colors leading-none">
                                                    {job.role}
                                                </h3>
                                                <span className="px-2.5 py-1 bg-[#a3e635]/15 text-[#65a30d] rounded-full text-[10px] font-black uppercase tracking-wider">
                                                    Open
                                                </span>
                                            </div>
                                            <p className="text-[15px] text-gray-600 leading-relaxed mb-6 font-medium">{job.desc}</p>
                                            
                                            <div className="grid sm:grid-cols-2 gap-8 py-6 border-y border-gray-100 my-6">
                                                <div>
                                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#9333EA]" />
                                                        Key Skills
                                                    </h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {job.skills?.map((skill, s) => (
                                                            <span key={s} className="px-3 py-1 bg-[#9333EA]/5 text-[#9333EA] text-xs font-bold rounded-lg border border-[#9333EA]/10">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-[#9333EA]" />
                                                        Responsibilities
                                                    </h4>
                                                    <ul className="space-y-2">
                                                        {job.responsibilities?.map((res, r) => (
                                                            <li key={r} className="text-xs text-gray-500 flex items-start gap-2">
                                                                <svg className="w-3.5 h-3.5 text-[#a3e635] shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                                                {res}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap items-center gap-4">
                                                <span className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                                    <svg className="w-4 h-4 text-[#9333EA]/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                                    {job.location}
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-gray-200" />
                                                <span className="flex items-center gap-2 text-xs font-bold text-gray-400">
                                                    <svg className="w-4 h-4 text-[#9333EA]/40" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                                    {job.type}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="shrink-0">
                                            <a
                                                href={`mailto:info@cornortech.com?subject=Application — ${job.role}`}
                                                className="flex items-center justify-center gap-2 px-8 py-4
                                                           bg-[#9333EA] text-white rounded-2xl text-sm font-black
                                                           hover:bg-[#7c3aed] hover:shadow-xl hover:shadow-purple-500/20 
                                                           active:scale-95 transition-all w-full lg:w-auto"
                                            >
                                                Apply Now
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Closed Positions */}
                    <div className="pt-12 border-t border-gray-200">
                        <div className="mb-8">
                            <h3 className="text-xl font-black text-gray-900 leading-none">Other Positions (Applied / Not Open)</h3>
                            <p className="text-sm text-gray-400 mt-2 font-medium">These roles are currently filled or receiving applications</p>
                        </div>
                        
                        <div className="grid gap-6">
                            {closedRoles.map((job, i) => (
                                <div key={i} className="bg-gray-50/80 rounded-3xl border border-gray-200 p-6 lg:p-8 opacity-80 hover:opacity-100 transition-all">
                                    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-3">
                                                <h4 className="font-black text-gray-700 text-lg leading-none">{job.role}</h4>
                                                <span className="px-2.5 py-1 bg-gray-200 text-gray-500 rounded-full text-[10px] font-black uppercase tracking-wider">
                                                    Filled
                                                </span>
                                            </div>
                                            <p className="text-sm text-gray-500 leading-relaxed mb-6 font-medium">{job.desc}</p>
                                            
                                            <div className="grid sm:grid-cols-2 gap-8 py-6 border-y border-gray-200/60 my-6">
                                                <div>
                                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                                        Experience Highlights
                                                    </h5>
                                                    <div className="flex flex-wrap gap-1.5">
                                                        {job.skills?.map((skill, s) => (
                                                            <span key={s} className="px-2.5 py-0.5 bg-gray-100 text-gray-500 text-[10px] font-bold rounded-md border border-gray-200">
                                                                {skill}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div>
                                                    <h5 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-3 flex items-center gap-2">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                                                        Core Focus
                                                    </h5>
                                                    <ul className="space-y-1.5">
                                                        {job.responsibilities?.map((res, r) => (
                                                            <li key={r} className="text-[11px] text-gray-400 flex items-start gap-2">
                                                                <svg className="w-3 h-3 text-gray-300 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                                                {res}
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                                                    {job.location}
                                                </span>
                                                <span className="w-1 h-1 rounded-full bg-gray-200" />
                                                <span className="flex items-center gap-2 text-[10px] font-bold text-gray-400">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                                    {job.type}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="shrink-0">
                                            <div className="px-6 py-3 bg-gray-100 text-gray-400 rounded-xl text-xs font-black border border-gray-200 cursor-not-allowed">
                                                Position Filled
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            {/* ==== End Open Positions ==== */}


            {/* ==== Hiring Process ==== */}
            <section className="py-20 px-4 bg-white">
                <div className="max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-xs font-bold uppercase tracking-widest text-[#9333EA]/60 mb-3">Simple & transparent</p>
                        <h2 className="text-2xl lg:text-3xl font-black text-gray-900">Our Hiring Process</h2>
                        <p className="text-gray-500 text-sm mt-2">From application to offer — usually under 2 weeks</p>
                    </div>

                    <div className="space-y-4">
                        {PROCESS.map((step, i) => (
                            <div key={i} className="flex items-start gap-5 p-5 bg-[#faf9ff] rounded-2xl border border-[#9333EA]/8">
                                <div className="w-12 h-12 bg-linear-to-br from-[#9333EA] to-[#7c3aed] rounded-xl flex items-center justify-center shrink-0 shadow-md shadow-[#9333EA]/25">
                                    <span className="text-white font-black text-sm">{step.step}</span>
                                </div>
                                <div>
                                    <h3 className="font-black text-gray-900 text-base mb-1">{step.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* ==== End Hiring Process ==== */}


            {/* ==== General Application CTA ==== */}
            <section className="py-20 px-4 bg-linear-to-br from-[#1e003a] via-[#2d0a52] to-[#3b1266]">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl lg:text-4xl font-black text-white mb-4">
                        Don&apos;t see your role?
                    </h2>
                    <p className="text-white/60 mb-8 leading-relaxed">
                        We are always on the lookout for exceptional talent. Send us your CV with a short note about what you do and what kind of role you are looking for. We will keep it on file and reach out when the right position opens.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href={`mailto:info@cornortech.com`}
                            className="flex items-center justify-center gap-2 px-8 py-4 bg-[#9333EA] text-white rounded-xl font-bold hover:bg-[#7c3aed] transition-colors shadow-lg shadow-[#9333EA]/30"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                            </svg>
                            Send Your CV
                        </a>
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-colors"
                        >
                            Back to Home
                        </Link>
                    </div>
                    <p className="text-white/30 text-xs mt-8">info@cornortech.com · We reply within 24 hours</p>
                </div>
            </section>
            {/* ==== End General Application CTA ==== */}

            <Footer/>

        </main>
    );
}