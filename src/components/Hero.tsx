/* eslint-disable react-hooks/refs */
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroProps } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';


// ====== Hero Section ======

// ===== Floating particle (decorative, aria-hidden) =====
const Particle = ({ x, y, delay }: { x: number; y: number; delay: number }) => (
  <motion.div
    className="absolute w-1 h-1 rounded-full bg-purple-400/40 pointer-events-none"
    style={{ left: `${x}%`, top: `${y}%` }}
    animate={{ y: [0, -18, 0], opacity: [0.3, 0.7, 0.3] }}
    transition={{ duration: 4 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
    aria-hidden="true"
  />
);
// ===== End Floating particle (decorative, aria-hidden) =====


// ===== Typed text hook =====
const useTypedText = (phrases: string[], speed = 80) => {
  const [displayed, setDisplayed] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[phraseIdx];
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setDisplayed(current.slice(0, charIdx + 1));
          if (charIdx + 1 === current.length) {
            setTimeout(() => setDeleting(true), 1600);
          } else {
            setCharIdx((c) => c + 1);
          }
        } else {
          setDisplayed(current.slice(0, charIdx - 1));
          if (charIdx - 1 === 0) {
            setDeleting(false);
            setPhraseIdx((i) => (i + 1) % phrases.length);
            setCharIdx(0);
          } else {
            setCharIdx((c) => c - 1);
          }
        }
      },
      deleting ? speed / 2 : speed
    );
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, phraseIdx, phrases, speed]);

  return displayed;
};
// ===== End Typed text hook =====


// ===== Component =====
const Hero = ({ bannerVisible }: HeroProps) => {
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: noise layer drifts slightly on scroll 
  const { scrollY } = useScroll();
  const noiseY = useTransform(scrollY, [0, 600], [0, 40]);

  // Typewriter: cycles through all 9 service titles 
  const typedText = useTypedText([
    'Web Development',
    'Digital Marketing',
    'Graphic Design',
    'Mobile App Development',
    'UI/UX Design',
    'Cloud Solutions',
    'E-commerce Solutions',
    'Branding & Strategy',
    'Content Creation',
  ]);

  // Particle positions (stable across renders) 
  const particles = useRef(
    Array.from({ length: 18 }, (_, i) => ({
      x: (i * 37 + 11) % 100,
      y: (i * 53 + 7) % 100,
      delay: (i * 0.3) % 3,
    }))
  ).current;

  // Service tags 
  const serviceTags = [
    'Web Development', 'Digital Marketing', 'Graphic Design',
    'Mobile App Dev', 'UI/UX Design', 'Cloud Solutions',
    'E-commerce', 'Branding & Strategy', 'Content Creation',
    'Web Development', 'Digital Marketing', 'Graphic Design',
    'Mobile App Dev', 'UI/UX Design', 'Cloud Solutions',
    'E-commerce', 'Branding & Strategy', 'Content Creation',
  ];


  //  ===== Render =====
  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`relative ${bannerVisible ? 'pt-16 lg:pt-32' : 'pt-16 lg:pt-28'
        } w-full min-h-screen bg-linear-to-b from-[#1e003a] via-[#2d0a52] to-[#3b1266] overflow-hidden flex flex-col font-sans`}
    >

      {/* ===== Background Layer ===== */}
      <>
      <motion.div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          y: noiseY,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div
        className="absolute -top-32 -left-32 w-125 h-125 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 70%)' }}
        aria-hidden="true"
      />

      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}
      </>
      {/* ===== End Background Layer ===== */}



      {/* ===== Main Bento Grid ===== */}
      <div className="flex-1 container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 pb-8 relative z-10">


        {/* ==== Giant Stacked Headline ==== */}
        <div className="lg:col-span-12 flex flex-row items-center lg:items-end justify-between relative gap-2 lg:gap-0">

          {/* === Left: headline block === */}
          <div className="flex flex-col w-fit">

            {/* Line 1: "Cornor" */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-[7.5vw] lg:text-[8vw] leading-[0.9] font-bold tracking-tighter text-white uppercase"
            >
              Cornor
            </motion.h1>

            {/* Line 2: badge + "Tech Pvt. Ltd" */}
            <div className="flex items-center gap-3 lg:-mt-4 flex-nowrap">

              {/* Pulsing code badge — desktop only */}
              <div
                className="hidden lg:flex w-32 h-16 bg-[#a855f7] rounded-full items-center justify-center animate-pulse shrink-0"
                aria-hidden="true"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32" height="32" viewBox="0 0 24 24"
                  fill="none" stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="m18 16 4-4-4-4" />
                  <path d="m6 8-4 4 4 4" />
                  <path d="m14.5 4-5 16" />
                </svg>
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-[7.5vw] lg:text-[8vw] leading-[0.9] font-bold tracking-tighter text-white/90 uppercase whitespace-nowrap"
              >
                Tech{' '}
                <span className="text-[#a855f7]">Pvt. Ltd</span>
              </motion.h1>
            </div>

          </div>
          {/* === End left headline block === */}


          {/* === Right decorative accent column === */}
          {/*  pill, scroll, dots scale down */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-col items-end gap-2 lg:gap-4 pb-2 shrink-0"
          >

            {/* Slogan pill */}
            <div className="flex items-center gap-1.5 lg:gap-2 bg-white/8 backdrop-blur-sm border border-purple-400/25 rounded-full px-2.5 py-1.5 lg:px-5 lg:py-2.5">
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="shrink-0">
                <path d="M5 0L10 5L5 10L0 5Z" fill="#a855f7" />
              </svg>
              <span className="text-white/80 text-[8px] lg:text-sm font-medium tracking-wide italic whitespace-nowrap">
                Where tech meets solution!
              </span>
              <svg width="8" height="8" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="shrink-0">
                <path d="M5 0L10 5L5 10L0 5Z" fill="#a3e635" />
              </svg>
            </div>
            {/* End Slogan pill */}


            {/* Vertical scrolling service keywords
                Mobile:  w-20 h-16  (80px wide, 64px tall)
                Desktop: w-52 h-24  (208px wide, 96px tall) — unchanged */}
            <div className="relative h-16 lg:h-24 overflow-hidden w-20 lg:w-52" aria-hidden="true">
              <motion.div
                animate={{ y: ['0%', '-50%'] }}
                transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                className="flex flex-col items-end gap-2 lg:gap-2.5"
              >
                {serviceTags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[7px] lg:text-[10px] font-mono tracking-widest uppercase text-purple-300/50"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>
              <div className="absolute inset-x-0 top-0 h-4 lg:h-6 bg-linear-to-b from-[#1e003a] to-transparent pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-4 lg:h-6 bg-linear-to-t from-[#2d0a52] to-transparent pointer-events-none" />
            </div>

            {/* Dot-grid motif
                Mobile:  w-14 h-8   (56×32px)
                Desktop: w-28 h-16  (112×64px) — unchanged */}
            <div
              className="w-14 h-8 lg:w-28 lg:h-16 opacity-20"
              style={{
                backgroundImage: 'radial-gradient(circle, #a855f7 1px, transparent 1px)',
                backgroundSize: '12px 12px',
              }}
              aria-hidden="true"
            />

          </motion.div>
          {/* === End right decorative accent column === */}

        </div>
        {/* === End Giant Stacked Headline === */}


        {/* ===== Logo / Mascot Card ===== */}
        {/*  Mobile: constrain max height so the full-width
                    aspect-square logo doesn't eat the whole screen */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="lg:col-span-3 bg-purple-500/30 backdrop-blur-sm border border-purple-400/30 rounded-3xl p-5 lg:p-6 flex flex-col justify-between hover:bg-purple-500/50 transition-all duration-300 group"
        >
          <div className="flex justify-between items-start">
            <span className="w-2 h-2 bg-[#a3e635] rounded-full" />
            <span className="text-purple-200 text-xs uppercase tracking-widest">Est. 2023</span>
          </div>

          {/* Logo — grayscale only on desktop (hover reveals color); always full color on mobile */}
          <div className="relative w-full max-h-52 lg:max-h-none aspect-square my-3 lg:my-4 rounded-2xl overflow-hidden lg:grayscale group-hover:grayscale-0 transition-all duration-500 bg-purple-900/40 flex items-center justify-center">
            <Image
              src="/cornortech_logo.png"
              alt="Cornor Tech Pvt. Ltd Logo"
              fill
              className="object-contain p-6 lg:p-8"
              sizes="(max-width: 1024px) 100vw, 25vw"
            />
          </div>

          <p className="text-white text-sm font-medium leading-tight">
            Not freelancers. Not outsourcing. PM-led teams that work like your own.
          </p>
        </motion.div>
        {/* === End Logo / Mascot Card === */}


        {/* ===== Workspace Image Card ===== */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="lg:col-span-6 relative h-56 lg:h-auto rounded-3xl overflow-hidden bg-purple-800 border border-purple-500/30 group"
        >
          <Image
            src="/hero_workspace.png"
            alt="Cornor Tech Pvt. Ltd workspace — engineers collaborating"
            fill
            className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />

          <div className="absolute inset-0 bg-linear-to-t from-[#1e003a] via-transparent to-transparent opacity-70" />

          {/* Availability badge */}
          <div className="absolute top-4 left-4 lg:top-5 lg:left-5 flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1.5">
            <span className="w-2 h-2 bg-[#a3e635] rounded-full animate-pulse" aria-hidden="true" />
            <span className="text-white text-xs font-medium">Available for new projects</span>
          </div>

          {/* Bottom caption */}
          <div className="absolute bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-6">
            <div className="flex items-end justify-between gap-3 lg:gap-4">
              <h2 className="text-lg lg:text-3xl font-bold text-white max-w-lg leading-tight">
                We help businesses scale delivery with accountable, structured tech teams.
              </h2>
              <Link
                href="#contact"
                aria-label="Start a project with Cornor Tech"
                className="w-10 h-10 lg:w-12 lg:h-12 bg-[#a855f7] rounded-full flex items-center justify-center hover:scale-110 hover:bg-[#9333ea] transition-all duration-200 text-white shrink-0 focus-visible:ring-2 focus-visible:ring-[#a3e635] outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20" height="20" viewBox="0 0 24 24"
                  fill="none" stroke="white" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                  className="-rotate-45"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
        {/* === End Workspace Image Card === */}


        {/* ===== Right Column — Two Stacked Action Cards ===== */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="lg:col-span-3 grid grid-cols-2 lg:grid-cols-1 lg:flex lg:flex-col gap-4"
        >

          {/* Brand highlight card: Fully Managed Porject */}
          <div className="bg-[#9333EA] rounded-3xl p-4 lg:p-6 flex flex-col justify-end text-white relative overflow-hidden group min-h-36 lg:min-h-0 lg:flex-1">
            <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none" />
            <span
              className="absolute top-2 right-3 lg:top-3 lg:right-4 text-[52px] lg:text-[72px] font-black leading-none text-white/10 select-none pointer-events-none"
              aria-hidden="true"
            >
              01
            </span>
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] lg:text-[10px] font-mono uppercase tracking-[0.18em] text-white/50">
                Service model
              </span>
              <span className="text-2xl lg:text-4xl font-black tracking-tighter leading-none">Fully</span>
              <span className="text-2xl lg:text-4xl font-black tracking-tighter leading-none text-white/80">Managed</span>
              <span className="text-[9px] lg:text-[11px] font-semibold uppercase tracking-widest text-white/50 mt-1">
                Projects
              </span>
            </div>
            <div
              className="absolute -bottom-6 -right-6 w-20 h-20 lg:w-24 lg:h-24 rounded-full border border-white/20 pointer-events-none"
              aria-hidden="true"
            />
          </div>
          {/* End Brand highlight card: Fully Managed Porject */}


          {/* CTA card */}
          <Link
            href="#contact"
            className="focus-visible:ring-2 focus-visible:ring-[#9333EA] outline-none rounded-3xl lg:flex-1"
          >
            <div className="h-full bg-white rounded-3xl p-4 lg:p-6 flex flex-col justify-between hover:scale-[1.02] active:scale-[0.99] transition-transform duration-300 cursor-pointer min-h-36 lg:min-h-40 group">
              <div className="flex justify-between items-center">
                <span className="text-[#9333EA] font-bold uppercase text-xs lg:text-sm tracking-wide">
                  Start a Project
                </span>
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  aria-hidden="true"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="#9333EA" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                  >
                    <path d="M18 8L22 12L18 16" />
                    <path d="M2 12H22" />
                  </svg>
                </motion.div>
              </div>
              <span className="text-xl lg:text-2xl font-bold text-[#1e003a] leading-none mt-3 lg:mt-4">
                Digitalize<br />Your Business
              </span>
            </div>
          </Link>
          {/* End CTA card */}


        </motion.div>
        {/* === End Right Column === */}


      </div>
      {/* === Main Bento Grid === */}


      {/* ===== Bottom Ambient Glow Blob ===== */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 h-75 bg-purple-600/20 blur-[100px] pointer-events-none rounded-full"
        aria-hidden="true"
      />
      {/* ===== End Bottom Ambient Glow Blob ===== */}


    </section>
  );
};

export default Hero;