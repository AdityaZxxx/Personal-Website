import PageHero from "@/components/hero/PageHero";
import { Spotlight } from "@/components/hero/Spotlight";
import { urlFor } from "@/lib/sanity/image";
import { getUsesPageData } from "@/lib/sanity/queries";
import { WrenchIcon } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Uses",
  description:
    "Discover the tools, software, and gear I use for development and daily tasks soon!",
  keywords: ["Uses Page", "Tools", "Gear", "Setup", "Aditya Rahmad Uses"],
  openGraph: {
    title: "Aditya Rahmad - Uses",
    description:
      "Discover the tools, software, and gear I use for development and daily tasks soon!",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/uses`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-uses.png`,
        width: 1200,
        height: 630,
        alt: "Aditya Rahmad Uses",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aditya Rahmad - Uses",
    description:
      "Discover the tools, software, and gear I use for development and daily tasks soon!",
    creator: "@adxxya30",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image/og-image-uses.png`,
        width: 1200,
        height: 630,
        alt: "Aditya Rahmad Uses",
      },
    ],
  },
};

type UseItem = {
  _key: string;
  name: string;
  description: string;
  link: string;
  image: any;
  category: string;
};

const UseCard = ({ item }: { item: UseItem }) => (
  <Link
    href={item.link}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex sm:flex-col flex-row items-center gap-4 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-800/30"
  >
    <div className="relative w-24 sm:w-full aspect-square flex-shrink-0 overflow-hidden rounded-md bg-neutral-900">
      <Image
        src={urlFor(item.image).width(512).height(512).url()}
        alt={item.name}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="object-cover transition-transform duration-300 rounded-xl"
        placeholder="blur"
        blurDataURL={item.image.lqip}
      />
    </div>

    <div className="flex flex-col flex-1 sm:items-center sm:text-center">
      <p className="font-semibold text-slate-100">{item.name}</p>
      <p className="text-sm text-neutral-400">{item.description}</p>
    </div>
  </Link>
);

const UsesPage = async () => {
  const usesData = await getUsesPageData();
  const allItems: UseItem[] = usesData?.uses || [];

  const laptopItem = allItems.find(
    (item) => item.category.toLowerCase() === "laptop"
  );

  const otherItems = allItems.filter(
    (item) => item.category.toLowerCase() !== "laptop"
  );
  const groupedItems = otherItems.reduce(
    (acc, item) => {
      const category = item.category || "Other";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(item);
      return acc;
    },
    {} as Record<string, UseItem[]>
  );

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
            icon={<WrenchIcon className="h-8 w-8" />}
            title="My Daily"
            coloredTitle="Uses"
            description="A collection of tools, software, and gear that I use for development and
      daily tasks."
          />
        </div>
      </header>

      <main className="flex flex-col max-w-5xl mx-auto px-4 py-16 md:py-24 gap-16 overflow-hidden">
        {laptopItem && (
          <section>
            <h2 className="text-2xl font-bold text-slate-100 mb-6">
              {laptopItem.category.charAt(0).toUpperCase() +
                laptopItem.category.slice(1)}
            </h2>
            <div className="">
              <Link
                href={laptopItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-all duration-300 hover:border-neutral-700 hover:bg-neutral-800/30"
              >
                <div className="overflow-hidden aspect-auto rounded-lg bg-neutral-900">
                  <Image
                    src={urlFor(laptopItem.image)
                      .width(1920)
                      .height(1080)
                      .url()}
                    alt={laptopItem.name}
                    className="h-auto w-full object-cover"
                    width={512}
                    height={256}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority
                    placeholder="blur"
                    blurDataURL={laptopItem.image.lqip}
                  />
                </div>
                <div className="mt-4 text-center">
                  <h3 className="text-xl font-bold text-slate-50">
                    {laptopItem.name}
                  </h3>
                  <p className="mt-1 text-base text-neutral-400">
                    {laptopItem.description}
                  </p>
                </div>
              </Link>
            </div>
          </section>
        )}

        {Object.entries(groupedItems).map(([category, items]) => (
          <section key={category}>
            <h2 className="text-2xl font-bold text-slate-100 mb-6">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4 lg:gap-6">
              {items.map((item) => (
                <UseCard key={item._key} item={item} />
              ))}
            </div>
          </section>
        ))}
      </main>
    </section>
  );
};

export default UsesPage;
