import { Calendar, ChevronDown, Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

// Komponen Internal
import { AuthorProfile } from "@/components/author-profile";
import { FeaturedPosts } from "@/components/blogPost/FeaturedPosts";
import { ReadingProgress } from "@/components/blogPost/ReadingProgress";
import { ScrollToTopButton } from "@/components/blogPost/ScrollToTopButton";
import { ShareButtons } from "@/components/blogPost/ShareButtons";
import { TableOfContents } from "@/components/blogPost/TableOfContents";
import { TagList } from "@/components/blogPost/TagList";
import { PortableText } from "@/components/portable-text";
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

// Lib & Utils
import {
  getAllPostSlugs,
  getFeaturedPosts,
  getPostBySlug,
} from "@/lib/sanity/queries";
import { cn, formatDate } from "@/lib/utils";
import {
  GiscusComments,
  TrakteerSupport,
} from "../../../components/blogPost/DinamicImport";
import { urlFor } from "../../../lib/sanity/image";

const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://adxxya30.vercel.app";
const SITE_NAME = "Aditya Rahmad";
const DEFAULT_OG_IMAGE = `${NEXT_PUBLIC_SITE_URL}/og-image.avif`; // Simpan gambar default di /public

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
      robots: { index: false },
    };
  }

  const imageUrl = post.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).url()
    : DEFAULT_OG_IMAGE;

  const canonicalUrl = `${NEXT_PUBLIC_SITE_URL}/blog/${slug}`;
  const postKeywords =
    post.tags?.map((tag: { title: string }) => tag.title) || [];

  return {
    title: post.title,
    description: post.excerpt,
    keywords: ["Aditya Rahmad", post.categories?.[0]?.title, ...postKeywords], // Keywords dinamis
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: SITE_NAME,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
      locale: "id_ID", // Pastikan sesuai bahasa konten
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt || post.publishedAt,
      authors: post.author?.slug?.current
        ? [`${NEXT_PUBLIC_SITE_URL}/author/${post.author.slug.current}`] // URL Author
        : undefined,
      section: post.categories?.[0]?.title,
      tags: postKeywords,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
      creator: "@adxxya30", // Username Twitter Anda
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPostSlugs();
  // Ensure slugs are strings and filter out any potential undefined/null values
  return posts
    .map((slug: any) => slug?.current || slug)
    .filter(
      (slugString: string | null | undefined): slugString is string =>
        typeof slugString === "string" && slugString.length > 0
    )
    .map((slugString: string) => ({ slug: slugString }));
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

function getColorClass(slug: string | undefined) {
  if (!slug) return categoryColors[0];
  const index =
    slug.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0) %
    categoryColors.length;
  return categoryColors[index];
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

  if (!post) {
    notFound();
  }

  const filteredFeaturedPosts = featuredPostsData
    .filter((p: any) => p.slug?.current !== slug)
    .slice(0, 3);

  const jsonLdImages: string[] = [];
  if (post.mainImage) {
    const imgUrl1200x630 = urlFor(post.mainImage).width(1200).height(630).url();
    if (imgUrl1200x630) jsonLdImages.push(imgUrl1200x630);
    const imgUrl1200x1200 = urlFor(post.mainImage)
      .width(1200)
      .height(1200)
      .url();
    if (imgUrl1200x1200) jsonLdImages.push(imgUrl1200x1200);
    // Add more sizes if needed, ensuring they are valid strings
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${NEXT_PUBLIC_SITE_URL}/blog/${slug}`,
    },
    headline: post.title,
    description: post.excerpt,
    image: jsonLdImages.length > 0 ? jsonLdImages : undefined, // Use the filtered array
    datePublished: post.publishedAt,
    dateModified: post._updatedAt || post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author?.name, // Added optional chaining for safety
      url: post.author?.slug?.current
        ? `${NEXT_PUBLIC_SITE_URL}/author/${post.author.slug.current}`
        : undefined,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      // logo: { "@type": "ImageObject", url: LOGO_URL }, // Include if LOGO_URL is defined and used
    },
  };

  // Prepare URLs for <Image> components, ensuring they are strings or null
  const mainImageUrl = post.mainImage ? urlFor(post.mainImage).url() : null;
  const authorImageUrl = post.author?.image
    ? urlFor(post.author.image).url()
    : null;

  return (
    <>
      <ReadingProgress />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main
        className={cn(
          "container bg-[#0A0A0A] px-4 py-10 md:px-6 md:py-16 lg:py-20 backdrop-blur-sm"
        )}
      >
        <div className="mx-auto max-w-screen-xl">
          <div className="mb-8 md:mb-10">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/"
                    className="transition-colors hover:text-slate-50"
                  >
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href="/blog"
                    className="transition-colors hover:text-slate-50"
                  >
                    Blog
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage className="truncate max-w-[150px] sm:max-w-xs md:max-w-sm">
                    {post.title}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          {/* OPTIMISASI UX: Mobile ToC dibuat lebih smooth */}
          <div className="lg:hidden sticky top-16 z-30 mb-6">
            <details className="group overflow-hidden rounded-lg bg-black/50 backdrop-blur-md border border-slate-700 shadow-lg">
              <summary className="flex items-center justify-between p-4 font-medium cursor-pointer list-none text-sm text-slate-100 hover:bg-slate-800/50 transition-colors">
                <span>Table of Contents</span>
                <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180 text-slate-400" />
              </summary>
              <div className="mt-2 p-4 pt-0">
                <div className="border-t border-slate-600 pt-4">
                  <TableOfContents />
                </div>
              </div>
            </details>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[300px_minmax(0,1fr)] xl:gap-12">
            <aside className="hidden lg:block sticky top-24 self-start h-[calc(100vh-7rem)] overflow-y-auto pb-10 pr-3 space-y-6 scrollbar-thin scrollbar-thumb-slate-600 hover:scrollbar-thumb-slate-500 scrollbar-track-transparent">
              <div className="p-5 rounded-lg border border-slate-700 bg-black/50 shadow-sm">
                <h2 className="text-lg font-semibold mb-4 text-slate-100">
                  In this article
                </h2>
                <TableOfContents />
              </div>
            </aside>

            <div className="min-w-0">
              <div className="space-y-8 md:space-y-10">
                <header className="space-y-4 md:space-y-6">
                  {post.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((category: any) => (
                        <Link
                          key={category.slug?.current}
                          href={`/blog?category=${category.slug?.current}`}
                          aria-label={`View posts in ${category.title}`}
                        >
                          <Badge
                            variant="outline"
                            className={cn(
                              "px-3 py-1 text-xs font-medium rounded-full border transition-all duration-300", // OPTIMISASI UI: Tambah transisi
                              getColorClass(category.slug?.current)
                            )}
                          >
                            {category.title}
                          </Badge>
                        </Link>
                      ))}
                    </div>
                  )}
                  <h1 className="text-3xl font-extrabold tracking-tight text-slate-50 sm:text-4xl md:text-5xl lg:text-6xl !leading-tight">
                    {post.title}
                  </h1>
                  <p className="text-lg text-slate-300 sm:text-xl">
                    {post.excerpt}
                  </p>

                  {/* OPTIMISASI UI: Membungkus metadata dalam div untuk pemisahan visual */}
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-slate-400 border-t border-b border-slate-700 py-4">
                    {post.author && (
                      <Link
                        href={
                          post.author.slug?.current
                            ? `/author/${post.author.slug.current}`
                            : `/blog`
                        }
                        className="flex items-center gap-2 hover:text-sky-400 transition-colors group"
                      >
                        {authorImageUrl && (
                          <Image
                            src={authorImageUrl}
                            alt={post.author.name || "Author image"}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover border-2 border-slate-600 group-hover:border-sky-400 transition-colors"
                          />
                        )}
                        <span className="font-medium text-slate-200 group-hover:text-sky-400 transition-colors">
                          {post.author.name}
                        </span>
                      </Link>
                    )}
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

                {mainImageUrl && (
                  <figure className="relative w-full overflow-hidden rounded-lg md:rounded-xl border border-slate-700 shadow-md">
                    <Image
                      src={mainImageUrl}
                      alt={`Main image for ${post.title}`}
                      width={1600}
                      height={900}
                      className="object-cover aspect-[16/9]"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1600px"
                    />
                  </figure>
                )}

                <article className="prose prose-p:font-light prose-lg max-w-none prose-p:text-gray-400 prose-headings:text-gray-100 prose-headings:tracking-tight prose-li:text-gray-400 prose-headings:scroll-mt-24 prose-a:text-sky-400 hover:prose-a:text-sky-300 prose-strong:text-gray-300 prose-blockquote:border-sky-400 prose-blockquote:text-slate-300 prose-code:text-gray-300 prose-code:bg-slate-800/80 prose-code:p-1 prose-code:rounded-md prose-img:rounded-lg prose-img:shadow-md prose-code:font-mono">
                  <PortableText value={post.body} />
                </article>

                {post.tags && post.tags.length > 0 && (
                  <div className="max-w-3xl pt-6">
                    <TagList tags={post.tags} />
                  </div>
                )}

                <div className="max-w-3xl border-t border-slate-700 pt-8">
                  <ShareButtons
                    title={post.title}
                    imageUrl={mainImageUrl || undefined}
                    description={post.excerpt}
                  />
                </div>

                <div className="max-w-3xl space-y-12 pt-8 border-t border-slate-700 mt-10">
                  {/* Bagian About Author & Related Posts (Mobile & Desktop) */}
                  {/* Logika ini sudah bagus dan responsif, tidak perlu diubah secara fungsional */}
                  <div className="lg:hidden">
                    <Tabs defaultValue="author" className="w-full">
                      <TabsList className="grid w-full grid-cols-2 bg-slate-800 text-slate-300">
                        <TabsTrigger
                          value="author"
                          className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-50"
                        >
                          About Author
                        </TabsTrigger>
                        <TabsTrigger
                          value="related"
                          className="data-[state=active]:bg-slate-700 data-[state=active]:text-slate-50"
                        >
                          Related Posts
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent
                        value="author"
                        className="mt-6 rounded-lg border border-slate-700 bg-slate-800/50 p-6 shadow"
                      >
                        {post.author && <AuthorProfile author={post.author} />}
                      </TabsContent>
                      <TabsContent
                        value="related"
                        className="mt-6 rounded-lg border border-slate-700 bg-slate-800/50 p-6 shadow"
                      >
                        <FeaturedPosts posts={filteredFeaturedPosts} />
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div className="hidden lg:block space-y-10">
                    {post.author && (
                      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 shadow">
                        <h2 className="text-xl font-semibold mb-4 text-slate-100">
                          About the Author
                        </h2>
                        <AuthorProfile author={post.author} />
                      </div>
                    )}
                    {filteredFeaturedPosts.length > 0 && (
                      <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6 shadow">
                        <h2 className="text-xl font-semibold mb-4 text-slate-100">
                          Featured Posts
                        </h2>
                        <FeaturedPosts posts={filteredFeaturedPosts} />
                      </div>
                    )}
                  </div>

                  {/* OPTIMISASI PERFORMA: Gunakan komponen TrakteerSupport yang di-lazy load */}
                  <div className="p-4 border border-slate-700 rounded-lg bg-slate-800/50 shadow">
                    <TrakteerSupport username="adxxya30" />
                  </div>
                </div>

                {/* OPTIMISASI PERFORMA: Gunakan komponen Giscus yang di-lazy load */}
                <div className="max-w-3xl pt-8">
                  <GiscusComments />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <ScrollToTopButton />
    </>
  );
}
