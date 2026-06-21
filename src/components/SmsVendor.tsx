'use client';
import { useState, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';

const features = [
  {
    icon: '📨',
    title: 'Bulk SMS',
    desc: 'Send high-volume messages to large audiences with fast delivery and real-time reports.',
  },
  {
    icon: '🔐',
    title: 'Transactional SMS / OTP',
    desc: 'Automated OTPs, alerts, and notifications with guaranteed delivery and low latency.',
  },
  {
    icon: '🔗',
    title: 'SMS API Integration',
    desc: 'RESTful APIs for developers to integrate SMS seamlessly into apps and platforms.',
  },
  {
    icon: '📢',
    title: 'Promotional Campaigns',
    desc: 'Targeted promotional SMS campaigns with personalized messaging and analytics.',
  },
  {
    icon: '💬',
    title: 'Two-Way SMS',
    desc: 'Engage customers with two-way conversations, replies, and interactive messaging.',
  },
  {
    icon: '⏰',
    title: 'SMS Scheduling',
    desc: 'Schedule messages for future delivery — perfect for reminders, updates, and alerts.',
  },
];

const messages = [
  { side: 'in', text: 'Hi! Welcome to Cornor SMS', time: '9:41' },
  { side: 'out', text: 'I need bulk SMS service', time: '9:42' },
  { side: 'in', text: 'Sure! We offer bulk SMS at Rs 0.25/msg', time: '9:43' },
  { side: 'out', text: 'Great, let\'s start 🚀', time: '9:44' },
];

const PhoneMockup = () => (
  <div className="relative w-55 h-110 sm:w-60 sm:h-120 shrink-0">
    <div className="relative w-full h-full bg-[#0f0f1a] rounded-4xl sm:rounded-[36px] border-[2.5px] border-[#2a2a40] shadow-2xl overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 w-22.5 sm:w-25 h-6.5 sm:h-7 bg-[#0f0f1a] rounded-b-[14px] sm:rounded-b-2xl" />
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 z-20 w-2 h-2 rounded-full bg-[#1a1a2e] border border-[#333]" />

      <div className="relative z-10 flex justify-between items-center px-5 sm:px-6 pt-3 pb-1 text-[9px] sm:text-[10px] text-white/50 font-medium">
        <span>9:41</span>
        <div className="flex items-center gap-1.5">
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2">
            <path d="M1 10.5V12a2 2 0 002 2h10a2 2 0 002-2v-1.5" />
            <path d="M8 2v7M5.5 6.5L8 9l2.5-2.5" />
          </svg>
          <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 16 16" fill="currentColor" opacity="0.6">
            <rect x="1" y="4" width="3" height="9" rx="0.8" />
            <rect x="5" y="2" width="3" height="11" rx="0.8" />
            <rect x="9" y="1" width="3" height="12" rx="0.8" />
          </svg>
        </div>
      </div>

      <div className="relative z-10 flex items-center gap-2 px-4 sm:px-5 py-1.5 border-b border-white/5">
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#9333EA] flex items-center justify-center text-[8px] sm:text-[9px] text-white font-bold">
          CS
        </div>
        <div>
          <p className="text-[10px] sm:text-[11px] text-white font-semibold">Cornor SMS</p>
          <p className="text-[7px] sm:text-[8px] text-emerald-400 font-medium">Online</p>
        </div>
      </div>

      <div className="relative z-10 px-3 sm:px-3.5 pt-2 pb-1 h-[calc(100%-90px)] flex flex-col gap-1.5 justify-end">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.side === 'out' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`relative text-[10px] sm:text-[11px] leading-[1.4] px-2.5 sm:px-3 py-1.5 sm:py-2 max-w-[85%] ${
                msg.side === 'out'
                  ? 'bg-[#9333EA] text-white rounded-[14px] rounded-br-sm'
                  : 'bg-[#1e1e32] text-white/80 rounded-[14px] rounded-bl-sm'
              }`}
            >
              {msg.text}
              <span className={`block text-[7px] sm:text-[8px] mt-0.5 ${msg.side === 'out' ? 'text-white/40' : 'text-white/30'}`}>
                {msg.time}
              </span>
            </div>
          </div>
        ))}

        <div className="flex justify-start">
          <div className="bg-[#1e1e32] rounded-[14px] rounded-bl-sm px-3 py-2 flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-white/30 animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>

        <div className="flex items-center gap-1.5 mt-1">
          <div className="flex-1 h-7 sm:h-8 bg-[#1a1a2e] rounded-full border border-white/5 px-3 flex items-center">
            <span className="text-[9px] sm:text-[10px] text-white/20">Type a message...</span>
          </div>
          <div className="w-7 h-7 sm:w-8 sm:h-8 bg-[#9333EA] rounded-full flex items-center justify-center shrink-0">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M22 2L11 13" /><path d="M22 2L15 22l-4-9-9-4z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="group relative bg-white rounded-2xl p-5
                   border border-[#9333EA]/10 hover:border-[#9333EA]/25
                   shadow-sm hover:shadow-[0_8px_24px_rgba(147,51,234,.12)]
                   transition-all duration-300 hover:-translate-y-1"
      >
        <div className="text-[28px] mb-3 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
          {feature.icon}
        </div>
        <h3 className="text-[15px] font-bold text-[#1e003a] mb-1.5">{feature.title}</h3>
        <p className="text-[12.5px] text-foreground-secondary leading-[1.6]">{feature.desc}</p>
      </div>
    </motion.div>
  );
};

const SmsVendor = () => {
  const [carouselIdx, setCarouselIdx] = useState(0);
  const touchStartX = useRef(0);

  const goTo = useCallback((idx: number) => {
    setCarouselIdx(Math.max(0, Math.min(idx, features.length - 1)));
  }, []);

  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: true, margin: '-60px' });

  return (
    <section className="relative py-20 lg:py-32 bg-[#faf8ff] overflow-hidden font-sans">
      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: 'radial-gradient(circle, #c084fc 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />

      {/* Ambient blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-40 -left-40 w-150 h-150 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)' }}
        />
        <div
          className="absolute -bottom-40 -right-20 w-125 h-125 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.08) 0%, transparent 70%)' }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-100 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(147,51,234,0.06) 0%, transparent 70%)' }}
        />
      </div>

      {/* Ghost watermark */}
      <p
        className="absolute top-6 lg:top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[18vw] font-black uppercase tracking-tighter text-[#9333EA]/5 select-none pointer-events-none leading-none"
        aria-hidden="true"
      >
        Cornor SMS
      </p>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* ── Top: section header (full width) ── */}
        <motion.div
          ref={contentRef}
          initial={{ opacity: 0, y: 30 }}
          animate={contentInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-14 lg:mb-24 space-y-7"
        >
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px w-8 bg-[#9333EA] rounded-full" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#9333EA]">
              SMS Services
            </span>
          </div>

          <h2 className="text-4xl lg:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight">
            Cornor<br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #9333EA 0%, #6366f1 60%, #a855f7 100%)',
              }}
            >
              SMS
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={contentInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="mt-6 text-lg text-foreground-secondary max-w-2xl leading-relaxed"
          >
            Reliable, scalable SMS solutions for your business — from bulk promotions to
            transactional OTPs and powerful API integrations.
          </motion.p>
        </motion.div>

        {/* ── Bottom: phone mockup + features ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Phone mockup */}
          <div className="flex justify-start">
            <PhoneMockup />
          </div>

          {/* Features */}
          <div className="md:col-span-2">
            {/* Desktop grid (md+) */}
            <div className="hidden md:grid md:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <FeatureCard key={f.title} feature={f} index={i} />
              ))}
            </div>

            {/* Mobile carousel (< md) */}
            <div className="md:hidden w-full">
              <div
                className="overflow-hidden"
                onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
                onTouchEnd={(e) => {
                  const dx = e.changedTouches[0].clientX - touchStartX.current;
                  if (Math.abs(dx) > 40) goTo(dx < 0 ? carouselIdx + 1 : carouselIdx - 1);
                }}
              >
                <div
                  className="flex transition-transform duration-400"
                  style={{ transform: `translateX(-${carouselIdx * 100}%)` }}
                >
                  {features.map((f, i) => (
                    <div key={f.title} className="w-full shrink-0 px-1">
                      <FeatureCard feature={f} index={i} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Dots */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {features.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === carouselIdx
                        ? 'w-6 bg-[#9333EA]'
                        : 'w-2 bg-[#9333EA]/20 hover:bg-[#9333EA]/40'
                    }`}
                    aria-label={`Go to feature ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="flex justify-center mt-12">
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full
                       bg-[#9333EA] text-white text-[13px] font-bold
                       hover:bg-[#7e22ce] transition-colors duration-200
                       shadow-lg hover:shadow-[0_8px_24px_rgba(147,51,234,.3)]"
          >
            Get Started
            <svg
              className="w-4 h-4"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default SmsVendor;
