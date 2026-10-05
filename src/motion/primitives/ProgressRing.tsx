import React, { useId, useState, useEffect } from "react";
import { useInView } from "../hooks/useInView";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  gradientTo?: string;
  trackColor?: string;
  children?: React.ReactNode;
  className?: string;
}

export const ProgressRing: React.FC<ProgressRingProps> = ({
  percentage,
  size = 120,
  strokeWidth = 10,
  color = "var(--mk-primary)",
  gradientTo,
  trackColor = "rgba(255, 255, 255, 0.08)",
  children,
  className = "",
}) => {
  const gradientId = useId();
  const [ref, inView] = useInView<HTMLDivElement>({ once: true });
  const prefersReduced = usePrefersReducedMotion();

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(Math.max(percentage, 0), 100);
  const targetOffset = circumference - (clamped / 100) * circumference;

  // Sửa lỗi 8.2: Khởi tạo ở chu vi (chưa đầy), chỉ animate sang đích khi inView
  const [offset, setOffset] = useState(prefersReduced ? targetOffset : circumference);

  useEffect(() => {
    if (prefersReduced) {
      setOffset(targetOffset);
      return;
    }

    if (inView) {
      setOffset(targetOffset);
    }
  }, [inView, targetOffset, prefersReduced]);

  return (
    <div
      ref={ref}
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="transform -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={gradientTo || color} />
          </linearGradient>
        </defs>

        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />

        {/* Animated Progress Ring */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{
            transition: prefersReduced
              ? "none"
              : "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </svg>

      {children && (
        <div className="absolute inset-0 flex items-center justify-center text-center">
          {children}
        </div>
      )}
    </div>
  );
};
