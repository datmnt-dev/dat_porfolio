import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCodeBranch, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import type { Project } from "../../data/userdata";

interface Props {
  project: Project;
  index?: number;
  onInspect?: (project: Project) => void;
}

const statusLabel: Record<Project["status"], string> = {
  "in-progress": "In progress",
  completed: "Shipped",
  archived: "Archived",
};

const ProjectCard: React.FC<Props> = ({ project, onInspect }) => {
  return (
    <div className="card-surface p-6 flex flex-col h-full rounded-2xl group">
      {/* Top Meta Header */}
      <div className="flex items-center justify-between text-xs font-mono text-[var(--color-subtext)] pb-4 mb-4 border-b border-[var(--color-border)]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
          <span className="capitalize">{project.category}</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-full bg-[var(--color-bg-component)] border border-[var(--color-border)] text-[var(--color-subtext)]">
            {statusLabel[project.status]}
          </span>
          {onInspect && (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onInspect(project);
              }}
              className="text-[10px] text-[var(--color-subtext)] hover:text-[var(--color-accent)] cursor-pointer"
              title="Quick inspect"
            >
              [inspect]
            </button>
          )}
        </div>
      </div>

      {/* Title & Tagline */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-start justify-between gap-3">
          <Link
            to={`/projects/${project.slug}`}
            className="font-display font-bold text-xl text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors"
          >
            {project.title}
          </Link>
          <FaArrowRight className="text-[var(--color-accent)] opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-xs flex-shrink-0 mt-1.5" />
        </div>

        <p className="text-xs text-[var(--color-accent)] font-mono mt-1">
          {project.tagline}
        </p>

        <p className="mt-3 text-xs sm:text-sm text-[var(--color-subtext)] leading-relaxed line-clamp-3">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((t) => (
            <span key={t} className="tag">
              {t}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="tag text-[10px]">+{project.techStack.length - 5}</span>
          )}
        </div>

        {/* Footer info: Duration, Commits, Links */}
        <div className="mt-6 pt-4 border-t border-[var(--color-border)] flex items-center justify-between gap-3 text-xs font-mono text-[var(--color-subtext)]">
          <div className="flex items-center gap-3">
            <span>{project.duration}</span>
            {project.githubContributions ? (
              <span className="inline-flex items-center gap-1 text-[var(--color-accent)]">
                <FaCodeBranch className="text-[9px]" />
                <span>{project.githubContributions} commits</span>
              </span>
            ) : null}
          </div>

          <div className="flex items-center gap-2.5">
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[var(--color-subtext)] hover:text-[var(--color-text)] transition-colors p-1"
                aria-label={`GitHub repo for ${project.title}`}
              >
                <FaGithub />
              </a>
            )}
            {project.link && project.link !== "#" && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[var(--color-subtext)] hover:text-[var(--color-accent)] transition-colors p-1"
                aria-label={`Live demo for ${project.title}`}
              >
                <FaExternalLinkAlt className="text-[11px]" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
