export type Lab = {
  id: string;
  name: string;
  area: string;
  address?: string;
  phone?: string;
  nablAccredited: boolean;
  homeCollection: boolean;
  prices: Record<string, number>;
  bookingUrl: string | null;
  whatsappNumber: string | null;
};

export const LABS: Lab[] = [
  {
    id: "lab_thyrocare",
    name: "Thyrocare",
    area: "Multiple (Koramangala, Indiranagar, Whitefield)",
    nablAccredited: true,
    homeCollection: true,
    prices: {
      tsh: 150, t3_t4: 350, cbc: 200, ferritin: 400, fbs: 90, hba1c: 380,
      b12: 500, hormone_panel: 1200, vitamin_d: 550, lipid_profile: 280,
      lft: 350, kft: 320, uric_acid: 150, calcium: 180, urine_routine: 100,
    },
    bookingUrl: "https://www.thyrocare.com/",
    whatsappNumber: "919870666333",
  },
  {
    id: "lab_srl",
    name: "SRL Diagnostics",
    area: "Multiple (Jayanagar, HSR Layout)",
    nablAccredited: true,
    homeCollection: true,
    prices: {
      tsh: 280, t3_t4: 520, cbc: 300, ferritin: 650, fbs: 150, hba1c: 550,
      b12: 750, hormone_panel: 1700, vitamin_d: 900, lipid_profile: 450,
      lft: 600, kft: 550, uric_acid: 280, calcium: 300, urine_routine: 200,
    },
    bookingUrl: "https://agilusdiagnostics.com/",
    whatsappNumber: "919111591115",
  },
  {
    id: "lab_metropolis",
    name: "Metropolis Healthcare",
    area: "Multiple (BTM Layout, Marathahalli)",
    nablAccredited: true,
    homeCollection: true,
    prices: {
      tsh: 300, t3_t4: 550, cbc: 320, ferritin: 700, fbs: 160, hba1c: 600,
      b12: 800, hormone_panel: 1800, vitamin_d: 950, lipid_profile: 480,
      lft: 650, kft: 580, uric_acid: 300, calcium: 320, urine_routine: 220,
    },
    bookingUrl: "https://www.metropolisindia.com/labs/karnataka/bengaluru",
    whatsappNumber: null,
  },
  {
    id: "lab_govt_bowring",
    name: "Bowring & Lady Curzon Govt. Hospital Lab",
    area: "Shivajinagar",
    address: "Lady Curzon Road, Shivaji Nagar, Near Shivajinagar Bus Stand, Bengaluru - 560001",
    phone: "08025591362",
    nablAccredited: true,
    homeCollection: false,
    prices: {
      tsh: 60, t3_t4: 120, cbc: 40, ferritin: 200, fbs: 30, hba1c: 150,
      b12: 250, hormone_panel: 500, vitamin_d: 300, lipid_profile: 100,
      lft: 150, kft: 130, uric_acid: 60, calcium: 70, urine_routine: 40,
    },
    bookingUrl: null,
    whatsappNumber: null,
  },
  {
    id: "lab_neuberg",
    name: "Neuberg Diagnostics",
    area: "Malleshwaram, Rajajinagar",
    nablAccredited: true,
    homeCollection: true,
    prices: {
      tsh: 250, t3_t4: 480, cbc: 280, ferritin: 600, fbs: 130, hba1c: 500,
      b12: 700, hormone_panel: 1600, vitamin_d: 800, lipid_profile: 400,
      lft: 500, kft: 470, uric_acid: 230, calcium: 260, urine_routine: 150,
    },
    bookingUrl: "https://www.neubergdiagnostics.com/find-lab/bangalore",
    whatsappNumber: "919150568887",
  },
  {
  id: "lab_healthians",
  name: "Healthians",
  area: "Pan-Bangalore (home collection network)",
  nablAccredited: true,
  homeCollection: true,
  prices: {
    tsh: 199, t3_t4: 449, vitamin_d: 440, uric_acid: 171, hba1c: 380,
    cbc: 353, lipid_profile: 497, b12: 571,
    ferritin: 0, fbs: 0, hormone_panel: 0, lft: 0, kft: 0, calcium: 0, urine_routine: 0,
  },
  bookingUrl: "https://www.healthians.com/blood-test/bengaluru",
  whatsappNumber: "919998880005",
},
];