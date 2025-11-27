// app/layout.tsx  (SERVER COMPONENT – nessun "use client")

import "./globals.css";

export const metadata = {
  title: "IOU Ledger Pro",
  description: "Track your IOUs easily",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Pi SDK load */}
        <script
          src="https://sdk.minepi.com/pi-sdk.js"
          integrity="sha384-8qts0jqAbKLFXrrHWlP88eCjcw0bmFUXZpGgUa7mbFkFzfA2seQhLcS6grwFzeW9"
          crossOrigin="anonymous"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
