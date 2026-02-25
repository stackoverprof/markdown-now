import { useEffect, useRef, useCallback } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "dark",
  fontFamily: "var(--font-sans)",
});

function MermaidBlock({ code }: { code: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`;

    // Detect theme
    const isLight =
      document.documentElement.getAttribute("data-theme") === "light";
    mermaid.initialize({
      startOnLoad: false,
      theme: isLight ? "default" : "dark",
      fontFamily: "var(--font-sans)",
    });

    mermaid
      .render(id, code)
      .then(({ svg }) => {
        el.innerHTML = svg;
      })
      .catch(() => {
        el.textContent = code;
      });
  }, [code]);

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
