import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";
import { useLenis } from "../motion";

const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollTo } = useLenis();

  useEffect(() => {
    let ticking = false;
    const toggleVisibility = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    scrollTo(0);
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-50 p-3 sm:p-3.5 rounded-full shadow-lg border border-white/15 transition-all duration-200 cursor-pointer ${
        isVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
      style={{
        backgroundColor: "var(--color-accent)",
        color: "white",
      }}
      aria-label="Back to Top"
    >
      <FaArrowUp className="text-sm" />
    </button>
  );
};

export default BackToTop;
