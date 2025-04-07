import { CategoryFilter } from "@/components/category-filter";
import { GalleryGrid } from "@/components/gallery-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllGalleryCategories } from "@/lib/sanity/queries";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Gallery | Aditya",
  description: "Explore my collection of photos and videos.",
};

interface GalleryPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function GalleryPage({ searchParams }: GalleryPageProps) {
  const { category } = await searchParams;
  const categories = await getAllGalleryCategories();

  return (
    <main className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Gallery
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          A collection of my photos and videos
        </p>
      </div>

      <CategoryFilter categories={categories} activeCategory={category} />

      <div className="mt-8">
        <Suspense fallback={<GalleryGridSkeleton />}>
          <GalleryGrid category={category} />
        </Suspense>
      </div>
    </main>
  );
}

function GalleryGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array(9)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="aspect-square w-full">
            <Skeleton className="h-full w-full rounded-lg" />
          </div>
        ))}
    </div>
  );
}
