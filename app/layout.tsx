import "./globals.css";
import { IOUProvider } from "@/components/iou-context";
import Script from "next/script";

export const metadata = {
  title: "IOU Ledger Pro",
  description: "Track your IOUs easily",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://sdk.minepi.com/pi-sdk.js"
          strategy="beforeInteractive"
        />
      </head>

      <body>
        <IOUProvider>{children}</IOUProvider>
      </body>
    </html>
  );
}
