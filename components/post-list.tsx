import { PostCard } from "@/components/post-card";
import { getAllPosts } from "@/lib/sanity/queries";

interface PostListProps {
  searchParams: {
    category?: string;
  };
}

export async function PostList({ searchParams }: PostListProps) {
  // Extract category from searchParams here
  // const category = searchParams?.category;
  const category =
    typeof searchParams?.category === "string"
      ? searchParams.category
      : undefined;

  const posts = await getAllPosts(category);

  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No posts found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post: any) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
