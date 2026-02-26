import { useEffect, useRef, useCallback, useId } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import mermaid from "mermaid";

let mermaidInitialized = false;

function initMermaid(theme: "default" | "dark") {
  mermaid.initialize({
    startOnLoad: false,
    theme,
    fontFamily: "var(--font-sans)",
  });
  mermaidInitialized = true;
}

function MermaidBlock({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  const mermaidId = `mermaid-${id.replace(/:/g, "")}`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isLight =
      document.documentElement.getAttribute("data-theme") === "light";
    const theme = isLight ? "default" : "dark";

    if (!mermaidInitialized) {
      initMermaid(theme);
    } else {
      mermaid.initialize({
        startOnLoad: false,
        theme,
        fontFamily: "var(--font-sans)",
      });
    }

    mermaid
      .render(mermaidId, code)
      .then(({ svg }) => {
        el.innerHTML = svg;
      })
      .catch(() => {
        el.textContent = code;
      });
  }, [code, mermaidId]);

  return <div ref={ref} className="mermaid-diagram" />;
}

export function MarkdownPreview({ content }: { content: string }) {
  const renderCode = useCallback(
    (props: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode; className?: string }) => {
      const { children, className, ...rest } = props;
      const match = className?.match(/language-(\w+)/);
      if (match?.[1] === "mermaid") {
        return <MermaidBlock code={String(children).trim()} />;
      }
      return (
        <code className={className} {...rest}>
          {children}
        </code>
      );
    },
    []
  );

  return (
    <div className="markdown-preview">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{ code: renderCode }}
      >
        {content}
      </Markdown>
    </div>
  );
}
