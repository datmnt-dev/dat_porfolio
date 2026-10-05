/**
 * GlyphPortal Component
 * Copyright (c) Christian Katzmann
 * Licensed under the MIT License
 */

import React, { useRef, useState, useEffect, useCallback } from "react";

export interface GlyphPortalProps {
  word?: string;
  focusChar?: string;
  scrollLength?: number;
  interactive?: boolean;
  background?: React.ReactNode;
  front?: React.ReactNode;
  children?: React.ReactNode;
  enterLabel?: string;
  onEnter?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export const GlyphPortal: React.FC<GlyphPortalProps> = ({
  word = "PORTAL",
  focusChar = "O",
  scrollLength = 1.7,
  interactive = true,
  background,
  front,
  children,
  enterLabel = "ENTER PORTAL",
  onEnter,
  className = "",
  style = {},
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const portalRef = useRef<HTMLDivElement>(null);

  const [selectedCharIndex, setSelectedCharIndex] = useState<number>(() => {
    const idx = word.indexOf(focusChar);
    return idx !== -1 ? idx : Math.floor(word.length / 2);
  });

  const [scrollProgress, setScrollProgress] = useState(0);
  const [fontsReady, setFontsReady] = useState(false);

  // Ensure fonts are loaded before measuring glyphs
  useEffect(() => {
    if (typeof document !== "undefined" && document.fonts) {
      document.fonts.ready.then(() => setFontsReady(true));
    } else {
      setFontsReady(true);
    }
  }, []);

  // Update selected character when focusChar prop changes
  useEffect(() => {
    const idx = word.indexOf(focusChar);
    if (idx !== -1) setSelectedCharIndex(idx);
  }, [word, focusChar]);

  // Scroll tracking loop
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const totalDist = containerRef.current.offsetHeight - windowHeight;

    if (totalDist <= 0) return;

    // Calculate normalized progress (0 to 1)
    const current = Math.min(Math.max(-rect.top / totalDist, 0), 1);
    setScrollProgress(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  // Compute portal scaling: exponential zoom through the character (1 -> 45x)
  const zoomScale = Math.pow(scrollProgress, 2.5) * 44 + 1;
  const wordOpacity = Math.max(1 - scrollProgress * 1.8, 0);
  const bgOpacity = Math.min(scrollProgress * 2.2, 1);

  // Character selection for interactive mode
  const handleCharClick = (index: number) => {
    if (!interactive) return;
    setSelectedCharIndex(index);
    if (onEnter) onEnter();
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (!interactive) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setSelectedCharIndex(index);
      if (onEnter) onEnter();
    }
  };

  return (
    <div
      ref={containerRef}
      data-gp-container
      className={`relative w-full ${className}`}
      style={{
        ...style,
        height: `${scrollLength * 100}vh`,
      }}
    >
      {/* Sticky Viewport Stage */}
      <div
        ref={portalRef}
        data-gp-viewport
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center select-none"
      >
        {/* Background Layer revealed inside/behind the portal */}
        <div
          data-gp-background
          className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-75"
          style={{ opacity: bgOpacity }}
        >
          {background || (
            <div className="w-full h-full bg-gradient-to-tr from-cyan-950 via-slate-900 to-indigo-950 flex items-center justify-center" />
          )}
        </div>

        {/* Masked / Portal Stage */}
        <div
          data-gp-stage
          className="relative z-10 w-full max-w-6xl mx-auto px-4 flex flex-col items-center justify-center"
          style={{ opacity: fontsReady ? 1 : 0 }}
        >
          {/* Main Giant Word typography aperture */}
          <div
            data-gp-word
            className="flex items-center justify-center tracking-tight font-display font-black text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] leading-none will-change-transform"
            style={{
              transform: `scale(${zoomScale})`,
              transformOrigin: `${((selectedCharIndex + 0.5) / word.length) * 100}% 50%`,
              opacity: wordOpacity,
            }}
          >
            {word.split("").map((char, index) => {
              const isSelected = index === selectedCharIndex;
              return (
                <span
                  key={index}
                  data-gp-glyph
                  data-gp-glyph-selected={isSelected ? "true" : undefined}
                  tabIndex={interactive ? 0 : -1}
                  role={interactive ? "button" : undefined}
                  aria-label={`Glyph ${char}`}
                  onClick={() => handleCharClick(index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className={`relative inline-block transition-colors duration-200 cursor-pointer ${
                    isSelected
                      ? "text-[var(--mk-primary)]"
                      : "text-white/80 hover:text-white"
                  }`}
                >
                  {char}
                </span>
              );
            })}
          </div>

          {/* Interactive Enter hint label */}
          {interactive && scrollProgress < 0.15 && (
            <div
              data-gp-label
              className="mt-8 px-4 py-1.5 rounded-full text-xs font-mono tracking-widest text-[var(--mk-primary)] border border-[var(--mk-border)] bg-black/40 backdrop-blur-md animate-pulse"
            >
              {enterLabel}
            </div>
          )}

          {/* Optional Front layer / children */}
          {front && (
            <div data-gp-front className="relative z-20 mt-6">
              {front}
            </div>
          )}

          {children && (
            <div data-gp-children className="relative z-20 mt-4">
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
