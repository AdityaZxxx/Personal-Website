import { CategoryFilter } from "@/components/category-filter";
import { ProjectList } from "@/components/project-list";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllProjectCategories } from "@/lib/sanity/queries";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Projects | Aditya",
  description: "Explore my portfolio of web development and design projects.",
};

interface ProjectsPageProps {
  searchParams: {
    category?: string;
  };
}

export default async function ProjectsPage({
  searchParams,
}: ProjectsPageProps) {
  const category = await searchParams.category;
  const categories = await getAllProjectCategories();

  return (
    <main className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Projects
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          A showcase of my work and projects
        </p>
      </div>

      <CategoryFilter categories={categories} activeCategory={category} />

      <div className="mt-8">
        <Suspense fallback={<ProjectListSkeleton />}>
          <ProjectList category={category} />
        </Suspense>
      </div>
    </main>
  );
}

function ProjectListSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {Array(6)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="flex flex-col space-y-3">
            <Skeleton className="h-[200px] w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
    </div>
  );
}
