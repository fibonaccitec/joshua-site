import { SegmentPage, segmentMetadata } from "@/components/segment-page";

export const metadata = segmentMetadata("ar-condicionado");

export default function Page() {
  return <SegmentPage slug="ar-condicionado" />;
}
