import React from "react";

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
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh pointer-events-none" />
      <div className="absolute inset-0 bg-grid pointer-events-none opacity-60" />
      <div
        className={`relative max-w-7xl mx-auto px-4 lg:px-8 pt-16 pb-12 ${
          align === "center" ? "text-center" : "text-left"
        }`}
      >
        {eyebrow && (
          <div className={`reveal ${align === "center" ? "mx-auto" : ""} w-fit`}>
            <span className="chip">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
              {eyebrow}
            </span>
          </div>
        )}
        <h1 className="reveal reveal-1 mt-5 font-display font-extrabold text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.05]">
          {title}
        </h1>
        {subtitle && (
          <p
            className={`reveal reveal-2 mt-5 text-base sm:text-lg text-[var(--color-subtext)] leading-relaxed ${
              align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
            }`}
          >
            {subtitle}
          </p>
        )}
        {children && (
          <div className={`reveal reveal-3 mt-8 ${align === "center" ? "flex justify-center" : ""}`}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

export default PageHero;
