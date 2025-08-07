import { GuestbookForm } from "@/components/forms/GuestbookForm";
import { GuestbookList } from "@/components/guestbook/GuestbookList";
import Pinned from "@/components/guestbook/MessagePin";
import PageHero from "@/components/hero/PageHero";
import { Spotlight } from "@/components/hero/Spotlight";
import { getGuestbookEntries } from "@/lib/sanity/queries";
import { MessagesSquare } from "lucide-react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata: Metadata = {
  title: "Guestbook",
  description: "Leave a comment for the future. Say anything you like!",
  keywords: ["Guestbook", "Community", "Aditya Rahmad Guestbook"],
  openGraph: {
    title: "Guestbook",
    description: "Leave a comment for the future. Say anything you like!",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/guestbook`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-guestbook.png`,
        width: 1200,
        height: 630,
        alt: "Guestbook",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guestbook",
    description: "Leave a comment for the future. Say anything you like!",
    creator: "@adxxya30",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-guestbook.png`,
        width: 1200,
        height: 630,
        alt: "Guestbook",
      },
    ],
  },
};

const GuestBookPage = async () => {
  const initialEntries = await getGuestbookEntries();
  const session = await getServerSession(authOptions);

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
            icon={<MessagesSquare className="h-8 w-8" />}
            title="Digital"
            coloredTitle="Guestbook"
            description="Leave a comment for the future. Say anything you like!"
          />
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-16 md:py-24">
        <div className="mb-8 ">
          <Pinned />
        </div>
        <GuestbookForm session={session} />
        <GuestbookList initialEntries={initialEntries} />
      </main>
    </section>
  );
};

export default GuestBookPage;
