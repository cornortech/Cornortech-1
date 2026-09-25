'use client';
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const categoryAccent: Record<string, string> = {
  Frontend: '#61DAFB',
  Framework: '#e2e8f0',
  Mobile: '#54C5F8',
  Design: '#F24E1E',
  CMS: '#4ea8d2',
  DevOps: '#94a3b8',
  Database: '#60a5fa',
  Cloud: '#818cf8',
  Backend: '#4ade80',
  Language: '#60a5fa',
};

const techs = [
  {
    name: 'React', category: 'Frontend',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <ellipse cx="12" cy="12" rx="10.5" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.1" />
        <ellipse cx="12" cy="12" rx="10.5" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.1" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10.5" ry="4" fill="none" stroke="#61DAFB" strokeWidth="1.1" transform="rotate(120 12 12)" />
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
      </svg>
    ),
  },
  {
    name: 'Next.js', category: 'Framework',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="white">
        <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747C23.422 4.716 20.196.95 15.848.1c-.76-.145-1.117-.177-2.276-.19-.513-.006-.985-.007-1 0z" />
      </svg>
    ),
  },
  {
    name: 'Flutter', category: 'Mobile',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M14.314 0L2.3 12 6 15.7 21.684.013h-7.37z" fill="#54C5F8" />
        <path d="M7.857 17.53l6.457-6.458 6.47 6.47-6.47 6.458z" fill="#01579B" />
        <path d="M14.314 17.542l3.234-3.235-3.234-3.235-6.457 6.457z" fill="#29B6F6" />
      </svg>
    ),
  },
  {
    name: 'Figma', category: 'Design',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M8 24c2.208 0 4-1.792 4-4v-4H8c-2.208 0-4 1.792-4 4s1.792 4 4 4z" fill="#0ACF83" />
        <path d="M4 12c0-2.208 1.792-4 4-4h4v8H8c-2.208 0-4-1.792-4-4z" fill="#A259FF" />
        <path d="M4 4c0-2.208 1.792-4 4-4h4v8H8C5.792 8 4 6.208 4 4z" fill="#F24E1E" />
        <path d="M12 0h4c2.208 0 4 1.792 4 4s-1.792 4-4 4h-4V0z" fill="#FF7262" />
        <path d="M20 12c0 2.208-1.792 4-4 4s-4-1.792-4-4 1.792-4 4-4 4 1.792 4 4z" fill="#1ABCFE" />
      </svg>
    ),
  },
  {
    name: 'WordPress', category: 'CMS',
    svg: (
      <svg viewBox="0 0 24 24" fill="#4ea8d2" className="w-7 h-7">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zM2.144 12c0-1.271.264-2.484.737-3.587L7.46 20.686A9.866 9.866 0 0 1 2.144 12zm9.856 9.861a9.886 9.886 0 0 1-2.75-.387l2.92-8.49 2.992 8.196c.024.063.051.122.075.148a9.876 9.876 0 0 1-3.237.533zm1.362-14.532c.592-.031 1.126-.094 1.126-.094.53-.063.468-.843-.063-.812 0 0-1.594.125-2.624.125-1 0-2.594-.125-2.594-.125-.531-.031-.594.78-.063.812 0 0 .5.063 1.031.094l1.531 4.197-2.15 6.446-3.576-10.643c.593-.031 1.125-.094 1.125-.094.531-.063.469-.843-.062-.812 0 0-1.594.125-2.625.125-.184 0-.402-.005-.633-.012C5.927 3.394 8.807 2.143 12 2.143c2.335 0 4.474.894 6.073 2.357-.038-.003-.077-.007-.117-.007-.999 0-1.718.87-1.718 1.806 0 .843.484 1.555.999 2.397.387.681.843 1.555.843 2.819 0 .875-.334 1.896-.774 3.311l-1.016 3.393-3.688-10.69zm5.671 13.179l-.038-.072-3.028-8.287c.499-1.298.837-2.378.837-3.3 0-.339-.022-.652-.063-.944A9.852 9.852 0 0 1 21.856 12c0 3.202-1.52 6.049-3.823 7.808z" />
      </svg>
    ),
  },
  {
    name: 'GitHub', category: 'DevOps',
    svg: (
      <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
      </svg>
    ),
  },
  {
    name: 'MySQL', category: 'Database',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#60a5fa">
        <path d="M16.405 5.501c-.115 0-.193.014-.274.033v.013h.014c.054.104.146.19.274.274.055.165.076.37.076.37s.186-.457.078-.545a.434.434 0 0 0-.168-.145zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm4.292 15.032c0 .418-.04.812-.293 1.124-.39.49-.96.584-1.514.584h-5.07c-.578 0-1.074-.146-1.38-.583-.266-.39-.3-.794-.3-1.25v-2.5c0-.46.04-.856.3-1.25.304-.434.797-.584 1.38-.584h5.07c.576 0 1.103.135 1.428.543.266.33.38.705.38 1.13v.25h-1.5v-.167c0-.308-.07-.5-.14-.604-.114-.167-.294-.25-.573-.25H9.585c-.278 0-.455.082-.568.25-.09.132-.146.34-.146.647v2.5c0 .305.055.514.146.647.113.168.29.25.568.25h4.5c.292 0 .47-.082.584-.25.07-.107.14-.307.14-.625v-.25H12.5v-1.25h3.792v.938z" />
      </svg>
    ),
  },
  {
    name: 'Canva', category: 'Design',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.109 5.377c2.29 0 3.956 1.58 3.956 3.87 0 2.416-1.706 4.37-4.08 4.37-.843 0-1.583-.27-2.107-.717l-1.06 5.588c-.06.312-.31.512-.618.512a.623.623 0 0 1-.618-.73l1.842-9.715c.36-1.88 1.64-3.178 2.685-3.178zm-.07 1.23c-.685 0-1.33.68-1.588 1.876l-.72 3.79c.373.415.917.658 1.558.658 1.59 0 2.71-1.424 2.71-3.163 0-1.698-.9-3.161-1.96-3.161z" fill="#00C4CC" />
      </svg>
    ),
  },
  {
    name: 'Photoshop', category: 'Design',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <path d="M0 4.8A4.8 4.8 0 0 1 4.8 0h14.4A4.8 4.8 0 0 1 24 4.8v14.4A4.8 4.8 0 0 1 19.2 24H4.8A4.8 4.8 0 0 1 0 19.2V4.8zm6.2 2.86v8.68h1.86V13.4h1.44c1.8 0 3.12-.9 3.12-2.94 0-1.98-1.26-2.76-3.06-2.76H6.2zm1.86 1.44h1.26c1.02 0 1.44.48 1.44 1.38 0 .96-.48 1.5-1.5 1.5H8.06V9.1zm6.44 1.08c-1.68 0-2.58.96-2.58 2.22 0 1.2.6 1.8 1.86 2.28.96.36 1.26.6 1.26 1.08 0 .48-.36.78-.96.78-.66 0-1.26-.3-1.74-.72l-.72 1.2c.6.54 1.44.9 2.46.9 1.56 0 2.7-.84 2.7-2.34 0-1.2-.66-1.86-1.98-2.34-.84-.3-1.14-.54-1.14-1.02 0-.42.3-.66.84-.66.54 0 1.02.24 1.44.6l.66-1.2a3.3 3.3 0 0 0-2.1-.78z" fill="#31A8FF" />
      </svg>
    ),
  },
  {
    name: 'Kotlin', category: 'Mobile',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <defs>
          <linearGradient id="kg2" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E44857" />
            <stop offset="46%" stopColor="#C711E1" />
            <stop offset="100%" stopColor="#7F52FF" />
          </linearGradient>
        </defs>
        <path d="M24 24H0V0h24L12 12z" fill="url(#kg2)" />
      </svg>
    ),
  },
  {
    name: 'Cloudinary', category: 'Cloud',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7" fill="#818cf8">
        <path d="M18.6 8.4A6.6 6.6 0 0 0 12 3a6.6 6.6 0 0 0-6.17 4.22A4.8 4.8 0 0 0 1.2 12a4.8 4.8 0 0 0 4.8 4.8h12a3.6 3.6 0 0 0 .6-7.4z" />
      </svg>
    ),
  },
  {
    name: 'Node.js', category: 'Backend',
    svg: (
      <svg viewBox="0 0 24 24" fill="#4ade80" className="w-7 h-7">
        <path d="M11.998 24a1.558 1.558 0 0 1-.764-.198l-2.416-1.423c-.363-.203-.185-.275-.066-.317.48-.167.579-.204 1.092-.494a.19.19 0 0 1 .181.014l1.858 1.105a.228.228 0 0 0 .218 0l7.256-4.181a.226.226 0 0 0 .11-.194V7.69a.228.228 0 0 0-.111-.197l-7.25-4.179a.226.226 0 0 0-.217 0L4.643 7.493a.228.228 0 0 0-.113.197v8.355c0 .08.043.154.113.193l1.985 1.147c1.08.54 1.74-.096 1.74-.736V8.438a.205.205 0 0 1 .205-.205h.892a.205.205 0 0 1 .205.205v8.211c0 1.44-.784 2.264-2.15 2.264-.42 0-.75 0-1.674-.454l-1.905-1.098a1.558 1.558 0 0 1-.763-1.348V7.69c0-.556.296-1.072.763-1.348l7.257-4.186a1.582 1.582 0 0 1 1.531 0l7.256 4.186c.469.276.764.792.764 1.348v8.355a1.56 1.56 0 0 1-.764 1.348l-7.256 4.181A1.563 1.563 0 0 1 11.998 24z" />
      </svg>
    ),
  },
  {
    name: 'TypeScript', category: 'Language',
    svg: (
      <svg viewBox="0 0 24 24" className="w-7 h-7">
        <rect width="24" height="24" rx="2" fill="#3178C6" />
        <path d="M13.5 12.5H16V11H10v1.5h2.5V18H13.5V12.5zm3.5 4.82c.33.17.74.3 1.23.3.98 0 1.77-.5 1.77-1.43 0-.76-.44-1.2-1.23-1.52l-.4-.16c-.4-.16-.57-.27-.57-.52 0-.22.17-.38.5-.38.32 0 .56.1.8.3l.72-.84A2.4 2.4 0 0 0 18.3 13c-.98 0-1.73.57-1.73 1.45 0 .76.46 1.2 1.18 1.5l.4.16c.44.18.63.3.63.56 0 .26-.2.42-.57.42a2 2 0 0 1-1.07-.37l-.64 1.2z" fill="white" />
      </svg>
    ),
  },
  {
    name: 'Tailwind', category: 'Frontend',
    svg: (
      <svg viewBox="0 0 24 24" fill="#06B6D4" className="w-7 h-7">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
      </svg>
    ),
  },
];

// === hex → "r,g,b" helper ===
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}

// === Dark glass tech card ===
const TechCard = ({ tech }: { tech: (typeof techs)[0] }) => {
  const accent = categoryAccent[tech.category] ?? '#a855f7';

  return (
    <div
      className="relative flex items-center gap-3 px-4 py-3 rounded-xl shrink-0 cursor-default overflow-hidden"
      style={{
        background: 'rgba(255,255,255,0.07)',
        border: '1px solid rgba(255,255,255,0.14)',
        backdropFilter: 'blur(12px)',
        transition: 'all 0.25s ease',
        willChange: 'transform',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = `rgba(${hexToRgb(accent)},0.15)`;
        el.style.borderColor = `${accent}70`;
        el.style.transform = 'translateY(-3px)';
        el.style.boxShadow = `0 0 20px ${accent}30, 0 8px 24px rgba(0,0,0,0.4)`;
        const bar = el.querySelector('.dark-accent-bar') as HTMLElement;
        if (bar) bar.style.transform = 'scaleY(1)';
        const glow = el.querySelector('.icon-glow') as HTMLElement;
        if (glow) {
          glow.style.opacity = '1';
          glow.style.background = `radial-gradient(circle, ${accent}25 0%, transparent 70%)`;
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = 'rgba(255,255,255,0.07)';
        el.style.borderColor = 'rgba(255,255,255,0.14)';
        el.style.transform = '';
        el.style.boxShadow = '';
        const bar = el.querySelector('.dark-accent-bar') as HTMLElement;
        if (bar) bar.style.transform = 'scaleY(0)';
        const glow = el.querySelector('.icon-glow') as HTMLElement;
        if (glow) glow.style.opacity = '0';
      }}
    >
      {/* left accent bar */}
      <div
        className="dark-accent-bar absolute left-0 top-0 bottom-0 w-0.5 rounded-full origin-bottom"
        style={{
          background: accent,
          transform: 'scaleY(0)',
          transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}
      />

      {/* icon glow bg */}
      <div className="icon-glow absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300" />

      {/* icon */}
      <div className="w-8 h-8 flex items-center justify-center shrink-0 relative z-10">
        {tech.svg}
      </div>

      {/* text — fully visible on dark bg */}
      <div className="pr-1 relative z-10">
        <p className="text-[13px] font-bold text-white whitespace-nowrap leading-none">
          {tech.name}
        </p>
        <p
          className="text-[10px] mt-0.5 whitespace-nowrap font-semibold"
          style={{ color: accent }}
        >
          {tech.category}
        </p>
      </div>
    </div>
  );
};

// ===== Marquee Strip =====
const Marquee = ({
  items,
  reverse = false,
  duration = 40,
}: {
  items: typeof techs;
  reverse?: boolean;
  duration?: number;
}) => {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div
        className="absolute inset-y-0 left-0 w-28 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to right, #1e003a, transparent)' }}
      />
      <div
        className="absolute inset-y-0 right-0 w-28 z-10 pointer-events-none"
        style={{ background: 'linear-gradient(to left, #1e003a, transparent)' }}
      />
      <motion.div
        className="flex gap-3 w-max py-1"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((tech, i) => (
          <TechCard key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </motion.div>
    </div>
  );
};

// ======= TechStack Section =====
const TechStack = () => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  const row1 = techs.slice(0, 7);
  const row2 = techs.slice(7);

  const words = ['Our', 'Tech', 'Stack'];

  return (
    <section
      className="py-24 overflow-hidden relative"
      style={{
        background: 'linear-gradient(to bottom, #1e003a 0%, #2d0a52 50%, #1e003a 100%)',
      }}
    >
      {/* === noise texture overlay (same as hero) === */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* === ambient radial blobs === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute top-0 left-1/4 w-125 h-125 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 65%)' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-100 h-100 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.10) 0%, transparent 65%)' }}
        />
      </div>
      {/* === End ambient radial blobs === */}


      {/* === giant ghost watermark === */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.1 }}
        className="absolute top-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[18vw] font-black uppercase tracking-tighter select-none pointer-events-none leading-none"
        style={{ color: 'rgba(168,85,247,0.04)' }}
        aria-hidden="true"
      >
        Technologies
      </motion.p>
      {/* === End giant ghost watermark === */}


      {/* === floating particles === */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full pointer-events-none"
          style={{
            left: `${(i * 13 + 7) % 100}%`,
            top: `${(i * 17 + 11) % 100}%`,
            background: i % 2 === 0 ? 'rgba(168,85,247,0.5)' : 'rgba(99,102,241,0.4)',
          }}
          animate={{ y: [0, -14, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.4 }}
          aria-hidden="true"
        />
      ))}
      {/* === End floating particles === */}


      <div ref={ref} className="container-custom relative z-10">

        {/* === Header === */}
        <div className="mb-14">

          {/* eyebrow label — ✅ brighter purple */}
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-8 bg-[#c084fc] rounded-full" />
            <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#c084fc]">
              Built with the best
            </span>
          </motion.div>

          {/* headline + subtext row */}
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="flex flex-wrap gap-x-4 text-4xl lg:text-5xl font-black text-white leading-none">
              {words.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 28, filter: 'blur(6px)' }}
                  animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            {/* subtext — ✅ white/60 instead of white/30 */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="text-white/60 text-sm max-w-xs leading-relaxed shrink-0"
            >
              Tools we use every day to ship fast,
              <br className="hidden sm:block" /> scale reliably, and design beautifully.
            </motion.p>
          </div>

          {/* animated divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 h-px origin-left"
            style={{
              background: 'linear-gradient(to right, rgba(192,132,252,0.6), rgba(99,102,241,0.3), transparent)',
            }}
          />
        </div>
        {/* === End Header === */}


        {/* === Marquee rows === */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col gap-3"
        >
          <Marquee items={row1} duration={50} />
          <Marquee items={row2} reverse duration={38} />
        </motion.div>
        {/* === End Marquee rows === */}

      </div>
    </section>
  );
};

export default TechStack;