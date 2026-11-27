import { SegmentPage, segmentMetadata } from "@/components/segment-page";

export const metadata = segmentMetadata("energia-solar");

export default function Page() {
  return <SegmentPage slug="energia-solar" />;
}
