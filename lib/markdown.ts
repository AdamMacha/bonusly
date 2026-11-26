import { marked } from "marked";

export interface TocItem {
  id: string;
  text: string;
}

export interface ParsedFaqItem {
  question: string;
  answer: string;
}

function slugifyHeading(text: string): string {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function wrapMarkdownTables(html: string): string {
  return html.replace(
    /<table>([\s\S]*?)<\/table>/gi,
    '<div class="table-scroll" role="region" aria-label="Srovnávací tabulka" tabindex="0"><table>$1</table></div>'
  );
}

export function renderMarkdown(content: string): string {
  if (!content) return "";
  return wrapMarkdownTables(marked.parse(content, { async: false }) as string);
}

/**
 * Spočítá reálný počet slov v článku po odstranění Markdown značek.
 */
export function countMarkdownWords(content: string): number {
  if (!content) return 0;
  const plain = content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_~|—–-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return plain ? plain.split(" ").length : 0;
}

/**
 * Rozdělí článek na hlavní Markdown tělo a volitelnou sekci "## Často kladené otázky",
 * vygeneruje HTML s kotvami (id) u H2 nadpisů a vrátí strukturovaný TOC + FAQ pole.
 */
export function parseArticleMarkdown(content: string): {
  html: string;
  toc: TocItem[];
  faqs: ParsedFaqItem[];
  wordCount: number;
} {
  if (!content) {
    return { html: "", toc: [], faqs: [], wordCount: 0 };
  }

  const wordCount = countMarkdownWords(content);
  const faqMarker = /^##\s+Často kladené otázky\s*$/im;
  const match = content.match(faqMarker);

  let mainMarkdown = content;
  const faqs: ParsedFaqItem[] = [];

  if (match && match.index !== undefined) {
    mainMarkdown = content.slice(0, match.index).trim();
    const faqSection = content.slice(match.index + match[0].length).trim();
    const blocks = faqSection.split(/^###\s+/m).filter((b) => b.trim().length > 0);
    for (const block of blocks) {
      const lines = block.trim().split("\n");
      const question = lines[0]?.trim();
      const answer = lines
        .slice(1)
        .join(" ")
        .replace(/\*\*([^*]+)\*\*/g, "$1")
        .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
        .replace(/\s+/g, " ")
        .trim();
      if (question && answer) {
        faqs.push({ question, answer });
      }
    }
  }

  const toc: TocItem[] = [];
  const usedIds = new Set<string>();
  const rawHtml = wrapMarkdownTables(marked.parse(mainMarkdown, { async: false }) as string);

  const html = rawHtml.replace(/<h2>([\s\S]*?)<\/h2>/gi, (_full, inner: string) => {
    const plainText = inner.replace(/<[^>]+>/g, "").trim();
    let id = slugifyHeading(plainText) || `sekce-${toc.length + 1}`;
    let counter = 2;
    while (usedIds.has(id)) {
      id = `${slugifyHeading(plainText)}-${counter++}`;
    }
    usedIds.add(id);
    toc.push({ id, text: plainText });
    return `<h2 id="${id}">${inner}</h2>`;
  });

  return { html, toc, faqs, wordCount };
}
