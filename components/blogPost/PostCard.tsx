"use client";

import { BlurImage } from "@/components/blur-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import { PostType } from "@/types/PostType";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import Link from "next/link";

export function PostCard({ post }: { post: PostType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 dark:bg-gradient-to-b dark:from-slate-900/50 dark:to-slate-900/20 shadow-lg dark:shadow-none transition-all duration-300 hover:shadow-xl dark:hover:shadow-[0_0_30px_-15px_rgba(124,58,237,0.3)]"
    >
      <Link
        href={`/blog/${post.slug.current}`}
        className="flex flex-col h-full"
      >
        <div className="relative aspect-video overflow-hidden">
          {post.mainImage ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/5 dark:from-black/30 z-10" />
              <BlurImage
                image={post.mainImage}
                alt={post.title}
                fill
                className="transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </div>

        <div className="p-6 flex-grow">
          <div className="flex flex-wrap gap-2 mb-3">
            {post.categories?.slice(0, 3).map((category) => (
              <Badge
                key={category.title}
                variant="outline"
                className="rounded-full border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-xs font-medium"
              >
                {category.title}
              </Badge>
            ))}
            {post.categories && post.categories.length > 3 && (
              <Badge variant="outline" className="rounded-full text-xs">
                +{post.categories.length - 3}
              </Badge>
            )}
          </div>

          <h3 className="font-bold text-lg text-gray-900 dark:text-white line-clamp-2 mb-2">
            {post.title}
          </h3>

          {post.excerpt && (
            <p className="text-sm text-gray-600 dark:text-slate-400 line-clamp-3">
              {post.excerpt}
            </p>
          )}
        </div>

        <div className="px-6 pb-6 pt-0 flex items-center justify-between text-sm text-gray-500 dark:text-slate-500">
          <div className="flex items-center">
            <Calendar className="mr-1.5 h-4 w-4" />
            <time dateTime={post.publishedAt}>
              {formatDate(post.publishedAt)}
            </time>
          </div>
          {post.estimatedReadingTime && (
            <div className="flex items-center">
              <Clock className="mr-1.5 h-4 w-4" />
              {post.estimatedReadingTime} min read
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}

export function BlogPostsSection({ latestPosts }: { latestPosts: PostType[] }) {
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
