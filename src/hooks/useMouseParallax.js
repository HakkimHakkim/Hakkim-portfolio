import { useEffect, useRef } from "react";

/**
 * Tracks normalized pointer position (-1 to 1 on each axis) in a ref,
 * so consumers (e.g. R3F useFrame loops) can read it without
 * triggering React re-renders on every mouse move.
 */
export function useMouseParallax() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    const handleTouch = (e) => {
      if (!e.touches?.[0]) return;
      const t = e.touches[0];
      pointer.current.x = (t.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = (t.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  return pointer;
}
