
import { useEffect, useState } from "react";

/**
 * Decides how much visual complexity the portfolio should use.
 *
 * Why this exists:
 * Desktop can handle more 3D effects.
 * Mobile devices need a lighter version to avoid:
 * - scrolling lag
 * - FPS drops
 * - excessive GPU/CPU usage
 * - heating/battery drain
 */

export function useDeviceCapability() {
  const [state, setState] = useState({
    isMobile: false,
    isLowPower: false,
    prefersReducedMotion: false,
    quality: "high",
  });

  useEffect(() => {
    // Detect screen size.
    const mobileQuery = window.matchMedia("(max-width: 768px)");

    // Detect user's accessibility preference.
    const motionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const update = () => {
      const isMobile = mobileQuery.matches;

      /*
       * Number of logical CPU cores.
       *
       * Example:
       * 8  -> usually stronger device
       * 4  -> normal
       * 2  -> potentially weaker device
       *
       * Some browsers may not expose this value.
       */
      const cpuCores = navigator.hardwareConcurrency || 4;

      /*
       * Device memory is not supported by every browser.
       *
       * When supported, this is an approximate RAM value in GB.
       */
      const deviceMemory = navigator.deviceMemory || 4;

      /*
       * Detect potentially weaker devices.
       */
      const isLowPower =
        cpuCores <= 4 ||
        deviceMemory <= 4;

      /*
       * Decide visual quality.
       *
       * Mobile:
       * Keep the 3D experience, but make it lighter.
       *
       * Low-power mobile:
       * Use very light effects.
       *
       * Desktop:
       * Allow full visual quality.
       */
      let quality = "high";

      if (isMobile && (isLowPower || motionQuery.matches)) {
        quality = "low";
      } else if (isMobile) {
        quality = "medium";
      } else if (motionQuery.matches) {
        quality = "medium";
      }

      setState({
        isMobile,
        isLowPower,
        prefersReducedMotion: motionQuery.matches,
        quality,
      });
    };

    // Run once when the component loads.
    update();

    // Re-check if screen size changes.
    mobileQuery.addEventListener("change", update);

    // Re-check if reduced-motion preference changes.
    motionQuery.addEventListener("change", update);

    return () => {
      mobileQuery.removeEventListener("change", update);
      motionQuery.removeEventListener("change", update);
    };
  }, []);

  return state;
}


