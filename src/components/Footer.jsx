import { Github, Linkedin } from "lucide-react";
import { profile } from "../data/portfolio.js";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 px-6 py-10 md:px-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-5 sm:flex-row sm:justify-between">
        <div className="text-center sm:text-left">
          <p className="font-display text-lg font-semibold text-ink-100">
            {profile.name.toUpperCase()}
          </p>
          <p className="mt-1 text-sm text-ink-600">
            Full Stack Developer  |  AI
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-ink-400 transition-colors hover:text-maroon-300"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-ink-400 transition-colors hover:text-maroon-300"
          >
            <Linkedin size={18} />
          </a>
        </div>

        <p className="text-sm text-ink-600">
          Copyright (c) {year} {profile.name}
        </p>
      </div>
    </footer>
  );
}

