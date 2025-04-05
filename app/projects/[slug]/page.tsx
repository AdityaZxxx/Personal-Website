import { ArrowLeft, Calendar, ExternalLink, Github } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { PortableText } from "@/components/portable-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { urlForImage } from "@/lib/sanity/image";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/sanity/queries";
import { formatDate } from "@/lib/utils";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    return {
      title: "Project Not Found | Aditya",
    };
  }

  return {
    title: `${project.title} | Aditya`,
    description: project.excerpt,
    openGraph: project.mainImage
      ? {
          images: [
            urlForImage(project.mainImage)?.width(600).height(340).url() ??
              "/placeholder.svg",
          ],
        }
      : undefined,
  };
}

export async function generateStaticParams() {
  const projects: string[] = await getAllProjectSlugs();

  return projects.map((slug: any) => ({
    slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  function getImageUrl(image: any): string {
    try {
      return (
        urlForImage(image)?.width(600).height(340).url() ?? "/placeholder.svg"
      );
    } catch {
      return "/placeholder.svg";
    }
  }

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
            {project.categories && project.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.categories.map((category: any) => (
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
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              {project.completedAt && (
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={project.completedAt}>
                    {formatDate(project.completedAt)}
                  </time>
                </div>
              )}
            </div>
          </div>

          {project.mainImage && (
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={getImageUrl(project.mainImage)}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {project.technologies &&
              project.technologies.map((tech: any) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
          </div>

          <div className="flex flex-wrap gap-4">
            {project.demoUrl && (
              <Link
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Button>
              </Link>
            )}
            {project.repoUrl && (
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  <Github className="mr-2 h-4 w-4" />
                  Source Code
                </Button>
              </Link>
            )}
          </div>

          <div className="prose prose-gray dark:prose-invert max-w-none">
            <PortableText value={project.description} />
          </div>

          {project.images && project.images.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold">Project Gallery</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {project.images.map((image: any, index: number) => (
                  <div
                    key={index}
                    className="relative aspect-video overflow-hidden rounded-lg"
                  >
                    <Image
                      src={getImageUrl(image)}
                      alt={`${project.title} screenshot ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
