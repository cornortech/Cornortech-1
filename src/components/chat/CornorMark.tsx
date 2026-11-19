'use client';

import { useId } from 'react';
import styles from './chat.module.css';

/**
 * The Cornor Tech mark, traced from /public/logo.png into its three pieces:
 * the upper "C", the lower fold and the right chevron.
 *
 * The pieces are the AI's signature: while it is thinking they light up in
 * sequence (instead of three generic bouncing dots), and on the welcome
 * screen a pulse of light runs along their outlines once, like current
 * through a circuit — a nod to the Cornor Tech AI circuit logo.
 */
const PIECES = [
  // upper C
  'M57.65 0 L37.67 0 L10.27 45.89 L20.78 66.55 L54 66.55 L46.46 54.11 L28.08 54.11 L23.86 47.03 L44.98 12.3 L66.1 12.3 Z',
  // lower fold
  'M64.5 19.63 L50.68 19.63 L33.79 47.4 L47.6 47.4 L49.54 44.75 L61.64 64.61 L56.62 73.2 L17.58 73.2 L6.39 54.34 L0 66.32 L9.36 82.5 L65.18 82.5 L75.91 63.93 L56.51 33.9 Z',
  // right chevron
  'M73.29 20.78 L66.44 32.99 L85.39 64.38 L75.11 82.5 L89.38 82.5 L99.66 64.84 Z',
];

interface CornorMarkProps {
  size?: number;
  tone?: 'white' | 'brand';
  /** Pieces light up in sequence. */
  thinking?: boolean;
  /** One-off light pulse along the outlines (welcome screen). */
  trace?: boolean;
  className?: string;
}

export default function CornorMark({ size = 24, tone = 'white', thinking, trace, className }: CornorMarkProps) {
  const gid = useId().replace(/:/g, '');
  const fill = tone === 'white' ? '#ffffff' : `url(#ct-grad-${gid})`;

  return (
    <svg
      viewBox="-2 -2 104 87"
      width={size}
      height={(size * 87) / 104}
      aria-hidden="true"
      focusable="false"
      className={[styles.mark, thinking ? styles.markThinking : '', trace ? styles.markTrace : '', className ?? '']
        .filter(Boolean)
        .join(' ')}
    >
      {tone === 'brand' && (
        <defs>
          <linearGradient id={`ct-grad-${gid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#A86BFF" />
            <stop offset="100%" stopColor="#6A0BE8" />
          </linearGradient>
        </defs>
      )}
      {PIECES.map((d, i) => (
        <g key={i} className={styles.piece} style={{ ['--i' as string]: i }}>
          <path d={d} fill={fill} className={styles.pieceFill} />
          {trace && <path d={d} pathLength={1} className={styles.pieceTrace} />}
        </g>
      ))}
    </svg>
  );
}

interface AiAvatarProps {
  size?: number;
  thinking?: boolean;
  trace?: boolean;
  online?: boolean;
  className?: string;
}

/** Violet tile with the white mark: the assistant's face everywhere in the UI. */
export function AiAvatar({ size = 36, thinking, trace, online, className }: AiAvatarProps) {
  return (
    <span
      className={[styles.avatar, thinking ? styles.avatarThinking : '', className ?? ''].join(' ')}
      style={{ width: size, height: size, borderRadius: Math.round(size * 0.32) }}
      aria-hidden="true"
    >
      <CornorMark size={Math.round(size * 0.58)} thinking={thinking} trace={trace} />
      {online && <span className={styles.onlineDot} />}
    </span>
  );
}
