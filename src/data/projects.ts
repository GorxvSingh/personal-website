export interface Project {
  title: string;
  description: string;
  url?: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    title: "Healthcare Operations Dashboard",
    description:
      "An interactive dashboard tracking ED wait times, transfer times, left-before-seen rates, and CT timeliness across 55+ hospitals in 10 states. Built with real CMS data. Sortable tables, filterable charts, and KPI cards give operations leaders a single pane of glass for real-time decision-making.",
    url: "/projects/healthcare-dashboard",
    tags: ["Next.js", "Recharts", "CMS Data", "TypeScript"],
  },
  {
    title: "AI-Powered Report Generator",
    description:
      "An agentic tool that takes raw operational data and produces narrative summary reports with trend analysis, anomaly callouts, and actionable recommendations. Turns a multi-hour manual reporting process into a one-click workflow, letting analysts focus on strategy instead of formatting.",
    url: "/projects/report-generator",
    tags: ["Python", "Claude API", "Pandas", "Automation"],
  },
];
