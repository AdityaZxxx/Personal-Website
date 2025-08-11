import { getAllPosts } from "@/lib/sanity/queries";
import { PostType } from "@/types/PostType";
import { Feed } from "feed";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL!;
const siteName = "Aditya Rahmad";
const authorName = "Aditya Rahmad";
const authorEmail = "adityaofficial714@gmail.com";

export async function GET() {
  const feed = new Feed({
    title: `${siteName} | Blog`,
    description:
      "Welcome to my personal blog where I share my thoughts on technology, programming, and life.",
    id: siteUrl,
    link: siteUrl,
    language: "en",
    image: `${siteUrl}/logo.avif`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${siteName}`,
    updated: new Date(),
    generator: "Next.js using Feed for RSS",
    feedLinks: {
      rss2: `${siteUrl}/rss.xml`,
    },
    author: {
      name: authorName,
      email: authorEmail,
      link: siteUrl,
    },
  });

  const posts: PostType[] = await getAllPosts();

  posts.forEach((post) => {
    const url = `${siteUrl}/blog/${post.slug}`;
    feed.addItem({
      title: post.title,
      id: url,
      link: url,
      description: post.excerpt,
      content: post.excerpt,
      author: [
        {
          name: post.author.name,
        },
      ],
      date: new Date(post.publishedAt),
    });
  });

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
