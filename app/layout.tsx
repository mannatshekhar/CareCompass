import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { LanguageProvider } from "@/lib/i18n";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "CareCompass — Find the right test, not the upsold one",
  description:
    "AI-assisted symptom-to-test navigator for Bengaluru: recommends the minimum tests you need, checks government scheme eligibility, and compares real lab prices.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <LanguageProvider>
            <Header />
            {children}
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}