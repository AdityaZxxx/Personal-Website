import { BlogSearch } from "@/components/blog-search";
import { PostListServer } from "@/components/blogPost/PostListServer";
import { CategoryFilter } from "@/components/category-filter";
import { Skeleton } from "@/components/ui/skeleton"; // Assuming Skeleton is from shadcn/ui
import { getAllCategories } from "@/lib/sanity/queries";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read my thoughts on web development, design, and technology. I also write about random things such as current trends, politics and the economy",
};

// Definisikan tipe untuk objek searchParams yang telah di-resolve
type ResolvedSearchParams = {
  category?: string;
  search?: string;
};

// Komponen BlogPage Anda
export default async function BlogPage(
  // 'props' adalah objek, bukan Promise.
  // 'props.searchParams' adalah Promise yang berisi objek ResolvedSearchParams.
  props: {
    // params: Promise<{ yourRouteParam?: string }>; // Tambahkan ini jika halaman Anda memiliki parameter rute dinamis
    searchParams: Promise<ResolvedSearchParams>;
  }
) {
  // Ambil dan await props.searchParams untuk mendapatkan objek search parameters
  const resolvedSearchParams = await props.searchParams;

  const search = resolvedSearchParams.search;
  const category = resolvedSearchParams.category;

  const categories = await getAllCategories();

  return (
    <main className="container mx-auto px-4 py-12 md:px-6 md:py-20 lg:py-24">
      {/* === Hero Section === */}
      <div className="flex flex-col items-center text-center mb-16 md:mb-20">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl pb-3 relative group">
            {/* Main gradient text - using the refined animation */}
            <span
              className="relative z-10 bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] 
                         bg-clip-text text-transparent 
                         motion-safe:animate-gradient-slow dark:via-accent/90" // Assumes animate-gradient-slow is in global CSS
            >
              My Blog
            </span>
            {/* Subtle glow */}
            <span
              className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/20 to-primary/30 
                         dark:from-primary/15 dark:via-accent/10 dark:to-primary/15 
                         bg-clip-text text-transparent blur-xl opacity-70 
                         group-hover:opacity-90 motion-safe:transition-opacity motion-safe:duration-500 -z-10"
            >
              My Blog
            </span>
            {/* Refined underline animation */}
            <span
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-[4px] bg-gradient-to-r from-primary to-accent 
                         w-0 group-hover:w-1/3 motion-safe:transition-all motion-safe:duration-700 ease-out 
                         [background-size:200%_auto] motion-safe:group-hover:animate-gradient-slow rounded-full"
            />
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
            Exploring web development, design, tech trends, and occasionally,
            life's random musings.
          </p>
        </div>
      </div>

      {/* === Sticky Filter & Search Bar === */}
      <div className="sticky top-0 z-20 py-5 bg-background/90 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80 border-b border-border/30 shadow-sm">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* CategoryFilter might need internal adjustments for responsiveness in this context */}
            <div className="w-full md:w-auto">
              {" "}
              {/* Allow CategoryFilter to take space or manage its own width */}
              <CategoryFilter categories={categories} activeCategory={search} />
            </div>
            <div className="w-full md:w-auto md:max-w-xs">
              {" "}
              {/* Constrain search bar width on larger screens */}
              <BlogSearch />
            </div>
          </div>
        </div>
      </div>

      {/* === Blog Post List === */}
      <div className="mt-12 md:mt-16 max-w-5xl mx-auto">
        {" "}
        {/* Slightly narrower for better blog readability */}
        <Suspense fallback={<PostListSkeleton />}>
          <PostListServer category={category} searchQuery={search} />
        </Suspense>
      </div>
    </main>
  );
}

function PostListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-10 md:gap-12">
      {" "}
      {/* Increased gap */}
      {Array(4) // Reduced to 4 for a cleaner skeleton page, adjust as needed
        .fill(0)
        .map((_, i) => (
          <article // Changed to <article> for semantic correctness
            key={i}
            className="group flex flex-col md:flex-row md:items-start gap-6 lg:gap-8 p-4 rounded-xl border border-border/20 bg-card shadow-sm hover:shadow-lg motion-safe:transition-shadow motion-safe:duration-300"
          >
            {/* Image Placeholder */}
            <div className="w-full md:w-[280px] lg:w-[320px] aspect-[16/10] md:aspect-[4/3] shrink-0">
              <Skeleton className="h-full w-full rounded-lg bg-muted/60 group-hover:opacity-90 motion-safe:transition-opacity" />
            </div>
            {/* Content Placeholder */}
            <div className="flex-1 space-y-3 pt-2 md:pt-0">
              {/* Category/Date Placeholder */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                <Skeleton className="h-5 w-20 rounded-full bg-muted/50" />
                <span className="text-muted-foreground/50">•</span>
                <Skeleton className="h-5 w-24 rounded-full bg-muted/50" />
              </div>
              {/* Title Placeholder */}
              <Skeleton className="h-7 w-full rounded bg-muted/60" />
              <Skeleton className="h-7 w-3/4 rounded bg-muted/60 md:hidden" />{" "}
              {/* Shorter line for mobile title */}
              {/* Excerpt Placeholder Lines */}
              <div className="space-y-2 pt-1">
                <Skeleton className="h-4 w-full rounded bg-muted/50" />
                <Skeleton className="h-4 w-5/6 rounded bg-muted/50" />
                <Skeleton className="h-4 w-full rounded bg-muted/50 sm:w-11/12" />
                <Skeleton className="h-4 w-3/4 rounded bg-muted/50 sm:w-1/2" />
              </div>
              {/* Read More Placeholder */}
              <div className="pt-2">
                <Skeleton className="h-6 w-32 rounded-md bg-muted/40" />
              </div>
            </div>
          </article>
        ))}
    </div>
  );
}
