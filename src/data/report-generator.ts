export interface FacilityProfile {
  name: string;
  city: string;
  state: string;
  beds: number;
}

export interface MonthlyFacilityMetrics {
  facilityName: string;
  month: string;
  edVolume: number;
  avgWaitTime: number;
  leftBeforeSeen: number;
  admissionRate: number;
}

export interface TrendDataPoint {
  month: string;
  metroGeneral: number;
  valleyCommunity: number;
  desertSprings: number;
  copperCanyon: number;
}

export interface GenerationStep {
  label: string;
  duration: number;
}

export interface ReportSection {
  id: string;
  title: string;
  content: string;
  type: "text" | "chart" | "callout" | "list";
}

const facilities: FacilityProfile[] = [
  { name: "Metro General Hospital", city: "Phoenix", state: "AZ", beds: 420 },
  { name: "Valley Community Medical Center", city: "Tucson", state: "AZ", beds: 185 },
  { name: "Desert Springs Regional", city: "Mesa", state: "AZ", beds: 310 },
  { name: "Copper Canyon Health", city: "Chandler", state: "AZ", beds: 240 },
];

const monthlyMetrics: MonthlyFacilityMetrics[] = [
  // Metro General Hospital - stable baseline
  { facilityName: "Metro General Hospital", month: "Jul 2024", edVolume: 4120, avgWaitTime: 205, leftBeforeSeen: 2.8, admissionRate: 24.5 },
  { facilityName: "Metro General Hospital", month: "Aug 2024", edVolume: 4085, avgWaitTime: 210, leftBeforeSeen: 2.9, admissionRate: 24.2 },
  { facilityName: "Metro General Hospital", month: "Sep 2024", edVolume: 4150, avgWaitTime: 198, leftBeforeSeen: 2.7, admissionRate: 24.8 },
  { facilityName: "Metro General Hospital", month: "Oct 2024", edVolume: 4200, avgWaitTime: 212, leftBeforeSeen: 3.0, admissionRate: 24.1 },
  { facilityName: "Metro General Hospital", month: "Nov 2024", edVolume: 4310, avgWaitTime: 208, leftBeforeSeen: 2.8, admissionRate: 25.0 },
  { facilityName: "Metro General Hospital", month: "Dec 2024", edVolume: 4280, avgWaitTime: 215, leftBeforeSeen: 3.1, admissionRate: 24.6 },

  // Valley Community Medical Center - improving trend
  { facilityName: "Valley Community Medical Center", month: "Jul 2024", edVolume: 1850, avgWaitTime: 195, leftBeforeSeen: 3.2, admissionRate: 22.1 },
  { facilityName: "Valley Community Medical Center", month: "Aug 2024", edVolume: 1890, avgWaitTime: 188, leftBeforeSeen: 2.9, admissionRate: 22.4 },
  { facilityName: "Valley Community Medical Center", month: "Sep 2024", edVolume: 1920, avgWaitTime: 178, leftBeforeSeen: 2.6, admissionRate: 22.8 },
  { facilityName: "Valley Community Medical Center", month: "Oct 2024", edVolume: 1880, avgWaitTime: 172, leftBeforeSeen: 2.4, admissionRate: 23.0 },
  { facilityName: "Valley Community Medical Center", month: "Nov 2024", edVolume: 1940, avgWaitTime: 168, leftBeforeSeen: 2.2, admissionRate: 23.2 },
  { facilityName: "Valley Community Medical Center", month: "Dec 2024", edVolume: 1960, avgWaitTime: 165, leftBeforeSeen: 2.0, admissionRate: 23.5 },

  // Desert Springs Regional - anomaly: wait time spike Oct-Nov
  { facilityName: "Desert Springs Regional", month: "Jul 2024", edVolume: 3100, avgWaitTime: 185, leftBeforeSeen: 2.4, admissionRate: 25.2 },
  { facilityName: "Desert Springs Regional", month: "Aug 2024", edVolume: 3050, avgWaitTime: 182, leftBeforeSeen: 2.3, admissionRate: 25.0 },
  { facilityName: "Desert Springs Regional", month: "Sep 2024", edVolume: 3180, avgWaitTime: 180, leftBeforeSeen: 2.4, admissionRate: 25.5 },
  { facilityName: "Desert Springs Regional", month: "Oct 2024", edVolume: 3650, avgWaitTime: 238, leftBeforeSeen: 3.2, admissionRate: 26.1 },
  { facilityName: "Desert Springs Regional", month: "Nov 2024", edVolume: 3820, avgWaitTime: 265, leftBeforeSeen: 4.1, admissionRate: 26.8 },
  { facilityName: "Desert Springs Regional", month: "Dec 2024", edVolume: 3580, avgWaitTime: 245, leftBeforeSeen: 3.6, admissionRate: 25.9 },

  // Copper Canyon Health - declining: rising LWBS rate
  { facilityName: "Copper Canyon Health", month: "Jul 2024", edVolume: 2400, avgWaitTime: 192, leftBeforeSeen: 2.1, admissionRate: 23.8 },
  { facilityName: "Copper Canyon Health", month: "Aug 2024", edVolume: 2380, avgWaitTime: 196, leftBeforeSeen: 2.4, admissionRate: 23.5 },
  { facilityName: "Copper Canyon Health", month: "Sep 2024", edVolume: 2420, avgWaitTime: 200, leftBeforeSeen: 2.8, admissionRate: 23.9 },
  { facilityName: "Copper Canyon Health", month: "Oct 2024", edVolume: 2450, avgWaitTime: 205, leftBeforeSeen: 3.1, admissionRate: 24.0 },
  { facilityName: "Copper Canyon Health", month: "Nov 2024", edVolume: 2480, avgWaitTime: 210, leftBeforeSeen: 3.5, admissionRate: 24.2 },
  { facilityName: "Copper Canyon Health", month: "Dec 2024", edVolume: 2510, avgWaitTime: 218, leftBeforeSeen: 3.8, admissionRate: 24.4 },
];

const trendData: TrendDataPoint[] = [
  { month: "Jul", metroGeneral: 205, valleyCommunity: 195, desertSprings: 185, copperCanyon: 192 },
  { month: "Aug", metroGeneral: 210, valleyCommunity: 188, desertSprings: 182, copperCanyon: 196 },
  { month: "Sep", metroGeneral: 198, valleyCommunity: 178, desertSprings: 180, copperCanyon: 200 },
  { month: "Oct", metroGeneral: 212, valleyCommunity: 172, desertSprings: 238, copperCanyon: 205 },
  { month: "Nov", metroGeneral: 208, valleyCommunity: 168, desertSprings: 265, copperCanyon: 210 },
  { month: "Dec", metroGeneral: 215, valleyCommunity: 165, desertSprings: 245, copperCanyon: 218 },
];

const generationSteps: GenerationStep[] = [
  { label: "Loading facility data...", duration: 800 },
  { label: "Calculating monthly aggregates...", duration: 600 },
  { label: "Analyzing trends across facilities...", duration: 1000 },
  { label: "Running anomaly detection...", duration: 900 },
  { label: "Generating narrative report...", duration: 700 },
];

const reportSections: ReportSection[] = [
  {
    id: "executive-summary",
    title: "Executive Summary",
    type: "text",
    content:
      "This report analyzes ED operational data for four Arizona facilities from July through December 2024. The analysis identified one critical anomaly at Desert Springs Regional, where wait times surged 47% between September and November, and a developing concern at Copper Canyon Health, where left-before-seen rates have climbed steadily over the six-month period. Valley Community Medical Center demonstrated strong improvement across all key metrics, offering a potential model for network-wide adoption.",
  },
  {
    id: "key-metrics",
    title: "Key Metrics Overview",
    type: "list",
    content:
      "Total ED visits across all facilities: 71,910 over 6 months\nAverage ED wait time (network-wide): 201 minutes\nAverage left-before-seen rate: 2.8%\nAverage admission rate: 24.1%\nBest performing facility (wait time): Valley Community Medical Center at 165 min in December\nHighest volume facility: Metro General Hospital averaging 4,191 visits per month",
  },
  {
    id: "trend-analysis",
    title: "Trend Analysis: ED Wait Times",
    type: "chart",
    content:
      "The chart below tracks monthly ED wait times across all four facilities. Valley Community shows a consistent downward trend, improving from 195 minutes in July to 165 minutes in December, a 15.4% reduction. Metro General remained stable in the 198 to 215 minute range throughout the period. Desert Springs Regional diverged sharply from its baseline in October, peaking at 265 minutes in November before partially recovering in December. Copper Canyon Health shows a gradual upward drift that, while less dramatic, signals a developing capacity issue.",
  },
  {
    id: "anomaly-detection",
    title: "Anomaly Detection",
    type: "callout",
    content:
      "CRITICAL: Desert Springs Regional, Wait Time Spike\nED wait times increased from 180 minutes in September to 265 minutes in November, a 47% jump. This coincided with a 20% rise in ED volume (3,180 to 3,820 visits). The left-before-seen rate more than doubled from 2.4% to 4.1% during this period, indicating patients are leaving before receiving care. December data shows partial recovery (245 min), but levels remain well above the July-September baseline.\n\nWARNING: Copper Canyon Health, Rising Left-Before-Seen Rate\nThe left-before-seen rate at Copper Canyon has increased every month, climbing from 2.1% in July to 3.8% in December. This 81% increase occurred despite only modest growth in ED volume and relatively stable wait times, suggesting the issue may be related to patient experience, triage workflow, or perceived wait times rather than raw capacity constraints.",
  },
  {
    id: "recommendations",
    title: "Recommendations",
    type: "list",
    content:
      "1. Conduct a root-cause analysis at Desert Springs Regional to determine whether the October-November volume spike is seasonal, referral-driven, or related to staffing changes.\n2. Evaluate staffing models at Desert Springs for the October through December period, with particular attention to mid-shift coverage during peak hours (10 AM to 6 PM).\n3. Investigate Copper Canyon's rising left-before-seen rate through patient surveys and triage workflow observation. Consider implementing a patient communication protocol to manage wait-time expectations.\n4. Document Valley Community's improvement playbook and share across the network. Their 15.4% wait time reduction over six months suggests a replicable process worth standardizing.\n5. Establish automated monthly monitoring alerts when any facility's wait time exceeds 240 minutes or left-before-seen rate exceeds 3.5%, enabling earlier intervention.",
  },
];

export function getFacilityProfiles(): FacilityProfile[] {
  return facilities;
}

export function getMonthlyMetrics(): MonthlyFacilityMetrics[] {
  return monthlyMetrics;
}

export function getTrendChartData(): TrendDataPoint[] {
  return trendData;
}

export function getGenerationSteps(): GenerationStep[] {
  return generationSteps;
}

export function getReportSections(): ReportSection[] {
  return reportSections;
}
