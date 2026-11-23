import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";
import { FaTerminal, FaCodeBranch, FaSun, FaMoon } from "react-icons/fa";
import { VscCheck, VscRadioTower } from "react-icons/vsc";

interface IDEStatusBarProps {
  onOpenPalette: () => void;
  onOpenMatrix: () => void;
}

const IDEStatusBar: React.FC<IDEStatusBarProps> = ({ onOpenPalette, onOpenMatrix }) => {
  const { theme, switchTheme, accent } = useContext(AppContext);

  return (
    <footer
      className="fixed bottom-0 inset-x-0 z-30 h-7 border-t border-[var(--color-border)] backdrop-blur-md flex items-center justify-between px-3 text-[10px] font-code select-none transition-colors"
      style={{
        backgroundColor: "color-mix(in srgb, var(--color-card) 92%, transparent)",
        color: "var(--color-subtext)",
      }}
      aria-label="Status Bar"
    >
      {/* Left side: Branch & availability */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenPalette}
          className="flex items-center gap-1.5 hover:text-[var(--color-text)] transition-colors cursor-pointer"
          title="Open Command Palette (Ctrl+K)"
        >
          <FaCodeBranch className="text-[9px] text-[var(--color-accent)]" />
          <span className="font-semibold text-[var(--color-text)]">main</span>
          <VscCheck className="text-emerald-600 dark:text-emerald-400" />
        </button>

        <span className="opacity-35 hidden sm:inline">|</span>

        <div className="hidden sm:flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span className="truncate font-medium">Open for opportunities</span>
        </div>

        <span className="opacity-35 hidden md:inline">|</span>

        <span className="hidden md:inline text-[10px]">
          React · TypeScript · .NET · NestJS
        </span>
      </div>

      {/* Right side: Location, Theme, Accent, Shortcuts */}
      <div className="flex items-center gap-3">
        <div className="hidden lg:flex items-center gap-1">
          <VscRadioTower className="text-[10px] text-[var(--color-accent)]" />
          <span>Đà Nẵng, VN</span>
        </div>

        <span className="opacity-35 hidden lg:inline">|</span>

        <button
          type="button"
          onClick={switchTheme}
          className="hidden sm:inline-flex items-center gap-1.5 hover:text-[var(--color-text)] transition-colors cursor-pointer"
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
        >
          {theme === "dark" ? (
            <FaMoon className="text-[9px] text-sky-400" />
          ) : (
            <FaSun className="text-[10px] text-amber-500" />
          )}
          <span className="capitalize font-medium text-[var(--color-text)]">{theme}</span>
        </button>

        <span className="opacity-35 hidden sm:inline">|</span>

        <div className="hidden sm:flex items-center gap-1">
          <span className="uppercase text-[9px] text-[var(--color-subtext)]">accent</span>
          <span className="text-[var(--color-accent)] font-semibold">{accent}</span>
        </div>

        <span className="opacity-35 hidden sm:inline">|</span>

        <button
          onClick={onOpenPalette}
          className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-[var(--color-bg-component)] text-[var(--color-text)] hover:border-[var(--color-accent)] border border-[var(--color-border)] text-[9px] transition-colors cursor-pointer"
          title="Open Command Palette"
        >
          <kbd>Ctrl+K</kbd>
        </button>

        <button
          onClick={onOpenMatrix}
          className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors cursor-pointer p-0.5"
          title="Matrix Easter Egg"
          aria-label="Launch Matrix rain easter egg"
        >
          <FaTerminal className="text-[9px]" />
        </button>
      </div>
    </footer>
  );
};

export default IDEStatusBar;
