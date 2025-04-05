import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import Link from "next/link";

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
      <Card className="overflow-hidden transition-all hover:shadow-md">
        <div className="relative aspect-video overflow-hidden">
          {project.mainImage ? (
            <Image
              src={getImageUrl(project.mainImage)}
              alt={project.title}
              fill
              className="object-cover transition-transform hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-muted-foreground">No image</span>
            </div>
          )}
        </div>
        <CardContent className="p-4">
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
