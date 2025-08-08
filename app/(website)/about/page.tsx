import Stack from "@/components/about/ProfileStackCard";
import { TechStackSection } from "@/components/about/TechStack";
import { BuyMeCrypto } from "@/components/common/BuyMeCrypto";
import PageHero from "@/components/hero/PageHero";
import { Spotlight } from "@/components/hero/Spotlight";
import { Timeline } from "@/components/sections/TimelineJourney";
import { getAboutPageData } from "@/lib/sanity/queries";
import { HelpCircle, UserCircle2 } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "Learn more about Aditya Rahmad, a software developer passionate about building beautiful and functional digital experiences.",
  keywords: [
    "Aditya Rahmad",
    "About Me",
    "Software Developer",
    "Web Developer",
    "Tech Journey",
    "Career Path",
  ],
  openGraph: {
    title: "About Aditya Rahmad - Software Developer",
    description:
      "Learn more about Aditya Rahmad, a software developer passionate about building beautiful and functional digital experiences.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/about`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-about.png`,
        width: 1200,
        height: 630,
        alt: "About Aditya Rahmad",
      },
    ],
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "About Aditya Rahmad - Software Developer",
    description:
      "Learn more about Aditya Rahmad, a software developer passionate about building beautiful and functional digital experiences.",
    creator: "@adxxya30",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-about.png`,
        width: 1200,
        height: 630,
        alt: "About Aditya Rahmad",
      },
    ],
  },
};

const images = [
  {
    id: 1,
    img: "/about/image-1.webp",
  },
  {
    id: 2,
    img: "/about/image-2.webp",
  },
  {
    id: 3,
    img: "/about/image-3.webp",
  },
];

const AboutPage = async () => {
  const aboutData = await getAboutPageData();

  const timelineData =
    aboutData?.timelineEvents?.map((event: any) => ({
      title: event.year,
      content: (
        <p className="text-neutral-600 dark:text-muted-foreground">
          {event.description}
        </p>
      ),
    })) || [];

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
            icon={<UserCircle2 className="h-8 w-8" />}
            title="About"
            coloredTitle="Me"
            description="A little bit about my journey, my passion for technology, and the
            things that drive me."
          />
        </div>
      </header>
      <main className="flex flex-col max-w-5xl mx-auto px-4 py-16 md:py-24 gap-16 overflow-hidden">
        <section className="max-w-5xl w-full mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div className="flex flex-col justify-center pr-2 items-center min-h-[200px] md:min-h-[400px]">
              <Stack
                randomRotation={true}
                sensitivity={180}
                sendToBackOnClick={true}
                cardDimensions={{ width: 300, height: 450 }}
                cardsData={images}
              />
              <p className="mt-4 text-center font-handwriting text-sm text-muted-foreground">
                Try to swap or click the cards!
              </p>
            </div>

            <div className="flex flex-col space-y-6 text-muted-foreground">
              <h2 className="text-3xl font-semibold text-foreground">
                Aditya Rahmad
              </h2>
              <p className="text-base leading-relaxed">
                Hey, I'm Adit — a software developer with a deep curiosity for
                how things work, and why people build them the way they do. My
                journey into tech started out of curiosity, but quickly turned
                into a medium of self-expression and continuous exploration. I’m
                most fluent in JavaScript, and I enjoy working across the full
                stack — from backend logic to crafting front-end experiences.
              </p>
              <p className="text-base leading-relaxed">
                As an introvert, writing and coding are how I process the world.
                I care about more than just syntax — I’m interested in the human
                layer of tech: how we work together, what we value in software,
                and how digital tools shape our social behavior. I'm not here to
                teach — I'm here to explore, connect dots, and share what I find
                along the way.
              </p>
              <p className="text-base leading-relaxed">
                Right now, I’m focused on growing as a builder — building tools,
                ideas, and connections through thoughtful code and writing. This
                site is my digital journal: a mix of side projects, reflections,
                and ideas still in the making. If you're into intentional tech
                and the questions behind it, stick around — we might think
                alike.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-5xl w-full mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1 flex items-start gap-3">
              <HelpCircle className="h-8 w-8 text-muted-foreground mt-1" />
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground">
                What I&apos;m up to now
              </h2>
            </div>

            <div className="md:col-span-2">
              <ul className="space-y-4 text-muted-foreground list-disc list-inside">
                {aboutData?.currentActivities?.map((activity: any) => (
                  <li key={activity._key}>
                    <span className="font-semibold text-foreground">
                      {activity.title}:
                    </span>{" "}
                    {activity.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
        <TechStackSection />

        <Timeline data={timelineData} />

        <BuyMeCrypto />
      </main>
    </section>
  );
};

export default AboutPage;
