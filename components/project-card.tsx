import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { urlForImage } from "@/lib/sanity/image";
import Link from "next/link";
import { BlurImage } from "./blur-image";

interface ProjectCardProps {
  project: {
    _id: string;
    title: string;
    slug: {
      _type: string;
      current: string;
    };
    excerpt?: string;
    mainImage?: any;
    categories?: Array<{
      _id: string;
      title: string;
      slug: string;
    }>;
    technologies?: string[];
  };
}

export function ProjectCard({ project }: ProjectCardProps) {
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
    <Link href={`/projects/${project.slug.current}`}>
      <Card className="overflow-hidden transition-all hover:shadow-md h-full flex flex-col">
        <div className="relative aspect-video overflow-hidden">
          {project.mainImage ? (
            <BlurImage
              image={project.mainImage}
              alt={project.title}
              fill
              className="transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </div>
        <CardContent className="p-4 flex-grow">
          <h3 className="font-bold line-clamp-1">{project.title}</h3>
          {project.excerpt && (
            <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
              {project.excerpt}
            </p>
          )}
        </CardContent>
        <CardFooter className="flex flex-wrap gap-2 p-4 pt-0">
          {project.technologies?.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.technologies && project.technologies.length > 3 && (
            <Badge variant="outline" className="text-xs">
              +{project.technologies.length - 3} more
            </Badge>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
}
