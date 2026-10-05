/**
 * Motion Kit — Comprehensive, Brand-Agnostic Creative Motion Suite
 * Reusable animation, smooth scrolling, and interactive primitives.
 */

// Hooks
export { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";
export { useInView, type UseInViewOptions } from "./hooks/useInView";
export { useScrollProgress, type ScrollProgressState } from "./hooks/useScrollProgress";
export { useScrollSpy } from "./hooks/useScrollSpy";
export { useLenis } from "./hooks/useLenis";

// Providers
export { SmoothScrollProvider, type SmoothScrollProviderProps } from "./providers/SmoothScrollProvider";
export { LenisContext, type LenisContextValue } from "./providers/LenisContext";

// Primitives
export { Reveal, type RevealProps, type RevealDirection } from "./primitives/Reveal";
export { TiltCard, type TiltCardProps } from "./primitives/TiltCard";
export { CountUp, type CountUpProps } from "./primitives/CountUp";
export { ProgressRing, type ProgressRingProps } from "./primitives/ProgressRing";
export { EcgWave, type EcgWaveProps } from "./primitives/EcgWave";
export { PhoneFrame, type PhoneFrameProps } from "./primitives/PhoneFrame";

// Scenes
export { ScrollVideoReveal, type ScrollVideoRevealProps } from "./scenes/ScrollVideoReveal";
export { GlyphPortal, type GlyphPortalProps } from "./scenes/glyph-portal";
export { GlyphPortalScene, type GlyphPortalSceneProps } from "./scenes/GlyphPortalScene";

// Feedback
export { celebrate, type CelebrateOptions } from "./feedback/celebrate";
export { sound } from "./feedback/sound";
