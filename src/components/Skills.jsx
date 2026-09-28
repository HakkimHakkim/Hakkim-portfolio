import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Code2,
  Monitor,
  Server,
  Smartphone,
  Database,
  BrainCircuit,
  Workflow,
  Wrench,
  Sparkles,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const skillGroups = [
  {
    number: "01",
    category: "Programming Language",
    icon: Code2,
    accent: "violet",
    skills: ["Python", "JavaScript"],
  },
  {
    number: "02",
    category: "Frontend",
    icon: Monitor,
    accent: "cyan",
    skills: ["React.js", "Vite", "Tailwind CSS"],
  },
  {
    number: "03",
    category: "Backend",
    icon: Server,
    accent: "emerald",
    skills: [
      "FastAPI",
      "REST APIs",
      "JWT Authentication",
      "SQLAlchemy",
    ],
  },
  {
    number: "04",
    category: "Mobile",
    icon: Smartphone,
    accent: "pink",
    skills: ["Flutter"],
  },
  {
    number: "05",
    category: "Database",
    icon: Database,
    accent: "amber",
    skills: [
      "PostgreSQL",
      "MySQL",
      "SQLite",
      "SQL",
      "MongoDB",
      "Firebase",
    ],
  },
  {
    number: "06",
    category: "AI / ML",
    icon: BrainCircuit,
    accent: "purple",
    skills: [
      "ML fundamentals",
      "Generative AI",
      "LLM integration",
      "Prompt Engineering",
      "AI Agents (OpenAI)",
      "Gemini API",
      "Groq API",
    ],
  },
  {
    number: "07",
    category: "Automation",
    icon: Workflow,
    accent: "orange",
    skills: [
      "n8n",
      "Email Automation",
      "WhatsApp Automation",
      "Google Sheets Automation",
    ],
  },
  {
    number: "08",
    category: "Tools",
    icon: Wrench,
    accent: "blue",
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Swagger/OpenAPI",
      "Vercel",
      "Render",
    ],
  },
];

const accentStyles = {
  violet: {
    glow: "rgba(139,92,246,0.35)",
    border: "rgba(139,92,246,0.25)",
    text: "#c4b5fd",
  },
  cyan: {
    glow: "rgba(34,211,238,0.3)",
    border: "rgba(34,211,238,0.22)",
    text: "#67e8f9",
  },
  emerald: {
    glow: "rgba(52,211,153,0.28)",
    border: "rgba(52,211,153,0.2)",
    text: "#6ee7b7",
  },
  pink: {
    glow: "rgba(244,114,182,0.3)",
    border: "rgba(244,114,182,0.22)",
    text: "#f9a8d4",
  },
  amber: {
    glow: "rgba(251,191,36,0.28)",
    border: "rgba(251,191,36,0.2)",
    text: "#fcd34d",
  },
  purple: {
    glow: "rgba(168,85,247,0.35)",
    border: "rgba(168,85,247,0.25)",
    text: "#d8b4fe",
  },
  orange: {
    glow: "rgba(251,146,60,0.3)",
    border: "rgba(251,146,60,0.22)",
    text: "#fdba74",
  },
  blue: {
    glow: "rgba(96,165,250,0.3)",
    border: "rgba(96,165,250,0.22)",
    text: "#93c5fd",
  },
};

function SkillRobot({ accent }) {
  const robotRef = useRef(null);
  const eyeRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(robotRef.current, {
        y: -7,
        rotation: 2,
        duration: 2.4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(eyeRef.current, {
        opacity: 0.45,
        scale: 0.85,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      gsap.to(ringRef.current, {
        rotation: 360,
        duration: 8,
        repeat: -1,
        ease: "none",
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div
      className="relative h-20 w-20 shrink-0"
      style={{
        filter: `drop-shadow(0 0 18px ${accent.glow})`,
      }}
    >
      {/* Energy ring */}

      <div
        ref={ringRef}
        className="absolute inset-1 rounded-full border border-dashed opacity-60"
        style={{
          borderColor: accent.border,
        }}
      />

      {/* Robot */}

      <div
        ref={robotRef}
        className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2"
      >
        {/* Head */}

        <div
          className="absolute left-1/2 top-1 h-7 w-8 -translate-x-1/2 rounded-md border"
          style={{
            borderColor: accent.border,
            background:
              "linear-gradient(145deg,#252033,#09070f)",
          }}
        >
          {/* Eyes */}

          <div
            ref={eyeRef}
            className="absolute left-1/2 top-2 flex -translate-x-1/2 gap-1.5"
          >
            <span
              className="h-1 w-1 rounded-full"
              style={{ background: accent.text }}
            />

            <span
              className="h-1 w-1 rounded-full"
              style={{ background: accent.text }}
            />
          </div>
        </div>

        {/* Body */}

        <div
          className="absolute bottom-1 left-1/2 h-5 w-7 -translate-x-1/2 rounded-md border"
          style={{
            borderColor: accent.border,
            background:
              "linear-gradient(145deg,#181421,#07060b)",
          }}
        />

        {/* Core */}

        <div
          className="absolute bottom-[7px] left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full"
          style={{
            background: accent.text,
            boxShadow: `0 0 10px ${accent.glow}`,
          }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      /*
      ==============================================
      HEADING REVEAL
      ==============================================
      */

      gsap.fromTo(
        headingRef.current,
        {
          opacity: 0,
          y: 45,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 82%",
          },
        }
      );

      /*
      ==============================================
      SKILL CARDS
      ==============================================
      */

      const cards = cardsRef.current.querySelectorAll(
        "[data-skill-card]"
      );

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 55,
          scale: 0.96,
          rotateX: 8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 78%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  /*
  ==============================================
  MOUSE PARALLAX
  ==============================================
  */

  useEffect(() => {
    const cards = document.querySelectorAll("[data-skill-card]");

    const handleMouseMove = (event) => {
      const mouseX =
        event.clientX / window.innerWidth - 0.5;

      const mouseY =
        event.clientY / window.innerHeight - 0.5;

      pointerRef.current = {
        x: mouseX,
        y: mouseY,
      };

      cards.forEach((card, index) => {
        const strength =
          index % 2 === 0 ? 8 : 5;

        gsap.to(card, {
          x: mouseX * strength,
          y: mouseY * strength,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      });
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      { passive: true }
    );

    return () => {
      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  return (
  <section
    id="skills"
    ref={sectionRef}
    className="
      relative
      mx-auto
      max-w-7xl
      px-6
      pt-20
      pb-10
      md:px-10
      md:pt-28
      md:pb-12
    "
  >
      {/* ==========================================
          BACKGROUND ATMOSPHERE
      =========================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/3
          h-[500px]
          w-[500px]
          -translate-x-1/2
          rounded-full
          opacity-20
          blur-[120px]
        "
        style={{
          background:
            "radial-gradient(circle,#8b5cf6,transparent 70%)",
        }}
      />

      {/* ==========================================
          HEADER
      =========================================== */}

      <div
        ref={headingRef}
        className="relative z-10"
      >
        <p className="section-label">
          02 — Skills
        </p>

        <div className="mt-5 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <h2
              className="
                max-w-3xl
                font-display
                text-4xl
                font-semibold
                leading-[1.05]
                tracking-tightest
                text-ink-100
                sm:text-5xl
                md:text-6xl
              "
            >
              The stack behind
              <span className="block text-ink-500">
                the things I build.
              </span>
            </h2>

            <p className="mt-6 max-w-xl text-base leading-relaxed text-ink-500">
              A practical stack covering frontend,
              backend, databases, AI, automation and
              deployment.
            </p>
          </div>

          {/* Small AI status */}

          <div
            className="
              hidden
              items-center
              gap-3
              rounded-full
              border
              border-white/10
              bg-white/[0.025]
              px-4
              py-2
              font-mono
              text-[10px]
              uppercase
              tracking-[0.18em]
              text-ink-500
              md:flex
            "
          >
            <Sparkles
              size={13}
              className="text-violet-300"
            />

            Stack / Online
          </div>
        </div>
      </div>

      {/* ==========================================
          CARDS
      =========================================== */}

      <div
        ref={cardsRef}
        className="
          relative
          z-10
          mt-16
          grid
          grid-cols-1
          gap-5
          sm:grid-cols-2
          lg:grid-cols-2
        "
      >
        {skillGroups.map((group) => {
          const Icon = group.icon;
          const accent =
            accentStyles[group.accent];

          return (
            <article
              key={group.category}
              data-skill-card
              className="
                group
                relative
                overflow-hidden
                rounded-[1.5rem]
                border
                border-white/[0.08]
                bg-white/[0.025]
                p-6
                transition-colors
                duration-500
                hover:border-white/[0.16]
              "
              style={{
                transformStyle: "preserve-3d",
                willChange: "transform",
              }}
              onMouseEnter={(event) => {
                const card = event.currentTarget;

                gsap.to(card, {
                  rotateX: 2,
                  rotateY: -2,
                  duration: 0.35,
                  ease: "power2.out",
                });
              }}
              onMouseLeave={(event) => {
                const card = event.currentTarget;

                gsap.to(card, {
                  rotateX: 0,
                  rotateY: 0,
                  duration: 0.5,
                  ease: "power3.out",
                });
              }}
            >
              {/* Card glow */}

              <div
                className="
                  pointer-events-none
                  absolute
                  -right-20
                  -top-20
                  h-44
                  w-44
                  rounded-full
                  opacity-0
                  blur-3xl
                  transition-opacity
                  duration-500
                  group-hover:opacity-100
                "
                style={{
                  background: accent.glow,
                }}
              />

              {/* Top line */}

              <div
                className="absolute left-6 right-6 top-0 h-px opacity-70"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accent.border}, transparent)`,
                }}
              />

              <div className="relative flex items-start justify-between gap-4">
                {/* Left */}

                <div className="flex items-center gap-4">
                  <div
                    className="
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-xl
                      border
                      bg-black/20
                    "
                    style={{
                      borderColor: accent.border,
                    }}
                  >
                    <Icon
                      size={19}
                      style={{
                        color: accent.text,
                      }}
                    />
                  </div>

                  <div>
                    <p
                      className="
                        font-mono
                        text-[10px]
                        uppercase
                        tracking-[0.18em]
                      "
                      style={{
                        color: accent.text,
                      }}
                    >
                      {group.number}
                    </p>

                    <h3 className="mt-1 text-base font-medium text-ink-100">
                      {group.category}
                    </h3>
                  </div>
                </div>

                {/* Robot */}

                <SkillRobot accent={accent} />
              </div>

              {/* Divider */}

              <div className="my-5 h-px bg-white/[0.06]" />

              {/* Skills */}

              <div className="relative flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="
                      rounded-lg
                      border
                      border-white/[0.08]
                      bg-white/[0.025]
                      px-3
                      py-2
                      text-xs
                      text-ink-400
                      transition-all
                      duration-300
                      group-hover:border-white/[0.13]
                      group-hover:text-ink-200
                    "
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Bottom number */}

              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-3
                  right-5
                  font-display
                  text-6xl
                  font-semibold
                  opacity-[0.025]
                "
              >
                {group.number}
              </div>
            </article>
          );
        })}
      </div>

      {/* ==========================================
          FOOT NOTE
      =========================================== */}

      <div
        className="
          relative
          z-10
          mt-10
          flex
          items-center
          gap-3
          font-mono
          text-[10px]
          uppercase
          tracking-[0.16em]
          text-ink-600
        "
      >
        <span
          className="
            h-1.5
            w-1.5
            animate-pulse
            rounded-full
            bg-violet-400
          "
        />

        Always learning · Always building
      </div>
    </section>
  );
}