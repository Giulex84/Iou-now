import dynamicImport from "next/dynamic";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const HistoryPage = dynamicImport(() => import("@/components/HistoryPage"), {
  ssr: false,
});

export default function Page() {
  return <HistoryPage />;
}
