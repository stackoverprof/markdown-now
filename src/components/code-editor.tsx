import { useEffect, useRef } from "react";
import {
  EditorView,
  keymap,
  placeholder,
  drawSelection,
  highlightActiveLine,
} from "@codemirror/view";
import { EditorState } from "@codemirror/state";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
  moveLineUp,
  moveLineDown,
  copyLineUp,
  copyLineDown,
  deleteLine,
} from "@codemirror/commands";
import {
  searchKeymap,
  highlightSelectionMatches,
  selectNextOccurrence,
} from "@codemirror/search";
import { markdown } from "@codemirror/lang-markdown";
import {
  syntaxHighlighting,
  HighlightStyle,
} from "@codemirror/language";
import { tags } from "@lezer/highlight";

const highlightStyle = HighlightStyle.define([
  { tag: tags.heading1, fontWeight: "700", fontSize: "1.25em" },
  { tag: tags.heading2, fontWeight: "600", fontSize: "1.15em" },
  { tag: tags.heading3, fontWeight: "600", fontSize: "1.05em" },
  { tag: tags.strong, fontWeight: "700" },
  { tag: tags.emphasis, fontStyle: "italic" },
  { tag: tags.strikethrough, textDecoration: "line-through" },
  { tag: tags.link, color: "var(--color-accent)", textDecoration: "underline" },
  { tag: tags.url, color: "var(--color-accent)" },
  { tag: tags.monospace, fontFamily: "var(--font-mono)", fontSize: "0.9em" },
  { tag: tags.quote, color: "var(--text-secondary)", fontStyle: "italic" },
  { tag: tags.meta, color: "var(--text-muted)" },
  { tag: tags.processingInstruction, color: "var(--text-muted)" },
]);

const theme = EditorView.theme({
  "&": {
    height: "100%",
    backgroundColor: "var(--surface)",
  },
  ".cm-scroller": {
    overflow: "auto",
    fontFamily: "var(--font-mono)",
    fontSize: "14px",
    lineHeight: "1.625",
  },
  ".cm-content": {
    padding: "1rem 1.5rem",
    caretColor: "var(--text)",
    color: "var(--text)",
  },
  ".cm-line": {
    padding: "0",
  },
  ".cm-cursor, .cm-dropCursor": {
    borderLeftColor: "var(--text)",
  },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground": {
    background: "color-mix(in srgb, var(--color-accent) 30%, transparent) !important",
  },
  ".cm-activeLine": {
    backgroundColor: "color-mix(in srgb, var(--text) 3%, transparent)",
  },
  ".cm-gutters": {
    display: "none",
  },
  "&.cm-focused": {
    outline: "none",
  },
  ".cm-placeholder": {
    color: "var(--text-muted)",
  },
  ".cm-selectionMatch": {
    backgroundColor: "color-mix(in srgb, var(--color-accent) 15%, transparent)",
  },
  ".cm-searchMatch": {
    backgroundColor: "color-mix(in srgb, var(--color-accent) 25%, transparent)",
  },
});

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function CodeEditor({ value, onChange }: CodeEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useEffect(() => {
    if (!containerRef.current) return;

    const updateListener = EditorView.updateListener.of((update) => {
      if (update.docChanged) {
        onChangeRef.current(update.state.doc.toString());
      }
    });

    const state = EditorState.create({
      doc: value,
      extensions: [
        theme,
        highlightActiveLine(),
        drawSelection(),
        history(),
        markdown(),
        syntaxHighlighting(highlightStyle),
        highlightSelectionMatches(),
        EditorView.lineWrapping,
        placeholder("Start writing markdown..."),
        updateListener,
        keymap.of([
          { key: "Mod-d", run: selectNextOccurrence, preventDefault: true },
          { key: "Alt-ArrowUp", run: moveLineUp },
          { key: "Alt-ArrowDown", run: moveLineDown },
          { key: "Shift-Alt-ArrowUp", run: copyLineUp },
          { key: "Shift-Alt-ArrowDown", run: copyLineDown },
          { key: "Mod-Shift-k", run: deleteLine },
          indentWithTab,
          ...defaultKeymap,
          ...historyKeymap,
          ...searchKeymap,
        ]),
      ],
    });

    const view = new EditorView({
      state,
      parent: containerRef.current,
    });

    viewRef.current = view;
    return () => view.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync external value changes (e.g. template selection)
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (value !== current) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0"
      aria-label="Markdown editor"
    />
  );
}
