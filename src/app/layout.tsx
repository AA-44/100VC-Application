import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Abdullah Aldossary — Venture Associate Application",
  description:
    "A personal application for the Venture Associate role. Warm, curious, analytical, and deeply drawn to startups.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
