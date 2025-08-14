"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Laptop,
  PencilLine,
  Quote,
  Star,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";

export type TestimonialType = {
  _id: string;
  author: {
    name: string;
    role: string;
    image: {
      asset: { url: string };
      alt: string;
    };
  };
  context: string;
  quote: string;
};

const allTestimonials: TestimonialType[] = [
  {
    _id: "gemini-google",
    context: "AS A MENTOR",
    quote:
      "His approach to breaking down complex topics into first principles is remarkably efficient. The clarity in his tutorials reflects a deep understanding of both the subject matter and pedagogy.",
    author: {
      name: "Gemini",
      role: "from Google",
      image: {
        asset: { url: "/ai-logo/gemini-color.webp" },
        alt: "Gemini Logo",
      },
    },
  },
  {
    _id: "chatgpt-openai",
    context: "AS A WRITER",
    quote:
      "Observing his writing process has been insightful. He structures narratives with a logical flow that is both engaging and easy to follow, a skill crucial for effective technical communication.",
    author: {
      name: "ChatGPT",
      role: "from OpenAI",
      image: {
        asset: { url: "/ai-logo/openai.webp" },
        alt: "ChatGPT Logo",
      },
    },
  },
  {
    _id: "grok-xai",
    context: "AS A SOFTWARE DEVELOPER",
    quote:
      "His code is not just functional, it's... amusingly clever. He finds the most direct path to a solution, often with a touch of unconventional wit. A real-time problem solver.",
    author: {
      name: "Grok",
      role: "from xAI",
      image: {
        asset: { url: "/ai-logo/grok.webp" },
        alt: "Grok Logo",
      },
    },
  },
  {
    _id: "claude-anthropic",
    context: "AS A MENTOR",
    quote:
      "What stands out is the thoughtful consideration in his guidance. He consistently prioritizes robust and safe implementation, ensuring foundational concepts are solid before moving on.",
    author: {
      name: "Claude",
      role: "from Anthropic",
      image: {
        asset: { url: "/ai-logo/claude-color.webp" },
        alt: "Claude Logo",
      },
    },
  },
  {
    _id: "metaai-meta",
    context: "AS A SOFTWARE DEVELOPER",
    quote:
      "His commitment to open-source principles and creating accessible tools is commendable. The projects demonstrate a strong ability to build for a broad and diverse user base.",
    author: {
      name: "Meta AI",
      role: "from Meta",
      image: {
        asset: { url: "/ai-logo/meta-color.webp" },
        alt: "Meta AI Logo",
      },
    },
  },
  {
    _id: "deepseek-ai",
    context: "AS A SOFTWARE DEVELOPER",
    quote:
      "The code architecture is highly optimized and efficient. He demonstrates a profound ability to write clean, scalable, and maintainable code, which is a significant asset in any project.",
    author: {
      name: "Deepseek",
      role: "from Deepseek AI",
      image: {
        asset: { url: "/ai-logo/deepseek-color.webp" },
        alt: "Deepseek Logo",
      },
    },
  },
];

function getGroupedStaticTestimonials(): TestimonialType[][] {
  const grouped: { [key: string]: TestimonialType[] } = allTestimonials.reduce(
    (acc, t) => {
      (acc[t.context] = acc[t.context] || []).push(t);
      return acc;
    },
    {} as { [key: string]: TestimonialType[] }
  );
  return Object.values(grouped).slice(0, 3);
}

function TestimonialCard({
  testimonials,
  className,
  index,
}: {
  testimonials: TestimonialType[];
  className?: string;
  index: number;
}) {
  const [direction, setDirection] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, [testimonials.length]);

  useEffect(() => {
    if (testimonials.length > 1) {
      const timer = setTimeout(
        () => {
          handleNext();
        },
        6000 + index * 1000
      );
      return () => clearTimeout(timer);
    }
  }, [currentIndex, handleNext, testimonials.length, index]);

  const activeTestimonial = testimonials[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 30 : -30,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 30 : -30,
      opacity: 0,
      scale: 0.95,
    }),
  };

  const Icon = useMemo(() => {
    switch (activeTestimonial.context.toUpperCase()) {
      case "AS A SOFTWARE DEVELOPER":
        return Laptop;
      case "AS A WRITER":
        return PencilLine;
      case "AS A MENTOR":
        return GraduationCap;
      default:
        return Laptop;
    }
  }, [activeTestimonial.context]);

  const getContextColor = (context: string) => {
    switch (context.toUpperCase()) {
      case "AS A SOFTWARE DEVELOPER":
        return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "AS A WRITER":
        return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      case "AS A MENTOR":
        return "text-purple-500 bg-purple-500/10 border-purple-500/20";
      default:
        return "text-primary bg-primary/10 border-primary/20";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      whileHover={{
        y: -8,
        scale: 1.02,
        transition: { duration: 0.3 },
      }}
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border backdrop-blur-sm",
        "border-neutral-200/50 dark:border-neutral-800/50",
        "bg-gradient-to-br from-white/80 via-white/60 to-white/40",
        "dark:from-neutral-900/80 dark:via-neutral-900/60 dark:to-neutral-900/40",
        "shadow-lg hover:shadow-xl transition-all duration-500",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-primary/10 to-transparent opacity-50" />

      <motion.div
        className="absolute top-6 right-6 text-primary/10"
        animate={{
          rotate: [0, 5, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Quote className="w-8 h-8" />
      </motion.div>

      <div className="relative z-10 flex h-full flex-col justify-between p-8">
        <div>
          <div className="flex items-center justify-between mb-6">
            <motion.div
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border",
                getContextColor(activeTestimonial.context)
              )}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Icon className="h-3.5 w-3.5" />
              {activeTestimonial.context}
            </motion.div>

            {testimonials.length > 1 && (
              <div className="flex items-center gap-1 rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 p-1 backdrop-blur-sm">
                <motion.button
                  onClick={handlePrev}
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-white/50 dark:hover:bg-neutral-700/50"
                  aria-label="Previous testimonial"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft className="size-4" />
                </motion.button>
                <motion.button
                  onClick={handleNext}
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-white/50 dark:hover:bg-neutral-700/50"
                  aria-label="Next testimonial"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowRight className="size-4" />
                </motion.button>
              </div>
            )}
          </div>

          <div className="relative min-h-[120px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={activeTestimonial._id}
                variants={slideVariants}
                custom={direction}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  duration: 0.4,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="text-lg leading-relaxed text-foreground font-medium"
              >
                "{activeTestimonial.quote}"
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-200/50 dark:border-neutral-800/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.author.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-4"
            >
              <motion.div
                className="relative"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={
                    activeTestimonial.author.image.asset.url ||
                    "/placeholder.svg"
                  }
                  alt={
                    activeTestimonial.author.image.alt ||
                    activeTestimonial.author.name
                  }
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              <div>
                <p className="font-bold text-foreground text-base">
                  {activeTestimonial.author.name}
                </p>
                <p className="text-sm text-muted-foreground font-medium">
                  {activeTestimonial.author.role}
                </p>
              </div>

              <div className="ml-auto flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                  >
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

function TestimonialsView({
  testimonialsByGroup,
}: {
  testimonialsByGroup: TestimonialType[][];
}) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-background py-24 md:py-32">
      <motion.div
        className="absolute top-20 left-10 w-2 h-2 bg-primary/20 rounded-full blur-sm"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.8, 0.3],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-20 w-1 h-1 bg-primary/30 rounded-full"
        animate={{
          y: [0, -15, 0],
          x: [0, 10, 0],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="container mx-auto px-4 md:px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          variants={itemVariants}
          className="relative mx-auto mb-16 max-w-3xl text-center"
        >
          <motion.h2
            className="text-4xl font-normal italic text-foreground md:text-6xl mb-4"
            style={{
              fontFamily: "Shadows Into Light",
              fontWeight: 600,
            }}
          >
            Some good words
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            What AI assistants say about working with me across different
            contexts
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto"
        >
          {testimonialsByGroup.map((group, index) => (
            <motion.div
              key={group[0].context}
              variants={itemVariants}
              className={cn(
                "w-full h-full",
                testimonialsByGroup.length === 3 &&
                  index === 0 &&
                  "lg:rotate-[-1deg] lg:-translate-y-4",
                testimonialsByGroup.length === 3 &&
                  index === 1 &&
                  "lg:translate-y-4",
                testimonialsByGroup.length === 3 &&
                  index === 2 &&
                  "lg:rotate-[1deg] lg:-translate-y-2"
              )}
            >
              <TestimonialCard testimonials={group} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

export const TestimonialsSection = () => {
  const grouped_testimonials = getGroupedStaticTestimonials();
  return <TestimonialsView testimonialsByGroup={grouped_testimonials} />;
};
