// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import PiProvider from "@/components/PiProvider";
import IOUProvider from "@/components/providers/IOUProvider";

export const metadata = {
  title: "IOU",
  description: "Track and manage your IOUs across currencies.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-900 text-white">
        <PiProvider>
          <IOUProvider>
            {children}
          </IOUProvider>
        </PiProvider>
      </body>
    </html>
  );
}
