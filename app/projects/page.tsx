import { CategoryFilter } from "@/components/category-filter";
import { ProjectList } from "@/components/project/ProjectList";
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

export default async function ProjectsPage(props: ProjectsPageProps) {
  const searchParams = await props.searchParams;

  const category =
    typeof searchParams?.category === "string"
      ? searchParams.category
      : undefined;

  const categories = await getAllProjectCategories();

  return (
    <main className="container px-4 py-12 md:px-6 md:py-24">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl pb-2 relative group">
          {/* Main gradient text - enhanced contrast for light mode */}
          <span className="relative z-10 bg-gradient-to-r from-primary via-accent/90 to-primary bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent dark:via-accent">
            Projects
          </span>

          {/* Enhanced glow shadow - more visible in light mode */}
          <span className="absolute inset-0 bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40 dark:from-primary/20 dark:via-accent/15 dark:to-primary/20 bg-clip-text text-transparent blur-[12px] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
            Projects
          </span>

          {/* More prominent underline animation */}
          <span className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-primary to-accent w-0 group-hover:w-full transition-all duration-700 ease-out [background-size:200%_auto] group-hover:animate-gradient" />
        </h1>
        <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          A showcase of my work and projects
        </p>
      </div>

      <CategoryFilter categories={categories} activeCategory={category} />

      <div className="mt-8">
        <Suspense fallback={<ProjectListSkeleton />}>
          <ProjectList searchParams={searchParams} />
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
