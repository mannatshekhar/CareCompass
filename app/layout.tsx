import type { Metadata } from "next";
import "./globals.css";
import AuthProvider from "@/components/AuthProvider";
import { LanguageProvider } from "@/lib/i18n";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "CareCompass — Find the right test, not the upsold one",
  description:
    "AI-assisted symptom-to-test navigator for Bengaluru: recommends th...",
  openGraph: {
    title: "CareCompass — Find the right test, not the upsold one",
    description: "AI-assisted symptom-to-test navigator for Bengaluru.",
    url: "https://care-compass-alpha.vercel.app",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
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