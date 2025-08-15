"use client";

import { cn } from "@/lib/utils";
import { motion, type Variants } from "framer-motion";
import { Code2, Compass, Globe, PenTool, Sparkles, Zap } from "lucide-react";
import Link from "next/link";

const FlexboxPattern = () => {
  const bars = [
    { height: "40%", delay: 0, color: "from-blue-400 to-blue-600" },
    { height: "70%", delay: 0.1, color: "from-blue-500 to-blue-700" },
    { height: "50%", delay: 0.2, color: "from-blue-300 to-blue-500" },
    { height: "80%", delay: 0.3, color: "from-blue-600 to-blue-800" },
    { height: "35%", delay: 0.4, color: "from-blue-400 to-blue-600" },
    { height: "65%", delay: 0.5, color: "from-blue-500 to-blue-700" },
  ];

  return (
    <div className="absolute inset-0 flex h-full w-full items-center justify-center opacity-30">
      <motion.div
        className="flex h-full w-4/5 items-end justify-center gap-1.5"
        initial="initial"
        whileHover="hover"
      >
        {bars.map((bar, i) => (
          <motion.div
            key={i}
            className={cn(
              "relative rounded-t-lg shadow-lg",
              `bg-gradient-to-t ${bar.color}`
            )}
            style={{
              width: "14px",
              height: bar.height,
            }}
            variants={{
              initial: {
                scaleY: 0.6,
                opacity: 0.7,
              },
              hover: {
                scaleY: 1,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                  delay: bar.delay,
                },
              },
            }}
            animate={{
              scaleY: [0.6, 1, 0.6],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 1.5 + i * 0.2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.div>
    </div>
  );
};

const FetchingPattern = () => {
  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden">
      <motion.div
        className="absolute left-1/2 top-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full shadow-lg"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      {[...Array(4)].map((_, ring) => (
        <motion.div
          key={ring}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            width: `${(ring + 2) * 20}px`,
            height: `${(ring + 2) * 20}px`,
          }}
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8 + ring * 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <div className="relative w-full h-full rounded-full border border-blue-400/20">
            {[...Array(ring + 3)].map((_, dot) => (
              <motion.div
                key={dot}
                className="absolute w-2 h-2 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full shadow-sm"
                style={{
                  top: "50%",
                  left: "50%",
                  transformOrigin: "1px 1px",
                  transform: `rotate(${(dot * 360) / (ring + 3)}deg) translateY(-${(ring + 2) * 10}px)`,
                }}
                animate={{
                  scale: [0.5, 1.2, 0.5],
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: dot * 0.1 + ring * 0.2,
                }}
              />
            ))}

            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-500/30"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: ring * 0.5,
              }}
            />
          </div>
        </motion.div>
      ))}

      {[...Array(6)].map((_, stream) => (
        <motion.div
          key={stream}
          className="absolute left-1/2 top-1/2 w-0.5 h-8 bg-gradient-to-t from-transparent via-blue-400 to-transparent"
          style={{
            transformOrigin: "center bottom",
            transform: `rotate(${stream * 60}deg) translateY(-20px)`,
          }}
          animate={{
            scaleY: [0, 1, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: stream * 0.3,
          }}
        />
      ))}
    </div>
  );
};

const ExplorePattern = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <motion.div
      className="relative w-24 h-24"
      initial="hidden"
      whileHover="visible"
    >
      <motion.div
        className="absolute left-1/2 top-1/2 w-6 h-6 -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full shadow-lg"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      >
        <div className="absolute inset-1 bg-blue-300 rounded-full" />
        <div className="absolute top-0 left-1/2 w-0.5 h-2 bg-white -translate-x-1/2 -translate-y-1" />
      </motion.div>

      {[...Array(8)].map((_, path) => (
        <motion.div
          key={path}
          className="absolute left-1/2 top-1/2 w-0.5 h-10 bg-gradient-to-t from-blue-500/50 to-transparent"
          style={{
            transformOrigin: "center bottom",
            transform: `rotate(${path * 45}deg)`,
          }}
          animate={{
            scaleY: [0.5, 1, 0.5],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: path * 0.2,
          }}
        />
      ))}

      {[...Array(6)].map((_, node) => (
        <motion.div
          key={node}
          className="absolute w-3 h-3 bg-blue-400 rounded-full shadow-sm"
          style={{
            top: "50%",
            left: "50%",
            transform: `rotate(${node * 60}deg) translateY(-35px) translateX(-6px)`,
          }}
          variants={{
            hidden: {
              scale: 0.6,
              opacity: 0.4,
            },
            visible: {
              scale: 1.2,
              opacity: 1,
            },
          }}
          animate={{
            y: [0, -3, 0],
            scale: [0.8, 1, 0.8],
          }}
          transition={{
            duration: 2.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: node * 0.3,
          }}
        >
          <div className="absolute inset-0.5 bg-blue-200 rounded-full" />
        </motion.div>
      ))}

      <motion.div
        className="absolute inset-0 rounded-full border border-blue-400/20"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </motion.div>
  </div>
);

const topicsData = [
  {
    title: "Build",
    subtitle:
      "From ideas to actual products — I build tools that help me learn and (hopefully) help others too.",
    href: "/projects",
    pattern: FlexboxPattern,
    icon: Code2,
    rotation: "lg:rotate-[3deg]",
    zIndex: "z-30",
    translateY: "lg:-translate-y-4",
    translateX: "lg:translate-x-4",
    gradient: "from-blue-500/20 via-blue-600/10 to-blue-700/5",
    hoverGradient: "from-blue-400/30 via-blue-500/20 to-blue-600/10",
  },
  {
    title: "Reflect",
    subtitle:
      "Writing helps me slow down and process what I'm learning, both in tech and life.",
    href: "/blog",
    pattern: FetchingPattern,
    icon: PenTool,
    rotation: "lg:rotate-[-2deg]",
    zIndex: "z-20",
    translateY: "lg:translate-y-8",
    translateX: "lg:-translate-x-2",
    gradient: "from-blue-600/20 via-blue-700/10 to-blue-800/5",
    hoverGradient: "from-blue-500/30 via-blue-600/20 to-blue-700/10",
  },
  {
    title: "Explore",
    subtitle:
      "I'm curious about how technology intersects with culture, society, and power — and I'm learning as I go.",
    href: "/about",
    pattern: ExplorePattern,
    icon: Compass,
    rotation: "lg:rotate-[4deg]",
    zIndex: "z-10",
    translateY: "lg:-translate-y-2",
    translateX: "lg:translate-x-2",
    gradient: "from-blue-400/20 via-blue-500/10 to-blue-600/5",
    hoverGradient: "from-blue-300/30 via-blue-400/20 to-blue-500/10",
  },
];

const InteractiveCard = ({
  title,
  subtitle,
  href,
  pattern: Pattern,
  icon: Icon,
  rotation,
  zIndex,
  translateY,
  translateX,
  gradient,
  hoverGradient,
}: (typeof topicsData)[0]) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 50, scale: 0.9, rotateX: -10 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          transition: {
            type: "spring",
            stiffness: 120,
            damping: 25,
            duration: 0.5,
          },
        },
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: {
          type: "spring",
          stiffness: 350,
          damping: 20,
        },
      }}
      className={cn("group w-80", rotation, zIndex, translateY, translateX)}
      style={{ perspective: "800px" }}
    >
      <Link
        href={href}
        className={cn(
          "relative block aspect-square p-8 rounded-3xl overflow-hidden",
          "bg-gradient-to-br from-neutral-900/90 via-neutral-950/95 to-black",
          "border border-neutral-800/60 backdrop-blur-xl",
          "text-left flex flex-col justify-end",
          "transition-all duration-300 ease-in-out",
          "hover:border-blue-500/30 hover:shadow-xl hover:shadow-blue-500/15",
          "transform-gpu will-change-transform"
        )}
      >
        <motion.div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0",
            gradient
          )}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />

        <motion.div
          className={cn(
            "absolute inset-0 bg-gradient-to-br opacity-0",
            hoverGradient
          )}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.05 }}
        />

        <div className="absolute inset-0 opacity-[0.02] bg-[radial-gradient(circle_at_1px_1px,_white_1px,_transparent_0)] bg-[length:15px_15px]" />

        <motion.div
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center"
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <Icon className="w-4 h-4 text-blue-400" />
        </motion.div>

        <div className="relative h-36 mb-auto overflow-hidden">
          <Pattern />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <Icon className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-50">
              <span className="relative">
                {title}
                <motion.div
                  className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </span>
            </h2>
          </div>

          <p className="text-sm text-neutral-400 leading-relaxed group-hover:text-neutral-300 transition-colors duration-300">
            {subtitle}
          </p>
        </div>

        <motion.div
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 via-transparent to-blue-600/5 opacity-0"
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
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
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      id="topics-section"
      className="relative py-24 md:py-36 overflow-hidden"
    >
      <motion.div
        className="container mx-auto px-4 md:px-6 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="relative mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            variants={itemVariants}
            className="relative inline-block mb-4"
          >
            <div className="flex items-center justify-center gap-3 mb-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <h2 className="font-handwriting text-2xl font-bold md:text-3xl">
                Things I Do
              </h2>
              <Sparkles className="w-5 h-5 text-blue-500" />
            </div>
          </motion.div>

          <motion.h3
            variants={itemVariants}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6"
          >
            <span className="text-foreground">One Thought at a Time</span>
          </motion.h3>

          <motion.div
            variants={itemVariants}
            className="flex items-center justify-center gap-3"
          >
            <Zap className="w-4 h-4 text-blue-500" />
            <p className="max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              Coding, writing, and wandering through ideas — this is how I make
              sense of the digital world.
            </p>
            <Globe className="w-4 h-4 text-blue-500" />
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          className="flex flex-col items-center gap-8 lg:flex-row lg:justify-center lg:gap-0 lg:space-x-[-1rem]"
        >
          {topicsData.map((topic, index) => (
            <motion.div
              key={topic.title}
              variants={itemVariants}
              custom={index}
            >
              <InteractiveCard {...topic} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
