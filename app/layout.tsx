import ConditionalComponents from "@/components/conditional-components";
import { Header } from "@/components/layout/Header";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "@/styles/prism-theme.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata, Viewport } from "next";
import { Fredoka } from "next/font/google";
import type React from "react";
import { Suspense } from "react";
import "./globals.css";
import GlobalLoading from "./loading";

const fredoka = Fredoka({
  weight: "500",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://adxxya.vercel.app"),
  title: {
    default: "Aditya Rahmad | Full Stack Developer",
    template: "%s | Aditya Rahmad",
  },
  description:
    "I help founders turn ideas into seamless digital experiences. Professional Full Stack Developer specializing in modern web technologies.",
  applicationName: "Aditya Rahmad Portfolio",
  authors: [{ name: "Aditya Rahmad", url: "https://adxxya.vercel.app" }],
  generator: "Next.js",
  keywords: [
    "Full Stack Developer",
    "Web Developer",
    "React Expert",
    "Next.js Developer",
    "JavaScript Developer",
    "Frontend Engineer",
    "Backend Developer",
    "Portfolio",
    "Aditya Rahmad",
  ],
  creator: "Aditya Rahmad",
  publisher: "Aditya Rahmad",
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
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
  openGraph: {
    title: "Aditya Rahmad | Full Stack Developer",
    description: "I help founders turn ideas into seamless digital experiences",
    url: "https://adxxya.vercel.app",
    siteName: "Aditya Rahmad",
    images: [
      {
        url: "/im-coding.webp",
        width: 1200,
        height: 630,
        alt: "Aditya Rahmad - Full Stack Developer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Rahmad | Full Stack Developer",
    description: "I help founders turn ideas into seamless digital experiences",
    creator: "@adityarahmad",
    images: ["/im-coding.webp"],
  },
  // verification: {
  //   google: "GOOGLE_VERIFICATION_CODE",
  //   yandex: "YANDEX_VERIFICATION_CODE",
  // },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/en-US",
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#5bbad5",
      },
    ],
  },
  manifest: "/site.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Aditya Rahmad",
    statusBarStyle: "black-translucent",
  },
  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={fredoka.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <div className="flex-1">
              {children}
              <Analytics />
            </div>

            {/* Use suspense for client components */}
            <Suspense fallback={<GlobalLoading />}>
              <ConditionalComponents />
            </Suspense>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
