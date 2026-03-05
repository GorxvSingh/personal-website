import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import type { StateAggregate } from "@/data/healthcare-dashboard";
import type { ThemeColors } from "@/hooks/useThemeColors";
import ChartWrapper from "./ChartWrapper";

interface VolumeDistributionChartProps {
  data: StateAggregate[];
  colors: ThemeColors;
}

export default function VolumeDistributionChart({ data, colors }: VolumeDistributionChartProps) {
  const chartData = data
    .filter((d) => d.avgEdWaitTime > 0 && d.avgTransferTime > 0)
    .sort((a, b) => a.state.localeCompare(b.state))
    .map((d) => ({
      state: d.state,
      edWait: Math.round(d.avgEdWaitTime),
      transferTime: Math.round(d.avgTransferTime),
    }));

  return (
    <ChartWrapper title="ED Wait vs Transfer Time by State" height={300}>
      <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke={colors.border} />
        <XAxis
          dataKey="state"
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
        <Legend
          wrapperStyle={{ fontSize: 12, color: colors.muted }}
        />
        <Bar dataKey="edWait" name="ED Wait" fill={colors.chartPrimary} radius={[4, 4, 0, 0]} />
        <Bar dataKey="transferTime" name="Transfer Time" fill={colors.chartTertiary} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ChartWrapper>
  );
}
