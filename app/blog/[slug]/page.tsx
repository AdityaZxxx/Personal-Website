import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { GiscusComments } from "@/components/giscus-comments";
import { PortableText } from "@/components/portable-text";
import { ShareButtons } from "@/components/share-buttons";
import { TagList } from "@/components/tag-list";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  getAllPostSlugs,
  getFeaturedPosts,
  getPostBySlug,
} from "@/lib/sanity/queries";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { AuthorProfile } from "../../../components/author-profile";
import { FeaturedPosts } from "../../../components/featured-posts";
import { TrakteerSupport } from "../../../components/trakteer-support";
import { urlForImage } from "../../../lib/sanity/image";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata(
  props: PostPageProps
): Promise<Metadata> {
  const params = props.params;
  const post = await getPostBySlug(params?.slug);

  if (!post) {
    return {
      title: "Post Not Found | Aditya",
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  return {
    title: `${post.title} | Aditya`,
    description: post.excerpt,
    openGraph: post?.mainImage
      ? {
          images: [
            urlForImage(post.mainImage)?.width(1200)?.height(630)?.url() ?? "",
          ],
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
  const filteredFeaturedPosts = featuredPosts.filter(
    (featuredPost: any) => featuredPost.slug.current !== slug
  );

  if (!post) {
    notFound();
  }

  return (
    <main className="container px-4 py-8 md:px-6 md:py-16">
      <div className="mx-auto max-w-7xl">
        {/* Back Button */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="group pl-0">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Blog
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
          {/* Main Content */}
          <article className="space-y-8">
            {/* Article Header */}
            <header className="space-y-4">
              {post.categories?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.categories.map((category: any) => (
                    <Link
                      key={category._id}
                      href={`/blog?category=${category.slug.current}`}
                    >
                      <Badge
                        variant="secondary"
                        className="hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {category.title}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </div>
                {post.estimatedReadingTime && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.estimatedReadingTime} min read</span>
                  </div>
                )}
              </div>
            </header>

            {/* Featured Image */}
            {post.mainImage && (
              <figure className="relative aspect-video overflow-hidden rounded-xl border shadow-sm">
                {/* <BlurImage
                  image={
                    urlForImage(post.mainImage)?.url() || "/placeholder.svg"
                  }
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                /> */}
                <Image
                  src={urlForImage(post.mainImage)?.url() || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </figure>
            )}

            {/* Article Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-medium prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-lg prose-img:shadow-sm">
              <PortableText value={post.body} />
            </div>
            {/* Tags */}
            {post.tags && (
              <div className="pt-2">
                <TagList tags={post.tags} />
              </div>
            )}

            {/* Share Buttons */}
            <div className="border-t pt-8">
              <ShareButtons
                title={post.title}
                imageUrl={post.mainImage?.url}
                description={post.excerpt}
              />
            </div>

            {/* Comments */}
            <GiscusComments slug={params.slug} />
          </article>

          {/* Sidebar */}
          <aside className="sticky top-24 space-y-8 max-h-screen overflow-y-auto scrollbar-hide">
            {/* Author */}
            {post.author && (
              <div className="rounded-lg border mt-2 bg-card p-2 shadow-sm transition-all duration-300">
                <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  About the Author
                </h2>
                <AuthorProfile author={post.author} />
              </div>
            )}

            {/* Featured Posts */}
            {filteredFeaturedPosts?.length > 0 && (
              <div className="rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 mt-8">
                <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  You might also like
                </h2>
                <div className="relative overflow-hidden group">
                  <div className="absolute -right-6 top-0 h-full w-1 bg-gradient-to-b from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <FeaturedPosts posts={filteredFeaturedPosts} />
                </div>
              </div>
            )}

            {/* Trakteer */}
            <TrakteerSupport
              username="adxxya30"
              className="mt-8 rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
            />
          </aside>
        </div>
      </div>
    </main>
  );
}
