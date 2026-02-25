import { useState, useEffect } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { MarkdownPreview } from "../components/markdown-preview";

export const Route = createFileRoute("/")({ component: Editor });

const INITIAL_CONTENT = `# Markdown Now

A minimal, **live** markdown editor. Type on the left, see the preview on the right — *instantly*. Toggle dark/light mode up top, or hit **Save as PDF** to export.

Clear this and start writing!
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
