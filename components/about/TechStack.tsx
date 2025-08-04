"use client";

import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";
import {
  SiBun,
  SiDocker,
  SiDrizzle,
  SiFramer,
  SiGit,
  SiGithub,
  SiLinux,
  SiNextdotjs,
  SiNodedotjs,
  SiNpm,
  SiPnpm,
  SiPostgresql,
  SiPrisma,
  SiReact,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTrpc,
  SiTypescript,
  SiVercel,
  SiZod,
} from "react-icons/si";

interface TechItem {
  name: string;
  icon: React.ElementType;
  color: string;
}

const techStack: TechItem[] = [
  { name: "React", icon: SiReact, color: "text-sky-500" },
  { name: "Next.js", icon: SiNextdotjs, color: "text-neutral-300" },
  { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-400" },
  { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
  { name: "Vercel", icon: SiVercel, color: "text-neutral-200" },
  { name: "PostgreSQL", icon: SiPostgresql, color: "text-blue-400" },
  { name: "Prisma", icon: SiPrisma, color: "text-teal-500" },
  { name: "Framer Motion", icon: SiFramer, color: "text-purple-500" },
  { name: "Drizzle ORM", icon: SiDrizzle, color: "text-lime-400" },
  { name: "tRPC", icon: SiTrpc, color: "text-sky-600" },
  { name: "Supabase", icon: SiSupabase, color: "text-emerald-500" },
  { name: "Zod", icon: SiZod, color: "text-blue-400" },
  { name: "Linux", icon: SiLinux, color: "text-yellow-400" },
  { name: "Pnpm", icon: SiPnpm, color: "text-yellow-500" },
  { name: "Bun", icon: SiBun, color: "text-yellow-300" },
  { name: "Npm", icon: SiNpm, color: "text-red-500" },
  { name: "Git", icon: SiGit, color: "text-orange-600" },
  { name: "Github", icon: SiGithub, color: "text-neutral-300" },
  { name: "Docker", icon: SiDocker, color: "text-blue-600" },
  { name: "ShadCn UI", icon: SiShadcnui, color: "text-neutral-300" },
];

export const TechStackMarquee = ({
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
  className,
}: {
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scrollerRef = React.useRef<HTMLUListElement>(null);

  useEffect(() => {
    addAnimation();
  }, []);

  const [start, setStart] = useState(false);
  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        if (scrollerRef.current) {
          scrollerRef.current.appendChild(duplicatedItem);
        }
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "forwards"
        );
      } else {
        containerRef.current.style.setProperty(
          "--animation-direction",
          "reverse"
        );
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative z-20 w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex w-max min-w-full shrink-0 flex-nowrap gap-x-12 md:gap-x-16 py-4",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {techStack.map((tech) => {
          const Icon = tech.icon;
          return (
            <li className="w-[100px] max-w-full shrink-0" key={tech.name}>
              <div className="flex flex-col items-center gap-2 text-neutral-500 transition-colors duration-300 ease-in-out hover:text-neutral-200 dark:text-neutral-400 dark:hover:text-neutral-50">
                <Icon className={cn("h-8 w-8 md:h-10 md:w-10", tech.color)} />
                <span className="text-xs font-medium">{tech.name}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export function TechStackSection() {
  return (
    <section className="md:py-6 bg-neutral-100 dark:bg-neutral-950">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-2xl md:text-3xl font-semibold text-neutral-800 dark:text-neutral-200 mb-12">
          Technologies I Work With
        </h2>
        <TechStackMarquee speed="normal" direction="left" />
      </div>
    </section>
  );
}
