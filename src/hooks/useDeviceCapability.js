import { useEffect, useState } from "react";

/**
 * Central place to decide how much visual complexity (particle count,
 * animation intensity) the current device/user should get.
 */
export function useDeviceCapability() {
  const [state, setState] = useState({
    isMobile: false,
    prefersReducedMotion: false,
  });

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const update = () =>
      setState({
        isMobile: mobileQuery.matches,
        prefersReducedMotion: motionQuery.matches,
      });

    update();
    mobileQuery.addEventListener("change", update);
    motionQuery.addEventListener("change", update);
    return () => {
      mobileQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return state;
}
