import { Calendar, ExternalLink, Github } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TagList } from "@/components/common/TagList";
import { PortableText } from "@/components/sanity/PortableText";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { urlFor } from "@/lib/sanity/image";
import { getProjectBySlug } from "@/lib/sanity/queries";
import { cn, formatDate } from "@/lib/utils";

import { Category, SanityImage, Technology } from "@/types";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The project you are looking for does not exist.",
    };
  }

  const mainImageUrl = project.mainImage?.asset
    ? urlFor(project.mainImage).url()
    : null;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const canonicalUrl = `${siteUrl}/projects/${project.slug}`;

  const keywords = [
    ...(project.technologies?.map((tech: Technology) => tech.title) || []),
    ...(project.categories?.map((cat: Category) => cat.title) || []),
    project.title,
    "Aditya Rahmad",
    "Project",
    "Portfolio",
  ];

  return {
    title: project.title,
    description:
      project.excerpt || project.description?.[0]?.children?.[0]?.text || "",
    keywords: keywords,
    authors: [{ name: "Aditya Rahmad", url: siteUrl }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: project.title,
      description:
        project.excerpt || project.description?.[0]?.children?.[0]?.text || "",
      url: canonicalUrl,
      siteName: "Aditya Rahmad - Projects",
      images: mainImageUrl
        ? [
            {
              url: mainImageUrl,
              width: project.mainImage.asset.width,
              height: project.mainImage.asset.height,
              alt: project.mainImage.alt || project.title,
            },
          ]
        : [],
      locale: "en_US",
      type: "article",
      publishedTime: project.completedAt,
      modifiedTime: project._updatedAt,
      section: project.categories?.[0]?.title,
      tags: project.technologies?.map((tech: Technology) => tech.title) || [],
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description:
        project.excerpt || project.description?.[0]?.children?.[0]?.text || "",
      site: "@adxxya30",
      creator: "@adxxya30",
      images: mainImageUrl ? [mainImageUrl] : [],
    },
  };
}

const ProjectLinkButton = ({
  href,
  icon: Icon,
  children,
  variant = "default",
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}) => (
  <Link href={href} target="_blank" rel="noopener noreferrer" passHref>
    <Button variant={variant} asChild={false}>
      <Icon className="mr-2 h-4 w-4" />
      {children}
    </Button>
  </Link>
);

const ProjectGallery = ({
  images,
  projectTitle,
}: {
  images: SanityImage[];
  projectTitle: string;
}) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6 pt-6">
      <h2 className="text-2xl font-semibold tracking-tight text-primary">
        Project Gallery
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => {
          const imageUrl = image.asset
            ? urlFor(image.asset).width(1080).url()
            : typeof image === "string"
              ? image
              : "/images/default-placeholder.png";

          return (
            <div
              key={index}
              className="relative aspect-video overflow-hidden rounded-lg"
            >
              {imageUrl && imageUrl !== "/images/default-placeholder.png" ? (
                <Image
                  src={imageUrl}
                  alt={`${projectTitle} - Gallery Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
              ) : (
                <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                  <span className="text-slate-500 text-sm">
                    Image not available
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const {
    title = "Untitled Project",
    categories,
    completedAt,
    mainImage,
    technologies = [],
    demoUrl,
    repoUrl,
    description,
    images,
  } = project;

  const mainImageUrl = mainImage ? urlFor(mainImage).width(1200).url() : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    applicationCategory: categories?.[0]?.title,
    operatingSystem: "Cross-platform",
    description: project.excerpt || "No description available.",
    ...(mainImageUrl && { image: mainImageUrl }),
    ...(demoUrl && { url: demoUrl }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main
        className={cn(
          "container bg-background  px-4 py-12 md:px-6 md:py-16 lg:py-24"
        )}
      >
        <div className="mx-auto max-w-5xl">
          <div className="space-y-8">
            <header className="space-y-3 mt-8 md:mt-5">
              {categories && categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {categories.map((category: Category, index: number) => {
                    const categorySlug = category.slug;
                    return (
                      <Link
                        key={index}
                        href={`/projects?category=${categorySlug}`}
                        passHref
                      >
                        <Badge
                          className="text-xs text-muted-foreground"
                          key={category._id}
                          variant="secondary"
                        >
                          {category.title}
                        </Badge>
                      </Link>
                    );
                  })}
                </div>
              )}
              <h1 className="text-3xl font-rethink-sans font-semibold  tracking-tight text-primary sm:text-4xl md:text-5xl !leading-tight">
                {title}
              </h1>
              {completedAt && (
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={completedAt}>{formatDate(completedAt)}</time>
                </div>
              )}
            </header>

            {mainImageUrl && (
              <figure className="relative aspect-video overflow-hidden rounded-xl border border-slate-700 shadow-lg">
                <Image
                  src={mainImageUrl}
                  alt={project.alt || `Cover image for ${title}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
                />
              </figure>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {demoUrl && (
                <ProjectLinkButton
                  href={demoUrl}
                  icon={ExternalLink}
                  variant="default"
                >
                  Live Demo
                </ProjectLinkButton>
              )}
              {repoUrl && (
                <ProjectLinkButton
                  href={repoUrl}
                  icon={Github}
                  variant="outline"
                >
                  Source Code
                </ProjectLinkButton>
              )}
            </div>

            {description && description.length > 0 && (
              <article className="">
                <PortableText value={description} />
              </article>
            )}

            {images && images.length > 0 && (
              <ProjectGallery images={images} projectTitle={title} />
            )}
          </div>
          <Separator className="my-8" />
          {technologies && technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {technologies.tags && technologies.tags.length > 0 && (
                <div className="max-w-3xl pt-6">
                  <TagList tags={technologies.tags} content="project" />
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
