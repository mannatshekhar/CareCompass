import SymptomChecker from "@/components/SymptomChecker";

export default function Home() {
  return (
    <main style={{ background: "var(--paper)", minHeight: "100vh" }}>
      <SymptomChecker />
    </main>
  );
}
