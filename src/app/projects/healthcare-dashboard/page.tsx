import type { Metadata } from "next";
import DashboardClient from "./DashboardClient";

export const metadata: Metadata = {
  title: "Healthcare Operations Dashboard | Gorav Saluja",
  description:
    "Interactive ED throughput dashboard built with real CMS hospital data.",
};

export default function HealthcareDashboardPage() {
  return <DashboardClient />;
}
