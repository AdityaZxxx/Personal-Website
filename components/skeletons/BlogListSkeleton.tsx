import { Skeleton } from "../ui/skeleton";
import { BlogPostCardSkeleton } from "./BlogCardListSkeleton";

export function BlogListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Placeholder for Filters */}
      <div className="lg:col-span-1 flex flex-col gap-4 lg:order-last lg:sticky lg:top-24 self-start">
        {/* SortFilter Placeholder */}
        <div className="p-4 border rounded-xl bg-background/80 shadow-sm">
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
        {/* CategoryFilter Placeholder */}
        <div className="p-4 border rounded-xl bg-background/80 shadow-sm space-y-3">
          <Skeleton className="h-5 w-3/4 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
          <Skeleton className="h-4 w-5/6 rounded-md" />
          <Skeleton className="h-4 w-full rounded-md" />
        </div>
      </div>

      {/* Placeholder for Blog Post Cards */}
      <div className="lg:col-span-3 lg:order-first">
        <div className="grid grid-cols-1">
          {Array.from({ length: count }).map((_, i) => (
            <BlogPostCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
