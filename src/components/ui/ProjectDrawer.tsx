import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaTimes,
  FaGithub,
  FaExternalLinkAlt,
  FaCodeBranch,
  FaArrowRight,
  FaCheck,
  FaCopy,
  FaCalendarAlt,
  FaPlus,
  FaMinus,
} from "react-icons/fa";
import { VscGitPullRequest, VscInspect } from "react-icons/vsc";
import type { Project } from "../../data/userdata";

interface ProjectDrawerProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const statusConfig: Record<Project["status"], { label: string; bg: string; text: string }> = {
  "in-progress": {
    label: "In Progress",
    bg: "bg-amber-500/10 border-amber-500/30",
    text: "text-amber-400",
  },
  completed: {
    label: "Shipped / Live",
    bg: "bg-emerald-500/10 border-emerald-500/30",
    text: "text-emerald-400",
  },
  archived: {
    label: "Archived",
    bg: "bg-zinc-500/10 border-zinc-500/30",
    text: "text-zinc-400",
  },
};

const ProjectDrawer: React.FC<ProjectDrawerProps> = ({ project, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<"overview" | "architecture" | "metrics">("overview");
  const [showDiff, setShowDiff] = useState(false);
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!project) return null;

  const status = statusConfig[project.status];

  const handleCopyLink = () => {
    const url = `${window.location.origin}/projects/${project.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container (Sliding from right) */}
      <div
        className={`absolute top-0 right-0 h-full w-full max-w-2xl bg-[var(--ide-surface)] border-l border-[var(--ide-border)] shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header (Linear Issue Style) */}
        <div className="p-4 sm:p-5 border-b border-[var(--ide-border)] flex items-center justify-between bg-[var(--color-bg-component)]/40">
          <div className="flex items-center gap-3 min-w-0">
            <div className="ide-badge text-xs">
              <VscInspect className="text-sm" />
              <span>#{project.slug.toUpperCase().slice(0, 6)}</span>
            </div>

            <span
              className={`px-2 py-0.5 rounded-full text-[10px] font-code font-semibold border ${status.bg} ${status.text}`}
            >
              {status.label}
            </span>

            <button
              onClick={handleCopyLink}
              className="hidden sm:inline-flex items-center gap-1 text-[11px] font-code text-[var(--color-subtext)] hover:text-[var(--color-accent)] transition"
              title="Copy link"
            >
              {copied ? <FaCheck className="text-emerald-400" /> : <FaCopy />}
              <span>{copied ? "Copied" : "Share"}</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-code rounded border border-[var(--ide-border)] text-[var(--color-subtext)]">
              ESC
            </kbd>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-[var(--color-subtext)] hover:text-[var(--color-text)] hover:bg-[var(--color-card)] transition"
              aria-label="Close drawer"
            >
              <FaTimes className="text-base" />
            </button>
          </div>
        </div>

        {/* Project Title Banner */}
        <div className="p-6 border-b border-[var(--ide-border)] bg-[var(--color-card)]/30">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-black/40 border border-white/15 overflow-hidden flex-shrink-0 grid place-items-center">
              <img
                src={project.cover}
                alt={project.title}
                className="w-full h-full object-cover"
                onError={(e) => ((e.currentTarget.style.display = "none"))}
              />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-display font-bold text-2xl text-[var(--color-text)]">
                {project.title}
              </h2>
              <p className="text-xs text-[var(--color-accent)] font-code mt-0.5">
                {project.tagline}
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] font-code bg-white/5 border border-[var(--ide-border)] text-[var(--color-subtext)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Drawer Navigation Tabs */}
          <div className="flex gap-4 mt-6 border-b border-[var(--ide-border)] text-xs font-code">
            <button
              onClick={() => setActiveTab("overview")}
              className={`pb-2.5 px-1 border-b-2 transition-all ${
                activeTab === "overview"
                  ? "border-[var(--color-accent)] text-[var(--color-accent)] font-bold"
                  : "border-transparent text-[var(--color-subtext)] hover:text-[var(--color-text)]"
              }`}
            >
              Overview & Tasks
            </button>
            <button
              onClick={() => setActiveTab("architecture")}
              className={`pb-2.5 px-1 border-b-2 transition-all ${
                activeTab === "architecture"
                  ? "border-[var(--color-accent)] text-[var(--color-accent)] font-bold"
                  : "border-transparent text-[var(--color-subtext)] hover:text-[var(--color-text)]"
              }`}
            >
              Architecture & Repos
            </button>
            <button
              onClick={() => setActiveTab("metrics")}
              className={`pb-2.5 px-1 border-b-2 transition-all ${
                activeTab === "metrics"
                  ? "border-[var(--color-accent)] text-[var(--color-accent)] font-bold"
                  : "border-transparent text-[var(--color-subtext)] hover:text-[var(--color-text)]"
              }`}
            >
              Git Footprint
            </button>
          </div>
        </div>

        {/* Drawer Body (Scrollable) */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* TAB 1: OVERVIEW & TASKS */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h4 className="text-xs font-code uppercase text-[var(--color-subtext)] tracking-wider mb-2">
                  Project Description
                </h4>
                <p className="text-sm text-[var(--color-text)] leading-relaxed">
                  {project.description}
                </p>
                {project.longDescription && (
                  <p className="text-sm text-[var(--color-subtext)] leading-relaxed mt-3">
                    {project.longDescription}
                  </p>
                )}
              </div>

              {/* Responsibilities & Git Diff Viewer */}
              {project.responsibilities && project.responsibilities.length > 0 && (
                <div className="p-4 rounded-xl border border-[var(--ide-border)] bg-[var(--color-card)]/50">
                  <div className="flex items-center justify-between mb-3 border-b border-[var(--ide-border)] pb-3">
                    <div className="flex items-center gap-2">
                      <VscGitPullRequest className="text-[var(--color-accent)] text-sm" />
                      <span className="text-xs font-code font-bold text-[var(--color-text)]">
                        Key Responsibilities & Contributions
                      </span>
                    </div>

                    <button
                      onClick={() => setShowDiff(!showDiff)}
                      className="px-2 py-1 rounded text-[10px] font-code border border-[var(--ide-border)] hover:border-[var(--color-accent)] text-[var(--color-accent)] flex items-center gap-1 transition"
                    >
                      {showDiff ? <FaMinus size={8} /> : <FaPlus size={8} />}
                      <span>{showDiff ? "Normal View" : "Git Diff View"}</span>
                    </button>
                  </div>

                  {showDiff ? (
                    <div className="ide-code-block text-[11px] leading-relaxed max-h-72 custom-scrollbar">
                      <div className="text-zinc-500 mb-1 border-b border-zinc-800 pb-1">
                        commit {project.slug.slice(0, 7)}... (responsibilities.diff)
                      </div>
                      <div className="text-emerald-400/80">+++ b/delivered_features.md</div>
                      <div className="text-zinc-500">@@ -0,0 +1,{project.responsibilities.length} @@</div>
                      {project.responsibilities.map((resp, i) => (
                        <div key={i} className="flex items-start gap-1 py-0.5 text-emerald-300">
                          <span className="text-emerald-500 font-bold select-none">+</span>
                          <span>{resp}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ul className="space-y-2 text-xs text-[var(--color-subtext)] list-disc pl-5">
                      {project.responsibilities.map((resp, i) => (
                        <li key={i} className="leading-relaxed">
                          {resp}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: ARCHITECTURE & REPOS */}
          {activeTab === "architecture" && (
            <div className="space-y-6">
              {/* Highlights */}
              {project.highlights && project.highlights.length > 0 && (
                <div>
                  <h4 className="text-xs font-code uppercase text-[var(--color-subtext)] tracking-wider mb-3">
                    Project Highlights
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {project.highlights.map((h, i) => (
                      <div
                        key={i}
                        className="p-3 rounded-xl border border-[var(--ide-border)] bg-[var(--color-card)] text-center"
                      >
                        <div className="text-[10px] font-code uppercase text-[var(--color-subtext)]">
                          {h.label}
                        </div>
                        <div className="font-display font-bold text-sm text-[var(--color-accent)] mt-0.5 truncate">
                          {h.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Language Breakdown */}
              {project.languageBreakdown && project.languageBreakdown.length > 0 && (
                <div className="p-4 rounded-xl border border-[var(--ide-border)] bg-[var(--color-card)]/40">
                  <h4 className="text-xs font-code uppercase text-[var(--color-subtext)] tracking-wider mb-3">
                    Codebase Distribution
                  </h4>
                  <div className="h-2.5 rounded-full overflow-hidden flex mb-3 bg-zinc-800">
                    {project.languageBreakdown.map((lang, i) => (
                      <div
                        key={i}
                        style={{ width: lang.percent, backgroundColor: lang.color }}
                        title={`${lang.name}: ${lang.percent}`}
                      />
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-4 text-xs font-mono">
                    {project.languageBreakdown.map((lang, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: lang.color }}
                        />
                        <span className="text-[var(--color-text)]">{lang.name}</span>
                        <span className="text-[var(--color-subtext)]">{lang.percent}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Repositories */}
              {project.repositories && project.repositories.length > 0 && (
                <div>
                  <h4 className="text-xs font-code uppercase text-[var(--color-subtext)] tracking-wider mb-3">
                    Source Repositories
                  </h4>
                  <div className="space-y-2">
                    {project.repositories.map((repo, i) => (
                      <a
                        key={i}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl border border-[var(--ide-border)] bg-[var(--color-card)] hover:border-[var(--color-accent)] transition group"
                      >
                        <div className="flex items-center gap-2 text-xs font-mono">
                          <FaGithub className="text-base text-[var(--color-subtext)] group-hover:text-[var(--color-accent)]" />
                          <span className="font-semibold text-[var(--color-text)]">
                            {repo.label} Repository
                          </span>
                        </div>
                        <FaExternalLinkAlt className="text-[10px] text-[var(--color-subtext)] group-hover:text-[var(--color-accent)]" />
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: METRICS */}
          {activeTab === "metrics" && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl border border-[var(--ide-border)] bg-[var(--color-card)]">
                  <div className="flex items-center gap-2 text-[var(--color-accent)] text-xs font-code">
                    <FaCodeBranch />
                    <span>GitHub Commits</span>
                  </div>
                  <div className="font-display font-extrabold text-2xl text-[var(--color-text)] mt-2">
                    {project.githubContributions ? `${project.githubContributions}+` : "Verified"}
                  </div>
                  <div className="text-[10px] text-[var(--color-subtext)] mt-1 font-mono">
                    Public footprint & contributions
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[var(--ide-border)] bg-[var(--color-card)]">
                  <div className="flex items-center gap-2 text-[var(--color-accent)] text-xs font-code">
                    <FaCalendarAlt />
                    <span>Sprint Duration</span>
                  </div>
                  <div className="font-display font-extrabold text-xl text-[var(--color-text)] mt-2">
                    {project.duration}
                  </div>
                  <div className="text-[10px] text-[var(--color-subtext)] mt-1 font-mono">
                    Active development milestone
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-xl border border-[var(--ide-border)] bg-[var(--color-card)]/40 font-code text-xs space-y-3">
                <div className="text-[10px] uppercase text-[var(--color-subtext)] tracking-wider">
                  System Architecture Contract
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--ide-border)]">
                  <span className="text-[var(--color-subtext)]">Category:</span>
                  <span className="text-[var(--color-text)] capitalize">{project.category}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-[var(--ide-border)]">
                  <span className="text-[var(--color-subtext)]">Technologies:</span>
                  <span className="text-[var(--color-accent)]">{project.technologies}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[var(--color-subtext)]">Status:</span>
                  <span className="text-emerald-400">Production Ready</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer Actions */}
        <div className="p-4 sm:p-5 border-t border-[var(--ide-border)] bg-[var(--color-bg-component)] flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !py-2 !px-3 !text-xs"
              >
                <FaGithub />
                <span>Repo</span>
              </a>
            )}
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost !py-2 !px-3 !text-xs"
              >
                <FaExternalLinkAlt className="text-[10px]" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <Link
            to={`/projects/${project.slug}`}
            onClick={onClose}
            className="btn-primary !py-2 !px-4 !text-xs"
          >
            <span>Full Case Study</span>
            <FaArrowRight className="text-[10px]" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDrawer;
