"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

const FlexboxPattern = () => (
  <div className="absolute inset-0 flex h-full w-full items-center justify-center opacity-90 [mask-image:linear-gradient(to_bottom,transparent,black,transparent)]">
    <div className="flex h-3/4 w-3/4 items-end justify-center gap-3 transition-transform duration-500 ease-in-out group-hover:scale-y-[-1]">
      {[
        { height: "55%" },
        { height: "85%" },
        { height: "70%" },
        { height: "95%" },
      ].map((bar, i) => (
        <motion.div
          key={i}
          initial={{ height: bar.height }}
          whileHover={{
            height: `${Math.min(parseInt(bar.height) + 15)}%`,
            transition: { duration: 0.3, delay: i * 0.05 },
          }}
          className="w-10 rounded-t-full bg-gradient-to-b from-neutral-400 to-neutral-600 dark:from-neutral-700 dark:to-neutral-900"
        />
      ))}
    </div>
  </div>
);

const FetchingPattern = () => {
  return (
    <div className="absolute inset-0 h-full w-full">
      <motion.div
        className="absolute -top-1/4 left-1/2 h-[300px] w-[300px] -translate-x-1/4 -translate-y-1/2"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0"
            style={{
              scale: 1 - i * 0.2,
              opacity: 1 - i * 0.4,
            }}
          >
            {[...Array(9)].map((_, j) => (
              <div
                key={j}
                className="absolute h-[50px] w-[50px] rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 opacity-50 dark:opacity-90"
                style={{
                  top: "50%",
                  left: "50%",
                  margin: "-25px",
                  transform: `rotate(${j * 40}deg) translate(150px) rotate(-${j * 40}deg)`,
                }}
              />
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

const AndMorePattern = () => (
  <div className="relative h-[7.5rem] grid grid-cols-2 gap-3 mb-auto w-1/2 mx-auto">
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className="w-full h-full rounded-xl bg-neutral-300 dark:bg-neutral-700"
        initial={{ opacity: 0.6, scale: 0.9 }}
        whileHover={{
          opacity: 1,
          scale: 1,
          backgroundColor: "rgb(163 163 163)",
          transition: { duration: 0.2, delay: i * 0.05 },
        }}
      />
    ))}
  </div>
);

const topicsData = [
  {
    title: "Build",
    subtitle:
      "From ideas to actual products — I build tools that help me learn and (hopefully) help others too.",
    href: "#",
    pattern: FlexboxPattern,
    rotation: "lg:rotate-[5deg]",
    zIndex: "z-30",
    translateY: "lg:translate-y-0",
  },
  {
    title: "Reflect",
    subtitle:
      "Writing helps me slow down and process what I’m learning, both in tech and life.",
    href: "#",
    pattern: FetchingPattern,
    rotation: "lg:rotate-[-3deg]",
    zIndex: "z-20",
    translateY: "lg:translate-y-12",
  },
  {
    title: "Explore",
    subtitle:
      "I’m curious about how technology intersects with culture, society, and power — and I’m learning as I go.",
    href: "/blog",
    pattern: AndMorePattern,
    rotation: "lg:rotate-[4deg]",
    zIndex: "z-10",
    translateY: "lg:translate-y-0",
  },
];

const InteractiveCard = ({
  title,
  subtitle,
  href,
  pattern: Pattern,
  rotation,
  zIndex,
  translateY,
}: (typeof topicsData)[0]) => {
  return (
    <Link
      href={href}
      className={cn(
        "group aspect-square py-10 px-8 rounded-xl",
        "bg-neutral-100 border border-neutral-200",
        "dark:bg-neutral-950 dark:border-neutral-900",
        "text-left flex flex-col justify-end overflow-hidden",
        "transition-all duration-500 hover:brightness-[95%]",
        "dark:hover:brightness-[150%] w-80",
        rotation,
        zIndex,
        translateY
      )}
      style={{
        boxShadow: "0 0 60px 10px rgba(0, 0, 0, 0.1) inset",
      }}
    >
      <div className="relative h-[7.5rem] mb-auto">
        <Pattern />
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-slate-50 underline decoration-transparent group-hover:decoration-current transition-colors duration-200">
        {title}
      </h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400 mt-2">
        {subtitle}
      </p>
    </Link>
  );
};

export function TopicsSection() {
  return (
    <section className="bg-neutral-50 dark:bg-neutral-950 py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative mx-auto mb-12 max-w-2xl text-center">
          <h2
            id="topics-heading"
            className="font-handwriting text-2xl font-bold text-primary md:text-5xl"
          >
            Things I Do
          </h2>
          <div className="relative mt-1 inline-block">
            <h3 className="text-5xl font-extrabold tracking-tight text-primary md:text-6xl">
              One Thought at a Time
            </h3>
          </div>
          <p className="mx-auto mt-8 max-w-lg text-base text-neutral-600 dark:text-neutral-400">
            Coding, writing, and wandering through ideas — this is how I make
            sense of the digital world.
          </p>
        </div>

        <div className="mt-10 mb-12 flex flex-col items-center gap-6 lg:flex-row lg:justify-center lg:gap-0 lg:space-x-[-1rem]">
          {topicsData.map((topic) => (
            <InteractiveCard key={topic.title} {...topic} />
          ))}
        </div>
      </div>
    </section>
  );
}
