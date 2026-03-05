import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { HospitalSummary } from "@/data/healthcare-dashboard";
import type { ThemeColors } from "@/hooks/useThemeColors";
import ChartWrapper from "./ChartWrapper";

interface EDWaitTimeChartProps {
  data: HospitalSummary[];
  colors: ThemeColors;
}

export default function EDWaitTimeChart({ data, colors }: EDWaitTimeChartProps) {
  const chartData = data
    .filter((d) => d.edWaitTime !== null)
    .sort((a, b) => b.edWaitTime! - a.edWaitTime!)
    .slice(0, 10)
    .map((d) => ({
      name: d.facilityName.length > 20 ? d.facilityName.substring(0, 20) + "..." : d.facilityName,
      fullName: d.facilityName,
      value: d.edWaitTime,
      state: d.state,
    }));

  return (
    <ChartWrapper title="Top 10 Hospitals by ED Wait Time">
      <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 60, left: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
        <XAxis
          dataKey="name"
          tick={{ fill: colors.muted, fontSize: 10 }}
          stroke={colors.border}
          angle={-45}
          textAnchor="end"
          height={80}
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
          formatter={(value) => [`${value} min`, "ED Wait Time"]}
          labelFormatter={(_, payload) =>
            payload?.[0]?.payload?.fullName ?? ""
          }
        />
        <Bar dataKey="value" fill={colors.chartPrimary} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartWrapper>
  );
}
