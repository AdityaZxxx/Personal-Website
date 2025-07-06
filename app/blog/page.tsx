import { BlogListServer } from "@/components/blog/BlogListServer";
import { SearchContent } from "@/components/common/SearchContent";
import PageHero from "@/components/hero/PageHero";
import { Spotlight } from "@/components/hero/Spotlight";
import { BlogListSkeleton } from "@/components/skeletons/BlogListSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllPostCategories } from "@/lib/sanity/queries";
import { BookText } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read my thoughts on web development, design, and technology. I also write about random things such as current trends, politics and the economy",
  keywords: [
    "Aditya Rahmad Blog",
    "Web Development Blog",
    "Tech Blog",
    "Programming Articles",
    "Design Blog",
    "Technology Trends",
    "Personal Blog",
  ],
  openGraph: {
    title: "Aditya Rahmad - Blog",
    description:
      "Read my thoughts on web development, design, and technology. I also write about random things such as current trends, politics and the economy",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/blog`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image-blog.png`,
        width: 1200,
        height: 630,
        alt: "Aditya Rahmad Blog Posts",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Rahmad - Blog",
    description:
      "Read my thoughts on web development, design, and technology. I also write about random things such as current trends, politics and the economy",
    creator: "@adxxya30",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image-blog.png`,
        width: 1200,
        height: 630,
        alt: "Aditya Rahmad Blog Posts",
      },
    ],
  },
};
type ResolvedPageSearchParams = {
  search?: string;
  category?: string;
};

const BlogPage = async ({
  searchParams: searchParamsPromise,
}: {
  searchParams: Promise<ResolvedPageSearchParams>;
}) => {
  const resolvedSearchParams = (await searchParamsPromise) || {};
  // TODO: Fix this search to use s=value
  const search = resolvedSearchParams.search;
  const category = resolvedSearchParams.category;
  const allCategories = await getAllPostCategories();

  return (
    <section className="flex flex-col min-h-screen">
      <header>
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="oklch(74.6% 0.16 232.661)"
        />
        <Spotlight
          className="-top-40 left-[-10rem] md:-top-20 md:left-[-20rem]"
          fill="oklch(74.6% 0.16 232.661)"
        />
        <div className="text-center justify-center flex flex-col items-center pt-30 space-y-1">
          <PageHero
            icon={<BookText />}
            title="Blog"
            coloredTitle="Posts"
            description="Not just about code — I write to make sense of the things I don’t fully understand yet."
          />
          <Suspense fallback={<Skeleton className="h-16 w-full rounded-md" />}>
            <div className="h-16 max-w-[300px] md:max-w-full flex items-center justify-center px-4">
              <SearchContent placeholder="Search something..." />
            </div>
          </Suspense>
        </div>
      </header>
      <main className="flex flex-col max-w-5xl mx-auto px-4 py-12 md:py-20 gap-16">
        <Suspense fallback={<BlogListSkeleton />}>
          <BlogListServer
            category={category}
            searchQuery={search}
            allCategories={allCategories}
          />
        </Suspense>
      </main>
    </section>
  );
};

export default BlogPage;
