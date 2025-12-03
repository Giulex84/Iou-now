import './globals.css'; 

// Importa i tipi Metadata da Next
import type { Metadata } from 'next'; 

export const metadata: Metadata = {
  title: 'IOU Ledger',
  description: 'Gestisci debiti e crediti facilmente.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    // AGGIUNGI LA CLASSE 'dark' QUI PER ABILITARE IL TEMA SCURO OVUNQUE
    <html lang="it" className="dark"> 
      <body>
        {/* Rimuovi la classe bg-[#...] per lasciare che i componenti interni gestiscano lo sfondo */}
        {children}
      </body>
    </html>
  );
}
