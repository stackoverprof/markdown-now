import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MarkdownPreview } from "../components/markdown-preview";

export const Route = createFileRoute("/")({ component: Editor });

const INITIAL_CONTENT = `# Markdown Now

A minimal, **live** markdown editor. Type on the left, see the preview on the right — *instantly*. Toggle dark/light mode up top, or hit **Save as PDF** to export.

Clear this and start writing, or scroll through to see everything that's supported.

---

## Text Styling

You can write in **bold**, *italic*, or ***both at once***. ~~Cross things out~~ when plans change. Mix them freely — **bold with *nested italic* inside** works great.

Inline \`code\` renders in monospace, perfect for mentioning things like \`useState\` or \`config.ts\` in a sentence.

## Links

- [GitHub](https://github.com) — standard links
- [Hover me](https://example.com "This is a title") — links with tooltips
- Bare URLs auto-link: https://example.com

## Images

![Markdown Now](https://placehold.co/600x180/171717/ededed?text=Your+Image+Here)

## Lists

Unordered lists with nesting:

- First item
- Second item
  - Nested item
  - Another nested item
    - Even deeper
- Third item

Ordered lists:

1. Write your markdown
2. Preview it live
   1. Check the formatting
   2. Adjust as needed
3. Export to PDF

## Task Lists

Track your progress with GitHub-style checklists:

- [x] Set up the editor
- [x] Add live preview
- [x] Dark and light themes
- [x] PDF export
- [ ] Write something amazing

## Blockquotes

> The best way to predict the future is to invent it.
> — Alan Kay

Nested quotes work too:

> Someone once said:
>
> > Simplicity is the ultimate sophistication.
> >
> > — Leonardo da Vinci

## Code Blocks

Syntax highlighting for many languages:

\`\`\`typescript
interface Document {
  title: string;
  content: string;
  createdAt: Date;
}

async function save(doc: Document): Promise<void> {
  const res = await fetch("/api/docs", {
    method: "POST",
    body: JSON.stringify(doc),
  });
  if (!res.ok) throw new Error("Failed to save");
}
\`\`\`

\`\`\`python
def word_count(text: str) -> dict[str, int]:
    """Count occurrences of each word."""
    counts = {}
    for word in text.lower().split():
        counts[word] = counts.get(word, 0) + 1
    return counts
\`\`\`

\`\`\`css
:root {
  --bg: #0a0a0a;
  --text: #ededed;
  --accent: #0070f3;
}
\`\`\`

\`\`\`json
{
  "name": "markdown-now",
  "version": "1.0.0",
  "features": ["gfm", "syntax-highlighting", "pdf-export"]
}
\`\`\`

## Tables

Tables support left, center, and right alignment:

| Feature | Syntax | Supported |
|:--------|:------:|----------:|
| Bold | \`**text**\` | Yes |
| Italic | \`*text*\` | Yes |
| Strikethrough | \`~~text~~\` | Yes |
| Code | \`\\\`code\\\`\` | Yes |
| Links | \`[text](url)\` | Yes |
| Images | \`![alt](url)\` | Yes |

## Headings

You've already seen \`#\` and \`##\`. Here are the rest:

### Heading 3
#### Heading 4
##### Heading 5
###### Heading 6

## Horizontal Rules

Use \`---\`, \`***\`, or \`___\` to create dividers:

---

## Diagrams

Flowcharts using Mermaid:

\`\`\`mermaid
flowchart LR
    A[Write Markdown] --> B{Preview}
    B -->|Looks good| C[Export PDF]
    B -->|Needs work| A
    C --> D((Done))
\`\`\`

## HTML

Some inline HTML works too: <strong>bold</strong>, <em>italic</em>, <mark>highlighted</mark>, and line<br/>breaks.

<details>
<summary>Expandable section (click me)</summary>

Hidden content that supports **full markdown**:

1. Item one
2. Item two
3. Item three

</details>

---

> That's everything. Clear this and start writing — your preview updates as you type.
`;

function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light") {
      setDark(false);
      document.documentElement.setAttribute("data-theme", "light");
    }
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    if (next) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.setAttribute("data-theme", "light");
      localStorage.setItem("theme", "light");
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className="p-1.5 rounded-md transition-colors hover:bg-[var(--border)]"
    >
      {dark ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--text-secondary)]"
        >
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-[var(--text-secondary)]"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}

function Editor() {
  const [content, setContent] = useState(INITIAL_CONTENT);

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <header className="flex items-center justify-between h-12 px-4 border-b shrink-0 bg-[var(--bg)] border-[var(--border)]">
        <span className="text-sm font-medium tracking-tight text-[var(--text-secondary)]">
          Markdown Now
        </span>
        <div className="flex items-center gap-1">
          <button
            onClick={() => window.print()}
            aria-label="Save as PDF"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-[var(--text-secondary)] transition-colors hover:bg-[var(--border)]"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Save as PDF
          </button>
          <ThemeToggle />
        </div>
      </header>

      {/* Editor + Preview */}
      <div data-layout className="grid grid-cols-2 flex-1 min-h-0">
        {/* Editor pane */}
        <div
          data-editor-pane
          className="relative border-r border-[var(--border)]"
        >
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            spellCheck={false}
            placeholder="Start writing markdown..."
            className="absolute inset-0 w-full h-full resize-none font-mono text-sm leading-relaxed p-6 outline-none bg-[var(--surface)] text-[var(--text)] placeholder:text-[var(--text-muted)] selection:bg-[#0070f3]/30"
          />
        </div>

        {/* Preview pane */}
        <div
          data-preview-pane
          className="overflow-y-auto p-6 bg-[var(--surface)]"
        >
          <MarkdownPreview content={content} />
        </div>
      </div>
    </div>
  );
}
