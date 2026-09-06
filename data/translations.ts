import { Lang } from "@/lib/i18n";

// IMPORTANT: same caveat as lib/i18n.tsx — these are AI-assisted
// translations, not professionally reviewed medical translations.
// Hindi is reasonably complete (including condition explanations).
// Kannada currently covers symptom labels, category names, and condition
// titles, but NOT the longer condition explanations yet — those fall back
// to English automatically (see translateConditionExplanation below) until
// a native Kannada speaker (ideally with medical background) reviews and
// completes them. Do not treat any of this as production-ready without
// that review — wording precision matters a lot in a health product.

export const CATEGORY_LABELS: Record<Lang, Record<string, string>> = {
  en: {
    "General": "General",
    "Women's health": "Women's health",
    "Metabolic": "Metabolic",
    "Mental health": "Mental health",
    "Heart & Kidney": "Heart & Kidney",
    "Liver & Digestive": "Liver & Digestive",
    "Urinary": "Urinary",
    "Bone & Joint": "Bone & Joint",
    "Senior health": "Senior health",
    "Lifestyle": "Lifestyle",
    "Risk factor": "Risk factor",
  },
  hi: {
    "General": "सामान्य",
    "Women's health": "महिला स्वास्थ्य",
    "Metabolic": "चयापचय (मेटाबॉलिज़्म)",
    "Mental health": "मानसिक स्वास्थ्य",
    "Heart & Kidney": "हृदय और किडनी",
    "Liver & Digestive": "लिवर और पाचन",
    "Urinary": "मूत्र संबंधी",
    "Bone & Joint": "हड्डी और जोड़",
    "Senior health": "वरिष्ठ स्वास्थ्य",
    "Lifestyle": "जीवनशैली",
    "Risk factor": "जोखिम कारक",
  },
  kn: {
    "General": "ಸಾಮಾನ್ಯ",
    "Women's health": "ಮಹಿಳಾ ಆರೋಗ್ಯ",
    "Metabolic": "ಚಯಾಪಚಯ",
    "Mental health": "ಮಾನಸಿಕ ಆರೋಗ್ಯ",
    "Heart & Kidney": "ಹೃದಯ ಮತ್ತು ಮೂತ್ರಪಿಂಡ",
    "Liver & Digestive": "ಯಕೃತ್ ಮತ್ತು ಜೀರ್ಣಕ್ರಿಯೆ",
    "Urinary": "ಮೂತ್ರ ಸಂಬಂಧಿತ",
    "Bone & Joint": "ಮೂಳೆ ಮತ್ತು ಕೀಲು",
    "Senior health": "ಹಿರಿಯರ ಆರೋಗ್ಯ",
    "Lifestyle": "ಜೀವನಶೈಲಿ",
    "Risk factor": "ಅಪಾಯದ ಅಂಶ",
  },
};

export const SYMPTOM_LABELS: Record<Lang, Record<string, string>> = {
  en: {
    fatigue: "Constant tiredness / low energy",
    hair_loss: "Hair thinning or hair fall",
    weight_change: "Unexplained weight gain or loss",
    cold_intolerance: "Feeling cold often",
    pale_skin: "Pale skin or nails",
    breathlessness: "Breathlessness on mild exertion",
    dizziness: "Dizziness or lightheadedness",
    joint_pain: "Joint or muscle pain",
    digestive_issues: "Bloating, gas, or irregular bowel movements",
    frequent_headaches: "Frequent headaches",
    night_sweats: "Night sweats",
    loss_of_appetite: "Loss of appetite",
    easy_bruising: "Bruising easily or unusually",
    irregular_periods: "Irregular or missed periods",
    excess_hair: "Excess facial/body hair",
    acne: "Persistent adult acne",
    hot_flashes: "Hot flashes",
    excess_thirst: "Excessive thirst or urination",
    slow_healing: "Cuts/wounds healing slowly",
    tingling_hands: "Tingling/numbness in hands or feet",
    mood_changes: "Low mood or anxiety, new onset",
    poor_sleep: "Trouble sleeping",
    high_stress: "Constant work/study stress",
    chest_discomfort: "Chest discomfort or tightness",
    palpitations: "Noticeable/rapid heartbeat",
    swelling_legs: "Swelling in legs, feet, or ankles",
    yellowing_skin_eyes: "Yellowing of skin or eyes",
    abdominal_discomfort: "Ongoing abdominal discomfort",
    frequent_urination: "Needing to urinate often",
    burning_urination: "Burning or pain during urination",
    weak_urine_flow: "Weak or interrupted urine flow",
    back_pain: "Persistent back pain",
    memory_issues: "Increasing forgetfulness or brain fog",
    low_sun_exposure: "Rarely outdoors during the day",
    sedentary_lifestyle: "Mostly sitting, little physical activity",
    screen_heavy_routine: "Long daily screen time, poor posture",
    family_diabetes: "Family history of diabetes",
    family_thyroid: "Family history of thyroid issues",
    family_heart_disease: "Family history of heart disease",
    family_osteoporosis: "Family history of osteoporosis/fractures",
    high_bp_history: "History of high blood pressure",
    age_30_plus: "Age 30 or above",
    age_45_plus: "Age 45 or above",
    age_60_plus: "Age 60 or above",
    vegetarian_diet: "Vegetarian / limited meat intake",
  },
  hi: {
    fatigue: "लगातार थकान / कम ऊर्जा",
    hair_loss: "बाल पतले होना या झड़ना",
    weight_change: "बिना कारण वजन बढ़ना या घटना",
    cold_intolerance: "अक्सर ठंड महसूस होना",
    pale_skin: "त्वचा या नाखूनों का पीला पड़ना",
    breathlessness: "हल्के काम में भी सांस फूलना",
    dizziness: "चक्कर आना या सिर हल्का महसूस होना",
    joint_pain: "जोड़ों या मांसपेशियों में दर्द",
    digestive_issues: "पेट फूलना, गैस, या अनियमित मल त्याग",
    frequent_headaches: "बार-बार सिरदर्द",
    night_sweats: "रात में पसीना आना",
    loss_of_appetite: "भूख न लगना",
    easy_bruising: "आसानी से या असामान्य रूप से चोट के निशान पड़ना",
    irregular_periods: "अनियमित या छूटे हुए मासिक धर्म",
    excess_hair: "चेहरे/शरीर पर अत्यधिक बाल",
    acne: "वयस्क अवस्था में लगातार मुंहासे",
    hot_flashes: "गर्मी की लहरें (हॉट फ्लैशेज़)",
    excess_thirst: "अत्यधिक प्यास या पेशाब आना",
    slow_healing: "कट/घाव धीरे भरना",
    tingling_hands: "हाथों या पैरों में झुनझुनी/सुन्नपन",
    mood_changes: "मन उदास रहना या नई चिंता महसूस होना",
    poor_sleep: "नींद न आना",
    high_stress: "लगातार काम/पढ़ाई का तनाव",
    chest_discomfort: "छाती में बेचैनी या जकड़न",
    palpitations: "दिल की धड़कन तेज़ या स्पष्ट महसूस होना",
    swelling_legs: "पैरों, तलवों या टखनों में सूजन",
    yellowing_skin_eyes: "त्वचा या आंखों का पीला पड़ना",
    abdominal_discomfort: "पेट में लगातार बेचैनी",
    frequent_urination: "बार-बार पेशाब आना",
    burning_urination: "पेशाब करते समय जलन या दर्द",
    weak_urine_flow: "पेशाब की धार कमज़ोर या रुक-रुक कर आना",
    back_pain: "लगातार पीठ दर्द",
    memory_issues: "भूलने की समस्या बढ़ना या दिमाग सुस्त महसूस होना",
    low_sun_exposure: "दिन में शायद ही बाहर निकलना (धूप कम मिलना)",
    sedentary_lifestyle: "ज्यादातर बैठे रहना, कम शारीरिक गतिविधि",
    screen_heavy_routine: "रोज़ाना लंबे समय तक स्क्रीन देखना, गलत मुद्रा",
    family_diabetes: "परिवार में डायबिटीज़ का इतिहास",
    family_thyroid: "परिवार में थायरॉइड की समस्या का इतिहास",
    family_heart_disease: "परिवार में हृदय रोग का इतिहास",
    family_osteoporosis: "परिवार में ऑस्टियोपोरोसिस/फ्रैक्चर का इतिहास",
    high_bp_history: "उच्च रक्तचाप का इतिहास",
    age_30_plus: "उम्र 30 या उससे अधिक",
    age_45_plus: "उम्र 45 या उससे अधिक",
    age_60_plus: "उम्र 60 या उससे अधिक",
    vegetarian_diet: "शाकाहारी / मांस का सीमित सेवन",
  },
  kn: {
    fatigue: "ನಿರಂತರ ಆಯಾಸ / ಕಡಿಮೆ ಶಕ್ತಿ",
    hair_loss: "ಕೂದಲು ತೆಳುವಾಗುವುದು ಅಥವಾ ಉದುರುವುದು",
    weight_change: "ಕಾರಣವಿಲ್ಲದೆ ತೂಕ ಹೆಚ್ಚಾಗುವುದು ಅಥವಾ ಕಡಿಮೆಯಾಗುವುದು",
    cold_intolerance: "ಆಗಾಗ್ಗೆ ಚಳಿ ಅನಿಸುವುದು",
    pale_skin: "ಚರ್ಮ ಅಥವಾ ಉಗುರುಗಳು ಬಿಳಿಚಿಕೊಳ್ಳುವುದು",
    breathlessness: "ಸ್ವಲ್ಪ ಶ್ರಮದಲ್ಲೂ ಉಸಿರಾಟದ ತೊಂದರೆ",
    dizziness: "ತಲೆ ಸುತ್ತುವುದು ಅಥವಾ ಹಗುರ ಅನಿಸುವುದು",
    joint_pain: "ಕೀಲು ಅಥವಾ ಸ್ನಾಯು ನೋವು",
    digestive_issues: "ಹೊಟ್ಟೆ ಉಬ್ಬರ, ಗ್ಯಾಸ್, ಅಥವಾ ಅನಿಯಮಿತ ಮಲವಿಸರ್ಜನೆ",
    frequent_headaches: "ಆಗಾಗ್ಗೆ ತಲೆನೋವು",
    night_sweats: "ರಾತ್ರಿ ಬೆವರುವುದು",
    loss_of_appetite: "ಹಸಿವು ಕಡಿಮೆಯಾಗುವುದು",
    easy_bruising: "ಸುಲಭವಾಗಿ ಅಥವಾ ಅಸಹಜವಾಗಿ ಗಾಯದ ಗುರುತು ಬೀಳುವುದು",
    irregular_periods: "ಅನಿಯಮಿತ ಅಥವಾ ತಪ್ಪಿದ ಮುಟ್ಟು",
    excess_hair: "ಮುಖ/ದೇಹದಲ್ಲಿ ಅತಿಯಾದ ಕೂದಲು",
    acne: "ವಯಸ್ಕರಲ್ಲಿ ನಿರಂತರ ಮೊಡವೆ",
    hot_flashes: "ಹಾಟ್ ಫ್ಲಾಶಸ್ (ಇದ್ದಕ್ಕಿದ್ದಂತೆ ಬಿಸಿ ಅನಿಸುವುದು)",
    excess_thirst: "ಅತಿಯಾದ ಬಾಯಾರಿಕೆ ಅಥವಾ ಮೂತ್ರ ವಿಸರ್ಜನೆ",
    slow_healing: "ಗಾಯಗಳು ನಿಧಾನವಾಗಿ ವಾಸಿಯಾಗುವುದು",
    tingling_hands: "ಕೈ ಅಥವಾ ಕಾಲುಗಳಲ್ಲಿ ಜುಮ್ಮೆನಿಸುವಿಕೆ/ಮರಗಟ್ಟುವಿಕೆ",
    mood_changes: "ಮನಸ್ಸು ಕುಗ್ಗುವುದು ಅಥವಾ ಹೊಸದಾಗಿ ಆತಂಕ",
    poor_sleep: "ನಿದ್ರೆಯ ತೊಂದರೆ",
    high_stress: "ನಿರಂತರ ಕೆಲಸ/ಓದಿನ ಒತ್ತಡ",
    chest_discomfort: "ಎದೆಯಲ್ಲಿ ಅಸ್ವಸ್ಥತೆ ಅಥವಾ ಬಿಗಿತ",
    palpitations: "ಹೃದಯ ಬಡಿತ ವೇಗವಾಗಿ ಅಥವಾ ಸ್ಪಷ್ಟವಾಗಿ ಅನಿಸುವುದು",
    swelling_legs: "ಕಾಲುಗಳು, ಪಾದಗಳು ಅಥವಾ ಪಾದದ ಗಂಟುಗಳಲ್ಲಿ ಊತ",
    yellowing_skin_eyes: "ಚರ್ಮ ಅಥವಾ ಕಣ್ಣುಗಳು ಹಳದಿಯಾಗುವುದು",
    abdominal_discomfort: "ಹೊಟ್ಟೆಯಲ್ಲಿ ನಿರಂತರ ಅಸ್ವಸ್ಥತೆ",
    frequent_urination: "ಆಗಾಗ್ಗೆ ಮೂತ್ರ ವಿಸರ್ಜನೆ ಅಗತ್ಯ",
    burning_urination: "ಮೂತ್ರ ವಿಸರ್ಜನೆ ಸಮಯದಲ್ಲಿ ಉರಿ ಅಥವಾ ನೋವು",
    weak_urine_flow: "ಮೂತ್ರದ ಹರಿವು ದುರ್ಬಲ ಅಥವಾ ಅಡಚಣೆಯಾಗುವುದು",
    back_pain: "ನಿರಂತರ ಬೆನ್ನು ನೋವು",
    memory_issues: "ಮರೆವು ಹೆಚ್ಚಾಗುವುದು ಅಥವಾ ತಲೆ ಮಂಜಾಗಿರುವುದು",
    low_sun_exposure: "ಹಗಲಿನಲ್ಲಿ ವಿರಳವಾಗಿ ಹೊರಗೆ ಹೋಗುವುದು",
    sedentary_lifestyle: "ಹೆಚ್ಚಾಗಿ ಕುಳಿತುಕೊಳ್ಳುವುದು, ಕಡಿಮೆ ದೈಹಿಕ ಚಟುವಟಿಕೆ",
    screen_heavy_routine: "ದಿನನಿತ್ಯ ದೀರ್ಘ ಸ್ಕ್ರೀನ್ ಸಮಯ, ಸರಿಯಿಲ್ಲದ ಭಂಗಿ",
    family_diabetes: "ಕುಟುಂಬದಲ್ಲಿ ಮಧುಮೇಹದ ಇತಿಹಾಸ",
    family_thyroid: "ಕುಟುಂಬದಲ್ಲಿ ಥೈರಾಯ್ಡ್ ಸಮಸ್ಯೆಯ ಇತಿಹಾಸ",
    family_heart_disease: "ಕುಟುಂಬದಲ್ಲಿ ಹೃದಯ ಕಾಯಿಲೆಯ ಇತಿಹಾಸ",
    family_osteoporosis: "ಕುಟುಂಬದಲ್ಲಿ ಆಸ್ಟಿಯೊಪೊರೋಸಿಸ್/ಮೂಳೆ ಮುರಿತದ ಇತಿಹಾಸ",
    high_bp_history: "ಅಧಿಕ ರಕ್ತದೊತ್ತಡದ ಇತಿಹಾಸ",
    age_30_plus: "ವಯಸ್ಸು 30 ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚು",
    age_45_plus: "ವಯಸ್ಸು 45 ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚು",
    age_60_plus: "ವಯಸ್ಸು 60 ಅಥವಾ ಅದಕ್ಕಿಂತ ಹೆಚ್ಚು",
    vegetarian_diet: "ಸಸ್ಯಾಹಾರಿ / ಮಾಂಸ ಸೇವನೆ ಸೀಮಿತ",
  },
};

export const CONDITION_TITLES: Record<Lang, Record<string, string>> = {
  en: {
    hypothyroidism: "Possible thyroid imbalance",
    iron_deficiency_anemia: "Possible iron-deficiency anemia",
    diabetes_risk: "Possible blood sugar issue",
    b12_deficiency: "Possible Vitamin B12 deficiency",
    pcos_screen: "Possible PCOS-related hormone imbalance",
    vitamin_d_deficiency: "Possible Vitamin D deficiency",
    metabolic_syndrome_risk: "Possible early metabolic risk (cholesterol/sugar)",
    gut_stress_pattern: "Possible stress-linked digestive pattern",
    cardiovascular_risk_screen: "Possible heart/cardiovascular risk",
    kidney_health_screen: "Possible kidney function concern",
    liver_health_screen: "Possible liver function concern",
    gout_uric_acid_screen: "Possible high uric acid / gout risk",
    bone_joint_health_screen: "Possible bone health risk (calcium/Vitamin D)",
    menopause_hormone_pattern: "Possible menopause-related hormone shift",
    urinary_prostate_screen: "Possible urinary tract or prostate-related pattern",
    memory_cognitive_screen: "Possible reversible cause of memory/concentration changes",
  },
  hi: {
    hypothyroidism: "संभावित थायरॉइड असंतुलन",
    iron_deficiency_anemia: "संभावित आयरन की कमी से एनीमिया",
    diabetes_risk: "संभावित ब्लड शुगर की समस्या",
    b12_deficiency: "संभावित विटामिन B12 की कमी",
    pcos_screen: "संभावित PCOS से जुड़ा हार्मोन असंतुलन",
    vitamin_d_deficiency: "संभावित विटामिन D की कमी",
    metabolic_syndrome_risk: "संभावित शुरुआती मेटाबॉलिक जोखिम (कोलेस्ट्रॉल/शुगर)",
    gut_stress_pattern: "संभावित तनाव से जुड़ी पाचन समस्या",
    cardiovascular_risk_screen: "संभावित हृदय संबंधी जोखिम",
    kidney_health_screen: "संभावित किडनी कार्यक्षमता की चिंता",
    liver_health_screen: "संभावित लिवर कार्यक्षमता की चिंता",
    gout_uric_acid_screen: "संभावित उच्च यूरिक एसिड / गठिया जोखिम",
    bone_joint_health_screen: "संभावित हड्डी स्वास्थ्य जोखिम (कैल्शियम/विटामिन D)",
    menopause_hormone_pattern: "संभावित मेनोपॉज़ से जुड़ा हार्मोन बदलाव",
    urinary_prostate_screen: "संभावित मूत्र मार्ग या प्रोस्टेट से जुड़ी समस्या",
    memory_cognitive_screen: "याददाश्त/एकाग्रता में बदलाव का संभावित उलटने योग्य कारण",
  },
  kn: {
    hypothyroidism: "ಸಂಭವನೀಯ ಥೈರಾಯ್ಡ್ ಅಸಮತೋಲನ",
    iron_deficiency_anemia: "ಸಂಭವನೀಯ ಕಬ್ಬಿಣದ ಕೊರತೆಯ ರಕ್ತಹೀನತೆ",
    diabetes_risk: "ಸಂಭವನೀಯ ರಕ್ತದ ಸಕ್ಕರೆ ಸಮಸ್ಯೆ",
    b12_deficiency: "ಸಂಭವನೀಯ ವಿಟಮಿನ್ B12 ಕೊರತೆ",
    pcos_screen: "ಸಂಭವನೀಯ PCOS ಸಂಬಂಧಿತ ಹಾರ್ಮೋನ್ ಅಸಮತೋಲನ",
    vitamin_d_deficiency: "ಸಂಭವನೀಯ ವಿಟಮಿನ್ D ಕೊರತೆ",
    metabolic_syndrome_risk: "ಸಂಭವನೀಯ ಆರಂಭಿಕ ಚಯಾಪಚಯ ಅಪಾಯ (ಕೊಲೆಸ್ಟ್ರಾಲ್/ಸಕ್ಕರೆ)",
    gut_stress_pattern: "ಸಂಭವನೀಯ ಒತ್ತಡ ಸಂಬಂಧಿತ ಜೀರ್ಣಕ್ರಿಯೆ ಮಾದರಿ",
    cardiovascular_risk_screen: "ಸಂಭವನೀಯ ಹೃದಯ ಸಂಬಂಧಿತ ಅಪಾಯ",
    kidney_health_screen: "ಸಂಭವನೀಯ ಮೂತ್ರಪಿಂಡದ ಕಾರ್ಯ ಸಮಸ್ಯೆ",
    liver_health_screen: "ಸಂಭವನೀಯ ಯಕೃತ್ ಕಾರ್ಯ ಸಮಸ್ಯೆ",
    gout_uric_acid_screen: "ಸಂಭವನೀಯ ಅಧಿಕ ಯೂರಿಕ್ ಆಮ್ಲ / ಗೌಟ್ ಅಪಾಯ",
    bone_joint_health_screen: "ಸಂಭವನೀಯ ಮೂಳೆ ಆರೋಗ್ಯ ಅಪಾಯ (ಕ್ಯಾಲ್ಸಿಯಂ/ವಿಟಮಿನ್ D)",
    menopause_hormone_pattern: "ಸಂಭವನೀಯ ಋತುಬಂಧ ಸಂಬಂಧಿತ ಹಾರ್ಮೋನ್ ಬದಲಾವಣೆ",
    urinary_prostate_screen: "ಸಂಭವನೀಯ ಮೂತ್ರನಾಳ ಅಥವಾ ಪ್ರಾಸ್ಟೇಟ್ ಸಂಬಂಧಿತ ಮಾದರಿ",
    memory_cognitive_screen: "ನೆನಪಿನ ಶಕ್ತಿ/ಏಕಾಗ್ರತೆ ಬದಲಾವಣೆಗೆ ಸಂಭವನೀಯ ಸರಿಪಡಿಸಬಹುದಾದ ಕಾರಣ",
  },
};

// Kannada explanations intentionally omitted for now — see file header note.
// The lookup functions below fall back to English automatically.
export const CONDITION_EXPLANATIONS: Partial<Record<Lang, Record<string, string>>> = {
  hi: {
    hypothyroidism:
      "ये लक्षण थायरॉइड के कम या ज़्यादा सक्रिय होने की ओर इशारा कर सकते हैं। TSH टेस्ट पहली जांच के तौर पर सबसे सही है — सस्ता है और अक्सर अकेले ही काफी होता है।",
    iron_deficiency_anemia:
      "थकान, पीली त्वचा, और सांस फूलना एनीमिया के सामान्य लक्षण हैं, खासकर शाकाहारी खानपान में। CBC (कम्प्लीट ब्लड काउंट) जांचने का सबसे सस्ता तरीका है।",
    diabetes_risk:
      "प्यास ज़्यादा लगना, घाव धीरे भरना, और हाथ-पैरों में झुनझुनी डायबिटीज़ के शुरुआती संकेत हो सकते हैं। फास्टिंग ब्लड शुगर टेस्ट शुरुआत के लिए सबसे सस्ता विकल्प है।",
    b12_deficiency:
      "हाथों में झुनझुनी, थकान, और मूड में बदलाव — शाकाहारी खानपान के साथ — भारत में B12 की कमी का सामान्य पैटर्न है। पकड़ में आने पर यह आसानी से ठीक हो जाता है।",
    pcos_screen:
      "अनियमित मासिक धर्म के साथ अत्यधिक बाल या मुंहासे अक्सर PCOS जैसे हार्मोनल पैटर्न की ओर इशारा करते हैं। पूरे हार्मोन पैनल से पहले सस्ते टेस्ट (थायरॉइड + शुगर) से शुरुआत करें — पूरा पैनल ज़रूरी है या नहीं, यह डॉक्टर तय करें।",
    vitamin_d_deficiency:
      "थकान और जोड़ों का दर्द, कम धूप मिलने के साथ (डेस्क जॉब, पढ़ाई के लंबे घंटे, या ज़्यादा स्क्रीन टाइम में आम) — यह विटामिन D की कमी का सामान्य पैटर्न है, जो बहुत आम और आसानी से ठीक होने वाला है।",
    metabolic_syndrome_risk:
      "बैठे रहने वाली दिनचर्या के साथ वजन में बदलाव या परिवार में डायबिटीज़ का इतिहास होने पर जल्दी कोलेस्ट्रॉल और शुगर जांच कराना अच्छा है — 20 की उम्र में पकड़ में आना बाद की उम्र से कहीं आसान होता है।",
    gut_stress_pattern:
      "पेट फूलना, सिरदर्द, और नींद न आना अक्सर तनाव और जीवनशैली से जुड़ी समस्या की ओर इशारा करते हैं, न कि सिर्फ ब्लड टेस्ट से पकड़ में आने वाली चीज़। पहले एनीमिया/थायरॉइड को नकारना ठीक है, लेकिन यहां डॉक्टर से मिलना ज़्यादा ज़रूरी है टेस्ट से।",
    cardiovascular_risk_screen:
      "छाती में बेचैनी, दिल की तेज़ धड़कन, या पैरों में सूजन — खासकर उच्च रक्तचाप या परिवार में हृदय रोग के इतिहास के साथ — सिर्फ लैब टेस्ट के भरोसे नहीं छोड़नी चाहिए। कृपया जल्द से जल्द डॉक्टर से मिलें (ब्लड प्रेशर और शारीरिक जांच के लिए), और इन टेस्ट को सिर्फ अतिरिक्त जानकारी के तौर पर लें, विकल्प के तौर पर नहीं।",
    kidney_health_screen:
      "पैरों में सूजन के साथ थकान या उच्च रक्तचाप/डायबिटीज़ का इतिहास होने पर बुनियादी किडनी फंक्शन जांच कराना ठीक रहेगा — यहां दोनों टेस्ट सस्ते और आसानी से उपलब्ध हैं।",
    liver_health_screen:
      "त्वचा या आंखों का पीला पड़ना, भूख कम लगना, और पेट में बेचैनी — साथ में होने पर लिवर की समस्या की ओर इशारा कर सकते हैं, जिस पर तुरंत ध्यान देना ज़रूरी है। कृपया सिर्फ लैब रिपोर्ट का इंतज़ार न करें, जल्द डॉक्टर से मिलें — खासकर अगर पीलापन नया है।",
    gout_uric_acid_screen:
      "जोड़ों का दर्द — खासकर पैर के अंगूठे, टखने, या घुटने जैसे किसी एक जोड़ में — बैठे रहने वाली दिनचर्या या वजन में बदलाव के साथ होने पर यूरिक एसिड जांच कराना ठीक रहेगा।",
    bone_joint_health_screen:
      "पीठ या जोड़ों में लगातार दर्द, कम धूप मिलने के साथ — खासकर परिवार में फ्रैक्चर या ऑस्टियोपोरोसिस का इतिहास होने पर — बुनियादी हड्डी स्वास्थ्य जांच कराना ठीक रहेगा, खासकर 40 की उम्र के बाद।",
    menopause_hormone_pattern:
      "गर्मी की लहरें, रात में पसीना, और मूड या साइकिल में बदलाव — साथ में होने पर मेनोपॉज़ से जुड़ा सामान्य पैटर्न हैं। ये टेस्ट अन्य कारणों को नकारने में मदद करते हैं — हार्मोन से जुड़ी सही सलाह के लिए डॉक्टर से मिलना अगला सही कदम है।",
    urinary_prostate_screen:
      "बार-बार पेशाब आना, जलन, या धार कमज़ोर होना कई कारणों से हो सकता है — संक्रमण, या 45 से ऊपर के पुरुषों में प्रोस्टेट से जुड़ा पैटर्न, जिस पर डॉक्टर से सीधे बात करना ज़रूरी है (PSA टेस्ट, अगर ज़रूरत हो, तो डॉक्टर की सलाह के बाद ही कराएं, खुद से नहीं)।",
    memory_cognitive_screen:
      "याददाश्त में बदलाव को सिर्फ उम्र का हिस्सा मानने से पहले, B12 की कमी और थायरॉइड असंतुलन को नकारना ज़रूरी है — दोनों आम हैं और आसानी से ठीक हो जाते हैं। इन टेस्ट के साथ-साथ सही जांच के लिए डॉक्टर से मिलना भी ज़रूरी कदम है।",
  },
};

export function translateSymptom(id: string, lang: Lang): string {
  return SYMPTOM_LABELS[lang]?.[id] ?? SYMPTOM_LABELS.en[id] ?? id;
}

export function translateCategory(name: string, lang: Lang): string {
  return CATEGORY_LABELS[lang]?.[name] ?? CATEGORY_LABELS.en[name] ?? name;
}

export function translateConditionTitle(id: string, lang: Lang): string {
  return CONDITION_TITLES[lang]?.[id] ?? CONDITION_TITLES.en[id] ?? id;
}

export function translateConditionExplanation(id: string, lang: Lang, fallback: string): string {
  return CONDITION_EXPLANATIONS[lang]?.[id] ?? fallback;
}