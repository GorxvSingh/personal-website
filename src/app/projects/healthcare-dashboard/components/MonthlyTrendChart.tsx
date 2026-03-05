"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";
import type { MonthlyStateMetric, NationalAverages } from "@/data/healthcare-dashboard";
import type { ThemeColors } from "@/hooks/useThemeColors";

type MetricKey = "avgEdWaitTime" | "avgTransferTime" | "avgLeftBeforeSeen";

const METRICS: { key: MetricKey; label: string; unit: string; nationalKey: keyof NationalAverages }[] = [
  { key: "avgEdWaitTime", label: "ED Wait Time", unit: "min", nationalKey: "edWaitTime" },
  { key: "avgTransferTime", label: "Transfer Time", unit: "min", nationalKey: "transferTime" },
  { key: "avgLeftBeforeSeen", label: "Left Before Seen", unit: "%", nationalKey: "leftBeforeSeen" },
];

const STATE_COLORS: Record<string, string> = {
  AZ: "#f59e0b",
  CA: "#2563eb",
  FL: "#10b981",
  GA: "#ef4444",
  IL: "#8b5cf6",
  MA: "#ec4899",
  NY: "#f97316",
  OH: "#06b6d4",
  PA: "#84cc16",
  TX: "#6366f1",
};

interface MonthlyTrendChartProps {
  data: MonthlyStateMetric[];
  nationalAverages: NationalAverages;
  months: string[];
  selectedState: string;
  colors: ThemeColors;
}

export default function MonthlyTrendChart({
  data,
  nationalAverages,
  months,
  selectedState,
  colors,
}: MonthlyTrendChartProps) {
  const [metric, setMetric] = useState<MetricKey>("avgEdWaitTime");

  const activeMetric = METRICS.find((m) => m.key === metric)!;
  const nationalValue = nationalAverages[activeMetric.nationalKey];

  const states = selectedState
    ? [selectedState]
    : [...new Set(data.map((d) => d.state))].sort();

  const chartData = months.map((month) => {
    const entry: Record<string, string | number> = { month };
    for (const state of states) {
      const row = data.find((d) => d.month === month && d.state === state);
      if (row) entry[state] = row[metric];
    }
    return entry;
  });

  return (
    <div className="rounded-lg border border-border bg-hover p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xs font-medium uppercase tracking-widest text-muted">
          Monthly Trend
        </h3>
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value as MetricKey)}
          className="rounded-lg border border-border bg-background px-3 py-1.5 text-xs text-foreground"
        >
          {METRICS.map((m) => (
            <option key={m.key} value={m.key}>
              {m.label}
            </option>
          ))}
        </select>
      </div>
      <ResponsiveContainer width="100%" height={380}>
        <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
          <XAxis
            dataKey="month"
            tick={{ fill: colors.muted, fontSize: 12 }}
            stroke={colors.border}
          />
          <YAxis
            tick={{ fill: colors.muted, fontSize: 12 }}
            stroke={colors.border}
            label={{
              value: activeMetric.unit === "%" ? "Percent" : "Minutes",
              angle: -90,
              position: "insideLeft",
              fill: colors.muted,
              fontSize: 12,
            }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: colors.background,
              border: `1px solid ${colors.border}`,
              borderRadius: "0.5rem",
              color: colors.foreground,
              fontSize: 12,
            }}
            formatter={(value) => `${value} ${activeMetric.unit}`}
          />
          <Legend wrapperStyle={{ fontSize: 11, color: colors.muted }} />

          <ReferenceLine
            y={nationalValue}
            stroke="#ef4444"
            strokeDasharray="8 4"
            strokeWidth={2}
            label={{
              value: `US Avg: ${nationalValue}${activeMetric.unit === "%" ? "%" : " min"}`,
              position: "right",
              fill: "#ef4444",
              fontSize: 11,
            }}
          />

          {states.map((state) => (
            <Line
              key={state}
              type="monotone"
              dataKey={state}
              name={state}
              stroke={STATE_COLORS[state] ?? colors.chartPrimary}
              strokeWidth={selectedState ? 3 : 2}
              dot={{ r: selectedState ? 4 : 2 }}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
