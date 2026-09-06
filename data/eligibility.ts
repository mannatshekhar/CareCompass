// Eligibility rules for government schemes relevant to Bangalore/Karnataka users.
// Based on publicly reported scheme structures as of 2026. Coverage details,
// income cutoffs, and card requirements change — this must be reverified
// against official scheme portals (pmjay.gov.in, Suvarna Arogya Suraksha
// Trust) before being treated as authoritative.

export type EligibilityAnswer = {
  hasRationCard: "BPL" | "APL" | "none" | "unsure";
  age: number;
  monthlyHouseholdIncomeINR: number | null; // null = unsure/prefers not to say
};

export type SchemeResult = {
  schemeId: string;
  schemeName: string;
  likelyEligible: boolean;
  confidence: "high" | "medium" | "low";
  whatItCovers: string;
  nextStep: string;
};

// Ration card ownership is only asked in the UI for users aged 35+
// (younger users are unlikely to hold or know their household's ration
// card status). Below that age, eligibility falls back to income alone.
const RATION_CARD_QUESTION_MIN_AGE = 35;

export function checkEligibility(answers: EligibilityAnswer): SchemeResult[] {
  const results: SchemeResult[] = [];
  const rationCardWasAsked = answers.age >= RATION_CARD_QUESTION_MIN_AGE;

  // Ayushman Bharat - Arogya Karnataka (integrated scheme)
  // Roughly targets bottom 40-50% by income / BPL card holders
  if (rationCardWasAsked && answers.hasRationCard === "BPL") {
    results.push({
      schemeId: "ab_arogya_karnataka",
      schemeName: "Ayushman Bharat – Arogya Karnataka",
      likelyEligible: true,
      confidence: "high",
      whatItCovers:
        "Covers 1,614+ treatment packages including many diagnostic tests, free at empanelled government and private hospitals.",
      nextStep:
        "Visit any empanelled hospital with your ration card and Aadhaar to get your Ayushman card made, or check pmjay.gov.in for the nearest empanelled centre.",
    });
  } else if (
    answers.monthlyHouseholdIncomeINR !== null &&
    answers.monthlyHouseholdIncomeINR < 15000
  ) {
    results.push({
      schemeId: "ab_arogya_karnataka",
      schemeName: "Ayushman Bharat – Arogya Karnataka",
      likelyEligible: true,
      confidence: "medium",
      whatItCovers:
        "Based on your income range, you likely qualify. Coverage includes many diagnostic tests at empanelled centres.",
      nextStep: rationCardWasAsked
        ? "Check your ration card category (BPL/APL) or visit your nearest Ayushman health centre to confirm eligibility."
        : "Visit your nearest Ayushman health centre to confirm eligibility and check if your household holds a ration card.",
    });
  } else {
    results.push({
      schemeId: "ab_arogya_karnataka",
      schemeName: "Ayushman Bharat – Arogya Karnataka",
      likelyEligible: false,
      confidence: "low",
      whatItCovers:
        "Covers 1,614+ treatment packages including many diagnostic tests, free at empanelled hospitals.",
      nextStep:
        "You may not qualify by income, but it's still worth checking — some categories (senior citizens 70+) qualify regardless of income.",
    });
  }

  // Senior citizen universal coverage (70+, regardless of income)
  if (answers.age >= 70) {
    results.push({
      schemeId: "ab_senior",
      schemeName: "Ayushman Bharat Senior Citizen Coverage (70+)",
      likelyEligible: true,
      confidence: "high",
      whatItCovers: "Free coverage regardless of income, for all citizens aged 70 and above.",
      nextStep: "Register at any empanelled hospital or Ayushman health centre with proof of age.",
    });
  }

  // Gruha Arogya Yojane - free door-to-door NCD + anemia screening
  if (answers.age >= 30) {
    results.push({
      schemeId: "gruha_arogya",
      schemeName: "Gruha Arogya Yojane (Karnataka)",
      likelyEligible: true,
      confidence: "high",
      whatItCovers:
        "Free door-to-door screening for diabetes, hypertension, and other NCDs for anyone aged 30+, run by ASHA workers.",
      nextStep:
        "No application needed — this is a door-to-door government screening drive. Ask your local ASHA worker or nearest Ayushman Health & Wellness Centre when the next screening camp is.",
    });
  } else if (answers.age >= 19 && answers.age <= 29) {
    results.push({
      schemeId: "gruha_arogya_anemia",
      schemeName: "Gruha Arogya Yojane – Anemia Screening (19–29 age group)",
      likelyEligible: true,
      confidence: "high",
      whatItCovers: "Free anemia screening specifically for the 19–29 age group under this Karnataka scheme.",
      nextStep: "Ask your nearest Ayushman Health & Wellness Centre about anemia screening camp dates.",
    });
  }

  return results;
}