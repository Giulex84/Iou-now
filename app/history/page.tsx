import dynamic from "next/dynamic";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

const Page = dynamic(() => import("@/components/HistoryPage"), {
  ssr: false,
});

export default Page;
