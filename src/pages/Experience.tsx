import React from "react";
import EducationAndExperience from "../components/EducationAndEperience";
import { Reveal } from "../motion";
import SectionDivider from "../components/ui/SectionDivider";

const ExperiencePage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Editorial Page Header */}
      <header className="space-y-4">
        <Reveal direction="right" distance={12} duration={580} delay={0}>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)] block mb-1">
            Engineering Trajectory
          </span>
        </Reveal>
        <Reveal direction="up" distance={26} duration={680} delay={60}>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--color-text)]">
            Experience & Education
          </h1>
        </Reveal>
        <Reveal direction="up" distance={16} duration={600} delay={120}>
          <p className="text-base sm:text-lg text-[var(--color-subtext)] max-w-2xl leading-relaxed">
            Quá trình phát triển năng lực qua từng dự án thật — tập trung vào những gì đã xây dựng, kết quả đạt được và bài học kỹ thuật rút ra.
          </p>
        </Reveal>
      </header>

      <SectionDivider />

      <EducationAndExperience />
    </div>
  );
};

export default ExperiencePage;
