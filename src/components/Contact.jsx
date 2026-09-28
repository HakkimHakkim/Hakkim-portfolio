import { Suspense, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Phone,
} from "lucide-react";

import Particles from "./3d/Particles.jsx";

import { profile } from "../data/portfolio.js";
import { useDeviceCapability } from "../hooks/useDeviceCapability.js";
import { useScrollReveal } from "../hooks/useScrollReveal.js";



/* ============================================================
   CONTACT BACKDROP
============================================================ */

function ContactBackdrop() {
  const {
    isMobile,
    prefersReducedMotion,
  } = useDeviceCapability();

  if (prefersReducedMotion) return null;

  return (
    <Canvas
      dpr={[1, isMobile ? 1.25 : 1.5]}
      camera={{
        position: [0, 0, 5],
        fov: 45,
      }}
      gl={{
        antialias: false,
        alpha: true,
        powerPreference: "high-performance",
      }}
      style={{
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <Particles
          count={isMobile ? 15 : 35}
        />
      </Suspense>
    </Canvas>
  );
}


/* ============================================================
   CONTACT
============================================================ */

export default function Contact() {
  const contentRef = useRef(null);

  useScrollReveal(contentRef, {
    y: 28,
    duration: 0.8,
    start: "top 80%",
  });


  return (
    <section
      id="contact"
      className="
        relative
        overflow-hidden
        px-6
        py-24
        md:px-10
        md:py-36
      "
    >

      {/* ======================================================
          BACKGROUND PARTICLES
      ====================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-50
        "
      >
        <ContactBackdrop />
      </div>


      {/* ======================================================
          AMBIENT GLOW
      ====================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[520px]
          w-[520px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-violet-500/[0.08]
          blur-[130px]
        "
      />


      {/* ======================================================
          MAIN CONTENT
      ====================================================== */}

      <div
        ref={contentRef}
        className="
          relative
          mx-auto
          max-w-6xl
        "
      >

        {/* ====================================================
            TOP LABEL
        ==================================================== */}

        <div
          className="
            flex
            items-center
            justify-between
            border-b
            border-white/[0.07]
            pb-5
          "
        >

          <p className="section-label">
            05 — Contact
          </p>

          <span
            className="
              hidden
              font-mono
              text-[9px]
              uppercase
              tracking-[0.22em]
              text-white/30
              sm:block
            "
          >
            Available for opportunities
          </span>

        </div>


        {/* ====================================================
            MAIN GRID
        ==================================================== */}

        <div
          className="
            mt-12
            grid
            gap-10
            lg:grid-cols-[1.15fr_0.85fr]
            lg:items-end
          "
        >

          {/* ==================================================
              LEFT
          ================================================== */}

          <div>

            <p
              className="
                font-mono
                text-[10px]
                uppercase
                tracking-[0.24em]
                text-violet-300/80
              "
            >
              Let’s connect
            </p>


            <h2
              className="
                mt-5
                max-w-4xl
                font-display
                text-5xl
                font-semibold
                leading-[0.94]
                tracking-tightest
                text-ink-100
                sm:text-6xl
                md:text-7xl
                lg:text-[5.8rem]
              "
            >
              Let's build
              <br />

              <span className="text-white/35">
                something great.
              </span>
            </h2>


            <p
              className="
                mt-7
                max-w-lg
                text-sm
                leading-7
                text-ink-400
                sm:text-base
              "
            >
              I'm open to opportunities, collaborations,
              and conversations about building thoughtful
              software with modern technology.
            </p>

          </div>


          {/* ==================================================
              RIGHT CONTACT CARD
          ================================================== */}

          <div
            className="
              relative
              overflow-hidden
              rounded-[2rem]
              border
              border-white/[0.08]
              bg-white/[0.025]
              p-5
              backdrop-blur-sm
              sm:p-6
            "
          >

            {/* Card glow */}

            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-40
                w-40
                rounded-full
                bg-violet-500/[0.10]
                blur-[70px]
              "
            />


            {/* Card header */}

            <div
              className="
                relative
                flex
                items-center
                justify-between
                border-b
                border-white/[0.07]
                pb-5
              "
            >

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
                  Contact
                </p>

                <p
                  className="
                    mt-1
                    text-sm
                    font-medium
                    text-white/80
                  "
                >
                  Start a conversation
                </p>

              </div>


              <div
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-violet-300/15
                  bg-violet-400/[0.08]
                  text-violet-200
                "
              >
                <Mail size={15} />
              </div>

            </div>


            {/* =================================================
                EMAIL
            ================================================= */}

            <a
              href={`mailto:${profile.email}`}
              className="
                group
                relative
                mt-5
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-white/[0.07]
                bg-black/10
                p-4
                transition-all
                duration-300
                hover:border-violet-300/25
                hover:bg-violet-400/[0.05]
              "
            >

              <div className="min-w-0">

                <p
                  className="
                    font-mono
                    text-[9px]
                    uppercase
                    tracking-[0.18em]
                    text-white/30
                  "
                >
                  Email
                </p>

                <p
                  className="
                    mt-1
                    truncate
                    text-sm
                    text-white/75
                  "
                >
                  {profile.email}
                </p>

              </div>


              <ArrowUpRight
                size={16}
                className="
                  ml-4
                  shrink-0
                  text-white/30
                  transition-all
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                  group-hover:text-violet-200
                "
              />

            </a>
          {/* =================================================
    PHONE
================================================= */}

<a
  href="tel:+917639289099"
  className="
    group
    relative
    mt-3
    flex
    items-center
    justify-between
    rounded-2xl
    border
    border-white/[0.07]
    bg-black/10
    p-4
    transition-all
    duration-300
    hover:border-violet-300/25
    hover:bg-violet-400/[0.05]
  "
>
  <div className="min-w-0">
    <p
      className="
        font-mono
        text-[9px]
        uppercase
        tracking-[0.18em]
        text-white/30
      "
    >
      Phone
    </p>

    <p className="mt-1 text-sm font-medium text-white/75">
      7639289099
    </p>
  </div>

  <Phone
    size={16}
    className="
      ml-4
      shrink-0
      text-white/30
      transition-colors
      duration-300
      group-hover:text-violet-200
    "
  />

</a>

            {/* =================================================
                SOCIAL LINKS
            ================================================= */}

            <div
              className="
                mt-3
                grid
                grid-cols-2
                gap-3
              "
            >

              {/* LinkedIn */}

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-black/10
                  p-4
                  transition-all
                  duration-300
                  hover:border-violet-300/25
                  hover:bg-violet-400/[0.05]
                "
              >

                <Linkedin
                  size={17}
                  className="
                    text-white/45
                    transition-colors
                    duration-300
                    group-hover:text-violet-200
                  "
                />

                <ArrowUpRight
                  size={14}
                  className="
                    text-white/20
                    transition-all
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-white/60
                  "
                />

              </a>


              {/* GitHub */}

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="
                  group
                  flex
                  items-center
                  justify-between
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-black/10
                  p-4
                  transition-all
                  duration-300
                  hover:border-violet-300/25
                  hover:bg-violet-400/[0.05]
                "
              >

                <Github
                  size={17}
                  className="
                    text-white/45
                    transition-colors
                    duration-300
                    group-hover:text-violet-200
                  "
                />

                <ArrowUpRight
                  size={14}
                  className="
                    text-white/20
                    transition-all
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                    group-hover:text-white/60
                  "
                />

              </a>

            </div>


            {/* =================================================
                PRIMARY CTA
            ================================================= */}

            <a
  href="https://mail.google.com/mail/?view=cm&fs=1&to=hakkimnajir@gmail.com"
  target="_blank"
  rel="noreferrer"
  className="
  mt-8
  inline-flex
  items-center
  gap-2
  rounded-full
  bg-violet-500
  px-7
  py-3.5
  font-medium
  text-void
  transition-all
  duration-300
  hover:-translate-y-1
  hover:bg-violet-300
"
>

              <Mail size={20} />

              Get in touch

              <ArrowUpRight
                size={15}
                className="
                  transition-transform
                  duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />

            </a>

          </div>

        </div>


        {/* ====================================================
            BOTTOM LINE
        ==================================================== */}

        <div
          className="
            mt-14
            flex
            flex-col
            gap-3
            border-t
            border-white/[0.07]
            pt-5
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <p
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-white/25
            "
          >
            Built with React • FastAPI • AI
          </p>


          <p
            className="
              font-mono
              text-[9px]
              uppercase
              tracking-[0.18em]
              text-white/25
            "
          >
            © {new Date().getFullYear()} Hakkim
          </p>

        </div>

      </div>

    </section>
  );
}