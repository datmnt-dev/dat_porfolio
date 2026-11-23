import React, { useContext, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AppContext } from "../../context/AppContext";

const TEXT_INPUT_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="reset"]):not([type="checkbox"]):not([type="radio"]):not([type="color"]):not([type="range"]), textarea, select, [contenteditable="true"]';

const INTERACTIVE_SELECTOR =
  '[data-cursor], a, button, [role="button"], summary, label[for], input[type="checkbox"], input[type="radio"], input[type="color"]';

const TITLE_FOCUS_SELECTOR = "main h1, main h2, [data-cursor-focus]";

const clamp = (val: number, min: number, max: number) =>
  Math.min(Math.max(val, min), max);

/**
 * Computes the tight rendered text bounding box of a heading element
 * so block-level <h1>/<h2> elements wrap tightly around their text
 * rather than stretching across empty container whitespace.
 */
const getTightFocusRect = (el: HTMLElement): DOMRect => {
  try {
    const range = document.createRange();
    range.selectNodeContents(el);
    const rangeRect = range.getBoundingClientRect();
    if (rangeRect.width > 4 && rangeRect.height > 4) {
      return rangeRect;
    }
  } catch {
    // Fallback to element box
  }
  return el.getBoundingClientRect();
};

const isPointNearRect = (x: number, y: number, rect: DOMRect, padX = 16, padY = 10) =>
  x >= rect.left - padX &&
  x <= rect.right + padX &&
  y >= rect.top - padY &&
  y <= rect.bottom + padY;

const resolveHoverLabel = (target: HTMLElement): string => {
  const customEl = target.closest<HTMLElement>("[data-cursor]");
  if (customEl) {
    const customLabel = customEl.getAttribute("data-cursor")?.trim();
    if (customLabel) return customLabel;
  }

  const interactiveEl = target.closest<HTMLElement>(INTERACTIVE_SELECTOR);
  if (!interactiveEl) return "";

  if (interactiveEl.tagName === "A") {
    const anchor = interactiveEl as HTMLAnchorElement;
    if (anchor.hasAttribute("download")) return "CV.PDF";
    if (anchor.href?.startsWith("mailto:")) return "EMAIL";
    if (anchor.target === "_blank") return "OPEN ↗";
    return "VIEW";
  }

  return "CLICK";
};

const DevCrosshairCursor: React.FC = () => {
  const { customCursor } = useContext(AppContext);
  const [isEligible, setIsEligible] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);
  const reticleRef = useRef<HTMLDivElement>(null);
  const reticleInnerRef = useRef<HTMLDivElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);
  const bracketsInnerRef = useRef<HTMLDivElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setIsEligible(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const enabled = customCursor && isEligible;

  useEffect(() => {
    const rootHtml = document.documentElement;
    if (!enabled) {
      rootHtml.classList.remove("has-custom-cursor");
      return;
    }

    rootHtml.classList.add("has-custom-cursor");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rawPos = { x: -120, y: -120 };
    const boxState = { x: -120, y: -120, w: 26, h: 26 };
    let isVisible = false;
    let isTextTarget = false;
    let isHovering = false;
    let isPressed = false;
    let currentLabel = "";
    let lockedEl: HTMLElement | null = null;
    let rafId = 0;
    let isRunning = false;

    const syncVisibility = () => {
      const rootEl = rootRef.current;
      if (!rootEl) return;
      rootEl.style.opacity = isVisible && !isTextTarget ? "1" : "0";
    };

    const syncStateClasses = () => {
      const box = bracketsInnerRef.current;
      const reticle = reticleInnerRef.current;
      const tag = tagRef.current;
      if (!box || !tag || !reticle) return;

      const isLocked = Boolean(lockedEl);
      box.classList.toggle("is-locked", isLocked);
      box.classList.toggle("is-hover", !isLocked && isHovering);
      box.classList.toggle("is-pressed", isPressed);
      reticle.classList.toggle("is-locked", isLocked);
      tag.classList.toggle("is-locked", isLocked);
      tag.classList.toggle("is-hover", !isLocked && isHovering);
    };

    const updateTagText = (lockedRect?: DOMRect) => {
      const tag = tagRef.current;
      if (!tag) return;

      if (lockedEl && lockedRect) {
        const customFocusLabel = lockedEl.getAttribute("data-cursor-focus")?.trim();
        if (customFocusLabel) {
          tag.textContent = customFocusLabel;
        } else {
          const elTag = lockedEl.tagName.toUpperCase();
          tag.textContent = `${elTag} · ${Math.round(lockedRect.width)}×${Math.round(lockedRect.height)}`;
        }
        return;
      }

      if (isHovering && currentLabel) {
        tag.textContent = currentLabel;
      } else {
        tag.textContent = `${String(Math.round(rawPos.x)).padStart(3, "0")},${String(
          Math.round(rawPos.y)
        ).padStart(3, "0")}`;
      }
    };

    const tick = () => {
      const ease = prefersReducedMotion ? 1 : 0.22;

      let targetX = rawPos.x;
      let targetY = rawPos.y;
      let targetW = isHovering ? 38 : 26;
      let targetH = isHovering ? 38 : 26;
      let lockedRect: DOMRect | undefined;

      // Validate locked element is still mounted and pointer is still near its tight text box
      if (lockedEl) {
        if (!document.body.contains(lockedEl)) {
          lockedEl = null;
          syncStateClasses();
        } else {
          const rect = getTightFocusRect(lockedEl);
          if (!isPointNearRect(rawPos.x, rawPos.y, rect, 20, 14)) {
            lockedEl = null;
            syncStateClasses();
          } else {
            lockedRect = rect;
            const padX = Math.min(18, Math.max(12, rect.height * 0.22));
            const padY = Math.min(8, Math.max(5, rect.height * 0.1));
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const pullX = clamp((rawPos.x - cx) * 0.035, -6, 6);
            const pullY = clamp((rawPos.y - cy) * 0.035, -4, 4);

            targetX = cx + pullX;
            targetY = cy + pullY;
            targetW = rect.width + padX * 2;
            targetH = rect.height + padY * 2;
          }
        }
      }

      const dx = targetX - boxState.x;
      const dy = targetY - boxState.y;
      const dw = targetW - boxState.w;
      const dh = targetH - boxState.h;

      boxState.x += dx * ease;
      boxState.y += dy * ease;
      boxState.w += dw * ease;
      boxState.h += dh * ease;

      if (reticleRef.current) {
        reticleRef.current.style.transform = `translate3d(${rawPos.x.toFixed(1)}px, ${rawPos.y.toFixed(1)}px, 0)`;
      }

      if (bracketsRef.current && bracketsInnerRef.current) {
        bracketsRef.current.style.transform = `translate3d(${boxState.x.toFixed(1)}px, ${boxState.y.toFixed(1)}px, 0)`;
        bracketsInnerRef.current.style.width = `${boxState.w.toFixed(1)}px`;
        bracketsInnerRef.current.style.height = `${boxState.h.toFixed(1)}px`;

        if (lockedRect) {
          // Local spotlight position inside the locked title bounding box
          const localX = rawPos.x - (boxState.x - boxState.w / 2);
          const localY = rawPos.y - (boxState.y - boxState.h / 2);
          bracketsInnerRef.current.style.setProperty("--focus-x", `${localX.toFixed(1)}px`);
          bracketsInnerRef.current.style.setProperty("--focus-y", `${localY.toFixed(1)}px`);
        }
      }

      if (tagRef.current) {
        if (lockedRect) {
          // Pin the spec tag neatly above the top-right corner of the locked heading frame
          // (where eyebrow space is clear, never covering subtitle text below)
          const tagX = clamp(boxState.x + boxState.w / 2, 110, window.innerWidth - 12);
          const preferBottom = boxState.y - boxState.h / 2 < 96;
          const tagY = preferBottom
            ? boxState.y + boxState.h / 2 + 8
            : boxState.y - boxState.h / 2 - 7;
          const anchorY = preferBottom ? "0%" : "-100%";
          tagRef.current.style.transform = `translate3d(${tagX.toFixed(1)}px, ${tagY.toFixed(1)}px, 0) translate(-100%, ${anchorY})`;
          updateTagText(lockedRect);
        } else {
          const flipLeft = rawPos.x > window.innerWidth - 118;
          const flipTop = rawPos.y > window.innerHeight - 48;
          const offsetX = flipLeft ? -18 : 18;
          const offsetY = flipTop ? -18 : 18;
          const anchorX = flipLeft ? "-100%" : "0%";
          const anchorY = flipTop ? "-100%" : "0%";
          tagRef.current.style.transform = `translate3d(${(rawPos.x + offsetX).toFixed(1)}px, ${(rawPos.y + offsetY).toFixed(1)}px, 0) translate(${anchorX}, ${anchorY})`;
        }
      }

      const settled =
        Math.abs(dx) < 0.15 &&
        Math.abs(dy) < 0.15 &&
        Math.abs(dw) < 0.2 &&
        Math.abs(dh) < 0.2;

      if (settled) {
        boxState.x = targetX;
        boxState.y = targetY;
        boxState.w = targetW;
        boxState.h = targetH;
        isRunning = false;
        return;
      }

      rafId = window.requestAnimationFrame(tick);
    };

    const startLoop = () => {
      if (!isRunning) {
        isRunning = true;
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const inspectTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) {
        isTextTarget = false;
        isHovering = false;
        lockedEl = null;
        currentLabel = "";
        syncVisibility();
        syncStateClasses();
        return;
      }

      const textEl = target.closest(TEXT_INPUT_SELECTOR);
      isTextTarget = Boolean(textEl);

      if (isTextTarget) {
        isHovering = false;
        lockedEl = null;
        currentLabel = "";
      } else {
        // Check for heading / focusable title first
        const titleEl = target.closest<HTMLElement>(TITLE_FOCUS_SELECTOR);
        if (titleEl) {
          const tightRect = getTightFocusRect(titleEl);
          if (tightRect.height >= 20 && isPointNearRect(rawPos.x, rawPos.y, tightRect, 16, 10)) {
            lockedEl = titleEl;
          } else {
            lockedEl = null;
          }
        } else {
          lockedEl = null;
        }

        const interactiveEl = target.closest(INTERACTIVE_SELECTOR);
        isHovering = Boolean(interactiveEl);
        currentLabel = isHovering ? resolveHoverLabel(target) : "";
      }

      syncVisibility();
      syncStateClasses();
      updateTagText(lockedEl ? getTightFocusRect(lockedEl) : undefined);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType === "touch") {
        isVisible = false;
        lockedEl = null;
        syncVisibility();
        syncStateClasses();
        return;
      }

      if (!isVisible) {
        boxState.x = e.clientX;
        boxState.y = e.clientY;
        isVisible = true;
      }

      rawPos.x = e.clientX;
      rawPos.y = e.clientY;

      inspectTarget(e.target);
      if (!lockedEl) updateTagText();
      startLoop();
    };

    const onScroll = () => {
      if (lockedEl) {
        startLoop();
      }
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType === "touch") return;
      isPressed = true;
      syncStateClasses();

      const pulse = pulseRef.current;
      if (pulse && !isTextTarget && !prefersReducedMotion) {
        pulse.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        pulse.classList.remove("is-pulsing");
        void pulse.offsetWidth;
        pulse.classList.add("is-pulsing");
      }
    };

    const onPointerUp = () => {
      isPressed = false;
      syncStateClasses();
    };

    const onLeave = () => {
      isVisible = false;
      isPressed = false;
      lockedEl = null;
      syncVisibility();
      syncStateClasses();
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("pointerdown", onPointerDown, { passive: true });
    window.addEventListener("pointerup", onPointerUp, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);

    return () => {
      rootHtml.classList.remove("has-custom-cursor");
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return createPortal(
    <div
      ref={rootRef}
      className="dev-crosshair-root"
      style={{ opacity: 0 }}
      aria-hidden="true"
    >
      {/* Expanding Click Ping Ring */}
      <div ref={pulseRef} className="dev-crosshair-pulse" />

      {/* Spring-Smoothed Tactical Corner Brackets (morphs to lock around titles) */}
      <div ref={bracketsRef} className="dev-crosshair-layer">
        <div ref={bracketsInnerRef} className="dev-crosshair-brackets">
          <span className="dev-crosshair-focus-glow" />
          <span className="dev-crosshair-corner tl" />
          <span className="dev-crosshair-corner tr" />
          <span className="dev-crosshair-corner bl" />
          <span className="dev-crosshair-corner br" />
        </div>
      </div>

      {/* Zero-Lag Precision Center Reticle (+ dot) */}
      <div ref={reticleRef} className="dev-crosshair-layer">
        <div ref={reticleInnerRef} className="dev-crosshair-reticle">
          <span className="dev-crosshair-tick-h" />
          <span className="dev-crosshair-tick-v" />
          <span className="dev-crosshair-dot" />
        </div>
      </div>

      {/* Contextual Telemetry / Locked Dimension Micro-Tag */}
      <div ref={tagRef} className="dev-crosshair-tag">
        000,000
      </div>
    </div>,
    document.body
  );
};

export default DevCrosshairCursor;
