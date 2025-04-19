import { BlurImage } from "@/components/blur-image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Globe, Mail } from "lucide-react";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { CustomLogo } from "./custom-logo";

interface AuthorProfileProps {
  author: {
    name: string;
    image?: any;
    bio?: any;
    slug?: {
      current: string;
    };
    socialLinks?: {
      x?: string;
      github?: string;
      instagram?: string;
      website?: string;
      linkedin?: string;
      youtube?: string;
      email?: string;
    };
  };
  className?: string;
}

export function AuthorProfile({ author, className }: AuthorProfileProps) {
  if (!author) return null;

  const socialIcons = [
    { key: "x", icon: <CustomLogo className="h-4 w-4" />, label: "X" },
    { key: "github", icon: <Github className="h-4 w-4" />, label: "GitHub" },
    {
      key: "instagram",
      icon: <FaInstagram className="h-4 w-4" />,
      label: "Instagram",
    },
    { key: "website", icon: <Globe className="h-4 w-4" />, label: "Website" },
    {
      key: "linkedin",
      icon: <FaLinkedin className="h-4 w-4" />,
      label: "LinkedIn",
    },
    {
      key: "youtube",
      icon: <FaYoutube className="h-4 w-4" />,
      label: "YouTube",
    },
    { key: "email", icon: <Mail className="h-4 w-4" />, label: "Email" },
  ];

  return (
    <Card
      className={`overflow-hidden hover:shadow-md transition-shadow ${className}`}
    >
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 items-center ">
          {author.image && (
            <div className="flex h-24 w-24  rounded-full overflow-hidden flex-shrink-0 border-4 border-primary/20 dark:border-primary/30 group">
              <BlurImage
                image={author.image}
                alt={author.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="96px"
              />
            </div>
          )}

          <div className="flex-1 text-center sm:text-left space-y-3">
            <div>
              <h3 className="text-xl font-bold tracking-tight">
                {author.name}
              </h3>
              {/* {author.slug?.current && (
                <Link
                  href={`/authors/${author.slug.current}`}
                  className="text-sm text-primary hover:underline"
                >
                  View all posts
                </Link>
              )} */}
            </div>

            {author.bio && (
              <div className="text-sm text-muted-foreground">
                {typeof author.bio === "string" ? (
                  <p className="line-clamp-3">{author.bio}</p>
                ) : (
                  author.bio.map((block: any, i: number) => (
                    <p key={i} className="mt-1">
                      {block.children[0].text}
                    </p>
                  ))
                )}
              </div>
            )}

            {author.socialLinks && (
              <div className="flex flex-wrap gap-1 justify-center sm:justify-start">
                {socialIcons.map(
                  ({ key, icon, label }) =>
                    author.socialLinks?.[
                      key as keyof typeof author.socialLinks
                    ] && (
                      <Link
                        key={key}
                        href={
                          key === "email"
                            ? `mailto:${author.socialLinks.email}`
                            : (author.socialLinks[
                                key as keyof typeof author.socialLinks
                              ] as string)
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                          aria-label={label}
                        >
                          {icon}
                        </Button>
                      </Link>
                    )
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
