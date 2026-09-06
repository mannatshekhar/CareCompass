"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "hi" | "kn";

export const LANGUAGES: { code: Lang; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिंदी" },
  { code: "kn", label: "ಕನ್ನಡ" },
];

const UI_STRINGS: Record<Lang, Record<string, string>> = {
  en: {
    pilotTag: "Bengaluru · Pilot v0.1",
    heroHeadlinePart1: "Find the test you actually need — ",
    heroHeadlinePart2: "not the one that's easiest to sell you.",
    heroSubtext:
      "Tell us what you're feeling. We'll suggest the specific tests worth getting, check what you might already qualify for free, and show you real price differences across Bengaluru labs — before you spend a rupee.",
    startButton: "Start — takes 2 minutes",
    heroDisclaimer:
      "This is a screening aid, not a diagnosis. Always confirm with a doctor, especially before skipping or adding tests based on this tool alone.",
    symptomsHeading: "What are you noticing?",
    symptomsSubheading: "Select everything that applies. More detail gives you a sharper result.",
    backButton: "Back",
    continueButton: "Continue",
    selectedSuffix: "selected",
    eligibilityHeading: "A few quick eligibility questions",
    eligibilitySubheading:
      "This helps us check if you already qualify for free or subsidized testing under government schemes — most eligible people never find out.",
    ageLabel: "Your age",
    rationCardLabel: "Ration card type",
    rationCardBPL: "BPL",
    rationCardAPL: "APL",
    rationCardNone: "No card",
    rationCardUnsure: "Not sure",
    incomeLabel: "Monthly household income (optional, helps accuracy)",
    seeResultsButton: "See my results",
    resultsHeading: "Here's what we found",
    resultsSubheading: "Not a diagnosis — a starting point to take to a doctor or lab.",
    patternsHeading: "Patterns that match your symptoms",
    eligibleHeading: "What you might qualify for, free",
    noSchemeText:
      "Based on your answers, no scheme matched — but it's worth double-checking directly with an Ayushman Health & Wellness Centre, since eligibility rules have exceptions.",
    confidenceSuffix: "confidence",
    nextStepLabel: "Next step:",
    recommendedTestsHeading: "Recommended tests",
    fairPriceSuffix: "fair price",
    onlyIfNeeded: "only if needed",
    fastingRequiredLabel: "fasting required",
    priceComparisonHeading: "Price comparison for your core tests, Bengaluru labs",
    priceComparisonNote: "Sample pricing for illustration — verify current rates before booking.",
    cheapestLabel: "Cheapest",
    homeCollectionYes: "Home collection available",
    homeCollectionNo: "Visit only",
    startOverButton: "Start over",
    noMatchHeading: "Nothing specific stood out",
    noMatchText:
      "Based on what you selected, none of our current screening patterns matched strongly. That doesn't mean nothing's wrong — this tool only covers a handful of common conditions so far. If symptoms persist, it's worth talking to a doctor directly.",
    adjustButton: "Go back and adjust",
    stepSymptoms: "Symptoms",
    stepEligibility: "Eligibility",
    stepResults: "Results",
    signInButton: "Sign in with Google",
    signOutButton: "Sign out",
    remindersLabel: "Reminders",
    remindersPanelTitle: "Checkup reminders",
    remindersPanelSubtitle: "We'll email you when it's time for your next round of tests.",
    remindMeEvery: "Remind me every",
    monthsSuffix: "months",
    markDoneButton: "I just did my checkup — mark it done",
    savingButton: "Saving...",
    nextReminderLabel: "Next reminder:",
    visitWebsite: "Visit official website",
    chatOnWhatsApp: "Chat on WhatsApp",
    noOnlineBooking: "No online booking — visit in person",
    bookingDisclaimer: "These are official lab links. You book directly with the lab — CareCompass doesn't handle payments or bookings.",
  },
  hi: {
    pilotTag: "बेंगलुरु · पायलट v0.1",
    heroHeadlinePart1: "वह टेस्ट खोजें जिसकी आपको सच में ज़रूरत है — ",
    heroHeadlinePart2: "वह नहीं जो आपको बेचना सबसे आसान हो।",
    heroSubtext:
      "हमें बताएं आप क्या महसूस कर रहे हैं। हम बताएंगे कौन से टेस्ट सही मायने में ज़रूरी हैं, जांचेंगे कि आप पहले से किसी मुफ्त योजना के लिए पात्र हैं या नहीं, और बेंगलुरु की लैब्स में असली कीमतों का अंतर दिखाएंगे — एक रुपया खर्च करने से पहले।",
    startButton: "शुरू करें — सिर्फ 2 मिनट लगेंगे",
    heroDisclaimer:
      "यह एक स्क्रीनिंग सहायक है, निदान नहीं। हमेशा डॉक्टर से पुष्टि करें, खासकर सिर्फ इस टूल के आधार पर टेस्ट छोड़ने या जोड़ने से पहले।",
    symptomsHeading: "आप क्या महसूस कर रहे हैं?",
    symptomsSubheading: "जो भी लागू हो उसे चुनें। जितनी ज़्यादा जानकारी, नतीजा उतना सटीक।",
    backButton: "पीछे",
    continueButton: "जारी रखें",
    selectedSuffix: "चयनित",
    eligibilityHeading: "कुछ त्वरित पात्रता प्रश्न",
    eligibilitySubheading:
      "इससे हमें पता चलता है कि क्या आप पहले से सरकारी योजनाओं के तहत मुफ्त या सस्ती जांच के लिए पात्र हैं — ज़्यादातर पात्र लोगों को यह पता ही नहीं चलता।",
    ageLabel: "आपकी उम्र",
    rationCardLabel: "राशन कार्ड का प्रकार",
    rationCardBPL: "BPL",
    rationCardAPL: "APL",
    rationCardNone: "कार्ड नहीं है",
    rationCardUnsure: "पता नहीं",
    incomeLabel: "मासिक पारिवारिक आय (वैकल्पिक, सटीकता के लिए मददगार)",
    seeResultsButton: "मेरे नतीजे देखें",
    resultsHeading: "हमें यह मिला",
    resultsSubheading: "यह निदान नहीं है — डॉक्टर या लैब तक ले जाने के लिए एक शुरुआती बिंदु है।",
    patternsHeading: "आपके लक्षणों से मेल खाने वाले पैटर्न",
    eligibleHeading: "आप किन मुफ्त सुविधाओं के लिए पात्र हो सकते हैं",
    noSchemeText:
      "आपके जवाबों के आधार पर कोई योजना मेल नहीं खाई — लेकिन आयुष्मान हेल्थ एंड वेलनेस सेंटर से सीधे जांच करना बेहतर होगा, क्योंकि पात्रता नियमों में अपवाद होते हैं।",
    confidenceSuffix: "विश्वास स्तर",
    nextStepLabel: "अगला कदम:",
    recommendedTestsHeading: "सुझाए गए टेस्ट",
    fairPriceSuffix: "उचित कीमत",
    onlyIfNeeded: "सिर्फ ज़रूरत पड़ने पर",
    fastingRequiredLabel: "खाली पेट ज़रूरी",
    priceComparisonHeading: "आपके मुख्य टेस्ट के लिए कीमत तुलना, बेंगलुरु लैब्स",
    priceComparisonNote: "यह कीमतें उदाहरण के लिए हैं — बुकिंग से पहले मौजूदा दरें जांच लें।",
    cheapestLabel: "सबसे सस्ता",
    homeCollectionYes: "घर से सैंपल लेने की सुविधा उपलब्ध",
    homeCollectionNo: "सिर्फ लैब जाकर",
    startOverButton: "फिर से शुरू करें",
    noMatchHeading: "कुछ खास नहीं मिला",
    noMatchText:
      "आपने जो चुना, उसके आधार पर हमारे मौजूदा पैटर्न से कोई मज़बूत मेल नहीं मिला। इसका मतलब यह नहीं कि सब ठीक है — यह टूल अभी सिर्फ कुछ आम स्थितियों को कवर करता है। अगर लक्षण बने रहें, तो सीधे डॉक्टर से बात करना बेहतर है।",
    adjustButton: "वापस जाएं और बदलें",
    stepSymptoms: "लक्षण",
    stepEligibility: "पात्रता",
    stepResults: "नतीजे",
    signInButton: "Google से साइन इन करें",
    signOutButton: "साइन आउट करें",
    remindersLabel: "रिमाइंडर",
    remindersPanelTitle: "जांच रिमाइंडर",
    remindersPanelSubtitle: "अगली जांच का समय आने पर हम आपको ईमेल करेंगे।",
    remindMeEvery: "मुझे हर इतने समय बाद याद दिलाएं",
    monthsSuffix: "महीने",
    markDoneButton: "मैंने अभी जांच करवाई — इसे पूरा मार्क करें",
    savingButton: "सेव हो रहा है...",
    nextReminderLabel: "अगला रिमाइंडर:",
    visitWebsite: "आधिकारिक वेबसाइट पर जाएं",
    chatOnWhatsApp: "WhatsApp पर बात करें",
    noOnlineBooking: "ऑनलाइन बुकिंग नहीं — सीधे विज़िट करें",
    bookingDisclaimer: "ये आधिकारिक लैब लिंक हैं। आप सीधे लैब से बुक करते हैं — CareCompass भुगतान या बुकिंग नहीं संभालता।",
  },
  kn: {
    pilotTag: "ಬೆಂಗಳೂರು · ಪೈಲಟ್ v0.1",
    heroHeadlinePart1: "ನಿಮಗೆ ನಿಜವಾಗಿ ಬೇಕಾದ ಪರೀಕ್ಷೆಯನ್ನು ಕಂಡುಕೊಳ್ಳಿ — ",
    heroHeadlinePart2: "ನಿಮಗೆ ಮಾರಾಟ ಮಾಡಲು ಸುಲಭವಾದದ್ದಲ್ಲ.",
    heroSubtext:
      "ನೀವು ಏನು ಅನುಭವಿಸುತ್ತಿದ್ದೀರಿ ಎಂದು ಹೇಳಿ. ನಿಜವಾಗಿ ಅಗತ್ಯವಿರುವ ಪರೀಕ್ಷೆಗಳನ್ನು ನಾವು ಸೂಚಿಸುತ್ತೇವೆ, ನೀವು ಈಗಾಗಲೇ ಉಚಿತ ಸೌಲಭ್ಯಕ್ಕೆ ಅರ್ಹರೇ ಎಂದು ಪರಿಶೀಲಿಸುತ್ತೇವೆ, ಮತ್ತು ಬೆಂಗಳೂರಿನ ಲ್ಯಾಬ್‌ಗಳಲ್ಲಿ ನಿಜವಾದ ಬೆಲೆ ವ್ಯತ್ಯಾಸವನ್ನು ತೋರಿಸುತ್ತೇವೆ — ಒಂದು ರೂಪಾಯಿ ಖರ್ಚು ಮಾಡುವ ಮೊದಲು.",
    startButton: "ಪ್ರಾರಂಭಿಸಿ — ಕೇವಲ 2 ನಿಮಿಷ",
    heroDisclaimer:
      "ಇದು ಒಂದು ಸ್ಕ್ರೀನಿಂಗ್ ಸಾಧನ, ರೋಗನಿರ್ಣಯವಲ್ಲ. ಯಾವಾಗಲೂ ವೈದ್ಯರೊಂದಿಗೆ ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ, ವಿಶೇಷವಾಗಿ ಈ ಸಾಧನದ ಆಧಾರದ ಮೇಲೆ ಮಾತ್ರ ಪರೀಕ್ಷೆಗಳನ್ನು ಬಿಡುವ ಅಥವಾ ಸೇರಿಸುವ ಮೊದಲು.",
    symptomsHeading: "ನೀವು ಏನು ಗಮನಿಸುತ್ತಿದ್ದೀರಿ?",
    symptomsSubheading: "ಅನ್ವಯಿಸುವ ಎಲ್ಲವನ್ನೂ ಆಯ್ಕೆಮಾಡಿ. ಹೆಚ್ಚು ವಿವರ ನೀಡಿದಷ್ಟೂ ಫಲಿತಾಂಶ ನಿಖರವಾಗಿರುತ್ತದೆ.",
    backButton: "ಹಿಂದೆ",
    continueButton: "ಮುಂದುವರಿಸಿ",
    selectedSuffix: "ಆಯ್ಕೆಮಾಡಲಾಗಿದೆ",
    eligibilityHeading: "ಕೆಲವು ತ್ವರಿತ ಅರ್ಹತಾ ಪ್ರಶ್ನೆಗಳು",
    eligibilitySubheading:
      "ಇದು ನೀವು ಸರ್ಕಾರಿ ಯೋಜನೆಗಳ ಅಡಿಯಲ್ಲಿ ಉಚಿತ ಅಥವಾ ರಿಯಾಯಿತಿ ಪರೀಕ್ಷೆಗೆ ಈಗಾಗಲೇ ಅರ್ಹರೇ ಎಂದು ಪರಿಶೀಲಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ — ಹೆಚ್ಚಿನ ಅರ್ಹ ಜನರಿಗೆ ಇದು ತಿಳಿದೇ ಇರುವುದಿಲ್ಲ.",
    ageLabel: "ನಿಮ್ಮ ವಯಸ್ಸು",
    rationCardLabel: "ರೇಷನ್ ಕಾರ್ಡ್ ಪ್ರಕಾರ",
    rationCardBPL: "BPL",
    rationCardAPL: "APL",
    rationCardNone: "ಕಾರ್ಡ್ ಇಲ್ಲ",
    rationCardUnsure: "ಗೊತ್ತಿಲ್ಲ",
    incomeLabel: "ಮಾಸಿಕ ಕುಟುಂಬ ಆದಾಯ (ಐಚ್ಛಿಕ, ನಿಖರತೆಗೆ ಸಹಾಯಕ)",
    seeResultsButton: "ನನ್ನ ಫಲಿತಾಂಶ ನೋಡಿ",
    resultsHeading: "ನಮಗೆ ಇದು ಕಂಡುಬಂದಿದೆ",
    resultsSubheading: "ಇದು ರೋಗನಿರ್ಣಯವಲ್ಲ — ವೈದ್ಯರು ಅಥವಾ ಲ್ಯಾಬ್‌ಗೆ ಹೋಗಲು ಒಂದು ಆರಂಭಿಕ ಬಿಂದು.",
    patternsHeading: "ನಿಮ್ಮ ಲಕ್ಷಣಗಳಿಗೆ ಹೊಂದುವ ಮಾದರಿಗಳು",
    eligibleHeading: "ನೀವು ಯಾವ ಉಚಿತ ಸೌಲಭ್ಯಗಳಿಗೆ ಅರ್ಹರಾಗಬಹುದು",
    noSchemeText:
      "ನಿಮ್ಮ ಉತ್ತರಗಳ ಆಧಾರದ ಮೇಲೆ, ಯಾವುದೇ ಯೋಜನೆ ಹೊಂದಲಿಲ್ಲ — ಆದರೆ ಆಯುಷ್ಮಾನ್ ಆರೋಗ್ಯ ಮತ್ತು ಸ್ವಾಸ್ಥ್ಯ ಕೇಂದ್ರದೊಂದಿಗೆ ನೇರವಾಗಿ ಪರಿಶೀಲಿಸುವುದು ಒಳ್ಳೆಯದು, ಏಕೆಂದರೆ ಅರ್ಹತಾ ನಿಯಮಗಳಲ್ಲಿ ವಿನಾಯಿತಿಗಳಿವೆ.",
    confidenceSuffix: "ವಿಶ್ವಾಸ ಮಟ್ಟ",
    nextStepLabel: "ಮುಂದಿನ ಹಂತ:",
    recommendedTestsHeading: "ಶಿಫಾರಸು ಮಾಡಿದ ಪರೀಕ್ಷೆಗಳು",
    fairPriceSuffix: "ನ್ಯಾಯಯುತ ಬೆಲೆ",
    onlyIfNeeded: "ಅಗತ್ಯವಿದ್ದರೆ ಮಾತ್ರ",
    fastingRequiredLabel: "ಉಪವಾಸ ಅಗತ್ಯ",
    priceComparisonHeading: "ನಿಮ್ಮ ಮುಖ್ಯ ಪರೀಕ್ಷೆಗಳಿಗೆ ಬೆಲೆ ಹೋಲಿಕೆ, ಬೆಂಗಳೂರು ಲ್ಯಾಬ್‌ಗಳು",
    priceComparisonNote: "ಇದು ಉದಾಹರಣೆಗಾಗಿ ಮಾದರಿ ಬೆಲೆ — ಬುಕಿಂಗ್ ಮೊದಲು ಪ್ರಸ್ತುತ ದರಗಳನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
    cheapestLabel: "ಅಗ್ಗದ",
    homeCollectionYes: "ಮನೆಯಿಂದ ಮಾದರಿ ಸಂಗ್ರಹ ಲಭ್ಯ",
    homeCollectionNo: "ಭೇಟಿ ಮಾತ್ರ",
    startOverButton: "ಮತ್ತೆ ಪ್ರಾರಂಭಿಸಿ",
    noMatchHeading: "ನಿರ್ದಿಷ್ಟವಾದುದೇನೂ ಕಂಡುಬರಲಿಲ್ಲ",
    noMatchText:
      "ನೀವು ಆಯ್ಕೆ ಮಾಡಿದ್ದರ ಆಧಾರದ ಮೇಲೆ, ನಮ್ಮ ಪ್ರಸ್ತುತ ಯಾವುದೇ ಮಾದರಿ ಬಲವಾಗಿ ಹೊಂದಲಿಲ್ಲ. ಇದರರ್ಥ ಏನೂ ತಪ್ಪಿಲ್ಲ ಎಂದಲ್ಲ — ಈ ಸಾಧನ ಸದ್ಯಕ್ಕೆ ಕೆಲವು ಸಾಮಾನ್ಯ ಸ್ಥಿತಿಗಳನ್ನು ಮಾತ್ರ ಒಳಗೊಂಡಿದೆ. ಲಕ್ಷಣಗಳು ಮುಂದುವರಿದರೆ, ನೇರವಾಗಿ ವೈದ್ಯರೊಂದಿಗೆ ಮಾತನಾಡುವುದು ಒಳ್ಳೆಯದು.",
    adjustButton: "ಹಿಂದೆ ಹೋಗಿ ಬದಲಾಯಿಸಿ",
    stepSymptoms: "ಲಕ್ಷಣಗಳು",
    stepEligibility: "ಅರ್ಹತೆ",
    stepResults: "ಫಲಿತಾಂಶಗಳು",
    signInButton: "Google ಮೂಲಕ ಸೈನ್ ಇನ್ ಮಾಡಿ",
    signOutButton: "ಸೈನ್ ಔಟ್",
    remindersLabel: "ರಿಮೈಂಡರ್‌ಗಳು",
    remindersPanelTitle: "ತಪಾಸಣೆ ರಿಮೈಂಡರ್‌ಗಳು",
    remindersPanelSubtitle: "ನಿಮ್ಮ ಮುಂದಿನ ಪರೀಕ್ಷೆಗಳ ಸಮಯ ಬಂದಾಗ ನಾವು ನಿಮಗೆ ಇಮೇಲ್ ಮಾಡುತ್ತೇವೆ.",
    remindMeEvery: "ಪ್ರತಿ ಎಷ್ಟು ಸಮಯಕ್ಕೊಮ್ಮೆ ನೆನಪಿಸಿ",
    monthsSuffix: "ತಿಂಗಳುಗಳು",
    markDoneButton: "ನಾನು ಈಗ ತಪಾಸಣೆ ಮಾಡಿಸಿದೆ — ಪೂರ್ಣಗೊಂಡಿದೆ ಎಂದು ಗುರುತಿಸಿ",
    savingButton: "ಉಳಿಸಲಾಗುತ್ತಿದೆ...",
    nextReminderLabel: "ಮುಂದಿನ ರಿಮೈಂಡರ್:",
    visitWebsite: "ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ಗೆ ಭೇಟಿ ನೀಡಿ",
    chatOnWhatsApp: "WhatsApp ನಲ್ಲಿ ಮಾತನಾಡಿ",
    noOnlineBooking: "ಆನ್‌ಲೈನ್ ಬುಕಿಂಗ್ ಇಲ್ಲ — ಖುದ್ದಾಗಿ ಭೇಟಿ ನೀಡಿ",
    bookingDisclaimer: "ಇವು ಅಧಿಕೃತ ಲ್ಯಾಬ್ ಲಿಂಕ್‌ಗಳು. ನೀವು ನೇರವಾಗಿ ಲ್ಯಾಬ್‌ನೊಂದಿಗೆ ಬುಕ್ ಮಾಡುತ್ತೀರಿ — CareCompass ಪಾವತಿ ಅಥವಾ ಬುಕಿಂಗ್ ನಿರ್ವಹಿಸುವುದಿಲ್ಲ.",
  },
};

type LanguageContextValue = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue>({
  lang: "en",
  setLang: () => {},
  t: (key: string) => UI_STRINGS.en[key] ?? key,
});

const STORAGE_KEY = "carecompass_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved && (saved === "en" || saved === "hi" || saved === "kn")) {
        setLangState(saved);
      }
    } catch {
      // localStorage unavailable — fall back to default "en" silently
    }
  }, []);

  function setLang(l: Lang) {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {
      // ignore
    }
  }

  function t(key: string): string {
    return UI_STRINGS[lang][key] ?? UI_STRINGS.en[key] ?? key;
  }

  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  return useContext(LanguageContext);
}