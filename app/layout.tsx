import './globals.css'; 
import type { Metadata } from 'next'; 

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
    // AGGIUNGI CLASSE 'dark' QUI E RIMUOVI IL DIV CONTENITORE CON CLASSI FISSE
    <html lang="it" className="dark"> 
      <body>
        {children}
      </body>
    </html>
  );
}
