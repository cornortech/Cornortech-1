"use client";

import Link from "next/link";
import { BannerProps } from "@/types";

export default function TopBanner({ visible, setVisible }: BannerProps) {
  if (!visible) return null;

  const closeIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
    </svg>
  );

  return (
    <div
      className="relative w-full overflow-hidden text-white"
      style={{ background: "linear-gradient(90deg, #1e003a 0%, #3b0f6b 40%, #5b1a5e 70%, #7a1f3d 100%)" }}
    >
      <div className="dashain-btn absolute bottom-0 left-0 h-[2px] w-full opacity-80" aria-hidden="true" />

      {/* Mobile layout */}
      <div className="flex sm:hidden items-center justify-between px-3 py-2 gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className="shrink-0 text-sm" aria-hidden="true">🪁</span>
          <span className="text-xs font-medium truncate text-white/85">
            <span className="font-deva font-semibold text-[#FDE68A]">शुभ विजयादशमी!</span> Happy Dashain
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <Link
            href="https://cornor.academy/"
            target="_self"
            className="dashain-btn text-[11px] font-bold px-3 py-1 rounded-md text-[#1e003a] whitespace-nowrap"
          >
            Academy →
          </Link>
          <button
            onClick={() => setVisible(false)}
            className="p-1 rounded-md text-white/50 hover:text-white transition-colors duration-200"
            aria-label="Close banner"
          >
            {closeIcon}
          </button>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:flex items-center justify-between px-6 lg:px-8 py-2.5 gap-4">
        <span className="shrink-0 text-[11px] font-bold tracking-widest uppercase px-2 py-1 rounded-md border border-[#FCD34D]/40 bg-[#FCD34D]/10 text-[#FDE68A]">
          🪁 Dashain 2083
        </span>

        <div className="flex-1 text-center text-sm">
          <span className="font-deva font-semibold text-[#FDE68A]">शुभ विजयादशमी!</span>{" "}
          <span className="font-semibold text-white">Happy Dashain from Cornor Tech. </span>
          <span className="hidden lg:inline text-white/65">
            Start this festive season with new skills — Cornor Academy is now live.
          </span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="https://cornor.academy/"
            target="_self"
            className="dashain-btn group flex items-center gap-1.5 text-sm font-bold px-4 py-1.5 rounded-lg text-[#1e003a] transition-transform duration-200 hover:scale-105"
          >
            Explore Courses
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16" className="group-hover:translate-x-0.5 transition-transform duration-200">
              <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
            </svg>
          </Link>
          <button
            onClick={() => setVisible(false)}
            className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors duration-200"
            aria-label="Close banner"
          >
            {closeIcon}
          </button>
        </div>
      </div>
    </div>
  );
}