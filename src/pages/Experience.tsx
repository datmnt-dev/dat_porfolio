import React from "react";
import EducationAndExperience from "../components/EducationAndEperience";
import ScrollReveal from "../components/ui/ScrollReveal";

const ExperiencePage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Page Header */}
      <ScrollReveal>
        <header className="mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
            Engineering Trajectory
          </span>
          <h1 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--color-text)]">
            Experience & Education
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--color-subtext)] max-w-2xl leading-relaxed">
            Quá trình phát triển năng lực qua từng dự án thật — tập trung vào những gì đã xây dựng, kết quả đạt được và bài học kỹ thuật rút ra.
          </p>
        </header>
      </ScrollReveal>

      <EducationAndExperience />
    </div>
  );
};

export default ExperiencePage;
