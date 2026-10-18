import React from "react";
import Contact from "../components/Contact";
import { Reveal } from "../motion";
import SectionDivider from "../components/ui/SectionDivider";

const ContactPage: React.FC = () => {
  return (
    <div className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      {/* Editorial Header */}
      <header className="space-y-4">
        <Reveal direction="right" distance={12} duration={550} delay={0}>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--color-accent)] block">
            Get In Touch
          </span>
        </Reveal>
        <Reveal direction="up" distance={26} duration={680} delay={60}>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[var(--color-text)]">
            Kết nối & Hợp tác
          </h1>
        </Reveal>
        <Reveal direction="up" distance={16} duration={600} delay={120}>
          <p className="text-base sm:text-lg text-[var(--color-subtext)] max-w-2xl leading-relaxed">
            Để lại lời nhắn hợp tác qua biểu mẫu liên hệ hoặc gửi email trực tiếp. Mình luôn cởi mở trao đổi các cơ hội phát triển sản phẩm mới.
          </p>
        </Reveal>
      </header>

      <SectionDivider />

      <div>
        <Contact />
      </div>
    </div>
  );
};

export default ContactPage;
