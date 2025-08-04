"use client";

import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

const FlexboxPattern = () => {
  const bars = [
    { height: "50%", initialY: 0 },
    { height: "80%", initialY: 20 },
    { height: "60%", initialY: -10 },
    { height: "90%", initialY: 10 },
  ];

  return (
    <div className="absolute inset-0 flex h-full w-full items-center justify-center opacity-15 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]">
      <motion.div
        className="flex h-full w-3/4 items-center justify-center gap-3"
        initial="initial"
        whileHover="hover"
      >
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className="w-8 relative bg-neutral-700"
            style={{
              height: bar.height,
              borderRadius: `${Math.random() * 20 + 10}px ${Math.random() * 20 + 10}px ${Math.random() * 20 + 10}px ${Math.random() * 20 + 10}px / ${Math.random() * 20 + 10}px ${Math.random() * 20 + 10}px ${Math.random() * 20 + 10}px ${Math.random() * 20 + 10}px`,
            }}
            variants={{
              initial: {
                scaleY: 1,
                y: bar.initialY,
              },
              hover: {
                scaleY: 1.15,
                y: 0,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 15,
                  delay: i * 0.05,
                },
              },
            }}
            transition={{
              duration: 2 + i * 0.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-neutral-600 via-neutral-800 to-neutral-900" />
            <div className="absolute top-0 left-0 h-1/3 w-full rounded-t-full bg-white/5" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

const FetchingPattern = () => {
  return (
    <div className="absolute inset-0 h-full w-full">
      <div className="absolute -top-1/4 left-1/2 h-[300px] w-[300px] -translate-x-1/4 -translate-y-1/2 transition-transform duration-700 ease-in-out group-hover:rotate-[-100deg] rotate-[50deg]">
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
                className="absolute h-[50px] w-[50px] rounded-full bg-gradient-to-br from-neutral-800 to-neutral-900 opacity-90"
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
      </div>
    </div>
  );
};

const ExplorePattern = () => (
  <motion.div
    className="relative h-[7.5rem] grid grid-cols-2 gap-3 mb-auto w-1/2 mx-auto"
    initial="hidden"
    whileHover="visible"
    transition={{ staggerChildren: 0.08 }}
  >
    {[...Array(4)].map((_, i) => (
      <motion.div
        key={i}
        className="w-full h-full rounded-xl bg-neutral-700"
        variants={{
          hidden: { opacity: 0.6, scale: 0.9 },
          visible: { opacity: 1, scale: 1 },
        }}
        transition={{ duration: 0.2 }}
      />
    ))}
  </motion.div>
);

const topicsData = [
  {
    title: "Build",
    subtitle:
      "From ideas to actual products — I build tools that help me learn and (hopefully) help others too.",
    href: "/projects",
    pattern: FlexboxPattern,
    rotation: "lg:rotate-[5deg]",
    zIndex: "z-30",
    translateY: "lg:translate-y-0",
  },
  {
    title: "Reflect",
    subtitle:
      "Writing helps me slow down and process what I'm learning, both in tech and life.",
    href: "/blog",
    pattern: FetchingPattern,
    rotation: "lg:rotate-[-3deg]",
    zIndex: "z-20",
    translateY: "lg:translate-y-12",
  },
  {
    title: "Explore",
    subtitle:
      "I’m curious about how technology intersects with culture, society, and power — and I'm learning as I go.",
    href: "/blog",
    pattern: ExplorePattern,
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
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(" sm:w-80 w-100", rotation, zIndex, translateY)}
    >
      <Link
        href={href}
        className={cn(
          "group aspect-square py-10 px-8 rounded-xl",
          "bg-neutral-950 border border-neutral-900",
          "text-left flex flex-col justify-end overflow-hidden",
          "transition-all duration-300 hover:!border-zinc-700 hover:shadow-2xl hover:-translate-y-2"
        )}
        style={{
          boxShadow: "0 0 60px 10px rgba(0, 0, 0, 0.1) inset",
        }}
      >
        <div className="relative sm:h-[7.5rem] h-[10rem] mb-auto">
          <Pattern />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-50 underline decoration-transparent group-hover:decoration-current transition-colors duration-200">
          {title}
        </h2>
        <p className="text-sm text-neutral-400 mt-2">{subtitle}</p>
      </Link>
    </motion.div>
  );
};

export function TopicsSection() {
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

  return (
    <section className="bg-neutral-950 py-20 md:py-28">
      <motion.div
        className="container mx-auto px-4 md:px-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="relative mx-auto mb-12 max-w-2xl text-center">
          <motion.h2
            variants={itemVariants}
            id="topics-heading"
            className="font-handwriting text-2xl font-bold text-primary md:text-5xl"
          >
            Things I Do
          </motion.h2>
          <div className="relative mt-1 inline-block">
            <motion.h3
              variants={itemVariants}
              className="text-5xl font-extrabold tracking-tight text-primary md:text-6xl"
            >
              One Thought at a Time
            </motion.h3>
          </div>
          <motion.p
            variants={itemVariants}
            className="mx-auto mt-8 max-w-lg text-base text-neutral-400"
          >
            Coding, writing, and wandering through ideas — this is how I make
            sense of the digital world.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          className="mt-10 mb-12 flex flex-col items-center gap-4 lg:flex-row lg:justify-center lg:gap-0 lg:space-x-[-1rem]"
        >
          {topicsData.map((topic) => (
            <InteractiveCard key={topic.title} {...topic} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
