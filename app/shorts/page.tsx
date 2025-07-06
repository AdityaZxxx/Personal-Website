import { NotebookText } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

import { EnjoyingPostCTA } from "@/components/blog/CTAPostBlog";
import { SearchContent } from "@/components/common/SearchContent";
import PageHero from "@/components/hero/PageHero";
import { ShortListServer } from "@/components/short/ShortListServer";
import { ShortListSkeleton } from "@/components/skeletons/ShortListSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllShortTags } from "@/lib/sanity/queries";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Shorts",
  description:
    "Little snippets of my thoughts on web development, design, tech trends, and occasionally, life's random musings.",
  keywords: [
    "Aditya Rahmad Shorts",
    "Tech Snippets",
    "Web Dev Notes",
    "Quick Thoughts",
    "Short Articles",
    "Programming Insights",
  ],
  openGraph: {
    title: "Aditya Rahmad - Shorts",
    description:
      "Little snippets of my thoughts on web development, design, tech trends, and occasionally, life's random musings.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/shorts`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-shorts.png`,
        width: 1200,
        height: 630,
        alt: "Aditya Rahmad Shorts",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Rahmad - Shorts",
    description:
      "Little snippets of my thoughts on web development, design, tech trends, and occasionally, life's random musings.",
    creator: "@adxxya30",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-shorts.png`,
        width: 1200,
        height: 630,
        alt: "Aditya Rahmad Shorts",
      },
    ],
  },
};

type ResolvedPageSearchParams = {
  category?: string;
  search?: string;
  tag?: string;
};

const ShortsPage = async ({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<ResolvedPageSearchParams>;
}) => {
  const resolvedSearchParams = (await searchParamsPromise) || {};
  const category = resolvedSearchParams.category;
  const search = resolvedSearchParams.search;
  const tag = resolvedSearchParams.tag;
  const allTags = await getAllShortTags();

  return (
    <section className="relative">
      <header className="pointer-events-none  bg-background text-slate-200 select-none absolute top-0 left-0 right-0 h-[450px] w-full z-0 p-4 md:p-8 opacity-60">
        <div className="flex items-center justify-between invisible md:visible">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="size-4 bg-neutral-600"></div>
              <div className="size-4 bg-neutral-600"></div>
              <div className="size-4 bg-neutral-600"></div>
            </div>
            <div className="flex items-center space-x-[-1px]">
              <div className="size-4 border border-neutral-600"></div>
              <div className="size-4 border border-neutral-600"></div>
              <div className="size-4 border border-neutral-600"></div>
              <div className="size-4 border border-neutral-600"></div>
            </div>
          </div>
          <div className="space-y-1 text-right">
            <div className="flex items-baseline justify-start gap-2">
              <span className="inline-block min-w-[8ch] pr-4 text-sm text-muted-foreground">
                Notes
              </span>
              <span className="flex flex-col">
                <span className="font-handwriting text-sm tracking-wider text-muted-foreground">
                  Aditya shorts
                </span>
                <span className="bg-background h-[1px] w-full"></span>
              </span>
            </div>
            <div className="flex items-baseline justify-start gap-2">
              <span className="inline-block min-w-[8ch] pr-4 text-sm text-muted-foreground">
                Date
              </span>
              <span className="font-handwriting text-sm text-muted-foreground">
                {formatDate(new Date())}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-5">
          <hr className="border-neutral-600 border-[1.5px]" />
          <hr className="border-neutral-600 border-[0.5px] mt-1" />
          <div
            className="mt-1"
            style={{
              height: "2px",
              backgroundImage:
                "radial-gradient(circle, rgb(63 63 70) 1px, transparent 1px)",
              backgroundSize: "50px 2px",
              backgroundPosition: "-24px 0px",
            }}
          ></div>
        </div>
        <div className="flex flex-col gap-4 md:gap-8 opacity-30 mt-8">
          <hr className="border-neutral-600 border-dashed" />
          <hr className="border-neutral-600" />
          <hr className="border-neutral-600 border-dashed" />
          <hr className="border-neutral-600" />
          <hr className="border-neutral-600 border-dashed" />
          <hr className="border-neutral-600" />
        </div>
      </header>
      <div className="text-center justify-center flex flex-col items-center pt-30 space-y-1 z-50">
        <PageHero
          icon={<NotebookText />}
          title="Shorts"
          coloredTitle="Snippets"
          description="My personal notes that's not long enough to be a blog post"
        />
        <Suspense fallback={<Skeleton className="h-16 w-full rounded-md" />}>
          <div className="h-16 w-full flex items-center justify-center">
            <SearchContent placeholder="Search something..." />
          </div>
        </Suspense>
      </div>
      <main className="flex flex-col max-w-5xl mx-auto px-4 py-16 md:py-24 gap-16 z-10">
        <Suspense fallback={<ShortListSkeleton />}>
          <ShortListServer
            category={category}
            searchQuery={search}
            tag={tag}
            allTags={allTags}
          />
        </Suspense>

        <EnjoyingPostCTA title="Join to the newsletter list" />
      </main>
    </section>
  );
};

export default ShortsPage;
