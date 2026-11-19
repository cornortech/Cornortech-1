import { Fragment, type ReactNode } from 'react';
import styles from './chat.module.css';

/**
 * Small, safe Markdown renderer for assistant replies. Builds React elements
 * (never injects HTML) and supports what chat replies actually use:
 * paragraphs, line breaks, headings, bullet and numbered lists, code blocks,
 * **bold**, *italic*, `code`, [links](https://…) and bare URLs.
 */

const INLINE =
  /(`[^`\n]+`)|(\*\*[^*\n]+?\*\*)|(\[[^\]\n]+\]\((?:https?:\/\/|mailto:|tel:|\/)[^)\s]*\))|(https?:\/\/[^\s<>()]+[^\s<>().,;:!?'"])|(\*[^*\s\n][^*\n]*?\*)/g;

function safeHref(href: string) {
  return /^(https?:|mailto:|tel:|\/)/i.test(href) ? href : null;
}

function Link({ href, children }: { href: string; children: ReactNode }) {
  const external = /^https?:/i.test(href);
  return (
    <a href={href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
      {children}
    </a>
  );
}

function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(INLINE)) {
    const start = m.index ?? 0;
    if (start > last) out.push(text.slice(last, start));
    const tok = m[0];
    const key = `${keyBase}-${i++}`;
    if (m[1]) out.push(<code key={key}>{tok.slice(1, -1)}</code>);
    else if (m[2]) out.push(<strong key={key}>{inline(tok.slice(2, -2), key)}</strong>);
    else if (m[3]) {
      const sep = tok.indexOf('](');
      const label = tok.slice(1, sep);
      const href = safeHref(tok.slice(sep + 2, -1));
      out.push(href ? <Link key={key} href={href}>{inline(label, key)}</Link> : label);
    } else if (m[4]) out.push(<Link key={key} href={tok}>{tok.replace(/^https?:\/\/(www\.)?/, '')}</Link>);
    else if (m[5]) out.push(<em key={key}>{inline(tok.slice(1, -1), key)}</em>);
    last = start + tok.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function withBreaks(lines: string[], keyBase: string) {
  return lines.map((l, i) => (
    <Fragment key={`${keyBase}-${i}`}>
      {i > 0 && <br />}
      {inline(l, `${keyBase}-${i}`)}
    </Fragment>
  ));
}

type Block =
  | { type: 'p'; lines: string[] }
  | { type: 'h'; text: string }
  | { type: 'ul' | 'ol'; items: string[]; start?: number }
  | { type: 'code'; text: string }
  | { type: 'hr' };

function parse(src: string): Block[] {
  const blocks: Block[] = [];
  const lines = src.replace(/\r\n?/g, '\n').split('\n');
  let para: string[] = [];
  const flush = () => {
    if (para.length) blocks.push({ type: 'p', lines: para });
    para = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith('```')) {
      flush();
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) code.push(lines[i++]);
      blocks.push({ type: 'code', text: code.join('\n') });
      continue;
    }
    if (!trimmed) {
      flush();
      continue;
    }
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      flush();
      blocks.push({ type: 'hr' });
      continue;
    }
    const heading = trimmed.match(/^#{1,6}\s+(.*)$/);
    if (heading) {
      flush();
      blocks.push({ type: 'h', text: heading[1].replace(/\*\*/g, '') });
      continue;
    }
    const bullet = trimmed.match(/^[-*•]\s+(.*)$/);
    const numbered = trimmed.match(/^(\d+)[.)]\s+(.*)$/);
    if (bullet || numbered) {
      flush();
      const type = bullet ? 'ul' : 'ol';
      const prev = blocks[blocks.length - 1];
      const item = bullet ? bullet[1] : numbered![2];
      if (prev && prev.type === type) prev.items.push(item);
      else blocks.push(type === 'ol' ? { type, items: [item], start: Number(numbered![1]) } : { type, items: [item] });
      continue;
    }
    // Continuation line of a list item (indented text right after it).
    const prev = blocks[blocks.length - 1];
    if (!para.length && prev && (prev.type === 'ul' || prev.type === 'ol') && /^\s{2,}/.test(line)) {
      prev.items[prev.items.length - 1] += ` ${trimmed}`;
      continue;
    }
    para.push(trimmed.replace(/^>\s?/, ''));
  }
  flush();
  return blocks;
}

export default function Markdown({ text, trailing }: { text: string; /** Rendered inline at the end of the last block (typing caret). */ trailing?: ReactNode }) {
  const blocks = parse(text);
  const lastIdx = blocks.length - 1;
  return (
    <div className={styles.prose}>
      {blocks.map((b, i) => {
        const k = `b${i}`;
        const tail = i === lastIdx ? trailing : null;
        switch (b.type) {
          case 'p':
            return (
              <p key={k}>
                {withBreaks(b.lines, k)}
                {tail}
              </p>
            );
          case 'h':
            return (
              <p key={k} className={styles.proseHeading}>
                {inline(b.text, k)}
                {tail}
              </p>
            );
          case 'ul':
            return (
              <ul key={k}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    {inline(it, `${k}-${j}`)}
                    {j === b.items.length - 1 && tail}
                  </li>
                ))}
              </ul>
            );
          case 'ol':
            return (
              <ol key={k} start={b.start}>
                {b.items.map((it, j) => (
                  <li key={j}>
                    {inline(it, `${k}-${j}`)}
                    {j === b.items.length - 1 && tail}
                  </li>
                ))}
              </ol>
            );
          case 'code':
            return (
              <pre key={k}>
                <code>{b.text}</code>
              </pre>
            );
          case 'hr':
            return <hr key={k} />;
        }
      })}
    </div>
  );
}
