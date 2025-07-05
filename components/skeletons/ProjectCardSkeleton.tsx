import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ProjectCardSkeleton({ index }: { index: number }) {
  const isReversed = index % 2 !== 0;

  return (
    <Card className="bg-transparent border-none shadow-none">
      <CardContent className="grid md:grid-cols-2 gap-x-8 lg:gap-x-12 items-center p-0">
        {/* Image Skeleton - First in DOM for mobile */}
        <div
          className={cn(
            "relative aspect-video rounded-lg overflow-hidden w-full",
            isReversed ? "md:col-start-2" : "md:col-start-1"
          )}
        >
          <Skeleton className="h-full w-full" />
        </div>

        {/* Text Content Skeleton - Second in DOM for mobile */}
        <div
          className={cn(
            "flex flex-col mt-6 md:mt-0",
            isReversed ? "md:col-start-1" : "md:col-start-2",
            "md:row-start-1" // Ensure it stays on the same row on desktop
          )}
        >
          {/* Title Skeleton */}
          <Skeleton className="h-7 w-3/4 rounded-md" />

          {/* Excerpt Skeleton */}
          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
          </div>

          {/* Technologies Skeleton */}
          <div className="flex flex-wrap gap-2 mt-4">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>

          {/* Action Buttons Skeleton */}
          <div className="flex items-center gap-4 mt-6">
            <Skeleton className="h-10 w-32 rounded-full" />
            <Skeleton className="h-5 w-28 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
