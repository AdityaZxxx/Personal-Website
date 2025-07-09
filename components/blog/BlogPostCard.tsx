import { urlFor } from "@/lib/sanity/image";
import { cn, formatDate } from "@/lib/utils";
import { Category, PostType } from "@/types";
import { BookOpen, EyeIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

export function BlogPostCard({
  post,
  isLCPCandidate,
}: {
  post: PostType;
  isLCPCandidate?: boolean;
}) {
  return (
    <div className="space-y-4 group">
      <Link key={post._id} href={`/blog/${post.slug}`}>
        <Card className="overflow-hidden bg-background text-card-foreground border">
          <CardContent className="p-4 flex gap-3 flex-col md:flex-row">
            <div className="flex-1 min-w-0 order-2 md:order-1">
              <div className="flex items-center mt-1 mb-4 text-xs text-muted-foreground">
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <h3 className="font-bold font-rethink-sans text-base md:text-xl line-clamp-2 text-primary  tracking-tight">
                {post.title}
              </h3>
              <p className="font-normal font-inter line-clamp-2 text-muted-foreground  tracking-tight text-sm mt-1 ">
                {post.excerpt}
              </p>
              <div className="flex flex-col space-y-2 md:flex-row md:items-center md:justify-between text-xs pt-6">
                {/* GRUP KIRI: Read time */}
                <div className="flex items-center space-x-5">
                  {typeof post.estimatedReadingTime === "number" && (
                    <div
                      className="flex items-center gap-1.5"
                      title="Read time"
                    >
                      <BookOpen className="h-4 w-4 text-sky-500" />
                      <span className="text-muted-foreground">
                        {Math.max(post.estimatedReadingTime, 1)} min read
                      </span>
                    </div>
                  )}
                  {typeof post.viewCount === "number" && (
                    <div
                      className="flex items-center gap-1.5"
                      title={`${new Intl.NumberFormat("id-ID").format(post.viewCount)} views`}
                    >
                      <EyeIcon className="h-4 w-4 text-sky-500" />
                      <span className="text-muted-foreground">
                        {new Intl.NumberFormat("id-ID").format(post.viewCount)}{" "}
                        views
                      </span>
                    </div>
                  )}
                </div>

                {/* GRUP KANAN: Kategori */}
                {post.categories && post.categories.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {post.categories.map((category: Category) => (
                      <Badge
                        key={category._id}
                        className={cn(
                          "text-xs font-medium transition-colors",
                          // Base styles
                          "bg-secondary/50 text-secondary-foreground",
                          // Hover effects
                          "hover:bg-secondary/70 hover:text-secondary-foreground/90",
                          // Dark mode adjustments
                          "dark:bg-secondary/30 dark:hover:bg-secondary/40",
                          // Border
                          "border border-border/50 hover:border-border/70"
                        )}
                      >
                        {category.title}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="order-1 md:order-2 relative w-full rounded-md overflow-hidden aspect-video flex-shrink-0 md:w-48 lg:w-56 lg:h-32 group-hover:opacity-90 transition-opacity">
              {post.mainImage && (
                <Image
                  src={urlFor(post.mainImage).width(1000).url()}
                  alt={post.title}
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={isLCPCandidate || false}
                  loading={isLCPCandidate ? "eager" : "lazy"}
                  placeholder={post.mainImage.lqip ? "blur" : "empty"}
                  blurDataURL={post.mainImage.lqip}
                />
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}
