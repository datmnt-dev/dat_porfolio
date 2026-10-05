import React from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaArrowRight, FaCodeBranch, FaCheck } from "react-icons/fa";
import user_info from "../data/userdata";

const statusLabel = {
  "in-progress": "In progress",
  completed: "Shipped",
  archived: "Archived",
};

const ProjectDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();

  const allProjects = user_info.projects;
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const project = allProjects[currentIndex];

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <article className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Back button */}
      <nav className="mb-10">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-subtext)] hover:text-[var(--color-text)] transition-colors"
        >
          <FaArrowLeft className="text-[10px]" />
          <span>Quay lại Projects</span>
        </Link>
      </nav>

      {/* Case Study Hero */}
      <header className="space-y-6 pb-12 border-b border-[var(--color-border)]">
        <div className="flex flex-wrap items-center gap-3">
          <span className="chip text-[10px]">{project.category.toUpperCase()}</span>
          <span className="text-xs font-mono uppercase px-2.5 py-0.5 rounded-full bg-[var(--color-bg-component)] border border-[var(--color-border)] text-[var(--color-subtext)]">
            {statusLabel[project.status]}
          </span>
          <span className="text-xs font-mono text-[var(--color-subtext)]">
            {project.duration}
          </span>
        </div>

        <h1 className="font-display font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[var(--color-text)] tracking-tight leading-[1.05]">
          {project.title}
        </h1>

        <p className="text-base sm:text-xl font-medium text-[var(--color-accent)] font-mono">
          {project.tagline}
        </p>

        {/* Action Links */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {project.github && project.github !== "#" && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary !text-xs !py-2 !px-3.5"
            >
              <FaGithub />
              <span>Xem Repository</span>
            </a>
          )}
          {project.link && project.link !== "#" && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost !text-xs !py-2 !px-3.5"
            >
              <FaExternalLinkAlt className="text-[10px]" />
              <span>Xem Live Demo</span>
            </a>
          )}
          {(!project.link || project.link === "#") && (!project.github || project.github === "#") && (
            <span className="text-xs font-mono text-[var(--color-subtext)] italic">
              [Repository nội bộ / Đang triển khai thử nghiệm]
            </span>
          )}
        </div>
      </header>

      {/* Case Study Body */}
      <div className="py-12 space-y-16">
        {/* 1. Overview */}
        <section className="space-y-4">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
            01 / Overview
          </h2>
          <h3 className="font-display font-bold text-2xl text-[var(--color-text)]">
            Bối cảnh & Bài toán sản phẩm
          </h3>
          <p className="text-base text-[var(--color-subtext)] leading-relaxed max-w-[65ch]">
            {project.description}
          </p>
          {project.longDescription && (
            <p className="text-base text-[var(--color-subtext)] leading-relaxed max-w-[65ch]">
              {project.longDescription}
            </p>
          )}
        </section>

        {/* 2. Key Contributions & Technical Responsibilities */}
        {project.responsibilities && project.responsibilities.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
                  02 / Engineering
                </h2>
                <h3 className="mt-1 font-display font-bold text-2xl text-[var(--color-text)]">
                  Vai trò & Đóng góp kỹ thuật
                </h3>
              </div>
              {project.githubContributions ? (
                <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-card)] text-xs font-mono text-[var(--color-accent)]">
                  <FaCodeBranch className="text-[10px]" />
                  <span>{project.githubContributions} commits verified</span>
                </div>
              ) : null}
            </div>

            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-6 sm:p-8">
              <ul className="space-y-4">
                {project.responsibilities.map((r, i) => (
                  <li key={i} className="flex items-start gap-3.5 text-sm text-[var(--color-text)]">
                    <span className="w-5 h-5 rounded-md bg-[var(--color-accent-soft)] text-[var(--color-accent)] flex items-center justify-center flex-shrink-0 mt-0.5">
                      <FaCheck className="text-[10px]" />
                    </span>
                    <span className="leading-relaxed">{r}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* 3. Technology Stack & Repositories */}
        <section className="space-y-6">
          <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
            03 / Architecture
          </h2>
          <h3 className="font-display font-bold text-2xl text-[var(--color-text)]">
            Công nghệ & Mã nguồn
          </h3>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Tech Stack List */}
            <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] space-y-4">
              <span className="text-xs font-mono uppercase text-[var(--color-subtext)] block">
                Tech Stack
              </span>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Repositories */}
            <div className="p-6 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] space-y-4">
              <span className="text-xs font-mono uppercase text-[var(--color-subtext)] block">
                Repositories liên quan
              </span>
              {project.repositories && project.repositories.length > 0 ? (
                <ul className="space-y-2">
                  {project.repositories.map((repo) => (
                    <li key={repo.url}>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-accent)] hover:underline"
                      >
                        <FaGithub />
                        <span>{repo.label}</span>
                        <FaExternalLinkAlt className="text-[9px]" />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : project.github && project.github !== "#" ? (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-accent)] hover:underline"
                >
                  <FaGithub />
                  <span>Main Repository</span>
                  <FaExternalLinkAlt className="text-[9px]" />
                </a>
              ) : (
                <p className="text-xs font-mono text-[var(--color-subtext)]">
                  Mã nguồn được lưu trữ tại kho riêng của nhóm hoặc đối tác.
                </p>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Next Project Footer Link */}
      <footer className="pt-12 mt-12 border-t border-[var(--color-border)] flex items-center justify-between">
        <Link
          to="/projects"
          className="text-xs font-mono text-[var(--color-subtext)] hover:text-[var(--color-text)] transition-colors"
        >
          ← Tất cả dự án
        </Link>

        {nextProject && (
          <Link
            to={`/projects/${nextProject.slug}`}
            className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-accent)] hover:underline"
          >
            <span>Dự án tiếp theo: {nextProject.title}</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        )}
      </footer>
    </article>
  );
};

export default ProjectDetail;
