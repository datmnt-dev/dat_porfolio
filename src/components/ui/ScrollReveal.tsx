import React from "react";
import useRevealInView from "../../hooks/useRevealInView";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Đơn vị: miligiây
  threshold?: number; // Phần trăm hiển thị của element để kích hoạt
  animationClass?: string; // Tùy chọn thay thế hiệu ứng fade-up mặc định
}

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = "",
  delay = 0,
  threshold = 0.1,
  animationClass = "reveal-on-scroll",
}) => {
  const { ref, isVisible } = useRevealInView<HTMLDivElement>({ threshold });

  return (
    <div
      ref={ref}
      className={`${animationClass} ${isVisible ? "visible" : ""} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;
