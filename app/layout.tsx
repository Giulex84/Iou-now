"use client";

import "./globals.css";
import { IOUProvider } from "@/components/iou-context";

export const metadata = {
  title: "IOU Ledger Pro",
  description: "Track your IOUs easily",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <body>
        <IOUProvider>
          {children}
        </IOUProvider>
      </body>
    </html>
  );
}
