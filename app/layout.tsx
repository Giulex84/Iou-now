import "./globals.css";
import { IOUProvider } from "@/components/iou-context";

export const metadata = {
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
      <head>
        <script
          src="https://sdk.minepi.com/pi-sdk.js"
          integrity="sha384-8qts0jqAbKLFXrrHWlP88eCjcw0bmFUXZpGgUa7mbFkFzfA2seQhLcS6grwFzeW9"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <IOUProvider>{children}</IOUProvider>
      </body>
    </html>
  );
}
