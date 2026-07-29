import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import type { AppContextType } from "../../types/AppContext";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import BackToTop from "../BackToTop";
import CommandPalette from "../CommandPalette";
import MatrixRain from "../MatrixRain";
import InteractiveCursorGlow from "../ui/InteractiveCursorGlow";

const SiteLayout = () => {
  const { switchTheme } = useContext<AppContextType>(AppContext);
  const location = useLocation();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  // Listen to custom events from other pages (like Playground)
  useEffect(() => {
    const handleOpenPalette = () => setIsPaletteOpen(true);
    const handleActivateMatrix = () => setIsMatrixActive(true);

    window.addEventListener("open-command-palette", handleOpenPalette);
    window.addEventListener("activate-matrix-rain", handleActivateMatrix);

    return () => {
      window.removeEventListener("open-command-palette", handleOpenPalette);
      window.removeEventListener("activate-matrix-rain", handleActivateMatrix);
    };
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300 relative overflow-hidden"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      <InteractiveCursorGlow />
      <SiteHeader
        switchTheme={switchTheme}
        onOpenPalette={() => setIsPaletteOpen(true)}
      />
      <main key={location.pathname} className="page-transition flex-1 w-full relative z-10">
        <Outlet />
      </main>
      <SiteFooter />
      <BackToTop />

      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
        onOpenMatrix={() => setIsMatrixActive(true)}
      />
      {isMatrixActive && (
        <MatrixRain onClose={() => setIsMatrixActive(false)} />
      )}
    </div>
  );
};

export default SiteLayout;
