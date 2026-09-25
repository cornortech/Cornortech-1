"use client"; 

import { useState, useEffect } from "react";

const PRIMARY_COLOR = "#9333EA";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState<boolean>(false);
  const [clicked, setClicked] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    setClicked(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => setClicked(false), 400);
  };

  return (
    <>
      <style>{`
        @keyframes stt-fadeIn {
          from { opacity: 0; transform: translateY(20px) scale(0.85); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes stt-fadeOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(20px) scale(0.85); }
        }
        @keyframes stt-bounce {
          0%, 100% { transform: translateY(0); }
          40%      { transform: translateY(-5px); }
          70%      { transform: translateY(-2px); }
        }
        @keyframes stt-ripple {
          0%   { box-shadow: 0 0 0 0px ${PRIMARY_COLOR}66, 0 6px 24px ${PRIMARY_COLOR}55; }
          100% { box-shadow: 0 0 0 14px ${PRIMARY_COLOR}00, 0 6px 24px ${PRIMARY_COLOR}55; }
        }
        @keyframes stt-pop {
          0%   { transform: scale(1); }
          40%  { transform: scale(0.88); }
          100% { transform: scale(1); }
        }

        .stt-btn { animation: stt-fadeIn 0.35s cubic-bezier(.34,1.56,.64,1) both; }
        .stt-btn.out { animation: stt-fadeOut 0.3s ease forwards; pointer-events: none; }
        .stt-btn.pop { animation: stt-pop 0.3s ease forwards !important; }

        .stt-btn:hover { animation: stt-ripple 0.7s ease-out infinite !important; }
        .stt-btn:hover .stt-arrow { animation: stt-bounce 0.65s ease infinite; }

        .stt-tooltip {
          opacity: 0;
          transform: translateY(6px);
          transition: opacity 0.2s ease, transform 0.2s ease;
        }
        .stt-btn:hover .stt-tooltip {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className={`fixed bottom-8 right-8 z-9999 ${!visible ? "pointer-events-none" : ""}`}>
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={`stt-btn ${!visible ? "out" : ""} ${clicked ? "pop" : ""}
            relative flex items-center justify-center
            w-13 h-13 rounded-full border-0 cursor-pointer
            transition-[filter,transform] duration-200
            hover:-translate-y-1 hover:scale-105 hover:brightness-110
            focus:outline-none`}
          style={{
            background: PRIMARY_COLOR,
            boxShadow: `0 6px 24px ${PRIMARY_COLOR}55, 0 2px 8px rgba(0,0,0,0.18)`,
          }}
        >
          {/* Arrow Icon */}
          <span className="stt-arrow flex items-center justify-center">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 19V5M5 12l7-7 7 7"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>

          {/* Tooltip */}
          <span
            className="stt-tooltip absolute bottom-[calc(100%+10px)] right-0
              bg-[rgba(10,10,20,0.92)] text-white text-[11px] whitespace-nowrap
              px-2.5 py-1 rounded-lg pointer-events-none tracking-wide"
          >
            Back to top
            {/* Tooltip caret */}
            <span
              className="absolute top-full right-4 w-0 h-0 border-[5px] border-transparent"
              style={{ borderTopColor: "rgba(10,10,20,0.92)" }}
            />
          </span>
        </button>
      </div>
    </>
  );
}