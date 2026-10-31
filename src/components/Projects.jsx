import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import {
  ArrowUpRight,
  Bot,
  BrainCircuit,
  Sparkles,
  Network,
  MessageSquare,
  Target,
  Layers3,
} from "lucide-react";

import { useScrollReveal } from "../hooks/useScrollReveal.js";

gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   PROJECT DATA
============================================================ */

const projects = [
  {
    number: "01",
    title: "AI Career Mentor",
    category: "AI CAREER INTELLIGENCE",
    description:
      "A full-stack career guidance platform that uses machine learning to predict suitable career paths and connects the result with dynamic roadmaps, AI career assistance and interview preparation.",

    stack: [
      "React",
      "FastAPI",
      "PostgreSQL",
      "Machine Learning",
    ],

    url: "https://ai-career-mentor-beta.vercel.app",

    type: "mentor",
  },

  {
    number: "02",
    title: "AI Nexus",
    category: "MULTI-MODEL AI PLATFORM",
    description:
      "A full-stack AI workspace where users can interact with multiple AI models through one interface with authentication, chat management and a deployed FastAPI backend.",

    stack: [
      "React",
      "FastAPI",
      "SQLite",
      "Generative AI",
    ],

    url: "https://ai-nexus-lime.vercel.app",

    type: "nexus",
  },
];

/* ============================================================
   PREMIUM PROJECT VISUAL
============================================================ */

function ProjectVisual({ type }) {
  /* ==========================================================
     AI CAREER MENTOR
  ========================================================== */

  if (type === "mentor") {
    return (
      <div
        className="
          relative
          h-full
          min-h-[340px]
          overflow-hidden
          bg-[#120f12]
          md:min-h-[500px]
        "
      >
        {/* Ambient lighting */}

        <div
          className="
            absolute
            -left-24
            top-[-80px]
            h-[320px]
            w-[320px]
            rounded-full
            bg-maroon-500/[0.16]
            blur-[110px]
          "
        />

        <div
          className="
            absolute
            -right-20
            bottom-[-100px]
            h-[300px]
            w-[300px]
            rounded-full
            bg-silver-500/[0.10]
            blur-[100px]
          "
        />

        {/* Technical grid */}

        <div
          className="
            absolute
            inset-0
            opacity-[0.06]
          "
          style={{
            backgroundImage: `
              linear-gradient(
                rgba(255,255,255,0.08) 1px,
                transparent 1px
              ),
              linear-gradient(
                90deg,
                rgba(255,255,255,0.08) 1px,
                transparent 1px
              )
            `,
            backgroundSize: "46px 46px",
          }}
        />

        {/* Top technical label */}

        <div
          className="
            absolute
            left-7
            top-7
            z-20
            flex
            items-center
            gap-2
            font-mono
            text-[9px]
            uppercase
            tracking-[0.25em]
            text-white/35
          "
        >
          <span className="h-1.5 w-1.5 rounded-full bg-maroon-300" />
          Career Intelligence System
        </div>

        {/* Main interface */}

        <div
          className="
            absolute
            left-[8%]
            right-[8%]
            top-[19%]
            rounded-[1.7rem]
            border
            border-white/[0.10]
            bg-white/[0.035]
            p-5
            shadow-[0_30px_100px_rgba(0,0,0,0.45)]
            backdrop-blur-xl
            md:p-6
          "
        >
          {/* Interface header */}

          <div className="flex items-center gap-3">
            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-2xl
                border
                border-maroon-300/10
                bg-maroon-400/[0.08]
                text-maroon-200
              "
            >
              <BrainCircuit size={22} />
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                AI Career Mentor
              </p>

              <p
                className="
                  mt-1
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.18em]
                  text-white/30
                "
              >
                Intelligent career guidance
              </p>
            </div>

            <div className="ml-auto flex items-center gap-2">
              <span
                className="
                  h-1.5
                  w-1.5
                  animate-pulse
                  rounded-full
                  bg-emerald-400
                "
              />

              <span className="font-mono text-[9px] text-white/30">
                ACTIVE
              </span>
            </div>
          </div>

          {/* Prediction panel */}

          <div
            className="
              mt-6
              rounded-2xl
              border
              border-white/[0.08]
              bg-black/20
              p-4
            "
          >
            <div className="flex items-center justify-between">
              <div>
                <p
                  className="
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.2em]
                    text-white/30
                  "
                >
                  Predicted career path
                </p>

                <p className="mt-2 text-sm font-medium text-white/85">
                  Full Stack Developer
                </p>
              </div>

              <div
                className="
                  flex
                  h-12
                  w-12
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-maroon-300/20
                  bg-maroon-400/[0.08]
                "
              >
                <Target
                  size={18}
                  className="text-maroon-200"
                />
              </div>
            </div>

            {/* Progress */}

            <div className="mt-5">
              <div className="mb-2 flex justify-between">
                <span className="font-mono text-[9px] text-white/30">
                  MATCH CONFIDENCE
                </span>

                <span className="font-mono text-[10px] text-maroon-200">
                  92%
                </span>
              </div>

              <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
                <div
                  className="
                    h-full
                    w-[92%]
                    rounded-full
                    bg-gradient-to-r
                    from-maroon-500
                    to-silver-300
                  "
                />
              </div>
            </div>
          </div>

          {/* Mini modules */}

          <div className="mt-3 grid grid-cols-3 gap-2">
            {[
              ["ROADMAP", "Ready"],
              ["AI TUTOR", "Online"],
              ["INTERVIEW", "Practice"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="
                  rounded-xl
                  border
                  border-white/[0.06]
                  bg-white/[0.025]
                  px-3
                  py-3
                "
              >
                <p className="font-mono text-[7px] tracking-[0.15em] text-white/25">
                  {label}
                </p>

                <p className="mt-1 text-[10px] text-white/65">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating bot */}

        <div
          className="
            absolute
            bottom-[9%]
            right-[8%]
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            border
            border-maroon-300/20
            bg-maroon-400/[0.08]
            shadow-[0_0_60px_rgba(116, 27, 56,0.22)]
            backdrop-blur-xl
            md:h-20
            md:w-20
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-maroon-400/[0.10]
              md:h-12
              md:w-12
            "
          >
            <Bot
              size={23}
              className="text-maroon-200"
            />
          </div>
        </div>

        {/* Bottom metadata */}

        <div
          className="
            absolute
            bottom-7
            left-7
            flex
            items-center
            gap-3
            font-mono
            text-[8px]
            uppercase
            tracking-[0.22em]
            text-white/25
          "
        >
          <span>ML</span>
          <span className="text-white/10">/</span>
          <span>AI</span>
          <span className="text-white/10">/</span>
          <span>CAREER</span>
        </div>
      </div>
    );
  }

  /* ==========================================================
     AI NEXUS
  ========================================================== */

  return (
    <div
      className="
        relative
        h-full
        min-h-[340px]
        overflow-hidden
        bg-[#111216]
        md:min-h-[500px]
      "
    >
      {/* Ambient lighting */}

      <div
        className="
          absolute
          -right-24
          top-[-80px]
          h-[340px]
          w-[340px]
          rounded-full
          bg-silver-400/[0.11]
          blur-[110px]
        "
      />

      <div
        className="
          absolute
          -left-24
          bottom-[-80px]
          h-[300px]
          w-[300px]
          rounded-full
          bg-maroon-500/[0.10]
          blur-[100px]
        "
      />

      {/* Grid */}

      <div
        className="
          absolute
          inset-0
          opacity-[0.055]
        "
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(255,255,255,0.08) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(255,255,255,0.08) 1px,
              transparent 1px
            )
          `,
          backgroundSize: "46px 46px",
        }}
      />

      {/* Technical heading */}

      <div
        className="
          absolute
          left-7
          top-7
          z-20
          flex
          items-center
          gap-2
          font-mono
          text-[9px]
          uppercase
          tracking-[0.25em]
          text-white/30
        "
      >
        <span className="h-1.5 w-1.5 rounded-full bg-silver-300" />
        Multi Model Intelligence
      </div>

      {/* Chat window */}

      <div
        className="
          absolute
          left-[7%]
          right-[7%]
          top-[19%]
          rounded-[1.7rem]
          border
          border-white/[0.10]
          bg-white/[0.035]
          p-5
          shadow-[0_30px_100px_rgba(0,0,0,0.45)]
          backdrop-blur-xl
          md:p-6
        "
      >
        {/* Header */}

        <div
          className="
            flex
            items-center
            gap-3
            border-b
            border-white/[0.07]
            pb-4
          "
        >
          <div
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-silver-300/10
              bg-silver-300/[0.06]
            "
          >
            <Bot
              size={20}
              className="text-silver-200"
            />
          </div>

          <div>
            <p className="text-sm font-semibold text-white">
              AI Nexus
            </p>

            <p
              className="
                mt-1
                font-mono
                text-[9px]
                uppercase
                tracking-[0.18em]
                text-white/30
              "
            >
              Unified AI workspace
            </p>
          </div>

          <span
            className="
              ml-auto
              rounded-full
              border
              border-emerald-400/15
              bg-emerald-400/[0.06]
              px-2
              py-1
              font-mono
              text-[8px]
              text-emerald-300/80
            "
          >
            ONLINE
          </span>
        </div>

        {/* Chat */}

        <div className="mt-5 space-y-3">
          <div
            className="
              max-w-[78%]
              rounded-2xl
              rounded-tl-sm
              border
              border-white/[0.07]
              bg-white/[0.035]
              px-4
              py-3
            "
          >
            <p className="text-[10px] leading-relaxed text-white/55">
              Build a roadmap for becoming a full-stack developer.
            </p>
          </div>

          <div
            className="
              ml-auto
              max-w-[82%]
              rounded-2xl
              rounded-tr-sm
              border
              border-silver-300/10
              bg-silver-300/[0.045]
              px-4
              py-3
            "
          >
            <p className="text-[10px] leading-relaxed text-silver-50/65">
              I can help you create a structured learning roadmap...
            </p>
          </div>
        </div>

        {/* Model selector */}

        <div className="mt-5">
          <p
            className="
              mb-2
              font-mono
              text-[8px]
              uppercase
              tracking-[0.2em]
              text-white/25
            "
          >
            Active models
          </p>

          <div className="flex flex-wrap gap-2">
            {[
              ["GPT-OSS", "orange"],
              ["QWEN", "cyan"],
              ["GEMINI", "white"],
            ].map(([model, color]) => (
              <span
                key={model}
                className={`
                  rounded-full
                  border
                  px-3
                  py-1.5
                  font-mono
                  text-[8px]
                  ${
                    color === "orange"
                      ? "border-maroon-300/15 bg-maroon-300/[0.06] text-maroon-200/75"
                      : color === "cyan"
                      ? "border-silver-300/15 bg-silver-300/[0.06] text-silver-200/75"
                      : "border-white/[0.08] bg-white/[0.025] text-white/40"
                  }
                `}
              >
                {model}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Floating network icon */}

      <div
        className="
          absolute
          bottom-[9%]
          right-[8%]
          flex
          h-16
          w-16
          items-center
          justify-center
          rounded-full
          border
          border-silver-300/15
          bg-silver-300/[0.06]
          shadow-[0_0_60px_rgba(34,211,238,0.14)]
          backdrop-blur-xl
          md:h-20
          md:w-20
        "
      >
        <Network
          size={23}
          className="text-silver-200"
        />
      </div>

      {/* Bottom metadata */}

      <div
        className="
          absolute
          bottom-7
          left-7
          flex
          items-center
          gap-3
          font-mono
          text-[8px]
          uppercase
          tracking-[0.22em]
          text-white/25
        "
      >
        <span>CHAT</span>
        <span className="text-white/10">/</span>
        <span>MODELS</span>
        <span className="text-white/10">/</span>
        <span>AI</span>
      </div>
    </div>
  );
}

/* ============================================================
   PROJECT CARD
============================================================ */

function ProjectCard({ project }) {
  return (
    <article
      data-project-card
      className="
        group
        relative
        overflow-hidden
        rounded-[2.2rem]
        theme-card
        border
        border-white/[0.09]
        bg-[#121113]/90
        shadow-[0_30px_100px_rgba(0,0,0,0.28)]
        transition-all
        duration-500
        hover:-translate-y-1
        hover:border-maroon-300/20
        hover:shadow-[0_40px_120px_rgba(0,0,0,0.40)]
      "
    >
      {/* Top accent */}

      <div
        className="
          absolute
          left-0
          right-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-maroon-300/40
          to-transparent
          opacity-60
        "
      />

      <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
        {/* Visual */}

        <div className="relative">
          <ProjectVisual type={project.type} />

          {/* Project number */}

          <div
            className="
              absolute
              right-6
              top-6
              z-30
              flex
              items-center
              gap-2
              rounded-full
              border
              border-white/[0.08]
              bg-black/30
              px-3
              py-1.5
              font-mono
              text-[8px]
              tracking-[0.2em]
              text-white/35
              backdrop-blur-md
            "
          >
            <span className="text-maroon-200/70">
              {project.number}
            </span>

            <span>/</span>

            <span>PROJECT</span>
          </div>
        </div>

        {/* Content */}

        <div
          className="
            flex
            flex-col
            justify-between
            p-7
            sm:p-9
            lg:p-12
          "
        >
          <div>
            {/* Category */}

            <div className="flex items-center gap-3">
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-maroon-300
                  shadow-[0_0_12px_rgba(195,199,206,0.55)]
                "
              />

              <p
                className="
                  font-mono
                  text-[9px]
                  uppercase
                  tracking-[0.22em]
                  text-maroon-200/65
                "
              >
                {project.category}
              </p>
            </div>

            {/* Title */}

            <h3
              className="
                mt-5
                font-display
                text-3xl
                font-semibold
                tracking-[-0.035em]
                text-white
                sm:text-4xl
                lg:text-[2.7rem]
              "
            >
              {project.title}
            </h3>

            {/* Divider */}

            <div
              className="
                mt-6
                h-px
                w-full
                bg-gradient-to-r
                from-white/10
                via-white/[0.04]
                to-transparent
              "
            />

            {/* Description */}

            <p
              className="
                mt-6
                max-w-xl
                text-[15px]
                leading-7
                text-white/45
                sm:text-base
                sm:leading-8
              "
            >
              {project.description}
            </p>

            {/* Stack */}

            <div className="mt-8">
              <p
                className="
                  mb-3
                  font-mono
                  text-[8px]
                  uppercase
                  tracking-[0.22em]
                  text-white/25
                "
              >
                Built with
              </p>

              <div className="flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="
                      rounded-full
                      theme-chip
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      px-3
                      py-1.5
                      font-mono
                      text-[9px]
                      text-white/50
                      transition-all
                      duration-300
                      group-hover:border-maroon-300/15
                      group-hover:text-white/70
                    "
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom CTA */}

          <div
            className="
              mt-10
              flex
              flex-wrap
              items-center
              justify-between
              gap-5
              border-t
              border-white/[0.07]
              pt-7
            "
          >
            <div className="flex items-center gap-2">
              <Layers3
                size={14}
                className="text-white/25"
              />

              <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/25">
                Full-stack project
              </span>
            </div>

            {/* Blinking button */}

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group/button
                relative
                inline-flex
                items-center
                gap-3
                overflow-hidden
                rounded-full
                border
                border-maroon-300/20
                bg-maroon-400/[0.07]
                px-5
                py-3
                text-sm
                font-medium
                text-maroon-100
                shadow-[0_0_25px_rgba(116, 27, 56,0.08)]
                transition-all
                duration-300
                hover:border-maroon-200/40
                hover:bg-maroon-400/[0.14]
                hover:shadow-[0_0_35px_rgba(116, 27, 56,0.20)]
              "
            >
              {/* Moving shine */}

              <span
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  -translate-x-full
                  bg-gradient-to-r
                  from-transparent
                  via-white/[0.10]
                  to-transparent
                  transition-transform
                  duration-700
                  group-hover/button:translate-x-full
                "
              />

              <span className="relative z-10">
                View my work
              </span>

              <ArrowUpRight
                size={15}
                className="
                  relative
                  z-10
                  transition-transform
                  duration-300
                  group-hover/button:-translate-y-0.5
                  group-hover/button:translate-x-0.5
                "
              />

              {/* Blinking dot */}

              <span
                className="
                  absolute
                  -right-1
                  -top-1
                  h-3
                  w-3
                  animate-ping
                  rounded-full
                  bg-maroon-300/40
                "
              />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

/* ============================================================
   PROJECTS SECTION
============================================================ */

export default function Projects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  /* Heading */

  useScrollReveal(headingRef, {
    y: 25,
    duration: 0.6,
  });

  /* Fast card animation */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll(
        "[data-project-card]"
      );

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 14,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.28,
            delay: index * 0.02,
            ease: "power2.out",

            scrollTrigger: {
              trigger: card,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
          }
        );
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="
        relative
        mx-auto
        max-w-7xl
        px-6
        pt-16
        pb-20
        md:px-10
        md:pt-24
        md:pb-28
      "
    >
      {/* Section heading */}

      <div
        className="
          mb-12
          flex
          flex-col
          justify-between
          gap-5
          md:mb-16
          md:flex-row
          md:items-end
        "
      >
        <div>
          <p className="section-label">
            03  /  Work
          </p>

          <h2
            ref={headingRef}
            className="
              mt-5
              max-w-3xl
              font-display
              text-4xl
              font-semibold
              leading-[1]
              tracking-[-0.045em]
              text-ink-100
              sm:text-5xl
              md:text-6xl
            "
          >
            Things I've built.
          </h2>
        </div>

        <p
          className="
            max-w-sm
            text-sm
            leading-7
            text-ink-600
            md:text-right
          "
        >
          A selection of full-stack products combining
          modern web development, AI systems and
          practical user experiences.
        </p>
      </div>

      {/* Single premium work container */}

      <div
        className="
          relative
          overflow-hidden
          rounded-[2.6rem]
          border
          border-white/[0.06]
          bg-white/[0.012]
          p-2
          shadow-[0_40px_120px_rgba(0,0,0,0.22)]
          sm:p-3
        "
      >
        {/* Container glow */}

        <div
          className="
            pointer-events-none
            absolute
            left-1/2
            top-0
            h-40
            w-[60%]
            -translate-x-1/2
            rounded-full
            bg-maroon-500/[0.06]
            blur-[100px]
          "
        />

        <div className="relative space-y-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
