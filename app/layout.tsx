import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "IOU",
  description: "Gestisci debiti e crediti facilmente.",
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
