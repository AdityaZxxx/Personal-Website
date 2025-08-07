import PageHero from "@/components/hero/PageHero";
import { Spotlight } from "@/components/hero/Spotlight";
import { StatCard } from "@/components/statistic/StatsCard";
import { getDashboardStats } from "@/lib/sanity/queries";
import { Activity } from "lucide-react";
import { Metadata } from "next";

type WakatimeStats = {
  data: {
    total_seconds: number;
    text: string;
    daily_average: number;
    human_readable_daily_average: string;
  };
};

async function getWakatimeStats(): Promise<WakatimeStats | null> {
  const apiKey = process.env.NEXT_PUBLIC_WAKATIME_API_KEY;
  if (!apiKey) {
    console.warn("Wakatime API key is missing.");
    return null;
  }

  try {
    const response = await fetch(
      "https://wakatime.com/api/v1/users/current/all_time_since_today",
      {
        headers: {
          Authorization: `Basic ${Buffer.from(apiKey).toString("base64")}`,
        },
        next: { revalidate: 3600 }, // Cache data 1 hour
      }
    );
    if (!response.ok) return null;
    return response.json();
  } catch (error) {
    console.error("Error fetching Wakatime stats:", error);
    return null;
  }
}

export const metadata: Metadata = {
  title: "Statistics",
  description: "Public statistics about my digital presence and activities.",
  keywords: [
    "Aditya Rahmad statistics",
    "Live Web Stats",
    "Wakatime Stats",
    "Blog Stats",
    "Portfolio Dashboard",
  ],
  openGraph: {
    title: "Aditya Rahmad - Statistics",
    description: "Public statistics about my digital presence and activities.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/statistics`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-statistics.png`,
        width: 1200,
        height: 630,
        alt: "Aditya Rahmad Statistics",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Rahmad - Statistics",
    description: "Public statistics about my digital presence and activities.",
    creator: "@adxxya30",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-statistics.png`,
        width: 1200,
        height: 630,
        alt: "Aditya Rahmad Statistics",
      },
    ],
  },
};

const StatisticsPage = async () => {
  const [sanityStats, wakatimeStats] = await Promise.all([
    getDashboardStats(),
    getWakatimeStats(),
  ]);

  const stats = [
    {
      icon: "FileText",
      label: "Blog Posts",
      value: sanityStats?.postCount,
      link: "/blog",
      linkText: "View Blog",
      gradient: { startColor: "#10B981", endColor: "#6EE7B7" },
    },
    {
      icon: "MessageSquare",
      label: "Short Notes",
      value: sanityStats?.shortCount,
      link: "/shorts",
      linkText: "View Shorts",
      gradient: { startColor: "#3B82F6", endColor: "#93C5FD" },
    },
    {
      icon: "Heart",
      label: "Total Likes",
      value: sanityStats?.totalLikes,
      link: "/guestbook",
      linkText: "View Guestbook",
      gradient: { startColor: "#EC4899", endColor: "#F9A8D4" },
    },
    {
      icon: "Clock",
      label: "Coding Time",
      value: wakatimeStats?.data.text,
      link: "https://wakatime.com/@adxxya30",
      linkText: "Wakatime Profile",
      gradient: { startColor: "#F59E0B", endColor: "#FCD34D" },
    },
  ] as const;

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
            icon={<Activity className="h-8 w-8" />}
            title="Public "
            coloredTitle="Statistics"
            description="Some numbers about my digital presence and activities."
          />
        </div>
      </header>
      <main className="flex flex-col max-w-5xl mx-auto px-4 py-16 md:py-24 gap-16">
        <div className="mb-4 mt-16 grid gap-4 sm:grid-cols-2 md:grid-cols-2">
          {stats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>
      </main>
    </section>
  );
};

export default StatisticsPage;
