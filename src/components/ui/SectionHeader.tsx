import React from "react";
import MaskReveal from "./MaskReveal";
import TextReveal from "./TextReveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  action?: React.ReactNode;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  title,
  description,
  align = "left",
  action,
}) => {
  const wrap = align === "center" ? "text-center" : "";
  return (
    <div className={`section-header flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10 ${wrap}`}>
      <div className={align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <span className="chip mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
            <TextReveal wordDelay={36}>{eyebrow}</TextReveal>
          </span>
        )}
        <h2 className="section-header-title font-display font-bold text-3xl sm:text-4xl tracking-normal leading-tight">
          <TextReveal>{title}</TextReveal>
        </h2>
        {description && (
          <MaskReveal delay={110} className="mt-3">
            <p className="text-[var(--color-subtext)] leading-relaxed">{description}</p>
          </MaskReveal>
        )}
      </div>
      {action && (
        <MaskReveal delay={170} className="flex-shrink-0">
          {action}
        </MaskReveal>
      )}
    </div>
  );
};

export default SectionHeader;
