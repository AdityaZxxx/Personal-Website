import { PostType } from "../../types/PostType";
import { PostNotFound } from "../custom-not-found";
import { PostCard } from "./PostCard";

interface PostListProps {
  posts: PostType[];
  notFoundMessage?: string;
}

export function PostList({ posts, notFoundMessage }: PostListProps) {
  if (!posts || posts.length === 0) {
    return <PostNotFound message={notFoundMessage} />;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}
