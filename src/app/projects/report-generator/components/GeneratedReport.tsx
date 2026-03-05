"use client";

import { useState, useEffect, useRef } from "react";
import type { ReportSection, TrendDataPoint } from "@/data/report-generator";
import type { ThemeColors } from "@/hooks/useThemeColors";
import TrendChart from "./TrendChart";

interface GeneratedReportProps {
  sections: ReportSection[];
  visibleSections: number;
  trendData: TrendDataPoint[];
  colors: ThemeColors;
}

function TypedText({ text, onComplete }: { text: string; onComplete?: () => void }) {
  const words = text.split(" ");
  const [count, setCount] = useState(0);
  const completeRef = useRef(false);

  useEffect(() => {
    if (count >= words.length) {
      if (!completeRef.current) {
        completeRef.current = true;
        onComplete?.();
      }
      return;
    }
    const id = setTimeout(() => setCount((c) => Math.min(c + 4, words.length)), 35);
    return () => clearTimeout(id);
  }, [count, words.length, onComplete]);

  const visible = words.slice(0, count).join(" ");
  const done = count >= words.length;

  return (
    <span>
      {visible}
      {!done && <span className="animate-pulse">|</span>}
    </span>
  );
}

function SectionCard({
  section,
  trendData,
  colors,
}: {
  section: ReportSection;
  trendData: TrendDataPoint[];
  colors: ThemeColors;
}) {
  const [textDone, setTextDone] = useState(false);

  if (section.type === "text") {
    return (
      <div className="rounded-lg border border-border bg-hover p-6">
        <h3 className="mb-3 text-sm font-semibold text-foreground">{section.title}</h3>
        <p className="text-sm leading-relaxed text-muted">
          <TypedText text={section.content} />
        </p>
      </div>
    );
  }

  if (section.type === "list") {
    const lines = section.content.split("\n");
    return (
      <div className="rounded-lg border border-border bg-hover p-6">
        <h3 className="mb-3 text-sm font-semibold text-foreground">{section.title}</h3>
        <ul className="space-y-1.5 text-sm leading-relaxed text-muted">
          {lines.map((line, i) => (
            <li key={i} className="flex gap-2">
              <span className="shrink-0 text-muted/60">
                {line.match(/^\d+\./) ? line.match(/^\d+\./)?.[0] : "\u2022"}
              </span>
              <span>{line.replace(/^\d+\.\s*/, "")}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (section.type === "chart") {
    return (
      <div className="rounded-lg border border-border bg-hover p-6">
        <h3 className="mb-3 text-sm font-semibold text-foreground">{section.title}</h3>
        <p className="text-sm leading-relaxed text-muted">
          <TypedText text={section.content} onComplete={() => setTextDone(true)} />
        </p>
        {textDone && <TrendChart data={trendData} colors={colors} />}
      </div>
    );
  }

  if (section.type === "callout") {
    const blocks = section.content.split("\n\n");
    return (
      <div className="rounded-lg border border-border bg-hover p-6">
        <h3 className="mb-3 text-sm font-semibold text-foreground">{section.title}</h3>
        <div className="space-y-4">
          {blocks.map((block, i) => {
            const lines = block.split("\n");
            const heading = lines[0];
            const body = lines.slice(1).join(" ");
            const isCritical = heading.startsWith("CRITICAL");
            return (
              <div
                key={i}
                className={`border-l-4 pl-4 ${isCritical ? "border-red-500" : "border-amber-500"}`}
              >
                <p className="text-xs font-semibold uppercase tracking-wider text-foreground">
                  {heading}
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">
                  <TypedText text={body} />
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
}

export default function GeneratedReport({
  sections,
  visibleSections,
  trendData,
  colors,
}: GeneratedReportProps) {
  return (
    <div className="flex flex-col gap-6">
      {sections.slice(0, visibleSections).map((section, i) => (
        <div
          key={section.id}
          style={{
            animation: "fade-in 0.5s ease-out both",
          }}
        >
          <SectionCard
            section={section}
            trendData={trendData}
            colors={colors}
          />
        </div>
      ))}
    </div>
  );
}
