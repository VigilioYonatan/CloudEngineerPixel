import type { CodeLanguage } from './commandRisk';

export type MarkdownInlineToken =
  | { type: 'text'; value: string }
  | { type: 'strong'; value: string }
  | { type: 'em'; value: string }
  | { type: 'code'; value: string }
  | { type: 'link'; label: string; href: string };

export type MarkdownListItem = {
  checked: boolean | null;
  inlines: MarkdownInlineToken[];
};

export type MarkdownBlock =
  | { type: 'heading'; level: 1 | 2 | 3 | 4; inlines: MarkdownInlineToken[] }
  | { type: 'paragraph'; inlines: MarkdownInlineToken[] }
  | { type: 'list'; ordered: boolean; items: MarkdownListItem[] }
  | { type: 'callout'; kind: string; inlines: MarkdownInlineToken[] }
  | { type: 'table'; headers: string[]; rows: string[][] }
  | { type: 'code'; language?: CodeLanguage; content: string }
  | { type: 'hr' };

export function sanitizeMarkdownHref(rawHref: string): string | null {
  const trimmed = rawHref.trim();
  if (!trimmed) return null;
  const compact = trimmed.replace(/[\u0000-\u0020]+/g, '').toLowerCase();
  if (
    compact.startsWith('javascript:') ||
    compact.startsWith('data:') ||
    compact.startsWith('vbscript:') ||
    compact.startsWith('file:')
  ) {
    return null;
  }
  if (
    trimmed.startsWith('https://') ||
    trimmed.startsWith('http://') ||
    trimmed.startsWith('/') ||
    trimmed.startsWith('#')
  ) {
    return trimmed;
  }
  return null;
}

const INLINE_TOKEN_REGEX = /(`[^`]+`)|(\*\*[^*]+\*\*)|(\*[^*\n]+\*)|(\[([^\]]+)\]\(([^)]+)\))/g;

export function parseInlineTokens(text: string): MarkdownInlineToken[] {
  const tokens: MarkdownInlineToken[] = [];
  let cursor = 0;

  for (const match of text.matchAll(INLINE_TOKEN_REGEX)) {
    const idx = match.index ?? 0;
    if (idx > cursor) {
      tokens.push({ type: 'text', value: text.slice(cursor, idx) });
    }
    if (match[1]) {
      tokens.push({ type: 'code', value: match[1].slice(1, -1) });
    } else if (match[2]) {
      tokens.push({ type: 'strong', value: match[2].slice(2, -2) });
    } else if (match[3]) {
      tokens.push({ type: 'em', value: match[3].slice(1, -1) });
    } else if (match[4]) {
      const label = match[5] ?? '';
      const safeHref = sanitizeMarkdownHref(match[6] ?? '');
      if (safeHref) {
        tokens.push({ type: 'link', label, href: safeHref });
      } else {
        tokens.push({ type: 'text', value: label });
      }
    }
    cursor = idx + match[0].length;
  }

  if (cursor < text.length) {
    tokens.push({ type: 'text', value: text.slice(cursor) });
  }
  return tokens;
}

function normalizeLanguage(raw: string): CodeLanguage | undefined {
  const clean = raw.trim().toLowerCase();
  if (clean === 'bash' || clean === 'sh' || clean === 'shell') return 'bash';
  if (clean === 'hcl' || clean === 'tf' || clean === 'terraform') return 'hcl';
  if (clean === 'yaml' || clean === 'yml') return 'yaml';
  if (clean === 'json') return 'json';
  if (clean === 'log' || clean === 'text') return 'log';
  return undefined;
}

function splitTableRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((cell) => cell.trim());
}

export function parseMarkdownBlocks(markdown: string): MarkdownBlock[] {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n');
  const blocks: MarkdownBlock[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (!trimmed) {
      i += 1;
      continue;
    }

    if (trimmed.startsWith('```')) {
      const langHint = normalizeLanguage(trimmed.slice(3));
      const codeLines: string[] = [];
      i += 1;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i += 1;
      }
      i += 1;
      blocks.push({ type: 'code', language: langHint, content: codeLines.join('\n') });
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      blocks.push({ type: 'hr' });
      i += 1;
      continue;
    }

    const headingMatch = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (headingMatch) {
      const level = Math.min(4, headingMatch[1].length) as 1 | 2 | 3 | 4;
      blocks.push({ type: 'heading', level, inlines: parseInlineTokens(headingMatch[2]) });
      i += 1;
      continue;
    }

    if (trimmed.startsWith('>')) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith('>')) {
        quoteLines.push(lines[i].trim().replace(/^>\s?/, ''));
        i += 1;
      }
      const combined = quoteLines.join(' ').trim();
      const alertMatch = combined.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(.*)$/i);
      const kind = alertMatch ? alertMatch[1].toLowerCase() : 'note';
      const body = alertMatch ? alertMatch[2] : combined;
      blocks.push({ type: 'callout', kind, inlines: parseInlineTokens(body) });
      continue;
    }

    if (
      trimmed.includes('|') &&
      i + 1 < lines.length &&
      /^\s*\|?[\s:-]+\|[\s|:-]*$/.test(lines[i + 1])
    ) {
      const headers = splitTableRow(trimmed);
      i += 2;
      const rows: string[][] = [];
      while (i < lines.length && lines[i].trim().includes('|')) {
        rows.push(splitTableRow(lines[i]));
        i += 1;
      }
      blocks.push({ type: 'table', headers, rows });
      continue;
    }

    const isUnordered = /^[-*]\s+/.test(trimmed);
    const isOrdered = /^\d+\.\s+/.test(trimmed);
    if (isUnordered || isOrdered) {
      const items: MarkdownListItem[] = [];
      while (i < lines.length) {
        const currentLine = lines[i].trim();
        const itemMatch = isOrdered
          ? currentLine.match(/^\d+\.\s+(.+)$/)
          : currentLine.match(/^[-*]\s+(.+)$/);
        if (itemMatch) {
          const rawItem = itemMatch[1];
          const checkMatch = rawItem.match(/^\[( |x|X)\]\s+(.+)$/);
          items.push({
            checked: checkMatch ? checkMatch[1].toLowerCase() === 'x' : null,
            inlines: parseInlineTokens(checkMatch ? checkMatch[2] : rawItem),
          });
          i += 1;
        } else if (/^\s{2,}[-*]\s+(.+)$/.test(lines[i])) {
          const subText = lines[i].trim().replace(/^[-*]\s+/, '');
          const last = items[items.length - 1];
          if (last) {
            last.inlines.push({ type: 'text', value: ` — ${subText}` });
          }
          i += 1;
        } else {
          break;
        }
      }
      blocks.push({ type: 'list', ordered: isOrdered, items });
      continue;
    }

    const paraLines: string[] = [trimmed];
    i += 1;
    while (
      i < lines.length &&
      lines[i].trim() &&
      !lines[i].trim().startsWith('#') &&
      !lines[i].trim().startsWith('```') &&
      !lines[i].trim().startsWith('>') &&
      !/^(?:[-*]|\d+\.)\s+/.test(lines[i].trim())
    ) {
      paraLines.push(lines[i].trim());
      i += 1;
    }
    blocks.push({ type: 'paragraph', inlines: parseInlineTokens(paraLines.join(' ')) });
  }

  return blocks;
}
