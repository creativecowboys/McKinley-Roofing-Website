import { Fragment, type ReactNode } from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import type { Token, Tokens } from 'marked';
import { sitePath } from '@/lib/blog-posts';

/**
 * Renders a Markdown post body (marked's lexer tokens) as React, in the same styles as the
 * hand-built insurance-claims post: red check-mark bullets, numbered badges for ordered
 * lists, the bordered lead paragraph, site links through next/link. No HTML strings and no
 * dangerouslySetInnerHTML; raw HTML in Markdown is rejected at build (lib/blog-posts.ts).
 */

type Tone = 'light' | 'dark';

const ENTITIES: Record<string, string> = { '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"', '&#39;': "'", '&nbsp;': ' ' };
const decode = (s: string) => s.replace(/&(?:amp|lt|gt|quot|#39|nbsp);/g, (e) => ENTITIES[e] ?? e);

function plainText(tokens: Token[] | undefined): string {
  if (!tokens) return '';
  return tokens
    .map((t) => {
      const c = t as Token & { tokens?: Token[]; text?: string };
      return c.tokens ? plainText(c.tokens) : decode(c.text ?? '');
    })
    .join('');
}

function SiteLink({ href, tone, children }: { href: string; tone: Tone; children: ReactNode }) {
  const cls =
    tone === 'dark'
      ? 'text-white font-semibold underline underline-offset-2 hover:text-red-200'
      : 'text-red-600 font-semibold hover:underline';
  if (/^(tel:|mailto:)/i.test(href)) {
    return <a href={href} className={cls}>{children}</a>;
  }
  const internal = sitePath(href);
  if (internal !== null) {
    return <Link href={href.startsWith('/') ? href : internal} className={cls}>{children}</Link>;
  }
  return (
    <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

function inline(tokens: Token[] | undefined, tone: Tone): ReactNode {
  if (!tokens) return null;
  return tokens.map((t, i) => <Fragment key={i}>{inlineToken(t, tone)}</Fragment>);
}

function inlineToken(t: Token, tone: Tone): ReactNode {
  switch (t.type) {
    case 'text': {
      const tt = t as Tokens.Text;
      return tt.tokens ? inline(tt.tokens, tone) : decode(tt.text);
    }
    case 'escape':
      return (t as Tokens.Escape).text;
    case 'strong':
      return <strong className={tone === 'dark' ? 'text-white' : 'text-slate-900'}>{inline((t as Tokens.Strong).tokens, tone)}</strong>;
    case 'em':
      return <em>{inline((t as Tokens.Em).tokens, tone)}</em>;
    case 'del':
      return <del>{inline((t as Tokens.Del).tokens, tone)}</del>;
    case 'codespan':
      return <code className="bg-slate-100 text-slate-800 rounded px-1.5 py-0.5 text-[0.9em]">{decode((t as Tokens.Codespan).text)}</code>;
    case 'br':
      return <br />;
    case 'link': {
      const l = t as Tokens.Link;
      return <SiteLink href={l.href} tone={tone}>{inline(l.tokens, tone)}</SiteLink>;
    }
    case 'image': {
      const im = t as Tokens.Image;
      return <img src={im.href} alt={im.text} loading="lazy" className="rounded-2xl w-full my-10" />;
    }
    default:
      return null;
  }
}

/** "[CONFIRM WITH ...: question. If yes, keep this sentence: "..." If no, delete it.]" */
const CONFIRM_RE = /^\s*\[\s*CONFIRM\b/i;

function ConfirmNote({ text }: { text: string }) {
  const inner = text.trim().replace(/^\[/, '').replace(/\]$/, '');
  const sentence = /keep this sentence:\s*["“]([^"”]+)["”]/i.exec(inner)?.[1];
  const question = inner
    .replace(/^CONFIRM( WITH [^:]+)?:\s*/i, '')
    .split(/\s+If yes\b/i)[0]
    .trim();
  return (
    <div className="mb-5 rounded-xl border-2 border-dashed border-amber-400 bg-amber-50 p-5">
      <p className="text-xs font-bold uppercase tracking-widest text-amber-800 mb-2">
        Needs confirmation before publishing{question ? `: ${question}` : ''}
      </p>
      <p className="text-slate-700 leading-relaxed">
        {sentence ? <mark className="bg-yellow-200 text-slate-900 px-1 rounded">{sentence}</mark> : inner}
      </p>
    </div>
  );
}

function ListItemContent({ item, tone }: { item: Tokens.ListItem; tone: Tone }) {
  return (
    <>
      {item.tokens.map((t, i) => {
        if (t.type === 'text' || t.type === 'paragraph') {
          return <Fragment key={i}>{inline((t as Tokens.Text).tokens ?? [t], tone)}</Fragment>;
        }
        if (t.type === 'space') return null;
        return <div key={i} className="mt-3">{block(t, tone, false)}</div>;
      })}
    </>
  );
}

function block(t: Token, tone: Tone, lead: boolean): ReactNode {
  switch (t.type) {
    case 'space':
    case 'def':
      return null;
    case 'heading': {
      const h = t as Tokens.Heading;
      if (h.depth <= 2) return <h2 className="text-3xl font-extrabold text-slate-900 mt-14 mb-5">{inline(h.tokens, tone)}</h2>;
      if (h.depth === 3) return <h3 className="text-2xl font-bold text-slate-900 mt-10 mb-4">{inline(h.tokens, tone)}</h3>;
      return <h4 className="text-xl font-bold text-slate-900 mt-8 mb-3">{inline(h.tokens, tone)}</h4>;
    }
    case 'paragraph': {
      const p = t as Tokens.Paragraph;
      if (CONFIRM_RE.test(p.text)) return <ConfirmNote text={plainText(p.tokens)} />;
      if (tone === 'dark') return <p className="text-slate-300 max-w-2xl mx-auto mb-6 leading-relaxed">{inline(p.tokens, tone)}</p>;
      if (lead) {
        return (
          <p className="text-xl text-slate-700 leading-relaxed mb-10 font-medium border-l-4 border-red-600 pl-6">
            {inline(p.tokens, tone)}
          </p>
        );
      }
      // A paragraph that is entirely italic is a note (e.g. the "general information" disclaimer).
      if (p.tokens.length === 1 && p.tokens[0].type === 'em') {
        return <p className="text-slate-400 text-sm leading-relaxed mt-8 mb-8 italic">{inline((p.tokens[0] as Tokens.Em).tokens, tone)}</p>;
      }
      return <p className="text-slate-600 leading-relaxed mb-5">{inline(p.tokens, tone)}</p>;
    }
    case 'text': {
      const tt = t as Tokens.Text;
      return <p className="text-slate-600 leading-relaxed mb-5">{tt.tokens ? inline(tt.tokens, tone) : decode(tt.text)}</p>;
    }
    case 'list': {
      const l = t as Tokens.List;
      if (l.ordered) {
        const start = typeof l.start === 'number' ? l.start : 1;
        return (
          <ol className="space-y-3 mb-10" start={start}>
            {l.items.map((item, i) => (
              <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
                <span className="w-7 h-7 rounded-full bg-red-600 text-white text-sm font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {start + i}
                </span>
                <span>
                  <ListItemContent item={item} tone={tone} />
                </span>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ul className="space-y-3 mb-10">
          {l.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-slate-600 leading-relaxed">
              <CheckCircle2 size={22} className="text-red-600 shrink-0 mt-0.5" aria-hidden="true" />
              <span>
                <ListItemContent item={item} tone={tone} />
              </span>
            </li>
          ))}
        </ul>
      );
    }
    case 'blockquote': {
      const q = t as Tokens.Blockquote;
      return (
        <blockquote className="border-l-4 border-red-600 pl-6 text-xl text-slate-700 leading-relaxed font-medium mb-10">
          {q.tokens.map((c, i) =>
            c.type === 'paragraph' ? (
              <p key={i} className="mb-3 last:mb-0">{inline((c as Tokens.Paragraph).tokens, tone)}</p>
            ) : (
              <Fragment key={i}>{block(c, tone, false)}</Fragment>
            ),
          )}
        </blockquote>
      );
    }
    case 'hr':
      return <hr className="my-12 border-slate-200" />;
    case 'code':
      return (
        <pre className="bg-slate-50 border border-slate-100 rounded-xl p-6 overflow-x-auto mb-10 text-sm text-slate-800">
          <code>{(t as Tokens.Code).text}</code>
        </pre>
      );
    case 'table': {
      const tb = t as Tokens.Table;
      return (
        <div className="overflow-x-auto mb-10">
          <table className="w-full text-left text-slate-600 border-collapse">
            <thead>
              <tr>
                {tb.header.map((c, i) => (
                  <th key={i} className="font-bold text-slate-900 border-b-2 border-slate-200 py-3 pr-4">{inline(c.tokens, tone)}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tb.rows.map((r, ri) => (
                <tr key={ri}>
                  {r.map((c, ci) => (
                    <td key={ci} className="border-b border-slate-100 py-3 pr-4 align-top">{inline(c.tokens, tone)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    default:
      return null;
  }
}

/** Inline Markdown only (e.g. a heading's text), with no wrapping block element. */
export function BlogInline({ tokens, tone = 'light' }: { tokens: Token[]; tone?: Tone }) {
  return <>{inline(tokens, tone)}</>;
}

export default function BlogMarkdown({ tokens, tone = 'light', leadFirstParagraph = false }: { tokens: Token[]; tone?: Tone; leadFirstParagraph?: boolean }) {
  const leadIndex = leadFirstParagraph ? tokens.findIndex((t) => t.type === 'paragraph') : -1;
  return <>{tokens.map((t, i) => <Fragment key={i}>{block(t, tone, i === leadIndex)}</Fragment>)}</>;
}
