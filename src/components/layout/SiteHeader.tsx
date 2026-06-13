import React, { useState, useEffect, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import type { AppContextType, AccentTheme } from "../../types/AppContext";
import { CgDarkMode } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";
import { FaDownload, FaSearch } from "react-icons/fa";
import user_info from "../../data/userdata";

interface HeaderProps {
  switchTheme: () => void;
  onOpenPalette: () => void;
}

const navItems = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/projects", label: "Projects" },
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  { to: "/blog", label: "Blog" },
  { to: "/playground", label: "Lab" },
  { to: "/contact", label: "Contact" },
];

const AccentPicker: React.FC = () => {
  const { accent, setAccent } = useContext(AppContext);
  const colors: { key: AccentTheme; bg: string }[] = [
    { key: "cyan", bg: "bg-cyan-500" },
    { key: "green", bg: "bg-emerald-500" },
    { key: "purple", bg: "bg-purple-500" },
    { key: "amber", bg: "bg-amber-500" },
  ];
  return (
    <div className="flex items-center gap-1.5">
      {colors.map((c) => (
        <button
          key={c.key}
          onClick={() => setAccent(c.key)}
          className={`w-4 h-4 rounded-full ${c.bg} transition-transform hover:scale-125 ${
            accent === c.key ? "ring-2 ring-offset-2 ring-offset-[var(--color-bg)] ring-[var(--color-accent)]" : ""
          }`}
          title={`Accent: ${c.key}`}
          aria-label={`Switch accent to ${c.key}`}
        />
      ))}
    </div>
  );
};

const SiteHeader: React.FC<HeaderProps> = ({ switchTheme, onOpenPalette }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenPalette();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenPalette]);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-2 backdrop-blur-xl border-b"
            : "py-4"
        }`}
        style={{
          backgroundColor: isScrolled ? "rgba(var(--bg-rgb, 0,0,0), 0.0)" : "transparent",
          background: isScrolled ? "color-mix(in oklab, var(--color-bg) 75%, transparent)" : "transparent",
          borderColor: isScrolled ? "var(--color-border)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group min-w-0">
              <div className="relative w-10 h-10 flex-shrink-0">
                <div className="absolute inset-0 rounded-xl bg-[var(--gradient-accent,linear-gradient(135deg,var(--color-accent),var(--color-accent-hover)))] opacity-90 blur-[6px] group-hover:opacity-100 transition" />
                <div className="relative w-10 h-10 rounded-xl overflow-hidden ring-2 ring-[var(--color-accent)] bg-[var(--color-card)]">
                  <img
                    src={user_info.main.photo}
                    alt={user_info.main.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="hidden sm:block min-w-0">
                <div className="font-display font-bold text-sm text-[var(--color-text)] truncate">
                  {user_info.main.shortName}
                  <span className="text-[var(--color-accent)]">.</span>
                </div>
                <div className="text-[10px] font-code text-[var(--color-subtext)] truncate">
                  ~/portfolio · {user_info.main.role}
                </div>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1 p-1 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-component)]/60 backdrop-blur">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `relative px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                      isActive
                        ? "text-white"
                        : "text-[var(--color-text)] hover:text-[var(--color-accent)]"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span
                          className="absolute inset-0 rounded-xl -z-0"
                          style={{ background: "var(--gradient-accent)" }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <div className="hidden xl:block">
                <AccentPicker />
              </div>

              <button
                onClick={onOpenPalette}
                className="hidden md:flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-component)]/60 hover:border-[var(--color-accent)] transition text-xs text-[var(--color-subtext)]"
                title="Command palette (Ctrl+K)"
              >
                <FaSearch className="text-[10px]" />
                <span className="hidden xl:inline">Search</span>
                <kbd className="hidden xl:inline-block px-1 py-px rounded border border-[var(--color-border)] text-[9px] font-code">
                  Ctrl K
                </kbd>
              </button>

              <button
                onClick={switchTheme}
                className="p-2 rounded-xl text-[var(--color-text)] hover:text-[var(--color-accent)] hover:bg-[var(--color-bg-component)] transition"
                aria-label="Toggle theme"
              >
                <CgDarkMode className="text-lg" />
              </button>

              <a
                href="/CV_MaiNguyenTienDat.pdf"
                download
                className="hidden sm:inline-flex btn-primary !py-1.5 !px-3 !text-xs"
              >
                <FaDownload className="text-[10px]" />
                <span>Resume</span>
              </a>

              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl text-[var(--color-text)] hover:bg-[var(--color-bg-component)] transition"
                aria-label="Open menu"
              >
                <HiMenu className="text-xl" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Spacing under fixed header */}
      <div className="h-16" />

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <aside
          className={`absolute top-0 right-0 h-full w-80 max-w-[88vw] flex flex-col transition-transform duration-300 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          style={{
            backgroundColor: "var(--color-bg-component)",
            borderLeft: "1px solid var(--color-border)",
          }}
        >
          <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
            <span className="font-code text-xs text-[var(--color-accent)]">~/menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-card)]"
              aria-label="Close menu"
            >
              <HiX className="text-xl" />
            </button>
          </div>

          <div className="p-5 flex flex-col items-center text-center border-b border-[var(--color-border)]">
            <div className="w-20 h-20 rounded-2xl overflow-hidden ring-2 ring-[var(--color-accent)]">
              <img src={user_info.main.photo} alt="" className="w-full h-full object-cover" />
            </div>
            <h2 className="mt-3 font-display font-bold text-base">{user_info.main.name}</h2>
            <p className="text-xs text-[var(--color-accent)] font-code">{user_info.main.role}</p>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-2.5 rounded-xl text-sm transition-all ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-[var(--color-text)] hover:bg-[var(--color-card)] hover:text-[var(--color-accent)]"
                  }`
                }
                style={({ isActive }) =>
                  isActive ? { background: "var(--gradient-accent)" } : undefined
                }
              >
                <span className="text-[var(--color-accent)] mr-2 font-code text-xs">›</span>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-5 border-t border-[var(--color-border)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-code text-[var(--color-subtext)] uppercase">Accent</span>
              <AccentPicker />
            </div>
            <a
              href="/CV_MaiNguyenTienDat.pdf"
              download
              className="btn-primary w-full justify-center"
            >
              <FaDownload className="text-xs" />
              <span>Download CV</span>
            </a>
          </div>
        </aside>
      </div>

      <ScrollProgress />
    </>
  );
};

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="fixed top-0 inset-x-0 h-0.5 z-[60] pointer-events-none">
      <div
        className="h-full transition-all"
        style={{ width: `${progress}%`, background: "var(--gradient-accent)" }}
      />
    </div>
  );
};

export default SiteHeader;
