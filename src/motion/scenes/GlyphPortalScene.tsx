import React from "react";
import { GlyphPortal, type GlyphPortalProps } from "./glyph-portal";

export interface GlyphPortalSceneProps extends GlyphPortalProps {
  theme?: "dark" | "light";
  tag?: string;
  subTitle?: string;
}

export const GlyphPortalScene: React.FC<GlyphPortalSceneProps> = ({
  word = "EXPLORE",
  focusChar = "O",
  scrollLength = 1.7,
  interactive = true,
  enterLabel = "SCROLL TO DIVE",
  background,
  tag,
  subTitle,
  children,
  className = "",
  style = {},
}) => {
  return (
    <div className={`relative w-full overflow-hidden ${className}`} style={style}>
      {/* Scoped CSS styling for data-gp attributes */}
      <style>{`
        [data-gp-container] {
          background-color: var(--mk-dark, #06080e);
        }
        [data-gp-glyph] {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1), color 0.2s ease;
        }
        [data-gp-glyph]:hover {
          transform: translateY(-4px) scale(1.04);
        }
        [data-gp-glyph-selected="true"] {
          text-shadow: 0 0 40px rgba(var(--mk-glow-rgb), 0.5);
        }
        [data-gp-label] {
          letter-spacing: 0.18em;
        }
      `}</style>

      <GlyphPortal
        word={word}
        focusChar={focusChar}
        scrollLength={scrollLength}
        interactive={interactive}
        enterLabel={enterLabel}
        background={
          background || (
            <div className="w-full h-full relative overflow-hidden bg-[#070b14] flex items-center justify-center">
              {/* Radial glow background */}
              <div
                className="absolute w-[600px] h-[600px] rounded-full blur-[100px] pointer-events-none opacity-40"
                style={{
                  background: `radial-gradient(circle, var(--mk-primary) 0%, transparent 70%)`,
                }}
              />
              <div className="relative z-10 text-center max-w-xl px-6">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--mk-primary)] mb-3 inline-block">
                  Aperture Reached
                </span>
                <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">
                  Dimensional Portal Complete
                </h3>
                <p className="text-sm text-zinc-400">
                  Seamlessly transitioned through typography into the underlying canvas layer.
                </p>
              </div>
            </div>
          )
        }
        front={
          (tag || subTitle) && (
            <div className="text-center">
              {tag && (
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--mk-primary)] mb-1">
                  {tag}
                </div>
              )}
              {subTitle && (
                <div className="text-sm text-zinc-400 max-w-md mx-auto">
                  {subTitle}
                </div>
              )}
            </div>
          )
        }
      >
        {children}
      </GlyphPortal>
    </div>
  );
};
