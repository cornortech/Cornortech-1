'use client';

import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AiAvatar } from './CornorMark';
import Composer, { type ComposerHandle } from './Composer';
import { MessageList } from './Messages';
import { ArrowUpRightIcon, ChevronDownIcon, CloseIcon, CollapseIcon, ExpandIcon, MailIcon, NewChatIcon, WhatsAppIcon } from './icons';
import { BRAND, HANDOFF, TOPICS } from './config';
import type { CornorChat } from './useCornorChat';
import styles from './chat.module.css';

export type PanelMode = 'floating' | 'expanded';

interface ChatPanelProps {
  chat: CornorChat;
  mode: PanelMode;
  isMobile: boolean;
  isWide: boolean;
  onClose: () => void;
  onModeChange: (mode: PanelMode) => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function statusText(pending: boolean) {
  return pending ? 'Thinking…' : 'Online · Replies in seconds';
}

/* ───────────────────────────── Header ───────────────────────────── */

function Header({
  variant,
  title,
  mode,
  isMobile,
  pending,
  showNew,
  onNew,
  onModeChange,
  onClose,
}: {
  variant: 'ink' | 'light';
  title: string;
  mode: PanelMode;
  isMobile: boolean;
  pending: boolean;
  showNew: boolean;
  onNew: () => void;
  onModeChange: (m: PanelMode) => void;
  onClose: () => void;
}) {
  return (
    <header className={`${styles.header} ${variant === 'light' ? styles.headerLight : ''}`}>
      {variant === 'ink' && <AiAvatar size={40} online thinking={pending} />}
      <div className={styles.headerText}>
        <h2 className={styles.headerName} id="cornor-ai-title">
          {title}
        </h2>
        <span className={styles.headerStatus}>
          <span className={styles.statusDot} aria-hidden="true" />
          <span aria-live="polite">{statusText(pending)}</span>
        </span>
      </div>
      <div className={styles.headerActions}>
        {showNew && (
          <button type="button" className={styles.iconBtn} onClick={onNew} aria-label="New conversation" title="New conversation">
            <NewChatIcon size={18} />
          </button>
        )}
        {mode === 'floating' ? (
          <button
            type="button"
            className={`${styles.iconBtn} ${styles.hideMobile}`}
            onClick={() => onModeChange('expanded')}
            aria-label="Open full screen"
            title="Open full screen"
          >
            <ExpandIcon size={17} />
          </button>
        ) : (
          !isMobile && (
            <button
              type="button"
              className={styles.iconBtn}
              onClick={() => onModeChange('floating')}
              aria-label="Exit full screen"
              title="Exit full screen"
            >
              <CollapseIcon size={17} />
            </button>
          )
        )}
        <button
          type="button"
          className={styles.iconBtn}
          onClick={onClose}
          aria-label={mode === 'floating' ? 'Minimize chat' : 'Close chat'}
          title={mode === 'floating' ? 'Minimize chat' : 'Close chat'}
        >
          {mode === 'floating' && !isMobile ? <ChevronDownIcon size={20} /> : <CloseIcon size={19} />}
        </button>
      </div>
    </header>
  );
}

/* ───────────────────────────── Sidebar (full screen, wide screens) ───────────────────────────── */

function Sidebar({ pending, hasMessages, onNew, onTopic }: { pending: boolean; hasMessages: boolean; onNew: () => void; onTopic: (p: string) => void }) {
  return (
    <aside className={styles.sidebar} aria-label="Cornor Tech AI shortcuts">
      <div className={styles.sideBrand}>
        <AiAvatar size={44} online thinking={pending} />
        <div>
          <p className={styles.sideName}>{BRAND.assistantName}</p>
          <p className={styles.sideSub}>AI assistant by Cornor Tech</p>
        </div>
      </div>

      <button type="button" className={styles.sideNew} onClick={onNew} disabled={!hasMessages && !pending}>
        <NewChatIcon size={17} />
        New conversation
      </button>

      <p className={styles.sideLabel} id="cornor-ai-topics">
        Ask about
      </p>
      <ul className={styles.sideTopics} aria-labelledby="cornor-ai-topics">
        {TOPICS.map((t) => (
          <li key={t.label}>
            <button type="button" className={styles.sideTopic} onClick={() => onTopic(t.prompt)} disabled={pending} title={t.prompt}>
              {t.label}
              <ArrowUpRightIcon size={15} />
            </button>
          </li>
        ))}
      </ul>

      {(HANDOFF.whatsappUrl || HANDOFF.email) && (
        <div className={styles.sideHuman}>
          <p className={styles.sideHumanTitle}>Prefer a person?</p>
          <p className={styles.sideHumanText}>Our team in Butwal replies during business hours.</p>
          <div className={styles.sideHumanLinks}>
            {HANDOFF.whatsappUrl && (
              <a className={styles.sideHumanLink} href={HANDOFF.whatsappUrl} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon size={16} />
                Chat on WhatsApp
              </a>
            )}
            {HANDOFF.email && (
              <a className={styles.sideHumanLink} href={`mailto:${HANDOFF.email}`}>
                <MailIcon size={16} />
                {HANDOFF.email}
              </a>
            )}
          </div>
        </div>
      )}
      <p className={styles.sideFoot} style={HANDOFF.whatsappUrl || HANDOFF.email ? undefined : { marginTop: 'auto' }}>
        {BRAND.company} · {BRAND.location}
      </p>
    </aside>
  );
}

/* ───────────────────────────── Panel ───────────────────────────── */

export default function ChatPanel({ chat, mode, isMobile, isWide, onClose, onModeChange }: ChatPanelProps) {
  const reduced = useReducedMotion();
  const panelRef = useRef<HTMLElement>(null);
  const composerRef = useRef<ComposerHandle>(null);
  const [stickSignal, setStickSignal] = useState(0);

  const expanded = mode === 'expanded' && !isMobile;
  const withSidebar = expanded && isWide;
  const modal = expanded || isMobile;

  // Put the cursor in the input on open and after switching modes (keyboard/mouse users only:
  // on phones this would pop the keyboard over the welcome screen).
  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) {
      const t = window.setTimeout(() => composerRef.current?.focus(), 60);
      return () => window.clearTimeout(t);
    }
  }, [mode]);

  const send = (text: string) => {
    const ok = chat.send(text);
    if (ok) {
      setStickSignal((n) => n + 1);
      // A tapped suggestion disappears with the welcome screen; keep focus in the dialog.
      if (window.matchMedia('(pointer: fine)').matches) composerRef.current?.focus();
    }
    return ok;
  };

  // Escape: leave full screen, or minimize. Also works when focus fell back to the page body.
  useEffect(() => {
    const onDocKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Escape' || e.defaultPrevented) return;
      const active = document.activeElement;
      const inside = !!active && !!panelRef.current?.contains(active);
      if (!inside && active && active !== document.body) return; // visitor is using the page
      e.preventDefault();
      if (expanded) onModeChange('floating');
      else onClose();
    };
    document.addEventListener('keydown', onDocKey);
    return () => document.removeEventListener('keydown', onDocKey);
  }, [expanded, onClose, onModeChange]);

  const newConversation = () => {
    chat.reset();
    composerRef.current?.focus();
  };

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    // Keep Tab inside the dialog while it covers the page.
    if (e.key === 'Tab' && modal && panelRef.current) {
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  };

  const firstUser = chat.messages.find((m) => m.role === 'user');
  const lightTitle = firstUser ? firstUser.content.replace(/\s+/g, ' ').slice(0, 80) : 'New conversation';

  const hidden = isMobile ? { opacity: 0, y: 32 } : expanded ? { opacity: 0, scale: 0.97 } : { opacity: 0, y: 16, scale: 0.96 };
  const radius = isMobile ? 0 : expanded ? 28 : 24;

  return (
    <motion.section
      ref={panelRef}
      layout={!reduced}
      id="cornor-ai-panel"
      role="dialog"
      aria-modal={modal || undefined}
      aria-labelledby="cornor-ai-title"
      className={`${styles.panel} ${expanded ? styles.expanded : styles.floating}`}
      style={{ borderRadius: radius, transformOrigin: expanded ? '50% 50%' : '100% 100%' }}
      initial={reduced ? { opacity: 0 } : hidden}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { ...hidden, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
      transition={{
        default: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
        layout: { type: 'spring', stiffness: 360, damping: 36, mass: 0.9 },
      }}
      onKeyDown={onKeyDown}
    >
      {/* position-only: content keeps its real size while the frame morphs around it */}
      <motion.div layout={reduced ? false : 'position'} className={styles.inner}>
        {withSidebar && <Sidebar pending={chat.pending} hasMessages={chat.messages.length > 0} onNew={newConversation} onTopic={send} />}
        <div className={styles.main}>
          <Header
            variant={withSidebar ? 'light' : 'ink'}
            title={withSidebar ? lightTitle : BRAND.assistantName}
            mode={expanded ? 'expanded' : 'floating'}
            isMobile={isMobile}
            pending={chat.pending}
            showNew={!withSidebar && chat.messages.length > 0}
            onNew={newConversation}
            onModeChange={onModeChange}
            onClose={onClose}
          />
          <MessageList
            messages={chat.messages}
            pending={chat.pending}
            expanded={expanded}
            profile={chat.profile}
            onPick={send}
            onRetry={chat.retry}
            onRevealed={chat.markRevealed}
            stickSignal={stickSignal}
          />
          <Composer ref={composerRef} expanded={expanded} showHandoff={!withSidebar} busy={chat.pending} onSend={send} />
        </div>
      </motion.div>
    </motion.section>
  );
}
