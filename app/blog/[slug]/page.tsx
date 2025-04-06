import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PortableText } from "@/components/portable-text";
import { ShareButtons } from "@/components/share-buttons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/lib/sanity/image";
import { getAllPostSlugs, getPostBySlug } from "@/lib/sanity/queries";
import { formatDate } from "@/lib/utils";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  // Fix: Access slug directly from params
  const slug = params.slug;
  console.log("generateMetadata - Slug:", slug);

  if (!slug) {
    return {
      title: "Post Not Found | Your Name",
    };
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found | Your Name",
    };
  }

  return {
    title: `${post.title} | Your Name`,
    description: post.excerpt,
    openGraph: post.mainImage
      ? {
          images: [urlForImage(post.mainImage).width(1200).height(630).url()],
        }
      : undefined,
  };
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  console.log("generateStaticParams - Post slugs:", slugs);
  return slugs;
}

export default async function PostPage({ params }: PostPageProps) {
  // Fix: Access slug directly from params
  const slug = params.slug;
  console.log("PostPage - Slug:", slug);

  if (!slug) {
    notFound();
  }

  const post = await getPostBySlug(slug);
  console.log("PostPage - Post data:", post);

  if (!post) {
    notFound();
  }

  return (
    <main className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Button>
        </Link>

        <div className="space-y-6">
          <div className="space-y-2">
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <Link
                    key={category._id}
                    href={`/blog?category=${category.slug}`}
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
              <Image
                src={urlForImage(post.mainImage).url() || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <PortableText value={post.body} />
          </div>

          <div className="border-t pt-6">
            <ShareButtons title={post.title} />
          </div>
        </div>
      </div>
    </main>
  );
}
