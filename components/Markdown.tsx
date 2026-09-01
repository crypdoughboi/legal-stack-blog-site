import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

/**
 * Post bodies are Markdown. Rendering through react-markdown means no raw
 * HTML is interpreted, so a pasted script tag stays inert text.
 */
export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        a: ({ href, children }) => (
          <a href={href} rel="noopener noreferrer">
            {children}
          </a>
        ),
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
