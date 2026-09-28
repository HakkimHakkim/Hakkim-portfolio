import { useEffect, useRef } from "react";

export default function MouseGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    const glow = glowRef.current;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!glow || !canHover.matches || reduceMotion.matches) return undefined;

    let frame = 0;
    const moveGlow = (event) => {
      const { clientX, clientY } = event;
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        glow.style.transform = `translate3d(${clientX - 240}px, ${clientY - 240}px, 0)`;
        glow.style.opacity = "1";
        frame = 0;
      });
    };
    const hideGlow = () => {
      glow.style.opacity = "0";
    };

    window.addEventListener("pointermove", moveGlow, { passive: true });
    document.documentElement.addEventListener("pointerleave", hideGlow);

    return () => {
      window.removeEventListener("pointermove", moveGlow);
      document.documentElement.removeEventListener("pointerleave", hideGlow);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[480px] w-[480px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-300"
      style={{
        background:
          "radial-gradient(circle, rgba(139,92,246,0.14) 0%, rgba(139,92,246,0.06) 35%, transparent 72%)",
        willChange: "transform, opacity",
      }}
    />
  );
}
