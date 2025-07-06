import { PlaceholderPage } from "@/components/common/PlaceholderPage";
import { Rocket } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Guestbook - Under Construction",
  description:
    "The guestbook page is currently under construction. Get ready to leave your mark and connect with the community soon!",
  keywords: [
    "Guestbook",
    "Under Construction",
    "Coming Soon",
    "Community",
    "Aditya Rahmad Guestbook",
  ],
  openGraph: {
    title: "Guestbook - Under Construction",
    description:
      "The guestbook page is currently under construction. Get ready to leave your mark and connect with the community soon!",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/guestbook`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-guestbook.jpg`,
        width: 1200,
        height: 630,
        alt: "Guestbook Under Construction",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Guestbook - Under Construction",
    description:
      "The guestbook page is currently under construction. Get ready to leave your mark and connect with the community soon!",
    creator: "@adxxya30",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-guestbook.jpg`,
        width: 1200,
        height: 630,
        alt: "Guestbook Under Construction",
      },
    ],
  },
};

const GuestBookPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <PlaceholderPage
        title="This page is under construction!"
        description="Get ready for an amazing experience. 
      We're putting the final touches."
        icon={<Rocket className="w-24 h-24 text-primary" />}
        showBackButton={true}
      />
    </div>
  );
};

export default GuestBookPage;
