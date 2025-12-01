// app/add/page.tsx
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import AddIOUForm from "@/components/AddIOUForm";

export default function AddPage() {
  return (
    <div className="min-h-screen p-4 bg-gray-900 text-white">
      <AddIOUForm />
    </div>
  );
}
