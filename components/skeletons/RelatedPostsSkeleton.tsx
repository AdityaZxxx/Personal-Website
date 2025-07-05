import { BlogPostCardSkeleton } from "./BlogCardListSkeleton";

export default function RelatedPostsSkeleton() {
  return (
    <section aria-labelledby="related-posts-loading">
      <div className="max-w-5xl pt-8">
        <h3 className="text-3xl font-semibold text-primary mb-4 animate-pulse bg-gray-200 dark:bg-gray-700 h-9 w-3/4 rounded"></h3>
        <BlogPostCardSkeleton />
      </div>
    </section>
  );
}
