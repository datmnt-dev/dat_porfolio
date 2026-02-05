import { useContext, useEffect } from "react";
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
import ContactEmail from "../components/ContactEmail";
const Homepage = () => {
  const { theme, switchTheme } = useContext<AppContextType>(AppContext);
  const location = useLocation();

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
      <Header switchTheme={switchTheme} />
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
        <ContactEmail />

        <hr
          className="mt-12 border"
          style={{ borderColor: "var(--color-border)" }}
        />
        <Footer theme={theme} />
      </div>
      <BackToTop />
    </div>
  );
};

export default Homepage; 
