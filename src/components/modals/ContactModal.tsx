"use client";

import { useEffect, useRef } from "react";
import {CONTACT} from '@/config/contact'

// const PRIMARY = "#9333EA";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .cm-overlay {
          position: fixed; inset: 0; z-index: 9999;
          display: flex; align-items: center; justify-content: center; padding: 16px;
          background: rgba(5, 3, 14, 0.15);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          opacity: 0; pointer-events: none;
          transition: opacity 0.28s ease;
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
        .cm-overlay.cm-open { opacity: 1; pointer-events: all; }

        .cm-modal {
          width: 100%; max-width: 456px;
          background: #0c0b18;
          border: 1px solid rgba(108,63,235,0.22);
          border-radius: 22px;
          overflow: hidden; position: relative;
          transform: scale(0.93) translateY(20px);
          transition: transform 0.44s cubic-bezier(0.34,1.56,0.64,1);
          box-shadow:
            0 0 0 1px rgba(255,255,255,0.03),
            0 32px 100px rgba(0,0,0,0.78),
            0 0 150px rgba(108,63,235,0.13);
        }
        .cm-overlay.cm-open .cm-modal { transform: scale(1) translateY(0); }

        .cm-topbar {
          height: 2.5px;
          background: linear-gradient(90deg, #6C3FEB, #9d71ff, #c084fc, #818cf8, #6C3FEB);
          background-size: 300% 100%;
          animation: cm-slide 4s linear infinite;
        }
        @keyframes cm-slide { to { background-position: -300% 0; } }

        .cm-orb {
          position: absolute; top: -80px; right: -60px;
          width: 260px; height: 260px; border-radius: 50%;
          background: radial-gradient(circle, rgba(108,63,235,0.18) 0%, transparent 68%);
          pointer-events: none;
        }

        .cm-body { position: relative; z-index: 1; padding: 28px 28px 24px; }

        .cm-close {
          position: absolute; top: 14px; right: 14px; z-index: 20;
          width: 32px; height: 32px; border-radius: 50%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          color: rgba(255,255,255,0.35); cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.22s ease; outline: none;
        }
        .cm-close:hover {
          background: rgba(255,255,255,0.09);
          border-color: rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.82);
          transform: rotate(90deg);
        }

        .cm-status {
          display: inline-flex; align-items: center; gap: 7px;
          background: rgba(108,63,235,0.1);
          border: 1px solid rgba(108,63,235,0.22);
          padding: 4px 12px 4px 8px; border-radius: 100px;
          margin-bottom: 18px;
          font-size: 11px; font-weight: 600;
          letter-spacing: 0.05em; text-transform: uppercase;
          color: #FFFFFF;
        }
        .cm-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #66FF01;
          animation: cm-dot-pulse 2.2s ease-in-out infinite;
          box-shadow: 0 0 6px rgba(124,92,252,0.8);
        }
        @keyframes cm-dot-pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.55; transform: scale(1.3); }
        }

        .cm-heading {
          font-size: 24px; font-weight: 800;
          color: #ede9ff; line-height: 1.2;
          letter-spacing: -0.03em; margin-bottom: 7px;
        }
        .cm-heading-accent {
          background: linear-gradient(125deg, #c4b0ff 20%, #6C3FEB 80%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
        }
        .cm-sub {
          font-size: 13px; color: #E8E8EA;
          line-height: 1.65; margin-bottom: 24px; font-weight: 400;
        }

        .cm-options { display: flex; flex-direction: column; gap: 9px; margin-bottom: 20px; }

        .cm-option {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px;
          background: rgba(255,255,255,0.022);
          border: 1px solid rgba(255,255,255,0.055);
          border-radius: 14px; cursor: pointer; text-align: left;
          outline: none;
          transition: background 0.2s, border-color 0.2s, transform 0.2s, box-shadow 0.2s;
          position: relative; overflow: hidden;
          opacity: 0;
        }
        .cm-overlay.cm-open .cm-option:nth-child(1) { animation: cm-fadein 0.38s 0.18s both; }
        .cm-overlay.cm-open .cm-option:nth-child(2) { animation: cm-fadein 0.38s 0.26s both; }
        .cm-overlay.cm-open .cm-option:nth-child(3) { animation: cm-fadein 0.38s 0.34s both; }
        @keyframes cm-fadein {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .cm-option::before {
          content: ''; position: absolute;
          left: 0; top: 14%; bottom: 14%;
          width: 2.5px; border-radius: 0 3px 3px 0;
          background: var(--acc);
          opacity: 0; transform: scaleY(0.3);
          transition: opacity 0.2s, transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
        }
        .cm-option:hover {
          background: rgba(255,255,255,0.044);
          border-color: rgba(255,255,255,0.1);
          transform: translateX(4px);
          box-shadow: -2px 0 0 var(--acc), 0 8px 32px rgba(0,0,0,0.18);
        }
        .cm-option:hover::before { opacity: 1; transform: scaleY(1); }
        .cm-option:active { transform: translateX(2px) scale(0.99); }

        .cm-opt-icon {
          width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          background: var(--ibg); border: 1px solid var(--iborder);
          transition: transform 0.28s cubic-bezier(0.34,1.56,0.64,1);
        }
        .cm-option:hover .cm-opt-icon { transform: scale(1.1) rotate(-5deg); }

        .cm-opt-text { flex: 1; min-width: 0; }
        .cm-opt-label {
          font-size: 13.5px; font-weight: 700; color: #FFFFFF;
          letter-spacing: -0.015em; margin-bottom: 3px;
          display: flex; align-items: center; gap: 7px;
        }
        .cm-badge {
          font-size: 9.5px; font-weight: 700;
          letter-spacing: 0.06em; text-transform: uppercase;
          padding: 2px 7px; border-radius: 100px;
          color: #FFFFFF; opacity: 0.92;
        }
        .cm-opt-desc { font-size: 11.5px; color: #E8E8EA; font-weight: 400; }

        .cm-opt-arrow {
          flex-shrink: 0; color: #E8E8EA;
          transition: color 0.2s, transform 0.2s;
        }
        .cm-option:hover .cm-opt-arrow { color: var(--acc); transform: translateX(3px); }

        .cm-divider {
          display: flex; align-items: center; gap: 10px; margin-bottom: 16px;
        }
        .cm-divider-line { flex: 1; height: 1px; background: rgba(255,255,255,0.055); }
        .cm-divider-text {
          font-size: 10.5px; color: #E8E8EA;
          text-transform: uppercase; letter-spacing: 0.08em; font-weight: 500;
        }

        .cm-footer {
          display: flex; align-items: center; justify-content: center; gap: 14px;
        }
        .cm-trust-item {
          display: flex; align-items: center; gap: 5px;
          font-size: 11px; color: #E8E8EA; font-weight: 500;
        }
        .cm-trust-item svg { opacity: 0.45; }
        .cm-trust-sep {
          width: 3px; height: 3px; border-radius: 50%;
          background: rgba(255,255,255,0.12);
        }
      `}</style>

      <div
        ref={overlayRef}
        className={`cm-overlay${isOpen ? " cm-open" : ""}`}
        onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
        role="dialog"
        aria-modal="true"
        aria-label="Contact us"
      >
        <div className="cm-modal">
          <div className="cm-topbar" />
          <div className="cm-orb" />

          <div className="cm-body">
            {/* Close button */}
            <button className="cm-close" onClick={onClose} aria-label="Close">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Status pill */}
            <div className="cm-status">
              <span className="cm-dot" />
              We&apos;re online now
            </div>

            {/* Heading */}
            <h2 className="cm-heading">
              Let&apos;s build something<br />
              <span className="cm-heading-accent">great together.</span>
            </h2>
            <p className="cm-sub">
              Choose how you&apos;d like to reach us — no forms, no waiting rooms.
            </p>

            {/* ===== Options ===== */}
            <div className="cm-options">

              {/* Direct Call */}
              <button
                className="cm-option"
                style={{ "--acc": "#3b82f6", "--ibg": "rgba(59,130,246,0.1)", "--iborder": "rgba(59,130,246,0.22)" } as React.CSSProperties}
                onClick={() => window.location.href = `tel:${CONTACT.whatsapp}`}
              >
                <div className="cm-opt-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="cm-opt-text">
                  <div className="cm-opt-label">Direct Call</div>
                  <div className="cm-opt-desc">+977 9828750115 — call us directly anytime</div>
                </div>
                <div className="cm-opt-arrow">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </button>

              {/* WhatsApp */}
              <button
                className="cm-option"
                style={{ "--acc": "#22c55e", "--ibg": "rgba(34,197,94,0.1)", "--iborder": "rgba(34,197,94,0.2)" } as React.CSSProperties}
                onClick={() => window.open(`https://wa.me/${CONTACT.whatsapp}`, "_blank")}
              >
                <div className="cm-opt-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="#22c55e">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div className="cm-opt-text">
                  <div className="cm-opt-label">WhatsApp</div>
                  <div className="cm-opt-desc">Ping us directly — usually respond within minutes</div>
                </div>
                <div className="cm-opt-arrow">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </button>

              {/* Visit Office */}
              <button
                className="cm-option"
                style={{ "--acc": "#f59e0b", "--ibg": "rgba(245,158,11,0.1)", "--iborder": "rgba(245,158,11,0.22)" } as React.CSSProperties}
                onClick={() => window.open("https://share.google/ipeEuiQ4lKklENKRz", "_blank")}
              >
                <div className="cm-opt-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <circle cx="12" cy="11" r="3" />
                  </svg>
                </div>
                <div className="cm-opt-text">
                  <div className="cm-opt-label">Visit Our Office</div>
                  <div className="cm-opt-desc">Tilottama, Butwal, Nepal — get directions on Maps</div>
                </div>
                <div className="cm-opt-arrow">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </div>
              </button>

            </div>
            {/* ===== End Options ===== */}

            {/* ===== Divider ===== */}
            <div className="cm-divider">
              <span className="cm-divider-line" />
              <span className="cm-divider-text">100% safe &amp; private</span>
              <span className="cm-divider-line" />
            </div>
            {/* ===== End Divider ===== */}

            {/* ===== Trust footer ===== */}
            <div className="cm-footer">
              <div className="cm-trust-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                No spam, ever
              </div>
              <div className="cm-trust-sep" />
              <div className="cm-trust-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" />
                  <path d="M7 11V7a5 5 0 0110 0v4" />
                </svg>
                Data stays private
              </div>
              <div className="cm-trust-sep" />
              <div className="cm-trust-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 6v6l4 2" />
                </svg>
                Reply within 2h
              </div>
            </div>
            {/* ===== End Trust footer ===== */}

          </div>
        </div>
      </div>
    </>
  );
}