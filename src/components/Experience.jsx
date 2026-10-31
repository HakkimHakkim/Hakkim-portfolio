
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Eye } from "lucide-react";
import { experience } from "../data/portfolio.js";
import { useScrollReveal } from "../hooks/useScrollReveal.js";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const headingRef = useRef(null);

  useScrollReveal(headingRef);

  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;

    if (!section || !list) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    const items = Array.from(list.children);

    if (!items.length) return;

    const ctx = gsap.context(() => {
      gsap.set(items, {
        opacity: 0,
        y: 20,
      });

      gsap.to(items, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out",
        scrollTrigger: {
          trigger: list,
          start: "top 82%",
          once: true,
        },
      });
    }, section);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certifications"
      className="relative mx-auto max-w-7xl px-6 py-28 md:px-10 md:py-40"
    >
      <p className="section-label">04  /  Certifications</p>

      <h2
        ref={headingRef}
        className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-tight tracking-tightest text-ink-100 sm:text-5xl"
      >
        Certifications &amp; credentials.
      </h2>

      <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-400 sm:text-lg">
        A collection of certifications, internships and training credentials
        earned throughout my learning journey.
      </p>

      <div
        ref={listRef}
        className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {experience.map((item) => (
          <article
            key={item.title}
            className="theme-card group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition-all duration-500 hover:-translate-y-2 hover:border-maroon-300/30 hover:bg-white/[0.045]"
          >
            {/* Certificate preview */}
            <div className="relative aspect-[1.414/1] overflow-hidden bg-black/30">
              <img
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              {/* Dark hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/45">
                <a
                  href={item.image}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex translate-y-3 items-center gap-2 rounded-full bg-maroon-500 px-5 py-3 text-sm font-semibold text-silver-100 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                >
                  <Eye size={17} />
                  View Certificate
                </a>
              </div>
            </div>

            {/* Certificate information */}
            <div className="p-6">
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-maroon-300">
                {item.type}
              </span>

              <h3 className="mt-3 font-display text-xl font-medium leading-tight text-ink-100">
                {item.title}
              </h3>

              <div className="mt-3 flex items-center justify-between gap-4">
                <p className="text-sm text-ink-400">
                  {item.org}
                </p>

                <span className="shrink-0 font-mono text-xs text-ink-600">
                  {item.meta}
                </span>
              </div>

              <a
                href={item.image}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-ink-300 transition-colors duration-300 hover:text-maroon-300"
              >
                <Eye size={15} />
                View
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}


