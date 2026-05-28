import React, { useState, useEffect, useRef, useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaSearch, FaKeyboard, FaTerminal, FaPalette, FaMoon, FaSun, FaDownload, FaEye } from "react-icons/fa";
import type { AccentTheme } from "../types/AppContext";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenMatrix: () => void;
}

interface CommandItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Navigation" | "Theme" | "Accent Color" | "Developer Tools";
  icon: React.ReactNode;
  action: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onOpenMatrix }) => {
  const { theme, switchTheme, accent, setAccent } = useContext(AppContext);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const commands: CommandItem[] = [
    {
      id: "nav-hero",
      title: "cd ~/home",
      subtitle: "Scroll to top / Hero area",
      category: "Navigation",
      icon: <FaTerminal className="text-xs" />,
      action: () => {
        document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "nav-projects",
      title: "cd ~/projects",
      subtitle: "Browse software engineering repositories",
      category: "Navigation",
      icon: <FaTerminal className="text-xs" />,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "nav-edu",
      title: "cd ~/education-and-experience",
      subtitle: "View academic milestones & jobs",
      category: "Navigation",
      icon: <FaTerminal className="text-xs" />,
      action: () => {
        document.getElementById("education-and-experience")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "nav-skills",
      title: "cd ~/skills",
      subtitle: "Explore technologies & stack levels",
      category: "Navigation",
      icon: <FaTerminal className="text-xs" />,
      action: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "nav-contact",
      title: "cd ~/contact",
      subtitle: "Connect or drop a direct message",
      category: "Navigation",
      icon: <FaTerminal className="text-xs" />,
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        onClose();
      },
    },
    {
      id: "theme-toggle",
      title: `npm run toggle-theme (${theme === "dark" ? "Light Mode" : "Dark Mode"})`,
      subtitle: `Switch current theme to ${theme === "dark" ? "light" : "dark"} mode`,
      category: "Theme",
      icon: theme === "dark" ? <FaSun className="text-xs" /> : <FaMoon className="text-xs" />,
      action: () => {
        switchTheme();
        onClose();
      },
    },
    {
      id: "accent-cyan",
      title: "set-accent --cyan",
      subtitle: "Apply Neon Cyan UI elements (Default Developer theme)",
      category: "Accent Color",
      icon: <FaPalette className="text-xs text-cyan-400" />,
      action: () => {
        setAccent("cyan");
        onClose();
      },
    },
    {
      id: "accent-green",
      title: "set-accent --green",
      subtitle: "Apply Hacker Emerald Green UI elements (Matrix theme)",
      category: "Accent Color",
      icon: <FaPalette className="text-xs text-emerald-400" />,
      action: () => {
        setAccent("green");
        onClose();
      },
    },
    {
      id: "accent-purple",
      title: "set-accent --purple",
      subtitle: "Apply Cyberpunk Purple UI elements (Vaporwave theme)",
      category: "Accent Color",
      icon: <FaPalette className="text-xs text-purple-400" />,
      action: () => {
        setAccent("purple");
        onClose();
      },
    },
    {
      id: "accent-amber",
      title: "set-accent --amber",
      subtitle: "Apply Classic Amber UI elements (Legacy Terminal theme)",
      category: "Accent Color",
      icon: <FaPalette className="text-xs text-amber-500" />,
      action: () => {
        setAccent("amber");
        onClose();
      },
    },
    {
      id: "dev-cv",
      title: "cat ./CV_MaiNguyenTienDat.pdf",
      subtitle: "Download official PDF resume",
      category: "Developer Tools",
      icon: <FaDownload className="text-xs" />,
      action: () => {
        const link = document.createElement("a");
        link.href = "/CV_MaiNguyenTienDat.pdf";
        link.download = "CV_MaiNguyenTienDat.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        onClose();
      },
    },
    {
      id: "dev-matrix",
      title: "matrix --rain --start",
      subtitle: "Easter Egg: Run interactive full-screen matrix rain animation",
      category: "Developer Tools",
      icon: <FaEye className="text-xs" />,
      action: () => {
        onClose();
        setTimeout(() => onOpenMatrix(), 100);
      },
    },
  ];

  // Filter commands
  const filteredCommands = commands.filter(
    (c) =>
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      c.category.toLowerCase().includes(search.toLowerCase())
  );

  // Key handlers
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
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

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
      {/* Overlay background */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />

      {/* Main dialog box */}
      <div className="relative w-full max-w-2xl overflow-hidden rounded-xl border border-zinc-200 bg-white/95 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950/95 backdrop-blur-md flex flex-col max-h-[50vh] animate-scaleIn duration-150">
        
        {/* Search Input block */}
        <div className="flex items-center gap-3 px-4 border-b border-zinc-200 dark:border-zinc-800">
          <FaSearch className="text-zinc-400 dark:text-zinc-500 text-sm" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command or search section (e.g. projects, theme, matrix)..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            className="w-full py-4 text-sm bg-transparent outline-none border-none text-zinc-800 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
          />
          <kbd className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900 text-[10px] text-zinc-500 font-mono">
            ESC
          </kbd>
        </div>

        {/* Command list */}
        <div
          ref={listRef}
          className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar max-h-[35vh]"
        >
          {filteredCommands.length > 0 ? (
            filteredCommands.map((cmd, index) => {
              const isSelected = index === selectedIndex;
              return (
                <div
                  key={cmd.id}
                  onClick={() => cmd.action()}
                  className={`flex items-center justify-between gap-4 p-3 rounded-lg cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[var(--color-accent)] text-white"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`p-2 rounded font-mono ${
                      isSelected
                        ? "bg-white/20 text-white"
                        : "bg-zinc-100 dark:bg-zinc-900 text-zinc-400"
                    }`}>
                      {cmd.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-mono font-medium truncate">{cmd.title}</p>
                      <p className={`text-[10px] truncate ${
                        isSelected ? "text-white/70" : "text-zinc-400 dark:text-zinc-500"
                      }`}>{cmd.subtitle}</p>
                    </div>
                  </div>

                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                    isSelected ? "bg-white/25 text-white" : "bg-zinc-200/50 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400"
                  }`}>
                    {cmd.category}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="py-8 text-center text-zinc-400 dark:text-zinc-600">
              <FaKeyboard className="mx-auto mb-2 text-2xl" />
              <p className="text-sm font-mono">No commands found for &quot;{search}&quot;</p>
            </div>
          )}
        </div>

        {/* Console info footer */}
        <div className="px-4 py-2 bg-zinc-50 dark:bg-zinc-900/40 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
          <span>Use ↑↓ arrows to navigate, [Enter] to run</span>
          <span>Active Accent: {accent}</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
