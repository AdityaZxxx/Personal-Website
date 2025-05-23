import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Calendar } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../lib/sanity/image";

interface FeaturedPostsProps {
  posts: Array<{
    _id: string;
    title: string;
    slug: { current: string };
    mainImage?: any;
    publishedAt: string;
    categories?: Array<{
      _id: string;
      title: string;
      slug: { current: string };
    }>;
  }>;
  title?: string;
}

export function FeaturedPosts({ posts, title }: FeaturedPostsProps) {
  if (!posts || posts.length === 0) return null;

  return (
    <div className="space-y-4 bg-slate-800/70">
      <h3 className="font-bold text-lg">{title}</h3>
      <div className="space-y-4">
        {posts.map((post, index) => (
          <Link key={index} href={`/blog/${post.slug.current}`}>
            <Card className="overflow-hidden hover:shadow-md bg-slate-800/90 transition-shadow">
              <CardContent className="p-4 flex gap-3">
                {post.mainImage && (
                  <div className="relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm line-clamp-2">
                    {post.title}
                  </h4>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    <time dateTime={post.publishedAt}>
                      {formatDate(post.publishedAt)}
                    </time>
                  </div>
                  {post.categories && post.categories.length > 0 && (
                    <div className="mt-2">
                      <Badge
                        key={post._id}
                        variant="secondary"
                        className="text-xs"
                      >
                        {post.categories[0].title}
                      </Badge>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
