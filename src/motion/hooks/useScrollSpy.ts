import { useState, useEffect } from "react";

export function useScrollSpy(sectionIds: string[], offset = 160): string {
  const [activeId, setActiveId] = useState<string>(sectionIds[0] || "");

  useEffect(() => {
    if (!sectionIds.length) return;

    let ticking = false;

    const determineActiveSection = () => {
      const scrollPosition = window.scrollY + offset;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(id);
            ticking = false;
            return;
          }
        }
      }

      if (sectionIds.length > 0) {
        setActiveId(sectionIds[0]);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(determineActiveSection);
        ticking = true;
      }
    };

    determineActiveSection();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sectionIds, offset]);

  return activeId;
}
