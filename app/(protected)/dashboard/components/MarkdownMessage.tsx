import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function MarkdownMessage({ content }: { content: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed text-foreground/90">{children}</p>,
        h1: ({ children }) => <h1 className="text-sm font-bold mb-2 text-foreground">{children}</h1>,
        h2: ({ children }) => <h2 className="text-xs font-bold mb-1.5 text-foreground">{children}</h2>,
        h3: ({ children }) => <h3 className="text-xs font-semibold mb-1 text-foreground/90">{children}</h3>,
        ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-0.5 pl-1 text-foreground/90">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-0.5 pl-1 text-foreground/90">{children}</ol>,
        li: ({ children }) => <li className="leading-relaxed text-foreground/90">{children}</li>,
        strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
        em: ({ children }) => <em className="italic text-foreground/85">{children}</em>,
        code: ({ children, className }) => {
          const isBlock = className?.includes("language-");
          return isBlock ? (
            <code className="block bg-muted/40 border border-border/80 rounded-lg px-3 py-2 my-2 text-[10px] font-mono text-primary overflow-x-auto whitespace-pre">{children}</code>
          ) : (
            <code className="bg-muted border border-border/30 rounded px-1 py-0.5 text-[10px] font-mono text-primary">{children}</code>
          );
        },
        pre: ({ children }) => <pre className="my-2">{children}</pre>,
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-border/80 pl-3 my-2 text-muted-foreground italic">{children}</blockquote>
        ),
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline underline-offset-2 font-medium">{children}</a>
        ),
        hr: () => <hr className="border-border/60 my-3" />,
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
