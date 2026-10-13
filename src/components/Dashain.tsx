'use client';

import { useCallback, useEffect, useState, type CSSProperties } from 'react';

// =====================================================================
//  DASHAIN FESTIVE KIT — Cornor Tech
//  Turn the whole festive look ON / OFF from one place:
// =====================================================================
export const DASHAIN_MODE = true;

// Festive palette (works on top of the existing purple theme)
const MARIGOLD = '#FF9F1C';
const SAFFRON = '#F97316';
const GOLD = '#FCD34D';
const SINDOOR = '#E11D48';
const JAMARA = '#A3E635';

// ===================== Icons =====================

/** Nepali changa (kite) with tail tassel + string */
export function Kite({
  colors = [SAFFRON, GOLD],
  className = '',
  style,
}: {
  colors?: [string, string];
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg viewBox="0 0 60 120" className={className} style={style} aria-hidden="true">
      <path d="M30 2 L56 34 L30 66 L4 34 Z" fill={colors[0]} />
      <path d="M30 2 L56 34 L30 34 Z" fill={colors[1]} />
      <path d="M30 34 L4 34 L30 66 Z" fill={colors[1]} />
      <path d="M30 2 V66 M4 34 H56" stroke="rgba(30,0,58,.35)" strokeWidth="1.2" />
      <path d="M30 66 L23 78 L37 78 Z" fill={colors[0]} />
      <path d="M30 78 C 20 90, 40 100, 30 118" stroke="rgba(255,255,255,.6)" strokeWidth="1" fill="none" />
    </svg>
  );
}

/** Sayapatri / marigold flower */
export function Marigold({
  size = 22,
  color = MARIGOLD,
  inner = '#FFB547',
  center = '#C2410C',
  className = '',
}: {
  size?: number;
  color?: string;
  inner?: string;
  center?: string;
  className?: string;
}) {
  const angles = Array.from({ length: 12 }, (_, i) => i * 30);
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-hidden="true">
      {angles.map((a) => (
        <ellipse key={a} cx="20" cy="9" rx="5.2" ry="9" fill={color} transform={`rotate(${a} 20 20)`} />
      ))}
      {angles.map((a) => (
        <ellipse key={`i${a}`} cx="20" cy="13" rx="3.6" ry="6" fill={inner} transform={`rotate(${a + 15} 20 20)`} />
      ))}
      <circle cx="20" cy="20" r="4.5" fill={center} />
    </svg>
  );
}

function MangoLeaf({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 44" className={className} aria-hidden="true">
      <path d="M10 0 C 20 12, 18 32, 10 44 C 2 32, 0 12, 10 0 Z" fill="#15803D" />
      <path d="M10 2 V42" stroke="#86EFAC" strokeWidth="0.8" opacity=".7" />
    </svg>
  );
}

function TikaIcon({ className = 'w-9 h-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <ellipse cx="24" cy="24" rx="11" ry="15" fill={SINDOOR} />
      {[[20, 18], [27, 20], [22, 26], [28, 28], [24, 33], [19, 31], [26, 14]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="1.6" ry="2.6" fill="#FFF7ED" transform={`rotate(${i * 40} ${x} ${y})`} />
      ))}
    </svg>
  );
}

function JamaraIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-9 h-9" aria-hidden="true">
      {[-24, -14, -6, 0, 6, 14, 24].map((r, i) => (
        <path
          key={i}
          d="M24 38 C 23 28, 24 16, 24 6"
          stroke={i % 2 ? '#D9F99D' : JAMARA}
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
          transform={`rotate(${r} 24 38)`}
        />
      ))}
      <path d="M14 38 H34 L31 45 H17 Z" fill="#B45309" />
    </svg>
  );
}

function KiteIcon() {
  return <Kite colors={[SAFFRON, GOLD]} className="w-8 h-12" />;
}

function PingIcon() {
  return (
    <svg viewBox="0 0 48 48" className="w-9 h-9" aria-hidden="true">
      <path d="M8 44 L20 4 M40 44 L28 4 M18 6 H30" stroke="#D6A35C" strokeWidth="3" strokeLinecap="round" />
      <g style={{ transformOrigin: '24px 6px', animation: 'dashain-swing 2.6s ease-in-out infinite' }}>
        <path d="M21 6 V32 M27 6 V32" stroke={GOLD} strokeWidth="1.4" />
        <rect x="18" y="31" width="12" height="3.5" rx="1.5" fill={SAFFRON} />
      </g>
    </svg>
  );
}

// ===================== Toran (marigold garland) =====================

export function Toran({ strands = 28, className = '' }: { strands?: number; className?: string }) {
  const lengths = [4, 2, 3, 2, 5, 2, 3, 2];
  return (
    <div className={`pointer-events-none absolute inset-x-0 top-0 z-20 overflow-hidden ${className}`} aria-hidden="true">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-linear-to-r from-[#B45309] via-[#FCD34D] to-[#B45309]" />
      <div className="flex justify-around">
        {Array.from({ length: strands }).map((_, i) => {
          const len = lengths[Math.floor(i / 2) % lengths.length];
          return (
            <div
              key={i}
              className="dashain-strand flex flex-col items-center shrink-0 w-6"
              style={{ animationDelay: `${(i % 7) * 0.35}s` }}
            >
              {i % 2 === 0 ? (
                <MangoLeaf className="w-3 h-7 -mb-1" />
              ) : (
                <>
                  {Array.from({ length: len }).map((__, j) => (
                    <Marigold
                      key={j}
                      size={22}
                      color={j % 2 ? GOLD : MARIGOLD}
                      inner={j % 2 ? '#FDE68A' : '#FFB547'}
                      center={j % 2 ? '#D97706' : '#C2410C'}
                      className="-mt-1.5 first:mt-0 drop-shadow-[0_2px_2px_rgba(0,0,0,0.25)]"
                    />
                  ))}
                  <span className="block w-1.5 h-1.5 rounded-full bg-[#E11D48] -mt-0.5" />
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ===================== Hero Sky (kites + falling petals) =====================

export function DashainSky() {
  if (!DASHAIN_MODE) return null;

  const kites: { left: string; top: string; w: string; colors: [string, string]; delay: string; mobile: boolean }[] = [
    { left: '56%', top: '24%', w: 'w-9 lg:w-16', colors: [SAFFRON, GOLD], delay: '0s', mobile: true },
    { left: '64%', top: '8%', w: 'w-8 lg:w-11', colors: [SINDOOR, GOLD], delay: '1.2s', mobile: false },
    { left: '44%', top: '12%', w: 'w-7 lg:w-9', colors: ['#a855f7', GOLD], delay: '2.1s', mobile: false },
    { left: '2%', top: '62%', w: 'w-8 lg:w-12', colors: [JAMARA, '#FDE68A'], delay: '0.6s', mobile: true },
  ];

  const petals = Array.from({ length: 16 }, (_, i) => ({
    left: (i * 41 + 7) % 100,
    delay: (i * 1.3) % 11,
    duration: 11 + ((i * 7) % 8),
    size: 8 + ((i * 5) % 10),
    flower: i % 4 === 0,
    color: i % 3 === 0 ? GOLD : MARIGOLD,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
      <div
        className="absolute -top-24 right-[-10%] w-[520px] h-[520px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.16) 0%, transparent 65%)' }}
      />
      <div
        className="absolute bottom-[-15%] left-[-10%] w-[460px] h-[460px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(252,211,77,0.10) 0%, transparent 65%)' }}
      />

      {kites.map((k, i) => (
        <div key={i} className={`absolute ${k.mobile ? 'block' : 'hidden lg:block'}`} style={{ left: k.left, top: k.top }}>
          <div className="dashain-kite" style={{ animationDelay: k.delay }}>
            <Kite colors={k.colors} className={`${k.w} h-auto drop-shadow-[0_6px_10px_rgba(0,0,0,0.35)]`} />
          </div>
        </div>
      ))}

      {petals.map((p, i) => (
        <span
          key={i}
          className="dashain-petal absolute -top-8"
          style={{ left: `${p.left}%`, animationDelay: `${p.delay}s`, animationDuration: `${p.duration}s` }}
        >
          {p.flower ? (
            <Marigold size={p.size + 8} />
          ) : (
            <span
              className="block rounded-[60%_40%_60%_40%]"
              style={{ width: p.size * 0.6, height: p.size, background: p.color, opacity: 0.85 }}
            />
          )}
        </span>
      ))}
    </div>
  );
}

// ===================== Hero chip =====================

export function DashainChip() {
  if (!DASHAIN_MODE) return null;
  return (
    <div className="mb-3 lg:mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#FCD34D]/40 bg-linear-to-r from-[#FCD34D]/15 via-[#F97316]/15 to-[#E11D48]/15 px-3 py-1.5 lg:px-4 lg:py-2 backdrop-blur-sm shadow-[0_0_24px_-6px_rgba(252,211,77,0.55)]">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FCD34D] opacity-70" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F97316]" />
      </span>
      <span className="hidden sm:inline text-[10px] lg:text-xs font-semibold uppercase tracking-[0.2em] text-[#FDE68A]">
        Happy Dashain
      </span>
      <span className="hidden sm:inline h-3 w-px bg-white/25" />
      <span className="font-deva whitespace-nowrap text-xs lg:text-sm font-semibold text-white">शुभ विजयादशमी २०८३</span>
    </div>
  );
}

// ===================== Greeting section (below hero) =====================

const rituals = [
  { icon: <TikaIcon />, np: 'टीका', en: 'Tika · Blessings', text: "Elders' blessings and our clients' trust — the foundation of everything we build.", glow: 'rgba(225,29,72,0.35)' },
  { icon: <JamaraIcon />, np: 'जमरा', en: 'Jamara · Growth', text: 'Nine days of patient care. That is exactly how we grow your brand.', glow: 'rgba(163,230,53,0.30)' },
  { icon: <KiteIcon />, np: 'चङ्गा', en: 'Changa · New heights', text: 'Kites in the October sky — your business, flying higher every season.', glow: 'rgba(249,115,22,0.35)' },
  { icon: <PingIcon />, np: 'पिङ', en: 'Ping · Joy', text: 'The thrill of the bamboo swing — delightful digital experiences that feel effortless.', glow: 'rgba(252,211,77,0.30)' },
];

export function DashainGreeting() {
  if (!DASHAIN_MODE) return null;

  const words = ['शुभ विजयादशमी', 'Happy Dashain', 'टीका', 'जमरा', 'चङ्गा', 'पिङ', 'Blessings', 'New Beginnings', 'Family', 'Prosperity'];

  return (
    <section id="dashain" className="relative overflow-hidden bg-linear-to-b from-[#3b1266] via-[#2a0a4f] to-[#1e003a] pt-36 lg:pt-44 pb-0">
      <Toran />

      <div className="pointer-events-none absolute left-1/2 top-24 -translate-x-1/2 w-[700px] h-[340px] rounded-full bg-[#F97316]/15 blur-[110px]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ backgroundImage: 'radial-gradient(circle, #FCD34D 1px, transparent 1px)', backgroundSize: '22px 22px' }}
        aria-hidden="true"
      />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 text-center">
        <p className="inline-flex items-center gap-2 text-[11px] lg:text-xs font-semibold uppercase tracking-[0.3em] text-[#FDE68A]/80">
          <span className="h-px w-8 bg-[#FCD34D]/50" /> Vijaya Dashami 2083 <span className="h-px w-8 bg-[#FCD34D]/50" />
        </p>

        <h2 className="font-deva dashain-gold-text mt-4 text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.35] py-1">
          शुभ विजयादशमी
        </h2>

        <p className="mx-auto mt-3 max-w-2xl text-base lg:text-lg text-purple-100/80 leading-relaxed">
          May Maa Durga&apos;s blessings bring you success, prosperity and fresh beginnings.
          <span className="block mt-1 text-white font-semibold">Happy Dashain from all of us at Cornor Tech. 🙏</span>
        </p>

        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5 text-left">
          {rituals.map((r) => (
            <div
              key={r.np}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.06] p-4 lg:p-6 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-[#FCD34D]/40 hover:bg-white/[0.09]"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: r.glow }}
                aria-hidden="true"
              />
              <div className="relative flex items-center justify-between">
                <div className="flex h-12 w-12 lg:h-14 lg:w-14 items-center justify-center rounded-2xl bg-[#1e003a]/70 ring-1 ring-white/10 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-[-4deg]">
                  {r.icon}
                </div>
                <span className="font-deva text-lg lg:text-2xl font-bold text-white/15 transition-colors duration-500 group-hover:text-[#FCD34D]/40">
                  {r.np}
                </span>
              </div>
              <h3 className="relative mt-4 lg:mt-5 text-sm lg:text-lg font-bold text-white leading-snug">{r.en}</h3>
              <p className="relative mt-1.5 lg:mt-2 text-xs lg:text-sm leading-relaxed text-purple-100/70">{r.text}</p>
            </div>
          ))}
        </div>

        <a
          href="#contact"
          className="dashain-btn mt-10 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold text-[#1e003a] shadow-[0_10px_30px_-8px_rgba(249,115,22,0.7)] transition-transform duration-300 hover:scale-105"
        >
          Start your new beginning this Dashain
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </a>
      </div>

      <div className="relative mt-16 border-y border-[#FCD34D]/20 bg-linear-to-r from-[#7a1f3d] via-[#9333EA] to-[#7a1f3d] py-3 overflow-hidden">
        <div className="dashain-marquee flex w-max gap-8 whitespace-nowrap">
          {[...words, ...words].map((w, i) => (
            <span key={i} className="flex items-center gap-8 text-sm lg:text-base font-semibold text-white">
              <span className={/[\u0900-\u097F]/.test(w) ? 'font-deva text-[#FDE68A]' : 'uppercase tracking-[0.2em]'}>{w}</span>
              <Marigold size={16} />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ===================== Welcome popup (once per visit) =====================

export function DashainWelcome() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!DASHAIN_MODE) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem('ct-dashain-welcome') === '1';
    } catch {}
    if (seen) return;
    const t = setTimeout(() => setOpen(true), 700);
    return () => clearTimeout(t);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem('ct-dashain-welcome', '1');
    } catch {}
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close]);

  if (!DASHAIN_MODE || !open) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-[#12001f]/75 backdrop-blur-md dashain-fade-in"
      onClick={close}
      role="dialog"
      aria-modal="true"
      aria-label="Happy Dashain from Cornor Tech"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="dashain-pop relative w-full max-w-md overflow-hidden rounded-[2rem] border border-[#FCD34D]/30 bg-linear-to-b from-[#3b1266] via-[#2d0a52] to-[#1e003a] px-6 pb-7 pt-28 text-center max-h-[92vh] overflow-y-auto shadow-[0_30px_80px_-20px_rgba(249,115,22,0.45)]"
      >
        <Toran strands={14} />

        <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-60 w-60 rounded-full bg-[#F97316]/25 blur-3xl" aria-hidden="true" />

        <div className="pointer-events-none absolute left-4 top-36 dashain-kite" aria-hidden="true">
          <Kite colors={[SINDOOR, GOLD]} className="w-8" />
        </div>
        <div className="pointer-events-none absolute right-5 top-44 dashain-kite" style={{ animationDelay: '1s' }} aria-hidden="true">
          <Kite colors={['#a855f7', GOLD]} className="w-7" />
        </div>

        <button
          onClick={close}
          className="absolute right-3 top-3 z-30 flex h-9 w-9 ring-1 ring-white/20 items-center justify-center rounded-full bg-black/30 text-white/80 backdrop-blur hover:bg-black/50 hover:text-white transition"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>

        <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#1e003a] ring-2 ring-[#FCD34D]/50 shadow-[0_0_40px_-5px_rgba(252,211,77,0.6)]">
          <TikaIcon className="w-14 h-14" />
        </div>

        <p className="relative mt-5 text-[11px] font-semibold uppercase tracking-[0.3em] text-[#FDE68A]/80">Cornor Tech wishes you</p>
        <h2 className="font-deva dashain-gold-text relative mt-2 text-5xl font-bold leading-[1.35]">शुभ विजयादशमी</h2>
        <p className="relative mt-1 text-xl font-bold text-white">Happy Dashain 2083</p>
        <p className="relative mx-auto mt-3 max-w-xs text-sm leading-relaxed text-purple-100/75">
          May this Dashain fill your home with joy, your work with success and your sky with kites. 🪁
        </p>

        {FESTIVE_OFFER_ACTIVE && (
          <div className="relative mx-auto mt-5 flex max-w-xs items-center gap-3 rounded-2xl border border-[#FCD34D]/30 bg-white/[0.07] px-4 py-3 text-left">
            <span className="text-2xl" aria-hidden="true">🎁</span>
            <p className="text-xs leading-snug text-purple-100/85">
              <span className="block font-black uppercase tracking-wider text-[#FDE68A]">Dashain Offer</span>
              Atithi RMS &amp; Artha POS Premium at <span className="font-bold text-white">NPR 11,111/yr</span>{' '}
              <span className="text-white/50 line-through">NPR 20,000</span>
            </p>
          </div>
        )}

        <div className="relative mt-6 flex flex-col items-center gap-2">
          <a
            href={FESTIVE_OFFER_ACTIVE ? '#dashain-offer' : '#dashain'}
            onClick={close}
            className="dashain-btn inline-flex items-center gap-2 rounded-full px-7 py-3 text-sm font-bold text-[#1e003a] shadow-[0_10px_30px_-8px_rgba(249,115,22,0.7)] transition-transform duration-300 hover:scale-105"
          >
            {FESTIVE_OFFER_ACTIVE ? 'See the Dashain offer' : 'Celebrate with us'}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </a>
          {FESTIVE_OFFER_ACTIVE && (
            <button onClick={close} className="text-xs font-semibold text-white/55 hover:text-white transition-colors">
              Continue to website
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// =====================================================================
//  DASHAIN FESTIVE OFFER — Atithi RMS & Artha POS
//  One switch for the offer everywhere (home + products page):
// =====================================================================
export const FESTIVE_OFFER_ACTIVE = true;

const WHATSAPP_NUMBER = '9779828750115';

export type DashainOffer = {
  id: string;
  name: string;
  audience: string;
  logo: string;
  price: string;
  original: string;
  period: string;
  perks: string[];
};

export const DASHAIN_OFFERS: DashainOffer[] = [
  {
    id: 'atithi-rms',
    name: 'Atithi RMS',
    audience: 'Restaurants, cafés & hotels',
    logo: '/products/athiti.png',
    price: 'NPR 11,111',
    original: 'NPR 20,000',
    period: '/ year',
    perks: ['KOT & kitchen display', 'Table management', 'Unlimited staff'],
  },
  {
    id: 'artha-pos',
    name: 'Artha POS',
    audience: 'Retail, grocery & juice shops',
    logo: '/products/artha pos.png',
    price: 'NPR 11,111',
    original: 'NPR 20,000',
    period: '/ year',
    perks: ['Works offline', 'Barcode billing', 'Customer loyalty'],
  },
];

const nprNum = (s: string) => Number(s.replace(/[^0-9]/g, '')) || 0;
export const offerSave = (o: DashainOffer) => nprNum(o.original) - nprNum(o.price);
export const offerPercent = (o: DashainOffer) => Math.round((offerSave(o) / nprNum(o.original)) * 100);
export const getDashainOffer = (name: string) =>
  FESTIVE_OFFER_ACTIVE ? DASHAIN_OFFERS.find((o) => o.name === name) : undefined;
export const offerWhatsApp = (o: DashainOffer) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Namaste! I want to claim the Dashain Festive Offer for ${o.name} Premium (${o.price} ${o.period}, was ${o.original}). Please help me get started.`
  )}`;

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

/** Small gold pill for product card images */
export function OfferRibbon({ offer }: { offer: DashainOffer }) {
  return (
    <span className="dashain-btn inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#1e003a] shadow-lg shadow-orange-500/40 ring-1 ring-white/40">
      <span aria-hidden="true">🪁</span> Dashain Offer · {offerPercent(offer)}% off
    </span>
  );
}

/** Price row for product card bodies */
export function OfferPriceStrip({ offer }: { offer: DashainOffer }) {
  return (
    <div className="relative mb-5 overflow-hidden rounded-2xl border border-orange-200/70 bg-linear-to-r from-orange-50 via-amber-50 to-rose-50 px-4 py-3">
      <Marigold size={44} className="pointer-events-none absolute -right-3 -top-3 opacity-25" />
      <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-600">Dashain festive price</p>
      <div className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
        <span className="text-xs font-bold text-slate-400 line-through decoration-2">{offer.original}</span>
        <span className="text-xl font-black leading-none text-[#1e003a]">{offer.price}</span>
        <span className="text-xs font-bold text-slate-500">{offer.period}</span>
      </div>
      <p className="mt-1 text-[11px] font-bold text-rose-600">
        You save NPR {offerSave(offer).toLocaleString('en-IN')} · Premium plan, excl. VAT
      </p>
    </div>
  );
}

/** Big festive offer card showing Atithi RMS + Artha POS */
export function DashainOfferSpotlight({
  onSelect,
  className = '',
}: {
  onSelect?: (id: string) => void;
  className?: string;
}) {
  if (!FESTIVE_OFFER_ACTIVE) return null;
  const pct = Math.max(...DASHAIN_OFFERS.map(offerPercent));

  return (
    <div
      id="dashain-offer"
      className={`relative scroll-mt-28 overflow-hidden rounded-[2rem] border border-[#FCD34D]/30 bg-linear-to-br from-[#1e003a] via-[#2d0a52] to-[#4a1460] px-5 pb-6 pt-24 text-left shadow-[0_30px_80px_-30px_rgba(147,51,234,0.55)] lg:px-10 lg:pb-10 lg:pt-28 ${className}`}
    >
      <Toran strands={22} />
      <div className="pointer-events-none absolute -right-24 top-10 h-80 w-80 rounded-full bg-[#F97316]/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#9333EA]/30 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-6 top-24 hidden lg:block dashain-kite" aria-hidden="true">
        <Kite colors={[SAFFRON, GOLD]} className="w-12" />
      </div>

      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_1.35fr] lg:gap-12">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#FCD34D]/40 bg-[#FCD34D]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-[#FDE68A]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FCD34D] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#F97316]" />
            </span>
            Dashain Festive Offer<span className="hidden sm:inline"> · Limited time</span>
          </span>

          <h3 className="mt-5 text-3xl font-black leading-[1.05] tracking-tight text-white lg:text-5xl">
            Save <span className="dashain-gold-text">{pct}%</span> on
            <br />
            Premium software
          </h3>
          <p className="font-deva mt-3 text-lg font-semibold text-[#FDE68A]">दशैंको शुभकामनासहित विशेष छुट</p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-purple-100/75 lg:text-base">
            This Dashain, give your restaurant or shop the upgrade it deserves. Get{' '}
            <span className="font-bold text-white">Atithi RMS</span> or{' '}
            <span className="font-bold text-white">Artha POS</span> Premium for a full year at a festive price.
          </p>

          <ul className="mt-5 flex flex-wrap gap-2">
            {['30-day free trial first', 'Setup support included', 'Priority support'].map((t) => (
              <li key={t} className="flex items-center gap-1.5 rounded-full bg-white/8 px-3 py-1 text-[11px] font-bold text-white/85 ring-1 ring-white/10">
                <span className="text-[#A3E635]">✓</span> {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {DASHAIN_OFFERS.map((o) => (
            <div
              key={o.id}
              className="group relative flex flex-col overflow-hidden rounded-3xl bg-white p-5 shadow-xl shadow-black/20 transition-transform duration-300 hover:-translate-y-1.5"
            >
              <span className="absolute right-4 top-4 rounded-full bg-linear-to-br from-orange-400 to-rose-500 px-2.5 py-1 text-[10px] font-black text-white shadow-md shadow-rose-500/30">
                {offerPercent(o)}% OFF
              </span>

              <div className="flex items-center gap-3">
                <div className="h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-slate-950 ring-1 ring-slate-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={o.logo} alt="" className="h-full w-full object-contain p-0.5" />
                </div>
                <div className="min-w-0">
                  <p className="text-base font-black leading-tight text-[#1e003a]">{o.name}</p>
                  <p className="truncate text-[11px] font-semibold text-slate-500">{o.audience}</p>
                </div>
              </div>

              <div className="mt-5">
                <span className="text-sm font-bold text-slate-400 line-through decoration-2">{o.original}</span>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl font-black tracking-tight text-[#1e003a]">{o.price}</span>
                  <span className="text-xs font-bold text-slate-500">{o.period}</span>
                </div>
                <p className="mt-0.5 text-[11px] font-bold text-rose-600">
                  Save NPR {offerSave(o).toLocaleString('en-IN')} · excl. 13% VAT
                </p>
              </div>

              <ul className="mt-4 mb-5 space-y-1.5">
                {o.perks.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-xs font-semibold text-slate-600">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-100 text-[9px] font-black text-[#9333EA]">✓</span>
                    {p}
                  </li>
                ))}
              </ul>

              <div className="mt-auto flex flex-col gap-2">
                <a
                  href={offerWhatsApp(o)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dashain-btn flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-black text-[#1e003a] shadow-md shadow-orange-500/30 transition-transform hover:scale-[1.02]"
                >
                  Claim offer <ArrowIcon />
                </a>
                {onSelect ? (
                  <button
                    type="button"
                    onClick={() => onSelect(o.id)}
                    className="rounded-xl border border-purple-200 px-4 py-2 text-xs font-black text-[#9333EA] transition-colors hover:bg-purple-50"
                  >
                    View plan details
                  </button>
                ) : (
                  <a
                    href={`/products#${o.id}`}
                    className="rounded-xl border border-purple-200 px-4 py-2 text-center text-xs font-black text-[#9333EA] transition-colors hover:bg-purple-50"
                  >
                    View plan details
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** Floating "Dashain Offer" pill (bottom-left), appears after scrolling */
export function DashainOfferFloat() {
  const [show, setShow] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    if (!FESTIVE_OFFER_ACTIVE) return;
    const onScroll = () => setShow(window.scrollY > 700);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!FESTIVE_OFFER_ACTIVE || closed) return null;
  const pct = Math.max(...DASHAIN_OFFERS.map(offerPercent));

  return (
    <div
      className={`fixed bottom-6 left-4 z-[90] hidden transition-all duration-500 sm:block lg:left-6 ${
        show ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'
      }`}
    >
      <div className="relative flex items-center rounded-full bg-[#1e003a] p-1 pr-1.5 shadow-[0_12px_40px_-8px_rgba(249,115,22,0.6)] ring-1 ring-[#FCD34D]/40">
        <a href="#dashain-offer" className="flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3">
          <span className="dashain-kite flex h-9 w-9 items-center justify-center rounded-full bg-[#2d0a52]">
            <Kite colors={[SAFFRON, GOLD]} className="w-5" />
          </span>
          <span className="leading-tight">
            <span className="block text-[10px] font-black uppercase tracking-widest text-[#FDE68A]">Dashain Offer</span>
            <span className="block text-xs font-bold text-white">Save {pct}% on RMS &amp; POS</span>
          </span>
        </a>
        <button
          onClick={() => setClosed(true)}
          className="flex h-6 w-6 items-center justify-center rounded-full text-white/50 hover:bg-white/10 hover:text-white"
          aria-label="Hide offer"
        >
          <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
          </svg>
        </button>
      </div>
    </div>
  );
}