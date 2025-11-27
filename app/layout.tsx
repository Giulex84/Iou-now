import "./globals.css";
import { IOUProvider } from "@/components/iou-context";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IOU Ledger Pro",
  description: "Track your IOUs easily",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <IOUProvider>{children}</IOUProvider>
      </body>
    </html>
  );
}
