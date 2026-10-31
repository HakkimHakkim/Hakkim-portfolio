import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Lab from "./components/Lab.jsx";
import Experience from "./components/Experience.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import MouseGlow from "./components/MouseGlow.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const pageRef = useRef(null);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      /*
      ============================================================
      SECTION SCROLL MOTION
      ============================================================

      Every section enters smoothly while scrolling.

      Important:
      We are NOT giving huge movement here.
      This prevents the page from looking like every section
      is floating too far away.
      */

      const sections = gsap.utils.toArray(
        "main > section"
      );

      sections.forEach((section) => {
        gsap.fromTo(
          section,
          {
            opacity: 0.72,
            y: 24,
          },
          {
            opacity: 1,
            y: 0,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 92%",
              end: "top 62%",
              scrub: 0.6,
            },
          }
        );
      });

      /*
      ============================================================
      SECTION PARALLAX
      ============================================================

      Small movement while scrolling.

      This is intentionally subtle.
      */

      const visualSections = gsap.utils.toArray(
        "main > section:not(#top)"
      );

      visualSections.forEach((section) => {
        const background = section.querySelector(
          "[data-section-bg]"
        );

        if (!background) return;

        gsap.to(background, {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={pageRef}
      className="
        site-shell
        grain
        relative
        isolate
        min-h-screen
        overflow-x-hidden
        bg-void
      "
    >
      {/* ======================================================
          GLOBAL MOUSE LIGHT
      ======================================================= */}

      <MouseGlow />

      {/* ======================================================
          ACTUAL PAGE
      ======================================================= */}

      <div className="relative z-10">
        <Navbar />

        <main>
  {/* 00  /  HOME */}
  <Hero />

  {/* 01  /  ABOUT */}
  <About />

  {/* 02  /  SKILLS */}
  <Skills />

  {/* 03  /  WORK */}
  <Projects />

  {/* 04  /  CERTIFICATIONS */}
  <Experience />

  {/* 05  /  CONTACT */}
  <Contact />
</main>

        <Footer />
      </div>
    </div>
  );
}
