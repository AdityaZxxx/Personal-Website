// import { ArrowLeft, Calendar, Clock } from "lucide-react";
// import type { Metadata } from "next";
// import Link from "next/link";
// import { notFound } from "next/navigation";

// import { AuthorProfile } from "@/components/author-profile";
// import { BlurImage } from "@/components/blur-image";
// import { FeaturedPosts } from "@/components/featured-posts";
// import { GiscusComments } from "@/components/giscus-comments";
// import { PortableText } from "@/components/portable-text";
// import { ShareButtons } from "@/components/share-buttons";
// import { TagList } from "@/components/tag-list";
// import { TrakteerSupport } from "@/components/trakteer-support";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   getAllPostSlugs,
//   getFeaturedPosts,
//   getPostBySlug,
// } from "@/lib/sanity/queries";
// import { formatDate } from "@/lib/utils";

// interface PostPageProps {
//   params: {
//     slug: string;
//   };
// }

// export async function generateMetadata(
//   props: PostPageProps
// ): Promise<Metadata> {
//   const params = props.params;
//   const post = await getPostBySlug(params?.slug);

//   if (!post) {
//     return {
//       title: "Post Not Found | Aditya",
//     };
//   }

//   return {
//     title: `${post.title} | Aditya`,
//     description: post.excerpt,
//     keywords: post.tags?.join(", "),
//     openGraph: post.mainImage
//       ? {
//           images: [
//             {
//               url: post.mainImage.url,
//               width: 1200,
//               height: 630,
//               alt: post.title,
//             },
//           ],
//           type: "article",
//           publishedTime: post.publishedAt,
//           authors: post.author?.name ? [post.author.name] : undefined,
//           tags: post.tags,
//         }
//       : undefined,
//   };
// }

// export async function generateStaticParams() {
//   const posts = await getAllPostSlugs();

//   return posts.map((post: any) => ({
//     slug: typeof post === "string" ? post : post.slug.current,
//   }));
// }

// export default async function PostPage(props: PostPageProps) {
//   const params = await props.params;
//   const slug = params?.slug;

//   const post = await getPostBySlug(slug);
//   const featuredPosts = await getFeaturedPosts(4);

//   // Filter out the current post from featured posts
//   const filteredFeaturedPosts = featuredPosts.filter(
//     (featuredPost: any) => featuredPost.slug.current !== slug
//   );

//   if (!post) {
//     notFound();
//   }

//   return (
//     <main className="container px-4 py-12 md:px-6 md:py-24">
//       <div className="mx-auto max-w-7xl">
//         <Link href="/blog">
//           <Button variant="ghost" className="mb-8 pl-0">
//             <ArrowLeft className="mr-2 h-4 w-4" />
//             Back to Blog
//           </Button>
//         </Link>

//         <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">
//           <div className="space-y-6">
//             <div className="space-y-2">
//               {post.categories && post.categories.length > 0 && (
//                 <div className="flex flex-wrap gap-2">
//                   {post.categories.map((category: any) => (
//                     <Link
//                       key={category._id}
//                       href={`/blog?category=${category.slug.current}`}
//                     >
//                       <Badge variant="secondary">{category.title}</Badge>
//                     </Link>
//                   ))}
//                 </div>
//               )}
//               <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
//                 {post.title}
//               </h1>
//               <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
//                 <div className="flex items-center gap-1">
//                   <Calendar className="h-4 w-4" />
//                   <time dateTime={post.publishedAt}>
//                     {formatDate(post.publishedAt)}
//                   </time>
//                 </div>
//                 {post.estimatedReadingTime && (
//                   <div className="flex items-center gap-1">
//                     <Clock className="h-4 w-4" />
//                     <span>{post.estimatedReadingTime} min read</span>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {post.mainImage && (
//               <div className="relative aspect-video overflow-hidden rounded-lg">
//                 <BlurImage
//                   image={post.mainImage}
//                   alt={post.title}
//                   fill
//                   className="object-cover"
//                   priority
//                   sizes="(max-width: 768px) 100vw, 800px"
//                 />
//               </div>
//             )}

//             {post.tags && <TagList tags={post.tags} className="mt-4" />}

//             <div className="prose prose-gray dark:prose-invert max-w-none">
//               <PortableText value={post.body} />
//             </div>

//             <div className="border-t pt-6">
//               <ShareButtons title={post.title} />
//             </div>

//             <GiscusComments slug={params.slug} />
//           </div>

//           <div className="space-y-8">
//             <div className="lg:sticky lg:top-24">
//               {post.author && (
//                 <div className="border-t pt-6">
//                   <h2 className="text-xl font-bold mb-4">About the Author</h2>
//                   <AuthorProfile author={post.author} />
//                 </div>
//               )}
//               {filteredFeaturedPosts.length > 0 && (
//                 <div className="mt-8">
//                   <FeaturedPosts posts={filteredFeaturedPosts} />
//                 </div>
//               )}
//               <TrakteerSupport username="adxxya30" className="mt-8" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }

import { ArrowLeft, Bookmark, Calendar, Clock } from "lucide-react";
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

// export async function generateMetadata(
//   props: PostPageProps
// ): Promise<Metadata> {
//   const params = props.params;
//   const post = await getPostBySlug(params?.slug);

//   if (!post) {
//     return {
//       title: "Post Not Found | Aditya",
//     };
//   }

//   return {
//     title: `${post.title} | Aditya`,
//     description: post.excerpt,
//     keywords: post.tags?.join(", "),
//     openGraph: post.mainImage
//       ? {
//           images: [
//             {
//               url: post.mainImage.url,
//               width: 1200,
//               height: 630,
//               alt: post.title,
//             },
//           ],
//           type: "article",
//           publishedTime: post.publishedAt,
//           authors: post.author?.name ? [post.author.name] : undefined,
//           tags: post.tags,
//         }
//       : undefined,
//   };
// }
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

  const metadata: Metadata = {
    title: `${post.title} | Aditya`,
    description: post.excerpt,
    keywords: post.tags?.join(", ") || "",
    applicationName: "Aditya's Blog",
    creator: post.author?.name || "Aditya",
    publisher: "Aditya",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: `https://adxxya30.vercel.app/blog/${params.slug}`,
    },
    openGraph: {
      title: `${post.title} | Aditya`,
      description: post.excerpt,
      url: `https://adxxya30.vercel.app/blog/${params.slug}`,
      siteName: "Aditya's Blog",
      locale: "en_US",
      type: "article",
      publishedTime: post.publishedAt,
      modifiedTime: post._updatedAt || post.publishedAt,
      ...(post.author?.name && { authors: [post.author.name] }),
      ...(post.tags && { tags: post.tags }),
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | Aditya`,
      description: post.excerpt,
      creator: post.author?.name
        ? `@${post.author.name.replace(/\s+/g, "")}`
        : "@adxxya30",
      ...(post.mainImage && {
        images: [
          {
            url: post.mainImage.url,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      }),
    },
  };

  // Add OpenGraph image if exists
  if (post.mainImage) {
    metadata.openGraph!.images = [
      {
        url: post.mainImage.url,
        width: 1200,
        height: 630,
        alt: post.title,
      },
    ];

    // Add additional image formats for better compatibility
    metadata.twitter!.images = metadata.openGraph!.images;
  }

  // Add article specific metadata
  metadata.description = {
    publishedTime: post.publishedAt,
    modifiedTime: post._updatedAt || post.publishedAt,
    ...(post.tags && { tags: post.tags }),
    ...(post.author?.name && {
      authors: [
        `https://adxxya30.vercel.app/authors/${post.author.slug.current}`,
      ],
    }),
  };

  return metadata;
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
                <div className="flex items-center gap-2">
                  <Bookmark className="h-4 w-4" />
                  <span>Save for later</span>
                </div>
              </div>
            </header>

            {/* Featured Image */}
            {post.mainImage && (
              <figure className="relative aspect-video overflow-hidden rounded-xl border shadow-sm">
                <BlurImage
                  image={post.mainImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                <figcaption className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 text-white text-sm">
                  {post.mainImage.caption || post.title}
                </figcaption>
              </figure>
            )}

            {/* Tags */}
            {post.tags && (
              <div className="pt-2">
                <TagList tags={post.tags} />
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-medium prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-lg prose-img:shadow-sm">
              <PortableText value={post.body} />
            </div>

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
          <aside className="space-y-8 lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:overflow-y-auto lg:scrollbar-hide">
            {/* Custom scrollbar container */}
            <div className="lg:relative lg:pr-2">
              {/* Author Section */}
              {post.author && (
                <div className="rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5">
                  <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    About the Author
                  </h2>
                  <AuthorProfile author={post.author} />
                </div>
              )}

              {/* Featured Posts */}
              {filteredFeaturedPosts.length > 0 && (
                <div className="rounded-lg border bg-card p-6 shadow-sm mt-8 transition-all hover:shadow-md hover:-translate-y-0.5 group">
                  <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    You might also like
                  </h2>
                  <div className="relative overflow-hidden">
                    <div className="absolute -right-6 top-0 h-full w-1 bg-gradient-to-b from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <FeaturedPosts posts={filteredFeaturedPosts} />
                  </div>
                </div>
              )}

              {/* Support Section */}
              <TrakteerSupport
                username="adxxya30"
                className="mt-8 rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
              />

              {/* Scroll indicator (only shows when scrolling) */}
              <div className="hidden lg:block fixed right-4 bottom-8 w-2 h-20 bg-primary/20 rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-8 bg-primary rounded-full scroll-indicator" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
