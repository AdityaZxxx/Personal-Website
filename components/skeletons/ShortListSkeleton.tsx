import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";

const ShortCardSkeleton = () => {
  return (
    <div className="space-y-4 max-w-md">
      <Card className="bg-background overflow-hidden">
        <CardContent>
          <div className="flex flex-col text-start">
            <Skeleton className="h-6 w-3/4 mb-2" />
          </div>
          <div className="flex items-center gap-1.5 text-xs pt-8">
            <Skeleton className="h-4 w-1/4" />
          </div>
        </CardContent>
        <Separator />
        <CardFooter>
          <div className="flex flex-wrap items-center gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export const ShortListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1 flex flex-col gap-4 lg:order-last">
        <Skeleton className="h-10 w-full" /> {/* SortFilter */}
        <Skeleton className="h-24 w-full" /> {/* TagFilter */}
      </div>
      <div className="lg:col-span-3 lg:order-first">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ShortCardSkeleton />
          <ShortCardSkeleton />
          <ShortCardSkeleton />
          <ShortCardSkeleton />
          <ShortCardSkeleton />
          <ShortCardSkeleton />
        </div>
      </div>
    </div>
  );
};