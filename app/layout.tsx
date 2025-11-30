// app/layout.tsx
import "./globals.css";
import PiProvider from "@/components/PiProvider";

export const metadata = {
  title: "IOU Now",
  description: "Manage your IOUs with Pi Network",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PiProvider>
          {children}
        </PiProvider>
      </body>
    </html>
  );
}
