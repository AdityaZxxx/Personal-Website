import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { PostType } from "../types/PostType";
import { BlurImage } from "./blur-image";

type PostCardProps = {
  post: PostType;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/blog/${post.slug.current}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md dark:hover:shadow-purple-900 h-full flex flex-col border-2">
        <div className="relative aspect-video overflow-hidden">
          {post.mainImage ? (
            <BlurImage
              image={post.mainImage}
              alt={post.title}
              fill
              className="transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </div>
        <CardContent className="p-4 flex flex-wrap gap-2">
          {post.categories?.slice(0, 5).map((category) => (
            <Badge
              key={category.title}
              variant="secondary"
              className=" bg-slate-200 dark:bg-slate-600"
            >
              {category.title}
            </Badge>
          ))}
          <h3 className="font-bold line-clamp-1 text-start">{post.title}</h3>
          {post.excerpt && (
            <p className="mt-2 text-sm text-start text-muted-foreground line-clamp-2">
              {post.excerpt}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between p-4 pt-0 text-sm text-muted-foreground">
          <div className="flex items-center">
            <Calendar className="mr-1 h-3 w-3" />
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
          {post.estimatedReadingTime && (
            <div>{post.estimatedReadingTime} min read</div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
