import { CategoryFilter } from "@/components/filters/CategoryFilter";
import { GalleryGrid } from "@/components/gallery/GalleryList";
import PageHero from "@/components/hero/PageHero";
import { Spotlight } from "@/components/hero/Spotlight";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllGalleryCategories } from "@/lib/sanity/queries";
import { ImagesIcon } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore my collection of photos and videos.",
  keywords: [
    "Aditya Rahmad Gallery",
    "Photography",
    "Videography",
    "Personal Collection",
    "Memories",
  ],
  openGraph: {
    title: "Aditya Rahmad - Gallery",
    description: "Explore my collection of photos and videos.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/gallery`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-gallery.png`,
        width: 1200,
        height: 630,
        alt: "Aditya Rahmad Gallery",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Rahmad - Gallery",
    description: "Explore my collection of photos and videos.",
    creator: "@adxxya30",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-gallery.png`,
        width: 1200,
        height: 630,
        alt: "Aditya Rahmad Gallery",
      },
    ],
  },
};

interface GalleryPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  return (
    <Suspense fallback={<div>Loading Gallery...</div>}>
      <GalleryContent searchParams={searchParams} />
    </Suspense>
  );
}

async function GalleryContent({ searchParams }: GalleryPageProps) {
  const { category } = await searchParams;
  const categories = await getAllGalleryCategories();

  return (
    <main className="flex flex-col max-w-5xl mx-auto px-4 py-16 md:py-24 gap-16">
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="oklch(74.6% 0.16 232.661)"
      />
      <Spotlight
        className="-top-40 left-[-10rem] md:-top-20 md:left-[-20rem]"
        fill="oklch(74.6% 0.16 232.661)"
      />
      <PageHero
        icon={<ImagesIcon className="h-8 w-8" />}
        title="Capture"
        coloredTitle="Memory"
        description="Here's my gallery memes, screenshots, terminal chaos, and the occasional K-pop bias. No context, no rules — just the stuff that makes me pause and save."
      />

      <CategoryFilter categories={categories} activeCategory={category} />

      <div className="mt-8">
        <Suspense fallback={<Skeleton className="h-10 w-48 rounded-md" />}>
          <GalleryGrid category={category} />
        </Suspense>
      </div>
    </main>
  );
}
