import './globals.css'; 
import type { Metadata } from 'next'; 
import React from 'react'; // Assicurati di importare React se usi hook o React.FC

export const metadata: Metadata = {
  title: 'IOU Ledger',
  description: 'Gestisci debiti e crediti Pi facilmente.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // CLASSE 'dark' APPLICATA E IL DIV CONFLITTUALE RIMOSSO
    <html lang="it" className="dark"> 
      <body>
        {children}
      </body>
    </html>
  );
}
