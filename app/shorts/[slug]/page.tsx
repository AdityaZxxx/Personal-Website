import { ArrowLeft, BookOpen, EyeIcon } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { LikeButton } from "@/components/buttons/LikeButton";
import { TagList } from "@/components/common/TagList";
import { ViewTracker } from "@/components/common/ViewTracker";
import { PortableText } from "@/components/sanity/PortableText";
import { DesktopTOC } from "@/components/toc/DesktopTOC";
import { MobileTOC } from "@/components/toc/MobileTOC";
import { Separator } from "@/components/ui/separator";
import { getShortBySlug } from "@/lib/sanity/queries";
import { formatDate } from "@/lib/utils";

type ShortDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ShortDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const short = await getShortBySlug(slug);

  if (!short) {
    return {
      title: "Short Not Found",
      description: "The short you are looking for does not exist.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonicalUrl = `${siteUrl}/shorts/${short.slug}`;

  const keywords = [
    ...(short.tags || []),
    short.title,
    "Aditya Rahmad",
    "Shorts",
    "Snippet",
  ];

  return {
    title: short.title,
    description: short.excerpt || short.body?.[0]?.children?.[0]?.text || "",
    keywords: keywords,
    authors: [{ name: "Aditya Rahmad", url: siteUrl }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: short.title,
      description: short.excerpt || short.body?.[0]?.children?.[0]?.text || "",
      url: canonicalUrl,
      siteName: "Aditya Rahmad - Shorts",
      locale: "en_US",
      type: "article",
      publishedTime: short.publishedAt,
      modifiedTime: short._updatedAt,
      tags: short.tags,
    },
    twitter: {
      card: "summary",
      title: short.title,
      description: short.excerpt || short.body?.[0]?.children?.[0]?.text || "",
      site: "@adxxya30",
      creator: "@adxxya30",
    },
  };
}

const ShortDetailPage = async ({ params }: ShortDetailPageProps) => {
  const { slug } = await params;
  const short = await getShortBySlug(slug);

  if (!short) {
    notFound();
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonicalUrl = `${siteUrl}/shorts/${short.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: short.title,
    description: short.excerpt || short.body?.[0]?.children?.[0]?.text || "",
    datePublished: short.publishedAt,
    dateModified: short._updatedAt,
    author: [
      {
        "@type": "Person",
        name: "Aditya Rahmad",
        url: siteUrl,
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "Aditya Rahmad",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.avif`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <div className="relative bg-background text-slate-200">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ViewTracker key={short._id} contentId={short._id} docType="short" />

      <div className="pointer-events-none select-none absolute top-0 left-0 right-0 h-[450px] w-full z-0 p-4 md:p-8 opacity-60">
        <div className="flex items-center justify-between invisible md:visible">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="size-4 bg-neutral-600"></div>
              <div className="size-4 bg-neutral-600"></div>
              <div className="size-4 bg-neutral-600"></div>
            </div>
            <div className="flex items-center space-x-[-1px]">
              <div className="size-4 border border-neutral-600"></div>
              <div className="size-4 border border-neutral-600"></div>
              <div className="size-4 border border-neutral-600"></div>
              <div className="size-4 border border-neutral-600"></div>
            </div>
          </div>
          <div className="space-y-1 text-right">
            <div className="flex items-baseline justify-start gap-2">
              <span className="inline-block min-w-[8ch] pr-4 text-sm text-muted-foreground">
                Notes
              </span>
              <span className="flex flex-col">
                <span className="font-handwriting text-sm tracking-wider text-muted-foreground">
                  {short.title}
                </span>
                <span className="bg-background h-[1px] w-full"></span>
              </span>
            </div>
            <div className="flex items-baseline justify-start gap-2">
              <span className="inline-block min-w-[8ch] pr-4 text-sm text-muted-foreground">
                Date
              </span>
              <span className="font-handwriting text-sm text-muted-foreground">
                {formatDate(short.publishedAt)}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col mt-8">
          <hr className="border-neutral-600 border-[1.5px]" />
          <hr className="border-neutral-600 border-[0.5px] mt-1" />
          <div
            className="mt-1"
            style={{
              height: "2px",
              backgroundImage:
                "radial-gradient(circle, rgb(63 63 70) 1px, transparent 1px)",
              backgroundSize: "50px 2px",
              backgroundPosition: "-24px 0px",
            }}
          ></div>
        </div>
        <div className="flex flex-col gap-4 md:gap-8 opacity-30 mt-8">
          <hr className="border-neutral-600 border-dashed" />
          <hr className="border-neutral-600" />
          <hr className="border-neutral-600 border-dashed" />
          <hr className="border-neutral-600" />
          <hr className="border-neutral-600 border-dashed" />
          <hr className="border-neutral-600" />
        </div>
      </div>

      <main className="relative z-10 mx-auto max-w-5xl px-6 pb-24 pt-48 md:pt-80">
        <div className="transform -translate-y-16 md:-translate-y-24 space-y-6">
          <div className="space-y-6">
            <h1 className="text-3xl font-rethink-sans font-semibold tracking-tight text-primary sm:text-4xl md:text-5xl !leading-tight">
              {short.title}
            </h1>

            <Separator className="my-4" />

            <div className="flex items-center justify-between text-xs ">
              {typeof short.estimatedReadingTime === "number" && (
                <div className="flex items-center gap-1.5" title="Read time">
                  <BookOpen className="h-4 w-4 text-[#525252]" />
                  <span className="text-muted-foreground">
                    {short.estimatedReadingTime} min read
                  </span>
                </div>
              )}

              <div className="flex items-center space-x-5">
                {typeof short.viewCount === "number" && (
                  <div
                    className="flex items-center gap-1.5"
                    title={`${new Intl.NumberFormat("id-ID").format(short.viewCount)} views`}
                  >
                    <EyeIcon className="h-4 w-4 text-[#525252]" />
                    <span className="text-muted-foreground">
                      {new Intl.NumberFormat("id-ID").format(short.viewCount)}{" "}
                      views
                    </span>
                  </div>
                )}
                <LikeButton
                  contentId={short._id}
                  initialLikes={short.likeCount || 0}
                />
              </div>
            </div>
            <Separator className="my-4" />
          </div>

          <div className="grid grid-cols-12 gap-x-8">
            <article className="col-span-12 lg:col-span-8">
              <PortableText value={short.body} />
              {short.tags && short.tags.length > 0 && (
                <div className="max-w-3xl pt-6">
                  <TagList tags={short.tags} content="short" />
                </div>
              )}
            </article>

            <aside className="hidden lg:block lg:col-span-4">
              <div className="sticky top-64 self-start rounded-lg bg-background border p-4">
                <DesktopTOC />
              </div>
            </aside>

            <div className="flex items-center justify-start col-span-12 mt-10">
              <Link
                href="/shorts"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="relative">
                  <span className="text-sm text-muted-foreground  hover:text-primary transition-colors">
                    Back to shorts
                  </span>
                  <svg
                    className="absolute right-0 z-[-1] -bottom-1 w-[90px] sm:w-[120px] "
                    width="200"
                    height="10"
                    viewBox="0 0 224 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M0.500244 1.63051C8.87551 2.3919 17.451 1.9251 25.8672 1.9251C68.0427 1.9251 110.216 1.63051 152.391 1.63051C171.006 1.63051 189.616 1.33593 208.231 1.33593C212.099 1.33593 215.967 1.36279 219.835 1.33593C220.447 1.33168 222.926 0.77558 223.206 1.33593"
                      stroke="#F5F5F5"
                      strokeWidth="0.5"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </main>
      <MobileTOC />
    </div>
  );
};

export default ShortDetailPage;
