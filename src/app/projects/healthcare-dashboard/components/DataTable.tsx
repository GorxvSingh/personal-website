"use client";

import { useState } from "react";
import type { HospitalSummary } from "@/data/healthcare-dashboard";

interface DataTableProps {
  data: HospitalSummary[];
}

type SortKey = "facilityName" | "state" | "edWaitTime" | "transferWaitTime" | "leftBeforeSeen" | "ctResultsTimely";

function SortArrow({ active, asc }: { active: boolean; asc: boolean }) {
  if (!active) return <span className="ml-1 text-muted/40">&#8597;</span>;
  return <span className="ml-1">{asc ? "&#8593;" : "&#8595;"}</span>;
}

export default function DataTable({ data }: DataTableProps) {
  const [sortKey, setSortKey] = useState<SortKey>("edWaitTime");
  const [asc, setAsc] = useState(false);

  function handleSort(key: SortKey) {
    if (key === sortKey) {
      setAsc(!asc);
    } else {
      setSortKey(key);
      setAsc(false);
    }
  }

  const sorted = [...data].sort((a, b) => {
    const av = a[sortKey];
    const bv = b[sortKey];
    if (av === null && bv === null) return 0;
    if (av === null) return 1;
    if (bv === null) return -1;
    if (typeof av === "string" && typeof bv === "string") {
      return asc ? av.localeCompare(bv) : bv.localeCompare(av);
    }
    return asc ? (av as number) - (bv as number) : (bv as number) - (av as number);
  });

  const columns: { key: SortKey; label: string; unit?: string }[] = [
    { key: "facilityName", label: "Hospital" },
    { key: "state", label: "State" },
    { key: "edWaitTime", label: "ED Wait", unit: "min" },
    { key: "transferWaitTime", label: "Transfer", unit: "min" },
    { key: "leftBeforeSeen", label: "Left Before Seen", unit: "%" },
    { key: "ctResultsTimely", label: "CT Timeliness", unit: "%" },
  ];

  function formatVal(val: number | string | null, unit?: string) {
    if (val === null) return <span className="text-muted/50">N/A</span>;
    return `${val}${unit ? ` ${unit}` : ""}`;
  }

  return (
    <div className="rounded-lg border border-border">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-hover">
              {columns.map((col) => (
                <th
                  key={col.key}
                  onClick={() => handleSort(col.key)}
                  className="cursor-pointer whitespace-nowrap px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted"
                >
                  {col.label}
                  <SortArrow active={sortKey === col.key} asc={asc} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr
                key={row.facilityId}
                className="border-b border-border transition-colors last:border-0 hover:bg-hover"
              >
                <td className="max-w-[200px] truncate px-4 py-3 font-medium text-foreground">
                  {row.facilityName}
                </td>
                <td className="px-4 py-3 text-muted">{row.state}</td>
                <td className="px-4 py-3 text-foreground">{formatVal(row.edWaitTime, "min")}</td>
                <td className="px-4 py-3 text-foreground">{formatVal(row.transferWaitTime, "min")}</td>
                <td className="px-4 py-3 text-foreground">{formatVal(row.leftBeforeSeen, "%")}</td>
                <td className="px-4 py-3 text-foreground">{formatVal(row.ctResultsTimely, "%")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
