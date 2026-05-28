import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import type { AppContextType } from "../types/AppContext";
import Header from "../components/Header";
import BackToTop from "../components/BackToTop";
import Footer from "../components/Footer";
import "./HomePage.css";
import Hero from "../components/Hero";
import Projects from "../components/sections/Project";
import EducationAndExperience from "../components/EducationAndEperience";
import Skills from "../components/Skills";
import Contact from "../components/Contact";
import CommandPalette from "../components/CommandPalette";
import MatrixRain from "../components/MatrixRain";

const Homepage = () => {
  const { theme, switchTheme } = useContext<AppContextType>(AppContext);
  const location = useLocation();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isMatrixActive, setIsMatrixActive] = useState(false);

  useEffect(() => {
    if (window.HSStaticMethods) {
      window.HSStaticMethods.autoInit();
    }
  }, [location.pathname]);

  return (
    <div
      className="min-h-screen transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-bg-component)",
        color: "var(--color-text)",
      }}
    >
      <Header
        switchTheme={switchTheme}
        onOpenPalette={() => setIsPaletteOpen(true)}
      />
      <div
        className="xl:w-[1200px] md:mx-auto h-full border-x"
        style={{
          backgroundColor: "var(--color-bg)",
          borderColor: "var(--color-border)",
          boxShadow: "var(--shadow-soft)",
        }}
      >
        <Hero />
        <Projects />
        <EducationAndExperience />
        <Skills />
        <Contact />

        <hr
          className="mt-12 border"
          style={{ borderColor: "var(--color-border)" }}
        />
        <Footer theme={theme} />
      </div>
      <BackToTop />

      {/* Global Developer Modals */}
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

export default Homepage;
