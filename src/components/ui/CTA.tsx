
"use client";

import { useState, useEffect, useRef } from "react";
import ContactModal from '@/components/modals/ContactModal'

const PRIMARY = "#9333EA";

export default function CTA() {
  const [visible, setVisible] = useState<boolean>(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  const btnRef = useRef<HTMLButtonElement>(null);
  const rippleId = useRef(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      // Shows after scrolling past 100vh (hero section height)
      setVisible(window.scrollY > window.innerHeight * 0.85);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = btnRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = rippleId.current++;
    setRipples((prev) => [...prev, { x, y, id }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);

    setModalOpen(true);
  };

  return (
    <>
      <style>{`
        @keyframes cta-in {
          from { opacity: 0; transform: translateX(-50%) translateY(24px) scale(0.9); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0)     scale(1);  }
        }
        @keyframes cta-out {
          from { opacity: 1; transform: translateX(-50%) translateY(0)     scale(1);  }
          to   { opacity: 0; transform: translateX(-50%) translateY(24px) scale(0.9); }
        }
        @keyframes cta-arrow {
          0%,100% { transform: translateX(0); }
          50%     { transform: translateX(5px); }
        }
        @keyframes cta-ripple {
          0%   { transform: scale(0); opacity: 0.4; }
          100% { transform: scale(5); opacity: 0;   }
        }
        @keyframes cta-dot-ping {
          0%,100% { opacity: 1; transform: scale(1); }
          50%     { opacity: 0.5; transform: scale(1.3); }
        }
        @keyframes cta-glow-pulse {
          0%,100% { box-shadow: 0 8px 32px ${PRIMARY}55, 0 2px 8px rgba(0,0,0,0.25); }
          50%     { box-shadow: 0 12px 48px ${PRIMARY}88, 0 2px 8px rgba(0,0,0,0.25); }
        }

        .cta-pill {
          animation: cta-in 0.4s cubic-bezier(.34,1.56,.64,1) both;
        }
        .cta-pill.cta-hide {
          animation: cta-out 0.3s ease forwards;
          pointer-events: none;
        }
        .cta-pill:hover {
          filter: brightness(1.1);
          transform: translateX(-50%) translateY(-3px) scale(1.03) !important;
          animation: cta-glow-pulse 1.5s ease-in-out infinite !important;
        }
        .cta-pill:hover .cta-arrow {
          animation: cta-arrow 0.5s ease infinite;
        }
        .cta-pill:active {
          transform: translateX(-50%) scale(0.97) !important;
        }
        .cta-ripple-el {
          position: absolute;
          border-radius: 50%;
          width: 80px; height: 80px;
          margin-left: -40px; margin-top: -40px;
          background: rgba(255,255,255,0.3);
          pointer-events: none;
          animation: cta-ripple 0.7s ease-out forwards;
        }
        .cta-live-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #66FF01;
          opacity: 0.9;
          animation: cta-dot-ping 2s ease-in-out infinite;
        }
      `}</style>

      <button
        ref={btnRef}
        onClick={handleRipple}
        aria-label="Contact us now"
        className={`cta-pill
          fixed bottom-8 left-1/2 z-9998
          flex items-center gap-2 sm:gap-3
          px-4 py-2.5 sm:px-6 sm:py-3.5 rounded-full
          border-0 cursor-pointer
          text-white font-bold text-[13px] sm:text-[14px] tracking-[-0.01em]
          transition-[filter,transform] duration-200
          focus:outline-none
          ${!visible ? "cta-hide" : ""}
        `}
        style={{
          background: PRIMARY,
          boxShadow: `0 8px 32px ${PRIMARY}55, 0 2px 8px rgba(0,0,0,0.25)`,
          transform: "translateX(-50%)",
        }}
      >
        {/* Ripples */}
        {ripples.map((r) => (
          <span
            key={r.id}
            className="cta-ripple-el"
            style={{ left: r.x, top: r.y }}
          />
        ))}

        {/* Live dot */}
        <span className="cta-live-dot" />

        {/* Mail icon */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="opacity-90">
          <path
            d="M4 4h16c1.1 0 2 .9 2 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V6c0-1.1.9-2 2-2z"
            stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          />
          <path d="M22 6L12 13 2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        {/* Label */}
        <span className="block sm:hidden">Contact Us</span>
        <span className="hidden sm:block">Contact Us Now</span>

        {/* Arrow */}
        <svg className="cta-arrow" width="15" height="15" viewBox="0 0 24 24" fill="none">
          <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* ===== Contact Modal ===== */}
      <ContactModal isOpen={modalOpen}
      onClose={()=>setModalOpen(false)}
      />
      {/* ===== End Contact Modal ===== */}

    </>
  );
}