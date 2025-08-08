import { CategoryFilter } from "@/components/filters/CategoryFilter";
import PageHero from "@/components/hero/PageHero";
import { Spotlight } from "@/components/hero/Spotlight";
import { ProjectList } from "@/components/project/ProjectList";
import { ProjectListSkeleton } from "@/components/skeletons/ProjectListSkeleton";
import { getAllProjectCategories } from "@/lib/sanity/queries";
import { FolderOpen } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore my portfolio of web development and projects.",
  keywords: [
    "Aditya Rahmad Projects",
    "Portfolio",
    "Web Development",
    "Software Projects",
    "Frontend Projects",
    "Backend Projects",
    "Fullstack Projects",
  ],
  openGraph: {
    title: "Aditya Rahmad - Projects",
    description: "Explore my portfolio of web development and projects.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/projects`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-projects.png`,
        width: 1200,
        height: 630,
        alt: "Aditya Rahmad Projects Portfolio",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Rahmad - Projects",
    description: "Explore my portfolio of web development and projects.",
    creator: "@adxxya30",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-projects.png`,
        width: 1200,
        height: 630,
        alt: "Aditya Rahmad Projects Portfolio",
      },
    ],
  },
};

type ResolvedPageSearchParams = {
  category?: string;
  search?: string;
};

const ProjectsPage = async ({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<ResolvedPageSearchParams>;
}) => {
  const resolvedSearchParams = (await searchParamsPromise) || {};
  const currentCategory = resolvedSearchParams.category;
  const allCategories = await getAllProjectCategories();

  return (
    <section className="overflow-hidden">
      <header>
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="oklch(74.6% 0.16 232.661)"
        />
        <Spotlight
          className="-top-40 left-[-10rem] md:-top-20 md:left-[-20rem]"
          fill="oklch(74.6% 0.16 232.661)"
        />
        <div className="text-center justify-center flex flex-col items-center pt-30 space-y-1 z-50 px-4">
          <PageHero
            icon={<FolderOpen className="h-8 w-8" />}
            title="Current "
            coloredTitle="Projects"
            description="Here are some things I've built — not just to sharpen my skills, but to explore ideas and solve problems I actually care about."
          />
        </div>
      </header>
      <main className="flex flex-col max-w-5xl mx-auto px-4 py-16 md:py-24 gap-16">
        <div className="flex justify-center">
          <CategoryFilter
            categories={allCategories}
            activeCategory={currentCategory}
          />
        </div>

        <Suspense fallback={<ProjectListSkeleton />}>
          <ProjectList category={currentCategory} />
        </Suspense>
      </main>
    </section>
  );
};

export default ProjectsPage;
