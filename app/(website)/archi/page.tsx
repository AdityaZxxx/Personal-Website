import { ArchiChat } from "@/components/chat/ArchiChat";
import PageHero from "@/components/hero/PageHero";
import { Spotlight } from "@/components/hero/Spotlight";
import { BotIcon } from "lucide-react";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Archi - AI Chatbot",
  description:
    "Chat with Archi, an AI powered by Gemini, to learn more about Aditya Rahmad.",
  keywords: [
    "Archi",
    "AI Chatbot",
    "Gemini AI",
    "Aditya Rahmad AI",
    "Chat with AI",
  ],
  openGraph: {
    title: "Archi - AI Chatbot",
    description:
      "Chat with Archi, an AI powered by Gemini, to learn more about Aditya Rahmad.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/archi`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-archi.png`,
        width: 1200,
        height: 630,
        alt: "Archi AI Chatbot",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Archi - AI Chatbot",
    description:
      "Chat with Archi, an AI powered by Gemini, to learn more about Aditya Rahmad.",
    creator: "@adxxya30",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-archi.png`,
        width: 1200,
        height: 630,
        alt: "Archi AI Chatbot",
      },
    ],
  },
};

export default function ArchiPage() {
  return (
    <section className="overflow-hidden">
      <header>
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="oklch(74.6% 0.16 232.661)"
        />
        <Spotlight
          className="-top-40 left-[-10rem] md:-top-20 md:left-[-20rem]"
          fill="oklch(74.6% 0.16 232.661)"
        />

        <div className="text-center justify-center flex flex-col items-center pt-30 space-y-1 z-50 px-4">
          <PageHero
            icon={<BotIcon className="h-8 w-8" />}
            title="Archi"
            coloredTitle="AI"
            description="Chat with Archi, an AI powered by Gemini, to learn more about Aditya Rahmad."
          />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-16 md:py-24 gap-16">
        <div className="p-4">
          <Suspense fallback={<div>Loading...</div>}>
            <ArchiChat />
          </Suspense>
        </div>
      </main>
    </section>
  );
}
