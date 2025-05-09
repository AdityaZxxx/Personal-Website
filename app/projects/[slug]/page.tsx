import { ArrowLeft, Calendar, ExternalLink, Github } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { BlurImage } from "@/components/blur-image";
import { PortableText } from "@/components/portable-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/lib/sanity/image";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/sanity/queries";
import { formatDate } from "@/lib/utils";

// Constants for reusable strings
const APP_NAME = "Aditya";
const NOT_FOUND_TITLE = "Project Not Found";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!slug) {
    return {
      title: `${NOT_FOUND_TITLE} | ${APP_NAME}`,
    };
  }

  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: `${NOT_FOUND_TITLE} | ${APP_NAME}`,
    };
  }

  const metadata: Metadata = {
    title: `${project.title} | ${APP_NAME}`,
    description: project.excerpt,
  };

  if (project?.mainImage) {
    metadata.openGraph = {
      images: [
        urlForImage(project.mainImage)?.width(1200)?.height(630)?.url() ?? "",
      ],
    };
  }

  return metadata;
}

export async function generateStaticParams() {
  const projects = await getAllProjectSlugs();
  return projects.map((project: any) => ({
    slug: typeof project === "string" ? project : project.slug.current,
  }));
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
  variant?: "default" | "outline";
}) => (
  <Link href={href} target="_blank" rel="noopener noreferrer">
    <Button variant={variant}>
      <Icon className="mr-2 h-4 w-4" />
      {children}
    </Button>
  </Link>
);

const ProjectGallery = ({
  images,
  title,
}: {
  images: any[];
  title: string;
}) => (
  <div className="space-y-4">
    <h2 className="text-2xl font-bold">Project Gallery</h2>
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {images.map((image, index) => (
        <div
          key={`${image._key || index}`}
          className="relative aspect-video overflow-hidden rounded-lg"
        >
          <BlurImage
            image={urlForImage(image)?.url() || "/placeholder.svg"}
            alt={`${title} screenshot ${index + 1}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  </div>
);

export default async function PostPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const {
    title,
    categories,
    completedAt,
    mainImage,
    technologies,
    demoUrl,
    repoUrl,
    description,
    images,
  } = project;

  return (
    <main className="container px-4 py-12 md:px-6 md:py-24">
      <div className="mx-auto max-w-3xl">
        <Link href="/projects">
          <Button variant="ghost" className="mb-8 pl-0">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>

        <div className="space-y-6">
          <div className="space-y-2">
            {categories?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {categories.map((category: any) => (
                  <Link
                    key={category._id}
                    href={`/projects?category=${category.slug}`}
                  >
                    <Badge variant="secondary">{category.title}</Badge>
                  </Link>
                ))}
              </div>
            )}
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              {title}
            </h1>
            {completedAt && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <time dateTime={completedAt}>{formatDate(completedAt)}</time>
              </div>
            )}
          </div>

          {mainImage && (
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <BlurImage
                image={urlForImage(mainImage)?.url() || "/placeholder.svg"}
                alt={title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {technologies?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech: any) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-4">
            {demoUrl && (
              <ProjectLinkButton href={demoUrl} icon={ExternalLink}>
                Live Demo
              </ProjectLinkButton>
            )}
            {repoUrl && (
              <ProjectLinkButton href={repoUrl} icon={Github} variant="outline">
                Source Code
              </ProjectLinkButton>
            )}
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <PortableText value={description} />
          </div>

          {images?.length > 0 && (
            <ProjectGallery images={images} title={title} />
          )}
        </div>
      </div>
    </main>
  );
}
