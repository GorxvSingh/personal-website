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

// Monthly state-level trend data (Jan-Dec 2024)
export interface MonthlyStateMetric {
  month: string;
  state: string;
  avgEdWaitTime: number;
  avgTransferTime: number;
  avgLeftBeforeSeen: number;
}

export interface NationalAverages {
  edWaitTime: number;
  transferTime: number;
  leftBeforeSeen: number;
}

const nationalAverages: NationalAverages = {
  edWaitTime: 170,
  transferTime: 85,
  leftBeforeSeen: 2.6,
};

const monthlyData: MonthlyStateMetric[] = [
  // AZ - consistently below national avg
  { month: "Jan", state: "AZ", avgEdWaitTime: 218, avgTransferTime: 82, avgLeftBeforeSeen: 2.0 },
  { month: "Feb", state: "AZ", avgEdWaitTime: 215, avgTransferTime: 80, avgLeftBeforeSeen: 1.9 },
  { month: "Mar", state: "AZ", avgEdWaitTime: 220, avgTransferTime: 83, avgLeftBeforeSeen: 2.1 },
  { month: "Apr", state: "AZ", avgEdWaitTime: 225, avgTransferTime: 85, avgLeftBeforeSeen: 2.2 },
  { month: "May", state: "AZ", avgEdWaitTime: 222, avgTransferTime: 84, avgLeftBeforeSeen: 2.1 },
  { month: "Jun", state: "AZ", avgEdWaitTime: 230, avgTransferTime: 87, avgLeftBeforeSeen: 2.3 },
  { month: "Jul", state: "AZ", avgEdWaitTime: 235, avgTransferTime: 89, avgLeftBeforeSeen: 2.4 },
  { month: "Aug", state: "AZ", avgEdWaitTime: 232, avgTransferTime: 88, avgLeftBeforeSeen: 2.3 },
  { month: "Sep", state: "AZ", avgEdWaitTime: 228, avgTransferTime: 86, avgLeftBeforeSeen: 2.2 },
  { month: "Oct", state: "AZ", avgEdWaitTime: 224, avgTransferTime: 84, avgLeftBeforeSeen: 2.1 },
  { month: "Nov", state: "AZ", avgEdWaitTime: 220, avgTransferTime: 82, avgLeftBeforeSeen: 2.0 },
  { month: "Dec", state: "AZ", avgEdWaitTime: 228, avgTransferTime: 86, avgLeftBeforeSeen: 2.2 },

  // CA - near avg, slight summer spike
  { month: "Jan", state: "CA", avgEdWaitTime: 248, avgTransferTime: 94, avgLeftBeforeSeen: 3.0 },
  { month: "Feb", state: "CA", avgEdWaitTime: 245, avgTransferTime: 92, avgLeftBeforeSeen: 2.9 },
  { month: "Mar", state: "CA", avgEdWaitTime: 250, avgTransferTime: 95, avgLeftBeforeSeen: 3.1 },
  { month: "Apr", state: "CA", avgEdWaitTime: 255, avgTransferTime: 97, avgLeftBeforeSeen: 3.2 },
  { month: "May", state: "CA", avgEdWaitTime: 260, avgTransferTime: 99, avgLeftBeforeSeen: 3.3 },
  { month: "Jun", state: "CA", avgEdWaitTime: 268, avgTransferTime: 102, avgLeftBeforeSeen: 3.5 },
  { month: "Jul", state: "CA", avgEdWaitTime: 272, avgTransferTime: 104, avgLeftBeforeSeen: 3.6 },
  { month: "Aug", state: "CA", avgEdWaitTime: 265, avgTransferTime: 100, avgLeftBeforeSeen: 3.4 },
  { month: "Sep", state: "CA", avgEdWaitTime: 258, avgTransferTime: 97, avgLeftBeforeSeen: 3.2 },
  { month: "Oct", state: "CA", avgEdWaitTime: 252, avgTransferTime: 95, avgLeftBeforeSeen: 3.1 },
  { month: "Nov", state: "CA", avgEdWaitTime: 250, avgTransferTime: 94, avgLeftBeforeSeen: 3.0 },
  { month: "Dec", state: "CA", avgEdWaitTime: 255, avgTransferTime: 96, avgLeftBeforeSeen: 3.2 },

  // FL - winter spike from seasonal population
  { month: "Jan", state: "FL", avgEdWaitTime: 275, avgTransferTime: 108, avgLeftBeforeSeen: 3.6 },
  { month: "Feb", state: "FL", avgEdWaitTime: 280, avgTransferTime: 110, avgLeftBeforeSeen: 3.8 },
  { month: "Mar", state: "FL", avgEdWaitTime: 272, avgTransferTime: 106, avgLeftBeforeSeen: 3.5 },
  { month: "Apr", state: "FL", avgEdWaitTime: 255, avgTransferTime: 98, avgLeftBeforeSeen: 3.0 },
  { month: "May", state: "FL", avgEdWaitTime: 248, avgTransferTime: 95, avgLeftBeforeSeen: 2.8 },
  { month: "Jun", state: "FL", avgEdWaitTime: 242, avgTransferTime: 92, avgLeftBeforeSeen: 2.6 },
  { month: "Jul", state: "FL", avgEdWaitTime: 245, avgTransferTime: 93, avgLeftBeforeSeen: 2.7 },
  { month: "Aug", state: "FL", avgEdWaitTime: 248, avgTransferTime: 95, avgLeftBeforeSeen: 2.8 },
  { month: "Sep", state: "FL", avgEdWaitTime: 252, avgTransferTime: 97, avgLeftBeforeSeen: 2.9 },
  { month: "Oct", state: "FL", avgEdWaitTime: 258, avgTransferTime: 100, avgLeftBeforeSeen: 3.1 },
  { month: "Nov", state: "FL", avgEdWaitTime: 268, avgTransferTime: 105, avgLeftBeforeSeen: 3.4 },
  { month: "Dec", state: "FL", avgEdWaitTime: 278, avgTransferTime: 109, avgLeftBeforeSeen: 3.7 },

  // GA - moderate, steady
  { month: "Jan", state: "GA", avgEdWaitTime: 265, avgTransferTime: 105, avgLeftBeforeSeen: 3.3 },
  { month: "Feb", state: "GA", avgEdWaitTime: 262, avgTransferTime: 103, avgLeftBeforeSeen: 3.2 },
  { month: "Mar", state: "GA", avgEdWaitTime: 268, avgTransferTime: 106, avgLeftBeforeSeen: 3.4 },
  { month: "Apr", state: "GA", avgEdWaitTime: 270, avgTransferTime: 108, avgLeftBeforeSeen: 3.5 },
  { month: "May", state: "GA", avgEdWaitTime: 272, avgTransferTime: 109, avgLeftBeforeSeen: 3.5 },
  { month: "Jun", state: "GA", avgEdWaitTime: 275, avgTransferTime: 110, avgLeftBeforeSeen: 3.6 },
  { month: "Jul", state: "GA", avgEdWaitTime: 278, avgTransferTime: 112, avgLeftBeforeSeen: 3.7 },
  { month: "Aug", state: "GA", avgEdWaitTime: 274, avgTransferTime: 110, avgLeftBeforeSeen: 3.6 },
  { month: "Sep", state: "GA", avgEdWaitTime: 270, avgTransferTime: 108, avgLeftBeforeSeen: 3.4 },
  { month: "Oct", state: "GA", avgEdWaitTime: 268, avgTransferTime: 106, avgLeftBeforeSeen: 3.4 },
  { month: "Nov", state: "GA", avgEdWaitTime: 272, avgTransferTime: 108, avgLeftBeforeSeen: 3.5 },
  { month: "Dec", state: "GA", avgEdWaitTime: 275, avgTransferTime: 110, avgLeftBeforeSeen: 3.6 },

  // IL - above avg, winter heavy
  { month: "Jan", state: "IL", avgEdWaitTime: 280, avgTransferTime: 112, avgLeftBeforeSeen: 3.5 },
  { month: "Feb", state: "IL", avgEdWaitTime: 285, avgTransferTime: 114, avgLeftBeforeSeen: 3.6 },
  { month: "Mar", state: "IL", avgEdWaitTime: 278, avgTransferTime: 110, avgLeftBeforeSeen: 3.4 },
  { month: "Apr", state: "IL", avgEdWaitTime: 270, avgTransferTime: 106, avgLeftBeforeSeen: 3.2 },
  { month: "May", state: "IL", avgEdWaitTime: 265, avgTransferTime: 104, avgLeftBeforeSeen: 3.1 },
  { month: "Jun", state: "IL", avgEdWaitTime: 262, avgTransferTime: 102, avgLeftBeforeSeen: 3.0 },
  { month: "Jul", state: "IL", avgEdWaitTime: 268, avgTransferTime: 105, avgLeftBeforeSeen: 3.2 },
  { month: "Aug", state: "IL", avgEdWaitTime: 272, avgTransferTime: 108, avgLeftBeforeSeen: 3.3 },
  { month: "Sep", state: "IL", avgEdWaitTime: 275, avgTransferTime: 110, avgLeftBeforeSeen: 3.4 },
  { month: "Oct", state: "IL", avgEdWaitTime: 278, avgTransferTime: 112, avgLeftBeforeSeen: 3.5 },
  { month: "Nov", state: "IL", avgEdWaitTime: 282, avgTransferTime: 113, avgLeftBeforeSeen: 3.6 },
  { month: "Dec", state: "IL", avgEdWaitTime: 288, avgTransferTime: 115, avgLeftBeforeSeen: 3.7 },

  // MA - above avg year-round
  { month: "Jan", state: "MA", avgEdWaitTime: 278, avgTransferTime: 115, avgLeftBeforeSeen: 3.4 },
  { month: "Feb", state: "MA", avgEdWaitTime: 282, avgTransferTime: 117, avgLeftBeforeSeen: 3.5 },
  { month: "Mar", state: "MA", avgEdWaitTime: 275, avgTransferTime: 113, avgLeftBeforeSeen: 3.3 },
  { month: "Apr", state: "MA", avgEdWaitTime: 268, avgTransferTime: 110, avgLeftBeforeSeen: 3.1 },
  { month: "May", state: "MA", avgEdWaitTime: 265, avgTransferTime: 108, avgLeftBeforeSeen: 3.0 },
  { month: "Jun", state: "MA", avgEdWaitTime: 262, avgTransferTime: 106, avgLeftBeforeSeen: 2.9 },
  { month: "Jul", state: "MA", avgEdWaitTime: 270, avgTransferTime: 110, avgLeftBeforeSeen: 3.2 },
  { month: "Aug", state: "MA", avgEdWaitTime: 268, avgTransferTime: 109, avgLeftBeforeSeen: 3.1 },
  { month: "Sep", state: "MA", avgEdWaitTime: 272, avgTransferTime: 112, avgLeftBeforeSeen: 3.3 },
  { month: "Oct", state: "MA", avgEdWaitTime: 275, avgTransferTime: 114, avgLeftBeforeSeen: 3.4 },
  { month: "Nov", state: "MA", avgEdWaitTime: 280, avgTransferTime: 116, avgLeftBeforeSeen: 3.5 },
  { month: "Dec", state: "MA", avgEdWaitTime: 284, avgTransferTime: 118, avgLeftBeforeSeen: 3.6 },

  // NY - consistently highest
  { month: "Jan", state: "NY", avgEdWaitTime: 310, avgTransferTime: 138, avgLeftBeforeSeen: 4.5 },
  { month: "Feb", state: "NY", avgEdWaitTime: 315, avgTransferTime: 140, avgLeftBeforeSeen: 4.7 },
  { month: "Mar", state: "NY", avgEdWaitTime: 308, avgTransferTime: 136, avgLeftBeforeSeen: 4.4 },
  { month: "Apr", state: "NY", avgEdWaitTime: 298, avgTransferTime: 130, avgLeftBeforeSeen: 4.1 },
  { month: "May", state: "NY", avgEdWaitTime: 292, avgTransferTime: 126, avgLeftBeforeSeen: 3.9 },
  { month: "Jun", state: "NY", avgEdWaitTime: 288, avgTransferTime: 124, avgLeftBeforeSeen: 3.8 },
  { month: "Jul", state: "NY", avgEdWaitTime: 295, avgTransferTime: 128, avgLeftBeforeSeen: 4.0 },
  { month: "Aug", state: "NY", avgEdWaitTime: 300, avgTransferTime: 132, avgLeftBeforeSeen: 4.2 },
  { month: "Sep", state: "NY", avgEdWaitTime: 305, avgTransferTime: 135, avgLeftBeforeSeen: 4.4 },
  { month: "Oct", state: "NY", avgEdWaitTime: 312, avgTransferTime: 138, avgLeftBeforeSeen: 4.6 },
  { month: "Nov", state: "NY", avgEdWaitTime: 318, avgTransferTime: 142, avgLeftBeforeSeen: 4.8 },
  { month: "Dec", state: "NY", avgEdWaitTime: 322, avgTransferTime: 145, avgLeftBeforeSeen: 5.0 },

  // OH - moderate, slight improvement
  { month: "Jan", state: "OH", avgEdWaitTime: 252, avgTransferTime: 98, avgLeftBeforeSeen: 2.8 },
  { month: "Feb", state: "OH", avgEdWaitTime: 250, avgTransferTime: 97, avgLeftBeforeSeen: 2.7 },
  { month: "Mar", state: "OH", avgEdWaitTime: 248, avgTransferTime: 96, avgLeftBeforeSeen: 2.7 },
  { month: "Apr", state: "OH", avgEdWaitTime: 245, avgTransferTime: 94, avgLeftBeforeSeen: 2.6 },
  { month: "May", state: "OH", avgEdWaitTime: 242, avgTransferTime: 93, avgLeftBeforeSeen: 2.5 },
  { month: "Jun", state: "OH", avgEdWaitTime: 240, avgTransferTime: 92, avgLeftBeforeSeen: 2.5 },
  { month: "Jul", state: "OH", avgEdWaitTime: 244, avgTransferTime: 94, avgLeftBeforeSeen: 2.6 },
  { month: "Aug", state: "OH", avgEdWaitTime: 246, avgTransferTime: 95, avgLeftBeforeSeen: 2.6 },
  { month: "Sep", state: "OH", avgEdWaitTime: 248, avgTransferTime: 96, avgLeftBeforeSeen: 2.7 },
  { month: "Oct", state: "OH", avgEdWaitTime: 245, avgTransferTime: 95, avgLeftBeforeSeen: 2.6 },
  { month: "Nov", state: "OH", avgEdWaitTime: 248, avgTransferTime: 96, avgLeftBeforeSeen: 2.7 },
  { month: "Dec", state: "OH", avgEdWaitTime: 252, avgTransferTime: 98, avgLeftBeforeSeen: 2.8 },

  // PA - mid-range
  { month: "Jan", state: "PA", avgEdWaitTime: 260, avgTransferTime: 102, avgLeftBeforeSeen: 3.0 },
  { month: "Feb", state: "PA", avgEdWaitTime: 262, avgTransferTime: 103, avgLeftBeforeSeen: 3.1 },
  { month: "Mar", state: "PA", avgEdWaitTime: 258, avgTransferTime: 100, avgLeftBeforeSeen: 2.9 },
  { month: "Apr", state: "PA", avgEdWaitTime: 254, avgTransferTime: 98, avgLeftBeforeSeen: 2.8 },
  { month: "May", state: "PA", avgEdWaitTime: 250, avgTransferTime: 96, avgLeftBeforeSeen: 2.7 },
  { month: "Jun", state: "PA", avgEdWaitTime: 248, avgTransferTime: 95, avgLeftBeforeSeen: 2.6 },
  { month: "Jul", state: "PA", avgEdWaitTime: 252, avgTransferTime: 97, avgLeftBeforeSeen: 2.8 },
  { month: "Aug", state: "PA", avgEdWaitTime: 255, avgTransferTime: 99, avgLeftBeforeSeen: 2.9 },
  { month: "Sep", state: "PA", avgEdWaitTime: 258, avgTransferTime: 101, avgLeftBeforeSeen: 3.0 },
  { month: "Oct", state: "PA", avgEdWaitTime: 260, avgTransferTime: 102, avgLeftBeforeSeen: 3.0 },
  { month: "Nov", state: "PA", avgEdWaitTime: 264, avgTransferTime: 104, avgLeftBeforeSeen: 3.1 },
  { month: "Dec", state: "PA", avgEdWaitTime: 268, avgTransferTime: 106, avgLeftBeforeSeen: 3.2 },

  // TX - moderate, summer heat spike
  { month: "Jan", state: "TX", avgEdWaitTime: 248, avgTransferTime: 96, avgLeftBeforeSeen: 2.8 },
  { month: "Feb", state: "TX", avgEdWaitTime: 245, avgTransferTime: 94, avgLeftBeforeSeen: 2.7 },
  { month: "Mar", state: "TX", avgEdWaitTime: 250, avgTransferTime: 97, avgLeftBeforeSeen: 2.9 },
  { month: "Apr", state: "TX", avgEdWaitTime: 252, avgTransferTime: 98, avgLeftBeforeSeen: 2.9 },
  { month: "May", state: "TX", avgEdWaitTime: 258, avgTransferTime: 100, avgLeftBeforeSeen: 3.1 },
  { month: "Jun", state: "TX", avgEdWaitTime: 265, avgTransferTime: 104, avgLeftBeforeSeen: 3.3 },
  { month: "Jul", state: "TX", avgEdWaitTime: 270, avgTransferTime: 106, avgLeftBeforeSeen: 3.4 },
  { month: "Aug", state: "TX", avgEdWaitTime: 268, avgTransferTime: 105, avgLeftBeforeSeen: 3.3 },
  { month: "Sep", state: "TX", avgEdWaitTime: 260, avgTransferTime: 101, avgLeftBeforeSeen: 3.1 },
  { month: "Oct", state: "TX", avgEdWaitTime: 255, avgTransferTime: 99, avgLeftBeforeSeen: 3.0 },
  { month: "Nov", state: "TX", avgEdWaitTime: 252, avgTransferTime: 97, avgLeftBeforeSeen: 2.9 },
  { month: "Dec", state: "TX", avgEdWaitTime: 258, avgTransferTime: 100, avgLeftBeforeSeen: 3.1 },
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function getMonthlyStateMetrics(): MonthlyStateMetric[] {
  return monthlyData;
}

export function getNationalAverages(): NationalAverages {
  return nationalAverages;
}

export function getMonthOrder(): string[] {
  return MONTHS;
}

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
