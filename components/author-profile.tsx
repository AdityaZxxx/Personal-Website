"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Globe, Mail } from "lucide-react";
import Link from "next/link";
import { FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { BlurImage } from "./blur-image";
import { CustomLogo } from "./custom-logo";

interface AuthorProfileProps {
  author?: {
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
      email?: string;
      youtube?: string;
    };
  };
  className?: string;
}

const socialIcons = [
  { key: "x", icon: <CustomLogo className="h-4 w-4" />, label: "X" },
  { key: "github", icon: <FaGithub className="h-4 w-4" />, label: "GitHub" },
  {
    key: "instagram",
    icon: <FaInstagram className="h-4 w-4" />,
    label: "Instagram",
  },
  { key: "website", icon: <Globe className="h-4 w-4" />, label: "Website" },
  { key: "youtube", icon: <FaYoutube className="h-4 w-4" />, label: "YouTube" },
  { key: "email", icon: <Mail className="h-4 w-4" />, label: "Email" },
];

export function AuthorProfile({ author, className }: AuthorProfileProps) {
  if (!author) return null;

  return (
    <Card
      className={cn(
        "overflow-hidden hover:shadow-md transition-shadow",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Author Image */}
          {author.image && (
            <div className="relative w-24 h-24 rounded-full border-4 border-primary/20 dark:border-primary/30 group">
              <BlurImage
                image={author.image}
                alt={author.name}
                width={96}
                height={96}
                className="object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                sizes="96px"
                priority
              />
              <div className="absolute inset-0 rounded-full shadow-inner" />
            </div>
          )}

          {/* Author Info */}
          <div className="space-y-3 w-full">
            <h4 className="text-xl font-bold tracking-tight  bg-clip-text ">
              {author.name}
            </h4>

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

            {/* Social Links */}
            {author.socialLinks && (
              <div className="flex flex-wrap justify-center gap-1 pt-2">
                {socialIcons.map(({ key, icon, label }) => {
                  const socialLink =
                    author.socialLinks?.[
                      key as keyof typeof author.socialLinks
                    ];
                  if (!socialLink) return null;

                  const href =
                    key === "email" ? `mailto:${socialLink}` : socialLink;

                  return (
                    <Link
                      key={key}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${author.name}'s ${label}`}
                    >
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-9 w-9 rounded-full hover:bg-primary/10 hover:text-primary transition-colors"
                      >
                        {icon}
                        <span className="sr-only">{label}</span>
                      </Button>
                    </Link>
                  );
                })}
              </div>
            )}

            {/* View Posts Link */}
            {author.slug?.current && (
              <Link
                href={`/authors/${author.slug.current}`}
                className="inline-block mt-4 text-sm font-medium text-primary hover:underline"
                prefetch={false}
              >
                View all posts →
              </Link>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
