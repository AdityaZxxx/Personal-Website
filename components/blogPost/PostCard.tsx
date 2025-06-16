import { Button } from "@/components/ui/button";
import { PostType } from "@/types/PostType";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../lib/sanity/image";
import { getLatestPosts } from "../../lib/sanity/queries";
import { formatDate } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

export function PostCard({ post }: { post: PostType }) {
  return (
    <div className="space-y-4">
      <Link key={post._id} href={`/blog/${post.slug.current}`}>
        <Card className="overflow-hidden hover:shadow-md transition-shadow border-x-0 border-y rounded-none">
          <CardContent className="p-4 flex gap-3 flex-col md:flex-row">
            <div className="flex-1 min-w-0 order-2 md:order-1">
              <div className="flex items-center mt-1 mb-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3 mr-1" />
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
              </div>
              <h3 className="font-bold text-base md:text-lg line-clamp-2">
                {post.title}
              </h3>
              <h4 className="font-medium text-sm line-clamp-3 text-gray-400">
                {post.excerpt}
              </h4>
              {post.estimatedReadingTime && (
                <div className="flex items-center text-xs gap-1.5 pt-4 font-light text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>{post.estimatedReadingTime} min read</span>
                </div>
              )}
              {post.categories && post.categories.length > 0 && (
                <div className="mt-4">
                  <Badge key={post._id} variant="secondary" className="text-xs">
                    {post.categories[0].title}
                  </Badge>
                </div>
              )}
            </div>
            {post.mainImage && (
              <div className="order-1 md:order-2 relative w-full rounded-md overflow-hidden aspect-video flex-shrink-0  md:w-48 lg:w-56">
                <Image
                  src={urlFor(post.mainImage).width(800).url()}
                  alt={post.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 767px) 100vw, 33vw"
                />
              </div>
            )}
          </CardContent>
        </Card>
      </Link>
    </div>
  );
}

export async function BlogPostsSection() {
  const latestPosts: PostType[] = await getLatestPosts(6);
  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 bg-gray-50 dark:bg-slate-950/50 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-200/20 dark:bg-purple-900/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-200/20 dark:bg-blue-900/10 rounded-full filter blur-3xl"></div>
      </div>

      <div className="container relative px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center rounded-full border border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-900/10 px-4 py-1.5 text-sm font-medium text-purple-700 dark:text-purple-300 mb-4">
            Latest Insights
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
            My Recent Writings
          </h2>
          <p className="mt-4 max-w-[700px] mx-auto text-lg text-gray-600 dark:text-slate-400">
            Explore my thoughts on web development, design patterns, and
            cutting-edge technologies.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {latestPosts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/blog">
            <Button
              variant="outline"
              className="group rounded-full border border-purple-200 dark:border-purple-800 bg-white dark:bg-slate-900/50 px-6 py-5 text-purple-700 dark:text-purple-300 shadow-sm transition-all hover:bg-purple-50 dark:hover:bg-purple-900/20 hover:text-purple-800 dark:hover:text-purple-200 hover:shadow-md hover:shadow-purple-200/30 dark:hover:shadow-purple-900/20"
            >
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
