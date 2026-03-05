export interface Project {
  title: string;
  description: string;
  url?: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: "AI or Not",
    description:
      "A Tinder-style mobile game that trains media literacy. Users swipe to guess if images are real or AI-generated, then learn why through educational overlays.",
    url: "#",
    tags: ["React Native", "Expo", "TypeScript"],
  },
  {
    title: "Project Two",
    description:
      "Replace this with a real project. Describe what it does, what problem it solves, and the impact it had.",
    url: "#",
    tags: ["Next.js", "Tailwind"],
  },
  {
    title: "Project Three",
    description:
      "Replace this with a real project. Describe what you built, the technologies used, and measurable outcomes.",
    url: "#",
    tags: ["Python", "FastAPI"],
  },
];
