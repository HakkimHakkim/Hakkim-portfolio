import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { about } from "../data/portfolio.js";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const bodyRef = useRef(null);
  const detailsRef = useRef(null);
  const portraitRef = useRef(null);

  // ============================================================
  // IMAGE REVEAL
  // ============================================================

  useScrollReveal(portraitRef, {
    y: 40,
    duration: 1,
  });

  // ============================================================
  // MAIN ABOUT ANIMATIONS
  // ============================================================

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = gsap.context(() => {
      // --------------------------------------------------------
      // ACCESSIBILITY
      // --------------------------------------------------------

      if (prefersReducedMotion) return;

      // --------------------------------------------------------
      // HEADING WORD ANIMATION
      // --------------------------------------------------------

      const words = headingRef.current?.querySelectorAll("span");

      if (words?.length) {
        gsap.fromTo(
          words,
          {
            opacity: 0,
            y: 70,
            rotateX: -35,
            filter: "blur(8px)",
          },
          {
            opacity: 1,
            y: 0,
            rotateX: 0,
            filter: "blur(0px)",
            duration: 1,
            stagger: 0.08,
            ease: "power4.out",

            scrollTrigger: {
              trigger: section,
              start: "top 75%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // --------------------------------------------------------
      // BODY TEXT
      // --------------------------------------------------------

      gsap.fromTo(
        bodyRef.current,
        {
          opacity: 0,
          y: 35,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",

          scrollTrigger: {
            trigger: bodyRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // --------------------------------------------------------
      // DETAILS
      // --------------------------------------------------------

      if (detailsRef.current) {
        gsap.fromTo(
          detailsRef.current.children,
          {
            opacity: 0,
            x: -35,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: "power3.out",

            scrollTrigger: {
              trigger: detailsRef.current,
              start: "top 82%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // ========================================================
      // PORTRAIT PARALLAX
      // ========================================================

      if (portraitRef.current) {
        gsap.to(portraitRef.current, {
          y: -80,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      }

      // ========================================================
      // BACKGROUND ORBS
      // ========================================================

      const orbs = section.querySelectorAll(".about-orb");

      orbs.forEach((orb, index) => {
        const direction = index % 2 === 0 ? -1 : 1;

        gsap.to(orb, {
          y: direction * (90 + index * 30),
          x: direction * (30 + index * 20),
          rotate: direction * 35,

          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2 + index * 0.5,
          },
        });
      });

      // ========================================================
      // GRID PARALLAX
      // ========================================================

      const grid = section.querySelector(".about-grid");

      if (grid) {
        gsap.to(grid, {
          y: -120,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      // ========================================================
      // BIG BACKGROUND TEXT
      // ========================================================

      const backgroundText = section.querySelector(
        ".about-background-text"
      );

      if (backgroundText) {
        gsap.to(backgroundText, {
          x: -180,
          opacity: 0.15,

          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: 2.5,
          },
        });
      }

      // ========================================================
      // MOUSE PARALLAX
      // ========================================================

      let mouseX = 0;
      let mouseY = 0;

      let currentX = 0;
      let currentY = 0;

      const handleMouseMove = (event) => {
        const rect = section.getBoundingClientRect();

        const x =
          (event.clientX - rect.left) / rect.width - 0.5;

        const y =
          (event.clientY - rect.top) / rect.height - 0.5;

        mouseX = x;
        mouseY = y;
      };

      const animateMouse = () => {
        currentX += (mouseX - currentX) * 0.06;
        currentY += (mouseY - currentY) * 0.06;

        gsap.set(".about-mouse-orb", {
          x: currentX * 80,
          y: currentY * 80,
        });

        gsap.set(".about-mouse-orb-small", {
          x: currentX * -45,
          y: currentY * -45,
        });

        requestAnimationFrame(animateMouse);
      };

      section.addEventListener("mousemove", handleMouseMove);

      const animationFrame = requestAnimationFrame(animateMouse);

      // ========================================================
      // CLEANUP
      // ========================================================

      return () => {
        section.removeEventListener(
          "mousemove",
          handleMouseMove
        );

        cancelAnimationFrame(animationFrame);
      };
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
     className="
  relative
  isolate
  mx-auto
  min-h-screen
  max-w-7xl
  overflow-hidden
  px-6
  pt-28
  pb-8
  md:px-10
  md:pt-40
  md:pb-10
"
    >

      {/* ======================================================
          BACKGROUND SYSTEM
      ======================================================= */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          -z-10
          overflow-hidden
        "
        aria-hidden="true"
      >

        {/* BIG SOFT ORB */}

        <div
          className="
            about-orb
            absolute
            -left-32
            top-20
            h-80
            w-80
            rounded-full
            bg-violet-500/[0.08]
            blur-[100px]
          "
        />

        {/* SECOND ORB */}

        <div
          className="
            about-orb
            absolute
            right-[-140px]
            top-[35%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-fuchsia-500/[0.06]
            blur-[120px]
          "
        />

        {/* THIRD ORB */}

        <div
          className="
            about-orb
            absolute
            bottom-[-150px]
            left-[35%]
            h-[350px]
            w-[350px]
            rounded-full
            bg-cyan-400/[0.045]
            blur-[110px]
          "
        />

        {/* MOUSE ORB */}

        <div
          className="
            about-mouse-orb
            absolute
            left-[45%]
            top-[30%]
            h-56
            w-56
            rounded-full
            bg-violet-400/[0.045]
            blur-[90px]
          "
        />

        {/* SMALL MOUSE ORB */}

        <div
          className="
            about-mouse-orb-small
            absolute
            right-[25%]
            top-[55%]
            h-32
            w-32
            rounded-full
            bg-cyan-300/[0.04]
            blur-[70px]
          "
        />

        {/* GRID */}

        <div
          className="
            about-grid
            absolute
            inset-[-20%]
            opacity-[0.12]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.055) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.055) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "80px 80px",
            maskImage:
              "radial-gradient(circle at center, black, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(circle at center, black, transparent 75%)",
          }}
        />

        {/* HUGE TYPOGRAPHY */}

        <div
          className="
            about-background-text
            absolute
            left-[10%]
            top-[42%]
            whitespace-nowrap
            font-display
            text-[18vw]
            font-black
            uppercase
            tracking-[-0.08em]
            text-white/[0.025]
          "
        >
          HAKKIM
        </div>

      </div>

      {/* ======================================================
          SECTION LABEL
      ======================================================= */}

      <div className="relative z-10">
        <p className="section-label">
          01 — About
        </p>
      </div>

      {/* ======================================================
          HEADING
      ======================================================= */}

      <h2
        ref={headingRef}
        className="
          relative
          z-10
          mt-6
          max-w-4xl
          font-display
          text-4xl
          font-semibold
          leading-[1.02]
          tracking-tightest
          text-ink-100
          sm:text-5xl
          md:text-6xl
          lg:text-7xl
        "
      >
        {about.kicker.split(" ").map((word, index) => (
          <span
            key={index}
            className="
              mr-3
              inline-block
              will-change-transform
              md:mr-5
            "
          >
            {word}
          </span>
        ))}
      </h2>

      {/* ======================================================
          MAIN CONTENT
      ======================================================= */}

      <div
        className="
          relative
          z-10
          mt-12
          grid
          grid-cols-1
          items-center
          gap-14
          md:mt-20
          md:grid-cols-[minmax(280px,0.78fr)_1.22fr]
          md:gap-20
        "
      >

        {/* ====================================================
            PORTRAIT
        ===================================================== */}

        <div
          ref={portraitRef}
          className="
            relative
            mx-auto
            w-full
            max-w-sm
            will-change-transform
            md:mx-0
          "
        >

          {/* Outer rotating frame */}

          <div
            className="
              absolute
              -inset-5
              rounded-[2.3rem]
              border
              border-violet-400/10
              [transform:rotate(3deg)]
            "
            aria-hidden="true"
          />

          <div
            className="
              absolute
              -inset-3
              rounded-[2rem]
              border
              border-white/10
              [transform:rotate(-2deg)]
            "
            aria-hidden="true"
          />

          {/* Image */}

          <div
            className="
              relative
              aspect-[4/5]
              overflow-hidden
              rounded-[1.7rem]
              bg-white/[0.04]
              shadow-2xl
              shadow-black/40
            "
          >

            <img
              src="/hakkim-profile.jpg"
              alt="Hakkim wearing a black suit"
              className="
                h-full
                w-full
                object-cover
                object-[center_38%]
                transition-transform
                duration-700
                hover:scale-[1.04]
              "
              loading="lazy"
              decoding="async"
            />

            {/* Image gradient */}

            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-[#060308]/60
                via-transparent
                to-transparent
              "
              aria-hidden="true"
            />

            {/* Image shine */}

            <div
              className="
                pointer-events-none
                absolute
                inset-0
                bg-gradient-to-tr
                from-transparent
                via-white/[0.035]
                to-transparent
              "
              aria-hidden="true"
            />

          </div>

          {/* Floating status */}

          <div
            className="
              absolute
              -bottom-5
              -right-5
              rounded-2xl
              border
              border-white/10
              bg-[#0a0710]/80
              px-4
              py-3
              shadow-xl
              backdrop-blur-xl
            "
          >
            <div className="flex items-center gap-2">

              <span
                className="
                  h-2
                  w-2
                  animate-pulse
                  rounded-full
                  bg-emerald-400
                "
              />

              <span
                className="
                  font-mono
                  text-[10px]
                  uppercase
                  tracking-[0.2em]
                  text-white/60
                "
              >
                Available
              </span>

            </div>
          </div>

        </div>

        {/* ====================================================
            TEXT CONTENT
        ===================================================== */}

        <div className="space-y-10">

          {/* Body */}

          <p
            ref={bodyRef}
            className="
              max-w-xl
              text-balance
              text-lg
              leading-relaxed
              text-ink-400
              md:text-xl
            "
          >
            {about.body}
          </p>

          {/* Details */}

          <dl
            ref={detailsRef}
            className="
              flex
              flex-col
              gap-6
              border-l
              border-white/10
              pl-6
            "
          >
            {about.details.map((item) => (
              <div
                key={item.label}
                className="
                  group
                  relative
                  transition-transform
                  duration-300
                  hover:translate-x-2
                "
              >

                {/* Active line */}

                <span
                  className="
                    absolute
                    -left-[25px]
                    top-0
                    h-full
                    w-[2px]
                    origin-top
                    scale-y-0
                    bg-violet-400
                    transition-transform
                    duration-300
                    group-hover:scale-y-100
                  "
                />

                <dt
                  className="
                    font-mono
                    text-xs
                    uppercase
                    tracking-[0.18em]
                    text-ink-600
                  "
                >
                  {item.label}
                </dt>

                <dd
                  className="
                    mt-1
                    text-base
                    text-ink-100
                  "
                >
                  {item.value}
                </dd>

              </div>
            ))}
          </dl>

        </div>

      </div>

      {/* ======================================================
          BOTTOM DECORATION
      ======================================================= */}

      <div
        className="
          relative
          z-10
          mt-24
          flex
          items-center
          gap-4
          text-ink-600
        "
      >

        <span
          className="
            h-px
            w-16
            bg-white/10
          "
        />

        <span
          className="
            font-mono
            text-[10px]
            uppercase
            tracking-[0.25em]
          "
        >
          Building digital experiences
        </span>

      </div>

    </section>
  );
}