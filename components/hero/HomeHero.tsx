"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, Variants } from "framer-motion";
import { ArrowDown, Code2, Coffee, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import React from "react";
import {
  RiFacebookFill,
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterXFill,
} from "react-icons/ri";

const socialLinks = [
  {
    icon: <RiInstagramFill />,
    href: "https://instagram.com/adxxya30",
    label: "Instagram",
  },
  {
    icon: <RiFacebookFill />,
    href: "https://facebook.com/adxxya30",
    label: "Facebook",
  },
  {
    icon: <RiTwitterXFill />,
    href: "https://twitter.com/adxxya30",
    label: "Twitter/X",
  },
  {
    icon: <RiLinkedinFill />,
    href: "https://linkedin.com/in/adxxya30",
    label: "LinkedIn",
  },
  {
    icon: <RiGithubFill />,
    href: "https://github.com/AdityaZxxx",
    label: "Github",
  },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.25, ease: "easeOut" },
  },
};

const floatVariants: Variants = {
  animate: {
    y: [0, -12, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

export default function HomeHero() {
  return (
    <motion.section
      className="relative flex min-h-screen w-full items-center justify-center bg-background px-4 py-24 md:px-6 overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {[
        { Icon: Code2, pos: "top-1/4 right-1/4", delay: 0 },
        { Icon: Coffee, pos: "bottom-1/4 left-1/6", delay: 2 },
        { Icon: Sparkles, pos: "top-2/3 right-1/7", delay: 4 },
        { Icon: Zap, pos: "top-1/6 left-1/3", delay: 1 },
      ].map(({ Icon, pos, delay }, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} text-sky-500/30`}
          variants={floatVariants}
          animate="animate"
          transition={{ delay }}
          style={{ willChange: "transform" }}
        >
          <Icon className="size-6 md:size-7" />
        </motion.div>
      ))}

      <motion.div
        className="relative z-20 mx-auto max-w-4xl text-center md:text-start"
        variants={containerVariants}
      >
        <motion.h1
          variants={itemVariants}
          className="font-rethink-sans text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight text-white"
        >
          I&apos;m Aditya Rahmad
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="font-inter mx-auto mt-6 max-w-xl text-base md:text-lg text-muted-foreground"
        >
          A software developer who thinks a lot — about{" "}
          <span className="text-sky-500 font-medium">code</span>,{" "}
          <span className="text-white font-medium">culture</span>, and how
          people connect in this messy digital world.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="my-10 flex flex-row gap-4 justify-center md:justify-start"
        >
          <Link href="#topics-section">
            <Button size="lg" className="w-full sm:w-auto">
              Learn How <ArrowDown className="size-4 ml-2" />
            </Button>
          </Link>
          <Link href="/about">
            <Button
              size="lg"
              variant="outline"
              className="border-white/20 text-white hover:border-white/40 hover:bg-white/5 w-full sm:w-auto"
            >
              More about me
            </Button>
          </Link>
        </motion.div>

        <TooltipProvider>
          <motion.ul
            variants={itemVariants}
            className="flex gap-6 justify-center md:justify-start"
          >
            {socialLinks.map((link) => (
              <li key={link.label}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white"
                      whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
                      whileTap={{ scale: 0.9 }}
                      style={{ willChange: "transform" }}
                    >
                      {React.cloneElement(link.icon, { className: "size-6" })}
                    </motion.a>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{link.label}</p>
                  </TooltipContent>
                </Tooltip>
              </li>
            ))}
          </motion.ul>
        </TooltipProvider>
      </motion.div>
    </motion.section>
  );
}
