'use client';
import { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

const GlowCard = ({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${className}`}
    >
      {children}
    </motion.div>
  );
};

const ContactRow = ({
  href,
  icon,
  label,
  value,
  extra,
}: {
  href?: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  extra?: React.ReactNode;
}) => {
  const Tag = href ? 'a' : 'div';
  return (
    <Tag
      {...(href
        ? {
            href,
            target: href.startsWith('http') ? '_blank' : undefined,
            rel: href.startsWith('http') ? 'noopener noreferrer' : undefined,
          }
        : {})}
      className="group flex items-center gap-4 py-4 border-b border-[#9333EA]/10 last:border-0 hover:bg-[#9333EA]/4 -mx-4 px-4 rounded-xl transition-colors duration-200 cursor-pointer"
    >
      <div className="w-10 h-10 rounded-xl bg-[#9333EA]/10 border border-[#9333EA]/20 flex items-center justify-center shrink-0 group-hover:bg-[#9333EA]/20 group-hover:border-[#9333EA]/40 transition-all duration-200">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9333EA]/50 mb-0.5">{label}</p>
        <p className="text-[13.5px] font-semibold text-[#1e003a] group-hover:text-[#9333EA] transition-colors truncate">{value}</p>
      </div>
      {extra}
      {href && (
        <svg
          className="w-3.5 h-3.5 text-[#9333EA]/25 group-hover:text-[#9333EA] group-hover:translate-x-0.5 transition-all duration-200 shrink-0"
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </Tag>
  );
};

const Contact = () => {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const copy = () => {
    navigator.clipboard.writeText('info@cornortech.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-36 bg-[#faf8ff] overflow-hidden font-sans"
    >

      {/* ── Subtle dot grid background ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #c084fc 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* ── Ambient blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 -left-40 w-150 h-150 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 -right-20 w-125 h-125 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
        />
      </div>

      {/* ── Giant ghost text ── */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.15 }}
        className="absolute top-6 lg:top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[18vw] font-black uppercase tracking-tighter text-[#9333EA]/5 select-none pointer-events-none leading-none"
        aria-hidden="true"
      >
        Contact
      </motion.p>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">

        {/* ── Section headline ── */}
        <div className="mb-14 lg:mb-18">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-8 bg-[#9333EA] rounded-full" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#9333EA]">
              Get in touch
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="text-4xl lg:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight"
          >
            <span className="text-[#1e003a]">Let&apos;s Build</span>
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #9333EA 0%, #6366f1 60%, #a855f7 100%)',
              }}
            >
              Something
            </span>
            <br />
            <span className="text-[#1e003a]/25">Extraordinary.</span>
          </motion.h2>
        </div>

        {/* ── Bento grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

          {/* ════ CARD 1 — Contact details (col 1–5) ════ */}
          <GlowCard delay={0.15} className="lg:col-span-5">
            <div className="relative h-full bg-white border border-[#9333EA]/12 rounded-2xl lg:rounded-3xl p-6 lg:p-8 flex flex-col shadow-[0_4px_40px_rgba(147,51,234,0.08)] overflow-hidden">

              {/* Corner purple accent */}
              <div
                className="absolute -top-16 -right-16 w-44 h-44 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.12) 0%, transparent 65%)' }}
                aria-hidden="true"
              />

              {/* Top tag */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9333EA]/50">
                  Contact details
                </p>
                <span className="text-[9px] font-bold uppercase tracking-widest text-[#9333EA] bg-[#9333EA]/8 border border-[#9333EA]/15 px-2.5 py-1 rounded-full">
                  Est. 2023
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <ContactRow
                  href="mailto:info@cornortech.com"
                  label="Email"
                  value="info@cornortech.com"
                  icon={
                    <svg className="w-4 h-4 text-[#9333EA]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  }
                  extra={
                    <button
                      onClick={(e) => { e.preventDefault(); copy(); }}
                      className={`text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border transition-all duration-200 shrink-0 ${
                        copied
                          ? 'border-emerald-400/50 text-emerald-600 bg-emerald-50'
                          : 'border-[#9333EA]/20 text-[#9333EA]/50 hover:border-[#9333EA]/50 hover:text-[#9333EA] hover:bg-[#9333EA]/5'
                      }`}
                    >
                      {copied ? '✓ Copied' : 'Copy'}
                    </button>
                  }
                />
                <ContactRow
                  href="tel:+9779828750115"
                  label="Phone"
                  value="+977 9828750115"
                  icon={
                    <svg className="w-4 h-4 text-[#9333EA]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  }
                />
                <ContactRow
                  label="Response time"
                  value="Within 24 hours"
                  icon={
                    <svg className="w-4 h-4 text-[#9333EA]" fill="none" stroke="currentColor" strokeWidth="1.75" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  }
                />
              </div>

              {/* Availability */}
              <div className="mt-6 pt-5 border-t border-[#9333EA]/10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="relative flex h-2 w-2 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-600">
                    Available for new projects
                  </span>
                </div>
              </div>
            </div>
          </GlowCard>

          {/* ════ RIGHT COLUMN (col 6–12) ════ */}
          <div className="lg:col-span-7 flex flex-col gap-5">

            {/* ── CTA banner — dark, branded ── */}
            <GlowCard delay={0.22} className="group">
              <div
                className="relative rounded-2xl lg:rounded-3xl p-6 lg:p-8 overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5"
                style={{
                  background: 'linear-gradient(135deg, #2d0a52 0%, #1e003a 45%, #3b1266 100%)',
                }}
              >
                {/* Decorative circles */}
                <div className="absolute -bottom-12 -right-12 w-52 h-52 rounded-full pointer-events-none"
                  style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.18) 0%, transparent 65%)' }}
                  aria-hidden="true" />
                <div className="absolute top-4 right-6 text-[80px] font-black text-white/[0.035] leading-none select-none pointer-events-none" aria-hidden="true">
                  ✉
                </div>
                {/* Dot grid */}
                <div
                  className="absolute inset-0 opacity-[0.06] pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #c084fc 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                  aria-hidden="true"
                />

                <div className="relative z-10">
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#c084fc]/60 mb-2">
                    Start a project
                  </p>
                  <h3 className="text-xl lg:text-2xl font-black text-white leading-snug">
                    Have an idea?
                    <br />
                    <span className="text-white/45">Let&apos;s talk about it.</span>
                  </h3>
                </div>

                <div className="relative z-10 flex items-center gap-3 shrink-0">
                  <Link
                    href="#contact"
                    className="group/btn inline-flex items-center gap-2 px-5 py-2.5 bg-[#9333ea] hover:bg-[#7c3aed] text-white text-xs font-bold uppercase tracking-widest rounded-full transition-all duration-200 active:scale-95 shadow-[0_4px_20px_rgba(147,51,234,0.45)]"
                  >
                    Book a Free Call
                    <svg className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </GlowCard>

            {/* ── Map card — fully visible, bright ── */}
            <GlowCard delay={0.32} className="group flex-1">
              <div className="relative h-full min-h-72 bg-white border border-[#9333EA]/12 rounded-2xl lg:rounded-3xl overflow-hidden shadow-[0_4px_40px_rgba(147,51,234,0.08)] flex flex-col">

                {/* Map header */}
                <div className="flex items-center justify-between px-5 py-3.5 bg-white border-b border-[#9333EA]/10 z-10 relative">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#9333EA]/10 border border-[#9333EA]/20 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-[#9333EA]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[12px] font-bold text-[#1e003a] leading-none">Cornor Tech Pvt. Ltd.</p>
                      <p className="text-[10px] text-[#9333EA]/50 mt-0.5 font-semibold uppercase tracking-wider">Tilottama, Butwal, Nepal</p>
                    </div>
                  </div>

                  
                  <a  href="https://share.google/ipeEuiQ4lKklENKRz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/map inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#9333EA] hover:bg-[#7c3aed] transition-all duration-200 shadow-[0_2px_12px_rgba(147,51,234,0.35)]"
                  >
                    <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0zM15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white">
                      Get Directions
                    </span>
                    <svg className="w-2.5 h-2.5 text-white/70 group-hover/map:translate-x-0.5 group-hover/map:-translate-y-0.5 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>

                {/* Map iframe — no grayscale, no dark overlay, fully visible */}
                <div className="flex-1 relative" style={{ minHeight: '240px' }}>
                  <iframe
                    src="https://maps.google.com/maps?q=Cornor+Tech+Pvt+Ltd+Tilottama+Butwal+Nepal&output=embed&z=15"
                    width="100%"
                    height="100%"
                    className="absolute inset-0 w-full h-full"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Cornor Tech Office Location — Tilottama, Butwal, Nepal"
                  />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-5 py-3 bg-[#faf8ff] border-t border-[#9333EA]/10 relative z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#9333EA]" />
                    <p className="text-[10px] font-semibold text-[#1e003a]/40 uppercase tracking-widest">
                      Cornor Tech · Est. 2023
                    </p>
                  </div>
                  
                   <a href="https://share.google/ipeEuiQ4lKklENKRz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-bold text-[#9333EA] hover:text-[#7c3aed] transition-colors uppercase tracking-widest"
                  >
                    Open in Maps ↗
                  </a>
                </div>

              </div>
            </GlowCard>

          </div>
          {/* ════ End RIGHT COLUMN ════ */}

        </div>
        {/* ── End Bento grid ── */}

      </div>
    </section>
  );
};

export default Contact;