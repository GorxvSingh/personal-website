interface KPICardProps {
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
}

export default function KPICard({ label, value, unit, description }: KPICardProps) {
  return (
    <div className="rounded-lg border border-border bg-hover px-4 py-4">
      <p className="text-xs font-medium uppercase tracking-wider text-muted">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold text-foreground">
        {value}
        {unit && <span className="ml-1 text-sm font-normal text-muted">{unit}</span>}
      </p>
      {description && (
        <p className="mt-1 text-xs text-muted">{description}</p>
      )}
    </div>
  );
}
