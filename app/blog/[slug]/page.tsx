import { ArrowLeft, Calendar, ChevronDown, Clock, User } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { AuthorProfile } from "@/components/author-profile";
import { FeaturedPosts } from "@/components/blogPost/FeaturedPosts";
import { GiscusComments } from "@/components/blogPost/GiscusComments";
import { ReadingProgress } from "@/components/blogPost/ReadingProgress";
import { ScrollToTopButton } from "@/components/blogPost/ScrollToTopButton";
import { ShareButtons } from "@/components/blogPost/ShareButtons";
import { TableOfContents } from "@/components/blogPost/TableOfContents";
import { TagList } from "@/components/blogPost/TagList";
import { BlurImage } from "@/components/blur-image";
import { PortableText } from "@/components/portable-text";
import { TrakteerSupport } from "@/components/trakteer-support";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { urlForImage } from "@/lib/sanity/image";
import {
  getAllPostSlugs,
  getFeaturedPosts,
  getPostBySlug,
} from "@/lib/sanity/queries";
import { formatDate } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      robots: { index: false, follow: true },
    };
  }

  const imageUrl = urlForImage(post.mainImage)?.width(1200).height(630).url();

  return {
    title: `${post.title}`,
    description: post.excerpt,
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
      ...(imageUrl && { images: [imageUrl] }),
      authors: post.author?.name ? [post.author.name] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      ...(imageUrl && { images: [imageUrl] }),
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts.map((post: any) => ({
    slug: post.slug?.current || post,
  }));
}

async function SidebarContent({
  author,
  posts,
}: {
  author: any;
  posts: any[];
}) {
  return (
    <div className="space-y-8">
      {author && <AuthorProfile author={author} />}
      <FeaturedPosts posts={posts} />
      <TrakteerSupport username="adxxya30" />
    </div>
  );
}

export default async function PostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;

  const [post, featuredPosts] = await Promise.all([
    getPostBySlug(slug),
    getFeaturedPosts(4),
  ]);

  if (!post) notFound();

  const filteredFeaturedPosts = featuredPosts.filter(
    (p: any) => p.slug !== slug
  );
  const categoryColors = [
    "bg-red-100 text-red-700",
    "bg-green-100 text-green-700",
    "bg-blue-100 text-blue-700",
    "bg-yellow-100 text-yellow-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-orange-100 text-orange-700",
  ];

  function getColorClass(slug: string) {
    const index =
      slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
      categoryColors.length;
    return categoryColors[index];
  }

  return (
    <>
      <ReadingProgress />
      <main className="container px-4 py-8 md:px-6 md:py-16">
        <div className="mx-auto max-w-4xl xl:max-w-7xl">
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="ghost" className="group pl-0">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to Blog
              </Button>
            </Link>
          </div>

          {/* Mobile Table of Contents - Sticky Header */}
          <div className="xl:hidden sticky top-16 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-3 border-b mb-6">
            <details className="group">
              <summary className="flex items-center justify-between font-medium cursor-pointer list-none">
                <span>Table of Content</span>
                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-2">
                <TableOfContents />
              </div>
            </details>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-12">
            {/* Main Content */}
            <article className="space-y-8">
              <header className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {post.title}
                </h1>
                {post.categories?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {post.categories.map((category: any) => (
                      <Link
                        key={category._id}
                        href={`/blog?category=${category.slug.current}`}
                      >
                        <Badge
                          variant="secondary"
                          className={`transition-colors ${getColorClass(category.slug.current)}`}
                        >
                          {category.title}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                )}

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
                      <User className="h-4 w-4" />
                      <span>{post.author.name} </span>
                    </div>
                  )}
                </div>
              </header>

              {post.mainImage && (
                <figure className="relative aspect-video overflow-hidden rounded-xl border shadow-sm dark:shadow-none">
                  <BlurImage
                    image={post.mainImage}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </figure>
              )}

              <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-medium prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-lg prose-img:shadow-sm">
                <PortableText value={post.body} />
              </div>

              {post.tags && <TagList tags={post.tags} className="pt-6" />}

              <div className="border-t pt-8">
                <ShareButtons
                  title={post.title}
                  imageUrl={urlForImage(post.mainImage)?.url()}
                  description={post.excerpt}
                />
              </div>

              <GiscusComments />

              {/* Mobile Sidebar Content */}
              <div className="xl:hidden space-y-8 pt-8 border-t mt-8">
                <Tabs defaultValue="author">
                  <TabsList className="grid w-full grid-cols-2 bg-background">
                    <TabsTrigger value="author">Author</TabsTrigger>
                    <TabsTrigger value="related">Related</TabsTrigger>
                  </TabsList>
                  <TabsContent value="author">
                    {post.author && <AuthorProfile author={post.author} />}
                  </TabsContent>
                  <TabsContent value="related">
                    <FeaturedPosts posts={filteredFeaturedPosts} />
                  </TabsContent>
                </Tabs>
                <TrakteerSupport username="adxxya30" />
              </div>
            </article>

            {/* Desktop Sidebar */}
            <aside className="hidden xl:block sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto pb-8">
              {/* Table of Contents */}
              <div className="mb-8 p-4 rounded-lg border bg-background/50 backdrop-blur-sm">
                <h2 className="text-lg font-semibold mb-3">Table of Content</h2>
                <TableOfContents />
              </div>

              {/* Other Sidebar Content */}
              <Suspense fallback={<SidebarSkeleton />}>
                <SidebarContent
                  author={post.author}
                  posts={filteredFeaturedPosts}
                />
              </Suspense>
            </aside>
          </div>
        </div>
      </main>
      <ScrollToTopButton />
    </>
  );
}

function SidebarSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div className="h-7 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
      </div>
      <div className="space-y-4">
        <div className="h-7 w-1/2 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-20 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
            />
          ))}
        </div>
      </div>
      <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
    </div>
  );
}
