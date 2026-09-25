"use client";

import Link from "next/link";
import { BannerProps } from "@/types";

export default function TopBanner({ visible, setVisible }: BannerProps) {
  if (!visible) return null;

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
        color: "white",
      }}
    >
      {/* Subtle animated shimmer line at bottom */}
      <div
        className="absolute bottom-0 left-0 h-[1.5px] w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)",
        }}
      />

      {/* Mobile layout */}
      <div className="flex sm:hidden items-center justify-between px-3 py-2 gap-2">
        {/* Left: badge + text */}
        <div className="flex items-center gap-2 min-w-0">
          <span
            className="shrink-0 text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded"
            style={{
              background: "rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.85)",
              letterSpacing: "0.1em",
            }}
          >
            NEW
          </span>
          <span
            className="text-xs font-medium truncate"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            Cornor Academy is{" "}
            <span style={{ color: "white", fontWeight: 600 }}>now live!</span>
          </span>
        </div>

        {/* Right: CTA + close */}
        <div className="flex items-center gap-1.5 shrink-0">
          <Link
            href="https://cornor.academy/"
            target="_self"
            className="text-[11px] font-semibold px-3 py-1 rounded-md transition-all duration-200"
            style={{
              background: "white",
              color: "#0f172a",
              whiteSpace: "nowrap",
            }}
          >
            Explore →
          </Link>
          <button
            onClick={() => setVisible(false)}
            className="p-1 rounded-md transition-colors duration-200"
            style={{ color: "rgba(255,255,255,0.5)" }}
            aria-label="Close banner"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop layout */}
      <div className="hidden sm:flex items-center justify-between px-6 lg:px-8 py-2.5 gap-4">
        {/* Left: badge */}
        <div className="flex items-center gap-3 shrink-0">
          <span
            className="text-[11px] font-bold tracking-widest uppercase px-2 py-1 rounded-md"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            🎉 New
          </span>
        </div>

        {/* Center: message */}
        <div className="flex-1 text-center text-sm">
          <span className="font-semibold" style={{ color: "white" }}>
            Cornor Academy is now live!{" "}
          </span>
          <span
            className="hidden lg:inline text-sm"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Master Web Dev, AI/ML, Digital Marketing & more with expert-led courses.
          </span>
          <span
            className="lg:hidden text-sm"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Expert-led courses, hands-on learning.
          </span>
        </div>

        {/* Right: CTA + close */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="https://cornor.academy/"
            target="_self"
            className="group flex items-center gap-1.5 text-sm font-semibold px-4 py-1.5 rounded-lg transition-all duration-200 hover:scale-105"
            style={{
              background: "white",
              color: "#0f172a",
            }}
          >
            Explore Courses
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              fill="currentColor"
              viewBox="0 0 16 16"
              className="transform group-hover:translate-x-0.5 transition-transform duration-200"
            >
              <path
                fillRule="evenodd"
                d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z"
              />
            </svg>
          </Link>

          <button
            onClick={() => setVisible(false)}
            className="p-1.5 rounded-lg transition-colors duration-200 hover:bg-white/10"
            style={{ color: "rgba(255,255,255,0.5)" }}
            aria-label="Close banner"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}