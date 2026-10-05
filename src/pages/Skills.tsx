import React from "react";
import Skills from "../components/Skills";
import ScrollReveal from "../components/ui/ScrollReveal";

const SkillsPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Page Header */}
      <ScrollReveal>
        <header className="mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)]">
            Technical Proficiency
          </span>
          <h1 className="mt-3 font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--color-text)]">
            Skills & Stack
          </h1>
          <p className="mt-4 text-base sm:text-lg text-[var(--color-subtext)] max-w-2xl leading-relaxed">
            Phân loại năng lực kỹ thuật theo bằng chứng thực tế từ các đồ án và dự án nhóm — không sử dụng thanh phần trăm ước lượng vô nghĩa.
          </p>
        </header>
      </ScrollReveal>

      <Skills />
    </div>
  );
};

export default SkillsPage;
