import { PlaceholderPage } from "@/components/common/PlaceholderPage";
import { Rocket } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Uses - Under Construction",
  description:
    "The 'Uses' page is currently under construction. Discover the tools, software, and gear I use for development and daily tasks soon!",
  keywords: [
    "Uses Page",
    "Under Construction",
    "Coming Soon",
    "Tools",
    "Gear",
    "Setup",
    "Aditya Rahmad Uses",
  ],
  openGraph: {
    title: "Uses - Under Construction",
    description:
      "The 'Uses' page is currently under construction. Discover the tools, software, and gear I use for development and daily tasks soon!",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/uses`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image-uses.png`,
        width: 1200,
        height: 630,
        alt: "Uses Page Under Construction",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Uses - Under Construction",
    description:
      "The 'Uses' page is currently under construction. Discover the tools, software, and gear I use for development and daily tasks soon!",
    creator: "@adxxya30",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image-uses.png`,
        width: 1200,
        height: 630,
        alt: "Uses Page Under Construction",
      },
    ],
  },
};

const UsesPage = () => {
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

export default UsesPage;
