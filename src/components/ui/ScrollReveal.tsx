import React, { useEffect, useRef, useState } from "react";

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
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Hủy quan sát khi đã hiển thị xong (giúp tối ưu hiệu năng)
          if (elementRef.current) {
            observer.unobserve(elementRef.current);
          }
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -50px 0px", // Kích hoạt sớm một chút trước khi cuộn hẳn tới nơi
      }
    );

    const currentRef = elementRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  return (
    <div
      ref={elementRef}
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
