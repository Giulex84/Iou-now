// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import PiProvider from "@/components/PiProvider";
import IOUProvider from "@/components/providers/IOUProvider";

export const metadata = {
  title: "IOU",
  description: "Manage your IOUs with Pi Network",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <PiProvider>
          <IOUProvider>{children}</IOUProvider>
        </PiProvider>
      </body>
    </html>
  );
}
