import { lazy, Suspense, useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaGithub,
  FaExternalLinkAlt,
  FaCodeBranch,
} from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import user_info, { type Project } from "../data/userdata";
import ScrollReveal from "../components/ui/ScrollReveal";
import GitHubActivity from "../components/GitHubActivity";
import Magnetic from "../components/ui/Magnetic";
import { useLenis } from "../motion";

const HeroScene3D = lazy(() => import("../components/ui/HeroScene3D"));

const Home = () => {
  const { accent } = useContext(AppContext);
  const { scrollTo } = useLenis();

  // Selected 3 flagship projects from real data
  const flagshipProjects: Project[] = [
    user_info.projects.find((p) => p.slug === "threadlearn") || user_info.projects[2],
    user_info.projects.find((p) => p.slug === "myroomie") || user_info.projects[1],
    user_info.projects.find((p) => p.slug === "jobfinder") || user_info.projects[0],
  ];

  const latestNotes = user_info.blog.slice(0, 2);

  return (
    <div className="relative">
      {/* =========================================================================
          1. HERO — CALM TECHNICAL EDITORIAL
         ========================================================================= */}
      <section
        id="hero"
        className="relative min-h-[calc(100svh-4rem)] flex items-center justify-center overflow-hidden border-b border-[var(--color-border)] py-16 sm:py-24"
      >
        {/* Ambient Subtle Grids & 3D Software Topology Scene */}
        <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />
        <Suspense fallback={null}>
          <HeroScene3D accent={accent} />
        </Suspense>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Status Chip */}
            <ScrollReveal delay={0}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-border)] bg-[var(--color-card)]/80 backdrop-blur-sm text-xs font-mono text-[var(--color-subtext)] shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>{user_info.main.availability}</span>
              </div>
            </ScrollReveal>

            {/* Editorial Name Heading */}
            <ScrollReveal delay={70}>
              <div className="mt-8 space-y-1">
                <p className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[var(--color-subtext)]">
                  Software Engineer
                </p>
                <h1 className="heading-hero font-display font-extrabold text-[var(--color-text)]">
                  MAI NGUYEN <br />
                  <span className="text-[var(--color-text)]">TIEN DAT</span>
                  <span className="text-[var(--color-accent)]">.</span>
                </h1>
              </div>
            </ScrollReveal>

            {/* Static Role & Engineering Philosophy */}
            <ScrollReveal delay={140}>
              <div className="mt-6 space-y-4">
                <div className="text-lg sm:text-xl font-medium text-[var(--color-text)]">
                  Full-stack / Product Engineer
                </div>
                <p className="text-base sm:text-lg text-[var(--color-subtext)] leading-relaxed max-w-[58ch]">
                  Tập trung xây dựng các sản phẩm số tin cậy từ giao diện người dùng
                  tinh gọn, tương tác mượt mà đến kiến trúc API và luồng dữ liệu phía sau.
                </p>
              </div>
            </ScrollReveal>

            {/* Primary Action Buttons */}
            <ScrollReveal delay={210}>
              <div className="mt-10 flex flex-wrap items-center gap-3.5">
                <Magnetic maxDistance={4.5}>
                  <button
                    onClick={() => scrollTo("#selected-work", { offset: -72 })}
                    className="btn-primary cursor-pointer"
                  >
                    <span>Xem dự án tiêu biểu</span>
                    <FaArrowRight className="text-[11px]" />
                  </button>
                </Magnetic>
                <Link to="/contact" className="btn-ghost">
                  <span>Liên hệ trao đổi</span>
                </Link>
                <a
                  href="/CV_MaiNguyenTienDat.pdf"
                  download
                  className="btn-ghost !text-xs font-mono"
                  title="Download CV PDF"
                >
                  <span>CV (PDF)</span>
                </a>
              </div>
            </ScrollReveal>

            {/* Core Stack Metadata */}
            <ScrollReveal delay={280}>
              <div className="mt-12 pt-6 border-t border-[var(--color-border)] flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-mono text-[var(--color-subtext)]">
                <span className="text-[var(--color-text)] font-semibold">Core Stack</span>
                <span>React 19</span>
                <span>TypeScript</span>
                <span>ASP.NET Core</span>
                <span>NestJS</span>
                <span>PostgreSQL / MongoDB</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          2. SELECTED WORK — FLAGSHIP PRODUCT STORIES
         ========================================================================= */}
      <section
        id="selected-work"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 border-b border-[var(--color-border)]"
      >
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
                01 / Work
              </span>
              <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--color-text)]">
                Selected Work
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[var(--color-subtext)] max-w-xl">
                Ba dự án thực tế thể hiện tư duy kiến trúc, khả năng làm việc full-stack và sự tỉ mỉ trong từng chi tiết sản phẩm.
              </p>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-accent)] hover:underline self-start md:self-end"
            >
              <span>Tất cả {user_info.projects.length} dự án</span>
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </ScrollReveal>

        {/* Flagship Projects List (Alternating Layouts) */}
        <div className="space-y-20 sm:space-y-28">
          {flagshipProjects.map((project, idx) => {
            const isReversed = idx % 2 === 1;
            const projectNumber = `0${idx + 1}`;

            return (
              <article
                key={project.slug}
                className={`grid lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isReversed ? "lg:grid-flow-dense" : ""
                }`}
              >
                {/* Media / Visual Presentation Frame (Tier 1: Subtle reveal + 1.015 hover) */}
                <div
                  className={`lg:col-span-7 ${
                    isReversed ? "lg:col-start-6" : ""
                  }`}
                >
                  <ScrollReveal
                    direction="up"
                    distance={16}
                    duration={580}
                    delay={0}
                    threshold={0.12}
                  >
                    <div className="relative rounded-2xl overflow-hidden border border-[var(--color-border)] bg-[var(--color-card)] shadow-md group transition-all duration-300 ease-out hover:translate-y-[-2px] hover:shadow-lg hover:border-[var(--color-border-strong)]">
                      {/* Browser/Window Header */}
                      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-border)] bg-[var(--color-bg-component)] text-xs font-mono text-[var(--color-subtext)]">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                          <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                          <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                          <span className="ml-2 text-[11px] text-[var(--color-subtext)]">
                            {project.slug}.app
                          </span>
                        </div>
                        <span className="text-[10px] uppercase font-semibold text-[var(--color-accent)]">
                          {project.status}
                        </span>
                      </div>

                      {/* Cover Area with Subtle 1.015 Scale on Hover */}
                      <div className="relative aspect-[16/10] bg-[var(--color-bg-component)] overflow-hidden flex items-center justify-center p-8">
                        <div
                          className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-15`}
                        />
                        <div className="absolute inset-0 bg-grid opacity-30" />
                        <div className="relative z-10 w-24 h-24 rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)]/90 backdrop-blur-md p-4 flex items-center justify-center shadow-lg group-hover:scale-[1.015] transition-transform duration-500 ease-out">
                          <img
                            src={project.cover}
                            alt={project.title}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>
                      </div>

                      {/* Bottom Quick Info Bar */}
                      <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-card)] flex items-center justify-between text-xs font-mono text-[var(--color-subtext)]">
                        <span>{project.duration}</span>
                        {project.githubContributions ? (
                          <span className="inline-flex items-center gap-1.5 text-[var(--color-accent)] font-medium">
                            <FaCodeBranch className="text-[10px]" />
                            <span>{project.githubContributions} commits</span>
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Story & Technical Summary (Tier 1: text translateY 16px with 60ms stagger) */}
                <div
                  className={`lg:col-span-5 ${
                    isReversed ? "lg:col-start-1" : ""
                  }`}
                >
                  <ScrollReveal
                    direction="up"
                    distance={16}
                    duration={580}
                    delay={60}
                    threshold={0.12}
                  >
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm font-semibold text-[var(--color-accent)]">
                          {projectNumber}
                        </span>
                        <span className="h-px w-8 bg-[var(--color-border)]" />
                        <span className="text-xs font-mono uppercase text-[var(--color-subtext)]">
                          {project.category}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-[var(--color-text)] tracking-tight">
                        {project.title}
                      </h3>

                      <p className="text-sm font-medium text-[var(--color-accent)]">
                        {project.tagline}
                      </p>

                      <p className="text-sm text-[var(--color-subtext)] leading-relaxed">
                        {project.description}
                      </p>

                      {/* Technical Footprint & Role */}
                      <div className="pt-2 space-y-2 text-xs font-mono">
                        <div className="flex items-baseline gap-2">
                          <span className="text-[var(--color-subtext)] w-16">Role:</span>
                          <span className="text-[var(--color-text)] font-semibold">
                            {project.highlights?.find(
                              (h) => h.label.toLowerCase() === "vai trò"
                            )?.value || "Full-stack Developer"}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-[var(--color-subtext)] w-16">Stack:</span>
                          <span className="text-[var(--color-text)]">
                            {project.techStack.slice(0, 4).join(" · ")}
                          </span>
                        </div>
                      </div>

                      {/* Responsibilities Highlights */}
                      {project.responsibilities && project.responsibilities.length > 0 && (
                        <div className="pt-2">
                          <p className="text-[11px] font-mono uppercase text-[var(--color-subtext)] mb-2">
                            Key contributions
                          </p>
                          <ul className="space-y-1.5 text-xs text-[var(--color-subtext)] list-disc pl-4 leading-normal">
                            {project.responsibilities.slice(0, 3).map((item, i) => (
                              <li key={i}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Action Links */}
                      <div className="pt-4 flex flex-wrap items-center gap-4">
                        <Link
                          to={`/projects/${project.slug}`}
                          className="btn-primary !py-2 !px-3.5 !text-xs group/btn"
                        >
                          <span>Xem case study</span>
                          <FaArrowRight className="text-[10px] transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                        </Link>

                        {project.github && project.github !== "#" && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-subtext)] hover:text-[var(--color-text)] transition-colors"
                            aria-label={`GitHub repository for ${project.title}`}
                          >
                            <FaGithub />
                            <span>Repository</span>
                          </a>
                        )}

                        {project.link && project.link !== "#" && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--color-subtext)] hover:text-[var(--color-accent)] transition-colors"
                            aria-label={`Live demo for ${project.title}`}
                          >
                            <FaExternalLinkAlt className="text-[10px]" />
                            <span>Live demo</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          3. ENGINEERING CAPABILITIES (3-Column Text Layout replacing "What I do")
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 border-b border-[var(--color-border)]">
        <ScrollReveal>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
              02 / Capabilities
            </span>
            <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--color-text)]">
              What I Build
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--color-subtext)] max-w-xl">
              Tổ chức theo 3 tầng kỹ năng rõ ràng, không khoa trương — tập trung vào khả năng ship sản phẩm hoàn chỉnh.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid md:grid-cols-3 gap-10 lg:gap-12">
          {/* Column 1: Interfaces */}
          <ScrollReveal delay={0}>
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase text-[var(--color-accent)]">
                Frontend / UX
              </div>
              <h3 className="font-display font-bold text-xl text-[var(--color-text)]">
                Interfaces
              </h3>
              <p className="text-sm text-[var(--color-subtext)] leading-relaxed">
                Xây dựng trải nghiệm trực quan, nhạy bén và có trật tự thị giác rõ ràng.
                Quan tâm đến performance, trạng thái dữ liệu và accessibility.
              </p>
              <div className="pt-2 border-t border-[var(--color-border)]">
                <ul className="space-y-2 text-xs font-mono text-[var(--color-text)]">
                  <li>React 19 / Next.js 15</li>
                  <li>TypeScript (strict)</li>
                  <li>Tailwind CSS</li>
                  <li>State (Zustand, React Query, Context)</li>
                  <li>Responsive & Accessibility (a11y)</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Column 2: Systems */}
          <ScrollReveal delay={60}>
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase text-[var(--color-accent)]">
                Backend / Architecture
              </div>
              <h3 className="font-display font-bold text-xl text-[var(--color-text)]">
                Systems
              </h3>
              <p className="text-sm text-[var(--color-subtext)] leading-relaxed">
                Thiết kế API có cấu trúc phân tầng rõ ràng, đảm bảo tính nhất quán của dữ liệu,
                phân quyền người dùng và khả năng truyền tải dữ liệu thời gian thực.
              </p>
              <div className="pt-2 border-t border-[var(--color-border)]">
                <ul className="space-y-2 text-xs font-mono text-[var(--color-text)]">
                  <li>ASP.NET Core 8 / C#</li>
                  <li>NestJS / Node.js / Express</li>
                  <li>RESTful API & Swagger/OpenAPI</li>
                  <li>Authentication (JWT, RBAC)</li>
                  <li>Realtime (SignalR, Socket.IO)</li>
                  <li>PostgreSQL, MongoDB, SQL Server</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Column 3: Products */}
          <ScrollReveal delay={120}>
            <div className="space-y-4">
              <div className="text-xs font-mono uppercase text-[var(--color-accent)]">
                Engineering Mindset
              </div>
              <h3 className="font-display font-bold text-xl text-[var(--color-text)]">
                Products
              </h3>
              <p className="text-sm text-[var(--color-subtext)] leading-relaxed">
                Tư duy của người tạo ra giải pháp thực tế: phân tích bài toán,
                viết code có thể bảo trì, phối hợp nhóm hiệu quả và cam kết về chất lượng.
              </p>
              <div className="pt-2 border-t border-[var(--color-border)]">
                <ul className="space-y-2 text-xs font-mono text-[var(--color-text)]">
                  <li>Phân tích yêu cầu & System Thinking</li>
                  <li>Git Workflow (Pull Request, Code Review)</li>
                  <li>Testing (Jest, Supertest)</li>
                  <li>Docker containerization</li>
                  <li>Tối ưu trải nghiệm thực tế của người dùng</li>
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          4. HOW I BUILD — VALUES WITH RESTRAINED EDITORIAL SEPARATORS
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 border-b border-[var(--color-border)]">
        <ScrollReveal>
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
              03 / Principles
            </span>
            <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--color-text)]">
              How I Build
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[var(--color-subtext)] max-w-xl">
              Các nguyên tắc định hướng khi mình ra quyết định kỹ thuật và hợp tác cùng đồng đội.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {user_info.values.map((val, idx) => (
            <ScrollReveal key={val.title} delay={idx * 50}>
              <div className="pt-6 border-t border-[var(--color-border)] space-y-3">
                <span className="font-mono text-xs font-semibold text-[var(--color-accent)]">
                  0{idx + 1}
                </span>
                <h3 className="font-display font-bold text-lg text-[var(--color-text)]">
                  {val.title}
                </h3>
                <p className="text-sm text-[var(--color-subtext)] leading-relaxed">
                  {val.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* =========================================================================
          5. GITHUB ACTIVITY FOOTPRINT
         ========================================================================= */}
      <GitHubActivity />

      {/* =========================================================================
          6. WRITING / NOTES
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 border-b border-[var(--color-border)]">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
                04 / Writing
              </span>
              <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[var(--color-text)]">
                Engineering Notes
              </h2>
              <p className="mt-3 text-sm sm:text-base text-[var(--color-subtext)] max-w-xl">
                Ghi chép về quá trình chuyển đổi tư duy kiến trúc, themer kỹ thuật và bài học thực tế từ các dự án.
              </p>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-mono text-[var(--color-accent)] hover:underline self-start sm:self-end"
            >
              <span>Tất cả ghi chép</span>
              <FaArrowRight className="text-[10px]" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="divide-y divide-[var(--color-border)]">
          {latestNotes.map((post, idx) => (
            <ScrollReveal key={post.slug} delay={idx * 60}>
              <article className="py-8 group">
                <Link to={`/blog/${post.slug}`} className="block">
                  <div className="grid md:grid-cols-12 gap-4 md:gap-8 items-baseline">
                    <div className="md:col-span-3 text-xs font-mono text-[var(--color-subtext)] flex items-center gap-3">
                      <span>{post.date}</span>
                      <span className="opacity-30">·</span>
                      <span>{post.readMinutes} min</span>
                    </div>

                    <div className="md:col-span-9 space-y-2">
                      <h3 className="font-display font-bold text-xl sm:text-2xl text-[var(--color-text)] group-hover:text-[var(--color-accent)] transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-sm text-[var(--color-subtext)] leading-relaxed max-w-[65ch]">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 pt-2">
                        {post.tags.map((t) => (
                          <span key={t} className="tag">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </Link>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* =========================================================================
          7. CONTACT CTA
         ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <ScrollReveal>
          <div className="p-8 sm:p-14 rounded-3xl border border-[var(--color-border)] bg-[var(--color-card)] relative overflow-hidden">
            <div className="max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
                Get In Touch
              </span>
              <h2 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl text-[var(--color-text)] tracking-tight">
                Bạn có dự án hoặc cơ hội công việc muốn trao đổi?
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[var(--color-subtext)] leading-relaxed">
                Mình đang sẵn sàng cho các vị trí Software Engineer (Intern / Junior) và cơ hội cộng tác phát triển sản phẩm web full-stack.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link to="/contact" className="btn-primary">
                  <span>Gửi tin nhắn</span>
                  <FaArrowRight className="text-[11px]" />
                </Link>
                <a
                  href={`mailto:${user_info.main.email}`}
                  className="btn-ghost font-mono !text-xs"
                >
                  <span>{user_info.main.email}</span>
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

export default Home;
