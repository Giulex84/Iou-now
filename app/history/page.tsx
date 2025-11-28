// Disabilita completamente il prerendering
export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

import dynamicImport from "next/dynamic";

// Caricamento dinamico del componente con ssr OFF
const HistoryPage = dynamicImport(() => import("@/components/HistoryPage"), {
  ssr: false,
});

export default function Page() {
  return <HistoryPage />;
}
