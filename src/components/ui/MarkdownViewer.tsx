import { AlertTriangle, CheckSquare, ExternalLink, Info, Square } from 'lucide-preact';
import type { Provider } from '../../data/course';
import {
  parseInlineTokens,
  parseMarkdownBlocks,
  type MarkdownInlineToken,
} from '../../domain/markdownParser';
import { CodeBlock } from './CodeBlock';

export type MarkdownViewerProps = {
  markdown: string;
  provider?: Provider | string;
};

function renderInlines(tokens: MarkdownInlineToken[]) {
  return tokens.map((token, idx) => {
    const key = `${token.type}-${idx}`;
    if (token.type === 'strong') return <strong key={key}>{token.value}</strong>;
    if (token.type === 'em') return <em key={key}>{token.value}</em>;
    if (token.type === 'code')
      return (
        <code key={key} class="md-inline-code">
          {token.value}
        </code>
      );
    if (token.type === 'link') {
      const isExternal = token.href.startsWith('http://') || token.href.startsWith('https://');
      return (
        <a
          key={key}
          href={token.href}
          class="official-link md-link"
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
        >
          {token.label}
          {isExternal && <ExternalLink size={13} />}
        </a>
      );
    }
    return <span key={key}>{token.value}</span>;
  });
}

export function MarkdownViewer({ markdown, provider }: MarkdownViewerProps) {
  const blocks = parseMarkdownBlocks(markdown);

  return (
    <div class="markdown-viewer">
      {blocks.map((block, index) => {
        const blockKey = `${block.type}-${index}`;

        if (block.type === 'hr') {
          return <hr key={blockKey} class="content-divider" />;
        }

        if (block.type === 'heading') {
          const content = renderInlines(block.inlines);
          if (block.level === 1)
            return (
              <h2 key={blockKey} class="md-h1">
                {content}
              </h2>
            );
          if (block.level === 2)
            return (
              <h3 key={blockKey} class="md-h2">
                {content}
              </h3>
            );
          return (
            <h4 key={blockKey} class="md-h3">
              {content}
            </h4>
          );
        }

        if (block.type === 'paragraph') {
          return <p key={blockKey}>{renderInlines(block.inlines)}</p>;
        }

        if (block.type === 'callout') {
          const isWarn = block.kind === 'warning' || block.kind === 'caution';
          return (
            <div key={blockKey} class={`md-callout ${isWarn ? 'md-callout-warn' : ''}`}>
              {isWarn ? <AlertTriangle size={18} /> : <Info size={18} />}
              <div>{renderInlines(block.inlines)}</div>
            </div>
          );
        }

        if (block.type === 'code') {
          return (
            <CodeBlock
              key={blockKey}
              code={block.content}
              language={block.language}
              provider={provider}
            />
          );
        }

        if (block.type === 'table') {
          return (
            <div key={blockKey} class="md-table-scroll">
              <table class="md-table">
                <thead>
                  <tr>
                    {block.headers.map((header, hIdx) => (
                      <th key={`h-${hIdx}`} scope="col">
                        {renderInlines(parseInlineTokens(header))}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {block.rows.map((row, rIdx) => (
                    <tr key={`r-${rIdx}`}>
                      {row.map((cell, cIdx) => (
                        <td key={`c-${cIdx}`}>{renderInlines(parseInlineTokens(cell))}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }

        const ListTag = block.ordered ? 'ol' : 'ul';
        return (
          <ListTag key={blockKey} class="md-list">
            {block.items.map((item, itemIdx) => (
              <li key={`li-${itemIdx}`} class={item.checked !== null ? 'md-check-item' : ''}>
                {item.checked === true && <CheckSquare size={15} aria-hidden="true" />}
                {item.checked === false && <Square size={15} aria-hidden="true" />}
                <span>{renderInlines(item.inlines)}</span>
              </li>
            ))}
          </ListTag>
        );
      })}
    </div>
  );
}
