import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(ref, { y = 24, duration = 0.7, start = "top 84%" } = {}) {
  useEffect(() => {
    const element = ref.current;
    if (!element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y },
        {
          autoAlpha: 1,
          y: 0,
          duration,
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start,
            once: true,
          },
        }
      );
    }, element);

    return () => context.revert();
  }, [ref, y, duration, start]);
}

