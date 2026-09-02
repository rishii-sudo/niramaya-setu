import type { Metadata } from "next";
import "./globals.css";

import MedicalBackground from "./components/MedicalBackground";
import AppShell from "./components/AppShell";

export const metadata: Metadata = {
  title: "NIRAMAYA-SETU",
  description:
    "Care Continuity Platform for connected healthcare and closed-loop referrals.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MedicalBackground />

        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}