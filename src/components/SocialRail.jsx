import { Github, Linkedin } from "lucide-react";
import { socials } from "../data/portfolio.js";

const ICONS = { github: Github, linkedin: Linkedin };

export default function SocialRail() {
  return (
    <div className="fixed bottom-8 left-6 z-40 hidden flex-col items-center gap-5 md:flex md:left-10">
      {socials.map((social) => {
        const Icon = ICONS[social.icon];
        return (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="text-ink-400 transition-colors duration-200 hover:text-maroon-300"
          >
            {Icon ? <Icon size={18} /> : social.label}
          </a>
        );
      })}
      <span className="h-16 w-px bg-gradient-to-b from-ink-400/50 to-transparent" aria-hidden="true" />
    </div>
  );
}

