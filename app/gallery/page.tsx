import { CategoryFilter } from "@/components/category-filter";
import { GalleryGrid } from "@/components/gallery-grid";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllGalleryCategories } from "@/lib/sanity/queries";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Gallery",
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
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl pb-2 relative group">
          {/* Main gradient text - enhanced contrast for light mode */}
          <span className="relative z-10 bg-gradient-to-r from-primary via-accent/90 to-primary bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent dark:via-accent">
            Gallery
          </span>

          {/* Enhanced glow shadow - more visible in light mode */}
          <span className="absolute inset-0 bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40 dark:from-primary/20 dark:via-accent/15 dark:to-primary/20 bg-clip-text text-transparent blur-[12px] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            Gallery
          </span>

          {/* More prominent underline animation */}
          <span className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-primary to-accent w-0 group-hover:w-full transition-all duration-700 ease-out [background-size:200%_auto] group-hover:animate-gradient" />
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
