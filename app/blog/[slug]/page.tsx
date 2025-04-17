import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AuthorProfile } from "@/components/author-profile";
import { BlurImage } from "@/components/blur-image";
import { FeaturedPosts } from "@/components/featured-posts";
import { GiscusComments } from "@/components/giscus-comments";
import { PortableText } from "@/components/portable-text";
import { ShareButtons } from "@/components/share-buttons";
import { TagList } from "@/components/tag-list";
import { TrakteerSupport } from "@/components/trakteer-support";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getAllPostSlugs,
  getFeaturedPosts,
  getPostBySlug,
} from "@/lib/sanity/queries";
import { formatDate } from "@/lib/utils";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  props: PostPageProps
): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostBySlug(params?.slug);

  if (!post) {
    return {
      title: "Post Not Found | Your Name",
    };
  }

  return {
    title: `${post.title} | Your Name`,
    description: post.excerpt,
    keywords: post.tags?.join(", "),
    openGraph: post.mainImage
      ? {
          images: [
            {
              url: post.mainImage.url,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
          type: "article",
          publishedTime: post.publishedAt,
          authors: post.author?.name ? [post.author.name] : undefined,
          tags: post.tags,
        }
      : undefined,
  };
}

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();

  return posts.map((post: any) => ({
    slug: typeof post === "string" ? post : post.slug.current,
  }));
}

export default async function PostPage(props: PostPageProps) {
  const params = await props.params;
  const slug = params?.slug;

  const post = await getPostBySlug(slug);
  const featuredPosts = await getFeaturedPosts(4);

  // Filter out the current post from featured posts
  const filteredFeaturedPosts = featuredPosts.filter(
    (featuredPost: any) => featuredPost.slug.current !== slug
  );

  if (!post) {
    notFound();
  }

  return (
    <main className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">
          <div className="space-y-6">
            <div className="space-y-2">
              {post.categories && post.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category: any) => (
                    <Link
                      key={category._id}
                      href={`/blog?category=${category.slug.current}`}
                    >
                      <Badge variant="secondary">{category.title}</Badge>
                    </Link>
                  ))}
                </div>
              )}
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
                {post.estimatedReadingTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.estimatedReadingTime} min read</span>
                  </div>
                )}
              </div>
            </div>

            {post.mainImage && (
              <div className="relative aspect-video overflow-hidden rounded-lg">
                <BlurImage
                  image={post.mainImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                />
              </div>
            )}

            {post.tags && <TagList tags={post.tags} className="mt-4" />}

            <div className="prose prose-gray dark:prose-invert max-w-none">
              <PortableText value={post.body} />
            </div>

            <div className="border-t pt-6">
              <ShareButtons title={post.title} />
            </div>

            <GiscusComments slug={params.slug} />
          </div>

          <div className="space-y-8">
            <div className="lg:sticky lg:top-24">
              {post.author && (
                <div className="border-t pt-6">
                  <h2 className="text-xl font-bold mb-4">About the Author</h2>
                  <AuthorProfile author={post.author} />
                </div>
              )}
              {filteredFeaturedPosts.length > 0 && (
                <div className="mt-8">
                  <FeaturedPosts posts={filteredFeaturedPosts} />
                </div>
              )}
              <TrakteerSupport username="adxxya30" className="mt-8" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
