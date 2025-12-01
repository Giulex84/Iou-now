export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import StartPaymentButton from "@/components/StartPaymentButton";
import Link from "next/link";

export default function Page() {
  return (
    <div className="min-h-screen p-4 bg-gray-900 text-white space-y-6">
      <h1 className="text-3xl font-bold mb-2">IOU</h1>
      <p className="mb-6">
        Benvenuto! Usa il menu per aggiungere e vedere IOU.
      </p>

      <Link
        href="/add"
        className="block bg-blue-600 hover:bg-blue-700 text-white text-center py-4 rounded-lg text-xl"
      >
        ➕ Aggiungi IOU
      </Link>

      <Link
        href="/history"
        className="block bg-gray-700 hover:bg-gray-800 text-white text-center py-4 rounded-lg text-xl"
      >
        📄 Storico IOU
      </Link>

      {/* QUI compare il pagamento Pi */}
      <StartPaymentButton />
    </div>
  );
}
