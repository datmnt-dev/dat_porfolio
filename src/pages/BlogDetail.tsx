import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import user_info from "../data/userdata";

// Parse markdown to clean JSX
const parseMarkdownToJSX = (content: string) => {
  if (!content) return null;

  const parts = content.split(/```/g);

  return parts.map((part, index) => {
    // Code block
    if (index % 2 === 1) {
      const lines = part.split("\n");
      const language = lines[0].trim() || "code";
      const code = lines.slice(1).join("\n").trim();

      return (
        <div
          key={index}
          className="my-6 rounded-xl border border-[var(--color-border)] bg-[#0a0d14] dark:bg-[#07090e] text-[#cbd5e1] overflow-hidden font-mono text-xs"
        >
          <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800 bg-[#0e131d] text-[10px] text-zinc-400 select-none">
            <span className="uppercase tracking-wider">{language}</span>
          </div>
          <pre className="p-4 overflow-x-auto leading-relaxed select-text font-mono text-xs">
            <code>{code}</code>
          </pre>
        </div>
      );
    }

    // Normal text blocks
    const blocks = part.split("\n\n");
    return blocks.map((block, bIdx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // H2
      if (trimmed.startsWith("## ")) {
        return (
          <h2
            key={`${index}-${bIdx}`}
            className="font-display font-bold text-2xl mt-10 mb-4 text-[var(--color-text)] leading-tight tracking-tight"
          >
            {trimmed.substring(3)}
          </h2>
        );
      }

      // H3
      if (trimmed.startsWith("### ")) {
        return (
          <h3
            key={`${index}-${bIdx}`}
            className="font-display font-bold text-xl mt-8 mb-3 text-[var(--color-text)] leading-tight tracking-tight"
          >
            {trimmed.substring(4)}
          </h3>
        );
      }

      // Blockquote
      if (trimmed.startsWith("> ")) {
        return (
          <blockquote
            key={`${index}-${bIdx}`}
            className="border-l-3 border-[var(--color-accent)] pl-4 py-2.5 my-6 bg-[var(--color-accent-soft)] rounded-r-lg text-sm text-[var(--color-text)] italic leading-relaxed"
          >
            {trimmed.substring(2).replace(/^"(.*)"$/, "$1")}
          </blockquote>
        );
      }

      // Lists
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const listItems = trimmed.split(/\n/);
        return (
          <ul
            key={`${index}-${bIdx}`}
            className="list-disc pl-5 my-4 space-y-2 text-sm text-[var(--color-subtext)] leading-relaxed"
          >
            {listItems.map((item, itemIdx) => (
              <li key={itemIdx}>{item.substring(2)}</li>
            ))}
          </ul>
        );
      }

      if (/^\d+\.\s/.test(trimmed)) {
        const listItems = trimmed.split(/\n/);
        return (
          <ol
            key={`${index}-${bIdx}`}
            className="list-decimal pl-5 my-4 space-y-2 text-sm text-[var(--color-subtext)] leading-relaxed"
          >
            {listItems.map((item, itemIdx) => {
              const dotIdx = item.indexOf(".");
              return (
                <li key={itemIdx}>
                  {item.substring(dotIdx + 1).trim()}
                </li>
              );
            })}
          </ol>
        );
      }

      // Paragraph
      return (
        <p
          key={`${index}-${bIdx}`}
          className="text-base text-[var(--color-subtext)] leading-relaxed my-4"
        >
          {trimmed}
        </p>
      );
    });
  });
};

const BlogDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = user_info.blog.find((b) => b.slug === slug);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <article className="py-12 sm:py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <nav className="mb-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-subtext)] hover:text-[var(--color-text)] transition-colors"
        >
          <FaArrowLeft className="text-[10px]" />
          <span>Quay lại Engineering Notes</span>
        </Link>
      </nav>

      {/* Note Header */}
      <header className="space-y-4 pb-8 border-b border-[var(--color-border)] mb-10">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-[var(--color-subtext)]">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readMinutes} min read</span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[var(--color-text)] tracking-tight leading-[1.1]">
          {post.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          {post.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
      </header>

      {/* Content */}
      <div className="prose-custom max-w-none select-text">
        {parseMarkdownToJSX(post.content)}
      </div>

      {/* Footer navigation */}
      <footer className="mt-16 pt-8 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono">
        <Link
          to="/blog"
          className="text-[var(--color-subtext)] hover:text-[var(--color-text)] transition-colors"
        >
          ← Xem tất cả bài viết
        </Link>
        <Link
          to="/contact"
          className="text-[var(--color-accent)] hover:underline"
        >
          Liên hệ trao đổi →
        </Link>
      </footer>
    </article>
  );
};

export default BlogDetail;
