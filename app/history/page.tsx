// app/history/page.tsx
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import HistoryPage from "@/components/HistoryPage";

export default function Page() {
  return (
    <div className="min-h-screen p-4 bg-gray-900 text-white">
      <HistoryPage />
    </div>
  );
}
