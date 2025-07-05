import { getAllPosts } from "@/lib/sanity/queries";
import { BlogList } from "./BlogList";

interface PostListServerProps {
  category?: string;
  searchQuery?: string;
  allCategories: { _id: string; title: string; slug: string }[];
}

export async function BlogListServer({
  category,
  searchQuery,
  allCategories,
}: PostListServerProps) {
  const posts = await getAllPosts(category, searchQuery);

  return (
    <BlogList
      posts={posts}
      allCategories={allCategories}
      activeCategory={category}
    />
  );
}
