import { PostListServer } from "@/components/blogPost/PostListServer";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllPostCategories } from "@/lib/sanity/queries";
import type { Metadata } from "next";
import { Suspense } from "react";
import { CategoryFilter } from "../../components/category-filter";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read my thoughts on web development, design, and technology. I also write about random things such as current trends, politics and the economy",
};

type ResolvedPageSearchParams = {
  category?: string;
  search?: string;
};

export default async function BlogPage({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<ResolvedPageSearchParams>;
}) {
  const resolvedSearchParams = (await searchParamsPromise) || {};
  const category = resolvedSearchParams.category;
  const search = resolvedSearchParams.search;
  const allCategories = await getAllPostCategories();

  return (
    <main className="container mx-auto px-4 pt-12 pb-20 md:px-6 md:pt-16 lg:pt-20">
      {/* === Hero Section === */}
      <section className="flex flex-col items-center text-center mb-16 md:mb-20 lg:mb-24">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="bg-gradient-to-r from-primary via-accent to-primary dark:from-primary dark:via-accent/80 dark:to-primary bg-clip-text text-transparent">
              My Blog
            </span>
          </h1>

          <p className="text-lg text-muted-foreground md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto">
            Exploring web development, design, tech trends, and occasionally,
            life's random musings.
          </p>

          {/* Search and Filter Section */}
          <div className="flex flex-col items-center gap-4 pt-4 w-full max-w-2xl mx-auto">
            <div className="w-full flex justify-center">
              <Suspense>
                <CategoryFilter
                  categories={allCategories}
                  activeCategory={category}
                />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* === Blog Post List === */}
      <section className="mt-8 md:mt-12 max-w-6xl mx-auto">
        <Suspense fallback={<PostListSkeleton />}>
          <PostListServer category={category} searchQuery={search} />
        </Suspense>
      </section>
    </main>
  );
}

function PostListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:gap-10">
      {Array(3)
        .fill(0)
        .map((_, i) => (
          <article
            key={i}
            className="group flex flex-col md:flex-row md:items-start gap-6 p-5 rounded-xl border border-border/30 bg-card hover:shadow-md transition-shadow duration-200"
          >
            <div className="w-full md:w-64 lg:w-80 aspect-video shrink-0">
              <Skeleton className="h-full w-full rounded-lg bg-muted/50" />
            </div>
            <div className="flex-1 space-y-3">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                <Skeleton className="h-5 w-24 rounded-full bg-muted/40" />
                <span className="text-muted-foreground/30">•</span>
                <Skeleton className="h-5 w-28 rounded-full bg-muted/40" />
              </div>
              <Skeleton className="h-8 w-full max-w-md rounded bg-muted/60" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full rounded bg-muted/40" />
                <Skeleton className="h-4 w-11/12 rounded bg-muted/40" />
                <Skeleton className="h-4 w-4/5 rounded bg-muted/40" />
              </div>
              <div className="pt-2">
                <Skeleton className="h-6 w-32 rounded-md bg-muted/30" />
              </div>
            </div>
          </article>
        ))}
    </div>
  );
}
