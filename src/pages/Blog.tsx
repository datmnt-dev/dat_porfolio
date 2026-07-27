import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import user_info from "../data/userdata";
import PageHero from "../components/ui/PageHero";

const Blog = () => {
  const posts = user_info.blog;

  return (
    <div>
      <PageHero
        eyebrow="My Writing"
        title={
          <>
            Chia sẻ kinh nghiệm & <span className="text-gradient">Bài viết kỹ thuật</span>
          </>
        }
        subtitle="Nơi ghi chép những bài học thực tế, kiến thức học được từ dự án và con đường học tập của mình."
      />

      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        {posts.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {posts.map((post, i) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group card-surface overflow-hidden flex flex-col h-full reveal"
                style={{ animationDelay: `${0.05 + i * 0.08}s` }}
              >
                {/* Cover Image Wrap */}
                <div className="h-48 overflow-hidden relative bg-[var(--color-bg-component)]">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-70 group-hover:opacity-60 transition-opacity" />
                  <img
                    src={post.cover}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  {/* Fallback pattern overlay */}
                  <div className="absolute inset-0 bg-grid opacity-30 z-0" />
                  <div className="absolute inset-0 bg-mesh opacity-30 z-0" />
                </div>

                {/* Content Panel */}
                <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Tags & Time */}
                    <div className="flex items-center gap-2 flex-wrap mb-4">
                      {post.tags.map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                      <span className="text-[10px] font-mono text-[var(--color-subtext)] ml-auto">
                        {post.readMinutes} min read
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-bold text-xl text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors line-clamp-2 leading-tight">
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="mt-3 text-xs md:text-sm text-[var(--color-subtext)] font-sans font-light leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Footer metadata */}
                  <div className="mt-6 pt-4 border-t border-[var(--color-border)]/60 flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--color-subtext)]">{post.date}</span>
                    <span className="inline-flex items-center gap-1 text-[var(--color-accent)] group-hover:gap-2 transition-all font-semibold">
                      Đọc bài viết <FaArrowRight size={10} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 card-surface max-w-xl mx-auto p-10">
            <p className="text-[var(--color-subtext)] font-mono text-sm">
              &gt; No blog posts found. Check back later!
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Blog;
