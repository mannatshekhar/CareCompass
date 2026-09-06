"use client";

import { useMemo, useState } from "react";
import { SYMPTOMS } from "@/data/conditions";
import { matchConditions, getRecommendedTests, getLabQuotes, buildWhatsAppLink } from "@/lib/matching";
import { checkEligibility, EligibilityAnswer } from "@/data/eligibility";
import { useLanguage } from "@/lib/i18n";
import {
  translateSymptom,
  translateCategory,
  translateConditionTitle,
  translateConditionExplanation,
} from "@/data/translations";

type Step = "intro" | "symptoms" | "eligibility" | "results" | "book";

const CATEGORY_ORDER = [
  "General",
  "Women's health",
  "Metabolic",
  "Mental health",
  "Heart & Kidney",
  "Liver & Digestive",
  "Urinary",
  "Bone & Joint",
  "Senior health",
  "Lifestyle",
  "Risk factor",
];

export default function SymptomChecker() {
  const [step, setStep] = useState<Step>("intro");
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [eligAnswers, setEligAnswers] = useState<EligibilityAnswer>({
    hasRationCard: "unsure",
    age: 25,
    monthlyHouseholdIncomeINR: null,
  });

  const matchedConditions = useMemo(
    () => matchConditions(selectedSymptoms),
    [selectedSymptoms]
  );
  const recommendedTests = useMemo(
    () => getRecommendedTests(matchedConditions),
    [matchedConditions]
  );
  const coreTestIds = useMemo(
    () => recommendedTests.filter((t) => t.priority === "core").map((t) => t.testId),
    [recommendedTests]
  );
  const labQuotes = useMemo(() => getLabQuotes(coreTestIds), [coreTestIds]);
  const schemeResults = useMemo(() => checkEligibility(eligAnswers), [eligAnswers]);

  function toggleSymptom(id: string) {
    setSelectedSymptoms((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-5 py-10">
      <StepIndicator step={step} />

      {step === "intro" && <IntroStep onStart={() => setStep("symptoms")} />}

      {step === "symptoms" && (
        <SymptomsStep
          selected={selectedSymptoms}
          onToggle={toggleSymptom}
          onBack={() => setStep("intro")}
          onNext={() => setStep("eligibility")}
        />
      )}

      {step === "eligibility" && (
        <EligibilityStep
          answers={eligAnswers}
          onChange={setEligAnswers}
          onBack={() => setStep("symptoms")}
          onNext={() => setStep("results")}
        />
      )}

      {step === "results" && (
  <ResultsStep
    matchedConditions={matchedConditions}
    schemeResults={schemeResults}
    hasTests={recommendedTests.length > 0}
    onBack={() => setStep("eligibility")}
    onBookTests={() => setStep("book")}
    onRestart={() => {
      setSelectedSymptoms([]);
      setStep("intro");
    }}
  />
)}

{step === "book" && (
  <BookTestsStep
    recommendedTests={recommendedTests}
    labQuotes={labQuotes}
    onBack={() => setStep("results")}
    onRestart={() => {
      setSelectedSymptoms([]);
      setStep("intro");
    }}
  />
)}
    </div>
  );
}

function StepIndicator({ step }: { step: Step }) {
  const { t } = useLanguage();
  const steps: { id: Step; label: string }[] = [
    { id: "symptoms", label: t("stepSymptoms") },
    { id: "eligibility", label: t("stepEligibility") },
    { id: "results", label: t("stepResults") },
  ];
  if (step === "intro") return null;
  const currentIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="flex items-center gap-3 mb-10">
      {steps.map((s, i) => (
        <div key={s.id} className="flex items-center gap-3">
          <div className={`flex items-center gap-2 ${i <= currentIndex ? "opacity-100" : "opacity-40"}`}>
            <span
              className="font-mono-data text-xs w-6 h-6 rounded-full flex items-center justify-center border"
              style={{
                borderColor: "var(--teal)",
                background: i <= currentIndex ? "var(--teal)" : "transparent",
                color: i <= currentIndex ? "white" : "var(--teal)",
              }}
            >
              {i + 1}
            </span>
            <span className="text-sm font-medium">{s.label}</span>
          </div>
          {i < steps.length - 1 && <div className="w-8 h-px" style={{ background: "var(--line)" }} />}
        </div>
      ))}
    </div>
  );
}

function IntroStep({ onStart }: { onStart: () => void }) {
  const { t } = useLanguage();
  return (
    <div className="pt-8">
      <p className="font-mono-data text-xs uppercase tracking-widest mb-4" style={{ color: "var(--teal)" }}>
        {t("pilotTag")}
      </p>
      <h1 className="font-display text-5xl leading-[1.1] mb-6" style={{ color: "var(--ink)" }}>
        {t("heroHeadlinePart1")}
        <span style={{ color: "var(--turmeric-dark)" }}>{t("heroHeadlinePart2")}</span>
      </h1>
      <p className="text-lg leading-relaxed mb-8 max-w-xl" style={{ color: "var(--ink)" }}>
        {t("heroSubtext")}
      </p>
      <button
        onClick={onStart}
        className="px-6 py-3 rounded-md font-medium text-white transition-transform hover:scale-[1.02]"
        style={{ background: "var(--teal)" }}
      >
        {t("startButton")}
      </button>
      <p className="text-xs mt-6 max-w-md" style={{ color: "var(--ink)", opacity: 0.6 }}>
        {t("heroDisclaimer")}
      </p>
    </div>
  );
}

function SymptomsStep({
  selected,
  onToggle,
  onBack,
  onNext,
}: {
  selected: string[];
  onToggle: (id: string) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const { t, lang } = useLanguage();
  return (
    <div>
      <h2 className="font-display text-3xl mb-2">{t("symptomsHeading")}</h2>
      <p className="text-sm mb-8" style={{ opacity: 0.7 }}>
        {t("symptomsSubheading")}
      </p>

      {CATEGORY_ORDER.map((category) => (
        <div key={category} className="mb-6">
          <h3 className="font-mono-data text-xs uppercase tracking-widest mb-3" style={{ color: "var(--teal)" }}>
            {translateCategory(category, lang)}
          </h3>
          <div className="flex flex-wrap gap-2">
            {SYMPTOMS.filter((s) => s.category === category).map((s) => {
              const isSelected = selected.includes(s.id);
              return (
                <button
                  key={s.id}
                  onClick={() => onToggle(s.id)}
                  className="px-4 py-2 rounded-full text-sm border-2 transition-colors text-left font-medium"
                  style={{
                    borderColor: isSelected ? "var(--teal)" : "var(--ink)",
                    background: isSelected ? "var(--teal)" : "var(--card)",
                    color: isSelected ? "white" : "var(--ink)",
                  }}
                >
                  {translateSymptom(s.id, lang)}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex items-center gap-3 mt-10">
        <button onClick={onBack} className="px-5 py-2.5 text-sm font-medium" style={{ color: "var(--ink)", opacity: 0.6 }}>
          {t("backButton")}
        </button>
        <button
          onClick={onNext}
          disabled={selected.length === 0}
          className="px-6 py-2.5 rounded-md font-medium text-white disabled:opacity-30"
          style={{ background: "var(--teal)" }}
        >
          {t("continueButton")} ({selected.length} {t("selectedSuffix")})
        </button>
      </div>
    </div>
  );
}

function EligibilityStep({
  answers,
  onChange,
  onBack,
  onNext,
}: {
  answers: EligibilityAnswer;
  onChange: (a: EligibilityAnswer) => void;
  onBack: () => void;
  onNext: () => void;
}) {
  const { t } = useLanguage();
  return (
    <div>
      <h2 className="font-display text-3xl mb-2">{t("eligibilityHeading")}</h2>
      <p className="text-sm mb-8" style={{ opacity: 0.7 }}>
        {t("eligibilitySubheading")}
      </p>

      <div className="space-y-6 max-w-md">
        <div>
          <label className="block text-sm font-medium mb-2">{t("ageLabel")}</label>
       <input
  type="text"
  inputMode="numeric"
  pattern="[0-9]*"
  value={answers.age === 0 ? "" : String(answers.age)}
  onChange={(e) => {
    const digitsOnly = e.target.value.replace(/[^0-9]/g, "");
    const parsed = digitsOnly === "" ? 0 : parseInt(digitsOnly, 10);
    const clamped = Math.min(120, parsed);
    onChange({ ...answers, age: clamped });
  }}
  placeholder="e.g. 25"
  className="w-full px-4 py-2.5 rounded-md border bg-white"
  style={{ borderColor: "var(--line)" }}
/>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t("rationCardLabel")}</label>
          <div className="flex flex-wrap gap-2">
            {(
              [
                { key: "BPL", label: t("rationCardBPL") },
                { key: "APL", label: t("rationCardAPL") },
                { key: "none", label: t("rationCardNone") },
                { key: "unsure", label: t("rationCardUnsure") },
              ] as const
            ).map((option) => (
              <button
                key={option.key}
                onClick={() => onChange({ ...answers, hasRationCard: option.key })}
                className="px-4 py-2 rounded-full text-sm border-2 font-medium"
                style={{
                  borderColor: answers.hasRationCard === option.key ? "var(--teal)" : "var(--ink)",
                  background: answers.hasRationCard === option.key ? "var(--teal)" : "var(--card)",
                  color: answers.hasRationCard === option.key ? "white" : "var(--ink)",
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">{t("incomeLabel")}</label>
          <input
            type="number"
            placeholder="e.g. 12000"
            value={answers.monthlyHouseholdIncomeINR ?? ""}
            onChange={(e) =>
              onChange({
                ...answers,
                monthlyHouseholdIncomeINR: e.target.value ? Number(e.target.value) : null,
              })
            }
            className="w-full px-4 py-2.5 rounded-md border bg-white"
            style={{ borderColor: "var(--line)" }}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 mt-10">
        <button onClick={onBack} className="px-5 py-2.5 text-sm font-medium" style={{ color: "var(--ink)", opacity: 0.6 }}>
          {t("backButton")}
        </button>
        <button onClick={onNext} className="px-6 py-2.5 rounded-md font-medium text-white" style={{ background: "var(--teal)" }}>
          {t("seeResultsButton")}
        </button>
      </div>
    </div>
  );
}

function ResultsStep({
  matchedConditions,
  schemeResults,
  hasTests,
  onBack,
  onBookTests,
  onRestart,
}: {
  matchedConditions: ReturnType<typeof matchConditions>;
  schemeResults: ReturnType<typeof checkEligibility>;
  hasTests: boolean;
  onBack: () => void;
  onBookTests: () => void;
  onRestart: () => void;
}) {
  const { t } = useLanguage();
  const eligibleSchemes = schemeResults.filter((s) => s.likelyEligible);

  if (matchedConditions.length === 0) {
    return (
      <div>
        <h2 className="font-display text-3xl mb-4">{t("noMatchHeading")}</h2>
        <p className="mb-8" style={{ opacity: 0.75 }}>
          {t("noMatchText")}
        </p>
        <button onClick={onBack} className="px-6 py-2.5 rounded-md font-medium text-white" style={{ background: "var(--teal)" }}>
          {t("adjustButton")}
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-display text-3xl mb-2">{t("resultsHeading")}</h2>
      <p className="text-sm mb-10" style={{ opacity: 0.7 }}>
        {t("resultsSubheading")}
      </p>

      <section className="mb-10">
        <h3 className="font-mono-data text-xs uppercase tracking-widest mb-3" style={{ color: "var(--teal)" }}>
          {t("patternsHeading")}
        </h3>
        <div className="space-y-3">
          {matchedConditions.map((c) => (
            <div key={c.conditionId} className="p-4 rounded-lg border bg-white" style={{ borderColor: "var(--line)" }}>
              <p className="font-medium mb-1">{c.label}</p>
              <p className="text-sm" style={{ opacity: 0.75 }}>
                {c.plainExplanation}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-10">
        <h3 className="font-mono-data text-xs uppercase tracking-widest mb-3" style={{ color: "var(--teal)" }}>
          {t("eligibleHeading")}
        </h3>
        {eligibleSchemes.length > 0 ? (
          <div className="space-y-3">
            {eligibleSchemes.map((s) => (
              <div key={s.schemeId} className="p-4 rounded-lg border-l-4 bg-white" style={{ borderColor: "var(--turmeric)" }}>
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium">{s.schemeName}</p>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-mono-data"
                    style={{ background: "var(--turmeric)", color: "white" }}
                  >
                    {s.confidence} {t("confidenceSuffix")}
                  </span>
                </div>
                <p className="text-sm mb-2" style={{ opacity: 0.75 }}>{s.whatItCovers}</p>
                <p className="text-sm font-medium" style={{ color: "var(--teal-dark)" }}>
                  {t("nextStepLabel")} {s.nextStep}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm" style={{ opacity: 0.7 }}>
            {t("noSchemeText")}
          </p>
        )}
      </section>

      <div className="flex items-center gap-3 mt-10">
        <button onClick={onBack} className="px-5 py-2.5 text-sm font-medium" style={{ color: "var(--ink)", opacity: 0.6 }}>
          {t("backButton")}
        </button>
        {hasTests && (
          <button
            onClick={onBookTests}
            className="px-6 py-2.5 rounded-md font-medium text-white"
            style={{ background: "var(--teal)" }}
          >
            Book Your Tests →
          </button>
        )}
        <button onClick={onRestart} className="px-6 py-2.5 rounded-md font-medium border" style={{ borderColor: "var(--teal)", color: "var(--teal)" }}>
          {t("startOverButton")}
        </button>
      </div>
    </div>
  );
}
function openDirections(address: string) {
  const fallbackUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

  if (!navigator.geolocation) {
    window.open(fallbackUrl, "_blank", "noopener,noreferrer");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${encodeURIComponent(address)}`;
      window.open(url, "_blank", "noopener,noreferrer");
    },
    () => {
      window.open(fallbackUrl, "_blank", "noopener,noreferrer");
    },
    { timeout: 8000 }
  );
}
function BookTestsStep({
  recommendedTests,
  labQuotes,
  onBack,
  onRestart,
}: {
  recommendedTests: ReturnType<typeof getRecommendedTests>;
  labQuotes: ReturnType<typeof getLabQuotes>;
  onBack: () => void;
  onRestart: () => void;
}) {
  const cheapest = labQuotes[0];
  const priciest = labQuotes[labQuotes.length - 1];
  const coreTestNames = recommendedTests
    .filter((t) => t.priority === "core")
    .map((t) => t.testName);

  return (
    <div>
      <h2 className="font-display text-3xl mb-2">Book Your Tests</h2>
      <p className="text-sm mb-2" style={{ opacity: 0.7 }}>
        Labs are sorted cheapest first for your recommended tests. Prices are estimates collected from each lab's public pricing — always confirm the final amount with the lab before booking.
      </p>
      <p className="text-xs mb-8" style={{ opacity: 0.55 }}>
        CareCompass does not process payments or bookings directly — tapping a lab below takes you to that lab's own website or WhatsApp to complete your booking.
      </p>

      {cheapest && priciest && cheapest.lab.id !== priciest.lab.id && (
        <div
          className="p-4 rounded-lg mb-8"
          style={{ background: "var(--turmeric)", color: "white" }}
        >
          <p className="font-medium">
            You could save ₹{priciest.totalPrice - cheapest.totalPrice} by choosing {cheapest.lab.name} over the priciest option below.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {labQuotes.map((q) => {
          const isCheapest = q.lab.id === cheapest?.lab.id;
          const bookHref = q.lab.whatsappNumber
            ? buildWhatsAppLink(q.lab.whatsappNumber, coreTestNames)
            : q.lab.bookingUrl;
          const bookLabel = q.lab.whatsappNumber ? "Chat on WhatsApp" : "Visit Website";

          return (
            <div
              key={q.lab.id}
              className="p-5 rounded-lg border bg-white"
              style={{
                borderColor: isCheapest ? "var(--teal)" : "var(--line)",
                borderWidth: isCheapest ? "2px" : "1px",
              }}
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <p className="font-medium text-lg">{q.lab.name}</p>
                    {q.lab.nablAccredited && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded font-mono-data"
                        style={{ background: "var(--teal)", color: "white" }}
                      >
                        NABL
                      </span>
                    )}
                    {isCheapest && (
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded font-mono-data"
                        style={{ background: "var(--turmeric)", color: "white" }}
                      >
                        CHEAPEST
                      </span>
                    )}
                  </div>
                  <p className="text-sm" style={{ opacity: 0.6 }}>
                    {q.lab.area} · {q.lab.homeCollection ? "Home collection available" : "Visit lab in person"}
                  </p>
                </div>
                <p className="font-mono-data text-xl font-medium whitespace-nowrap">
                  ₹{q.totalPrice}
                </p>
              </div>

              {bookHref ? (
                
                <a href={bookHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-5 py-2 rounded-md font-medium text-white text-sm"
                  style={{ background: "var(--teal)" }}
                >
                  {bookLabel} →
                </a>
              ) : (
                 <div className="text-sm space-y-1" style={{ opacity: 0.75 }}>
  {q.lab.phone && (
    <p>
      📞 <a href={`tel:${q.lab.phone}`} className="underline font-medium">
        {q.lab.phone.replace(/(\d{2})(\d{5})(\d{5})/, "$1-$2-$3")}
      </a>
    </p>
  )}
  {q.lab.address && (
    <p>
      📍 {q.lab.address}{" "}
      <button
  onClick={() => openDirections(q.lab.address!)}
  className="underline font-medium"
  style={{ color: "var(--teal-dark)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
>
  Get Directions →
</button>
    </p>
  )}
  {!q.lab.phone && !q.lab.address && (
    <p className="italic">No online booking available — visit or call this lab directly.</p>
  )}
</div>
              
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-3 mt-10">
        <button onClick={onBack} className="px-5 py-2.5 text-sm font-medium" style={{ color: "var(--ink)", opacity: 0.6 }}>
          ← Back to summary
        </button>
        <button onClick={onRestart} className="px-6 py-2.5 rounded-md font-medium border" style={{ borderColor: "var(--teal)", color: "var(--teal)" }}>
          Start Over
        </button>
      </div>
    </div>
  );
}