import { PlaceholderPage } from "@/components/common/PlaceholderPage";
import { Rocket } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bucket List - Under Construction",
  description:
    "The bucket list page is currently under construction. Get ready to explore my aspirations, goals, and dreams soon!",
  keywords: [
    "Bucket List",
    "Under Construction",
    "Coming Soon",
    "Goals",
    "Aspirations",
    "Dreams",
    "Aditya Rahmad Bucket List",
  ],
  openGraph: {
    title: "Bucket List - Under Construction",
    description:
      "The bucket list page is currently under construction. Get ready to explore my aspirations, goals, and dreams soon!",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/bucket`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image-bucket.png`,
        width: 1200,
        height: 630,
        alt: "Bucket List Under Construction",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bucket List - Under Construction",
    description:
      "The bucket list page is currently under construction. Get ready to explore my aspirations, goals, and dreams soon!",
    creator: "@adxxya30",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image-bucket.png`,
        width: 1200,
        height: 630,
        alt: "Bucket List Under Construction",
      },
    ],
  },
};

const BucketPage = () => {
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

export default BucketPage;
