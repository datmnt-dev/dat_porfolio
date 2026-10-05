import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollVideoRevealProps {
  topText?: string;
  headingText: string;
  tags?: string[];
  subText?: string;
  videoSrc?: string;
  poster?: string;
  bottomText?: string;
  pinBackground?: string;
  startRadius?: { sm: number; md: number; lg: number };
  scrollDistance?: { sm: number; md: number; lg: number };
  scrub?: { sm: number; md: number; lg: number };
  className?: string;
}

export const ScrollVideoReveal: React.FC<ScrollVideoRevealProps> = ({
  topText,
  headingText,
  tags = [],
  subText,
  videoSrc,
  poster,
  bottomText,
  pinBackground = "var(--mk-dark, #06080e)",
  startRadius = { sm: 18, md: 12, lg: 8 },
  scrollDistance = { sm: 700, md: 950, lg: 1200 },
  scrub = { sm: 0.75, md: 0.8, lg: 0.85 },
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const tagRef = useRef<HTMLDivElement>(null);
  const prefersReduced = usePrefersReducedMotion();

  // Split headingText into individual words for kinetic typography
  const words = headingText.split(" ");

  useEffect(() => {
    // Sửa lỗi 8.4: GSAP tôn trọng prefers-reduced-motion
    if (prefersReduced || !containerRef.current || !pinSectionRef.current || !videoWrapperRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Only run pin/scrub animation when user has no reduced motion preference
      mm.add("(prefers-reduced-motion: no-preference)", (context) => {
        const isMobile = window.matchMedia("(max-width: 639px)").matches;
        const isTablet = window.matchMedia("(min-width: 640px) and (max-width: 1023px)").matches;

        const radius = isMobile
          ? startRadius.sm
          : isTablet
          ? startRadius.md
          : startRadius.lg;

        const distance = isMobile
          ? scrollDistance.sm
          : isTablet
          ? scrollDistance.md
          : scrollDistance.lg;

        const scrubVal = isMobile ? scrub.sm : isTablet ? scrub.md : scrub.lg;

        // 1. Reveal Timeline: Heading, tags, kinetic words
        if (triggerRef.current) {
          const revealTl = gsap.timeline({
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top 75%",
              end: "top 15%",
              scrub: 0.7,
            },
          });

          revealTl.fromTo(
            triggerRef.current,
            { opacity: 0.2, y: 30, scale: 0.98 },
            { opacity: 1, y: 0, scale: 1, ease: "power2.out" }
          );

          if (tagRef.current) {
            revealTl.fromTo(
              tagRef.current,
              { opacity: 0, y: 20, scale: 0.94 },
              { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power3.out" },
              ">-0.3"
            );
          }

          // Sửa lỗi 8.1: Kinetic words timeline animation
          const wordElements = wordsRef.current.filter(Boolean);
          if (wordElements.length > 0) {
            gsap.set(wordElements, { opacity: 0, rotate: 8, yPercent: 30 });
            revealTl.to(
              wordElements,
              {
                opacity: 1,
                rotate: 0,
                yPercent: 0,
                stagger: 0.04,
                ease: "power3.out",
              },
              ">-0.4"
            );
          }
        }

        // 2. Pin Timeline: Clip-path expanding circle
        const pinTl = gsap.timeline({
          scrollTrigger: {
            trigger: pinSectionRef.current,
            start: isMobile ? "top 80%" : "top top",
            end: isMobile ? "bottom 20%" : `+=${distance}`,
            pin: !isMobile,
            pinSpacing: !isMobile,
            anticipatePin: isMobile ? 0 : 1,
            scrub: scrubVal,
            invalidateOnRefresh: true,
          },
        });

        // Tween clipPath ease: none -> circle(150% at 50% 50%)
        pinTl.fromTo(
          videoWrapperRef.current,
          {
            clipPath: `circle(${radius}% at 50% 50%)`,
            WebkitClipPath: `circle(${radius}% at 50% 50%)`,
          },
          {
            clipPath: "circle(150% at 50% 50%)",
            WebkitClipPath: "circle(150% at 50% 50%)",
            ease: "none",
          }
        );

        return () => {
          context.kill();
        };
      });
    }, containerRef);

    // Sửa lỗi 8.8: Refresh ScrollTrigger sau khi document.fonts.ready
    if (document.fonts) {
      document.fonts.ready.then(() => {
        ScrollTrigger.refresh();
      });
    }

    return () => {
      ctx.revert();
    };
  }, [
    prefersReduced,
    startRadius.sm,
    startRadius.md,
    startRadius.lg,
    scrollDistance.sm,
    scrollDistance.md,
    scrollDistance.lg,
    scrub.sm,
    scrub.md,
    scrub.lg,
  ]);

  // Pause video when out of viewport to preserve CPU/GPU
  useEffect(() => {
    const video = videoRef.current;
    if (!video || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full ${className}`}
      style={{ backgroundColor: pinBackground }}
    >
      {/* 1. Header & Kinetic Words Trigger Section */}
      <section
        ref={triggerRef}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 text-center"
      >
        {topText && (
          <p className="text-xs font-mono uppercase tracking-widest text-[var(--mk-primary)] mb-4">
            {topText}
          </p>
        )}

        <h2 className="mk-clamp-heading font-display font-bold text-white tracking-tight mk-text-balance mb-6">
          {prefersReduced ? (
            headingText
          ) : (
            words.map((word, idx) => (
              <span
                key={idx}
                ref={(el) => {
                  if (el) wordsRef.current[idx] = el;
                }}
                className="inline-block mr-[0.25em] origin-bottom-left will-change-transform"
              >
                {word}
              </span>
            ))
          )}
        </h2>

        {tags.length > 0 && (
          <div
            ref={tagRef}
            className="flex flex-wrap items-center justify-center gap-2 mb-6"
          >
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-mono bg-white/10 text-white/90 border border-white/10"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {subText && (
          <p className="text-sm sm:text-base text-zinc-400 max-w-xl mx-auto leading-relaxed mk-text-pretty">
            {subText}
          </p>
        )}
      </section>

      {/* 2. Pinned Circular Reveal Section */}
      <section
        ref={pinSectionRef}
        className="relative w-full h-screen overflow-hidden flex items-center justify-center"
        style={{ backgroundColor: pinBackground }}
      >
        <div
          ref={videoWrapperRef}
          className="relative w-full h-full flex items-center justify-center overflow-hidden"
          style={
            prefersReduced
              ? { clipPath: "none" }
              : { clipPath: `circle(${startRadius.lg}% at 50% 50%)` }
          }
        >
          {videoSrc ? (
            <video
              ref={videoRef}
              src={videoSrc}
              poster={poster}
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover"
              onLoadedData={() => ScrollTrigger.refresh()}
            />
          ) : poster ? (
            <img
              src={poster}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              onLoad={() => ScrollTrigger.refresh()}
            />
          ) : (
            <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-cyan-950 via-slate-900 to-indigo-950" />
          )}

          {/* Cinematic overlay vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 pointer-events-none" />

          {bottomText && (
            <div className="absolute bottom-12 inset-x-0 text-center px-4 z-10">
              <p className="text-sm sm:text-base font-medium text-white/90 max-w-md mx-auto">
                {bottomText}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
