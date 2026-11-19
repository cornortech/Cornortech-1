/**
 * Cornor Tech AI — chat configuration.
 *
 * The assistant is powered by ChatWithLead. The client ID below is the one
 * from the embed snippet you were given:
 *   <script src="https://widget.chatwithlead.com/index.js?clientId=…">
 * We call the same public API that script uses, but render our own
 * Cornor Tech UI instead of the stock widget.
 *
 * Override it per environment with NEXT_PUBLIC_CHATWITHLEAD_CLIENT_ID.
 */
export const CHAT_CLIENT_ID =
  process.env.NEXT_PUBLIC_CHATWITHLEAD_CLIENT_ID ||
  'yt-wci-3727c9404c5618aa618da726bcc1bd1a632a081cbfb2d774996f6a0e3e1def08';

export const CHAT_API_BASE = 'https://api.chatwithlead.com/api/v1/chat';

export const BRAND = {
  assistantName: 'Cornor Tech AI',
  company: 'Cornor Tech Pvt. Ltd.',
  location: 'Tilottama, Butwal, Nepal',
  welcomeTitle: "Hi, I'm Cornor Tech AI",
  welcomeBody:
    'Ask me about our services, products or how a project with Cornor Tech works. When you are ready, I can point you to the team.',
  teaser: 'Planning a website, app or campaign? Ask me anything about it.',
  disclaimer: 'AI answers can be wrong. Confirm quotes and timelines with our team.',
} as const;

/** Shown when the ChatWithLead dashboard has no default questions set. */
export const FALLBACK_QUESTIONS = [
  'What services does Cornor Tech offer?',
  'Tell me about your POS and restaurant software',
  'How long does a website project take?',
  'How do I get a quote for my project?',
];

/** Quick topics in the full-screen sidebar. Each one sends its prompt. */
export const TOPICS: { label: string; prompt: string }[] = [
  { label: 'Services', prompt: 'What services does Cornor Tech offer?' },
  { label: 'Software products', prompt: 'Which software products does Cornor Tech offer?' },
  { label: 'Pricing & quotes', prompt: 'How do I get a quote for my project?' },
  { label: 'Project timelines', prompt: 'How long does a typical project take?' },
  { label: 'Bulk SMS', prompt: 'Tell me about your bulk SMS service.' },
  { label: 'Careers', prompt: 'Is Cornor Tech hiring right now?' },
];

/** Human hand-off. Hidden automatically when the env vars are not set. */
const rawWhatsApp = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, '');
const rawEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || '';

export const HANDOFF = {
  whatsappUrl: rawWhatsApp ? `https://wa.me/${rawWhatsApp}` : null,
  email: rawEmail || null,
};

export const LIMITS = {
  maxMessageLength: 2000,
  /** Conversations older than this start fresh. */
  sessionTtlMs: 24 * 60 * 60 * 1000,
  /** How many messages we keep in the browser. */
  storedMessages: 80,
};
