import confetti from "canvas-confetti";

export interface CelebrateOptions {
  element?: HTMLElement | null;
  colors?: string[];
  disableForReducedMotion?: boolean;
}

export function celebrate(options: CelebrateOptions = {}): void {
  const {
    element,
    colors = ["#06b6d4", "#3b82f6", "#8b5cf6", "#10b981", "#f59e0b"],
    disableForReducedMotion = true,
  } = options;

  if (disableForReducedMotion && typeof window !== "undefined") {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;
  }

  let origin = { x: 0.5, y: 0.5 };

  if (element && typeof window !== "undefined") {
    const rect = element.getBoundingClientRect();
    origin = {
      x: (rect.left + rect.width / 2) / window.innerWidth,
      y: (rect.top + rect.height / 2) / window.innerHeight,
    };
  }

  // Wave 1: Golden parameter - 45 particles, spread 60, ticks 180, gravity 0.85, scalar 0.9
  confetti({
    particleCount: 45,
    spread: 60,
    ticks: 180,
    gravity: 0.85,
    scalar: 0.9,
    origin,
    colors,
    disableForReducedMotion: true,
  });

  // Wave 2 (160ms later): Golden parameter - 25 particles, spread 90, ticks 140, gravity 0.9, scalar 0.75
  setTimeout(() => {
    confetti({
      particleCount: 25,
      spread: 90,
      ticks: 140,
      gravity: 0.9,
      scalar: 0.75,
      origin,
      colors,
      disableForReducedMotion: true,
    });
  }, 160);
}
