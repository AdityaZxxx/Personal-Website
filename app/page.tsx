import AnimatedSection from "@/components/animated-section";
import { Metadata } from "next";
import { BlogPostsSection } from "../components/blogPost/PostCard";
import ContactSection from "../components/contact/ContactSection";
import GithubSection from "../components/gitgraph/GithubSection";
import AboutPage from "../components/pages/AboutPage";
import BentoShowcase from "../components/pages/BentoPage";
import HeroPage from "../components/pages/HeroPage";
import { FeaturedProjectsSection } from "../components/project/ProjectCard";

export const metadata: Metadata = {
  // 1. Judul (Title) yang Lebih Baik
  title: "Aditya Rahmad | Full-Stack Developer & Content Creator",
  description:
    "Jelajahi portofolio Aditya Rahmad, seorang Full-Stack Developer dari Indonesia yang bersemangat dalam membangun aplikasi web modern dan skalabel. Lihat proyek-proyek terbaru, baca tulisan teknis, dan mari berkolaborasi.",

  // 2. Keywords (Meskipun pengaruhnya kecil, tetap baik untuk ada)
  keywords: [
    "Aditya Rahmad",
    "Full-Stack Developer",
    "Web Developer",
    "Next.js",
    "React",
    "TypeScript",
    "Portfolio",
    "Blog Teknologi",
    "Developer Indonesia",
  ],

  // 3. Nama Pembuat
  authors: [{ name: "Aditya Rahmad", url: "https://adxxya.vercel.app " }],
  creator: "Aditya Rahmad",

  // 4. Metadata Dasar untuk URL Kanonikal
  metadataBase: new URL("https://adxxya.vercel.app"), // GANTI DENGAN DOMAIN ANDA

  // 5. Open Graph (Untuk Facebook, LinkedIn, WhatsApp, dll.)
  openGraph: {
    title: "Aditya Rahmad | Full-Stack Developer & Content Creator",
    description:
      "Jelajahi portofolio Aditya Rahmad, seorang Full-Stack Developer dari Indonesia yang bersemangat dalam membangun aplikasi web modern dan skalabel.",
    url: "https://adxxya.vercel.app", // GANTI DENGAN DOMAIN ANDA
    siteName: "Aditya Rahmad Portfolio",
    images: [
      {
        url: "/og-image.png", // Letakkan gambar di folder /public
        width: 1200,
        height: 630,
        alt: "Aditya Rahmad - Halaman Utama Portofolio",
      },
    ],
    locale: "id_ID",
    type: "website",
  },

  // 6. Twitter Cards (Tampilan khusus saat dibagikan di Twitter)
  twitter: {
    card: "summary_large_image",
    title: "Aditya Rahmad | Full-Stack Developer & Content Creator",
    description:
      "Jelajahi portofolio Aditya Rahmad, seorang Full-Stack Developer dari Indonesia yang bersemangat dalam membangun aplikasi web modern dan skalabel.",
    creator: "@adxxya30", // GANTI DENGAN HANDLE TWITTER ANDA
    images: ["/og-image.png"], // Gunakan gambar yang sama dengan Open Graph
  },

  // 7. Informasi Tambahan
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

  // 8. Ikon Situs
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
