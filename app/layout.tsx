import type { Metadata } from "next";
import "./globals.css";

import MedicalBackground from "./components/MedicalBackground";
import AppShell from "./components/AppShell";
import { RoleProvider } from "./context/RoleContext";
import { LanguageProvider } from "./context/LanguageContext";
import VoiceAssistant from "./components/VoiceAssistant";

export const metadata: Metadata = {
  title: "NIRAMAYA-SETU — Rural Healthcare Care Continuity Platform",
  description:
    "Closed-loop referral and care continuity platform connecting ASHA workers, patients, clinicians, and health facilities.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased font-sans">
        <LanguageProvider>
          <RoleProvider>
            <MedicalBackground />
            <AppShell>{children}</AppShell>
            <VoiceAssistant />
          </RoleProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}