import { Calendar, ChevronDown, Clock } from "lucide-react";
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { urlForImage } from "@/lib/sanity/image";
import {
  getAllPostSlugs,
  getFeaturedPosts,
  getPostBySlug,
} from "@/lib/sanity/queries";
import { cn, formatDate } from "@/lib/utils";
import { Geist } from "next/font/google";

const GeistSans = Geist({ subsets: ["latin"] });

const NEXT_PUBLIC_SITE_USR =
  process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
const SITE_NAME = "Aditya Rahmad";
const LOGO_URL = `${NEXT_PUBLIC_SITE_USR}/logo.png`;

export async function generateMetadata({
  params: promiseParams,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await promiseParams;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      robots: { index: false, follow: true },
    };
  }

  const imageUrl = post.mainImage
    ? urlForImage(post.mainImage)?.width(1200).height(630).url()
    : undefined;
  const canonicalUrl = `${NEXT_PUBLIC_SITE_USR}/blog/${slug}`;

  const metadataResult: Metadata = {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: SITE_NAME,
      ...(imageUrl && {
        images: [{ url: imageUrl, width: 1200, height: 630 }],
      }),
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt || post.publishedAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      section: post.categories?.[0]?.title,
      tags: post.tags?.map((tag: any) => tag.title),
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      ...(imageUrl && { images: [imageUrl] }),
      // site: "@yourTwitterHandle", // Your site's Twitter handle
      // creator: post.author?.twitterHandle ? `@${post.author.twitterHandle}` : undefined, // Author's Twitter handle
    },
  };

  return metadataResult;
}

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  return posts.map((post: any) => ({
    slug: post.slug?.current || post,
  }));
}

const categoryColors = [
  "border-red-500/30 bg-red-500/10 text-red-700 dark:text-red-400 hover:bg-red-500/20",
  "border-green-500/30 bg-green-500/10 text-green-700 dark:text-green-400 hover:bg-green-500/20",
  "border-blue-500/30 bg-blue-500/10 text-blue-700 dark:text-blue-400 hover:bg-blue-500/20",
  "border-yellow-500/30 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 hover:bg-yellow-500/20",
  "border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-400 hover:bg-purple-500/20",
  "border-pink-500/30 bg-pink-500/10 text-pink-700 dark:text-pink-400 hover:bg-pink-500/20",
  "border-orange-500/30 bg-orange-500/10 text-orange-700 dark:text-orange-400 hover:bg-orange-500/20",
  "border-teal-500/30 bg-teal-500/10 text-teal-700 dark:text-teal-400 hover:bg-teal-500/20",
  "border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 hover:bg-indigo-500/20",
];

function getColorClass(slug: string) {
  const index =
    slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    categoryColors.length;
  return categoryColors[index];
}

async function SidebarContent({
  author,
  posts,
  className,
}: {
  author: any;
  posts: any[];
  className?: string;
}) {
  return (
    <div className={cn("space-y-10", className)}>
      {author && (
        <div>
          <h2 className="text-xl font-semibold mb-4 text-foreground">
            About the Author
          </h2>
          <AuthorProfile author={author} />
        </div>
      )}
      <div>
        <h2 className="text-xl font-semibold mb-4 text-foreground">
          Featured Posts
        </h2>
        <FeaturedPosts posts={posts} />
      </div>
      <div className="p-4 border rounded-lg bg-card">
        <TrakteerSupport username="adxxya30" />
      </div>
    </div>
  );
}

export default async function PostPage({
  params: promiseParams,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await promiseParams;

  const [post, featuredPostsData] = await Promise.all([
    getPostBySlug(slug),
    getFeaturedPosts(4),
  ]);

  if (!post) notFound();

  // Filter out the current post from featured posts
  const filteredFeaturedPosts = featuredPostsData
    .filter((p: any) => p.slug?.current !== slug)
    .slice(0, 3); // Take 3 after filtering

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${NEXT_PUBLIC_SITE_USR}/blog/${slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    image: post.mainImage
      ? [
          urlForImage(post.mainImage)?.width(1200).height(630).url(),
          urlForImage(post.mainImage)?.width(1200).height(1200).url(), // Square image
          urlForImage(post.mainImage)?.width(1200).height(900).url(), // 4:3 image
        ]
      : undefined,
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      url: post.author.slug?.current
        ? `${NEXT_PUBLIC_SITE_USR}/author/${post.author.slug.current}`
        : undefined,
      // "image": post.author.image ? urlForImage(post.author.image).width(200).height(200).url() : undefined,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: {
        "@type": "ImageObject",
        url: LOGO_URL,
      },
    },
    // For body, it's often better to use the excerpt or a summarized version. Full body can be too large.
    // "articleBody": "A summary of the article body or the full body if it's not excessively long."
  };

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main
        className={cn(
          "container px-4 py-10 md:px-6 md:py-16 lg:py-20",
          GeistSans.className
        )}
      >
        <div className="mx-auto max-w-screen-xl">
          {" "}
          {/* Wider container for the grid */}
          {/* Breadcrumbs - Kept subtle */}
          <div className="mb-8 md:mb-10 max-w-4xl mx-auto xl:mx-0">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/blog">Blog</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="truncate max-w-[150px] sm:max-w-xs">
                    {post.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          {/* Mobile Table of Contents - Sticky Header */}
          <div className="xl:hidden sticky top-16 z-30 bg-background/90 backdrop-blur-md py-3 border-b border-border mb-6 rounded-lg shadow-sm">
            <details className="group container mx-auto px-4 md:px-6">
              <summary className="flex items-center justify-between font-medium cursor-pointer list-none text-sm text-foreground hover:text-primary transition-colors">
                <span>Table of Contents</span>
                <ChevronDown className="h-5 w-5 transition-transform group-open:rotate-180 text-muted-foreground" />
              </summary>
              <div className="mt-3 pt-3 border-t border-border">
                <TableOfContents />
              </div>
            </details>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-12 lg:gap-10">
            {/* Main Content Column */}
            <div className="min-w-0">
              {" "}
              {/* Prevents flexbox/grid overflow issues */}
              <article className="space-y-8 md:space-y-10">
                {/* Article Header */}
                <header className="space-y-4 md:space-y-6 max-w-4xl mx-auto xl:mx-0">
                  {post.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((category: any) => (
                        <Link
                          key={category._id}
                          href={`/blog?category=${category.slug.current}`}
                          aria-label={`View posts in ${category.title}`}
                        >
                          <Badge
                            variant="outline"
                            className={cn(
                              "px-3 py-1 text-xs font-medium rounded-full border",
                              getColorClass(category.slug.current)
                            )}
                          >
                            {category.title}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  )}
                  <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl md:text-5xl lg:text-6xl !leading-tight">
                    {post.title}
                  </h1>
                  <p className="text-lg text-muted-foreground sm:text-xl">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground border-t border-b border-border py-4">
                    <Link
                      href={`/author/${post.author.slug?.current || post.author.name.toLowerCase().replace(/\s+/g, "-")}`}
                      className="flex items-center gap-2 hover:text-foreground transition-colors"
                    >
                      {post.author.image && (
                        <BlurImage
                          image={post.author.image}
                          alt={post.author.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      )}
                      <span className="font-medium text-foreground">
                        {post.author.name}
                      </span>
                    </Link>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4" />
                      <time dateTime={post.publishedAt}>
                        {formatDate(post.publishedAt)}
                      </time>
                    </div>
                    {post.estimatedReadingTime && (
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        <span>{post.estimatedReadingTime} min read</span>
                      </div>
                    )}
                  </div>
                </header>

                {post.mainImage && (
                  <figure className="relative w-full overflow-hidden rounded-lg md:rounded-xl border shadow-sm">
                    <BlurImage
                      image={post.mainImage}
                      alt={`Main image for ${post.title}`}
                      width={1600} // Provide large dimensions for good quality
                      height={900}
                      className="object-cover aspect-[16/9]" // Enforce aspect ratio
                      priority
                    />
                  </figure>
                )}

                {/* Article Body - Constrained width for readability */}
                <div className="max-w-3xl mx-auto xl:mx-0 prose prose-lg prose-gray dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-headings:scroll-mt-24 prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-lg prose-img:shadow-md prose-code:font-mono">
                  {/* Ensure scroll-mt-24 for headings matches sticky header height + offset */}
                  <PortableText value={post.body} />
                </div>

                {post.tags && post.tags.length > 0 && (
                  <div className="max-w-3xl mx-auto xl:mx-0 pt-6">
                    <TagList tags={post.tags} />
                  </div>
                )}

                <div className="max-w-3xl mx-auto xl:mx-0 border-t pt-8">
                  <ShareButtons
                    title={post.title}
                    imageUrl={
                      post.mainImage
                        ? urlForImage(post.mainImage)?.url()
                        : undefined
                    }
                    description={post.excerpt}
                  />
                </div>

                {/* Author Profile & Related Posts (Mobile via Tabs) */}
                <div className="xl:hidden space-y-8 pt-8 border-t mt-10 max-w-3xl mx-auto">
                  <Tabs defaultValue="author" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="author">About Author</TabsTrigger>
                      <TabsTrigger value="related">Related Posts</TabsTrigger>
                    </TabsList>
                    <TabsContent value="author" className="mt-6">
                      {post.author && <AuthorProfile author={post.author} />}
                    </TabsContent>
                    <TabsContent value="related" className="mt-6">
                      <FeaturedPosts posts={filteredFeaturedPosts} />
                    </TabsContent>
                  </Tabs>
                  <div className="p-4 border rounded-lg bg-card">
                    <TrakteerSupport username="adxxya30" />
                  </div>
                </div>

                <div className="max-w-3xl mx-auto xl:mx-0 pt-8">
                  <GiscusComments />
                </div>
              </article>
            </div>

            {/* Desktop Sidebar */}
            <aside className="hidden xl:block sticky top-24 self-start h-[calc(100vh-7rem)] overflow-y-auto pb-10 pr-1 space-y-10 scrollbar-thin scrollbar-thumb-muted-foreground/30 hover:scrollbar-thumb-muted-foreground/50 scrollbar-track-transparent">
              {/* Table of Contents */}
              <div className="p-1">
                {" "}
                {/* Outer p-1 for scrollbar not to overlap border */}
                <div className="p-5 rounded-lg border bg-card shadow-sm">
                  <h2 className="text-lg font-semibold mb-3 text-foreground">
                    In this article
                  </h2>
                  <TableOfContents />
                </div>
              </div>
              {/* Other Sidebar Content - Suspense for client components */}
              <Suspense fallback={<SidebarSkeleton />}>
                <SidebarContent
                  author={post.author}
                  posts={filteredFeaturedPosts}
                  className="pl-1" // Align with ToC padding if needed
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

// Basic Skeleton for Sidebar, can be enhanced
function SidebarSkeleton() {
  return (
    <div className="space-y-10 pl-1">
      <div className="space-y-4">
        <div className="h-6 w-3/4 bg-muted rounded animate-pulse" />
        <div className="flex items-center space-x-3">
          <div className="h-16 w-16 bg-muted rounded-full animate-pulse" />
          <div className="space-y-2 flex-1">
            <div className="h-4 w-full bg-muted rounded animate-pulse" />
            <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="h-6 w-1/2 bg-muted rounded animate-pulse" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center space-x-3">
              <div className="h-16 w-24 bg-muted rounded-md animate-pulse shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-full bg-muted rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-muted rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="h-24 bg-muted rounded-lg animate-pulse p-4" />
    </div>
  );
}
