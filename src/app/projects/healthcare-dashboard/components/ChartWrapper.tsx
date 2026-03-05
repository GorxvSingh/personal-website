import { ResponsiveContainer } from "recharts";

interface ChartWrapperProps {
  title: string;
  children: React.ReactNode;
  height?: number;
}

export default function ChartWrapper({ title, children, height = 350 }: ChartWrapperProps) {
  return (
    <div className="rounded-lg border border-border bg-hover p-6">
      <h3 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted">
        {title}
      </h3>
      <ResponsiveContainer width="100%" height={height}>
        {children as React.ReactElement}
      </ResponsiveContainer>
    </div>
  );
}
