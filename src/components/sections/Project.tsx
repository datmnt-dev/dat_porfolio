import user_info from "../../data/userdata";
import Project from "../Project.jsx";
import { FaProjectDiagram } from "react-icons/fa";

function Projects() {
  const projects = user_info.projects;
  const projectCount = projects.length;

  // Xác định số cột linh hoạt
  const gridCols =
    projectCount === 1
      ? "grid-cols-1"
      : projectCount === 2
        ? "sm:grid-cols-2"
        : "sm:grid-cols-2 lg:grid-cols-3";

  return (
    <section
      id="projects"
      className="py-16 px-4 lg:px-16 bg-[var(--color-bg)] text-[var(--color-text)] transition-colors duration-300"
    >
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent)] bg-opacity-10 text-[var(--color-accent)] text-sm font-medium mb-4">
          <FaProjectDiagram />
          My Work
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)]">
          Featured <span className="text-[var(--color-accent)]">Projects</span>
        </h2>
        <p className="mt-4 text-[var(--color-subtext)] max-w-2xl mx-auto">
          Các dự án tôi đã tham gia phát triển, từ ý tưởng đến sản phẩm hoàn chỉnh
        </p>
      </div>

      {/* Projects Grid */}
      <div className={`grid ${gridCols} gap-8`}>
        {projects.map((project, index) => (
          <div
            key={index}
            className="
              rounded-xl p-6 
              shadow-md 
              bg-[var(--color-card)] 
              border border-[var(--color-border)] 
              transition-all duration-300 
              hover:shadow-lg hover:-translate-y-1
              hover:border-[var(--color-accent)]
            "
          >
            <Project
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              github={project.github}
              link={project.link}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
