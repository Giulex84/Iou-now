// app/history/page.tsx
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import HistoryContent from "@/components/HistoryContent";

export default function HistoryPage() {
  return (
    <div className="min-h-screen p-4 bg-gray-900 text-white">
      <HistoryContent />
    </div>
  );
}
