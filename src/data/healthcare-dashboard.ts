// Sample data modeled on CMS "Timely and Effective Care" dataset
// Measures: OP_18b (ED wait time), ED_2b (transfer time),
// OP_22 (left before seen %), OP_23 (CT results timely %)
// Source: https://data.cms.gov/provider-data/dataset/yv7e-xc69

export interface HospitalSummary {
  facilityId: string;
  facilityName: string;
  city: string;
  state: string;
  edWaitTime: number | null; // minutes
  transferWaitTime: number | null; // minutes
  leftBeforeSeen: number | null; // percentage
  ctResultsTimely: number | null; // percentage
}

export interface StateAggregate {
  state: string;
  avgEdWaitTime: number;
  avgTransferTime: number;
  avgLeftBeforeSeen: number;
  avgCtTimely: number;
  hospitalCount: number;
}

const rawData: HospitalSummary[] = [
  // California
  { facilityId: "050060", facilityName: "Cedars-Sinai Medical Center", city: "Los Angeles", state: "CA", edWaitTime: 312, transferWaitTime: 118, leftBeforeSeen: 4.2, ctResultsTimely: 68.1 },
  { facilityId: "050376", facilityName: "UCLA Medical Center", city: "Los Angeles", state: "CA", edWaitTime: 289, transferWaitTime: 105, leftBeforeSeen: 3.8, ctResultsTimely: 72.5 },
  { facilityId: "050454", facilityName: "UCSF Medical Center", city: "San Francisco", state: "CA", edWaitTime: 274, transferWaitTime: 98, leftBeforeSeen: 2.9, ctResultsTimely: 78.3 },
  { facilityId: "050625", facilityName: "Stanford Health Care", city: "Stanford", state: "CA", edWaitTime: 258, transferWaitTime: 92, leftBeforeSeen: 2.1, ctResultsTimely: 81.7 },
  { facilityId: "050100", facilityName: "Kaiser Permanente Los Angeles", city: "Los Angeles", state: "CA", edWaitTime: 245, transferWaitTime: 87, leftBeforeSeen: 3.5, ctResultsTimely: 75.2 },
  { facilityId: "050230", facilityName: "Scripps Mercy Hospital", city: "San Diego", state: "CA", edWaitTime: 198, transferWaitTime: 82, leftBeforeSeen: 2.6, ctResultsTimely: 79.8 },
  { facilityId: "050320", facilityName: "Sutter Medical Center", city: "Sacramento", state: "CA", edWaitTime: 221, transferWaitTime: 95, leftBeforeSeen: 3.1, ctResultsTimely: 74.6 },
  { facilityId: "050410", facilityName: "Providence St. Joseph", city: "Burbank", state: "CA", edWaitTime: 235, transferWaitTime: 101, leftBeforeSeen: 3.9, ctResultsTimely: 70.4 },

  // Texas
  { facilityId: "450358", facilityName: "Houston Methodist Hospital", city: "Houston", state: "TX", edWaitTime: 276, transferWaitTime: 110, leftBeforeSeen: 3.6, ctResultsTimely: 74.8 },
  { facilityId: "450723", facilityName: "UT Southwestern Medical Center", city: "Dallas", state: "TX", edWaitTime: 254, transferWaitTime: 96, leftBeforeSeen: 2.8, ctResultsTimely: 79.1 },
  { facilityId: "450289", facilityName: "Baylor University Medical Center", city: "Dallas", state: "TX", edWaitTime: 267, transferWaitTime: 103, leftBeforeSeen: 3.2, ctResultsTimely: 76.5 },
  { facilityId: "450051", facilityName: "Memorial Hermann Hospital", city: "Houston", state: "TX", edWaitTime: 298, transferWaitTime: 125, leftBeforeSeen: 4.5, ctResultsTimely: 65.3 },
  { facilityId: "450166", facilityName: "San Antonio Regional Hospital", city: "San Antonio", state: "TX", edWaitTime: 231, transferWaitTime: 89, leftBeforeSeen: 2.4, ctResultsTimely: 80.2 },
  { facilityId: "450390", facilityName: "Texas Health Arlington", city: "Arlington", state: "TX", edWaitTime: 215, transferWaitTime: 84, leftBeforeSeen: 2.1, ctResultsTimely: 82.6 },
  { facilityId: "450520", facilityName: "Dell Seton Medical Center", city: "Austin", state: "TX", edWaitTime: 242, transferWaitTime: 99, leftBeforeSeen: 3.0, ctResultsTimely: 77.4 },

  // New York
  { facilityId: "330214", facilityName: "NYU Langone Medical Center", city: "New York", state: "NY", edWaitTime: 334, transferWaitTime: 142, leftBeforeSeen: 5.1, ctResultsTimely: 62.4 },
  { facilityId: "330101", facilityName: "NewYork-Presbyterian Hospital", city: "New York", state: "NY", edWaitTime: 348, transferWaitTime: 155, leftBeforeSeen: 5.8, ctResultsTimely: 58.9 },
  { facilityId: "330024", facilityName: "Mount Sinai Hospital", city: "New York", state: "NY", edWaitTime: 321, transferWaitTime: 138, leftBeforeSeen: 4.7, ctResultsTimely: 64.2 },
  { facilityId: "330202", facilityName: "Montefiore Medical Center", city: "Bronx", state: "NY", edWaitTime: 356, transferWaitTime: 162, leftBeforeSeen: 6.3, ctResultsTimely: 55.8 },
  { facilityId: "330395", facilityName: "Strong Memorial Hospital", city: "Rochester", state: "NY", edWaitTime: 245, transferWaitTime: 98, leftBeforeSeen: 2.9, ctResultsTimely: 76.1 },
  { facilityId: "330048", facilityName: "Stony Brook University Hospital", city: "Stony Brook", state: "NY", edWaitTime: 268, transferWaitTime: 112, leftBeforeSeen: 3.4, ctResultsTimely: 71.5 },

  // Florida
  { facilityId: "100007", facilityName: "Jackson Memorial Hospital", city: "Miami", state: "FL", edWaitTime: 305, transferWaitTime: 128, leftBeforeSeen: 4.8, ctResultsTimely: 63.7 },
  { facilityId: "100128", facilityName: "Tampa General Hospital", city: "Tampa", state: "FL", edWaitTime: 267, transferWaitTime: 104, leftBeforeSeen: 3.5, ctResultsTimely: 73.2 },
  { facilityId: "100022", facilityName: "AdventHealth Orlando", city: "Orlando", state: "FL", edWaitTime: 248, transferWaitTime: 95, leftBeforeSeen: 2.8, ctResultsTimely: 77.9 },
  { facilityId: "100179", facilityName: "UF Health Shands Hospital", city: "Gainesville", state: "FL", edWaitTime: 234, transferWaitTime: 88, leftBeforeSeen: 2.3, ctResultsTimely: 80.5 },
  { facilityId: "100044", facilityName: "Baptist Hospital of Miami", city: "Miami", state: "FL", edWaitTime: 278, transferWaitTime: 115, leftBeforeSeen: 3.9, ctResultsTimely: 70.1 },
  { facilityId: "100256", facilityName: "Sarasota Memorial Hospital", city: "Sarasota", state: "FL", edWaitTime: 212, transferWaitTime: 79, leftBeforeSeen: 1.9, ctResultsTimely: 83.4 },

  // Illinois
  { facilityId: "140281", facilityName: "Northwestern Memorial Hospital", city: "Chicago", state: "IL", edWaitTime: 287, transferWaitTime: 116, leftBeforeSeen: 3.7, ctResultsTimely: 73.5 },
  { facilityId: "140030", facilityName: "Rush University Medical Center", city: "Chicago", state: "IL", edWaitTime: 269, transferWaitTime: 108, leftBeforeSeen: 3.2, ctResultsTimely: 76.8 },
  { facilityId: "140290", facilityName: "University of Chicago Medical", city: "Chicago", state: "IL", edWaitTime: 295, transferWaitTime: 122, leftBeforeSeen: 4.1, ctResultsTimely: 69.4 },
  { facilityId: "140150", facilityName: "Loyola University Medical Center", city: "Maywood", state: "IL", edWaitTime: 252, transferWaitTime: 98, leftBeforeSeen: 2.8, ctResultsTimely: 78.2 },
  { facilityId: "140088", facilityName: "Advocate Christ Medical Center", city: "Oak Lawn", state: "IL", edWaitTime: 261, transferWaitTime: 102, leftBeforeSeen: 3.4, ctResultsTimely: 75.1 },

  // Pennsylvania
  { facilityId: "390111", facilityName: "Hospital of the Univ. of Penn", city: "Philadelphia", state: "PA", edWaitTime: 278, transferWaitTime: 114, leftBeforeSeen: 3.5, ctResultsTimely: 75.6 },
  { facilityId: "390174", facilityName: "UPMC Presbyterian", city: "Pittsburgh", state: "PA", edWaitTime: 256, transferWaitTime: 99, leftBeforeSeen: 2.9, ctResultsTimely: 78.4 },
  { facilityId: "390226", facilityName: "Thomas Jefferson University Hosp", city: "Philadelphia", state: "PA", edWaitTime: 291, transferWaitTime: 121, leftBeforeSeen: 4.0, ctResultsTimely: 71.2 },
  { facilityId: "390030", facilityName: "Penn State Milton S. Hershey", city: "Hershey", state: "PA", edWaitTime: 232, transferWaitTime: 86, leftBeforeSeen: 2.2, ctResultsTimely: 82.1 },
  { facilityId: "390063", facilityName: "Lehigh Valley Hospital", city: "Allentown", state: "PA", edWaitTime: 218, transferWaitTime: 81, leftBeforeSeen: 1.8, ctResultsTimely: 84.7 },

  // Ohio
  { facilityId: "360180", facilityName: "Cleveland Clinic Foundation", city: "Cleveland", state: "OH", edWaitTime: 241, transferWaitTime: 93, leftBeforeSeen: 2.5, ctResultsTimely: 80.9 },
  { facilityId: "360085", facilityName: "Ohio State University Hospital", city: "Columbus", state: "OH", edWaitTime: 263, transferWaitTime: 107, leftBeforeSeen: 3.3, ctResultsTimely: 74.5 },
  { facilityId: "360037", facilityName: "University Hospitals Cleveland", city: "Cleveland", state: "OH", edWaitTime: 254, transferWaitTime: 100, leftBeforeSeen: 3.0, ctResultsTimely: 77.1 },
  { facilityId: "360134", facilityName: "UC Health Medical Center", city: "Cincinnati", state: "OH", edWaitTime: 247, transferWaitTime: 96, leftBeforeSeen: 2.7, ctResultsTimely: 78.8 },
  { facilityId: "360245", facilityName: "ProMedica Toledo Hospital", city: "Toledo", state: "OH", edWaitTime: 208, transferWaitTime: 78, leftBeforeSeen: 1.6, ctResultsTimely: 85.3 },

  // Georgia
  { facilityId: "110079", facilityName: "Emory University Hospital", city: "Atlanta", state: "GA", edWaitTime: 272, transferWaitTime: 109, leftBeforeSeen: 3.4, ctResultsTimely: 75.3 },
  { facilityId: "110165", facilityName: "Grady Memorial Hospital", city: "Atlanta", state: "GA", edWaitTime: 325, transferWaitTime: 145, leftBeforeSeen: 5.6, ctResultsTimely: 59.8 },
  { facilityId: "110034", facilityName: "Piedmont Atlanta Hospital", city: "Atlanta", state: "GA", edWaitTime: 249, transferWaitTime: 97, leftBeforeSeen: 2.8, ctResultsTimely: 77.6 },
  { facilityId: "110215", facilityName: "Augusta University Medical Center", city: "Augusta", state: "GA", edWaitTime: 285, transferWaitTime: 118, leftBeforeSeen: 3.9, ctResultsTimely: 71.4 },
  { facilityId: "110091", facilityName: "Memorial Health University", city: "Savannah", state: "GA", edWaitTime: 228, transferWaitTime: 85, leftBeforeSeen: 2.2, ctResultsTimely: 81.5 },

  // Massachusetts
  { facilityId: "220071", facilityName: "Massachusetts General Hospital", city: "Boston", state: "MA", edWaitTime: 298, transferWaitTime: 126, leftBeforeSeen: 4.0, ctResultsTimely: 70.8 },
  { facilityId: "220110", facilityName: "Brigham and Women's Hospital", city: "Boston", state: "MA", edWaitTime: 285, transferWaitTime: 119, leftBeforeSeen: 3.6, ctResultsTimely: 73.9 },
  { facilityId: "220162", facilityName: "Beth Israel Deaconess Medical", city: "Boston", state: "MA", edWaitTime: 271, transferWaitTime: 112, leftBeforeSeen: 3.3, ctResultsTimely: 76.2 },
  { facilityId: "220024", facilityName: "UMass Memorial Medical Center", city: "Worcester", state: "MA", edWaitTime: 252, transferWaitTime: 101, leftBeforeSeen: 2.8, ctResultsTimely: 79.4 },
  { facilityId: "220077", facilityName: "Tufts Medical Center", city: "Boston", state: "MA", edWaitTime: 264, transferWaitTime: 106, leftBeforeSeen: 3.1, ctResultsTimely: 77.5 },

  // Arizona
  { facilityId: "030064", facilityName: "Banner University Medical Center", city: "Tucson", state: "AZ", edWaitTime: 242, transferWaitTime: 94, leftBeforeSeen: 2.6, ctResultsTimely: 79.5 },
  { facilityId: "030002", facilityName: "Mayo Clinic Hospital", city: "Phoenix", state: "AZ", edWaitTime: 195, transferWaitTime: 72, leftBeforeSeen: 1.4, ctResultsTimely: 88.2 },
  { facilityId: "030085", facilityName: "Banner Desert Medical Center", city: "Mesa", state: "AZ", edWaitTime: 228, transferWaitTime: 88, leftBeforeSeen: 2.3, ctResultsTimely: 81.1 },
  { facilityId: "030030", facilityName: "St. Joseph's Hospital", city: "Phoenix", state: "AZ", edWaitTime: 265, transferWaitTime: 105, leftBeforeSeen: 3.5, ctResultsTimely: 74.3 },
  { facilityId: "030110", facilityName: "Chandler Regional Medical Center", city: "Chandler", state: "AZ", edWaitTime: 210, transferWaitTime: 80, leftBeforeSeen: 1.9, ctResultsTimely: 83.7 },
];

export function getHospitalSummaries(): HospitalSummary[] {
  return rawData;
}

export function getUniqueStates(): string[] {
  return [...new Set(rawData.map((d) => d.state))].sort();
}

export function getStateAggregates(hospitals?: HospitalSummary[]): StateAggregate[] {
  const source = hospitals ?? rawData;
  const byState = new Map<string, HospitalSummary[]>();

  for (const h of source) {
    const arr = byState.get(h.state) ?? [];
    arr.push(h);
    byState.set(h.state, arr);
  }

  return Array.from(byState.entries()).map(([state, list]) => {
    const withWait = list.filter((h) => h.edWaitTime !== null);
    const withTransfer = list.filter((h) => h.transferWaitTime !== null);
    const withLbs = list.filter((h) => h.leftBeforeSeen !== null);
    const withCt = list.filter((h) => h.ctResultsTimely !== null);

    return {
      state,
      avgEdWaitTime: withWait.length > 0
        ? withWait.reduce((s, h) => s + h.edWaitTime!, 0) / withWait.length
        : 0,
      avgTransferTime: withTransfer.length > 0
        ? withTransfer.reduce((s, h) => s + h.transferWaitTime!, 0) / withTransfer.length
        : 0,
      avgLeftBeforeSeen: withLbs.length > 0
        ? withLbs.reduce((s, h) => s + h.leftBeforeSeen!, 0) / withLbs.length
        : 0,
      avgCtTimely: withCt.length > 0
        ? withCt.reduce((s, h) => s + h.ctResultsTimely!, 0) / withCt.length
        : 0,
      hospitalCount: list.length,
    };
  });
}
