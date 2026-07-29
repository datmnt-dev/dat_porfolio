import React from "react";
import MaskReveal from "./MaskReveal";
import TextReveal from "./TextReveal";

interface PageHeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "left" | "center";
  children?: React.ReactNode;
}

const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  subtitle,
  align = "center",
  children,
}) => {
  return (
    <section className="page-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh pointer-events-none" />
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" />
      <div
        className={`relative max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-12 ${
          align === "center" ? "text-center" : "text-left"
        }`}
      >
        {eyebrow && (
          <div className={`${align === "center" ? "mx-auto" : ""} w-fit`}>
            <span className="chip">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              <TextReveal wordDelay={36}>{eyebrow}</TextReveal>
            </span>
          </div>
        )}
        <h1 className="page-hero-title mt-5 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-normal leading-[1.05]">
          <TextReveal initialDelay={70}>{title}</TextReveal>
        </h1>
        {subtitle && (
          <MaskReveal
            delay={150}
            className={`mt-5 ${
              align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
            }`}
          >
            <p className="text-base sm:text-lg text-[var(--color-subtext)] leading-relaxed">
              {subtitle}
            </p>
          </MaskReveal>
        )}
        {children && (
          <MaskReveal
            delay={240}
            className={`mt-8 ${align === "center" ? "[&_.mask-reveal-inner]:flex [&_.mask-reveal-inner]:justify-center" : ""}`}
          >
            {children}
          </MaskReveal>
        )}
      </div>
    </section>
  );
};

export default PageHero;
