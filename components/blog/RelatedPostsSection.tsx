import { BlogList } from "@/components/blog/BlogList";
import { getFeaturedPosts } from "@/lib/sanity/queries";
import { PostType } from "@/types";

interface RelatedPostsSectionProps {
  currentPostSlug: string;
}

export default async function RelatedPostsSection({
  currentPostSlug,
}: RelatedPostsSectionProps) {
  const featuredPostsData = await getFeaturedPosts(4);

  const filteredFeaturedPosts = featuredPostsData
    .filter((p: PostType) => p.slug !== currentPostSlug)
    .slice(0, 3);

  return (
    <section aria-labelledby="related-posts">
      <div className="max-w-5xl pt-8">
        <h3 className="text-3xl font-semibold text-primary mb-4">
          Other posts that you might{" "}
          <span className="text-neutral-500 relative">
            like
            <svg
              width="50"
              height="6"
              viewBox="0 0 59 6"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-0 top-1/2 -translate-y-1/2"
            >
              <path
                d="M1.64551 2.13477C19.9663 2.33536 38.4441 2.4829 56.7064 4.00476"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
              ></path>
            </svg>
          </span>{" "}
          <span
            className="pl-2"
            style={{
              fontFamily: "Shadows Into Light",
              fontWeight: 600,
              fontStyle: "normal",
            }}
          >
            love
          </span>
        </h3>
        <BlogList
          posts={filteredFeaturedPosts}
          allCategories={[]}
          showFilters={false}
        />
      </div>
    </section>
  );
}
