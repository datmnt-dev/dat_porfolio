import React from "react";
import user_info from "../../data/userdata";
import Project from "../Project";
import { FaTerminal } from "react-icons/fa";

const Projects: React.FC = () => {
  const projects = user_info.projects;
  const projectCount = projects.length;

  const gridCols =
    projectCount === 1
      ? "grid-cols-1"
      : projectCount === 2
        ? "md:grid-cols-2"
        : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      id="projects"
      className="py-16 px-4 md:px-8 lg:px-16 bg-[var(--color-bg)] transition-colors duration-500 border-b border-[var(--color-border)]"
    >
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md border border-[var(--color-border)] bg-[var(--color-bg-component)] font-mono text-[10px] text-[var(--color-accent)] mb-4 select-none shadow-sm">
            <FaTerminal className="text-xs" />
            <span>tiendat@portfolio:~$ ls projects/ --details</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-code font-bold text-[var(--color-text)]">
            Featured <span className="text-[var(--color-accent)]">Projects</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-[var(--color-subtext)] max-w-2xl mx-auto font-sans font-light">
            Các dự án tôi đã tham gia thiết kế & phát triển, từ ý tưởng thiết kế đến sản phẩm hoàn chỉnh.
          </p>
        </div>

        {/* Projects Grid */}
        <div className={`grid ${gridCols} gap-6`}>
          {projects.map((project, index) => (
            <div
              key={index}
              className="
                rounded-xl p-5 
                glass-panel
                border border-[var(--color-border)] 
                transition-all duration-300 
                hover:shadow-lg hover:-translate-y-1
                hover:border-[var(--color-accent)]
                flex flex-col h-full
              "
            >
              <Project
                title={project.title}
                description={project.description}
                technologies={project.technologies}
                github={project.github}
                link={project.link}
                duration={project.duration}
                responsibilities={project.responsibilities}
              />
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Projects;
