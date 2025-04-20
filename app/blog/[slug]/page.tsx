// import { ArrowLeft, Calendar, Clock } from "lucide-react";
// import type { Metadata } from "next";
// import Link from "next/link";
// import { notFound } from "next/navigation";

// import { GiscusComments } from "@/components/giscus-comments";
// import { PortableText } from "@/components/portable-text";
// import { ShareButtons } from "@/components/share-buttons";
// import { TagList } from "@/components/tag-list";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   getAllPostSlugs,
//   getFeaturedPosts,
//   getPostBySlug,
// } from "@/lib/sanity/queries";
// import { formatDate } from "@/lib/utils";
// import { AuthorProfile } from "../../../components/author-profile";
// import { BlurImage } from "../../../components/blur-image";
// import { FeaturedPosts } from "../../../components/featured-posts";
// import { TrakteerSupport } from "../../../components/trakteer-support";
// import { urlForImage } from "../../../lib/sanity/image";

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
//       robots: {
//         index: false,
//         follow: true,
//       },
//     };
//   }

//   return {
//     title: `${post.title} | Aditya`,
//     description: post.excerpt,
//     openGraph: post?.mainImage
//       ? {
//           images: [
//             urlForImage(post.mainImage)?.width(1200)?.height(630)?.url() ?? "",
//           ],
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
//   const filteredFeaturedPosts = featuredPosts.filter(
//     (featuredPost: any) => featuredPost.slug.current !== slug
//   );

//   if (!post) {
//     notFound();
//   }

//   return (
//     <main className="container px-4 py-8 md:px-6 md:py-16">
//       <div className="mx-auto max-w-7xl">
//         {/* Back Button */}
//         <div className="mb-8">
//           <Link href="/blog">
//             <Button variant="ghost" className="group pl-0">
//               <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
//               Back to Blog
//             </Button>
//           </Link>
//         </div>

//         <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
//           {/* Main Content */}
//           <article className="space-y-8">
//             {/* Article Header */}
//             <header className="space-y-4">
//               {post.categories?.length > 0 && (
//                 <div className="flex flex-wrap gap-2">
//                   {post.categories.map((category: any) => (
//                     <Link
//                       key={category._id}
//                       href={`/blog?category=${category.slug.current}`}
//                     >
//                       <Badge
//                         variant="secondary"
//                         className="hover:bg-primary/10 hover:text-primary transition-colors"
//                       >
//                         {category.title}
//                       </Badge>
//                     </Link>
//                   ))}
//                 </div>
//               )}

//               <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
//                 {post.title}
//               </h1>

//               <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
//                 <div className="flex items-center gap-2">
//                   <Calendar className="h-4 w-4" />
//                   <time dateTime={post.publishedAt}>
//                     {formatDate(post.publishedAt)}
//                   </time>
//                 </div>
//                 {post.estimatedReadingTime && (
//                   <div className="flex items-center gap-2">
//                     <Clock className="h-4 w-4" />
//                     <span>{post.estimatedReadingTime} min read</span>
//                   </div>
//                 )}
//               </div>
//             </header>

//             {/* Featured Image */}
//             {post.mainImage && (
//               <figure className="relative aspect-video overflow-hidden rounded-xl border shadow-sm">
//                 {/* <BlurImage
//                   image={
//                     urlForImage(post.mainImage)?.url() || "/placeholder.svg"
//                   }
//                   alt={post.title}
//                   fill
//                   className="object-cover"
//                   priority
//                 /> */}
//                 <BlurImage
//                   image={
//                     urlForImage(post.mainImage)?.url() || "/placeholder.svg"
//                   }
//                   alt={post.title}
//                   fill
//                   className="object-cover"
//                   priority
//                 />
//               </figure>
//             )}

//             {/* Article Content */}
//             <div className="prose prose-gray dark:prose-invert max-w-none prose-headings:font-medium prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-lg prose-img:shadow-sm">
//               <PortableText value={post.body} />
//             </div>
//             {/* Tags */}
//             {post.tags && (
//               <div className="pt-2">
//                 <TagList tags={post.tags} />
//               </div>
//             )}

//             {/* Share Buttons */}
//             <div className="border-t pt-8">
//               <ShareButtons
//                 title={post.title}
//                 imageUrl={post.mainImage?.url}
//                 description={post.excerpt}
//               />
//             </div>

//             {/* Comments */}
//             <GiscusComments slug={params.slug} />
//           </article>

//           {/* Sidebar */}
//           <aside className="sticky top-24 space-y-8 max-h-screen overflow-y-auto scrollbar-hide">
//             {/* Author */}
//             {post.author && (
//               <div>
//                 <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//                   About the Author
//                 </h2>
//                 <AuthorProfile author={post.author} />
//               </div>
//             )}

//             {/* Featured Posts */}
//             {filteredFeaturedPosts?.length > 0 && (
//               <div className="rounded-lg border bg-card p-6 shadow-sm transition-all duration-300 mt-8">
//                 <h2 className="text-xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
//                   You might also like
//                 </h2>
//                 <div className="relative overflow-hidden group">
//                   <div className="absolute -right-6 top-0 h-full w-1 bg-gradient-to-b from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
//                   <FeaturedPosts posts={filteredFeaturedPosts} />
//                 </div>
//               </div>
//             )}

//             {/* Trakteer */}
//             <TrakteerSupport
//               username="adxxya30"
//               className="mt-8 rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-0.5"
//             />
//           </aside>
//         </div>
//       </div>
//     </main>
//   );
// }
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { AuthorProfile } from "@/components/author-profile";
import { BlurImage } from "@/components/blur-image";
import { FeaturedPosts } from "@/components/featured-posts";
import { GiscusComments } from "@/components/giscus-comments";
import { PortableText } from "@/components/portable-text";
import { ReadingProgress } from "@/components/reading-progress";
import { ShareButtons } from "@/components/share-buttons";
import { TableOfContents } from "@/components/table-of-contents";
import { TagList } from "@/components/tag-list";
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
import { ScrollToTopButton } from "../../../components/scroll-to-top-buttom";

interface PostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | Aditya",
      robots: { index: false, follow: true },
    };
  }

  const imageUrl = urlForImage(post.mainImage)?.width(1200).height(630).url();

  return {
    title: `${post.title} | Aditya`,
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

export default async function PostPage({ params }: PostPageProps) {
  const [post, featuredPosts] = await Promise.all([
    getPostBySlug(params.slug),
    getFeaturedPosts(4),
  ]);

  if (!post) notFound();

  const filteredFeaturedPosts = featuredPosts.filter(
    (p: any) => p.slug.current !== params.slug
  );

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

          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_320px] gap-12">
            {/* Main Content */}
            <article className="space-y-8">
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

                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
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
                      <User className="xl:hidden block h-4 w-4" />
                      <span className="xl:hidden block">
                        {post.author.name}
                      </span>
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

              <TableOfContents />

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

              <GiscusComments slug={params.slug} />

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
