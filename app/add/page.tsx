// app/add/page.tsx
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import AddForm from "@/components/AddForm";

export default function AddPage() {
  return (
    <div className="min-h-screen p-4 bg-gray-900 text-white">
      <AddForm />
    </div>
  );
}
