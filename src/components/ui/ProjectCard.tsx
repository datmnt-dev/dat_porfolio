import { Link } from "react-router-dom";
import { FaArrowRight, FaCodeBranch, FaGithub, FaExternalLinkAlt } from "react-icons/fa";
import type { Project } from "../../data/userdata";
import SpotlightCard from "./SpotlightCard";

interface Props {
  project: Project;
  index?: number;
}

const statusLabel: Record<Project["status"], string> = {
  "in-progress": "In progress",
  completed: "Shipped",
  archived: "Archived",
};

const ProjectCard: React.FC<Props> = ({ project, index = 0 }) => {
  return (
    <SpotlightCard
      className="project-card group p-5 flex flex-col h-full"
      style={{ animationDelay: `${0.05 + index * 0.06}s` }}
    >
      <div className="project-card-media relative h-32 mb-4 rounded-xl overflow-hidden bg-[var(--color-bg-component)]">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-90`}
        />
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-xl bg-black/30 backdrop-blur-sm grid place-items-center overflow-hidden border border-white/20">
            <img
              src={project.cover}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              onError={(e) => ((e.currentTarget.style.display = "none"))}
            />
          </div>
        </div>
        <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider text-white bg-black/40 backdrop-blur-sm">
          {statusLabel[project.status]}
        </span>
        <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full text-[10px] font-code text-white bg-black/40 backdrop-blur-sm">
          {project.category}
        </span>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between gap-3">
          <Link
            to={`/projects/${project.slug}`}
            className="font-display font-bold text-lg group-hover:text-[var(--color-accent)] transition"
          >
            {project.title}
          </Link>
          <FaArrowRight className="text-[var(--color-accent)] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition text-sm" />
        </div>
        <p className="text-xs text-[var(--color-accent)] font-code mt-0.5">{project.tagline}</p>
        <p className="mt-3 text-sm text-[var(--color-subtext)] leading-relaxed line-clamp-3">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 5).map((t) => (
            <span key={t} className="tag project-card-tag">{t}</span>
          ))}
          {project.techStack.length > 5 && (
            <span className="tag">+{project.techStack.length - 5}</span>
          )}
        </div>

        <div className="mt-5 pt-4 border-t border-[var(--color-border)] flex items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[var(--color-subtext)] font-code">
            <span>{project.duration}</span>
            {project.githubContributions ? (
              <span className="inline-flex items-center gap-1 text-[var(--color-accent)]">
                <FaCodeBranch className="text-[10px]" />
                {project.githubContributions} commits
              </span>
            ) : null}
          </div>
          <div className="flex items-center gap-2">
            {project.github && project.github !== "#" && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1.5 rounded-lg text-[var(--color-subtext)] hover:text-[var(--color-accent)] transition"
                aria-label="GitHub"
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
                className="p-1.5 rounded-lg text-[var(--color-subtext)] hover:text-[var(--color-accent)] transition"
                aria-label="Live"
              >
                <FaExternalLinkAlt className="text-xs" />
              </a>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};

export default ProjectCard;
