"use client";

import { useState } from "react";
import Link from "next/link";
import {
  getHospitalSummaries,
  getUniqueStates,
  getStateAggregates,
  getMonthlyStateMetrics,
  getNationalAverages,
  getMonthOrder,
} from "@/data/healthcare-dashboard";
import { useThemeColors } from "@/hooks/useThemeColors";
import ThemeToggle from "@/components/ThemeToggle";
import KPISummary from "./components/KPISummary";
import StateFilter from "./components/StateFilter";
import EDWaitTimeChart from "./components/EDWaitTimeChart";
import StateComparisonChart from "./components/StateComparisonChart";
import VolumeDistributionChart from "./components/VolumeDistributionChart";
import MonthlyTrendChart from "./components/MonthlyTrendChart";
import DataTable from "./components/DataTable";

const allHospitals = getHospitalSummaries();
const allStates = getUniqueStates();
const monthlyMetrics = getMonthlyStateMetrics();
const nationalAverages = getNationalAverages();
const monthOrder = getMonthOrder();

export default function DashboardClient() {
  const [selectedState, setSelectedState] = useState("");
  const colors = useThemeColors();

  const filtered = selectedState
    ? allHospitals.filter((h) => h.state === selectedState)
    : allHospitals;

  const stateAggregates = getStateAggregates(filtered);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
      {/* Header */}
      <header className="mb-12">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="font-[family-name:var(--font-signature)] text-2xl text-foreground"
          >
            Gorav Saluja
          </Link>
          <ThemeToggle />
        </nav>
      </header>

      {/* Title + Filter */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            Healthcare Operations Dashboard
          </h1>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
            ED throughput metrics across {allHospitals.length} hospitals in{" "}
            {allStates.length} states, sourced from CMS Timely &amp; Effective
            Care data.
          </p>
        </div>
        <StateFilter
          states={allStates}
          selected={selectedState}
          onChange={setSelectedState}
        />
      </div>

      {/* KPIs */}
      <section className="mb-8">
        <KPISummary data={filtered} />
      </section>

      {/* Charts */}
      <section className="mb-8 grid gap-6 lg:grid-cols-2">
        <EDWaitTimeChart data={filtered} colors={colors} />
        <StateComparisonChart data={stateAggregates} colors={colors} />
      </section>

      <section className="mb-8">
        <MonthlyTrendChart
          data={monthlyMetrics}
          nationalAverages={nationalAverages}
          months={monthOrder}
          selectedState={selectedState}
          colors={colors}
        />
      </section>

      <section className="mb-8">
        <VolumeDistributionChart data={stateAggregates} colors={colors} />
      </section>

      {/* Data Table */}
      <section className="mb-12">
        <h2 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted">
          Hospital Details
        </h2>
        <DataTable data={filtered} />
      </section>

      {/* Footer */}
      <footer className="border-t border-border pt-8">
        <p className="text-sm text-muted">
          Data sourced from CMS Timely &amp; Effective Care dataset.{" "}
          <Link href="/" className="underline">
            &larr; Back to home
          </Link>
        </p>
      </footer>
    </div>
  );
}
