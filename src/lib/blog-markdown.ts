/** Lightweight markdown → HTML for blog articles (no extra deps). */

function inlineFormat(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent underline">$1</a>')
    .replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

export function renderBlogMarkdown(content: string): string {
  const lines = content.split("\n");
  const output: string[] = [];
  let inList = false;
  let listType: "ul" | "ol" = "ul";
  let inBlockquote = false;

  const closeList = () => {
    if (inList) {
      output.push(`</${listType}>`);
      inList = false;
    }
  };
  const closeBlockquote = () => {
    if (inBlockquote) {
      output.push("</blockquote>");
      inBlockquote = false;
    }
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (/^#{1,3}\s+Table of Contents\s*$/i.test(trimmed)) continue;
    if (/^\d+\.\s+\[.+\]\(#.+\)$/.test(trimmed)) continue;

    const headingMatch = trimmed.match(/^(#{1,6})\s+(.+)/);
    if (headingMatch) {
      closeList();
      closeBlockquote();
      const level = headingMatch[1].length;
      const rawText = headingMatch[2].replace(/\s*\{#[^}]+\}/g, "").trim();
      const id = rawText
        .replace(/\*\*/g, "")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
      output.push(
        `<h${level} id="${id}" class="font-display font-bold text-foreground mt-8 mb-3">${inlineFormat(rawText)}</h${level}>`,
      );
      continue;
    }

    if (trimmed.startsWith("> ")) {
      closeList();
      if (!inBlockquote) {
        output.push('<blockquote class="border-l-4 border-accent/40 pl-4 italic text-muted-foreground">');
        inBlockquote = true;
      }
      output.push(`<p>${inlineFormat(trimmed.slice(2))}</p>`);
      continue;
    } else if (inBlockquote && trimmed === "") {
      closeBlockquote();
      continue;
    } else if (inBlockquote) {
      closeBlockquote();
    }

    if (/^[\*\-]\s+/.test(trimmed)) {
      closeBlockquote();
      if (!inList || listType !== "ul") {
        closeList();
        output.push('<ul class="list-disc pl-6 my-4 space-y-1">');
        inList = true;
        listType = "ul";
      }
      output.push(`<li>${inlineFormat(trimmed.replace(/^[\*\-]\s+/, ""))}</li>`);
      continue;
    }

    const olMatch = trimmed.match(/^\d+\.\s+(.+)/);
    if (olMatch) {
      closeBlockquote();
      if (!inList || listType !== "ol") {
        closeList();
        output.push('<ol class="list-decimal pl-6 my-4 space-y-1">');
        inList = true;
        listType = "ol";
      }
      output.push(`<li>${inlineFormat(olMatch[1])}</li>`);
      continue;
    }

    if (/^---+$/.test(trimmed)) {
      closeList();
      closeBlockquote();
      output.push('<hr class="my-8 border-border" />');
      continue;
    }

    if (trimmed === "") {
      closeList();
      closeBlockquote();
      continue;
    }

    closeList();
    closeBlockquote();
    output.push(`<p class="mb-4 leading-relaxed text-foreground/90">${inlineFormat(trimmed)}</p>`);
  }

  closeList();
  closeBlockquote();
  return output.join("\n");
}

export function extractBlogToc(content: string) {
  const headings: { text: string; level: number; id: string }[] = [];
  for (const line of content.split("\n")) {
    const match = line.trim().match(/^(#{2,3})\s+(.+)/);
    if (!match) continue;
    const text = match[2].replace(/\*\*/g, "").replace(/\s*\{#[^}]+\}/g, "").trim();
    if (/^table of contents$/i.test(text)) continue;
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    headings.push({ text, level: match[1].length, id });
  }
  return headings;
}
