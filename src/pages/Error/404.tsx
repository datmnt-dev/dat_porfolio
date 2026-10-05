import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { HiArrowLeft, HiCommandLine } from "react-icons/hi2";
import { CgDarkMode } from "react-icons/cg";
import { AppContext } from "../../context/AppContext";

const NotFound: React.FC = () => {
  const location = useLocation();
  const { theme, switchTheme } = useContext(AppContext);
  const isDark = theme === "dark";

  const handleOpenCommandPalette = () => {
    window.dispatchEvent(new CustomEvent("open-command-palette"));
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-between selection:bg-[var(--color-accent)] selection:text-white"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      {/* Top minimal bar */}
      <header
        className="w-full border-b px-6 py-4 flex items-center justify-between"
        style={{ borderColor: "var(--color-border)" }}
      >
        <Link
          to="/"
          className="font-display font-semibold tracking-tight text-base hover:text-[var(--color-accent)] transition-colors"
        >
          Tien Dat<span className="text-[var(--color-accent)]">.</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={switchTheme}
            className="w-8 h-8 rounded-lg grid place-items-center border text-sm transition-colors cursor-pointer"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-card)",
              color: "var(--color-subtext)",
            }}
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
            aria-label="Toggle color theme"
          >
            <CgDarkMode />
          </button>
        </div>
      </header>

      {/* Main 404 block */}
      <main className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="max-w-xl w-full text-center sm:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border mb-6"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-card)",
              color: "var(--color-accent)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            HTTP 404 · Unresolved Node
          </div>

          <h1
            className="font-display font-bold tracking-tight mb-3 text-7xl sm:text-8xl"
            style={{
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            404
          </h1>

          <p className="text-xl sm:text-2xl font-medium tracking-tight mb-4 text-[var(--color-text)]">
            Looks like this route isn&apos;t in the graph.
          </p>

          <p className="text-sm text-[var(--color-subtext)] leading-relaxed mb-6 font-sans">
            The requested path could not be resolved to any active route, project case study, or engineering note.
          </p>

          {/* Diagnostic terminal snippet */}
          <div
            className="rounded-xl border p-4 mb-8 font-mono text-xs text-left"
            style={{
              backgroundColor: "var(--color-card)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="text-[var(--color-subtext)] mb-1">// router.resolve(pathname)</div>
            <div className="text-red-400">
              <span className="text-[var(--color-subtext)]">&gt;</span> Error: Route &apos;{location.pathname}&apos; not found
            </div>
            <div className="text-[var(--color-subtext)] mt-1">
              &gt; suggestions: [&quot;/&quot;, &quot;/projects&quot;, &quot;/about&quot;, &quot;/blog&quot;]
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
              style={{
                backgroundColor: "var(--color-text)",
                color: "var(--color-bg)",
              }}
            >
              <HiArrowLeft className="text-base" />
              <span>Back to home</span>
            </Link>

            <Link
              to="/projects"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-colors"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-card)",
                color: "var(--color-text)",
              }}
            >
              <span>Selected work</span>
            </Link>

            <button
              onClick={handleOpenCommandPalette}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-mono border transition-colors cursor-pointer"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "transparent",
                color: "var(--color-subtext)",
              }}
              title="Command Palette"
            >
              <HiCommandLine />
              <span>Ctrl + K</span>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom status */}
      <footer
        className="w-full border-t px-6 py-3 flex items-center justify-between text-xs font-mono text-[var(--color-subtext)]"
        style={{ borderColor: "var(--color-border)" }}
      >
        <span>Mai Nguyen Tien Dat · Portfolio</span>
        <span>Da Nang, Vietnam</span>
      </footer>
    </div>
  );
};

export default NotFound;
