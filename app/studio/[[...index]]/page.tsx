import config from "@/sanity.config";
import type { Metadata } from "next";
import { NextStudio } from "next-sanity/studio";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: "Sanity Studio",
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
