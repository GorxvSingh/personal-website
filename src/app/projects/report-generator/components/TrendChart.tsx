"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { TrendDataPoint } from "@/data/report-generator";
import type { ThemeColors } from "@/hooks/useThemeColors";

interface TrendChartProps {
  data: TrendDataPoint[];
  colors: ThemeColors;
}

export default function TrendChart({ data, colors }: TrendChartProps) {
  return (
    <div className="mt-4">
      <ResponsiveContainer width="100%" height={260}>
        <LineChart data={data} margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
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
              value: "Minutes",
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
            formatter={(value) => `${value} min`}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: colors.muted }} />
          <Line
            type="monotone"
            dataKey="metroGeneral"
            name="Metro General"
            stroke={colors.chartPrimary}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="valleyCommunity"
            name="Valley Community"
            stroke={colors.chartTertiary}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="desertSprings"
            name="Desert Springs"
            stroke={colors.chartSecondary}
            strokeWidth={2}
            dot={{ r: 3 }}
          />
          <Line
            type="monotone"
            dataKey="copperCanyon"
            name="Copper Canyon"
            stroke="#f59e0b"
            strokeWidth={2}
            dot={{ r: 3 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
