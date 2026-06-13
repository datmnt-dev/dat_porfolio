import React from "react";

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
    <div className={`flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10 ${wrap}`}>
      <div className={align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}>
        {eyebrow && (
          <span className="chip mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />
            {eyebrow}
          </span>
        )}
        <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight leading-tight">
          {title}
        </h2>
        {description && (
          <p className="mt-3 text-[var(--color-subtext)] leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
};

export default SectionHeader;
