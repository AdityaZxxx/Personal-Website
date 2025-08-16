"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion, Variants } from "framer-motion";
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
    image: { asset: { url: string }; alt: string };
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
      image: { asset: { url: "/ai-logo/openai.webp" }, alt: "ChatGPT Logo" },
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
      image: { asset: { url: "/ai-logo/grok.webp" }, alt: "Grok Logo" },
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

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
        5000 + index * 500
      );
      return () => clearTimeout(timer);
    }
  }, [currentIndex, handleNext, testimonials.length, index]);

  const activeTestimonial = testimonials[currentIndex];

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

  // Animation variants using 'x' and direction for horizontal movement
  const slideVariants: Variants = {
    initial: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 20 : -20,
    }),
    animate: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: "easeOut" },
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? 20 : -20,
      transition: { duration: 0.3, ease: "easeIn" },
    }),
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "group relative h-full overflow-hidden rounded-2xl border backdrop-blur-sm",
        "border-neutral-200/50 dark:border-neutral-800/50",
        "bg-gradient-to-br from-white/80 via-white/60 to-white/40",
        "dark:from-neutral-900/80 dark:via-neutral-900/60 dark:to-neutral-900/40",
        "shadow-md hover:shadow-lg transition-shadow duration-300",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-primary/10 to-transparent opacity-50" />
      <div className="absolute top-6 right-6 text-primary/10">
        <Quote className="w-8 h-8" />
      </div>
      <div className="relative z-10 flex h-full flex-col justify-between p-6 md:p-8">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-colors duration-300",
                getContextColor(activeTestimonial.context)
              )}
            >
              <Icon className="h-3.5 w-3.5" /> {activeTestimonial.context}
            </div>
            {testimonials.length > 1 && (
              <div className="flex items-center gap-1 rounded-full bg-neutral-100/80 dark:bg-neutral-800/80 p-1 backdrop-blur-sm">
                <button
                  onClick={handlePrev}
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-white/50 dark:hover:bg-neutral-700/50"
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="size-4" />
                </button>
                <button
                  onClick={handleNext}
                  className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-white/50 dark:hover:bg-neutral-700/50"
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="size-4" />
                </button>
              </div>
            )}
          </div>
          <div className="relative min-h-[140px] md:min-h-[120px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={activeTestimonial._id}
                custom={direction}
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="text-base leading-relaxed text-foreground font-medium"
              >
                “{activeTestimonial.quote}”
              </motion.blockquote>
            </AnimatePresence>
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-neutral-200/50 dark:border-neutral-800/50">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeTestimonial.author.name}
              custom={direction}
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center gap-4"
            >
              <Image
                src={
                  activeTestimonial.author.image.asset.url || "/placeholder.svg"
                }
                alt={
                  activeTestimonial.author.image.alt ||
                  activeTestimonial.author.name
                }
                width={40}
                height={40}
                className="rounded-full object-cover"
              />
              <div>
                <p className="font-bold text-foreground text-sm">
                  {activeTestimonial.author.name}
                </p>
                <p className="text-xs text-muted-foreground font-medium">
                  {activeTestimonial.author.role}
                </p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-3 h-3 fill-yellow-400 text-yellow-400"
                  />
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
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_left,_rgba(var(--primary-rgb),0.05),_transparent_30%)]" />
      <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_bottom_right,_rgba(var(--primary-rgb),0.05),_transparent_30%)]" />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto px-4 md:px-6"
      >
        <div className="relative mx-auto mb-12 max-w-3xl text-center">
          <h2
            className="text-4xl font-normal italic text-foreground md:text-5xl mb-4"
            style={{ fontFamily: "'Shadows Into Light', cursive" }}
          >
            Some good words
          </h2>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            What AI assistants say about working with me across different
            contexts.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {testimonialsByGroup.map((group, index) => (
            <div
              key={group[0].context}
              className={cn(
                "w-full h-full",
                testimonialsByGroup.length === 3 &&
                  index === 0 &&
                  "lg:rotate-[-1deg] lg:-translate-y-2",
                testimonialsByGroup.length === 3 &&
                  index === 1 &&
                  "lg:translate-y-2",
                testimonialsByGroup.length === 3 &&
                  index === 2 &&
                  "lg:rotate-[1deg]"
              )}
            >
              <TestimonialCard testimonials={group} index={index} />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

export const TestimonialsSection = () => {
  const grouped_testimonials = getGroupedStaticTestimonials();
  return <TestimonialsView testimonialsByGroup={grouped_testimonials} />;
};
