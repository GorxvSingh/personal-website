"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import {
  getFacilityProfiles,
  getMonthlyMetrics,
  getTrendChartData,
  getGenerationSteps,
  getReportSections,
} from "@/data/report-generator";
import { useThemeColors } from "@/hooks/useThemeColors";
import ThemeToggle from "@/components/ThemeToggle";
import InputDataPanel from "./components/InputDataPanel";
import GeneratedReport from "./components/GeneratedReport";

const facilityProfiles = getFacilityProfiles();
const monthlyMetrics = getMonthlyMetrics();
const trendChartData = getTrendChartData();
const steps = getGenerationSteps();
const reportSections = getReportSections();

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default function ReportClient() {
  const [generationState, setGenerationState] = useState<
    "idle" | "generating" | "complete"
  >("idle");
  const [currentStep, setCurrentStep] = useState(0);
  const [visibleSections, setVisibleSections] = useState(0);
  const cancelRef = useRef(false);
  const colors = useThemeColors();

  const handleGenerate = useCallback(async () => {
    cancelRef.current = false;
    setGenerationState("generating");
    setCurrentStep(0);
    setVisibleSections(0);

    // Phase 1: progress steps
    for (let i = 0; i < steps.length; i++) {
      if (cancelRef.current) return;
      setCurrentStep(i);
      await delay(steps[i].duration);
    }

    if (cancelRef.current) return;

    // Phase 2: reveal report sections
    setGenerationState("complete");
    for (let i = 0; i < reportSections.length; i++) {
      if (cancelRef.current) return;
      await delay(400);
      setVisibleSections(i + 1);
    }
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
      {/* Header */}
      <header className="mb-12">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="font-[family-name:var(--font-signature)] text-2xl text-foreground"
          >
            Gorav Saluja
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      {/* Title */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          AI-Powered Report Generator
        </h1>
        <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
          An agentic tool that takes raw ED operational data and produces
          narrative summary reports with trend analysis, anomaly callouts, and
          actionable recommendations.
        </p>
      </div>

      {/* Sample Input Data */}
      <section className="mb-8">
        <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted">
          Sample Input Data
        </h2>
        <InputDataPanel facilities={facilityProfiles} data={monthlyMetrics} />
      </section>

      {/* Generate Button + Progress */}
      <section className="mb-8 flex items-center gap-4">
        <button
          onClick={handleGenerate}
          disabled={generationState === "generating"}
          className="rounded-lg border border-foreground bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-opacity hover:opacity-80 disabled:opacity-50"
        >
          {generationState === "idle"
            ? "Generate Report"
            : generationState === "generating"
              ? "Generating..."
              : "Regenerate Report"}
        </button>

        {generationState === "generating" && (
          <div className="flex items-center gap-2">
            <svg
              className="h-4 w-4 animate-spin text-muted"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span className="text-sm text-muted">
              {steps[currentStep]?.label}
            </span>
          </div>
        )}
      </section>

      {/* Generated Report */}
      {generationState === "complete" && (
        <section className="mb-12">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted">
            Generated Report
          </h2>
          <GeneratedReport
            sections={reportSections}
            visibleSections={visibleSections}
            trendData={trendChartData}
            colors={colors}
          />
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-border pt-8">
        <p className="text-sm text-muted">
          Simulated report generation with pre-analyzed healthcare data.{" "}
          <Link href="/" className="underline">
            &larr; Back to home
          </Link>
        </p>
      </footer>
    </div>
  );
}
