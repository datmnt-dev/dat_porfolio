import React, { useId } from "react";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export interface EcgWaveProps {
  color?: string;
  width?: number | string;
  height?: number;
  showGrid?: boolean;
  label?: string;
  rate?: string | number;
  className?: string;
}

export const EcgWave: React.FC<EcgWaveProps> = ({
  color = "var(--mk-primary)",
  width = "100%",
  height = 96,
  showGrid = true,
  label,
  rate,
  className = "",
}) => {
  const gridPatternId = useId();
  const gradientId = useId();
  const prefersReduced = usePrefersReducedMotion();

  // Normalized ECG wave polyline path
  const ecgPath =
    "M 0 48 L 50 48 L 65 42 L 75 54 L 85 48 L 105 48 L 115 16 L 125 76 L 135 38 L 145 52 L 155 48 L 190 48 L 205 34 L 220 48 L 300 48";

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-[var(--mk-border)] bg-[var(--mk-surface)] p-3 ${className}`}
      style={{ width }}
    >
      {(label || rate) && (
        <div className="mb-2 flex items-center justify-between text-xs font-mono">
          {label && <span className="text-[var(--mk-text-muted)]">{label}</span>}
          {rate && (
            <span className="font-semibold text-[var(--mk-primary)] flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-[var(--mk-primary)] animate-pulse" />
              {rate}
            </span>
          )}
        </div>
      )}

      <div className="relative" style={{ height }}>
        <svg
          viewBox="0 0 300 96"
          preserveAspectRatio="none"
          className="w-full h-full"
          aria-hidden="true"
        >
          <defs>
            {showGrid && (
              <pattern
                id={gridPatternId}
                width="16"
                height="16"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 16 0 L 0 0 0 16"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.04)"
                  strokeWidth="1"
                />
              </pattern>
            )}
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={color} stopOpacity="0.2" />
              <stop offset="80%" stopColor={color} stopOpacity="1" />
              <stop offset="100%" stopColor={color} stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {showGrid && (
            <rect width="100%" height="100%" fill={`url(#${gridPatternId})`} />
          )}

          {/* ECG animated trace */}
          <path
            d={ecgPath}
            fill="none"
            stroke={`url(#${gradientId})`}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={prefersReduced ? "" : "mk-ecg-path"}
          />
        </svg>
      </div>
    </div>
  );
};
