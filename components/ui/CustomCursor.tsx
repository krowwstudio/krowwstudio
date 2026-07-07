"use client";

import { useEffect, useRef } from "react";

/**
 * Premium custom cursor — pure DOM + rAF, zero React state on hot paths.
 *
 * Why not Framer Motion / useSpring here:
 *  - useSpring on the dot adds artificial delay (spring physics = lag)
 *  - setVariant / setVisible on every mousemove triggers React re-renders
 *  - visible in useEffect deps causes listener teardown/re-add on first move
 *
 * This version:
 *  - Dot follows the mouse 1:1 with no delay (instant, no spring)
 *  - Ring trails via manual lerp computed inside rAF (smooth, no React)
 *  - Hover/click states written directly to data-state on the DOM node
 *  - CSS transitions handle all visual changes (scale, border-color)
 *  - { passive: true } on all non-cancelling listeners
 *  - Empty dependency array → listeners are registered exactly once
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Mouse position (updated synchronously in onMove)
    let mx = -100, my = -100;
    // Ring lerped position (updated each rAF tick)
    let rx = -100, ry = -100;
    let rafId: number;

    // Lerp factor: 0.15 → ring reaches ~96% in ~20 frames (333ms at 60fps)
    // Feel free to increase (e.g. 0.25) for a tighter trail
    const LERP = 0.15;

    // Dot dimensions: w-3 = 12px → center offset = -6
    const DOT_HALF = 6;
    // Ring dimensions: w-9 = 36px → center offset = -18
    const RING_HALF = 18;

    function tick() {
      // Dot: instant 1:1 tracking — transform only, no React, no VDOM
      dot!.style.transform = `translate(${mx - DOT_HALF}px, ${my - DOT_HALF}px)`;

      // Ring: lerped trailing effect
      rx += (mx - rx) * LERP;
      ry += (my - ry) * LERP;
      ring!.style.transform = `translate(${rx - RING_HALF}px, ${ry - RING_HALF}px)`;

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);

    // ── Event handlers ────────────────────────────────────────────────────
    function onMove(e: MouseEvent) {
      mx = e.clientX;
      my = e.clientY;
      // Show on first move (opacity stays 1 after this — no repeated setState)
      if (dot!.style.opacity !== "1") {
        dot!.style.opacity = "1";
        ring!.style.opacity = "1";
      }
    }

    function onLeave() {
      dot!.style.opacity = "0";
      ring!.style.opacity = "0";
    }

    function onEnter() {
      dot!.style.opacity = "1";
      ring!.style.opacity = "1";
    }

    function onDown() {
      dot!.dataset.state = "click";
      ring!.dataset.state = "click";
    }

    function onUp() {
      delete dot!.dataset.state;
      // Restore hover if still over an interactive element
      const el = document.elementFromPoint(mx, my);
      if (el?.closest("a, button, [data-cursor='hover']")) {
        ring!.dataset.state = "hover";
      } else {
        delete ring!.dataset.state;
      }
    }

    function onOver(e: MouseEvent) {
      if ((e.target as HTMLElement).closest("a, button, [data-cursor='hover']")) {
        // Don't overwrite click state
        if (ring!.dataset.state !== "click") ring!.dataset.state = "hover";
      }
    }

    function onOut(e: MouseEvent) {
      if ((e.target as HTMLElement).closest("a, button, [data-cursor='hover']")) {
        if (ring!.dataset.state === "hover") delete ring!.dataset.state;
      }
    }

    // ── Register listeners ────────────────────────────────────────────────
    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave, { passive: true });
    document.addEventListener("mouseenter", onEnter, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mouseout", onOut, { passive: true });
    document.documentElement.classList.add("custom-cursor-active");

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []); // ← empty: registered once, never re-registered

  return (
    <>
      {/* Dot — instant tracking */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="cursor-dot fixed top-0 left-0 z-[100] pointer-events-none will-change-transform mix-blend-difference"
        style={{ opacity: 0, transition: "opacity 0.2s ease" }}
      >
        <div className="cursor-dot-inner" />
      </div>

      {/* Ring — lerped trail */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="cursor-ring fixed top-0 left-0 z-[99] pointer-events-none will-change-transform"
        style={{ opacity: 0, transition: "opacity 0.2s ease" }}
      >
        <div className="cursor-ring-inner" />
      </div>
    </>
  );
}
