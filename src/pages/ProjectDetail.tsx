import React, { useState } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaCodeBranch, FaCircle, FaPlus, FaMinus } from "react-icons/fa";
import { VscGitPullRequest } from "react-icons/vsc";
import user_info, { ProjectLanguage } from "../data/userdata";

const statusLabel = {
  "in-progress": "In progress",
  completed: "Shipped",
  archived: "Archived",
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [showDiff, setShowDiff] = useState(false);

  const project = user_info.projects.find((p) => p.slug === slug);

  if (!project) {
    return <Navigate to="/404" replace />;
  }

  const fallbackLanguages: ProjectLanguage[] = [
    { name: "TypeScript", percent: "50%", color: "#3178c6" },
    { name: "React", percent: "30%", color: "#61dafb" },
    { name: "CSS", percent: "20%", color: "#38bdf8" },
  ];
  const languages = project.languageBreakdown ?? fallbackLanguages;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 lg:px-8">
      {/* Back button */}
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-subtext)] hover:text-[var(--color-accent)] mb-8 transition-colors group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span>back to projects/</span>
      </Link>

      {/* Hero Banner Area */}
      <div className="relative rounded-3xl overflow-hidden mb-10 card-surface border border-[var(--color-border)]">
        <div className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-90`} />
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative p-6 md:p-8 lg:p-10 flex flex-col md:flex-row items-center gap-6 z-10">
          
          {/* Cover image wrap */}
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-2xl bg-black/30 backdrop-blur-sm grid place-items-center overflow-hidden border border-white/20 shadow-xl flex-shrink-0">
            <img
              src={project.cover}
              alt={project.title}
              className="w-full h-full object-cover"
              onError={(e) => ((e.currentTarget.style.display = "none"))}
            />
          </div>

          {/* Project Header Info */}
          <div className="text-center md:text-left text-white">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-3">
              <span className="px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-black/40 backdrop-blur-sm border border-white/10">
                {statusLabel[project.status]}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] font-code bg-black/40 backdrop-blur-sm border border-white/10">
                {project.category}
              </span>
            </div>
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight">
              {project.title}
            </h1>
            <p className="mt-2 text-sm md:text-base text-white/80 font-code font-light">
              {project.tagline}
            </p>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-2 gap-8 items-start">
        
        {/* Left Side: Description, Responsibilities, highlights */}
        <div className="space-y-6">
          {/* Main Description */}
          <div className="card-surface p-6 md:p-8">
            <h2 className="font-display font-bold text-xl mb-4 text-[var(--color-text)]">
              Tổng quan dự án
            </h2>
            <div className="prose-custom text-sm leading-relaxed text-[var(--color-subtext)] space-y-4">
              <p className="font-sans font-light">
                {project.description}
              </p>
              {project.longDescription && (
                <p className="font-sans font-light pt-2">
                  {project.longDescription}
                </p>
              )}
            </div>
          </div>

          {/* Responsibilities with diff view */}
          {project.responsibilities && project.responsibilities.length > 0 && (
            <div className="card-surface p-6 md:p-8 font-mono">
              <div className="flex items-center justify-between border-b border-[var(--color-border)] pb-4 mb-4 select-none">
                <div className="flex items-center gap-1.5 min-w-0">
                  <VscGitPullRequest className="text-sm text-[var(--color-accent)] flex-shrink-0" />
                  <h3 className="font-code font-bold text-sm text-[var(--color-text)]">
                    Nhiệm vụ & Trách nhiệm chính
                  </h3>
                </div>
                <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-zinc-200/20 bg-zinc-100/50 dark:bg-zinc-800/40 text-[9px] text-[var(--color-subtext)]">
                  <FaCodeBranch className="text-[8px]" />
                  <span>main</span>
                </div>
              </div>

              {/* Git diff interactive toggle */}
              <div className="mb-4">
                <button
                  onClick={() => setShowDiff(!showDiff)}
                  className="w-full py-2 border border-dashed border-[var(--color-border)] rounded-lg hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] text-xs flex items-center justify-center gap-2 transition-all cursor-pointer bg-zinc-100/10 dark:bg-zinc-800/10"
                >
                  <span>{showDiff ? "git show --summary" : "git show --diff (Xem code-diff)"}</span>
                  {showDiff ? <FaMinus size={10} /> : <FaPlus size={10} />}
                </button>

                {showDiff ? (
                  <div className="mt-3 rounded-xl border border-zinc-800 bg-[#05070c] text-[#8b949e] text-[10px] p-4 leading-5 overflow-y-auto max-h-80 custom-scrollbar select-text">
                    <div className="text-zinc-500 mb-1 border-b border-zinc-800 pb-1 font-semibold">
                      commit {project.slug.substring(0,6)}7a9d... (Responsibilities)
                    </div>
                    <div className="text-green-500/80">+++ b/responsibilities.txt</div>
                    <div className="text-zinc-600">@@ -0,0 +1,{project.responsibilities.length} @@</div>
                    {project.responsibilities.map((r, i) => (
                      <div key={i} className="pl-1 hover:bg-green-500/5 transition-colors flex items-start gap-1">
                        <span className="text-green-500 font-bold select-none">+</span>
                        <span className="text-green-400/90 whitespace-normal">{r}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="mt-4 space-y-3 font-sans font-light text-sm text-[var(--color-subtext)] list-disc pl-5">
                    {project.responsibilities.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="card-surface p-6 md:p-8">
              <h2 className="font-display font-bold text-xl mb-4 text-[var(--color-text)]">
                Điểm nổi bật
              </h2>
              <div className="grid sm:grid-cols-3 gap-4">
                {project.highlights.map((h, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-component)] text-center"
                  >
                    <div className="text-[10px] uppercase tracking-wider text-[var(--color-subtext)] font-code">
                      {h.label}
                    </div>
                    <div className="mt-1 font-display font-bold text-base text-[var(--color-accent)] truncate">
                      {h.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Tech Stack, Details, Actions */}
        <div className="space-y-6">
          {/* Project Details Panel */}
          <div className="card-surface p-6 md:p-8">
            <h2 className="font-display font-bold text-lg mb-4 text-[var(--color-text)] border-b border-[var(--color-border)] pb-3">
              Thông tin dự án
            </h2>
            <div className="space-y-4 text-xs font-mono">
              <div className="flex justify-between py-1 border-b border-[var(--color-border)]/50">
                <span className="text-[var(--color-subtext)]">Thời gian:</span>
                <span className="text-[var(--color-text)]">{project.duration}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[var(--color-border)]/50">
                <span className="text-[var(--color-subtext)]">Vai trò:</span>
                <span className="text-[var(--color-accent)] font-semibold">
                  {project.highlights?.find(h => h.label.toLowerCase() === "vai trò")?.value || "Developer"}
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[var(--color-subtext)]">Danh mục:</span>
                <span className="text-[var(--color-text)] capitalize">{project.category}</span>
              </div>
            </div>

            {/* Language distribution */}
            <div className="mt-6 pt-4 border-t border-[var(--color-border)] select-none font-mono text-[10px]">
              <span className="text-[var(--color-subtext)] block mb-2">Phân bổ Ngôn ngữ (Ước lượng):</span>
              <div className="w-full h-2 rounded-full overflow-hidden flex bg-zinc-200 dark:bg-zinc-800">
                {languages.map((l, idx) => (
                  <div
                    key={idx}
                    style={{ width: l.percent, backgroundColor: l.color }}
                    className="h-full"
                    title={`${l.name} ${l.percent}`}
                  />
                ))}
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-2 text-[9px] text-[#8b949e]">
                {languages.map((l, idx) => (
                  <span key={idx} className="flex items-center gap-1">
                    <FaCircle style={{ color: l.color }} className="text-[6px]" />
                    <span>{l.name} ({l.percent})</span>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="card-surface p-6 md:p-8">
            <h2 className="font-display font-bold text-lg mb-4 text-[var(--color-text)] border-b border-[var(--color-border)] pb-3">
              Công nghệ sử dụng
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech) => (
                <span key={tech} className="tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Links / Call to Action */}
          <div className="card-surface p-6 md:p-8 space-y-3">
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost w-full justify-center text-xs font-mono"
              >
                <FaGithub size={14} />
                <span>git clone {project.title.toLowerCase().replace(/\s+/g, "-")}</span>
              </a>
            )}
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full justify-center text-xs font-mono shadow-md"
              >
                <FaExternalLinkAlt size={12} />
                <span>npm start (Xem Live Demo)</span>
              </a>
            )}
            {project.repositories && project.repositories.length > 0 && (
              <div className="pt-3 border-t border-[var(--color-border)]">
                <p className="mb-2 text-[10px] uppercase tracking-wider font-code text-[var(--color-subtext)]">
                  Repositories liên quan
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.repositories.map((repository) => (
                    <a
                      key={repository.url}
                      href={repository.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tag hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-colors"
                    >
                      {repository.label}
                    </a>
                  ))}
                </div>
              </div>
            )}
            {(!project.link || project.link === "#") && (!project.github || project.github === "#") && (
              <p className="text-[10px] text-center font-mono text-[var(--color-subtext)] italic">
                &gt; Mã nguồn & live link đang được bảo mật / cập nhật.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;
