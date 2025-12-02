import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IOU",
  description: "Traccia debiti e crediti in modo semplice.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body className="bg-[#0f172a] text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
