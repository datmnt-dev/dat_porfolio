import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router-dom";
import { CgDarkMode } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";
import { FaDownload, FaSearch } from "react-icons/fa";
import user_info from "../../data/userdata";

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

const SiteHeader: React.FC<HeaderProps> = ({ switchTheme, onOpenPalette }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenPalette]);

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

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-40 h-16 transition-colors duration-200 ${
          isScrolled
            ? "border-b backdrop-blur-xl"
            : ""
        }`}
        style={{
          backgroundColor: isScrolled
            ? "color-mix(in srgb, var(--color-bg) 85%, transparent)"
            : "transparent",
          borderColor: isScrolled ? "var(--color-border)" : "transparent",
        }}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group select-none text-[var(--color-text)] transition-opacity hover:opacity-90"
            aria-label="Tien Dat Home"
          >
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-[var(--color-border)] bg-[var(--color-card)] flex-shrink-0">
              <img
                src={user_info.main.photo}
                alt={user_info.main.name}
                className="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-300"
              />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-bold text-base tracking-tight text-[var(--color-text)]">
                Tien Dat
              </span>
              <span className="text-[var(--color-accent)] font-bold text-base">.</span>
            </div>
          </Link>

          {/* Desktop Primary Nav */}
          <nav
            className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-full border border-[var(--color-border)] bg-[var(--color-card)]/70 backdrop-blur-md shadow-xs"
            aria-label="Primary navigation"
          >
            {primaryNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3.5 py-1 text-xs font-medium rounded-full transition-colors ${
                    isActive
                      ? "text-white bg-[var(--color-accent)]"
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
              className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-card)] text-xs text-[var(--color-subtext)] hover:text-[var(--color-text)] hover:border-[var(--color-accent)] transition-colors cursor-pointer"
              title="Command Palette (Ctrl+K)"
              aria-label="Open command palette"
            >
              <FaSearch className="text-[10px]" />
              <kbd className="px-1.5 py-0.5 rounded border border-[var(--color-border)] text-[9px] font-code bg-[var(--color-bg-component)]">
                Ctrl K
              </kbd>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={switchTheme}
              className="p-2 rounded-lg text-[var(--color-subtext)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-component)] border border-transparent hover:border-[var(--color-border)] transition-colors cursor-pointer"
              aria-label="Toggle dark/light theme"
            >
              <CgDarkMode className="text-lg" />
            </button>

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
          className="absolute inset-0 bg-black/50 backdrop-blur-xs"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <aside
          className={`absolute top-0 right-0 h-full w-72 max-w-[85vw] flex flex-col border-l border-[var(--color-border)] bg-[var(--color-bg)] transition-transform duration-220 ease-out shadow-2xl ${
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
          </nav>

          <div className="p-4 border-t border-[var(--color-border)] space-y-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenPalette();
              }}
              className="w-full py-2 px-3 rounded-lg border border-[var(--color-border)] text-xs text-[var(--color-text)] hover:border-[var(--color-accent)] flex items-center justify-center gap-2 transition-colors cursor-pointer"
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
