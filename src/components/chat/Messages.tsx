'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { AiAvatar } from './CornorMark';
import Markdown from './Markdown';
import { ArrowDownIcon, ArrowUpRightIcon, CheckIcon, CopyIcon, RetryIcon } from './icons';
import { BRAND, FALLBACK_QUESTIONS } from './config';
import type { ChatMessage } from './useCornorChat';
import type { AssistantProfile } from './api';
import styles from './chat.module.css';

const timeFmt = typeof Intl !== 'undefined' ? new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }) : null;
const dayFmt = typeof Intl !== 'undefined' ? new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }) : null;

function formatTime(ts: number) {
  return timeFmt ? timeFmt.format(ts) : '';
}

function formatStart(ts: number) {
  const d = new Date(ts);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);
  const day =
    d.toDateString() === now.toDateString()
      ? 'Today'
      : d.toDateString() === yesterday.toDateString()
        ? 'Yesterday'
        : dayFmt?.format(d) ?? '';
  return `${day}, ${formatTime(ts)}`;
}

/* ───────────────────────────── Welcome ───────────────────────────── */

export function Welcome({
  expanded,
  profile,
  disabled,
  onPick,
}: {
  expanded: boolean;
  profile: AssistantProfile | null;
  disabled: boolean;
  onPick: (q: string) => void;
}) {
  const questions = profile
    ? (profile.assistantDefaultQuestions.length ? profile.assistantDefaultQuestions : FALLBACK_QUESTIONS).slice(0, 4)
    : null;
  const reduced = useReducedMotion();

  return (
    <div className={styles.welcome}>
      <AiAvatar size={expanded ? 72 : 56} trace={!reduced} />
      <h2 className={styles.welcomeTitle}>{BRAND.welcomeTitle}</h2>
      <p className={styles.welcomeBody}>{BRAND.welcomeBody}</p>

      <ul className={styles.suggestions} aria-label="Suggested questions">
        {questions
          ? questions.map((q, i) => (
              <motion.li
                key={q}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 + i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <button type="button" className={styles.suggestion} onClick={() => onPick(q)} disabled={disabled}>
                  <span>{q}</span>
                  <ArrowUpRightIcon size={16} />
                </button>
              </motion.li>
            ))
          : [0, 1, 2].map((i) => <li key={i} className={styles.suggestionsSkeleton} aria-hidden="true" />)}
      </ul>
    </div>
  );
}

/* ───────────────────────────── Bubbles ───────────────────────────── */

/** Reveals a freshly received reply word by word (the API returns it in one piece). */
function useReveal(text: string, active: boolean, onDone: () => void) {
  const [shown, setShown] = useState(active ? 0 : text.length);

  useEffect(() => {
    if (!active) return;
    const bounds: number[] = [];
    let acc = 0;
    for (const w of text.match(/\S+\s*/g) ?? [text]) bounds.push((acc += w.length));
    const perTick = Math.max(1, Math.ceil(bounds.length / 70)); // long replies finish in ~1.7s
    let i = 0;
    let finished = false;
    const id = window.setInterval(() => {
      i += perTick;
      if (i >= bounds.length) {
        finished = true;
        window.clearInterval(id);
        setShown(text.length);
        onDone();
      } else {
        setShown(bounds[i - 1]);
      }
    }, 24);
    return () => {
      window.clearInterval(id);
      // Closed mid-reveal: show the full text next time.
      if (!finished) onDone();
    };
  }, [active, text, onDone]);

  return active ? text.slice(0, shown) : text;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <button type="button" className={styles.metaBtn} onClick={copy} aria-label={copied ? 'Copied' : 'Copy reply'}>
      {copied ? <CheckIcon size={13} /> : <CopyIcon size={13} />}
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

function BotMessage({ msg, onRevealed }: { msg: ChatMessage; onRevealed: (id: string) => void }) {
  const reduced = useReducedMotion();
  const animate = !!msg.fresh && !reduced;
  const done = useCallback(() => onRevealed(msg.id), [onRevealed, msg.id]);
  const text = useReveal(msg.content, animate, done);
  const revealing = animate && text.length < msg.content.length;

  return (
    <>
      <div className={`${styles.bubble} ${styles.bubbleBot}`}>
        <Markdown text={text} trailing={revealing ? <span className={styles.caret} aria-hidden="true" /> : null} />
      </div>
      <div className={styles.meta} style={{ visibility: revealing ? 'hidden' : 'visible' }}>
        <span>{formatTime(msg.createdAt)}</span>
        <span aria-hidden="true">·</span>
        <CopyButton text={msg.content} />
      </div>
    </>
  );
}

function UserMessage({ msg, last, onRetry, canRetry }: { msg: ChatMessage; last: boolean; onRetry: (id: string) => void; canRetry: boolean }) {
  const failed = msg.status === 'failed';
  return (
    <>
      <div
        className={[styles.bubble, styles.bubbleUser, msg.status === 'sending' ? styles.bubbleSending : '', failed ? styles.bubbleFailed : '']
          .filter(Boolean)
          .join(' ')}
      >
        {msg.content}
      </div>
      {failed ? (
        <div className={styles.failNote} role="alert">
          <span>{msg.error ?? 'Not sent.'}</span>
          <button type="button" className={styles.retryBtn} onClick={() => onRetry(msg.id)} disabled={!canRetry}>
            <RetryIcon size={13} />
            Retry
          </button>
        </div>
      ) : (
        last && <div className={styles.meta}>{msg.status === 'sending' ? 'Sending…' : formatTime(msg.createdAt)}</div>
      )}
    </>
  );
}

function Thinking() {
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setSlow(true), 8000);
    return () => window.clearTimeout(t);
  }, []);
  return (
    <motion.div
      className={`${styles.group} ${styles.groupBot}`}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.12 } }}
      transition={{ duration: 0.25 }}
    >
      <div className={styles.avatarSlot}>
        <AiAvatar size={30} thinking />
      </div>
      <div className={styles.groupBody}>
        <div className={styles.thinking}>
          <span className={styles.shimmerText}>{slow ? 'Still working on it…' : 'Thinking…'}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ───────────────────────────── List ───────────────────────────── */

type Group = { role: ChatMessage['role']; items: ChatMessage[] };

function groupMessages(messages: ChatMessage[]): Group[] {
  const groups: Group[] = [];
  for (const m of messages) {
    const g = groups[groups.length - 1];
    const prev = g?.items[g.items.length - 1];
    if (g && g.role === m.role && prev && m.createdAt - prev.createdAt < 5 * 60_000) g.items.push(m);
    else groups.push({ role: m.role, items: [m] });
  }
  return groups;
}

export function MessageList({
  messages,
  pending,
  expanded,
  profile,
  onPick,
  onRetry,
  onRevealed,
  stickSignal,
}: {
  messages: ChatMessage[];
  pending: boolean;
  expanded: boolean;
  profile: AssistantProfile | null;
  onPick: (q: string) => void;
  onRetry: (id: string) => void;
  onRevealed: (id: string) => void;
  /** Changes whenever the visitor sends: forces a scroll to the latest message. */
  stickSignal: number;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef(true);
  const [showJump, setShowJump] = useState(false);
  const reduced = useReducedMotion();
  // History that is already there when the panel opens appears without animating in.
  const [initialIds] = useState(() => new Set(messages.map((m) => m.id)));

  const toBottom = useCallback((smooth = false) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth && !reduced ? 'smooth' : 'auto' });
  }, [reduced]);

  // Start at the latest message.
  useLayoutEffect(() => {
    toBottom(false);
  }, [toBottom]);

  useEffect(() => {
    stickRef.current = true;
    toBottom(true);
  }, [stickSignal, toBottom]);

  // Follow new content (incl. the word-by-word reveal) while the visitor is at the bottom.
  useEffect(() => {
    const content = contentRef.current;
    if (!content || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      if (stickRef.current) toBottom(false);
      else setShowJump(true);
    });
    ro.observe(content);
    return () => ro.disconnect();
  }, [toBottom]);

  const onScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 72;
    stickRef.current = atBottom;
    setShowJump(!atBottom);
  };

  const groups = groupMessages(messages);
  const lastAssistant = [...messages].reverse().find((m) => m.role === 'assistant');

  return (
    <div className={styles.scrollArea}>
      <div className={styles.scroller} ref={scrollerRef} onScroll={onScroll}>
        <div ref={contentRef} className={`${styles.column} ${expanded ? styles.expandedCol : ''}`}>
          {messages.length === 0 ? (
            <Welcome expanded={expanded} profile={profile} disabled={pending} onPick={onPick} />
          ) : (
            <>
              <div className={styles.startDivider}>Conversation started {formatStart(messages[0].createdAt)}</div>
              {groups.map((g) => (
                <motion.div
                  key={g.items[0].id}
                  className={`${styles.group} ${g.role === 'user' ? styles.groupUser : styles.groupBot}`}
                  initial={reduced || initialIds.has(g.items[0].id) ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  {g.role === 'assistant' && (
                    <div className={styles.avatarSlot}>
                      <AiAvatar size={30} />
                    </div>
                  )}
                  <div className={styles.groupBody}>
                    {g.items.map((m, i) =>
                      m.role === 'assistant' ? (
                        <BotMessage key={m.id} msg={m} onRevealed={onRevealed} />
                      ) : (
                        <UserMessage key={m.id} msg={m} last={i === g.items.length - 1} onRetry={onRetry} canRetry={!pending} />
                      ),
                    )}
                  </div>
                </motion.div>
              ))}
            </>
          )}
          <AnimatePresence>{pending && <Thinking key="thinking" />}</AnimatePresence>
        </div>
      </div>

      {/* Screen readers hear each finished reply once, not the word-by-word reveal. */}
      <div className={styles.srOnly} aria-live="polite" aria-atomic="true">
        {lastAssistant ? `${BRAND.assistantName} said: ${lastAssistant.content}` : ''}
      </div>

      <AnimatePresence>
        {showJump && messages.length > 0 && (
          <motion.button
            type="button"
            className={styles.jump}
            style={{ x: '-50%' }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            onClick={() => {
              stickRef.current = true;
              setShowJump(false);
              toBottom(true);
            }}
          >
            <ArrowDownIcon size={14} />
            Latest messages
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
