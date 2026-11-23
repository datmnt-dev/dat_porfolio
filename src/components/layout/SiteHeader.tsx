import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";
import { FaDownload, FaSearch, FaSun, FaMoon, FaCheck, FaCrosshairs } from "react-icons/fa";
import user_info from "../../data/userdata";
import { AppContext } from "../../context/AppContext";
import type { AccentTheme } from "../../types/AppContext";

interface HeaderProps {
  switchTheme: () => void;
  onOpenPalette: () => void;
}

// Editorial desktop navigation: Work, About, Notes, Lab
const primaryNavItems = [
  { to: "/projects", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/blog", label: "Notes" },
  { to: "/playground", label: "Lab" },
];

const secondaryNavItems = [
  { to: "/experience", label: "Experience" },
  { to: "/skills", label: "Skills" },
  { to: "/contact", label: "Contact" },
];

const ACCENT_OPTIONS: {
  key: AccentTheme;
  label: string;
  lightSwatch: string;
  darkSwatch: string;
}[] = [
  { key: "cyan", label: "Ocean", lightSwatch: "#0284c7", darkSwatch: "#06b6d4" },
  { key: "green", label: "Emerald", lightSwatch: "#059669", darkSwatch: "#10b981" },
  { key: "purple", label: "Violet", lightSwatch: "#7c3aed", darkSwatch: "#8b5cf6" },
  { key: "amber", label: "Amber", lightSwatch: "#b45309", darkSwatch: "#f59e0b" },
];

const SiteHeader: React.FC<HeaderProps> = ({ switchTheme, onOpenPalette }) => {
  const { theme, accent, setAccent, customCursor, toggleCustomCursor } = useContext(AppContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAppearanceOpen, setIsAppearanceOpen] = useState(false);
  const appearanceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenPalette();
      }
      if (e.key === "Escape") {
        setIsAppearanceOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenPalette]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (appearanceRef.current && !appearanceRef.current.contains(e.target as Node)) {
        setIsAppearanceOpen(false);
      }
    };
    if (isAppearanceOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isAppearanceOpen]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 16);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const setTargetTheme = (target: "light" | "dark") => {
    if (theme !== target) {
      switchTheme();
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 h-16 transition-all duration-200 ${
          isScrolled ? "border-b backdrop-blur-xl shadow-xs" : ""
        }`}
        style={{
          backgroundColor: isScrolled
            ? "color-mix(in srgb, var(--color-card) 86%, transparent)"
            : "transparent",
          borderColor: isScrolled ? "var(--color-border)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group select-none text-[var(--color-text)] transition-opacity hover:opacity-95"
            aria-label="Tien Dat Home"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-[var(--color-border-strong)] bg-[var(--color-card)] shadow-xs flex-shrink-0 ring-1 ring-black/5 dark:ring-white/10">
              <img
                src={user_info.main.photo}
                alt={user_info.main.name}
                className="w-full h-full object-cover object-[49%_66%] origin-[49%_66%] scale-[2.15] transition-transform duration-300 group-hover:scale-[2.28]"
              />
            </div>
            <div className="flex items-baseline gap-0.5">
              <span className="font-display font-bold text-base tracking-tight text-[var(--color-text)]">
                Tien Dat
              </span>
              <span className="text-[var(--color-accent)] font-bold text-base">.</span>
            </div>
          </Link>

          {/* Desktop Primary Nav */}
          <nav
            className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)]/90 backdrop-blur-md shadow-[var(--shadow-soft)]"
            aria-label="Primary navigation"
          >
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3.5 py-1 text-xs font-medium rounded-full transition-all ${
                    isActive
                      ? "text-white bg-[var(--color-accent)] shadow-xs"
                      : "text-[var(--color-subtext)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-component)]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* Right Action Items */}
          <div className="flex items-center gap-2">
            {/* Command Palette Trigger */}
            <button
              onClick={onOpenPalette}
              className="hidden lg:inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] shadow-2xs text-xs text-[var(--color-subtext)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
              title="Command Palette (Ctrl+K)"
              aria-label="Open command palette"
            >
              <FaSearch className="text-[10px]" />
              <kbd className="px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[9px] font-code bg-[var(--color-bg-component)] text-[var(--color-text)]">
                Ctrl K
              </kbd>
            </button>

            {/* Clear Segmented Light / Dark Switch + Accent Swatch Popover */}
            <div className="relative flex items-center gap-1.5" ref={appearanceRef}>
              <div
                className="inline-flex items-center p-0.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] shadow-2xs"
                role="group"
                aria-label="Theme mode switcher"
              >
                <button
                  type="button"
                  onClick={() => setTargetTheme("light")}
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                    theme === "light"
                      ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)] ring-1 ring-[rgba(var(--color-accent-rgb),0.28)]"
                      : "text-[var(--color-subtext)] hover:text-[var(--color-text)]"
                  }`}
                  title="Chế độ sáng (Light Mode)"
                  aria-label="Switch to Light mode"
                  aria-pressed={theme === "light"}
                >
                  <FaSun className={`text-xs ${theme === "light" ? "text-amber-500" : ""}`} />
                  <span className="hidden xl:inline">Light</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTargetTheme("dark")}
                  className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[11px] font-medium transition-all cursor-pointer ${
                    theme === "dark"
                      ? "bg-[var(--color-accent-soft)] text-[var(--color-accent)] ring-1 ring-[rgba(var(--color-accent-rgb),0.3)]"
                      : "text-[var(--color-subtext)] hover:text-[var(--color-text)]"
                  }`}
                  title="Chế độ tối (Dark Mode)"
                  aria-label="Switch to Dark mode"
                  aria-pressed={theme === "dark"}
                >
                  <FaMoon className={`text-[11px] ${theme === "dark" ? "text-sky-400" : ""}`} />
                  <span className="hidden xl:inline">Dark</span>
                </button>
              </div>

              {/* Compact Accent Color Trigger */}
              <button
                type="button"
                onClick={() => setIsAppearanceOpen((prev) => !prev)}
                className="hidden sm:inline-flex items-center justify-center w-8 h-8 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] hover:border-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] shadow-2xs transition-colors cursor-pointer"
                title="Đổi màu chủ đạo (Accent Theme)"
                aria-label="Choose accent color theme"
                aria-expanded={isAppearanceOpen}
              >
                <span
                  className="w-3.5 h-3.5 rounded-full ring-2 ring-offset-2 ring-offset-[var(--color-card)] ring-[var(--color-border-strong)]"
                  style={{ backgroundColor: "var(--color-accent)" }}
                />
              </button>

              {/* Accent Popover */}
              {isAppearanceOpen && (
                <div
                  className="absolute right-0 top-11 w-56 rounded-xl border border-[var(--color-border)] bg-[var(--color-card)] p-3.5 shadow-[var(--shadow-large)] z-50"
                  role="dialog"
                  aria-label="Appearance settings"
                >
                  <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[var(--color-border)]">
                    <span className="text-[11px] font-code font-semibold uppercase tracking-wider text-[var(--color-text)]">
                      Appearance
                    </span>
                    <span className="text-[10px] font-code text-[var(--color-accent)] capitalize">
                      {theme} · {accent}
                    </span>
                  </div>

                  {/* Theme toggle preview */}
                  <div className="grid grid-cols-2 gap-1.5 mb-3">
                    <button
                      type="button"
                      onClick={() => setTargetTheme("light")}
                      className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        theme === "light"
                          ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                          : "border-[var(--color-border)] bg-[var(--color-bg-component)] text-[var(--color-subtext)] hover:text-[var(--color-text)]"
                      }`}
                    >
                      <FaSun className="text-amber-500 text-xs" />
                      <span>Sáng</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setTargetTheme("dark")}
                      className={`flex items-center justify-center gap-1.5 py-1.5 px-2 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
                        theme === "dark"
                          ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                          : "border-[var(--color-border)] bg-[var(--color-bg-component)] text-[var(--color-subtext)] hover:text-[var(--color-text)]"
                      }`}
                    >
                      <FaMoon className="text-indigo-400 text-xs" />
                      <span>Tối</span>
                    </button>
                  </div>

                  {/* Accent Swatches */}
                  <div className="text-[10px] font-code uppercase tracking-wider text-[var(--color-subtext)] mb-2">
                    Màu chủ đạo
                  </div>
                  <div className="grid grid-cols-2 gap-1.5">
                    {ACCENT_OPTIONS.map((opt) => {
                      const active = accent === opt.key;
                      const swatch = theme === "dark" ? opt.darkSwatch : opt.lightSwatch;
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => setAccent(opt.key)}
                          className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg border text-xs transition-all cursor-pointer ${
                            active
                              ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-text)] font-semibold"
                              : "border-[var(--color-border)] text-[var(--color-subtext)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-component)]"
                          }`}
                        >
                          <span
                            className="w-3 h-3 rounded-full flex-shrink-0 grid place-items-center text-[7px] text-white"
                            style={{ backgroundColor: swatch }}
                          >
                            {active && <FaCheck />}
                          </span>
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Dev Crosshair Cursor Toggle */}
                  <div className="mt-3 pt-3 border-t border-[var(--color-border)] flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-code text-[var(--color-subtext)]">
                      <FaCrosshairs className="text-[10px] text-[var(--color-accent)]" />
                      <span>Dev Crosshair</span>
                    </span>
                    <button
                      type="button"
                      onClick={toggleCustomCursor}
                      role="switch"
                      aria-checked={customCursor}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors cursor-pointer ${
                        customCursor ? "bg-[var(--color-accent)]" : "bg-[var(--color-border-strong)]"
                      }`}
                      title="Bật/Tắt con trỏ Dev Crosshair"
                    >
                      <span
                        className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow-xs transition-transform ${
                          customCursor ? "translate-x-[18px]" : "translate-x-[3px]"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Resume Button */}
            <a
              href="/CV_MaiNguyenTienDat.pdf"
              download
              className="hidden sm:inline-flex items-center gap-1.5 btn-primary !py-1.5 !px-3 !text-xs !rounded-lg"
              title="Download Resume"
            >
              <FaDownload className="text-[10px]" />
              <span>Resume</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-bg-component)] transition-colors cursor-pointer"
              aria-label="Open navigation menu"
            >
              <HiMenu className="text-xl" />
            </button>
          </div>
        </div>
      </header>

      {/* Spacer under fixed header */}
      <div className="h-16" />

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden transition-opacity duration-200 ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation drawer"
      >
        <div
          className="absolute inset-0 bg-slate-950/45 dark:bg-black/60 backdrop-blur-xs"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <aside
          className={`absolute top-0 right-0 h-full w-72 max-w-[85vw] flex flex-col border-l border-[var(--color-border)] bg-[var(--color-card)] transition-transform duration-220 ease-out shadow-2xl ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
            <span className="font-display font-bold text-sm tracking-tight text-[var(--color-text)]">
              Menu
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 rounded-md text-[var(--color-subtext)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-component)] transition-colors cursor-pointer"
              aria-label="Close menu"
            >
              <HiX className="text-xl" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <div className="text-[10px] font-code uppercase tracking-wider text-[var(--color-subtext)] px-3 py-1 mb-1">
              Primary
            </div>
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "text-[var(--color-accent)] bg-[var(--color-accent-soft)] font-semibold"
                      : "text-[var(--color-text)] hover:bg-[var(--color-bg-component)]"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}

            <div className="pt-4 mt-4 border-t border-[var(--color-border)]">
              <div className="text-[10px] font-code uppercase tracking-wider text-[var(--color-subtext)] px-3 py-1 mb-1">
                More
              </div>
              {secondaryNavItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? "text-[var(--color-accent)] bg-[var(--color-accent-soft)] font-semibold"
                        : "text-[var(--color-subtext)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-component)]"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            {/* Mobile Appearance Controls */}
            <div className="pt-4 mt-4 border-t border-[var(--color-border)] px-2 space-y-2.5">
              <div className="text-[10px] font-code uppercase tracking-wider text-[var(--color-subtext)] px-1">
                Appearance
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  type="button"
                  onClick={() => setTargetTheme("light")}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium border cursor-pointer ${
                    theme === "light"
                      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                      : "border-[var(--color-border)] text-[var(--color-subtext)]"
                  }`}
                >
                  <FaSun className="text-amber-500 text-xs" />
                  <span>Sáng</span>
                </button>
                <button
                  type="button"
                  onClick={() => setTargetTheme("dark")}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium border cursor-pointer ${
                    theme === "dark"
                      ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
                      : "border-[var(--color-border)] text-[var(--color-subtext)]"
                  }`}
                >
                  <FaMoon className="text-indigo-400 text-xs" />
                  <span>Tối</span>
                </button>
              </div>
              <div className="flex items-center gap-2 pt-1">
                {ACCENT_OPTIONS.map((opt) => {
                  const active = accent === opt.key;
                  const swatch = theme === "dark" ? opt.darkSwatch : opt.lightSwatch;
                  return (
                    <button
                      key={opt.key}
                      type="button"
                      onClick={() => setAccent(opt.key)}
                      className={`flex-1 h-7 rounded-lg transition-all cursor-pointer grid place-items-center text-[9px] text-white ${
                        active ? "ring-2 ring-offset-2 ring-offset-[var(--color-card)] ring-[var(--color-accent)]" : "opacity-80"
                      }`}
                      style={{ backgroundColor: swatch }}
                      title={opt.label}
                      aria-label={`Set ${opt.label} accent`}
                    >
                      {active && <FaCheck />}
                    </button>
                  );
                })}
              </div>
            </div>
          </nav>

          <div className="p-4 border-t border-[var(--color-border)] space-y-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenPalette();
              }}
              className="w-full py-2 px-3 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg-component)] text-xs text-[var(--color-text)] hover:border-[var(--color-accent)] flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <FaSearch className="text-[10px]" />
              <span>Command Palette (Ctrl+K)</span>
            </button>
            <a
              href="/CV_MaiNguyenTienDat.pdf"
              download
              className="btn-primary w-full justify-center !py-2 text-xs"
            >
              <FaDownload className="text-[10px]" />
              <span>Download Resume</span>
            </a>
          </div>
        </aside>
      </div>

      <ScrollProgress />
    </>
  );
};

// Subtle 2px ScrollProgress using transform scaleX (hardware accelerated)
const ScrollProgress: React.FC = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const updateProgress = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollHeight > 0 ? window.scrollY / scrollHeight : 0;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${progress})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 inset-x-0 h-[2px] z-[60] pointer-events-none bg-transparent">
      <div
        ref={barRef}
        className="h-full bg-[var(--color-accent)] origin-left will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
};

export default SiteHeader;
