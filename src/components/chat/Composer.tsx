'use client';

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { ArrowUpIcon, MailIcon, MicIcon, WhatsAppIcon } from './icons';
import { BRAND, HANDOFF, LIMITS } from './config';
import styles from './chat.module.css';

/* Minimal typing for the Web Speech API (not in TS's DOM lib everywhere). */
interface SpeechRecognitionLike {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((e: { results: ArrayLike<ArrayLike<{ transcript: string }> & { isFinal: boolean }> }) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
  start: () => void;
  stop: () => void;
}
type SpeechCtor = new () => SpeechRecognitionLike;

function getSpeechCtor(): SpeechCtor | null {
  if (typeof window === 'undefined') return null;
  const w = window as unknown as { SpeechRecognition?: SpeechCtor; webkitSpeechRecognition?: SpeechCtor };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

export interface ComposerHandle {
  focus: () => void;
}

interface ComposerProps {
  expanded: boolean;
  /** False when the full-screen sidebar already shows the contact options. */
  showHandoff: boolean;
  busy: boolean;
  onSend: (text: string) => boolean;
}

const Composer = forwardRef<ComposerHandle, ComposerProps>(function Composer({ expanded, showHandoff, busy, onSend }, ref) {
  const [text, setText] = useState('');
  const [listening, setListening] = useState(false);
  const [speechOk, setSpeechOk] = useState(false);
  const [finePointer, setFinePointer] = useState(true);
  const taRef = useRef<HTMLTextAreaElement>(null);
  const recRef = useRef<SpeechRecognitionLike | null>(null);
  const baseRef = useRef('');

  useImperativeHandle(ref, () => ({ focus: () => taRef.current?.focus() }), []);

  useEffect(() => {
    // Feature detection has to wait for the browser.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSpeechOk(!!getSpeechCtor());
    setFinePointer(window.matchMedia('(pointer: fine)').matches);
    return () => recRef.current?.stop();
  }, []);

  // Grow with the text, up to the CSS max-height.
  useEffect(() => {
    const ta = taRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${ta.scrollHeight}px`;
  }, [text, expanded]);

  const length = text.trim().length;
  const over = length > LIMITS.maxMessageLength;
  const canSend = length > 0 && !over && !busy;

  const submit = () => {
    if (!canSend) return;
    recRef.current?.stop();
    if (onSend(text)) setText('');
  };

  const toggleMic = () => {
    if (listening) {
      recRef.current?.stop();
      return;
    }
    const Ctor = getSpeechCtor();
    if (!Ctor) return;
    const rec = new Ctor();
    rec.lang = document.documentElement.lang === 'ne' ? 'ne-NP' : navigator.language || 'en-US';
    rec.interimResults = true;
    rec.continuous = false;
    baseRef.current = text ? `${text.trimEnd()} ` : '';
    rec.onresult = (e) => {
      let transcript = '';
      for (let i = 0; i < e.results.length; i++) transcript += e.results[i][0].transcript;
      setText(baseRef.current + transcript);
    };
    rec.onend = () => {
      setListening(false);
      recRef.current = null;
      taRef.current?.focus();
    };
    rec.onerror = () => setListening(false);
    recRef.current = rec;
    try {
      rec.start();
      setListening(true);
    } catch {
      setListening(false);
    }
  };

  const handoff = !showHandoff
    ? null
    : HANDOFF.whatsappUrl
    ? { href: HANDOFF.whatsappUrl, label: 'Talk to a person', icon: <WhatsAppIcon size={13} /> }
    : HANDOFF.email
      ? { href: `mailto:${HANDOFF.email}`, label: 'Email our team', icon: <MailIcon size={13} /> }
      : null;

  return (
    <div className={`${styles.composerWrap} ${expanded ? styles.expandedComposer : ''}`}>
      <form
        className={styles.composer}
        onSubmit={(e) => {
          e.preventDefault();
          submit();
        }}
      >
        <label htmlFor="cornor-ai-input" className={styles.srOnly}>
          Message {BRAND.assistantName}
        </label>
        <textarea
          id="cornor-ai-input"
          ref={taRef}
          className={styles.textarea}
          rows={1}
          value={text}
          placeholder={listening ? 'Listening…' : 'Ask about services or pricing…'}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            // Enter sends on keyboards; on touch screens Enter adds a line and the button sends.
            // isComposing keeps IME input (e.g. Devanagari) from sending half-typed words.
            if (e.key === 'Enter' && !e.shiftKey && !e.nativeEvent.isComposing && finePointer) {
              e.preventDefault();
              submit();
            }
          }}
          enterKeyHint="send"
          autoComplete="off"
          aria-describedby="cornor-ai-hint"
        />
        <div className={styles.composerActions}>
          {speechOk && (
            <button
              type="button"
              className={`${styles.micBtn} ${listening ? styles.micOn : ''}`}
              onClick={toggleMic}
              aria-pressed={listening}
              aria-label={listening ? 'Stop dictation' : 'Dictate a message'}
              title={listening ? 'Stop dictation' : 'Dictate a message'}
            >
              <MicIcon size={18} />
            </button>
          )}
          <button
            type="submit"
            className={styles.sendBtn}
            disabled={!canSend}
            aria-label={busy ? 'Wait for the reply before sending' : 'Send message'}
            title={busy ? 'Wait for the reply before sending' : 'Send message'}
          >
            <ArrowUpIcon size={18} />
          </button>
        </div>
      </form>

      <div className={`${styles.composerFoot} ${expanded && !handoff ? styles.footCenter : ''}`} id="cornor-ai-hint">
        {length > LIMITS.maxMessageLength * 0.8 ? (
          <span className={`${styles.counter} ${over ? styles.counterOver : ''}`}>
            {length.toLocaleString()} / {LIMITS.maxMessageLength.toLocaleString()} characters
          </span>
        ) : expanded && finePointer ? (
          <span>Enter to send · Shift + Enter for a new line · {BRAND.disclaimer}</span>
        ) : (
          <span>{BRAND.disclaimer}</span>
        )}
        {handoff && (
          <a href={handoff.href} target="_blank" rel="noopener noreferrer">
            {handoff.icon}
            {handoff.label}
          </a>
        )}
      </div>
    </div>
  );
});

export default Composer;
