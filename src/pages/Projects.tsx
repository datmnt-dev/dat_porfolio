import React, { useState } from "react";
import user_info, { ProjectCategory } from "../data/userdata";
import PageHero from "../components/ui/PageHero";
import ProjectCard from "../components/ui/ProjectCard";
import ScrollReveal from "../components/ui/ScrollReveal";

const Projects = () => {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const projects = user_info.projects;

  const filteredProjects = projects.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  const categories: { value: "all" | ProjectCategory; label: string }[] = [
    { value: "all", label: "Tất cả" },
    { value: "fullstack", label: "Full-stack" },
    { value: "frontend", label: "Front-end" },
    { value: "mobile", label: "Mobile" },
    { value: "ai", label: "AI" },
    { value: "tooling", label: "Công cụ / Khác" },
  ];

  return (
    <div>
      <PageHero
        eyebrow="My Work"
        title={
          <>
            Các dự án nổi bật <br />
            tôi đã <span className="text-gradient">thiết kế & phát triển</span>
          </>
        }
        subtitle="Từ ý tưởng ban đầu đến sản phẩm hoàn chỉnh, tập trung vào code sạch và trải nghiệm người dùng."
      />

      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-12">
        {/* Category Filters */}
        <ScrollReveal className="mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 select-none">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setFilter(cat.value)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all cursor-pointer ${
                  filter === cat.value
                    ? "text-white scale-105"
                    : "border border-[var(--color-border)] text-[var(--color-subtext)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
                }`}
                style={
                  filter === cat.value
                    ? { background: "var(--gradient-accent)", boxShadow: "0 4px 12px var(--color-accent-glow)" }
                    : undefined
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((p, i) => (
              <ScrollReveal key={`${filter}-${p.slug}`} delay={Math.min(i, 5) * 70}>
                <ProjectCard project={p} index={i} />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 card-surface max-w-xl mx-auto p-10">
            <p className="text-[var(--color-subtext)] font-mono text-sm">
              &gt; No projects found in this category.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Projects;
