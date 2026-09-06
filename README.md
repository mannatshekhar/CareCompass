# CareCompass — AI Cost & Necessity Navigator (Bengaluru MVP)

A working prototype of the idea: tell it your symptoms, it suggests the
*minimum* diagnostic tests actually worth getting, checks what you might
already qualify for free under government schemes, and compares real lab
prices — instead of the industry default of upselling every test possible.

## What's actually built right now

- **`data/conditions.ts`** — the symptom -> condition -> test mapping table.
  This is the clinical logic core. Currently covers 5 common patterns:
  thyroid imbalance, iron-deficiency anemia, diabetes risk, B12 deficiency,
  and PCOS-related hormone imbalance.
- **`data/tests.ts`** — the test catalog with fair-price benchmarks.
- **`data/labs.ts`** — sample Bengaluru lab pricing (placeholder numbers —
  see "Before this goes live" below).
- **`data/eligibility.ts`** — Karnataka/national scheme eligibility rules
  (Ayushman Bharat-Arogya Karnataka, senior citizen coverage, Gruha Arogya
  Yojane), based on real, currently-active scheme structures.
- **`lib/matching.ts`** — the engine that ties it together: matches
  symptoms to conditions, dedupes test recommendations across conditions,
  and ranks lab price quotes.
- **`components/SymptomChecker.tsx`** — the full interactive flow: symptom
  picker -> eligibility questions -> results (matched conditions, free-scheme
  eligibility, recommended tests, lab price comparison).

## Running it

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

Note: this build removed `next/font/google` and the Google Fonts CSS import
because the sandbox this was built in blocks outbound requests to
fonts.googleapis.com. On your own machine/deploy target, you likely have
normal internet access — feel free to restore Google Fonts (see the comment
in `app/globals.css` for the intended font choices: Fraunces for display
type, IBM Plex Sans for body, IBM Plex Mono for data/labels).

## Before this goes anywhere near real users

This is a learning/prototype scaffold, not a launch-ready product. Three
things are non-negotiable before real people rely on it:

1. **Every clinical rule in `data/conditions.ts` needs a doctor's review.**
   The symptom-to-test mappings here are a reasonable starting draft, not
   medical advice. Get a licensed doctor to sanity-check and ideally sign
   off on each rule before this touches real users.
2. **Every price in `data/labs.ts` is a placeholder.** You need to call or
   check the actual current rate cards for real labs in your target area
   and replace these numbers. Wrong "cheapest lab" claims break the entire
   trust premise of the product.
3. **Eligibility rules need reverification** against official sources
   (pmjay.gov.in, Suvarna Arogya Suraksha Trust, Karnataka Health & Family
   Welfare Dept.) since scheme details, income cutoffs, and coverage change.

## Natural next steps to build

- Swap the hardcoded symptom checklist for a free-text AI intake (LLM call
  that maps described symptoms to the same `SYMPTOMS` id list) — this is
  where an actual LLM API call belongs, kept constrained to only ever
  output IDs from your existing list, never invent new medical logic.
- Add a lightweight backend + database (Postgres via Prisma is a natural
  fit) once you need to store real lab data instead of static files.
- Add a WhatsApp-based entry point (via a provider like Twilio or Gupshup)
  for users who won't use a web app — this was the original "lower barrier
  for the target audience" insight from the product discussion.
- Add NABL registration number lookups instead of a hardcoded boolean, so
  lab trust signals are verifiable, not asserted.
- Expand `data/conditions.ts` beyond 5 conditions once each new one has
  been reviewed by a doctor.
