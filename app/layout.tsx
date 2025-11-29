import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IOU Ledger Pro",
  description: "Track your IOUs easily on Pi Network",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
