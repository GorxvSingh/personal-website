"use client";

import { useState, useEffect } from "react";

export interface ThemeColors {
  foreground: string;
  muted: string;
  background: string;
  border: string;
  chartPrimary: string;
  chartSecondary: string;
  chartTertiary: string;
}

const LIGHT_DEFAULTS: ThemeColors = {
  foreground: "#111111",
  muted: "#666666",
  background: "#ffffff",
  border: "#e5e5e5",
  chartPrimary: "#2563eb",
  chartSecondary: "#8b5cf6",
  chartTertiary: "#10b981",
};

function getColors(): ThemeColors {
  if (typeof window === "undefined") return LIGHT_DEFAULTS;
  const s = getComputedStyle(document.documentElement);
  return {
    foreground: s.getPropertyValue("--foreground").trim() || LIGHT_DEFAULTS.foreground,
    muted: s.getPropertyValue("--muted").trim() || LIGHT_DEFAULTS.muted,
    background: s.getPropertyValue("--background").trim() || LIGHT_DEFAULTS.background,
    border: s.getPropertyValue("--border").trim() || LIGHT_DEFAULTS.border,
    chartPrimary: s.getPropertyValue("--chart-primary").trim() || LIGHT_DEFAULTS.chartPrimary,
    chartSecondary: s.getPropertyValue("--chart-secondary").trim() || LIGHT_DEFAULTS.chartSecondary,
    chartTertiary: s.getPropertyValue("--chart-tertiary").trim() || LIGHT_DEFAULTS.chartTertiary,
  };
}

export function useThemeColors(): ThemeColors {
  const [colors, setColors] = useState<ThemeColors>(LIGHT_DEFAULTS);

  useEffect(() => {
    setColors(getColors());

    const observer = new MutationObserver(() => {
      setColors(getColors());
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return colors;
}
