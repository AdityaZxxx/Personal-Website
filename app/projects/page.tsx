// File: app/projects/page.tsx (atau path yang sesuai)
import { CategoryFilter } from "@/components/category-filter";
import { ProjectList } from "@/components/project/ProjectList"; // Pastikan path ini benar
import { Skeleton } from "@/components/ui/skeleton";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProjectCategories } from "../../lib/sanity/queries"; // Pastikan path ini benar

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore my portfolio of web development and design projects.",
};

// Tipe untuk searchParams yang sudah di-resolve
type ResolvedPageSearchParams = {
  category?: string;
  search?: string; // Meskipun tidak digunakan saat ini, jaga jika diperlukan nanti
};

export default async function ProjectsPage({
  searchParams: searchParamsPromise, // Destructure dan rename untuk kejelasan
}: {
  searchParams: Promise<ResolvedPageSearchParams>;
}) {
  const resolvedSearchParams = (await searchParamsPromise) || {};

  const category = resolvedSearchParams.category;

  const allCategories = await getAllProjectCategories();

  return (
    <main className="container mx-auto px-4 py-16 md:px-6 md:py-24 lg:py-32">
      <div className="flex flex-col items-center justify-center space-y-6 text-center mb-16 md:mb-20">
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl pb-3 relative group">
          <span
            className="relative z-10 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto]
                       bg-clip-text text-transparent
                       motion-safe:animate-gradient-slow dark:via-accent/90"
          >
            Projects
          </span>
          <span
            className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30
                       dark:from-primary/15 dark:via-accent/10 dark:to-primary/15
                       bg-clip-text text-transparent blur-xl opacity-70
                       group-hover:opacity-90 motion-safe:transition-opacity motion-safe:duration-500 -z-10"
          >
            Projects
          </span>
          <span
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[4px] bg-gradient-to-r from-primary to-accent
                       w-0 group-hover:w-1/3 motion-safe:transition-all motion-safe:duration-700 ease-out
                       [background-size:200%_auto] motion-safe:group-hover:animate-gradient-slow rounded-full"
          />
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl lg:text-xl">
          A curated showcase of my passion, skills, and creative endeavors.
        </p>
      </div>

      <div className="mb-12 md:mb-16 flex justify-center">
        {/* Teruskan semua kategori dan kategori yang aktif ke CategoryFilter */}
        <CategoryFilter categories={allCategories} activeCategory={category} />
      </div>

      <div className="mt-8">
        <Suspense fallback={<ProjectListSkeleton />}>
          {/* Teruskan hanya props yang dibutuhkan oleh ProjectList */}
          {/* Jika ProjectList hanya butuh category, teruskan category */}
          <ProjectList category={category} />
          {/* Jika ProjectList butuh lebih banyak dari searchParams, Anda bisa meneruskan resolvedSearchParams: */}
          {/* <ProjectList searchParams={resolvedSearchParams} /> // Ini akan memerlukan perubahan di ProjectList */}
        </Suspense>
      </div>
    </main>
  );
}

// ProjectListSkeleton tetap sama
function ProjectListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div
            key={i} // Menggunakan index sebagai key di sini oke karena listnya statis
            className="flex flex-col space-y-4 bg-card p-4 rounded-xl border border-border/20 shadow-sm"
          >
            <Skeleton className="h-[220px] w-full rounded-lg bg-muted/50" />
            <div className="space-y-2 pt-1">
              <Skeleton className="h-6 w-3/4 rounded bg-muted/50" />
              <Skeleton className="h-4 w-full rounded bg-muted/40" />
              <Skeleton className="h-4 w-5/6 rounded bg-muted/40" />
              <Skeleton className="h-5 w-1/3 rounded-full bg-muted/30 mt-2" />
            </div>
          </div>
        ))}
    </div>
  );
}
