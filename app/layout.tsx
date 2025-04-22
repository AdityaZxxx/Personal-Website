import ConditionalComponents from "@/components/conditional-components";
import { Header } from "@/components/header";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/prism-theme.css";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Aditya | Portfolio & Blog",
  description:
    "Personal portfolio and blog showcasing my projects and thoughts on web development.",
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
          defaultTheme="system"
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
