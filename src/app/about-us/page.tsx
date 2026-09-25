'use client';
import { useState } from 'react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
// import ScrollToTopButton from '@/components/ui/ScrollToTopButton'
import CTA from '@/components/ui/CTA'

interface TeamMember {
    id: string;
    name: string;
    role: string;
    bio: string;
    image: string;
    gradient: string;
    skills: string[];
    social: {
        linkedin?: string;
        twitter?: string;
        github?: string;
    };
}

// ===== Team Card =====
const TeamCard = ({ member, index }: { member: TeamMember; index: number }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [imageError, setImageError] = useState(false);

    return (
        <div
            id="about-us"
            className="group relative overflow-hidden rounded-2xl shadow-soft hover:shadow-large transition-all duration-300 hover-lift cursor-pointer animate-slide-up bg-white border border-[#9333EA]/15"
            style={{ animationDelay: `${index * 0.1}s` }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Team Member Image */}
            <div className={`aspect-square ${member.gradient} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center p-2">
                    <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <div className="text-center space-y-4">
                            <div className="w-56 h-56 mx-auto bg-white/90 rounded-full flex items-center justify-center shadow-medium transform group-hover:scale-110 transition-all duration-300 overflow-hidden">

                                {/* Conditional render of team image */}
                                {!imageError ? (
                                    <div className="w-56 h-56 mx-auto bg-white/90 rounded-full flex items-center justify-center shadow-medium transform group-hover:scale-110 transition-all duration-300 overflow-hidden relative">
                                        <Image
                                            src={member.image}
                                            alt={member.name}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, 300px"
                                            priority={index < 2}
                                            onError={() => setImageError(true)}
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-full bg-linear-to-br from-[#9333EA] to-[#7c3aed] flex items-center justify-center text-white font-bold text-4xl">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                )}

                            </div>
                        </div>
                    </div>
                </div>

                {/* Hover Overlay */}
                <div className={`absolute inset-0 bg-white/95 backdrop-blur-sm transition-opacity duration-300 flex items-center justify-center p-6 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                    <div className="w-full space-y-3">
                        <p className="text-foreground-secondary text-sm leading-relaxed font-medium">
                            {member.bio}
                        </p>
                        {/* Social Links */}
                        <div className="flex items-center space-x-3">
                            {member.social.linkedin && (
                                <a href={member.social.linkedin} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200" aria-label="LinkedIn">
                                    <svg className="w-5 h-5 text-[#9333EA]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                </a>
                            )}
                            {member.social.twitter && (
                                <a href={member.social.twitter} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200" aria-label="Twitter">
                                    <svg className="w-5 h-5 text-[#9333EA]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                </a>
                            )}
                            {member.social.github && (
                                <a href={member.social.github} className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-all duration-200" aria-label="GitHub">
                                    <svg className="w-5 h-5 text-[#9333EA]" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-6 left-6 w-12 h-12 bg-white/10 rounded-lg transform -rotate-12 group-hover:rotate-12 transition-transform duration-300" />
                <div className="absolute bottom-6 right-6 w-16 h-16 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-300" />
            </div>
            {/* Enc Team Member Image */}


            {/* Team Member Content */}
            <div className="p-4 space-y-2">
                <div className="space-y-1">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-[#9333EA] transition-colors">
                        {member.name}
                    </h3>
                    <p className="text-sm text-[#9333EA] font-semibold">
                        {member.role}
                    </p>
                </div>
                {/* Skills */}
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#9333EA]/10">
                    {member.skills.slice(0, 3).map((skill, idx) => (
                        <span key={idx} className="px-3 py-1 bg-[#9333EA]/10 text-[#9333EA] rounded-full text-xs font-medium">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
            {/* End Team Member Content */}

        </div>
    );
};
// ===== End Team Card =====


// ===== About Us Section =====
const AboutUsPage = () => {


    const teamMembers: TeamMember[] = [
        {
            id: '1',
            name: 'Ramit Neupane',
            role: 'Founder & CEO',
            bio: 'Visionary leader passionate about driving innovation and building impactful digital solutions. Focused on guiding the company’s strategy, growth, and long-term vision.',
            image: '/teams/founder.jpeg',
            gradient: 'bg-gradient-to-br from-[#9333EA]/20 to-[#7c3aed]/20',
            skills: ['Leadership', 'Business Strategy', 'Innovation'],
            social: { linkedin: '#', twitter: '#' }
        },
        {
            id: '2',
            name: 'Santosh Kunwar',
            role: 'Chief Operational Officer',
            bio: 'Tech enthusiast leading our engineering team. Expert in full-stack development, AI/ML, and cloud architecture with a proven track record.',
            image: '/teams/coo.jpeg',
            gradient: 'bg-gradient-to-br from-[#7c3aed]/20 to-[#9333EA]/20',
            skills: ['Full-Stack', 'AI/ML', 'Cloud'],
            social: { linkedin: '#', github: '#' }
        },
        {
            id: '3',
            name: 'Laxman Neupane',
            role: 'Chief Financial Officer',
            bio: 'Financial strategist responsible for managing company finances, budgeting, and investment planning. Focused on maintaining financial stability and supporting sustainable business growth.',
            image: '/teams/cfo.jpeg',
            gradient: 'bg-gradient-to-br from-[#a855f7]/20 to-[#9333EA]/20',
            skills: ['Financial Planning', 'Budget Management', 'Risk Analysis'],
            social: { linkedin: '#', twitter: '#' }
        },
        {
            id: '4',
            name: 'Aman Pokhrel',
            role: 'Organizational Manager',
            bio: 'Experienced organizational manager responsible for coordinating team operations and ensuring smooth workflow across departments. Focused on efficient planning, communication, and team collaboration.',
            image: '/teams/om.jpeg',
            gradient: 'bg-gradient-to-br from-[#7e22ce]/20 to-[#9333EA]/20',
            skills: ['Team Management', 'Operations', 'Coordination'],
            social: { linkedin: '#', twitter: '#' }
        },
        {
            id: '5',
            name: 'Rubi Ale',
            role: 'Marketing Head',
            bio: 'Creative marketing leader focused on building brand presence and driving growth. Skilled in digital marketing, campaign strategy, market research, and audience engagement.',
            image: '/teams/mh.jpg',
            gradient: 'bg-gradient-to-br from-[#7e22ce]/20 to-[#9333EA]/20',
            skills: ['Digital Marketing', 'Brand Strategy', 'Market Research'],
            social: { linkedin: '#', twitter: '#' }
        }

    ];

    return (
        <main className="min-h-screen">

            <Header/>

            {/* ── Dark top band so header nav items are visible ── */}
            <div className="relative bg-linear-to-br from-[#1e003a] via-[#2d0a52] to-[#3b1266] pt-24 pb-16 px-4 overflow-hidden">

                {/* Decorative rings */}
                <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-purple-500/20 pointer-events-none" />
                <div className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full border border-purple-500/15 pointer-events-none" />

                <div className="container-custom relative z-10 text-center space-y-4">
                    <span className="px-4 py-2 bg-[#9333EA]/30 text-purple-200 rounded-full text-sm font-semibold">
                        About Us
                    </span>
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white">
                        <span className="text-[#a855f7]">Meet the Team</span>
                        <br />
                        Behind Cornor Tech
                    </h2>
                    <p className="text-lg text-white/60 max-w-3xl mx-auto">
                        We&apos;re a passionate team of innovators, designers, and developers dedicated to transforming businesses through technology.
                    </p>
                </div>
            </div>
            {/* ── End dark top band ── */}

            <section className="py-20 lg:py-32 bg-linear-to-br from-white via-[#9333EA]/5 to-white relative overflow-hidden">

                {/* Background decorative elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-20 right-20 w-96 h-96 bg-[#9333EA]/10 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-20 left-20 w-72 h-72 bg-[#9333EA]/15 rounded-full blur-3xl" style={{ animationDelay: '1s' }} />
                </div>
                {/* End Background decorative elements */}

                {/* <ScrollToTopButton /> */}
                <CTA />

                <div className="container-custom relative z-10 space-y-16">

                    {/* ── Company Story ── */}
                    <div className="max-w-4xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
                        <div className="bg-linear-to-br from-[#1e003a] via-[#2d0a52] to-[#3b1266] rounded-3xl p-8 lg:p-12 shadow-large border border-purple-500/30">
                            <div className="space-y-6">
                                <h3 className="text-2xl lg:text-3xl font-bold text-white">Our Story</h3>
                                <div className="space-y-4 text-white/80 leading-relaxed">
                                    <p>
                                        Founded in 2023, <span className="font-semibold text-purple-300">Cornor Tech</span> started with a simple mission: to bridge the gap between innovative ideas and technological implementation. What began as a small team of passionate developers has grown into a full-service digital agency serving clients worldwide.
                                    </p>
                                    <p>
                                        Today, we&apos;re proud to be a trusted partner for businesses ranging from startups to enterprises. Our multidisciplinary team combines expertise in web development, mobile apps, AI/ML, digital marketing, and design to deliver comprehensive solutions that drive growth.
                                    </p>
                                    <p>
                                        With over <span className="font-semibold text-purple-300">50+ successful projects</span> and <span className="font-semibold text-purple-300">90+ satisfied clients</span>, we continue to push the boundaries of what&apos;s possible in the digital world.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* ── End Company Story ── */}


                    {/* ── Team Members ── */}
                    <div className="space-y-8">

                        <div className="text-center animate-fade-in" style={{ animationDelay: '0.4s' }}>
                            <h3 className="text-2xl lg:text-3xl font-bold text-[#9333EA] mb-3">
                                Leadership Team
                            </h3>
                            <p className="text-foreground-secondary max-w-2xl mx-auto">
                                Meet the talented individuals driving innovation at Cornor Tech
                            </p>
                        </div>

                        {/* First Row */}
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamMembers.slice(0, 4).map((member, index) => (
                                <TeamCard key={member.id} member={member} index={index} />
                            ))}
                        </div>

                        {/* Second Row (Centered Card) */}
                        <div className="flex justify-center">
                            <div className="w-full md:w-1/2 lg:w-1/4">
                                <TeamCard member={teamMembers[4]} index={4} />
                            </div>
                        </div>

                    </div>
                    {/* ── End Team Members ── */}

                </div>

            </section>

            <Footer/>

        </main>
    );
};
// ===== End About Us Section =====

export default AboutUsPage;