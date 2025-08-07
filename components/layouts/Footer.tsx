import Link from "next/link";
import React, { Suspense } from "react";
import {
  RiFacebookFill,
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterXFill,
} from "react-icons/ri";
import Newsletter from "../forms/NewsletterForm";
import NowPlaying from "../spotify/NowPlaying";
import { Separator } from "../ui/separator";

interface FooterProps {
  logo?: {
    url: string;
    title: string;
    image: string;
  };
  sections?: Array<{
    title: string;
    links: Array<{ name: string; href: string; isExternal?: boolean }>;
  }>;
  description?: string;
  socialLinks?: Array<{
    icon: React.ReactElement;
    href: string;
    label: string;
  }>;
  copyright?: string;
}

const defaultSections = [
  {
    title: "General",
    links: [
      { name: "Home", href: "/" },
      { name: "Blog", href: "/blog" },
      { name: "Projects", href: "/projects" },
      { name: "About", href: "/about" },
      { name: "Shorts", href: "/shorts" },
    ],
  },
  {
    title: "The Website",
    links: [
      { name: "Contact", href: "/contact" },
      { name: "Archi", href: "/archi" },
      { name: "Gallery", href: "/gallery" },
      { name: "Bucket List", href: "/bucket" },
      { name: "Uses", href: "/uses" },
      { name: "Statistics", href: "/statistics" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Help", href: "#" },
      { name: "Sales", href: "#" },
      { name: "Advertise", href: "#" },
      { name: "Privacy", href: "#" },
    ],
  },
];

const defaultSocialLinks = [
  {
    icon: <RiInstagramFill className="size-5" />,
    href: "https://instagram.com/adxxya30",
    label: "Instagram",
  },
  {
    icon: <RiFacebookFill className="size-5" />,
    href: "https://facebook.com/adxxya30",
    label: "Facebook",
  },
  {
    icon: <RiTwitterXFill className="size-5" />,
    href: "https://twitter.com/adxxya30",
    label: "Twitter/X",
  },
  {
    icon: <RiLinkedinFill className="size-5" />,
    href: "https://linkedin.com/in/adxxya30",
    label: "LinkedIn",
  },
  {
    icon: <RiGithubFill className="size-5" />,
    href: "https://github.com/AdityaZxxx",
    label: "Github",
  },
];

export const Footer = ({
  logo = { url: "/", title: "Aditya Rahmad", image: "/logo.avif" },
  sections = defaultSections,
  description = "Just want to share. But if it helps you, that’s cool too.",
  socialLinks = defaultSocialLinks,
  copyright = "Aditya Rahmad. All rights reserved.",
}: FooterProps) => {
  return (
    <footer className="bg-background text-foreground">
      <Separator className="w-full bg-border" />

      <div className="container mx-auto max-w-5xl px-4 md:px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-16">
          <div className="flex flex-col items-start text-left">
            <Link href={logo.url}>
              <h2 className="text-xl font-semibold text-primary">
                {logo.title}
              </h2>
            </Link>
            <p className="mt-3 text-sm max-w-sm text-muted-foreground">
              {description}
            </p>
            <div className="flex gap-3 mt-6">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {React.cloneElement(link.icon)}
                </a>
              ))}
            </div>
            <div className="mt-6 h-16 w-full sm:max-w-md rounded-md">
              <Suspense fallback={<div className="h-16 w-full rounded-md" />}>
                <NowPlaying />
              </Suspense>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-left">
            {sections.map((section) => (
              <div key={section.title}>
                <p className="text-sm font-medium text-muted-foreground mb-4">
                  {section.title}
                </p>
                <ul className="space-y-3 text-sm">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        target={link.isExternal ? "_blank" : undefined}
                        rel={
                          link.isExternal ? "noopener noreferrer" : undefined
                        }
                        className="text-primary/80 hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-left">
            <h3 className="font-semibold text-primary">
              Subscribe to my blog newsletter
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">
              No spam. Just raw thoughts, sometimes weird, often useful 😉
            </p>
            <Newsletter />
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto max-w-7xl px-4 md:px-6 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            {`Copyright © ${new Date().getFullYear()} ${copyright}`}
          </p>
        </div>
      </div>
    </footer>
  );
};
