'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ChatApiError,
  endSession,
  fetchHistory,
  fetchProfile,
  localId,
  sendMessage,
  type AssistantProfile,
} from './api';
import { CHAT_CLIENT_ID, LIMITS } from './config';

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
  /** User messages only. */
  status?: 'sending' | 'failed';
  error?: string;
  /** Assistant messages that should play the reveal animation once. */
  fresh?: boolean;
}

interface Stored {
  chatKey: string | null;
  messages: ChatMessage[];
  updatedAt: number;
}

const STORE_KEY = 'cornor-ai:conversation:v1';
const PROFILE_KEY = `cornor-ai:profile:${CHAT_CLIENT_ID}`;

function readStore(): Stored | null {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as Stored;
    if (!data || Date.now() - data.updatedAt > LIMITS.sessionTtlMs) {
      localStorage.removeItem(STORE_KEY);
      return null;
    }
    return {
      chatKey: data.chatKey ?? null,
      // A reload mid-send leaves a message stuck in "sending": offer a retry instead.
      messages: (data.messages ?? []).map((m) =>
        m.status === 'sending' ? { ...m, status: 'failed', error: 'This message was not sent.' } : { ...m, fresh: false },
      ),
      updatedAt: data.updatedAt,
    };
  } catch {
    return null;
  }
}

function writeStore(chatKey: string | null, messages: ChatMessage[]) {
  try {
    if (!chatKey && messages.length === 0) {
      localStorage.removeItem(STORE_KEY);
      return;
    }
    const payload: Stored = {
      chatKey,
      messages: messages.slice(-LIMITS.storedMessages).map((m) => ({ ...m, fresh: undefined })),
      updatedAt: Date.now(),
    };
    localStorage.setItem(STORE_KEY, JSON.stringify(payload));
  } catch {
    /* storage full or blocked (private mode): the chat still works for this visit */
  }
}

function describeError(err: unknown): string {
  if (err instanceof ChatApiError) {
    switch (err.code) {
      case 'network':
        return "Couldn't reach Cornor Tech AI. Check your connection, then retry.";
      case 'rate_limited':
        return 'Too many messages in a short time. Wait a moment, then retry.';
      case 'rejected':
        return err.message.length < 140 ? err.message : 'This message could not be sent. Retry, or rephrase it.';
      default:
        return "Cornor Tech AI couldn't answer just now. Retry in a moment.";
    }
  }
  return "Cornor Tech AI couldn't answer just now. Retry in a moment.";
}

export function useCornorChat(isOpen: boolean) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [pending, setPending] = useState(false);
  const [profile, setProfile] = useState<AssistantProfile | null>(null);
  const [unread, setUnread] = useState(0);
  const [hydrated, setHydrated] = useState(false);

  const keyRef = useRef<string | null>(null);
  const openRef = useRef(isOpen);
  const abortRef = useRef<AbortController | null>(null);
  const messagesRef = useRef<ChatMessage[]>([]);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    openRef.current = isOpen;
    if (isOpen) setUnread(0);
  }, [isOpen]);

  // Restore the visitor's conversation.
  useEffect(() => {
    const stored = readStore();
    if (stored) {
      keyRef.current = stored.chatKey;
      setMessages(stored.messages);
      if (stored.chatKey && stored.messages.length === 0) {
        fetchHistory(stored.chatKey)
          .then((history) => history.length && setMessages(history))
          .catch(() => {
            keyRef.current = null;
          });
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) writeStore(keyRef.current, messages);
  }, [messages, hydrated]);

  // Assistant profile (welcome text + suggested questions) from the ChatWithLead dashboard.
  useEffect(() => {
    if (!isOpen || profile) return;
    try {
      const cached = sessionStorage.getItem(PROFILE_KEY);
      if (cached) {
        setProfile(JSON.parse(cached));
        return;
      }
    } catch {
      /* ignore */
    }
    const ctrl = new AbortController();
    let cancelled = false;
    // Don't keep the suggestions waiting on a slow network: fall back after 5s.
    const timeout = window.setTimeout(() => ctrl.abort(), 5000);
    fetchProfile(CHAT_CLIENT_ID, ctrl.signal)
      .then((p) => {
        setProfile(p);
        try {
          sessionStorage.setItem(PROFILE_KEY, JSON.stringify(p));
        } catch {
          /* ignore */
        }
      })
      .catch(() => {
        if (!cancelled) setProfile({ assistantDefaultQuestions: [] });
      })
      .finally(() => window.clearTimeout(timeout));
    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      ctrl.abort();
    };
  }, [isOpen, profile]);

  const deliver = useCallback(async (userMsg: ChatMessage) => {
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setPending(true);

    try {
      let result;
      try {
        result = await sendMessage(userMsg.content, {
          clientId: CHAT_CLIENT_ID,
          chatKey: keyRef.current,
          signal: ctrl.signal,
        });
      } catch (err) {
        // Session expired on the server: start a new one and resend once.
        if (err instanceof ChatApiError && err.code === 'expired' && keyRef.current) {
          keyRef.current = null;
          result = await sendMessage(userMsg.content, { clientId: CHAT_CLIENT_ID, chatKey: null, signal: ctrl.signal });
        } else {
          throw err;
        }
      }
      if (result.chatKey) keyRef.current = result.chatKey;
      const reply = result.reply;

      setMessages((prev) => {
        const id = prev.some((m) => m.id === reply.id) ? localId('a') : reply.id;
        return [
          ...prev.map((m) => (m.id === userMsg.id ? { ...m, status: undefined, error: undefined } : m)),
          { ...reply, id, createdAt: Math.max(reply.createdAt, userMsg.createdAt + 1), fresh: true },
        ];
      });
      if (!openRef.current) setUnread((n) => n + 1);
    } catch (err) {
      if ((err as Error)?.name === 'AbortError') return;
      setMessages((prev) =>
        prev.map((m) => (m.id === userMsg.id ? { ...m, status: 'failed', error: describeError(err) } : m)),
      );
    } finally {
      if (abortRef.current === ctrl) {
        abortRef.current = null;
        setPending(false);
      }
    }
  }, []);

  const send = useCallback(
    (text: string) => {
      const content = text.trim().slice(0, LIMITS.maxMessageLength);
      if (!content || pending) return false;
      const msg: ChatMessage = { id: localId('u'), role: 'user', content, createdAt: Date.now(), status: 'sending' };
      setMessages((prev) => [...prev, msg]);
      void deliver(msg);
      return true;
    },
    [deliver, pending],
  );

  const retry = useCallback(
    (id: string) => {
      if (pending) return;
      const target = messagesRef.current.find((m) => m.id === id);
      if (!target) return;
      const again: ChatMessage = { ...target, status: 'sending', error: undefined, createdAt: Date.now() };
      // Move it to the end so the conversation order matches what the server sees.
      setMessages((prev) => [...prev.filter((m) => m.id !== id), again]);
      void deliver(again);
    },
    [deliver, pending],
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setPending(false);
    if (keyRef.current) void endSession(keyRef.current);
    keyRef.current = null;
    setMessages([]);
    setUnread(0);
  }, []);

  const markRevealed = useCallback((id: string) => {
    setMessages((prev) => prev.map((m) => (m.id === id && m.fresh ? { ...m, fresh: false } : m)));
  }, []);

  return { messages, pending, profile, unread, send, retry, reset, markRevealed };
}

export type CornorChat = ReturnType<typeof useCornorChat>;
