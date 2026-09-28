import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  ArrowDown,
  ArrowUpRight,
  FileDown,
} from "lucide-react";

import HeroScene from "./HeroScene.jsx";

import { profile } from "../data/portfolio.js";
import { useMouseParallax } from "../hooks/useMouseParallax.js";

export default function Hero() {
  const rootRef = useRef(null);
  const greetingRef = useRef(null);
  const nameRef = useRef(null);
  const roleRef = useRef(null);
  const ctaRef = useRef(null);
  const sceneRef = useRef(null);
  const glowRef = useRef(null);
  const statusRef = useRef(null);

  const pointer = useMouseParallax();

  /*
  ============================================================
  HERO ENTRANCE ANIMATION
  ============================================================
  */

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      /*
      ----------------------------------------------------------
      REDUCED MOTION
      ----------------------------------------------------------
      Accessibility:
      Users who prefer reduced motion should not receive
      heavy entrance animations.
      */

      if (prefersReducedMotion) {
        gsap.set(
          [
            greetingRef.current,
            nameRef.current,
            roleRef.current,
            ctaRef.current,
            sceneRef.current,
            glowRef.current,
            statusRef.current,
          ],
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
          }
        );

        return;
      }

      /*
      ----------------------------------------------------------
      INITIAL HERO STATE
      ----------------------------------------------------------
      */

      gsap.set(rootRef.current, {
        opacity: 1,
      });

      /*
      ----------------------------------------------------------
      MAIN TIMELINE
      ----------------------------------------------------------
      */

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      /*
      ----------------------------------------------------------
      AMBIENT GLOW
      ----------------------------------------------------------
      */

      tl.fromTo(
        glowRef.current,
        {
          opacity: 0,
          scale: 0.9,
        },
        {
          opacity: 1,
          scale: 1,
          duration: 1.5,
          ease: "power2.out",
        }
      );

      /*
      ----------------------------------------------------------
      3D ROBOT ENTRANCE
      ----------------------------------------------------------
      */

      tl.fromTo(
        sceneRef.current,
        {
          opacity: 0,
          scale: 0.92,
          x: 35,
        },
        {
          opacity: 1,
          scale: 1,
          x: 0,
          duration: 1.25,
          ease: "power3.out",
        },
        "-=1.15"
      );

      /*
      ----------------------------------------------------------
      GREETING
      ----------------------------------------------------------
      */

      tl.fromTo(
        greetingRef.current,
        {
          opacity: 0,
          y: 16,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
        },
        "-=0.95"
      );

      /*
      ----------------------------------------------------------
      NAME
      ----------------------------------------------------------
      */

      tl.fromTo(
        nameRef.current,
        {
          opacity: 0,
          y: 28,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
        },
        "-=0.3"
      );

      /*
      ----------------------------------------------------------
      ROLE
      ----------------------------------------------------------
      */

      tl.fromTo(
        roleRef.current,
        {
          opacity: 0,
          y: 18,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        "-=0.35"
      );

      /*
      ----------------------------------------------------------
      STATUS
      ----------------------------------------------------------
      */

      tl.fromTo(
        statusRef.current,
        {
          opacity: 0,
          y: 12,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
        },
        "-=0.25"
      );

      /*
      ----------------------------------------------------------
      CTA
      ----------------------------------------------------------
      */

      tl.fromTo(
        ctaRef.current,
        {
          opacity: 0,
          y: 14,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
        },
        "-=0.2"
      );
    }, rootRef);

    return () => {
      ctx.revert();
    };
  }, []);

  /*
  ============================================================
  SMOOTH SCROLL
  ============================================================
  */

  const scrollToSection = (event, sectionId) => {
    event.preventDefault();

    document
      .querySelector(sectionId)
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  /*
  ============================================================
  UI
  ============================================================
  */

  return (
    <section
      id="top"
      ref={rootRef}
      aria-label="Introduction"
      className="
        relative
        flex
        min-h-screen
        w-full
        items-center
        overflow-hidden
        py-24
        sm:py-28
        lg:py-20
      "
    >
      {/* ======================================================
          BACKGROUND LIGHT
      ======================================================= */}

      <div
        ref={glowRef}
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
        "
        style={{
          background: `
            radial-gradient(
              48% 50% at 74% 42%,
              rgba(139, 92, 246, 0.16),
              transparent 72%
            ),
            radial-gradient(
              30% 35% at 88% 68%,
              rgba(244, 114, 182, 0.08),
              transparent 72%
            )
          `,
        }}
      />

      {/* Subtle center lighting */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-500/[0.035]
          blur-3xl
          lg:hidden
        "
      />

      {/* ======================================================
          MAIN CONTAINER
      ======================================================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          grid
          w-full
          max-w-7xl
          grid-cols-1
          items-center
          gap-4
          px-5
          sm:px-7
          md:grid-cols-2
          md:gap-8
          md:px-10
          lg:gap-12
        "
      >
        {/* ====================================================
            LEFT CONTENT
        ===================================================== */}

        <div
          className="
            relative
            z-20
            order-2
            max-w-2xl
            md:order-1
          "
        >
          {/* ==================================================
              GREETING
          =================================================== */}

          <p
            ref={greetingRef}
            className="
              font-mono
              text-xs
              tracking-[0.12em]
              text-violet-300/90
              sm:text-sm
            "
          >
            {profile.fullGreeting}
          </p>

          {/* ==================================================
              NAME
          =================================================== */}

          <h1
            ref={nameRef}
            className="
              mt-3
              font-display
              text-[3.25rem]
              font-semibold
              leading-[0.9]
              tracking-[-0.055em]
              text-ink-100
              sm:text-[4.5rem]
              lg:text-[5.5rem]
              xl:text-[6rem]
            "
          >
            {profile.name}
          </h1>

          {/* ==================================================
              ROLE
          =================================================== */}

          <p
            ref={roleRef}
            className="
              mt-5
              max-w-xl
              font-display
              text-lg
              font-medium
              leading-relaxed
              text-ink-300
              sm:text-2xl
            "
          >
            {profile.role}

            <span
              className="
                mt-1
                block
                max-w-lg
                text-sm
                font-normal
                leading-relaxed
                text-ink-500
                sm:text-lg
              "
            >
              {profile.tagline}
            </span>
          </p>

          {/* ==================================================
              STATUS
          =================================================== */}

          <div
            ref={statusRef}
            className="
              mt-7
              inline-flex
              items-center
              gap-3
              rounded-full
              border
              border-white/[0.07]
              bg-white/[0.025]
              px-4
              py-2.5
              shadow-[0_8px_40px_rgba(0,0,0,0.12)]
              backdrop-blur-md
            "
          >
            {/* Status indicator */}

            <span
              className="
                relative
                flex
                h-2
                w-2
                shrink-0
              "
            >
              <span
                className="
                  absolute
                  inline-flex
                  h-full
                  w-full
                  animate-ping
                  rounded-full
                  bg-emerald-400
                  opacity-50
                "
              />

              <span
                className="
                  relative
                  inline-flex
                  h-2
                  w-2
                  rounded-full
                  bg-emerald-400
                "
              />
            </span>

            <span
              className="
                font-mono
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-white/50
                sm:text-[10px]
              "
            >
              Open to opportunities
            </span>
          </div>

          {/* ==================================================
              CTA
          =================================================== */}

          <div
            ref={ctaRef}
            className="
              mt-8
              flex
              flex-wrap
              items-center
              gap-3
              sm:mt-9
              sm:gap-4
            "
          >
            {/* =================================================
                PRIMARY CTA
            ================================================== */}

            <a
              href="#work"
              onClick={(event) =>
                scrollToSection(event, "#work")
              }
              className="
                group
                relative
                inline-flex
                items-center
                gap-3
                overflow-hidden
                rounded-full
                border
                border-violet-300/30
                bg-violet-400/[0.10]
                px-5
                py-3
                text-sm
                font-semibold
                text-white
                shadow-[0_0_30px_rgba(139,92,246,0.10)]
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-violet-300/60
                hover:bg-violet-400/[0.17]
                hover:shadow-[0_0_45px_rgba(139,92,246,0.20)]
                focus:outline-none
                focus:ring-2
                focus:ring-violet-300/40
                focus:ring-offset-2
                focus:ring-offset-transparent
                sm:px-6
                sm:py-3.5
              "
            >
              {/* Shimmer */}

              <span
                aria-hidden="true"
                className="
                  absolute
                  inset-y-0
                  -left-full
                  w-1/2
                  skew-x-[-20deg]
                  bg-white/[0.10]
                  transition-all
                  duration-700
                  group-hover:left-[130%]
                "
              />

              <span className="relative">
                Explore my work
              </span>

              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="
                  relative
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </a>

            {/* =================================================
                RESUME
            ================================================== */}

            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.025]
                px-5
                py-3
                text-sm
                font-medium
                text-ink-400
                transition-all
                duration-300
                hover:-translate-y-0.5
                hover:border-white/20
                hover:bg-white/[0.05]
                hover:text-ink-100
                focus:outline-none
                focus:ring-2
                focus:ring-white/20
                sm:py-3.5
              "
            >
              <FileDown
                size={14}
                aria-hidden="true"
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                "
              />

              View Resume
            </a>
          </div>

          {/* ==================================================
              SUPPORTING LINE
          =================================================== */}

          <p
            className="
              mt-6
              max-w-md
              text-[11px]
              leading-relaxed
              text-white/25
              sm:mt-7
              sm:text-xs
            "
          >
            Building thoughtful digital experiences where
            modern web technology meets intelligent systems.
          </p>
        </div>

        {/* ====================================================
            RIGHT SIDE — 3D ROBOT
        ===================================================== */}

        <div
          ref={sceneRef}
          className="
            relative
            order-1
            h-[40vh]
            min-h-[290px]
            w-full
            md:order-2
            md:h-[68vh]
            md:min-h-[520px]
            lg:h-[72vh]
          "
        >
          <HeroScene pointer={pointer} />
        </div>
      </div>

      {/* ======================================================
          SCROLL INDICATOR
      ======================================================= */}

      <a
        href="#about"
        onClick={(event) =>
          scrollToSection(event, "#about")
        }
        aria-label="Scroll to About section"
        className="
          absolute
          bottom-7
          left-1/2
          z-20
          hidden
          -translate-x-1/2
          flex-col
          items-center
          gap-2
          text-ink-600
          transition-all
          duration-300
          hover:-translate-y-1
          hover:text-ink-100
          md:flex
        "
      >
        <span
          className="
            font-mono
            text-[10px]
            tracking-[0.18em]
          "
        >
          SCROLL
        </span>

        <ArrowDown
          size={14}
          aria-hidden="true"
          className="animate-bounce"
        />
      </a>
    </section>
  );
}