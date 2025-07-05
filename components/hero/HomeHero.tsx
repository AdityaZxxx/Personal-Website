import { ArrowDown } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  RiFacebookFill,
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterXFill,
} from "react-icons/ri";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Spotlight } from "./Spotlight";

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
const HomeHero = ({ socialLinks = defaultSocialLinks }) => {
  return (
    <section className="relative min-h-screen py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background">
      <div>
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="oklch(74.6% 0.16 232.661)"
        />
        <Spotlight
          className="-top-40 left-[-10rem] md:-top-20 md:left-[-20rem]"
          fill="oklch(74.6% 0.16 232.661)"
        />
      </div>
      <div className="mx-auto max-w-5xl px-4 md:px-6 pt-50">
        <h1 className="font-rethink-sans text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary leading-tight mb-4  z-20">
          I&apos;m Aditya
        </h1>
        <p className="font-inter text-sm md:text-base text-muted-foreground max-w-xl mt-3">
          A software developer who thinks a lot — about code, culture, and how
          people connect in this messy digital world.
        </p>
        <div className="flex flex-row my-6 gap-4">
          <Link href="#topics-heading">
            <Button>
              Learn How <ArrowDown className="ml-2" />
            </Button>
          </Link>
          <Link href="/about">
            <Button variant="outline">More about me</Button>
          </Link>
        </div>
        <nav aria-label="Social media links" className="mt-10">
          <ul className="flex flex-row gap-4">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {React.cloneElement(link.icon)}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{link.label}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
};

export default HomeHero;
