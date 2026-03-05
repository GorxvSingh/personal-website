import type { Metadata } from "next";
import ReportClient from "./ReportClient";

export const metadata: Metadata = {
  title: "AI-Powered Report Generator | Gorav Saluja",
  description:
    "An agentic tool that turns raw operational data into narrative reports with trend analysis and recommendations.",
};

export default function ReportGeneratorPage() {
  return <ReportClient />;
}
