import AnimatedSection from "@/components/animated-section";
import { BlogPostsSection } from "@/components/blogPost/PostCard";
import ContactSection from "@/components/contact/ContactSection";
import GithubSection from "@/components/gitgraph/GithubSection";
import AboutPage from "@/components/pages/AboutPage";
import BentoShowcase from "@/components/pages/BentoPage";
import HeroPage from "@/components/pages/HeroPage";
import { FeaturedProjectsSection } from "@/components/project/ProjectCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aditya Rahmad |  Software Engineer & Tech Enthusiast",
  description:
    "Explore the portfolio of Aditya Rahmad, a Software Engineer from Indonesia who is passionate about building modern and scalable web applications. See latest projects, read technical writings, and let's collaborate.",

  keywords: [
    "Aditya Rahmad",
    "Tech Enthusiast",
    "Software Engineer",
    "Web Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
    "Blog Teknologi",
    "Developer Indonesia",
  ],

  authors: [{ name: "Aditya Rahmad", url: "https://adxxya30.vercel.app" }],
  creator: "Aditya Rahmad",

  metadataBase: new URL("https://adxxya30.vercel.app"),

  openGraph: {
    title: "Aditya Rahmad | Tech Enthusiast & Software Engineer",
    description:
      "Explore the portfolio of Aditya Rahmad, a Software Engineer & Tech Enthusiast from Indonesia who is passionate about building modern and scalable web applications.",
    url: "https://adxxya30.vercel.app",
    siteName: "Aditya Rahmad Portfolio",
    images: [
      {
        url: "/og-image.avif",
        width: 1200,
        height: 630,
        alt: "Aditya Rahmad - Homepage Portfolio",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Aditya Rahmad | Software Engineer & Tech Enthusiast",
    description:
      "Explore the portfolio of Aditya Rahmad, a Software Engineer & Tech Enthusiast from Indonesia who is passionate about building modern and scalable web applications.",
    creator: "@adxxya30",
    images: ["og-image.avif"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
};

export default function Home() {
  return (
    <main className="relative flex flex-col items-center overflow-hidden bg-transparent text-white">
      <HeroPage />

      <AboutPage />

      <BentoShowcase />

      <AnimatedSection delay={100}>
        <GithubSection />
      </AnimatedSection>

      <AnimatedSection>
        <FeaturedProjectsSection />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <BlogPostsSection />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <ContactSection />
      </AnimatedSection>
    </main>
  );
}
