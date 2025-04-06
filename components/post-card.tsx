import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { urlForImage } from "@/lib/sanity/image";
import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface PostCardProps {
  post: {
    _id: string;
    title: string;
    slug: {
      _type: string;
      current: string;
    };
    excerpt?: string;
    mainImage?: any;
    publishedAt: string;
    categories?: Array<{
      _id: string;
      title: string;
      slug: string;
    }>;
    estimatedReadingTime?: number;
  };
}

export function PostCard({ post }: PostCardProps) {
  function getImageUrl(image: any): string {
    try {
      return (
        urlForImage(image)?.width(600).height(340).url() ?? "/placeholder.svg"
      );
    } catch {
      return "/placeholder.svg";
    }
  }
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="relative aspect-video overflow-hidden">
          {post.mainImage ? (
            <Image
              src={getImageUrl(post.mainImage)}
              alt={post.title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          {post.categories && post.categories.length > 0 && (
            <div className="mb-2">
              <Badge variant="secondary">{post.categories[0].title}</Badge>
            </div>
          )}
          <h3 className="font-bold line-clamp-1">{post.title}</h3>
          {post.excerpt && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
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
