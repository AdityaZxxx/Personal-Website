import { BlurImage } from "@/components/blur-image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Globe, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

interface AuthorProfileProps {
  author: {
    name: string;
    image?: any;
    bio?: any;
    slug?: {
      current: string;
    };
    socialLinks?: {
      twitter?: string;
      github?: string;
      linkedin?: string;
      website?: string;
    };
  };
}

export function AuthorProfile({ author }: AuthorProfileProps) {
  if (!author) return null;

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
          {author.image && (
            <div className="relative h-20 w-20 rounded-full overflow-hidden flex-shrink-0">
              <BlurImage
                image={author.image}
                alt={author.name}
                fill
                className="object-cover"
                sizes="80px"
              />
            </div>
          )}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-bold">{author.name}</h3>
            {author.bio && (
              <div className="mt-2 text-sm text-muted-foreground line-clamp-3">
                {typeof author.bio === "string"
                  ? author.bio
                  : author.bio.map((block: any, i: number) => (
                      <p key={i} className="mt-1">
                        {block.children[0].text}
                      </p>
                    ))}
              </div>
            )}
            <div className="mt-4 flex gap-2 justify-center sm:justify-start">
              {author.socialLinks?.twitter && (
                <Link
                  href={author.socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Twitter className="h-4 w-4" />
                    <span className="sr-only">Twitter</span>
                  </Button>
                </Link>
              )}
              {author.socialLinks?.github && (
                <Link
                  href={author.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Github className="h-4 w-4" />
                    <span className="sr-only">GitHub</span>
                  </Button>
                </Link>
              )}
              {author.socialLinks?.linkedin && (
                <Link
                  href={author.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Linkedin className="h-4 w-4" />
                    <span className="sr-only">LinkedIn</span>
                  </Button>
                </Link>
              )}
              {author.socialLinks?.website && (
                <Link
                  href={author.socialLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Globe className="h-4 w-4" />
                    <span className="sr-only">Website</span>
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
