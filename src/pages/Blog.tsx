import React from "react";
import { Link } from "react-router-dom";
import user_info from "../data/userdata";
import ScrollReveal from "../components/ui/ScrollReveal";

const Blog: React.FC = () => {
  const posts = user_info.blog;

  return (
    <div className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      {/* Editorial Header */}
      <ScrollReveal>
        <header className="space-y-4 border-b border-[var(--color-border)] pb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
            Technical Writing
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--color-text)]">
            Engineering Notes
          </h1>
          <p className="text-base sm:text-lg text-[var(--color-subtext)] max-w-2xl leading-relaxed">
            Ghi chép về kiến trúc phần mềm, tư duy chuyển đổi từ MVC sang SPA, và các kinh nghiệm thực tế rút ra trong quá trình xây dựng sản phẩm.
          </p>
        </header>
      </ScrollReveal>

      {/* Editorial Notes List (No card clutter, pure typography rhythm) */}
      <div className="divide-y divide-[var(--color-border)]">
        {posts.map((post, idx) => (
          <ScrollReveal key={post.slug} delay={idx * 60}>
            <article className="py-10 group">
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-baseline">
                  {/* Date & Read time */}
                  <div className="md:col-span-3 text-xs font-mono text-[var(--color-subtext)] flex md:flex-col gap-2">
                    <span>{post.date}</span>
                    <span className="opacity-40 hidden md:inline">·</span>
                    <span>{post.readMinutes} min read</span>
                  </div>

                  {/* Content */}
                  <div className="md:col-span-9 space-y-3">
                    <h2 className="font-display font-bold text-2xl text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                      {post.title}
                    </h2>
                    <p className="text-sm text-[var(--color-subtext)] leading-relaxed max-w-[65ch]">
                      {post.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      {post.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
};

export default Blog;
