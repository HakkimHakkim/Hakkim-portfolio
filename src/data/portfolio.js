// ─────────────────────────────────────────────────────────────
// EDIT ME: this file holds every piece of personal content on the
// site. Update the values below — you shouldn't need to touch any
// component to change text, links or projects.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Hakkim",
  fullGreeting: "Hello! I'm",
  role: "Full Stack Developer",
  tagline: "AI & Modern Web Technology Enthusiast",
  education: "B.Tech in Artificial Intelligence and Data Science",
  location: "Tamil Nadu, India",
  // TODO: replace with your real email before going live
  email: "hakkimnajir@gmail.com",
  phone: "7639289099",
  resumeUrl: "/Hakkim-Resume.pdf", // TODO: drop your resume PDF into /public and update if the filename differs
  github: "https://github.com/HakkimHakkim",
  linkedin: "https://linkedin.com/in/hakkim-najir-953a44308",
};

export const nav = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export const socials = [
  { label: "GitHub", href: profile.github, icon: "github" },
  { label: "LinkedIn", href: profile.linkedin, icon: "linkedin" },
];

export const voiceIntro = {
  script:
    "Hi, I'm Hakkim. I'm a Full Stack Developer with a passion for AI and modern web technologies. I build interactive, intelligent, and user-focused digital experiences.",
  // Optional: put a pre-recorded voice file at /public/audio/intro.mp3 and set the path here
  // to use it instead of the browser's built-in speech synthesis.
  audioSrc: null,
};

export const about = {
  kicker: "Building digital experiences.",
  body: "I'm Hakkim, an aspiring Full Stack Developer focused on building modern web applications and exploring AI-powered technologies. I care about interfaces that feel considered — fast, legible, and built on code that holds up.",
  details: [
    { label: "Based in", value: profile.location },
    { label: "Studying", value: profile.education },
    { label: "Focused on", value: "Full stack web apps, applied AI" },
  ],
};

export const skills = {
  Frontend: ["HTML", "CSS", "JavaScript", "React", "Tailwind CSS"],
  Backend: ["Python", "FastAPI"],
  Database: ["PostgreSQL", "SQL", "MongoDB"],
  Other: ["Git", "GitHub", "REST APIs", "Postman", "Flutter"],
};

export const projects = [
  {
    id: "ai-nexus",
    title: "AI Nexus",
    description:
      "An AI-powered multi-model application that lets users interact with several AI models from a single interface, backed by authentication and persistent storage.",
    stack: ["React", "FastAPI", "AI Model Integration", "Auth", "Database"],
    // TODO: add your repo / live links
    github: "https://github.com/HakkimHakkim",
    demo: null,
  },
  {
    id: "ai-career-mentor",
    title: "AI Career Mentor",
    description:
      "An AI-powered career guidance platform with career prediction, an AI tutor, and resume and interview preparation tools.",
    stack: [
      "React",
      "Vite",
      "Tailwind CSS",
      "FastAPI",
      "PostgreSQL",
      "JWT Auth",
    ],
    github: "https://github.com/HakkimHakkim",
    demo: null,
  },
  {
    id: "flutter-project",
    title: "Flutter Project",
    description:
      "A modern Flutter application, currently in active development. Details to follow as the project matures.",
    stack: ["Flutter", "Dart"],
    github: "https://github.com/HakkimHakkim",
    demo: null,
    inProgress: true,
  },
];


export const experience = [
  {
    type: "Certificate",
    title: "Frontend Technologies",
    org: "De Mentee",
    meta: "2026",
    image: "/certificates/frontend-technologies.jpg",
  },
  {
    type: "Internship",
    title: "Web Development Internship",
    org: "Code Builders",
    meta: "2026",
    image: "/certificates/web-development-internship.jpg",
  },
  {
    type: "Certificate",
    title: "Core Proficiency Level 1",
    org: "Apex Seekers EdTech",
    meta: "2026",
    image: "/certificates/core-proficiency.jpg",
  },
  {
    type: "Certificate",
    title: "Core Proficiency Level 2",
    org: "Apex Seekers EdTech",
    meta: "2026",
    image: "/certificates/apex.jpg",
  },
  

  {
    type: "Internship",
    title: "Artificial Intelligence Internship",
    org: "Emglitz Technologies",
    meta: "2025",
    image: "/certificates/ai-internship.jpg",
  },
  {
    type: "Project",
    title: "Smart Industrial Automation",
    org: "Emglitz Technologies",
    meta: "2025",
    image: "/certificates/ai-project-completion.jpg",
  },
  {
    type: "Training",
    title: "Industrial Exposure",
    org: "Emglitz Technologies",
    meta: "2025",
    image: "/certificates/certificate.jpg",
  },
  {
    type: "Certificate of cloud infrastructure",
    title: "ORACLE cloud infrastructure",
    org: "ORACLE",
    meta: "2025",
    image: "/certificates/oracle.jpg",
  },
  {
    type: "Govty of Tamilnadu Skill Development Corporation",
    title: "Naan Mudhalvan scheme",
    org: "EBPL",
    meta: "2025",
    image: "/certificates/ebpl.jpg",
  },
  {
    
    type: "Govty of Tamilnadu Skill Development Corporation",
    title: "Naan Mudhalvan scheme",
    org: "Data Analytics",
    meta: "2025",
    image: "/certificates/dataanalysis.jpg",
  },
  {
    
    type: "Govty of Tamilnadu Skill Development Corporation",
    title: "Naan Mudhalvan scheme",
    org: "Cyber Security",
    meta: "2025",
    image: "/certificates/cybersecurity.jpg",
  },
  
];

