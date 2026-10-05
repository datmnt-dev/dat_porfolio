import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCodeBranch } from "react-icons/fa";

interface SkillItem {
  name: string;
  category: string;
  experienceContext: string;
  projectSlug?: string;
  projectName?: string;
}

const strongSkills: SkillItem[] = [
  {
    name: "React 19 & Next.js 15",
    category: "Frontend",
    experienceContext: "Xây dựng SPA/SSR, custom hooks, concurrent rendering, state management",
    projectSlug: "threadlearn",
    projectName: "ThreadLearn",
  },
  {
    name: "TypeScript (Strict)",
    category: "Language",
    experienceContext: "Hệ thống kiểu dữ liệu chặt chẽ cho cả frontend và backend API layer",
    projectSlug: "threadlearn",
    projectName: "ThreadLearn / MyRoomie",
  },
  {
    name: "Tailwind CSS",
    category: "Styling",
    experienceContext: "Thiết kế component responsive, design tokens và dark/light theming",
    projectSlug: "myroomie",
    projectName: "MyRoomie / JobFinder",
  },
  {
    name: "RESTful API Design & Swagger",
    category: "Architecture",
    experienceContext: "Thiết kế API chuẩn REST, contracts rõ ràng, validation và tài liệu hoá",
    projectSlug: "jobfinder",
    projectName: "JobFinder / MyRoomie",
  },
  {
    name: "Git & Pull Request Workflow",
    category: "Tooling",
    experienceContext: "Phối hợp nhóm qua Pull Request, code review, merge conflict, commit nhỏ",
    projectSlug: "threadlearn",
    projectName: "235+ commits",
  },
  {
    name: "JWT & Role-based Access (RBAC)",
    category: "Security",
    experienceContext: "Xác thực phân quyền đa vai trò (Admin, User, Landlord, Employer)",
    projectSlug: "jobfinder",
    projectName: "JobFinder / MyRoomie",
  },
];

const comfortableSkills: SkillItem[] = [
  {
    name: "NestJS & Node.js",
    category: "Backend",
    experienceContext: "Kiến trúc module, dependency injection, validation guards và interceptors",
    projectSlug: "threadlearn",
    projectName: "ThreadLearn",
  },
  {
    name: "ASP.NET Core 8 (C#)",
    category: "Backend",
    experienceContext: "Xây dựng API, CQRS pattern, Clean Architecture và SignalR Hubs",
    projectSlug: "myroomie",
    projectName: "MyRoomie",
  },
  {
    name: "MongoDB & Mongoose",
    category: "Database",
    experienceContext: "Thiết kế schema NoSQL, indexing và aggregation pipeline",
    projectSlug: "threadlearn",
    projectName: "ThreadLearn / Library System",
  },
  {
    name: "PostgreSQL & SQL Server",
    category: "Database",
    experienceContext: "Thiết kế bảng quan hệ, khóa ngoại, indexing và Entity Framework / TypeORM",
    projectSlug: "jobfinder",
    projectName: "JobFinder / AgriLink",
  },
  {
    name: "SignalR & Socket.IO",
    category: "Realtime",
    experienceContext: "Chat thời gian thực theo room, thông báo tức thì và streaming trạng thái",
    projectSlug: "myroomie",
    projectName: "MyRoomie / ThreadLearn",
  },
  {
    name: "Docker & Containerization",
    category: "DevOps",
    experienceContext: "Đóng gói container cho microservice, database cục bộ và môi trường phát triển",
    projectSlug: "music-web",
    projectName: "Music Web Platform",
  },
];

const exploringSkills: SkillItem[] = [
  {
    name: "AI Integrations & Vector Search",
    category: "AI",
    experienceContext: "Tích hợp LLM stream, FAISS vector search, FastAPI AI service",
    projectSlug: "music-web",
    projectName: "Music Web Platform / Face Auth",
  },
  {
    name: "Three.js & WebGL",
    category: "Creative Dev",
    experienceContext: "Xây dựng topology trực quan hóa dữ liệu và visual shaders",
    projectSlug: "portfolio-website",
    projectName: "Portfolio Hero 3D",
  },
  {
    name: "React Native / Expo",
    category: "Mobile",
    experienceContext: "Phát triển ứng dụng mobile đa nền tảng với local SQLite",
    projectSlug: "product-management-mobile",
    projectName: "Product Management Mobile",
  },
  {
    name: "Automated Testing (Jest & Supertest)",
    category: "Quality",
    experienceContext: "Kiểm thử đơn vị và tích hợp API layer độc lập",
    projectSlug: "store-management-api",
    projectName: "Store Management API",
  },
];

const Skills: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* 1. Production / Strong Tier */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
            Tier 01 · Production Ready
          </span>
          <h3 className="mt-1 font-display font-bold text-2xl text-[var(--color-text)]">
            Production & Strong
          </h3>
          <p className="mt-2 text-sm text-[var(--color-subtext)] max-w-xl">
            Các công nghệ cốt lõi mình sử dụng hàng ngày với mức độ tự tin cao nhất, đã ship vào các sản phẩm thực tế.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {strongSkills.map((skill) => (
            <div
              key={skill.name}
              className="card-surface p-5 rounded-2xl flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-[var(--color-subtext)] mb-2">
                  <span>{skill.category}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                </div>
                <h4 className="font-display font-bold text-base text-[var(--color-text)]">
                  {skill.name}
                </h4>
                <p className="mt-2 text-xs text-[var(--color-subtext)] leading-relaxed">
                  {skill.experienceContext}
                </p>
              </div>

              {skill.projectSlug && (
                <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--color-subtext)]">Proof:</span>
                  <Link
                    to={`/projects/${skill.projectSlug}`}
                    className="inline-flex items-center gap-1 text-[var(--color-accent)] hover:underline"
                  >
                    <span>{skill.projectName}</span>
                    <FaArrowRight className="text-[9px]" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 2. Comfortable Tier */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
            Tier 02 · Backend & Data
          </span>
          <h3 className="mt-1 font-display font-bold text-2xl text-[var(--color-text)]">
            Comfortable
          </h3>
          <p className="mt-2 text-sm text-[var(--color-subtext)] max-w-xl">
            Nắm vững kiến trúc, xây dựng độc lập các module backend, cơ sở dữ liệu và hạ tầng cơ bản.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {comfortableSkills.map((skill) => (
            <div
              key={skill.name}
              className="card-surface p-5 rounded-2xl flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-[var(--color-subtext)] mb-2">
                  <span>{skill.category}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
                </div>
                <h4 className="font-display font-bold text-base text-[var(--color-text)]">
                  {skill.name}
                </h4>
                <p className="mt-2 text-xs text-[var(--color-subtext)] leading-relaxed">
                  {skill.experienceContext}
                </p>
              </div>

              {skill.projectSlug && (
                <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--color-subtext)]">Proof:</span>
                  <Link
                    to={`/projects/${skill.projectSlug}`}
                    className="inline-flex items-center gap-1 text-[var(--color-accent)] hover:underline"
                  >
                    <span>{skill.projectName}</span>
                    <FaArrowRight className="text-[9px]" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. Exploring Tier */}
      <section className="space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
            Tier 03 · Exploring
          </span>
          <h3 className="mt-1 font-display font-bold text-2xl text-[var(--color-text)]">
            Familiar & Exploring
          </h3>
          <p className="mt-2 text-sm text-[var(--color-subtext)] max-w-xl">
            Các công nghệ mình đã có kinh nghiệm làm prototype hoặc đang tìm hiểu sâu thêm để mở rộng khả năng.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {exploringSkills.map((skill) => (
            <div
              key={skill.name}
              className="card-surface p-5 rounded-2xl flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between gap-2 text-xs font-mono text-[var(--color-subtext)] mb-2">
                  <span>{skill.category}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                </div>
                <h4 className="font-display font-bold text-base text-[var(--color-text)]">
                  {skill.name}
                </h4>
                <p className="mt-2 text-xs text-[var(--color-subtext)] leading-relaxed">
                  {skill.experienceContext}
                </p>
              </div>

              {skill.projectSlug && (
                <div className="pt-3 border-t border-[var(--color-border)] flex items-center justify-between text-xs font-mono">
                  <span className="text-[var(--color-subtext)]">Proof:</span>
                  <Link
                    to={`/projects/${skill.projectSlug}`}
                    className="inline-flex items-center gap-1 text-[var(--color-accent)] hover:underline"
                  >
                    <span>{skill.projectName}</span>
                    <FaArrowRight className="text-[9px]" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Methodologies & Workflow */}
      <section className="p-8 rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] space-y-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
            Engineering Practice
          </span>
          <h3 className="mt-1 font-display font-bold text-xl text-[var(--color-text)]">
            Phương pháp & Quy trình làm việc
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
          {[
            { label: "Git Flow & Pull Requests", desc: "Feature branching, commit message rõ ràng, review code trước khi merge" },
            { label: "Component Architecture", desc: "Tách rạch ròi UI presentation, data fetching hooks và global state" },
            { label: "RESTful API Standards", desc: "Chuẩn hóa HTTP status codes, DTO validation và error format" },
            { label: "Clean Code & Refactoring", desc: "Đặt tên có nghĩa, tránh duplicate logic, giữ function nhỏ và đơn trách nhiệm" },
            { label: "Agile / Scrum Teamwork", desc: "Lập kế hoạch sprint, backlog refinement và họp trao đổi tiến độ" },
            { label: "Performance & A11y", desc: "Kiểm soát re-render, lazy-load tài nguyên nặng, hỗ trợ phím và reduced motion" },
          ].map((item) => (
            <div
              key={item.label}
              className="p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-component)] space-y-1.5"
            >
              <span className="font-semibold text-[var(--color-text)] flex items-center gap-1.5">
                <FaCodeBranch className="text-[10px] text-[var(--color-accent)]" />
                {item.label}
              </span>
              <p className="text-[11px] text-[var(--color-subtext)] leading-relaxed font-sans">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Skills;
