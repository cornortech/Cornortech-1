/**
 * Thin client for the ChatWithLead public chat API — the same endpoints the
 * official embed script calls from the browser:
 *
 *   POST /key      { clientId }            → assistant profile
 *   POST /message  { message, clientId }   → reply + per-visitor chatKey
 *   GET  /message  (chatKey headers)       → history
 *   POST /end      (chatKey headers)       → ends the visitor's session
 *
 * The chatKey identifies one visitor's conversation. It is not a secret
 * account key, so it is fine to keep it in the browser.
 */
import { CHAT_API_BASE } from './config';

export type ChatErrorCode = 'network' | 'expired' | 'rate_limited' | 'rejected' | 'server';

export class ChatApiError extends Error {
  code: ChatErrorCode;
  status?: number;
  constructor(code: ChatErrorCode, message: string, status?: number) {
    super(message);
    this.code = code;
    this.status = status;
  }
}

export interface AssistantProfile {
  assistantName?: string;
  assistantWelcomeMessage?: string;
  assistantDefaultQuestions: string[];
}

export interface ApiMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: number;
}

type Json = Record<string, unknown>;

const isObj = (v: unknown): v is Json => typeof v === 'object' && v !== null && !Array.isArray(v);
const str = (v: unknown): string | undefined => (typeof v === 'string' && v.trim() ? v : undefined);

function toTime(v: unknown): number {
  const t = typeof v === 'string' || typeof v === 'number' ? new Date(v).getTime() : NaN;
  return Number.isFinite(t) ? t : Date.now();
}

let idCounter = 0;
export const localId = (prefix = 'm') => `${prefix}-${Date.now().toString(36)}-${(idCounter++).toString(36)}`;

async function call(
  path: string,
  init: { method: 'GET' | 'POST'; body?: Json; chatKey?: string | null; signal?: AbortSignal; keepalive?: boolean },
): Promise<Json> {
  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (init.chatKey) {
    headers['x-chat-key'] = init.chatKey;
    headers.Authorization = `Bearer ${init.chatKey}`;
  }

  let res: Response;
  try {
    res = await fetch(`${CHAT_API_BASE}${path}`, {
      method: init.method,
      headers,
      body: init.body ? JSON.stringify(init.body) : undefined,
      signal: init.signal,
      keepalive: init.keepalive,
    });
  } catch (err) {
    if ((err as Error)?.name === 'AbortError') throw err;
    throw new ChatApiError('network', 'network');
  }

  let json: Json = {};
  try {
    const text = await res.text();
    json = text ? (JSON.parse(text) as Json) : {};
  } catch {
    /* non-JSON body: handled by status below */
  }

  const serverMsg = str(json.message) ?? `Request failed (${res.status})`;
  if (!res.ok) {
    if (res.status === 401) throw new ChatApiError('expired', serverMsg, 401);
    if (res.status === 429) throw new ChatApiError('rate_limited', serverMsg, 429);
    if (res.status >= 400 && res.status < 500) throw new ChatApiError('rejected', serverMsg, res.status);
    throw new ChatApiError('server', serverMsg, res.status);
  }
  if (json.success === false || json.data === undefined || json.data === null) {
    throw new ChatApiError('server', serverMsg, res.status);
  }
  return json;
}

function normaliseMessage(raw: unknown, fallbackRole: ApiMessage['role']): ApiMessage | null {
  if (typeof raw === 'string') {
    return raw.trim() ? { id: localId('a'), role: fallbackRole, content: raw, createdAt: Date.now() } : null;
  }
  if (!isObj(raw)) return null;
  const content = str(raw.content) ?? str(raw.text) ?? str(raw.message);
  if (!content) return null;
  const role = typeof raw.role === 'string' ? (raw.role.toUpperCase() === 'ASSISTANT' ? 'assistant' : 'user') : fallbackRole;
  return {
    id: str(raw.id) ?? localId(role === 'assistant' ? 'a' : 'u'),
    role,
    content,
    createdAt: toTime(raw.createdAt),
  };
}

export async function sendMessage(
  message: string,
  opts: { clientId: string; chatKey?: string | null; signal?: AbortSignal },
): Promise<{ reply: ApiMessage; chatKey: string | null }> {
  const json = await call('/message', {
    method: 'POST',
    body: { message, clientId: opts.clientId },
    chatKey: opts.chatKey,
    signal: opts.signal,
  });
  const data = isObj(json.data) ? json.data : {};
  const reply = normaliseMessage(data.message ?? data.reply ?? json.data, 'assistant');
  if (!reply) throw new ChatApiError('server', 'Empty reply');
  return { reply: { ...reply, role: 'assistant' }, chatKey: str(data.chatKey) ?? str(json.chatKey) ?? null };
}

export async function fetchHistory(chatKey: string, signal?: AbortSignal): Promise<ApiMessage[]> {
  const json = await call('/message', { method: 'GET', chatKey, signal });
  const list = Array.isArray(json.data) ? json.data : isObj(json.data) && Array.isArray(json.data.messages) ? json.data.messages : [];
  return list.map((m) => normaliseMessage(m, 'user')).filter((m): m is ApiMessage => m !== null);
}

export async function fetchProfile(clientId: string, signal?: AbortSignal): Promise<AssistantProfile> {
  const json = await call('/key', { method: 'POST', body: { clientId }, signal });
  const d = isObj(json.data) ? json.data : {};
  const questions = Array.isArray(d.assistantDefaultQuestions)
    ? d.assistantDefaultQuestions.map((q) => (typeof q === 'string' ? q.trim() : '')).filter(Boolean)
    : [];
  return {
    assistantName: str(d.assistantName),
    assistantWelcomeMessage: str(d.assistantWelcomeMessage),
    assistantDefaultQuestions: questions,
  };
}

export function endSession(chatKey: string) {
  // keepalive lets this finish even if the visitor navigates away.
  return call('/end', { method: 'POST', chatKey, keepalive: true }).catch(() => undefined);
}
