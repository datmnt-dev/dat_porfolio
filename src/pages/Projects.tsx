import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaGithub, FaExternalLinkAlt, FaCodeBranch } from "react-icons/fa";
import user_info, { ProjectCategory, type Project } from "../data/userdata";
import ProjectCard from "../components/ui/ProjectCard";
import ScrollReveal from "../components/ui/ScrollReveal";
import ProjectDrawer from "../components/ui/ProjectDrawer";
import SpotlightCard from "../components/ui/SpotlightCard";

const Projects = () => {
  const [filter, setFilter] = useState<"all" | ProjectCategory>("all");
  const [inspectProject, setInspectProject] = useState<Project | null>(null);

  const allProjects = user_info.projects;
  const featuredFlagship = allProjects.find((p) => p.slug === "threadlearn") || allProjects[0];

  const filteredProjects = allProjects.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  const categories: { value: "all" | ProjectCategory; label: string }[] = [
    { value: "all", label: "Tất cả" },
    { value: "fullstack", label: "Full-stack" },
    { value: "frontend", label: "Front-end" },
    { value: "mobile", label: "Mobile" },
    { value: "ai", label: "AI" },
  ];

  return (
    <div className="py-12 sm:py-16">
      {/* Editorial Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
          Portfolio / Archive
        </span>
        <h1 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--color-text)]">
          Selected Work
        </h1>
        <p className="mt-4 text-base sm:text-lg text-[var(--color-subtext)] max-w-2xl leading-relaxed">
          Tập hợp các sản phẩm số, hệ thống backend và đồ án thực hành mình đã trực tiếp thiết kế, lập trình và đóng góp mã nguồn.
        </p>

        {/* Filters */}
        <div className="mt-8 flex flex-wrap items-center gap-2 select-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                filter === cat.value
                  ? "bg-[var(--color-accent)] text-white font-medium"
                  : "border border-[var(--color-border)] text-[var(--color-subtext)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Featured Flagship Project Hero (shown on 'all' view) */}
      {filter === "all" && featuredFlagship && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
          <ScrollReveal>
            <SpotlightCard className="p-8 sm:p-12 rounded-3xl relative overflow-hidden group">
            <div className="grid lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-3">
                  <span className="chip text-[10px]">Flagship Spotlight</span>
                  <span className="text-xs font-mono text-[var(--color-subtext)]">
                    {featuredFlagship.category.toUpperCase()}
                  </span>
                </div>

                <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-[var(--color-text)] tracking-tight">
                  {featuredFlagship.title}
                </h2>

                <p className="text-sm sm:text-base text-[var(--color-accent)] font-mono">
                  {featuredFlagship.tagline}
                </p>

                <p className="text-sm text-[var(--color-subtext)] leading-relaxed max-w-xl">
                  {featuredFlagship.description}
                </p>

                <div className="pt-2 flex flex-wrap gap-1.5">
                  {featuredFlagship.techStack.map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    to={`/projects/${featuredFlagship.slug}`}
                    className="btn-primary !text-xs !py-2 !px-4"
                  >
                    <span>Xem Case Study</span>
                    <FaArrowRight className="text-[10px]" />
                  </Link>
                  {featuredFlagship.github && featuredFlagship.github !== "#" && (
                    <a
                      href={featuredFlagship.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-subtext)] hover:text-[var(--color-text)] transition-colors"
                    >
                      <FaGithub />
                      <span>Repository</span>
                    </a>
                  )}
                  {featuredFlagship.link && featuredFlagship.link !== "#" && (
                    <a
                      href={featuredFlagship.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-subtext)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      <FaExternalLinkAlt className="text-[10px]" />
                      <span>Live Demo</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-component)] p-6 space-y-4 font-mono text-xs text-[var(--color-subtext)]">
                  <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                    <span>Role:</span>
                    <span className="text-[var(--color-text)] font-semibold">
                      Full-stack Contributor
                    </span>
                  </div>
                  <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                    <span>Duration:</span>
                    <span className="text-[var(--color-text)]">
                      {featuredFlagship.duration}
                    </span>
                  </div>
                  {featuredFlagship.githubContributions ? (
                    <div className="flex justify-between border-b border-[var(--color-border)] pb-2">
                      <span>Public Commits:</span>
                      <span className="text-[var(--color-accent)] font-semibold flex items-center gap-1">
                        <FaCodeBranch className="text-[10px]" />
                        {featuredFlagship.githubContributions} commits
                      </span>
                    </div>
                  ) : null}
                  <div className="pt-1">
                    <span className="block text-[10px] uppercase text-[var(--color-subtext)] mb-2">
                      Key Modules:
                    </span>
                    <p className="text-xs text-[var(--color-text)] leading-relaxed font-sans">
                      Monaco IDE Sandbox, PayOS subscription reconciliation, live quiz attempt logic, JWT authentication.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SpotlightCard>
          </ScrollReveal>
        </section>
      )}

      {/* Grid of all remaining projects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((p, i) => (
            <ScrollReveal key={p.slug} delay={Math.min(i % 3, 2) * 45}>
              <ProjectCard
                project={p}
                index={i}
                onInspect={(proj) => setInspectProject(proj)}
              />
            </ScrollReveal>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 card-surface max-w-md mx-auto p-8 rounded-2xl">
            <p className="text-xs font-mono text-[var(--color-subtext)]">
              Không tìm thấy dự án trong danh mục này.
            </p>
          </div>
        )}
      </section>

      {/* Quick Inspector Drawer */}
      <ProjectDrawer
        project={inspectProject}
        isOpen={Boolean(inspectProject)}
        onClose={() => setInspectProject(null)}
      />
    </div>
  );
};

export default Projects;
