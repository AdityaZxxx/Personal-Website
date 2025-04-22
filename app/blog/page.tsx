import { CategoryFilter } from "@/components/category-filter";
import { PostListServer } from "@/components/post-list-server";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllCategories } from "@/lib/sanity/queries";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog | Aditya",
  description:
    "Read my thoughts on web development, design, and technology. I also write about random things such as current trends, politics and the economy",
};

interface BlogPageProps {
  searchParams: {
    category?: string;
  };
}

export default async function BlogPage(props: BlogPageProps) {
  const searchParams = await props.searchParams;

  const category =
    typeof searchParams?.category === "string"
      ? searchParams.category
      : undefined;

  const categories = await getAllCategories();

  return (
    <main className="container px-4 py-8 md:px-6 md:py-12 lg:py-16">
      <div className="flex flex-col items-center text-center mb-12">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl pb-2 relative group">
            {/* Main gradient text - enhanced contrast for light mode */}
            <span className="relative z-10 bg-gradient-to-r from-primary via-accent/90 to-primary bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent dark:via-accent">
              My Blog
            </span>

            {/* Enhanced glow shadow - more visible in light mode */}
            <span className="absolute inset-0 bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40 dark:from-primary/20 dark:via-accent/15 dark:to-primary/20 bg-clip-text text-transparent blur-[12px] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              My Blog
            </span>

            {/* More prominent underline animation */}
            <span className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-primary to-accent w-0 group-hover:w-full transition-all duration-700 ease-out [background-size:200%_auto] group-hover:animate-gradient" />
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
            Thoughts, ideas, and insights on web development and design. I also
            write about random things such as current trends, politics and the
            economy.
          </p>
        </div>
      </div>

      <div className="sticky top-0 z-10 py-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <CategoryFilter categories={categories} activeCategory={category} />
      </div>

      <div className="mt-8 max-w-7xl mx-auto">
        <Suspense fallback={<PostListSkeleton />}>
          <PostListServer category={category} />
        </Suspense>
      </div>
    </main>
  );
}

function PostListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="group flex flex-col space-y-4">
            <Skeleton className="h-48 w-full rounded-xl transition-all group-hover:opacity-90" />
            <div className="space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <div className="flex space-x-2">
                <Skeleton className="h-4 w-16 rounded-full" />
                <Skeleton className="h-4 w-20 rounded-full" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>
        ))}
    </div>
  );
}
