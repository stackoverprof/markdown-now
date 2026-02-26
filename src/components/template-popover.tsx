import { useState, useEffect, useRef } from "react";
import { TEMPLATES } from "../data/templates.ts";

export function TemplatePopover({
  onSelect,
}: {
  onSelect: (content: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
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
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <line x1="16" y1="13" x2="8" y2="13" />
          <line x1="16" y1="17" x2="8" y2="17" />
          <polyline points="10 9 9 9 8 9" />
        </svg>
        <span className="hidden md:inline">Templates</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full mt-1.5 w-48 rounded-lg border border-[var(--border)] bg-[var(--bg)] shadow-lg z-50 py-1"
        >
          {TEMPLATES.map((t) => (
            <button
              key={t.name}
              role="menuitem"
              onClick={() => {
                onSelect(t.content);
                setOpen(false);
              }}
              className="w-full text-left px-3 py-2 text-sm text-[var(--text-body,var(--text-secondary))] hover:bg-[var(--border)] transition-colors"
            >
              {t.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
