
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, profile } from "../data/portfolio.js";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  /*
  ============================================================
  MOBILE MENU BODY LOCK
  ============================================================
  */

  useEffect(() => {
    document.body.style.overflow = isOpen
      ? "hidden"
      : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  /*
  ============================================================
  ESCAPE KEY
  ============================================================
  */

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [isOpen]);

  /*
  ============================================================
  NAVIGATION
  ============================================================
  */

  const handleNavClick = (event, href) => {
    event.preventDefault();

    setIsOpen(false);

    document
      .querySelector(href)
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
    <header
      className="
        site-nav
        border-b
        border-silver-300/[0.12]
        bg-[#0b0b0b]
      "
    >
      {/* ====================================================
          NAVBAR CONTAINER
      ===================================================== */}

      <div
        className="
          mx-auto
          flex
          max-w-7xl
          items-center
          justify-between
          px-5
          py-4
          sm:px-6
          sm:py-5
          md:px-10
        "
      >
        {/* ==================================================
            LOGO
        =================================================== */}

        <a
          href="#top"
          onClick={(event) =>
            handleNavClick(event, "#top")
          }
          className="
            relative
            z-50
            font-display
            text-base
            font-semibold
            tracking-tight
            text-ink-100
            transition-opacity
            duration-200
            hover:opacity-80
            sm:text-lg
          "
          aria-label={`${profile.name} - Home`}
        >
          {profile.name.toUpperCase()}
        </a>

        {/* ==================================================
            DESKTOP NAVIGATION
        =================================================== */}

        <nav
          className="
            hidden
            items-center
            gap-10
            md:flex
          "
          aria-label="Primary navigation"
        >
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) =>
                handleNavClick(event, item.href)
              }
              className="
                group
                relative
                text-sm
                font-medium
                text-ink-400
                transition-colors
                duration-200
                hover:text-ink-100
                focus:outline-none
                focus:text-ink-100
              "
            >
              {item.label}

              {/* Hover underline */}

              <span
                aria-hidden="true"
                className="
                  absolute
                  -bottom-1
                  left-0
                  h-px
                  w-0
                  bg-maroon-300
                  transition-all
                  duration-300
                  group-hover:w-full
                "
              />
            </a>
          ))}
        </nav>

        <a href="#contact" onClick={(event) => handleNavClick(event, "#contact")} className="hidden rounded-sm bg-maroon-500 px-4 py-2.5 text-[11px] font-semibold text-white transition-colors hover:bg-maroon-400 md:inline-flex">
          Let’s talk
        </a>

        {/* ==================================================
            MOBILE MENU BUTTON
        =================================================== */}

        <button
          type="button"
          className="
            relative
            z-50
            inline-flex
            min-h-10
            min-w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/[0.08]
            bg-white/[0.025]
            text-ink-100
            transition-all
            duration-200
            hover:border-white/20
            hover:bg-white/[0.05]
            focus:outline-none
            focus:ring-2
            focus:ring-maroon-300/40
            md:hidden
          "
          onClick={() =>
            setIsOpen((value) => !value)
          }
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={
            isOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
        >
          {isOpen ? (
            <X
              size={21}
              aria-hidden="true"
            />
          ) : (
            <Menu
              size={21}
              aria-hidden="true"
            />
          )}
        </button>
      </div>

      {/* ====================================================
          MOBILE NAVIGATION
      ===================================================== */}

      {isOpen && (
        <div
          id="mobile-navigation"
          className="
            fixed
            inset-x-0
            bottom-0
            top-[65px]
            z-40
            overflow-y-auto
            bg-void/[0.98]
            px-5
            pb-10
            pt-6
            backdrop-blur-xl
            md:hidden
          "
        >
          <nav
            className="
              mx-auto
              flex
              max-w-md
              flex-col
            "
            aria-label="Mobile navigation"
          >
            {nav.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) =>
                  handleNavClick(
                    event,
                    item.href
                  )
                }
                className="
                  border-b
                  border-white/[0.06]
                  py-5
                  font-display
                  text-[1.65rem]
                  font-medium
                  tracking-tight
                  text-ink-100
                  transition-all
                  duration-200
                  hover:pl-2
                  hover:text-maroon-200
                  focus:outline-none
                  focus:text-maroon-200
                "
              >
                <span className="mr-3 text-xs font-mono text-white/20">
                  0{index + 1}
                </span>

                {item.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

