import { PostList } from "@/components/post-list";
import { getAllPosts } from "@/lib/sanity/queries";

interface PostListServerProps {
  category?: string;
}

export async function PostListServer({ category }: PostListServerProps) {
  const posts = await getAllPosts(category);
  return <PostList posts={posts} />;
}
