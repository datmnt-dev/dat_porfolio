import React, { useState, useEffect, useContext } from "react";
import { AppContext } from "../context/AppContext";
import type { AppContextType } from "../types/AppContext";
import { CgDarkMode } from "react-icons/cg";
import { HiMenu, HiX } from "react-icons/hi";
import { FaHome, FaProjectDiagram, FaGraduationCap, FaCode, FaEnvelope, FaDownload, FaSearch, FaTerminal } from "react-icons/fa";
import user_info from "../data/userdata";

interface HeaderProps {
  switchTheme: () => void;
  onOpenPalette: () => void;
}

const Header: React.FC<HeaderProps> = ({ switchTheme, onOpenPalette }) => {
  const { theme } = useContext<AppContextType>(AppContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navItems = [
    { id: "hero", label: "Home", icon: <FaHome /> },
    { id: "projects", label: "Projects", icon: <FaProjectDiagram /> },
    { id: "education-and-experience", label: "Background", icon: <FaGraduationCap /> },
    { id: "skills", label: "Skills", icon: <FaCode /> },
    { id: "contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  // Global key listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        onOpenPalette();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenPalette]);

  // Handle scroll effect
  useEffect(() => {
    const navItemIds = ["hero", "projects", "education-and-experience", "skills", "contact"];

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItemIds.map(id => document.getElementById(id));
      const scrollPosition = window.scrollY + 120;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(navItemIds[index]);
          }
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "py-3 shadow-lg border-b border-zinc-200/20 dark:border-zinc-800/40 backdrop-blur-md"
            : "py-5"
        }`}
        style={{
          backgroundColor: isScrolled
            ? theme === "dark"
              ? "rgba(3, 7, 18, 0.85)"
              : "rgba(248, 250, 252, 0.85)"
            : "transparent",
        }}
      >
        <div className="max-w-[1200px] mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo in developer style */}
            <button
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-3 group text-left"
            >
              <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-[var(--color-accent)] group-hover:scale-105 transition-transform duration-300">
                <img
                  src={user_info.main.photo}
                  alt={user_info.main.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h1 className="font-code font-bold text-sm text-[var(--color-text)] flex items-center gap-1 group-hover:text-[var(--color-accent)] transition-colors">
                  <span className="text-[var(--color-accent)]">&lt;</span>
                  {user_info.main.name.split(" ").slice(-2).join("")}
                  <span className="text-[var(--color-accent)]">/&gt;</span>
                </h1>
                <p className="text-[10px] font-mono text-[var(--color-subtext)]">~/tiendat-portfolio</p>
              </div>
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3.5 py-1.5 rounded-lg font-mono text-xs transition-all duration-300 flex items-center gap-2 ${
                    activeSection === item.id
                      ? "bg-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent-glow)]"
                      : "text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:bg-opacity-10 hover:text-[var(--color-accent)]"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Command Palette Button */}
              <button
                onClick={onOpenPalette}
                className="p-2 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:bg-opacity-10 hover:text-[var(--color-accent)] transition-all duration-300 flex items-center gap-1.5"
                title="Open Command Palette (Ctrl+K)"
                aria-label="Command Palette"
              >
                <FaSearch className="text-sm" />
                <kbd className="hidden lg:inline-block px-1.5 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-[9px] font-mono">
                  Ctrl+K
                </kbd>
              </button>

              {/* Theme Toggle */}
              <button
                onClick={switchTheme}
                className="p-2 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:bg-opacity-10 hover:text-[var(--color-accent)] transition-all duration-300"
                aria-label="Toggle Theme"
              >
                <CgDarkMode className="text-xl" />
              </button>

              {/* Download CV */}
              <a
                href="/CV_MaiNguyenTienDat.pdf"
                download
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[var(--color-accent)] text-white hover:opacity-90 transition-all duration-300 text-xs font-mono font-medium shadow-md shadow-[var(--color-accent-glow)]"
              >
                <FaDownload className="text-xs" />
                <span>Resume</span>
              </a>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:bg-opacity-10 transition-all duration-300"
                aria-label="Toggle Menu"
              >
                {isMobileMenuOpen ? <HiX className="text-xl" /> : <HiMenu className="text-xl" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-30 md:hidden transition-all duration-300 ${
          isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" />
      </div>

      {/* Mobile Sidebar */}
      <nav
        className={`fixed top-0 right-0 z-40 h-full w-72 md:hidden transition-transform duration-300 flex flex-col justify-between ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{
          backgroundColor: "var(--color-bg-component)",
          borderLeft: "1px solid var(--color-border)",
        }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="font-code text-xs text-[var(--color-accent)]">~/menu</span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 rounded-lg text-[var(--color-text)] hover:bg-zinc-800/10"
            >
              <HiX className="text-xl" />
            </button>
          </div>

          <div className="mt-4 text-center mb-6">
            <div className="w-16 h-16 mx-auto rounded-lg overflow-hidden border-2 border-[var(--color-accent)]">
              <img
                src={user_info.main.photo}
                alt={user_info.main.name}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="mt-3 font-code font-bold text-sm text-[var(--color-text)]">
              {user_info.main.name}
            </h2>
            <p className="text-[10px] font-mono text-[var(--color-accent)]">{user_info.main.role}</p>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`w-full px-4 py-2.5 rounded-lg font-mono text-xs text-left transition-all duration-300 flex items-center gap-3 ${
                  activeSection === item.id
                    ? "bg-[var(--color-accent)] text-white"
                    : "text-[var(--color-text)] hover:bg-[var(--color-accent)] hover:bg-opacity-10"
                }`}
              >
                <span className="text-sm text-[var(--color-accent)]">$</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-zinc-200/10 space-y-3">
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenPalette();
            }}
            className="w-full py-2.5 rounded-lg border border-[var(--color-border)] text-[var(--color-text)] font-mono text-xs flex items-center justify-center gap-2 hover:bg-zinc-800/5 dark:hover:bg-zinc-800/20"
          >
            <FaSearch className="text-xs" />
            Command Palette
          </button>
          
          <a
            href="/CV_MaiNguyenTienDat.pdf"
            download
            className="w-full py-2.5 rounded-lg bg-[var(--color-accent)] text-white font-mono text-xs flex items-center justify-center gap-2 shadow-md shadow-[var(--color-accent-glow)]"
          >
            <FaDownload className="text-xs" />
            Download CV
          </a>
        </div>
      </nav>

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Header spacing */}
      <div className="h-16" />
    </>
  );
};

const ScrollProgress: React.FC = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 z-[60] bg-transparent">
      <div
        className="h-full bg-[var(--color-accent)] transition-all duration-100"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default Header;
