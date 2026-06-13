import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import type { AppContextType } from "../../types/AppContext";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import BackToTop from "../BackToTop";
import CommandPalette from "../CommandPalette";
import MatrixRain from "../MatrixRain";

const SiteLayout = () => {
  const { switchTheme } = useContext<AppContextType>(AppContext);
  const location = useLocation();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen flex flex-col transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-bg)",
        color: "var(--color-text)",
      }}
    >
      <SiteHeader
        switchTheme={switchTheme}
        onOpenPalette={() => setIsPaletteOpen(true)}
      />
      <main className="flex-1 w-full">
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
