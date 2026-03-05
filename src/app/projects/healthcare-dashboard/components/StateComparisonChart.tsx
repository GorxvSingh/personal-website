import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import type { StateAggregate } from "@/data/healthcare-dashboard";
import type { ThemeColors } from "@/hooks/useThemeColors";
import ChartWrapper from "./ChartWrapper";

interface StateComparisonChartProps {
  data: StateAggregate[];
  colors: ThemeColors;
}

export default function StateComparisonChart({ data, colors }: StateComparisonChartProps) {
  const chartData = data
    .filter((d) => d.avgEdWaitTime > 0)
    .sort((a, b) => b.avgEdWaitTime - a.avgEdWaitTime)
    .map((d) => ({
      state: d.state,
      value: Math.round(d.avgEdWaitTime),
      hospitals: d.hospitalCount,
    }));

  return (
    <ChartWrapper title="Avg ED Wait Time by State">
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
          dataKey="state"
          tick={{ fill: colors.muted, fontSize: 12 }}
          stroke={colors.border}
          width={30}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: colors.background,
            border: `1px solid ${colors.border}`,
            borderRadius: "0.5rem",
            color: colors.foreground,
            fontSize: 12,
          }}
          formatter={(value, _name, entry) => [
            `${value} min (${(entry as { payload: { hospitals: number } }).payload.hospitals} hospitals)`,
            "Avg ED Wait",
          ]}
        />
        <Bar dataKey="value" fill={colors.chartSecondary} radius={[0, 4, 4, 0]} />
      </BarChart>
    </ChartWrapper>
  );
}
