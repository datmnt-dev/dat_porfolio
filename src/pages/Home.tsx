import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaGithub,
  FaLinkedin,
  FaFacebook,
  FaDownload,
  FaCode,
  FaServer,
  FaPaintBrush,
} from "react-icons/fa";
import { HiSparkles, HiOutlineBookOpen, HiOutlineUserGroup, HiOutlineShieldCheck } from "react-icons/hi2";
import user_info from "../data/userdata";
import { AppContext } from "../context/AppContext";
import type { AccentTheme } from "../types/AppContext";
import ProjectCard from "../components/ui/ProjectCard";
import SectionHeader from "../components/ui/SectionHeader";

const valueIcons: Record<string, React.ReactNode> = {
  sparkle: <HiSparkles />,
  book: <HiOutlineBookOpen />,
  users: <HiOutlineUserGroup />,
  shield: <HiOutlineShieldCheck />,
};

const Home = () => {
  const { accent, setAccent } = useContext(AppContext);
  const [displayedRole, setDisplayedRole] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const roles = user_info.main.roles;

  useEffect(() => {
    const current = roles[roleIdx];
    const t = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayedRole.length < current.length) {
            setDisplayedRole(current.slice(0, displayedRole.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2200);
          }
        } else {
          if (displayedRole.length > 0) {
            setDisplayedRole(current.slice(0, displayedRole.length - 1));
          } else {
            setIsDeleting(false);
            setRoleIdx((p) => (p + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 75
    );
    return () => clearTimeout(t);
  }, [displayedRole, isDeleting, roleIdx, roles]);

  const featured = user_info.projects.filter((p) => p.featured).slice(0, 3);
  const latestPosts = user_info.blog.slice(0, 2);

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh pointer-events-none" />
        <div className="absolute inset-0 bg-grid opacity-50 pointer-events-none" />
        <div className="absolute -top-24 right-0 w-96 h-96 rounded-full bg-[var(--color-accent)] opacity-20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-[var(--color-accent)] opacity-10 blur-[120px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 lg:px-8 pt-12 pb-20 grid lg:grid-cols-[1.2fr,1fr] gap-12 items-center">
          {/* Left */}
          <div>
            <div className="reveal chip">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              {user_info.main.availability}
            </div>

            <h1 className="reveal reveal-1 mt-6 font-display font-extrabold text-5xl sm:text-6xl md:text-7xl tracking-tight leading-[1.02]">
              Xin chào, <br />
              tôi là{" "}
              <span className="text-gradient">{user_info.main.shortName}</span>
              <span className="text-[var(--color-accent)]">.</span>
            </h1>

            <div className="reveal reveal-2 mt-5 flex items-center font-code text-lg text-[var(--color-subtext)]">
              <span className="text-[var(--color-accent)] mr-2">&gt;</span>
              <span>{displayedRole}</span>
              <span className="inline-block w-2 h-5 ml-1 bg-[var(--color-accent)] animate-pulse" />
            </div>

            <p className="reveal reveal-3 mt-6 text-base sm:text-lg text-[var(--color-subtext)] leading-relaxed max-w-xl">
              {user_info.main.shortBio} Tập trung vào React, TypeScript và những trải nghiệm web nhỏ-mà-tinh-tế.
            </p>

            <div className="reveal reveal-4 mt-9 flex flex-wrap items-center gap-3">
              <Link to="/projects" className="btn-primary">
                Xem dự án
                <FaArrowRight className="text-xs" />
              </Link>
              <Link to="/contact" className="btn-ghost">
                Liên hệ ngay
              </Link>
              <a
                href="/CV_MaiNguyenTienDat.pdf"
                download
                className="btn-ghost"
              >
                <FaDownload className="text-xs" />
                CV PDF
              </a>
            </div>

            {/* Socials */}
            <div className="reveal reveal-5 mt-9 flex items-center gap-3">
              <span className="text-xs font-code text-[var(--color-subtext)]">~/socials</span>
              <div className="flex gap-2">
                {[
                  { href: user_info.socials.github, Icon: FaGithub },
                  { href: user_info.socials.linkedin, Icon: FaLinkedin },
                  { href: user_info.socials.facebook, Icon: FaFacebook },
                ].map(({ href, Icon }, i) => (
                  <a
                    key={i}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 grid place-items-center rounded-xl border border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition"
                  >
                    <Icon className="text-sm" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — visual */}
          <div className="reveal reveal-3 relative">
            <div className="absolute -inset-6 rounded-[3rem] opacity-40 blur-3xl" style={{ background: "var(--gradient-accent)" }} />
            <div className="relative card-surface p-6 sm:p-7">
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                <div className="absolute inset-0" style={{ background: "var(--gradient-accent)" }} />
                <img
                  src={user_info.main.photo}
                  alt={user_info.main.name}
                  className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <div className="text-white/90 text-xs font-code">@{user_info.socials.github.split("/").pop()}</div>
                  <div className="text-white font-display font-bold text-2xl mt-1">{user_info.main.name}</div>
                  <div className="text-white/80 text-xs mt-1">{user_info.main.location}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-2 mt-5">
                {user_info.stats.map((s) => (
                  <div
                    key={s.label}
                    className="text-center px-2 py-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-component)]"
                  >
                    <div className="font-display font-bold text-xl text-[var(--color-accent)]">{s.value}</div>
                    <div className="text-[9px] uppercase tracking-wider text-[var(--color-subtext)] mt-1">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Accent picker */}
              <div className="mt-5 p-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-component)]">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] uppercase tracking-wider text-[var(--color-subtext)] font-code">
                    Live accent
                  </span>
                  <span className="text-[10px] text-[var(--color-accent)] font-code">{accent}</span>
                </div>
                <div className="flex items-center gap-2">
                  {(["cyan", "green", "purple", "amber"] as AccentTheme[]).map((c) => {
                    const bg =
                      c === "cyan"
                        ? "bg-cyan-500"
                        : c === "green"
                          ? "bg-emerald-500"
                          : c === "purple"
                            ? "bg-purple-500"
                            : "bg-amber-500";
                    return (
                      <button
                        key={c}
                        onClick={() => setAccent(c)}
                        className={`flex-1 h-8 rounded-lg ${bg} transition-transform hover:scale-105 ${
                          accent === c ? "ring-2 ring-offset-2 ring-offset-[var(--color-card)] ring-[var(--color-accent)]" : ""
                        }`}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT I DO */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <SectionHeader
          eyebrow="What I do"
          title="Ba mảng mình tập trung nhất"
          description="Mình thích build những thứ giải quyết bài toán thật. Mạnh nhất ở front-end, đủ tự tin với back-end và đang nghiêm túc đầu tư cho design."
        />
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: <FaCode />,
              title: "Front-end Engineering",
              text: "React, TypeScript, Tailwind. Quan tâm tới state, performance, accessibility và những chi tiết nhỏ mà người dùng cảm được.",
              link: "/skills",
              cta: "Xem skills",
            },
            {
              icon: <FaServer />,
              title: "Full-stack & APIs",
              text: "Node/Express, MongoDB, REST. Đủ để dựng MVP từ đầu, validate ý tưởng và build dashboard đơn giản.",
              link: "/projects",
              cta: "Xem projects",
            },
            {
              icon: <FaPaintBrush />,
              title: "Design & UX",
              text: "Wireframe, prototype Figma, design system kích thước nhỏ. Mình ưu tiên hierarchy và rhythm hơn là decoration.",
              link: "/about",
              cta: "Biết thêm",
            },
          ].map((c, i) => (
            <div
              key={c.title}
              className="card-surface p-7 reveal flex flex-col"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div
                className="w-12 h-12 rounded-2xl grid place-items-center text-white text-xl"
                style={{ background: "var(--gradient-accent)" }}
              >
                {c.icon}
              </div>
              <h3 className="mt-5 font-display font-bold text-lg">{c.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-subtext)] leading-relaxed flex-1">
                {c.text}
              </p>
              <Link
                to={c.link}
                className="mt-5 inline-flex items-center gap-2 text-sm text-[var(--color-accent)] hover:gap-3 transition-all"
              >
                {c.cta} <FaArrowRight className="text-xs" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <SectionHeader
          eyebrow="Featured work"
          title="Một vài dự án nổi bật"
          description="Các dự án mình đầu tư thời gian nhất — mỗi cái có một góc thú vị riêng để chia sẻ."
          action={
            <Link to="/projects" className="btn-ghost !text-xs">
              Tất cả dự án
              <FaArrowRight className="text-xs" />
            </Link>
          }
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </section>

      {/* VALUES */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <SectionHeader
          eyebrow="How I work"
          title="Những giá trị mình giữ"
          description="Đây không phải khẩu hiệu — đây là cách mình thực sự ra quyết định khi code."
          align="center"
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {user_info.values.map((v, i) => (
            <div
              key={v.title}
              className="card-surface p-6 reveal text-center"
              style={{ animationDelay: `${0.1 + i * 0.07}s` }}
            >
              <div
                className="w-12 h-12 mx-auto rounded-2xl grid place-items-center text-2xl text-[var(--color-accent)] bg-[var(--color-accent-soft)]"
              >
                {valueIcons[v.icon] ?? <HiSparkles />}
              </div>
              <h4 className="mt-4 font-display font-bold">{v.title}</h4>
              <p className="mt-2 text-xs text-[var(--color-subtext)] leading-relaxed">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* LATEST POSTS */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
        <SectionHeader
          eyebrow="From the blog"
          title="Mình viết những gì mình học"
          description="Note ngắn về kỹ thuật, kiến trúc và những bài học rút ra từ dự án thật."
          action={
            <Link to="/blog" className="btn-ghost !text-xs">
              Tất cả bài viết <FaArrowRight className="text-xs" />
            </Link>
          }
        />
        <div className="grid md:grid-cols-2 gap-5">
          {latestPosts.map((p, i) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="card-surface p-6 group reveal"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <div className="flex items-center gap-2 flex-wrap mb-3">
                {p.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
                <span className="text-[10px] text-[var(--color-subtext)] ml-auto font-code">
                  {p.readMinutes} min read
                </span>
              </div>
              <h3 className="font-display font-bold text-xl group-hover:text-[var(--color-accent)] transition">
                {p.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-subtext)] line-clamp-2 leading-relaxed">
                {p.excerpt}
              </p>
              <div className="mt-4 flex items-center justify-between text-xs">
                <span className="text-[var(--color-subtext)] font-code">{p.date}</span>
                <span className="inline-flex items-center gap-1 text-[var(--color-accent)] group-hover:gap-2 transition-all">
                  Đọc tiếp <FaArrowRight className="text-[10px]" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 py-16">
        <div className="relative card-surface overflow-hidden p-10 sm:p-14 text-center">
          <div className="absolute inset-0 opacity-15" style={{ background: "var(--gradient-accent)" }} />
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative">
            <HiSparkles className="text-3xl text-[var(--color-accent)] mx-auto" />
            <h2 className="mt-4 font-display font-extrabold text-3xl sm:text-4xl">
              Build cùng nhau cái gì đó <span className="text-gradient">tử tế</span> nhé?
            </h2>
            <p className="mt-3 text-[var(--color-subtext)] max-w-xl mx-auto">
              Mình đang mở cho intern, junior position hoặc các dự án freelance front-end. Trao đổi qua email luôn nhé.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact" className="btn-primary">
                Liên hệ ngay <FaArrowRight className="text-xs" />
              </Link>
              <a href={`mailto:${user_info.main.email}`} className="btn-ghost">
                {user_info.main.email}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
