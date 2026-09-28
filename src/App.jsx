import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar.jsx";
import SocialRail from "./components/SocialRail.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Lab from "./components/Lab.jsx";
import Experience from "./components/Experience.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import MouseGlow from "./components/MouseGlow.jsx";
import GlobalBackground from "./components/GlobalBackground.jsx";

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
        grain
        relative
        isolate
        min-h-screen
        overflow-x-hidden
        bg-void
      "
    >
      <GlobalBackground />

      {/* ======================================================
          GLOBAL MOUSE LIGHT
      ======================================================= */}

      <MouseGlow />

      {/* ======================================================
          GLOBAL BACKGROUND ATMOSPHERE

          This stays behind ALL pages.
          Hero / About / Skills / Projects / Lab /
          Experience / Contact all get the same living
          atmosphere.
      ======================================================= */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          fixed
          inset-0
          z-0
          overflow-hidden
        "
      >
        {/* Large ambient violet light */}
        <div
          className="
            absolute
            left-[15%]
            top-[18%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-violet-600/[0.045]
            blur-[110px]
            animate-global-orb-one
          "
        />

        {/* Pink secondary light */}
        <div
          className="
            absolute
            right-[8%]
            top-[48%]
            h-[360px]
            w-[360px]
            rounded-full
            bg-fuchsia-500/[0.035]
            blur-[110px]
            animate-global-orb-two
          "
        />

        {/* Lower atmospheric light */}
        <div
          className="
            absolute
            bottom-[5%]
            left-[42%]
            h-[300px]
            w-[300px]
            rounded-full
            bg-indigo-500/[0.03]
            blur-[100px]
            animate-global-orb-three
          "
        />
      </div>

      {/* ======================================================
          ACTUAL PAGE
      ======================================================= */}

      <div className="relative z-10">
        <Navbar />

        <SocialRail />

        <main>
  {/* 00 — HOME */}
  <Hero />

  {/* 01 — ABOUT */}
  <About />

  {/* 02 — SKILLS */}
  <Skills />

  {/* 03 — WORK */}
  <Projects />

  {/* 04 — CERTIFICATIONS */}
  <Experience />

  {/* 05 — CONTACT */}
  <Contact />
</main>

        <Footer />
      </div>
    </div>
  );
}