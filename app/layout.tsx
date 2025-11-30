// app/layout.tsx
import "./globals.css";
import IOUProvider from "@/components/providers/IOUProvider";
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
          <IOUProvider>
            {children}
          </IOUProvider>
        </PiProvider>
      </body>
    </html>
  );
}
