// Master catalog of diagnostic tests the system knows about.
// "govtBenchmarkPrice" = a rough honest-market reference price so users can
// tell if a lab is overcharging, even before scheme/eligibility is applied.
// These are illustrative starting figures — MUST be verified against real
// Bangalore lab rate cards before this goes live with real users.

export type Test = {
  id: string;
  name: string;
  fullName: string;
  sampleType: "blood" | "urine";
  fastingRequired: boolean;
  govtBenchmarkPriceINR: number;
};

export const TESTS: Test[] = [
  { id: "tsh", name: "TSH", fullName: "Thyroid Stimulating Hormone", sampleType: "blood", fastingRequired: false, govtBenchmarkPriceINR: 200 },
  { id: "t3_t4", name: "T3/T4", fullName: "Triiodothyronine / Thyroxine", sampleType: "blood", fastingRequired: false, govtBenchmarkPriceINR: 400 },
  { id: "cbc", name: "CBC", fullName: "Complete Blood Count", sampleType: "blood", fastingRequired: false, govtBenchmarkPriceINR: 250 },
  { id: "ferritin", name: "Ferritin", fullName: "Serum Ferritin (Iron Stores)", sampleType: "blood", fastingRequired: false, govtBenchmarkPriceINR: 500 },
  { id: "fbs", name: "FBS", fullName: "Fasting Blood Sugar", sampleType: "blood", fastingRequired: true, govtBenchmarkPriceINR: 100 },
  { id: "hba1c", name: "HbA1c", fullName: "Glycated Hemoglobin (3-month average)", sampleType: "blood", fastingRequired: false, govtBenchmarkPriceINR: 450 },
  { id: "b12", name: "Vitamin B12", fullName: "Serum Vitamin B12", sampleType: "blood", fastingRequired: false, govtBenchmarkPriceINR: 600 },
  { id: "hormone_panel", name: "Hormone Panel", fullName: "LH / FSH / Testosterone Panel", sampleType: "blood", fastingRequired: false, govtBenchmarkPriceINR: 1400 },
  { id: "vitamin_d", name: "Vitamin D", fullName: "25-Hydroxy Vitamin D", sampleType: "blood", fastingRequired: false, govtBenchmarkPriceINR: 700 },
  { id: "lipid_profile", name: "Lipid Profile", fullName: "Cholesterol & Triglycerides Panel", sampleType: "blood", fastingRequired: true, govtBenchmarkPriceINR: 350 },
  { id: "lft", name: "LFT", fullName: "Liver Function Test", sampleType: "blood", fastingRequired: false, govtBenchmarkPriceINR: 450 },
  { id: "kft", name: "KFT", fullName: "Kidney Function Test (Creatinine, Urea)", sampleType: "blood", fastingRequired: false, govtBenchmarkPriceINR: 400 },
  { id: "uric_acid", name: "Uric Acid", fullName: "Serum Uric Acid", sampleType: "blood", fastingRequired: false, govtBenchmarkPriceINR: 200 },
  { id: "calcium", name: "Calcium", fullName: "Serum Calcium", sampleType: "blood", fastingRequired: false, govtBenchmarkPriceINR: 250 },
  { id: "urine_routine", name: "Urine Routine", fullName: "Urine Routine & Microscopy", sampleType: "urine", fastingRequired: false, govtBenchmarkPriceINR: 150 },
];