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
      name: d.facilityName.length > 22 ? d.facilityName.substring(0, 22) + "..." : d.facilityName,
      fullName: d.facilityName,
      value: d.edWaitTime,
      state: d.state,
    }));

  return (
    <ChartWrapper title="Top 10 Hospitals by ED Wait Time" height={400}>
      <BarChart data={chartData} layout="vertical" margin={{ top: 5, right: 20, bottom: 5, left: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
        <XAxis
          type="number"
          tick={{ fill: colors.muted, fontSize: 12 }}
          stroke={colors.border}
          label={{
            value: "Minutes",
            position: "insideBottom",
            offset: -2,
            fill: colors.muted,
            fontSize: 12,
          }}
        />
        <YAxis
          type="category"
          dataKey="name"
          tick={{ fill: colors.muted, fontSize: 10 }}
          stroke={colors.border}
          width={150}
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
        <Bar dataKey="value" fill={colors.chartPrimary} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ChartWrapper>
  );
}
