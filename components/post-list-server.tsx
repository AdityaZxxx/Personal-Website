import { PostList } from "@/components/post-list";
import { getAllPosts } from "@/lib/sanity/queries";

interface PostListServerProps {
  category?: string;
  searchQuery?: string;
}

export async function PostListServer({
  category,
  searchQuery,
}: PostListServerProps) {
  const posts = await getAllPosts(category, searchQuery);
  return <PostList posts={posts} />;
}
