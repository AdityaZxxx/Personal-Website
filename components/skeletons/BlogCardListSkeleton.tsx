import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export function BlogPostCardSkeleton() {
  return (
    <div className="space-y-4 ">
      <Card className="overflow-hidden bg-background border-x-0 border-y rounded-none">
        <CardContent className="p-4 flex gap-3 flex-col md:flex-row">
          <div className="flex-1 min-w-0 order-2 md:order-1 space-y-3 py-1">
            {/* Date */}
            <Skeleton className="h-4 w-24 rounded-md" />
            {/* Title */}
            <Skeleton className="h-5 w-full rounded-md" />
            <Skeleton className="h-5 w-5/6 rounded-md md:w-full" />
            {/* Excerpt */}
            <Skeleton className="h-4 w-11/12 rounded-md" />
            <div className="flex items-center justify-between pt-2">
              {/* Meta info (reading time, views) */}
              <div className="flex items-center gap-4">
                <Skeleton className="h-4 w-20 rounded-md" />
                <Skeleton className="h-4 w-20 rounded-md" />
              </div>
              {/* Category */}
              <Skeleton className="h-6 w-16 rounded-full" />
            </div>
          </div>
          {/* Image */}
          <div className="order-1 md:order-2 relative w-full rounded-md overflow-hidden aspect-video flex-shrink-0 md:w-48 lg:w-56">
            <Skeleton className="h-full w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
