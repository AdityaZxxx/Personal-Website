import HomeHero from "@/components/hero/HomeHero";
import FeaturedBlog from "@/components/sections/FeaturedBlog";
import { FeaturedProjectsSection } from "@/components/sections/FeaturedProject";
import { GithubSection } from "@/components/sections/GithubSection";
import { TestimonialsSection } from "@/components/sections/Testimonials";
import { TopicsSection } from "@/components/sections/TopicSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aditya Rahmad - Software Developer, Writer, and Tech Enthusiast",
  description:
    "The official website of Aditya Rahmad, a software developer, writer, and tech enthusiast. Explore my projects, read my blog, and connect with me.",
  keywords: [
    "Aditya Rahmad",
    "Software Developer",
    "Web Developer",
    "Tech Blog",
    "Personal Website",
    "Programming",
    "Frontend",
    "Backend",
    "Fullstack",
  ],
  openGraph: {
    title: "Aditya Rahmad - Software Developer, Writer, and Tech Enthusiast",
    description:
      "The official website of Aditya Rahmad, a software developer, writer, and tech enthusiast. Explore my projects, read my blog, and connect with me.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Aditya Rahmad",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image-home.png`,
        width: 1200,
        height: 630,
        alt: "Aditya Rahmad Personal Website",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Rahmad - Software Developer, Writer, and Tech Enthusiast",
    description:
      "The official website of Aditya Rahmad, a software developer, writer, and tech enthusiast. Explore my projects, read my blog, and connect with me.",
    creator: "@adxxya30",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image-home.png`,
        width: 1200,
        height: 630,
        alt: "Aditya Rahmad Personal Website",
      },
    ],
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
};

export default function Home() {
  return (
    <main>
      <HomeHero />
      <TopicsSection />
      <FeaturedBlog />
      <GithubSection />
      <FeaturedProjectsSection />
      <TestimonialsSection />
    </main>
  );
}
