import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import type { AccentTheme } from "../types/AppContext";
import user_info from "../data/userdata";
import {
  FaSearch,
  FaTerminal,
  FaPalette,
  FaMoon,
  FaSun,
  FaDownload,
  FaEye,
  FaArrowRight,
  FaRegFolderOpen,
  FaEnvelope,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { VscInspect, VscCode } from "react-icons/vsc";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMatrix: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Projects" | "Theme & Accent" | "Quick Actions" | "Dev Tools";
  icon: React.ReactNode;
  action: () => void;
  previewData?: {
    type: "project" | "theme" | "nav" | "action";
    title?: string;
    description?: string;
    image?: string;
    badges?: string[];
    meta?: { label: string; value: string }[];
    hint?: string;
  };
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onOpenMatrix }) => {
  const { theme, switchTheme, accent, setAccent } = useContext(AppContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setActiveCategory("All");
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    // --- Navigation ---
    {
      id: "nav-home",
      title: "Goto Home (~/)",
      subtitle: "Landing overview, 3D Hero, Values",
      category: "Navigation",
      icon: <FaTerminal className="text-xs" />,
      action: () => {
        navigate("/");
        onClose();
      },
      previewData: {
        type: "nav",
        title: "Home Page",
        description: "Trang chủ giới thiệu tổng quan kỹ năng, giá trị cốt lõi và sản phẩm tiêu biểu của Mai Nguyễn Tiến Đạt.",
        badges: ["3D Hero", "Vercel Flow", "Quick Stats"],
        meta: [
          { label: "Route", value: "/" },
          { label: "Role", value: user_info.main.role },
        ],
      },
    },
    {
      id: "nav-projects",
      title: "Goto Projects (~/projects)",
      subtitle: "Explore all software repositories and case studies",
      category: "Navigation",
      icon: <FaRegFolderOpen className="text-xs" />,
      action: () => {
        navigate("/projects");
        onClose();
      },
      previewData: {
        type: "nav",
        title: "All Projects",
        description: "Bộ sưu tập đầy đủ các dự án Fullstack, Frontend, và Realtime với thông số GitHub commit.",
        badges: ["Fullstack", "React 19", ".NET 8", "Spring Boot"],
        meta: [
          { label: "Total Repos", value: `${user_info.projects.length} Projects` },
          { label: "Route", value: "/projects" },
        ],
      },
    },
    {
      id: "nav-skills",
      title: "Goto Skills (~/skills)",
      subtitle: "Interactive tech stack & engineering proficiency",
      category: "Navigation",
      icon: <VscCode className="text-xs" />,
      action: () => {
        navigate("/skills");
        onClose();
      },
      previewData: {
        type: "nav",
        title: "Skills & Stack",
        description: "Chi tiết các ngôn ngữ, framework, database và công cụ phát triển phần mềm.",
        badges: ["C# .NET", "TypeScript", "SQL", "Docker"],
        meta: [
          { label: "Languages", value: "TypeScript, C#, Java, Python" },
          { label: "Route", value: "/skills" },
        ],
      },
    },
    {
      id: "nav-playground",
      title: "Goto Dev Lab (~/playground)",
      subtitle: "Interactive mini games, matrix rain, and experiments",
      category: "Navigation",
      icon: <FaEye className="text-xs" />,
      action: () => {
        navigate("/playground");
        onClose();
      },
      previewData: {
        type: "nav",
        title: "Dev Playground & Lab",
        description: "Không gian thực nghiệm tương tác với game rắn săn mồi retro, Matrix rain và hiệu ứng shader.",
        badges: ["Retro Snake", "Matrix Mode", "Canvas 2D"],
        meta: [{ label: "Route", value: "/playground" }],
      },
    },
    {
      id: "nav-motion-kit",
      title: "Goto Motion Kit (~/motion-kit)",
      subtitle: "Creative motion suite, Lenis scroll, 3D tilt, and scenes",
      category: "Navigation",
      icon: <FaEye className="text-xs text-[var(--color-accent)]" />,
      action: () => {
        navigate("/motion-kit");
        onClose();
      },
      previewData: {
        type: "nav",
        title: "Motion Kit Suite",
        description: "Bộ công cụ chuyển động sáng tạo với SmoothScroll Lenis, GSAP matchMedia pin reveal, 3D TiltCard, và Web Audio feedback.",
        badges: ["Lenis Scroll", "GSAP Pin", "3D Tilt", "Confetti"],
        meta: [{ label: "Route", value: "/motion-kit" }],
      },
    },
    {
      id: "nav-contact",
      title: "Goto Contact (~/contact)",
      subtitle: "Direct message form & communication channels",
      category: "Navigation",
      icon: <FaEnvelope className="text-xs" />,
      action: () => {
        navigate("/contact");
        onClose();
      },
      previewData: {
        type: "nav",
        title: "Contact & Hire",
        description: "Gửi tin nhắn trực tiếp qua form email hoặc liên hệ qua mạng xã hội.",
        badges: ["Available for Hire", "Da Nang, VN"],
        meta: [
          { label: "Email", value: user_info.main.email },
          { label: "Location", value: "Da Nang, Vietnam" },
        ],
      },
    },

    // --- Projects Direct Jump ---
    ...user_info.projects.map((project) => ({
      id: `project-${project.slug}`,
      title: `inspect --project ${project.slug}`,
      subtitle: `${project.title} · ${project.technologies.slice(0, 40)}...`,
      category: "Projects" as const,
      icon: <VscInspect className="text-xs text-[var(--color-accent)]" />,
      action: () => {
        navigate(`/projects/${project.slug}`);
        onClose();
      },
      previewData: {
        type: "project" as const,
        title: project.title,
        description: project.description,
        image: project.cover,
        badges: project.techStack.slice(0, 4),
        meta: [
          { label: "Status", value: project.status },
          { label: "Category", value: project.category },
          {
            label: "Commits",
            value: project.githubContributions
              ? `${project.githubContributions} commits`
              : "Active",
          },
          { label: "Duration", value: project.duration },
        ],
        hint: "Nhấn Enter để mở Case Study chi tiết",
      },
    })),

    // --- Theme & Accent ---
    {
      id: "theme-toggle",
      title: `toggle-theme (${theme === "dark" ? "Light Mode" : "Dark Mode"})`,
      subtitle: `Switch system theme to ${theme === "dark" ? "Light" : "Dark"}`,
      category: "Theme & Accent",
      icon: theme === "dark" ? <FaSun className="text-xs text-amber-400" /> : <FaMoon className="text-xs text-indigo-400" />,
      action: () => {
        switchTheme();
        onClose();
      },
      previewData: {
        type: "theme",
        title: "System Theme Switcher",
        description: `Chuyển đổi giao diện sang chế độ ${theme === "dark" ? "Sáng (Studio Clean)" : "Tối (Obsidian Dark)"}.`,
        badges: [theme === "dark" ? "Light Mode" : "Dark Mode"],
        meta: [{ label: "Current Theme", value: theme }],
      },
    },
    ...([
      { key: "cyan", name: "Cyan Neon", hex: "#06b6d4", desc: "Default Dev-OS theme" },
      { key: "green", name: "Matrix Emerald", hex: "#10b981", desc: "Terminal hacker theme" },
      { key: "purple", name: "Cyberpunk Purple", hex: "#8b5cf6", desc: "Vaporwave futuristic theme" },
      { key: "amber", name: "Retro Amber", hex: "#f59e0b", desc: "Vintage CRT terminal theme" },
    ] as const).map((acc) => ({
      id: `accent-${acc.key}`,
      title: `set-accent --${acc.key}`,
      subtitle: `${acc.name} (${acc.desc})`,
      category: "Theme & Accent" as const,
      icon: <FaPalette className="text-xs" style={{ color: acc.hex }} />,
      action: () => {
        setAccent(acc.key as AccentTheme);
        onClose();
      },
      previewData: {
        type: "theme" as const,
        title: `${acc.name} Accent`,
        description: acc.desc,
        badges: [acc.key.toUpperCase()],
        meta: [
          { label: "Hex Color", value: acc.hex },
          { label: "Active", value: accent === acc.key ? "Yes (Current)" : "No" },
        ],
      },
    })),

    // --- Quick Actions ---
    {
      id: "action-email",
      title: "copy-to-clipboard: email",
      subtitle: user_info.main.email,
      category: "Quick Actions",
      icon: <FaEnvelope className="text-xs text-rose-400" />,
      action: () => {
        navigator.clipboard.writeText(user_info.main.email);
        alert(`Đã sao chép email: ${user_info.main.email}`);
        onClose();
      },
      previewData: {
        type: "action",
        title: "Copy Email Address",
        description: "Sao chép địa chỉ email cá nhân vào bộ nhớ tạm.",
        meta: [{ label: "Email", value: user_info.main.email }],
      },
    },
    {
      id: "action-github",
      title: "open-link: GitHub Profile",
      subtitle: user_info.socials.github,
      category: "Quick Actions",
      icon: <FaGithub className="text-xs" />,
      action: () => {
        window.open(user_info.socials.github, "_blank");
        onClose();
      },
      previewData: {
        type: "action",
        title: "GitHub Profile",
        description: "Mở trang cá nhân GitHub chính thức với các repository và commit activity.",
        meta: [{ label: "Profile", value: "@datmnt-dev" }],
      },
    },
    {
      id: "action-linkedin",
      title: "open-link: LinkedIn Profile",
      subtitle: "Mai Nguyễn Tiến Đạt on LinkedIn",
      category: "Quick Actions",
      icon: <FaLinkedin className="text-xs text-sky-400" />,
      action: () => {
        window.open(user_info.socials.linkedin, "_blank");
        onClose();
      },
      previewData: {
        type: "action",
        title: "LinkedIn Profile",
        description: "Kết nối mạng lưới công việc chuyên nghiệp trên LinkedIn.",
        meta: [{ label: "Platform", value: "LinkedIn" }],
      },
    },

    // --- Dev Tools ---
    {
      id: "dev-cv",
      title: "download ./CV_MaiNguyenTienDat.pdf",
      subtitle: "Official Software Engineer CV / Resume",
      category: "Dev Tools",
      icon: <FaDownload className="text-xs text-emerald-400" />,
      action: () => {
        const link = document.createElement("a");
        link.href = "/CV_MaiNguyenTienDat.pdf";
        link.download = "CV_MaiNguyenTienDat.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose();
      },
      previewData: {
        type: "action",
        title: "Download CV (PDF)",
        description: "Tải file CV bản mềm cập nhật mới nhất định dạng PDF của Mai Nguyễn Tiến Đạt.",
        meta: [{ label: "Filename", value: "CV_MaiNguyenTienDat.pdf" }],
      },
    },
    {
      id: "dev-matrix",
      title: "matrix --rain --exec",
      subtitle: "Easter egg: full-screen matrix code cascade",
      category: "Dev Tools",
      icon: <FaEye className="text-xs text-green-400" />,
      action: () => {
        onClose();
        setTimeout(() => onOpenMatrix(), 100);
      },
      previewData: {
        type: "action",
        title: "Matrix Rain Effect",
        description: "Chạy hiệu ứng dòng mưa mã nhị phân toàn màn hình kiểu Hacker / Cyberpunk.",
        meta: [{ label: "Mode", value: "Canvas Animation" }],
      },
    },
  ];

  // Filter commands by search & category
  const filteredCommands = commands.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase());
    const matchCategory =
      activeCategory === "All" || c.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const selectedCommand = filteredCommands[selectedIndex] || filteredCommands[0];

  // Key handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(
          (prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length
        );
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filteredCommands[selectedIndex]) {
          filteredCommands[selectedIndex].action();
        }
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onClose]);

  // Adjust scroll position of selected item
  useEffect(() => {
    if (!listRef.current) return;
    const selectedElement = listRef.current.children[selectedIndex] as HTMLElement;
    if (!selectedElement) return;

    const containerHeight = listRef.current.clientHeight;
    const elementTop = selectedElement.offsetTop;
    const elementHeight = selectedElement.clientHeight;

    if (elementTop + elementHeight > listRef.current.scrollTop + containerHeight) {
      listRef.current.scrollTop = elementTop + elementHeight - containerHeight;
    } else if (elementTop < listRef.current.scrollTop) {
      listRef.current.scrollTop = elementTop;
    }
  }, [selectedIndex]);

  if (!isOpen) return null;

  const categories = ["All", "Navigation", "Projects", "Theme & Accent", "Quick Actions", "Dev Tools"];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[12vh] px-4">
      {/* Overlay background */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Main Raycast Box (Split Pane: Left List, Right Preview) */}
      <div className="relative w-full max-w-4xl overflow-hidden rounded-2xl border border-[var(--ide-border)] bg-[var(--ide-surface)] shadow-2xl backdrop-blur-xl flex flex-col max-h-[75vh] animate-scaleIn duration-200">
        {/* Top Window Titlebar */}
        <div className="ide-titlebar !py-2 !px-4 flex items-center justify-between border-b border-[var(--ide-border)]">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
            <span className="ml-2 text-[11px] font-code text-[var(--color-subtext)]">
              raycast-spotlight: ~/commands · TienDat OS
            </span>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-code text-[var(--color-subtext)]">
            <kbd className="px-1.5 py-0.5 rounded border border-[var(--ide-border)]">ESC to close</kbd>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[var(--ide-border)] bg-[var(--color-bg-component)]/30">
          <FaSearch className="text-[var(--color-accent)] text-sm flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, project, or keyword (e.g., jobfinder, signalr, theme)..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full text-sm bg-transparent outline-none border-none text-[var(--color-text)] placeholder:text-[var(--color-subtext)] font-sans"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-[10px] font-code text-[var(--color-subtext)] hover:text-[var(--color-text)]"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pills Bar */}
        <div className="flex items-center gap-1.5 px-4 py-2 border-b border-[var(--ide-border)] overflow-x-auto bg-[var(--color-card)]/40 text-[11px] font-code custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setSelectedIndex(0);
              }}
              className={`px-2.5 py-1 rounded-lg transition-all whitespace-nowrap ${
                activeCategory === cat
                  ? "bg-[var(--color-accent)] text-white font-semibold"
                  : "text-[var(--color-subtext)] hover:bg-[var(--color-bg-component)] hover:text-[var(--color-text)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Split Body: Left List (60%), Right Preview (40%) */}
        <div className="grid md:grid-cols-12 flex-1 min-h-[380px] max-h-[50vh] overflow-hidden">
          {/* Left Column: Command Items */}
          <div
            ref={listRef}
            className="md:col-span-7 overflow-y-auto p-2 space-y-1 border-r border-[var(--ide-border)] custom-scrollbar"
          >
            {filteredCommands.length > 0 ? (
              filteredCommands.map((cmd, index) => {
                const isSelected = index === selectedIndex;
                return (
                  <div
                    key={cmd.id}
                    onClick={() => cmd.action()}
                    onMouseEnter={() => setSelectedIndex(index)}
                    className={`flex items-center justify-between gap-3 p-2.5 rounded-xl cursor-pointer transition-all border ${
                      isSelected
                        ? "border-[var(--color-accent)] bg-[rgba(var(--color-accent-rgb),0.12)] text-[var(--color-text)]"
                        : "border-transparent hover:bg-[var(--color-card)] text-[var(--color-text)]"
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg grid place-items-center flex-shrink-0 text-xs transition-colors ${
                          isSelected
                            ? "bg-[var(--color-accent)] text-white shadow"
                            : "bg-[var(--color-bg-component)] text-[var(--color-subtext)]"
                        }`}
                      >
                        {cmd.icon}
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-code font-semibold truncate">
                          {cmd.title}
                        </p>
                        <p className="text-[11px] text-[var(--color-subtext)] truncate">
                          {cmd.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-[9px] font-code px-1.5 py-0.5 rounded bg-[var(--color-bg-component)] text-[var(--color-subtext)] border border-[var(--ide-border)]">
                        {cmd.category}
                      </span>
                      {isSelected && (
                        <FaArrowRight className="text-[10px] text-[var(--color-accent)] animate-pulse" />
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="py-16 text-center text-[var(--color-subtext)]">
                <FaTerminal className="mx-auto mb-3 text-2xl opacity-40" />
                <p className="text-xs font-code">No commands found for &quot;{search}&quot;</p>
              </div>
            )}
          </div>

          {/* Right Column: Raycast Live Preview Pane (Hidden on Mobile) */}
          <div className="hidden md:flex md:col-span-5 p-5 flex-col justify-between bg-[var(--color-bg-component)]/20 overflow-y-auto custom-scrollbar">
            {selectedCommand && selectedCommand.previewData ? (
              <div className="space-y-4">
                {/* Image if project */}
                {selectedCommand.previewData.image && (
                  <div className="w-full h-32 rounded-xl overflow-hidden border border-[var(--ide-border)] bg-black/40 relative">
                    <img
                      src={selectedCommand.previewData.image}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => ((e.currentTarget.style.display = "none"))}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  </div>
                )}

                <div>
                  <span className="text-[10px] font-code uppercase tracking-wider text-[var(--color-accent)]">
                    Inspector Preview
                  </span>
                  <h3 className="font-display font-bold text-lg text-[var(--color-text)] mt-0.5">
                    {selectedCommand.previewData.title || selectedCommand.title}
                  </h3>
                  <p className="text-xs text-[var(--color-subtext)] mt-2 leading-relaxed">
                    {selectedCommand.previewData.description || selectedCommand.subtitle}
                  </p>
                </div>

                {/* Badges */}
                {selectedCommand.previewData.badges && (
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCommand.previewData.badges.map((b) => (
                      <span key={b} className="ide-badge text-[10px]">
                        {b}
                      </span>
                    ))}
                  </div>
                )}

                {/* Meta details */}
                {selectedCommand.previewData.meta && (
                  <div className="space-y-2 pt-3 border-t border-[var(--ide-border)] text-xs font-code">
                    {selectedCommand.previewData.meta.map((m, i) => (
                      <div key={i} className="flex justify-between py-1 border-b border-[var(--ide-border)]/50">
                        <span className="text-[var(--color-subtext)]">{m.label}:</span>
                        <span className="text-[var(--color-text)] font-semibold truncate max-w-[160px]">
                          {m.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12 text-[var(--color-subtext)] text-xs font-code">
                Select a command to view details
              </div>
            )}

            {/* Quick action footer */}
            <div className="pt-4 border-t border-[var(--ide-border)] flex items-center justify-between text-[11px] font-code text-[var(--color-subtext)]">
              <span className="text-[var(--color-accent)]">Press [Enter] to run</span>
              <kbd className="px-1.5 py-0.5 rounded bg-[var(--color-card)] border border-[var(--ide-border)]">
                ↵
              </kbd>
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="px-4 py-2.5 bg-[var(--color-card)] border-t border-[var(--ide-border)] flex items-center justify-between text-[10px] text-[var(--color-subtext)] font-code">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="px-1 py-0.5 rounded bg-[var(--color-bg-component)] border border-[var(--ide-border)]">↑</kbd>{" "}
              <kbd className="px-1 py-0.5 rounded bg-[var(--color-bg-component)] border border-[var(--ide-border)]">↓</kbd> Navigate
            </span>
            <span>
              <kbd className="px-1 py-0.5 rounded bg-[var(--color-bg-component)] border border-[var(--ide-border)]">↵</kbd> Select
            </span>
          </div>
          <span>Accent: <strong className="text-[var(--color-accent)]">{accent}</strong></span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
