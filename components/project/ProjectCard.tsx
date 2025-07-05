import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { urlFor } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProjectType } from "../../types/ProjectType";

export function ProjectCard({
  project,
  index,
}: {
  project: ProjectType;
  index: number;
}) {
  const isReversed = index % 2 !== 0;

  return (
    <Card className="bg-transparent border-x-0 border-t-0 border-b-2 rounded-b-none shadow-none">
      <CardContent className="grid md:grid-cols-2 gap-x-8 lg:gap-x-12 items-center p-0">
        {/* Image - First in DOM for mobile */}
        <Link
          href={`/projects/${project.slug}`}
          className={cn(
            "group block relative aspect-video rounded-lg overflow-hidden shadow-lg w-full",
            isReversed ? "md:col-start-2" : "md:col-start-1"
          )}
          aria-label={`View project: ${project.title}`}
        >
          {project.mainImage?.asset?.url ? (
            <Image
              src={urlFor(project.mainImage.asset.url).width(1080).url()}
              alt={project.mainImage.alt || `Screenshot of ${project.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              placeholder={project.mainImage.lqip ? "blur" : "empty"}
              blurDataURL={project.mainImage.lqip}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-800">
              <span className="text-slate-500">No Image</span>
            </div>
          )}
        </Link>

        {/* Text Content - Second in DOM for mobile */}
        <div
          className={cn(
            "flex flex-col mt-6 md:mt-0",
            isReversed ? "md:col-start-1" : "md:col-start-2",
            "md:row-start-1" // Ensure it stays on the same row on desktop
          )}
        >
          <h3 className="font-bold font-rethink-sans text-base md:text-4xl line-clamp-2 text-primary hyphens-auto tracking-tight">
            {project.title}
          </h3>

          {project.excerpt && (
            <p className="mt-3 text-base text-muted-foreground">
              {project.excerpt}
            </p>
          )}

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-4">
            {project.technologies?.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs text-muted-foreground"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-6">
            <Link href={`/projects/${project.slug}`}>
              <Button variant="outline" className="rounded-full">
                View Project
              </Button>
            </Link>
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-muted-foreground hover:text-sky-400 transition-colors"
              >
                Open Live Site <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
