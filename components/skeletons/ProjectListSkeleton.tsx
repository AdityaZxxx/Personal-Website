import { ProjectCardSkeleton } from "./ProjectCardSkeleton";

export function ProjectListSkeleton({ count = 2 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-16 md:gap-24">
      {Array.from({ length: count }).map((_, i) => (
        <ProjectCardSkeleton key={i} index={i} />
      ))}
    </div>
  );
}
