'use client';

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import CornorMark, { AiAvatar } from './CornorMark';
import { ChevronDownIcon, CloseIcon } from './icons';
import { BRAND } from './config';
import { useCornorChat } from './useCornorChat';
import type { PanelMode } from './ChatPanel';
import styles from './chat.module.css';

/*
 * Cornor Tech AI chat.
 *
 * The launcher is tiny and ships with every page; the panel (conversation,
 * markdown, composer) is a separate chunk that is prefetched when the
 * browser is idle, so the first open is instant without slowing page load.
 *
 * Other components can open it:
 *   window.dispatchEvent(new CustomEvent('openChatWidget', {
 *     detail: { expanded: true, message: 'Tell me about Artha POS' },
 *   }));
 */
const loadPanel = () => import('./ChatPanel');
const ChatPanel = dynamic(loadPanel, { ssr: false });

const MODE_KEY = 'cornor-ai:mode';
const TEASER_KEY = 'cornor-ai:teaser-seen';

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query);
      mql.addEventListener('change', cb);
      return () => mql.removeEventListener('change', cb);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

type View = 'closed' | PanelMode;

export default function ChatWidget() {
  const [view, setView] = useState<View>('closed');
  const [teaser, setTeaser] = useState(false);
  const isOpen = view !== 'closed';
  const chat = useCornorChat(isOpen);
  const isMobile = useMediaQuery('(max-width: 639.98px)');
  const isWide = useMediaQuery('(min-width: 1024px)');
  const reduced = useReducedMotion();
  const launcherRef = useRef<HTMLButtonElement>(null);
  const pendingMessage = useRef<string | null>(null);

  const open = useCallback((mode?: PanelMode) => {
    let next: PanelMode = mode ?? 'floating';
    if (!mode) {
      try {
        next = (sessionStorage.getItem(MODE_KEY) as PanelMode) || 'floating';
      } catch {
        /* ignore */
      }
    }
    setTeaser(false);
    try {
      localStorage.setItem(TEASER_KEY, '1');
    } catch {
      /* ignore */
    }
    setView(next);
  }, []);

  const close = useCallback(() => {
    setView('closed');
    window.setTimeout(() => launcherRef.current?.focus(), 0);
  }, []);

  const changeMode = useCallback((mode: PanelMode) => {
    try {
      sessionStorage.setItem(MODE_KEY, mode);
    } catch {
      /* ignore */
    }
    setView(mode);
  }, []);

  // Prefetch the panel once the page is idle.
  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number };
    if (w.requestIdleCallback) w.requestIdleCallback(() => void loadPanel(), { timeout: 4000 });
    else window.setTimeout(() => void loadPanel(), 2500);
  }, []);

  // Public "open the chat" event (kept from the previous widget).
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<{ expanded?: boolean; message?: string } | undefined>).detail;
      if (detail?.message) pendingMessage.current = detail.message;
      open(detail?.expanded ? 'expanded' : undefined);
    };
    window.addEventListener('openChatWidget', handler);
    return () => window.removeEventListener('openChatWidget', handler);
  }, [open]);

  const { send } = chat;
  useEffect(() => {
    if (isOpen && pendingMessage.current) {
      send(pendingMessage.current);
      pendingMessage.current = null;
    }
  }, [isOpen, send]);

  // A one-time hello for first-time visitors on larger screens.
  useEffect(() => {
    if (isMobile || isOpen) return;
    let seen = true;
    try {
      seen = !!localStorage.getItem(TEASER_KEY) || !!localStorage.getItem('cornor-ai:conversation:v1');
    } catch {
      /* ignore */
    }
    if (seen) return;
    const t = window.setTimeout(() => setTeaser(true), 7000);
    return () => window.clearTimeout(t);
  }, [isMobile, isOpen]);

  const dismissTeaser = () => {
    setTeaser(false);
    try {
      localStorage.setItem(TEASER_KEY, '1');
    } catch {
      /* ignore */
    }
  };

  const covering = isOpen && (isMobile || view === 'expanded');

  // Lock page scroll while the chat covers the page.
  useEffect(() => {
    if (!covering) return;
    const html = document.documentElement;
    const prev = { overflow: html.style.overflow, paddingRight: html.style.paddingRight };
    const gap = window.innerWidth - html.clientWidth;
    html.style.overflow = 'hidden';
    if (gap > 0) html.style.paddingRight = `${gap}px`;
    return () => {
      html.style.overflow = prev.overflow;
      html.style.paddingRight = prev.paddingRight;
    };
  }, [covering]);

  // Phones: size the panel to the visible area so the on-screen keyboard never hides the input.
  useEffect(() => {
    if (!(isOpen && isMobile) || !window.visualViewport) return;
    const vv = window.visualViewport;
    const html = document.documentElement;
    const update = () => {
      html.style.setProperty('--ct-vvh', `${vv.height}px`);
      html.style.setProperty('--ct-vvt', `${vv.offsetTop}px`);
    };
    update();
    vv.addEventListener('resize', update);
    vv.addEventListener('scroll', update);
    return () => {
      vv.removeEventListener('resize', update);
      vv.removeEventListener('scroll', update);
      html.style.removeProperty('--ct-vvh');
      html.style.removeProperty('--ct-vvt');
    };
  }, [isOpen, isMobile]);

  const showLauncher = !covering;
  const launcherLabel = isOpen ? 'Minimize Cornor Tech AI chat' : `Chat with ${BRAND.assistantName}`;

  return (
    <div className={styles.root}>
      <AnimatePresence>
        {isOpen && view === 'expanded' && !isMobile && (
          <motion.div
            key="scrim"
            className={styles.scrim}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => changeMode('floating')}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <ChatPanel
            key="panel"
            chat={chat}
            mode={view === 'expanded' ? 'expanded' : 'floating'}
            isMobile={isMobile}
            isWide={isWide}
            onClose={close}
            onModeChange={changeMode}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {teaser && !isOpen && (
          <motion.div
            key="teaser"
            className={styles.teaser}
            role="status"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, transition: { duration: 0.15 } }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ transformOrigin: '100% 100%' }}
          >
            <AiAvatar size={34} />
            <button type="button" className={styles.teaserBody} onClick={() => open()}>
              <span className={styles.teaserName}>{BRAND.assistantName}</span>
              <span className={styles.teaserText}>{BRAND.teaser}</span>
            </button>
            <button type="button" className={styles.teaserClose} onClick={dismissTeaser} aria-label="Dismiss">
              <CloseIcon size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLauncher && (
          <motion.button
            key="launcher"
            ref={launcherRef}
            type="button"
            className={styles.launcher}
            onClick={() => (isOpen ? close() : open())}
            onPointerEnter={() => void loadPanel()}
            onFocus={() => void loadPanel()}
            aria-label={launcherLabel}
            title={launcherLabel}
            aria-expanded={isOpen}
            aria-controls={isOpen ? 'cornor-ai-panel' : undefined}
            initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6, transition: { duration: 0.15 } }}
            whileHover={reduced ? undefined : { y: -2 }}
            whileTap={{ scale: 0.94 }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          >
            <AnimatePresence initial={false} mode="popLayout">
              {isOpen ? (
                <motion.span
                  key="close"
                  className={styles.launcherIcon}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronDownIcon size={26} />
                </motion.span>
              ) : (
                <motion.span
                  key="mark"
                  className={styles.launcherIcon}
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  <CornorMark size={30} thinking={chat.pending} />
                </motion.span>
              )}
            </AnimatePresence>
            {chat.unread > 0 && !isOpen && (
              <span className={styles.badge} aria-label={`${chat.unread} new ${chat.unread === 1 ? 'reply' : 'replies'}`}>
                {chat.unread}
              </span>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
