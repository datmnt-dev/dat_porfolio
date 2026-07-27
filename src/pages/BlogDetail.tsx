import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { FaArrowLeft, FaClock, FaCalendarAlt } from "react-icons/fa";
import user_info from "../data/userdata";

// Simple Markdown Parser to render custom styled blocks from JSON text
const parseMarkdownToJSX = (content: string) => {
  if (!content) return null;

  // Split content by code blocks code tag ```
  const parts = content.split(/```/g);
  
  return parts.map((part, index) => {
    // Every odd index is inside a code block
    if (index % 2 === 1) {
      const lines = part.split("\n");
      const language = lines[0].trim(); // first line might contain language e.g. tsx, css, js
      const code = lines.slice(1).join("\n").trim();
      
      return (
        <div key={index} className="editor-window my-6 border border-zinc-800 bg-[#0d1117] text-[#c9d1d9] rounded-xl shadow-lg flex flex-col overflow-hidden font-mono text-xs">
          <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#21262d] select-none text-[9px] text-[#8b949e]">
            <span>{language.toUpperCase() || "CODE SNIPPET"}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
          </div>
          <pre className="p-4 overflow-x-auto custom-scrollbar bg-[#05070c] leading-5 select-text">
            <code>
              {/* Basic color highlighting for demonstration in viewport */}
              {code.split("\n").map((line, lineIdx) => {
                // simple regex helper highlights keywords
                const words = line.split(/(\s+)/);
                return (
                  <div key={lineIdx}>
                    {words.map((word, wIdx) => {
                      if (/^(const|let|var|function|import|from|return|export|default|class|if|else|for|async|await|const|try|catch)$/.test(word.trim())) {
                        return <span key={wIdx} className="syntax-keyword">{word}</span>;
                      }
                      if (/^(".*"|'.*'|`.*`)$/.test(word.trim())) {
                        return <span key={wIdx} className="syntax-string">{word}</span>;
                      }
                      if (/^\d+$/.test(word.trim())) {
                        return <span key={wIdx} className="syntax-number">{word}</span>;
                      }
                      if (word.trim().startsWith("//") || word.trim().startsWith("/*")) {
                        return <span key={wIdx} className="syntax-comment">{word}</span>;
                      }
                      return <span key={wIdx}>{word}</span>;
                    })}
                  </div>
                );
              })}
            </code>
          </pre>
        </div>
      );
    }

    // Process normal text (even indices)
    const blocks = part.split("\n\n");
    return blocks.map((block, bIdx) => {
      const trimmed = block.trim();
      if (!trimmed) return null;

      // Header H2
      if (trimmed.startsWith("## ")) {
        return (
          <h2 key={`${index}-${bIdx}`} className="font-display font-bold text-2xl mt-8 mb-4 text-[var(--color-text)] leading-tight">
            {trimmed.substring(3)}
          </h2>
        );
      }

      // Header H3
      if (trimmed.startsWith("### ")) {
        return (
          <h3 key={`${index}-${bIdx}`} className="font-display font-bold text-xl mt-6 mb-3 text-[var(--color-text)] leading-tight">
            {trimmed.substring(4)}
          </h3>
        );
      }

      // Blockquote
      if (trimmed.startsWith("> ")) {
        // block quotes can have subheadings or normal text
        return (
          <blockquote key={`${index}-${bIdx}`} className="border-l-4 border-[var(--color-accent)] pl-4 py-2 my-4 bg-[var(--color-accent-soft)] rounded-r-lg text-sm text-[var(--color-text)] font-sans italic">
            {trimmed.substring(2).replace(/^"(.*)"$/, "$1")}
          </blockquote>
        );
      }

      // Unordered Lists
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const listItems = trimmed.split(/\n/);
        return (
          <ul key={`${index}-${bIdx}`} className="list-disc pl-5 my-4 space-y-2 text-sm text-[var(--color-subtext)] font-sans font-light">
            {listItems.map((item, itemIdx) => (
              <li key={itemIdx}>
                {parseInlineFormatting(item.substring(2))}
              </li>
            ))}
          </ul>
        );
      }

      // Ordered Lists
      if (/^\d+\.\s/.test(trimmed)) {
        const listItems = trimmed.split(/\n/);
        return (
          <ol key={`${index}-${bIdx}`} className="list-decimal pl-5 my-4 space-y-2 text-sm text-[var(--color-subtext)] font-sans font-light">
            {listItems.map((item, itemIdx) => {
              const dotIdx = item.indexOf(".");
              return (
                <li key={itemIdx}>
                  {parseInlineFormatting(item.substring(dotIdx + 1).trim())}
                </li>
              );
            })}
          </ol>
        );
      }

      // Normal paragraph
      return (
        <p key={`${index}-${bIdx}`} className="text-sm md:text-base text-[var(--color-subtext)] font-sans font-light leading-relaxed my-4">
          {parseInlineFormatting(trimmed)}
        </p>
      );
    });
  });
};

// Parse inline `code` and bold **bold** or *italic*
const parseInlineFormatting = (text: string) => {
  // Regex to split by inline code blocks `
  const codeParts = text.split(/`([^`]+)`/g);
  
  if (codeParts.length === 1) {
    return parseEmphasis(text);
  }

  return codeParts.map((part, idx) => {
    // Odd indices are code
    if (idx % 2 === 1) {
      return (
        <code key={idx} className="font-mono text-xs px-1.5 py-0.5 rounded bg-[var(--color-bg-component)] text-[var(--color-accent)]">
          {part}
        </code>
      );
    }
    return parseEmphasis(part);
  });
};

// Helper for bold and italic
const parseEmphasis = (text: string) => {
  // Bold **bold**
  const boldParts = text.split(/\*\*([^*]+)\*\*/g);
  if (boldParts.length === 1) {
    return text;
  }

  return boldParts.map((part, idx) => {
    if (idx % 2 === 1) {
      return <strong key={idx} className="font-semibold text-[var(--color-text)]">{part}</strong>;
    }
    return part;
  });
};

const BlogDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const post = user_info.blog.find((b) => b.slug === slug);

  if (!post) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-subtext)] hover:text-[var(--color-accent)] mb-8 transition-colors group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span>back to blog/</span>
      </Link>

      {/* Article Header */}
      <article className="reveal">
        <header className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {post.tags.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
          
          <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-[var(--color-text)] tracking-tight leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-5 mt-6 text-xs font-mono text-[var(--color-subtext)] select-none">
            <span className="flex items-center gap-1.5">
              <FaCalendarAlt className="text-[var(--color-accent)]" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5">
              <FaClock className="text-[var(--color-accent)]" />
              {post.readMinutes} min read
            </span>
          </div>
        </header>

        {/* Cover image banner */}
        <div className="h-64 sm:h-96 rounded-3xl overflow-hidden mb-10 card-surface border border-[var(--color-border)] relative">
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
          <img
            src={post.cover}
            alt={post.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-grid opacity-30 z-0" />
        </div>

        {/* Article Body */}
        <div className="prose-custom pb-20 select-text">
          {parseMarkdownToJSX(post.content)}
        </div>
      </article>
    </div>
  );
};

export default BlogDetail;
