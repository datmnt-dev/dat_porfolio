import React, { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaCodeBranch, FaCircle, FaPlus, FaMinus } from "react-icons/fa";
import { VscGitPullRequest } from "react-icons/vsc";
import type { ProjectProps } from "../types/project";

const Project: React.FC<ProjectProps> = ({
  title,
  description,
  technologies,
  github,
  link,
  duration,
  responsibilities = []
}) => {
  const [showDiff, setShowDiff] = useState(false);
  const techList = technologies.split(",").map((t) => t.trim());

  // Define language bar colors (mock distributions for developer UI)
  const getLanguageColors = () => {
    if (title.toLowerCase().includes("jobfinder")) {
      return [
        { name: "TypeScript", percent: "55%", color: "#3178c6" },
        { name: "Tailwind CSS", percent: "25%", color: "#38bdf8" },
        { name: "Spring Boot", percent: "20%", color: "#6db33f" }
      ];
    }
    if (title.toLowerCase().includes("library")) {
      return [
        { name: "TypeScript", percent: "60%", color: "#3178c6" },
        { name: "Node.js", percent: "25%", color: "#339933" },
        { name: "MongoDB", percent: "15%", color: "#47a248" }
      ];
    }
    // Default
    return [
      { name: "JavaScript", percent: "50%", color: "#f7df1e" },
      { name: "ReactJS", percent: "30%", color: "#61dafb" },
      { name: "CSS", percent: "20%", color: "#563d7c" }
    ];
  };

  const languages = getLanguageColors();

  return (
    <div className="flex flex-col h-full font-mono text-xs">
      
      {/* Header: Github Title and Branch */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-1.5 min-w-0">
          <VscGitPullRequest className="text-sm text-[var(--color-accent)] flex-shrink-0" />
          <h3 className="font-code font-bold text-sm text-[var(--color-text)] truncate hover:text-[var(--color-accent)] transition-colors">
            {title}
          </h3>
        </div>
        <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded border border-zinc-200/20 bg-zinc-100/50 dark:bg-zinc-800/40 text-[9px] text-[var(--color-subtext)] select-none">
          <FaCodeBranch className="text-[8px]" />
          <span>main</span>
        </div>
      </div>

      {/* Duration */}
      {duration && (
        <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-mono mb-3 block">
          [ {duration} ]
        </span>
      )}

      {/* Description */}
      <p className="font-sans font-light text-zinc-600 dark:text-[#94a3b8] text-xs leading-6 mb-4 flex-1">
        {description}
      </p>

      {/* Tech Badges */}
      <div className="flex flex-wrap gap-1.5 mb-4 font-mono text-[9px]">
        {techList.slice(0, 5).map((tech, index) => (
          <span
            key={index}
            className="px-2 py-0.5 rounded border border-zinc-200/20 bg-zinc-100 dark:bg-zinc-900 text-[var(--color-subtext)] select-none"
          >
            {tech}
          </span>
        ))}
        {techList.length > 5 && (
          <span className="px-2 py-0.5 rounded border border-zinc-200/20 bg-zinc-100 dark:bg-zinc-900 text-zinc-400 font-semibold select-none">
            +{techList.length - 5}
          </span>
        )}
      </div>

      {/* Language Distribution Bar */}
      <div className="mb-4 select-none">
        <div className="w-full h-1.5 rounded-full overflow-hidden flex bg-zinc-200 dark:bg-zinc-800">
          {languages.map((l, idx) => (
            <div
              key={idx}
              style={{ width: l.percent, backgroundColor: l.color }}
              className="h-full"
              title={`${l.name} ${l.percent}`}
            />
          ))}
        </div>
        <div className="flex gap-3 mt-1.5 text-[8px] text-[#8b949e]">
          {languages.map((l, idx) => (
            <span key={idx} className="flex items-center gap-1">
              <FaCircle style={{ color: l.color }} className="text-[6px]" />
              <span>{l.name}</span>
            </span>
          ))}
        </div>
      </div>

      {/* Expand/Collapse Responsibilities (Git Diff style) */}
      {responsibilities.length > 0 && (
        <div className="mt-2 mb-4">
          <button
            onClick={() => setShowDiff(!showDiff)}
            className="w-full py-1.5 border border-dashed border-[var(--color-border)] rounded-md hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] font-mono text-[10px] flex items-center justify-center gap-1.5 transition-all cursor-pointer bg-zinc-100/10 dark:bg-zinc-800/10"
          >
            <span>{showDiff ? "git show --summary" : "git show --diff"}</span>
            {showDiff ? <FaMinus className="text-[8px]" /> : <FaPlus className="text-[8px]" />}
          </button>

          {/* Interactive git diff screen */}
          {showDiff && (
            <div className="mt-2 rounded-lg border border-zinc-800 bg-[#070b12] text-[#8b949e] font-mono text-[9px] p-2 leading-4 max-h-40 overflow-y-auto custom-scrollbar select-text">
              <div className="text-zinc-500 mb-1 border-b border-zinc-800 pb-1">
                commit {title.substring(0,3).toLowerCase()}7a9d... (Responsibilities)
              </div>
              <div className="text-green-500/80">+++ b/responsibilities.txt</div>
              <div className="text-zinc-600">@@ -0,0 +1,{responsibilities.length} @@</div>
              {responsibilities.map((r, i) => (
                <div key={i} className="pl-1 hover:bg-green-500/5 transition-colors flex items-start gap-1">
                  <span className="text-green-500 font-bold select-none">+</span>
                  <span className="text-green-400/90 whitespace-normal">{r}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* GitHub/Website Actions */}
      <div className="flex gap-4 border-t border-zinc-200/10 pt-3 text-[10px]">
        {github && github !== "#" && (
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[var(--color-subtext)] hover:text-[var(--color-accent)] transition-colors"
          >
            <FaGithub className="text-xs" />
            <span>git-clone</span>
          </a>
        )}
        {link && link !== "#" && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-[var(--color-subtext)] hover:text-[var(--color-accent)] transition-colors"
          >
            <FaExternalLinkAlt className="text-[10px]" />
            <span>npm start</span>
          </a>
        )}
      </div>

    </div>
  );
};

export default Project;
