// This file is the "clinical logic" of the product.
// IMPORTANT: These mappings are simplified starting points based on common
// primary-care screening patterns (loosely informed by general ICMR/WHO
// primary-care guidance for the most common presenting complaints).
// Before any real users see this, a licensed doctor MUST review and sign off
// on every rule here. Treat this file as a first draft, not medical advice.
//
// A few conditions here (cardiovascular, liver) include symptoms that can
// signal something urgent. Where that's true, the plainExplanation says so
// directly and pushes the user toward a doctor visit, not just a test.

export type Symptom = {
  id: string;
  label: string;
  category: string;
};

export type TestRecommendation = {
  testId: string;
  reason: string;
  priority: "core" | "conditional"; // core = recommend directly, conditional = only if core results are abnormal or other symptoms co-occur
};

export type Condition = {
  id: string;
  label: string;
  triggerSymptoms: string[];
  minMatches: number;
  recommendedTests: TestRecommendation[];
  plainExplanation: string;
};

export const SYMPTOMS: Symptom[] = [
  // General
  { id: "fatigue", label: "Constant tiredness / low energy", category: "General" },
  { id: "hair_loss", label: "Hair thinning or hair fall", category: "General" },
  { id: "weight_change", label: "Unexplained weight gain or loss", category: "General" },
  { id: "cold_intolerance", label: "Feeling cold often", category: "General" },
  { id: "pale_skin", label: "Pale skin or nails", category: "General" },
  { id: "breathlessness", label: "Breathlessness on mild exertion", category: "General" },
  { id: "dizziness", label: "Dizziness or lightheadedness", category: "General" },
  { id: "joint_pain", label: "Joint or muscle pain", category: "General" },
  { id: "digestive_issues", label: "Bloating, gas, or irregular bowel movements", category: "General" },
  { id: "frequent_headaches", label: "Frequent headaches", category: "General" },
  { id: "night_sweats", label: "Night sweats", category: "General" },
  { id: "loss_of_appetite", label: "Loss of appetite", category: "General" },
  { id: "easy_bruising", label: "Bruising easily or unusually", category: "General" },

  // Women's health
  { id: "irregular_periods", label: "Irregular or missed periods", category: "Women's health" },
  { id: "excess_hair", label: "Excess facial/body hair", category: "Women's health" },
  { id: "acne", label: "Persistent adult acne", category: "Women's health" },
  { id: "hot_flashes", label: "Hot flashes", category: "Women's health" },

  // Metabolic
  { id: "excess_thirst", label: "Excessive thirst or urination", category: "Metabolic" },
  { id: "slow_healing", label: "Cuts/wounds healing slowly", category: "Metabolic" },
  { id: "tingling_hands", label: "Tingling/numbness in hands or feet", category: "Metabolic" },

  // Mental health
  { id: "mood_changes", label: "Low mood or anxiety, new onset", category: "Mental health" },
  { id: "poor_sleep", label: "Trouble sleeping", category: "Mental health" },
  { id: "high_stress", label: "Constant work/study stress", category: "Mental health" },

  // Heart & Kidney
  { id: "chest_discomfort", label: "Chest discomfort or tightness", category: "Heart & Kidney" },
  { id: "palpitations", label: "Noticeable/rapid heartbeat", category: "Heart & Kidney" },
  { id: "swelling_legs", label: "Swelling in legs, feet, or ankles", category: "Heart & Kidney" },

  // Liver & Digestive
  { id: "yellowing_skin_eyes", label: "Yellowing of skin or eyes", category: "Liver & Digestive" },
  { id: "abdominal_discomfort", label: "Ongoing abdominal discomfort", category: "Liver & Digestive" },

  // Urinary
  { id: "frequent_urination", label: "Needing to urinate often", category: "Urinary" },
  { id: "burning_urination", label: "Burning or pain during urination", category: "Urinary" },
  { id: "weak_urine_flow", label: "Weak or interrupted urine flow", category: "Urinary" },

  // Bone & Joint
  { id: "back_pain", label: "Persistent back pain", category: "Bone & Joint" },

  // Senior health
  { id: "memory_issues", label: "Increasing forgetfulness or brain fog", category: "Senior health" },

  // Lifestyle
  { id: "low_sun_exposure", label: "Rarely outdoors during the day", category: "Lifestyle" },
  { id: "sedentary_lifestyle", label: "Mostly sitting, little physical activity", category: "Lifestyle" },
  { id: "screen_heavy_routine", label: "Long daily screen time, poor posture", category: "Lifestyle" },

  // Risk factor
  { id: "family_diabetes", label: "Family history of diabetes", category: "Risk factor" },
  { id: "family_thyroid", label: "Family history of thyroid issues", category: "Risk factor" },
  { id: "family_heart_disease", label: "Family history of heart disease", category: "Risk factor" },
  { id: "family_osteoporosis", label: "Family history of osteoporosis/fractures", category: "Risk factor" },
  { id: "high_bp_history", label: "History of high blood pressure", category: "Risk factor" },
  { id: "age_30_plus", label: "Age 30 or above", category: "Risk factor" },
  { id: "age_45_plus", label: "Age 45 or above", category: "Risk factor" },
  { id: "age_60_plus", label: "Age 60 or above", category: "Risk factor" },
  { id: "vegetarian_diet", label: "Vegetarian / limited meat intake", category: "Risk factor" },
];

export const CONDITIONS: Condition[] = [
  {
    id: "hypothyroidism",
    label: "Possible thyroid imbalance",
    triggerSymptoms: ["fatigue", "hair_loss", "weight_change", "cold_intolerance", "irregular_periods", "family_thyroid"],
    minMatches: 2,
    recommendedTests: [
      { testId: "tsh", reason: "First-line screening test for thyroid function", priority: "core" },
      { testId: "t3_t4", reason: "Only needed if TSH comes back abnormal", priority: "conditional" },
    ],
    plainExplanation: "These symptoms can point to an underactive or overactive thyroid. A TSH test is the standard first check — cheap and usually enough on its own.",
  },
  {
    id: "iron_deficiency_anemia",
    label: "Possible iron-deficiency anemia",
    triggerSymptoms: ["fatigue", "pale_skin", "breathlessness", "dizziness", "hair_loss", "vegetarian_diet"],
    minMatches: 2,
    recommendedTests: [
      { testId: "cbc", reason: "Checks hemoglobin and red blood cell counts directly", priority: "core" },
      { testId: "ferritin", reason: "Confirms iron stores if hemoglobin is low", priority: "conditional" },
    ],
    plainExplanation: "Tiredness, pale skin, and breathlessness are classic anemia signs, especially common with a vegetarian diet. A CBC (complete blood count) is the cheapest way to check.",
  },
  {
    id: "diabetes_risk",
    label: "Possible blood sugar issue",
    triggerSymptoms: ["excess_thirst", "slow_healing", "tingling_hands", "weight_change", "family_diabetes", "age_30_plus"],
    minMatches: 2,
    recommendedTests: [
      { testId: "fbs", reason: "Fasting blood sugar is the standard first screen", priority: "core" },
      { testId: "hba1c", reason: "Gives a 3-month average — useful if fasting sugar is borderline or you want one test instead of fasting", priority: "conditional" },
    ],
    plainExplanation: "Thirst, slow-healing cuts, and tingling hands/feet can be early diabetes signs. A fasting blood sugar test is the cheapest starting point.",
  },
  {
    id: "b12_deficiency",
    label: "Possible Vitamin B12 deficiency",
    triggerSymptoms: ["fatigue", "tingling_hands", "mood_changes", "dizziness", "vegetarian_diet"],
    minMatches: 2,
    recommendedTests: [{ testId: "b12", reason: "Direct measurement of B12 levels", priority: "core" }],
    plainExplanation: "Tingling hands, tiredness, and mood changes combined with a vegetarian diet are a common B12-deficiency pattern in India — very treatable once caught.",
  },
  {
    id: "pcos_screen",
    label: "Possible PCOS-related hormone imbalance",
    triggerSymptoms: ["irregular_periods", "excess_hair", "acne", "weight_change"],
    minMatches: 2,
    recommendedTests: [
      { testId: "tsh", reason: "Rules out thyroid as the cause of irregular periods", priority: "core" },
      { testId: "fbs", reason: "PCOS is linked with insulin resistance", priority: "core" },
      { testId: "hormone_panel", reason: "LH/FSH/testosterone panel — a doctor visit first is strongly recommended before this one, since it's more expensive and needs clinical context", priority: "conditional" },
    ],
    plainExplanation: "Irregular periods with excess hair growth or acne often points to a hormonal pattern like PCOS. Start with the cheaper tests (thyroid + sugar) before the full hormone panel — a doctor should guide whether the full panel is needed.",
  },
  {
    id: "vitamin_d_deficiency",
    label: "Possible Vitamin D deficiency",
    triggerSymptoms: ["fatigue", "joint_pain", "mood_changes", "low_sun_exposure", "screen_heavy_routine"],
    minMatches: 2,
    recommendedTests: [{ testId: "vitamin_d", reason: "Direct measurement — extremely common in young adults with mostly-indoor routines in Indian cities", priority: "core" }],
    plainExplanation: "Tiredness and joint pain combined with little sun exposure (common with desk jobs, long study hours, or heavy screen time) is a classic pattern for Vitamin D deficiency — very common and very treatable.",
  },
  {
    id: "metabolic_syndrome_risk",
    label: "Possible early metabolic risk (cholesterol/sugar)",
    triggerSymptoms: ["weight_change", "sedentary_lifestyle", "family_diabetes", "fatigue"],
    minMatches: 2,
    recommendedTests: [
      { testId: "lipid_profile", reason: "Checks cholesterol and triglyceride levels", priority: "core" },
      { testId: "fbs", reason: "Blood sugar screen, especially relevant with a sedentary routine or family history", priority: "core" },
    ],
    plainExplanation: "A sedentary routine plus weight changes or family history of diabetes is worth an early cholesterol and sugar check — catching this in your 20s is far easier to manage than later.",
  },
  {
    id: "gut_stress_pattern",
    label: "Possible stress-linked digestive pattern",
    triggerSymptoms: ["digestive_issues", "high_stress", "poor_sleep", "frequent_headaches"],
    minMatches: 2,
    recommendedTests: [
      { testId: "cbc", reason: "Rules out anemia or infection as a contributing cause", priority: "core" },
      { testId: "tsh", reason: "Thyroid issues can also cause digestive changes and fatigue", priority: "conditional" },
    ],
    plainExplanation: "Bloating, headaches, and poor sleep together often point to a stress-and-lifestyle pattern rather than something a blood test alone will catch — worth ruling out anemia/thyroid first, but a doctor visit matters more here than more tests.",
  },
  {
    id: "cardiovascular_risk_screen",
    label: "Possible heart/cardiovascular risk",
    triggerSymptoms: ["chest_discomfort", "palpitations", "swelling_legs", "breathlessness", "high_bp_history", "family_heart_disease", "age_45_plus"],
    minMatches: 2,
    recommendedTests: [
      { testId: "lipid_profile", reason: "Cholesterol is a core piece of cardiovascular risk", priority: "core" },
      { testId: "fbs", reason: "Blood sugar is closely linked to heart risk", priority: "core" },
      { testId: "kft", reason: "Kidney function often checked alongside heart risk factors", priority: "conditional" },
    ],
    plainExplanation: "Chest discomfort, palpitations, or leg swelling — especially alongside a blood pressure history or family history of heart disease — should not wait on a lab test alone. Please see a doctor promptly for a proper check (blood pressure and a physical exam), and use these tests as a supplement, not a substitute.",
  },
  {
    id: "kidney_health_screen",
    label: "Possible kidney function concern",
    triggerSymptoms: ["swelling_legs", "frequent_urination", "fatigue", "high_bp_history", "family_diabetes"],
    minMatches: 2,
    recommendedTests: [
      { testId: "kft", reason: "Checks creatinine and kidney function directly", priority: "core" },
      { testId: "urine_routine", reason: "Simple urine test that flags several kidney and urinary issues early", priority: "core" },
    ],
    plainExplanation: "Swelling in the legs combined with fatigue or a history of high blood pressure/diabetes is worth a basic kidney function check — both tests here are inexpensive and widely available.",
  },
  {
    id: "liver_health_screen",
    label: "Possible liver function concern",
    triggerSymptoms: ["yellowing_skin_eyes", "loss_of_appetite", "abdominal_discomfort", "fatigue", "weight_change"],
    minMatches: 2,
    recommendedTests: [{ testId: "lft", reason: "Direct check of liver enzyme levels", priority: "core" }],
    plainExplanation: "Yellowing of the skin or eyes, appetite loss, and abdominal discomfort together can point to a liver issue that deserves prompt attention — please see a doctor soon rather than waiting on a lab report alone, especially if the yellowing is new.",
  },
  {
    id: "gout_uric_acid_screen",
    label: "Possible high uric acid / gout risk",
    triggerSymptoms: ["joint_pain", "sedentary_lifestyle", "weight_change"],
    minMatches: 2,
    recommendedTests: [{ testId: "uric_acid", reason: "Direct measurement of uric acid levels", priority: "core" }],
    plainExplanation: "Joint pain — especially in a single joint like the big toe, ankle, or knee — combined with a sedentary routine or weight changes is worth a uric acid check.",
  },
  {
    id: "bone_joint_health_screen",
    label: "Possible bone health risk (calcium/Vitamin D)",
    triggerSymptoms: ["back_pain", "joint_pain", "low_sun_exposure", "age_45_plus", "family_osteoporosis"],
    minMatches: 2,
    recommendedTests: [
      { testId: "calcium", reason: "Checks calcium levels relevant to bone health", priority: "core" },
      { testId: "vitamin_d", reason: "Vitamin D is essential for calcium absorption and bone strength", priority: "core" },
    ],
    plainExplanation: "Ongoing back or joint pain with limited sun exposure — especially with a family history of fractures or osteoporosis — is worth a basic bone-health check, particularly from your 40s onward.",
  },
  {
    id: "menopause_hormone_pattern",
    label: "Possible menopause-related hormone shift",
    triggerSymptoms: ["hot_flashes", "night_sweats", "mood_changes", "irregular_periods", "age_45_plus"],
    minMatches: 2,
    recommendedTests: [
      { testId: "tsh", reason: "Thyroid changes can mimic or worsen menopause symptoms", priority: "core" },
      { testId: "fbs", reason: "Metabolic and cardiovascular risk rises after menopause", priority: "conditional" },
      { testId: "lipid_profile", reason: "Cholesterol is worth monitoring more closely around this life stage", priority: "conditional" },
    ],
    plainExplanation: "Hot flashes, night sweats, and mood or cycle changes together are a common menopause-related pattern. These tests rule out other causes — a doctor visit is the right next step for hormone-specific guidance.",
  },
  {
    id: "urinary_prostate_screen",
    label: "Possible urinary tract or prostate-related pattern",
    triggerSymptoms: ["frequent_urination", "burning_urination", "weak_urine_flow", "age_45_plus"],
    minMatches: 2,
    recommendedTests: [{ testId: "urine_routine", reason: "First, inexpensive step to check for infection or other urinary issues", priority: "core" }],
    plainExplanation: "Frequent urination, burning, or a weak stream can have several causes — infection, or in men over 45, a prostate-related pattern worth discussing with a doctor directly (a PSA test, if needed, should be ordered by a doctor after a conversation, not self-ordered).",
  },
  {
    id: "memory_cognitive_screen",
    label: "Possible reversible cause of memory/concentration changes",
    triggerSymptoms: ["memory_issues", "fatigue", "mood_changes", "age_60_plus"],
    minMatches: 2,
    recommendedTests: [
      { testId: "b12", reason: "B12 deficiency is a common, very treatable cause of memory and concentration issues", priority: "core" },
      { testId: "tsh", reason: "Thyroid imbalance can also affect memory and mood", priority: "core" },
    ],
    plainExplanation: "Before assuming memory changes are just part of aging, it's worth ruling out B12 deficiency and thyroid imbalance — both common and very treatable. A doctor visit for a proper cognitive assessment is still the right next step alongside these tests.",
  },
];