"use client";

import { motion, Variants } from "framer-motion";
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

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const HomeHero = ({ socialLinks = defaultSocialLinks }) => {
  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.href;
    const targetId = href.replace(/.*#/, "");
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const elementHeight = targetElement.offsetHeight;
      const viewportHeight = window.innerHeight;

      const offsetPosition =
        elementPosition - viewportHeight / 7 + elementHeight / 3;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background px-4 py-24 md:px-6">
      <div className="absolute inset-0 ">
        <Spotlight
          className="-top-40 left-0 md:-top-20 md:left-60"
          fill="oklch(74.6% 0.16 232.661)"
        />
        <Spotlight
          className="-top-40 left-[-10rem] md:-top-20 md:left-[-20rem]"
          fill="oklch(74.6% 0.16 232.661)"
        />
      </div>

      <motion.div
        className="relative z-20 mx-auto max-w-4xl text-center md:text-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="font-rethink-sans text-4xl font-extrabold leading-tight text-primary sm:text-5xl md:text-6xl lg:text-7xl"
        >
          I&apos;m Aditya Rahmad
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-inter mx-auto md:mx-0 mt-4 max-w-xl text-base text-muted-foreground md:text-lg"
        >
          A software developer who thinks a lot — about code, culture, and how
          people connect in this messy digital world.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="my-8 flex flex-col items-center justify-center gap-4 sm:flex-row md:justify-start"
        >
          <Link href="#topics-heading" onClick={handleSmoothScroll}>
            <Button size="lg" className="w-full sm:w-auto">
              Learn How <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              More about me
            </Button>
          </Link>
        </motion.div>

        <motion.nav variants={itemVariants} aria-label="Social media links">
          <ul className="flex items-center justify-center gap-5 md:justify-start">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={link.label}
                      className="text-muted-foreground transition-colors hover:text-primary"
                    >
                      {React.cloneElement(link.icon, { className: "size-6" })}
                    </a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{link.label}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </ul>
        </motion.nav>
      </motion.div>
    </section>
  );
};

export default HomeHero;
