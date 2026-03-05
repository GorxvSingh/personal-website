import type { HospitalSummary } from "@/data/healthcare-dashboard";
import KPICard from "./KPICard";

interface KPISummaryProps {
  data: HospitalSummary[];
}

export default function KPISummary({ data }: KPISummaryProps) {
  const withWait = data.filter((d) => d.edWaitTime !== null);
  const withTransfer = data.filter((d) => d.transferWaitTime !== null);
  const withLbs = data.filter((d) => d.leftBeforeSeen !== null);
  const withCt = data.filter((d) => d.ctResultsTimely !== null);

  const avgWait =
    withWait.length > 0
      ? Math.round(withWait.reduce((s, d) => s + d.edWaitTime!, 0) / withWait.length)
      : "N/A";

  const avgTransfer =
    withTransfer.length > 0
      ? Math.round(
          withTransfer.reduce((s, d) => s + d.transferWaitTime!, 0) / withTransfer.length
        )
      : "N/A";

  const avgLbs =
    withLbs.length > 0
      ? (withLbs.reduce((s, d) => s + d.leftBeforeSeen!, 0) / withLbs.length).toFixed(1)
      : "N/A";

  const avgCt =
    withCt.length > 0
      ? (withCt.reduce((s, d) => s + d.ctResultsTimely!, 0) / withCt.length).toFixed(1)
      : "N/A";

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <KPICard label="Avg ED Wait Time" value={avgWait} unit="min" />
      <KPICard label="Avg Transfer Time" value={avgTransfer} unit="min" />
      <KPICard label="Left Before Seen" value={avgLbs} unit="%" />
      <KPICard label="CT Timeliness" value={avgCt} unit="%" />
    </div>
  );
}
