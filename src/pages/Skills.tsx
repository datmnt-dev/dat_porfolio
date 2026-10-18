import React from "react";
import Skills from "../components/Skills";
import { Reveal } from "../motion";
import SectionDivider from "../components/ui/SectionDivider";

const SkillsPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Editorial Page Header */}
      <header className="space-y-4">
        <Reveal direction="right" distance={12} duration={580} delay={0}>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)] block mb-1">
            Technical Proficiency
          </span>
        </Reveal>
        <Reveal direction="up" distance={26} duration={680} delay={60}>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--color-text)]">
            Skills & Stack
          </h1>
        </Reveal>
        <Reveal direction="up" distance={16} duration={600} delay={120}>
          <p className="text-base sm:text-lg text-[var(--color-subtext)] max-w-2xl leading-relaxed">
            Phân loại năng lực kỹ thuật theo bằng chứng thực tế từ các đồ án và dự án nhóm — không sử dụng thanh phần trăm ước lượng vô nghĩa.
          </p>
        </Reveal>
      </header>

      <SectionDivider />

      <Skills />
    </div>
  );
};

export default SkillsPage;
