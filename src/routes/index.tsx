import { useState, useEffect, useRef } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { MarkdownPreview } from "../components/markdown-preview.tsx";
import { CodeEditor } from "../components/code-editor.tsx";
import { TemplatePopover } from "../components/template-popover.tsx";
import { ThemeToggle } from "../components/theme-toggle.tsx";
import { getTemplateBySlug } from "../data/templates.ts";
import type { Template } from "../data/templates.ts";

const STORAGE_KEY = "markdown-now:content";

const INITIAL_CONTENT = `# Markdown Now

A minimal, **live** markdown editor. Type on the left, see the preview on the right — *instantly*. Toggle dark/light mode up top, or hit **Save as PDF** to export.

*Clear this and start writing!*
`;

function readSaved(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeSaved(content: string) {
  try {
    localStorage.setItem(STORAGE_KEY, content);
  } catch {
    // storage full or unavailable
  }
}

export const Route = createFileRoute("/")({
  component: Editor,
  validateSearch: (search: Record<string, unknown>) => ({
    template: (search.template as string) || undefined,
  }),
});

type MobileView = "editor" | "preview";

function Editor() {
  const { template } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  const [content, setContent] = useState(() => {
    // Always prefer localStorage (has user's edits), fall back to template, then default
    return readSaved() ?? (template ? getTemplateBySlug(template)?.content : null) ?? INITIAL_CONTENT;
  });
  const [mobileView, setMobileView] = useState<MobileView>("editor");

  // Save on beforeunload as a safety net
  const contentRef = useRef(content);
  contentRef.current = content;
  useEffect(() => {
    const handleUnload = () => writeSaved(contentRef.current);
    window.addEventListener("beforeunload", handleUnload);
    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  function updateContent(next: string) {
    setContent(next);
    writeSaved(next);
  }

  function handleReset() {
    updateContent(INITIAL_CONTENT);
    navigate({ search: {} });
  }

  function handleTemplateSelect(t: Template) {
    updateContent(t.content);
    navigate({ search: { template: t.slug } });
  }

  return (
    <div className="flex flex-col h-[100dvh]">
      {/* Header */}
      <header className="flex items-center justify-between h-12 px-3 md:px-4 border-b shrink-0 bg-[var(--bg)] border-[var(--border)]">
        <button
          onClick={handleReset}
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 208 128"
            width="20"
            height="12"
            fill="currentColor"
          >
            <path
              clipRule="evenodd"
              d="m15 10c-2.7614 0-5 2.2386-5 5v98c0 2.761 2.2386 5 5 5h178c2.761 0 5-2.239 5-5v-98c0-2.7614-2.239-5-5-5zm-15 5c0-8.28427 6.71573-15 15-15h178c8.284 0 15 6.71573 15 15v98c0 8.284-6.716 15-15 15h-178c-8.28427 0-15-6.716-15-15z"
              fillRule="evenodd"
            />
            <path d="m30 98v-68h20l20 25 20-25h20v68h-20v-39l-20 25-20-25v39zm125 0-30-33h20v-35h20v35h20z" />
          </svg>
          <span className="hidden sm:inline">Markdown Now</span>
        </button>

        <div className="flex items-center gap-1 md:gap-1">
          <TemplatePopover onSelect={handleTemplateSelect} />
          <button
            onClick={() => window.print()}
            aria-label="Save as PDF"
            className="flex items-center gap-1.5 p-2 md:px-2.5 md:py-1 rounded-md text-xs text-[var(--text-secondary)] transition-colors hover:bg-[var(--border)]"
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
            <span className="hidden md:inline">Save as PDF</span>
          </button>
          <ThemeToggle />

          {/* Mobile tab switcher */}
          <div
            role="tablist"
            className="flex md:hidden items-center bg-[var(--surface)] rounded-md border border-[var(--border)] overflow-hidden ml-1"
          >
            <button
              role="tab"
              aria-selected={mobileView === "editor"}
              onClick={() => setMobileView("editor")}
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                mobileView === "editor"
                  ? "bg-[var(--border)] text-[var(--text)]"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              Edit
            </button>
            <button
              role="tab"
              aria-selected={mobileView === "preview"}
              onClick={() => setMobileView("preview")}
              className={`px-3 py-1 text-xs font-medium transition-colors ${
                mobileView === "preview"
                  ? "bg-[var(--border)] text-[var(--text)]"
                  : "text-[var(--text-secondary)]"
              }`}
            >
              Preview
            </button>
          </div>
        </div>
      </header>

      {/* Editor + Preview */}
      <div
        data-layout
        className="grid grid-cols-1 md:grid-cols-2 flex-1 min-h-0"
      >
        {/* Editor pane */}
        <div
          data-editor-pane
          className={`relative border-r border-[var(--border)] ${
            mobileView === "editor" ? "block" : "hidden"
          } md:block`}
        >
          <CodeEditor value={content} onChange={updateContent} />
        </div>

        {/* Preview pane */}
        <div
          data-preview-pane
          className={`overflow-y-auto p-4 md:p-6 bg-[var(--surface)] ${
            mobileView === "preview" ? "block" : "hidden"
          } md:block`}
        >
          <MarkdownPreview content={content} />
        </div>
      </div>
    </div>
  );
}
