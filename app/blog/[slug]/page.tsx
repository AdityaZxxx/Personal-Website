import { EnjoyingPostCTA } from "@/components/blog/CTAPostBlog";
import RelatedPostsSection from "@/components/blog/RelatedPostsSection";
import { LikeButton } from "@/components/buttons/LikeButton";
import { ShareButtons } from "@/components/buttons/ShareButtons";
import { TagList } from "@/components/common/TagList";
import { ViewTracker } from "@/components/common/ViewTracker";
import { GiscusComments } from "@/components/forms/GiscusComments";
import { PortableText } from "@/components/sanity/PortableText";
import RelatedPostsSkeleton from "@/components/skeletons/RelatedPostsSkeleton";
import { DesktopTOC } from "@/components/toc/DesktopTOC";
import { MobileTOC } from "@/components/toc/MobileTOC";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { urlFor } from "@/lib/sanity/image";
import { getPostBySlug } from "@/lib/sanity/queries";
import { formatDate } from "@/lib/utils";
import { Category } from "@/types";
import { ArrowLeft, BookOpen, EyeIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: BlogDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    };
  }

  const mainImageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).url()
    : null;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;

  const keywords = [
    ...(post.tags || []),
    ...(post.categories?.map((c: Category) => c.title) || []),
    "Aditya Rahmad",
    "Aditya",
    "Blog",
    "software developer",
    "Portfolio",
  ];

  return {
    title: post.title,
    description: post.excerpt,
    keywords: keywords,
    authors: [{ name: post.author?.name || "Aditya Rahmad", url: siteUrl }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: canonicalUrl,
      siteName: "Aditya Rahmad - software developer",
      images: mainImageUrl
        ? [
            {
              url: mainImageUrl,
              width: post.mainImage.asset.width,
              height: post.mainImage.asset.height,
              alt: post.mainImage.alt || post.title,
            },
          ]
        : [],
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt,
      authors: post.author?.name ? [post.author.name] : ["Aditya Rahmad"],
      section: post.categories?.[0]?.title,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      site: "@adxxya30",
      creator: "@adxxya30",
      images: mainImageUrl ? [mainImageUrl] : [],
    },
  };
}

const BlogDetailPage = async ({ params }: BlogDetailPageProps) => {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const mainImageUrl = post.mainImage?.asset
    ? urlFor(post.mainImage).url()
    : null;
  const authorImageUrl = post.author?.image
    ? urlFor(post.author.image).url()
    : null;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: mainImageUrl,
    author: [
      {
        "@type": "Person",
        name: post.author?.name || "Aditya Rahmad",
        url: siteUrl,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Aditya Rahmad",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.avif`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post._updatedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <div className={`bg-background text-primary`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ViewTracker key={post._id} contentId={post._id} docType="post" />
      {/* ==================================== */}
      {/* 1. HERO SECTION                      */}
      {/* ==================================== */}
      {mainImageUrl && (
        <figure className="relative w-full h-[30vh] md:h-[40vh]">
          <Image
            src={mainImageUrl}
            alt={post.mainImage?.alt || `Cover image for ${post.title}`}
            fill
            className="object-cover"
            priority
            sizes="100vw"
            placeholder={post.mainImage.lqip ? "blur" : "empty"}
            blurDataURL={post.mainImage.lqip}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/5 to-background" />
        </figure>
      )}
      {/* ================================================================== */}
      {/* 2. KONTEN UTAMA                                                    */}
      {/* ================================================================== */}
      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-24 md:pt-30">
        <div className="transform -translate-y-16 md:-translate-y-24 space-y-6">
          {/* Kategori & Judul */}
          <div className="space-y-2">
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {post.categories.map((category: Category) => (
                  <Badge
                    className="text-xs text-muted-foreground"
                    key={category._id}
                    variant="secondary"
                  >
                    {category.title}
                  </Badge>
                ))}
              </div>
            )}
            <h1 className="text-3xl font-rethink-sans font-semibold hyphens-auto text-primary sm:text-4xl md:text-5xl">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-muted-foreground max-w-3xl font-normal hyphens-auto text-base">
                {post.excerpt}
              </p>
            )}
          </div>

          <div className="flex items-center space-x-4 text-muted-foreground mt-12">
            <div className="flex items-center space-x-2">
              {authorImageUrl && (
                <Image
                  src={authorImageUrl}
                  alt={post.author?.name || "Author image"}
                  width={32}
                  height={32}
                  className="w-10 h-10 rounded-full object-cover "
                  priority={true}
                />
              )}

              <div className="flex flex-col">
                <span className="font-normal font-inter text-primary">
                  {post.author?.name || "Unknown Author"}
                </span>

                <div className="flex items-center gap-1.5 text-xs">
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                  {post._updatedAt && (
                    <>
                      <span className="text-muted-foreground">|</span>
                      <time dateTime={post._updatedAt}>
                        Last updated {formatDate(post._updatedAt)}
                      </time>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between text-xs ">
            {typeof post.estimatedReadingTime === "number" && (
              <div className="flex items-center gap-1.5" title="Read time">
                <BookOpen className="h-4 w-4 text-[#525252]" />
                <span className="text-muted-foreground">
                  {Math.max(post.estimatedReadingTime, 1)} min read
                </span>
              </div>
            )}

            <div className="flex items-center space-x-5">
              {typeof post.viewCount === "number" && (
                <div
                  className="flex items-center gap-1.5"
                  title={`${new Intl.NumberFormat("id-ID").format(
                    post.viewCount
                  )} views`}
                >
                  <EyeIcon className="h-4 w-4 text-[#525252]" />
                  <span className="text-muted-foreground">
                    {new Intl.NumberFormat("id-ID").format(post.viewCount)}{" "}
                    views
                  </span>
                </div>
              )}
              <LikeButton
                contentId={post._id}
                initialLikes={post.likeCount || 0}
              />
            </div>
          </div>
          <Separator className="my-4" />
        </div>

        <div className="grid grid-cols-12 gap-x-8">
          <article className="col-span-12 lg:col-span-8">
            <PortableText value={post.body} />
            {post.tags && post.tags.length > 0 && (
              <div className="max-w-3xl pt-6">
                <TagList tags={post.tags} content="blog" />
              </div>
            )}
          </article>

          <aside className="hidden lg:block lg:col-span-4">
            <div className="sticky top-32 self-start rounded-lg bg-background border p-4">
              <DesktopTOC />
            </div>
          </aside>
        </div>
        <Separator className="my-4" />
        <div className="max-w-5xl pt-8">
          <ShareButtons title={post.title} description={post.excerpt} />
        </div>

        <div className="max-w-5xl pt-16">
          <GiscusComments />
        </div>

        <div className="max-w-5xl pt-30">
          <EnjoyingPostCTA />
        </div>

        <Separator className="my-8" />

        <Suspense fallback={<RelatedPostsSkeleton />}>
          <RelatedPostsSection currentPostSlug={post.slug} />
        </Suspense>
        <div className="flex items-center justify-start col-span-12 mt-10">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="relative">
              <span className="text-sm text-muted-foreground  hover:text-primary transition-colors">
                Back to blog
              </span>
              <svg
                className="absolute right-0 z-[-1] -bottom-1 w-[90px] sm:w-[110px] "
                width="200"
                height="10"
                viewBox="0 0 224 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path
                  d="M0.500244 1.63051C8.87551 2.3919 17.451 1.9251 25.8672 1.9251C68.0427 1.9251 110.216 1.63051 152.391 1.63051C171.006 1.63051 189.616 1.33593 208.231 1.33593C212.099 1.33593 215.967 1.36279 219.835 1.33593C220.447 1.33168 222.926 0.77558 223.206 1.33593"
                  stroke="#F5F5F5"
                  strokeWidth="0.5"
                  strokeLinecap="round"
                ></path>
              </svg>
            </span>
          </Link>
        </div>
      </main>
      <MobileTOC />
    </div>
  );
};

export default BlogDetailPage;
