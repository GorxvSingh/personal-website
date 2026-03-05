import type { FacilityProfile, MonthlyFacilityMetrics } from "@/data/report-generator";

interface InputDataPanelProps {
  facilities: FacilityProfile[];
  data: MonthlyFacilityMetrics[];
}

export default function InputDataPanel({ facilities, data }: InputDataPanelProps) {
  return (
    <div className="space-y-4">
      {/* Facility cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {facilities.map((f) => (
          <div
            key={f.name}
            className="rounded-lg border border-border bg-hover px-3 py-3"
          >
            <p className="text-sm font-medium text-foreground">{f.name}</p>
            <p className="mt-0.5 text-xs text-muted">
              {f.city}, {f.state}
            </p>
            <p className="text-xs text-muted">{f.beds} beds</p>
          </div>
        ))}
      </div>

      {/* Data table */}
      <div className="overflow-x-auto rounded-lg border border-border">
        <div className="max-h-[280px] overflow-y-auto">
          <table className="w-full text-left text-sm">
            <thead className="sticky top-0 border-b border-border bg-hover text-xs font-medium uppercase tracking-wider text-muted">
              <tr>
                <th className="px-4 py-3">Facility</th>
                <th className="px-4 py-3">Month</th>
                <th className="px-4 py-3">ED Volume</th>
                <th className="px-4 py-3">Avg Wait</th>
                <th className="px-4 py-3">LWBS</th>
                <th className="px-4 py-3">Admit Rate</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row, i) => (
                <tr
                  key={`${row.facilityName}-${row.month}`}
                  className={i % 2 === 0 ? "" : "bg-hover/50"}
                >
                  <td className="whitespace-nowrap px-4 py-2 text-foreground">
                    {row.facilityName.length > 18
                      ? row.facilityName.substring(0, 18) + "..."
                      : row.facilityName}
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-muted">
                    {row.month}
                  </td>
                  <td className="px-4 py-2 text-muted">
                    {row.edVolume.toLocaleString()}
                  </td>
                  <td className="px-4 py-2 text-muted">{row.avgWaitTime} min</td>
                  <td className="px-4 py-2 text-muted">{row.leftBeforeSeen}%</td>
                  <td className="px-4 py-2 text-muted">{row.admissionRate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
