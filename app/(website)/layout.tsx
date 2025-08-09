import { ProgressBar } from "@/components/common/ProgressBar";
import { Providers } from "@/components/common/Providers";
import { Footer } from "@/components/layouts/Footer";
import { Navbar } from "@/components/layouts/Navbar";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import {
  Geist_Mono,
  Inter,
  Rethink_Sans,
  Shadows_Into_Light,
} from "next/font/google";
import { Suspense } from "react";
import { UmamiAnalytics } from "../../components/UmamiAnalitics";
import "./globals.css";

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
});
const shadows = Shadows_Into_Light({
  weight: "400",
  variable: "--font-shadows-into-light",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Aditya Rahmad - Personal Website",
    template: "%s | Aditya Rahmad",
  },
  description:
    "Welcome to my personal website, where I share my journey as a software developer, writer, and tech enthusiast. Explore my projects, read my blog, and connect with me.",
  keywords: [
    "Aditya Rahmad",
    "Personal Website",
    "Software Developer",
    "Web Development",
    "Frontend Developer",
    "Backend Developer",
    "Fullstack Developer",
    "Tech Blog",
    "Programming",
    "Next.js",
    "React",
    "TypeScript",
    "Sanity.io",
  ],
  authors: [
    {
      name: "Aditya Rahmad",
      url: process.env.NEXT_PUBLIC_SITE_URL,
    },
  ],
  creator: "Aditya Rahmad",
  publisher: "Aditya Rahmad",
  openGraph: {
    title: "Aditya Rahmad - Personal Website",
    description:
      "Welcome to my personal website, where I share my journey as a software developer, writer, and tech enthusiast. Explore my projects, read my blog, and connect with me.",
    url: process.env.NEXT_PUBLIC_SITE_URL,
    siteName: "Aditya Rahmad - Personal Website",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-home.png`,
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
    title: "Aditya Rahmad - Personal Website",
    description:
      "Welcome to my personal website, where I share my journey as a software developer, writer, and tech enthusiast. Explore my projects, read my blog, and connect with me.",
    creator: "@adxxya30",
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-home.png`],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/icon1.png",
    apple: "/apple-icon.png",
  },
  // manifest: "/site.webmanifest",
};

export const viewport = "width=device-width, initial-scale=1";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${rethinkSans.variable} ${shadows.variable} ${inter.variable} ${geistMono.variable} antialiased`}
    >
      <meta name="apple-mobile-web-app-title" content="Aditya Rahmad" />
      <body>
        <Providers>
          <Navbar />
          <Suspense fallback={null}>
            <ProgressBar />
          </Suspense>
          <Toaster position="bottom-right" />
          {children}
          <UmamiAnalytics />
          <Analytics />
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
