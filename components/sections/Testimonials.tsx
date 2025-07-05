"use client";

import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Laptop,
  PencilLine,
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
    _id: "1",
    context: "AS A SOFTWARE DEVELOPER",
    quote:
      "Aditya is one of the most dependable and talented teammates I've had the privilege to work with at Dimension. His ability to blend technical expertise with a keen eye for design is unmatched.",
    author: {
      name: "Ronit Panda",
      role: "Full-stack Engineer at Dimension",
      image: {
        asset: {
          url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mjd8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        },
        alt: "Ronit Panda",
      },
    },
  },
  {
    _id: "2",
    context: "AS A WRITER",
    quote:
      "Wow, man! Why didn't I find this blog earlier? This is a really informative react-related blog. I got more insight from here, thanks a lot and keep up the good work!",
    author: {
      name: "@SamX23",
      role: "via Guest Book",
      image: {
        asset: {
          url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8cHJvZmlsZXxlbnwwfHwwfHx8MA%3D%3D",
        },
        alt: "SamX23",
      },
    },
  },
  {
    _id: "3",
    context: "AS A MENTOR",
    quote:
      "Aditya is an exceptional mentor—his clear explanations and thoughtful guidance always steer me in the right direction. Even after considering my university lecturers and experiences, he's the best engineer I've ever encountered.",
    author: {
      name: "Marshall Kurniawan",
      role: "Mentee",
      image: {
        asset: {
          url: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        },
        alt: "Marshall Kurniawan",
      },
    },
  },
  {
    _id: "4",
    context: "AS A WRITER",
    quote:
      "His mentorship was pivotal for my career growth. The way he breaks down complex problems into understandable pieces is a true skill. Highly recommended for anyone starting out.",
    author: {
      name: "Jane Doe",
      role: "Junior Developer",
      image: {
        asset: {
          url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D",
        },
        alt: "Jane Doe",
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
}: {
  testimonials: TestimonialType[];
  className?: string;
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
      const timer = setTimeout(() => {
        handleNext();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, handleNext, testimonials.length]);

  const activeTestimonial = testimonials[currentIndex];

  const variants = {
    enter: (direction: number) => {
      return {
        x: direction > 0 ? 10 : -10,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 10 : -10,
        opacity: 0,
      };
    },
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

  return (
    <div
      className={cn(
        "flex h-full flex-col justify-between rounded-xl border",
        "border-neutral-200 dark:border-neutral-800",
        "bg-primary-foreground text-card-foreground p-6 relative overflow-hidden",
        "shadow-sm hover:shadow-md transition-shadow",
        className
      )}
    >
      <div className="relative z-10 flex h-full flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <p className="flex items-center gap-1.5 text-sm uppercase text-muted-foreground">
              <Icon className="h-4 w-4" />
              {activeTestimonial.context}
            </p>
            {testimonials.length > 1 && (
              <div
                className={cn(
                  "flex items-center gap-0.5 rounded-md p-0.5 backdrop-blur-sm",
                  "bg-neutral-100/50 dark:bg-neutral-800/50"
                )}
              >
                <button
                  onClick={handlePrev}
                  className={cn(
                    "rounded p-0.5 transition-colors",
                    "text-muted-foreground hover:text-foreground",
                    "hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50"
                  )}
                  aria-label="Previous testimonial"
                >
                  <ArrowLeft className="size-3.5" />
                </button>
                <button
                  onClick={handleNext}
                  className={cn(
                    "rounded p-0.5 transition-colors",
                    "text-muted-foreground hover:text-foreground",
                    "hover:bg-neutral-200/50 dark:hover:bg-neutral-700/50"
                  )}
                  aria-label="Next testimonial"
                >
                  <ArrowRight className="size-3.5" />
                </button>
              </div>
            )}
          </div>

          <AnimatePresence mode="wait" custom={direction}>
            <motion.blockquote
              key={activeTestimonial._id}
              variants={variants}
              custom={direction}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="mt-4 text-base leading-relaxed text-foreground"
            >
              {`"${activeTestimonial.quote}"`}
            </motion.blockquote>
          </AnimatePresence>
        </div>

        <div
          className={cn(
            "mt-10 pt-6",
            "border-t border-neutral-200 dark:border-neutral-800"
          )}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial.author.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-3"
            >
              <Image
                src={activeTestimonial.author.image.asset.url}
                alt={
                  activeTestimonial.author.image.alt ||
                  activeTestimonial.author.name
                }
                width={36}
                height={36}
                className="rounded-full object-cover size-9"
              />
              <div>
                <p className="font-semibold text-foreground">
                  {activeTestimonial.author.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {activeTestimonial.author.role}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function TestimonialsView({
  testimonialsByGroup,
}: {
  testimonialsByGroup: TestimonialType[][];
}) {
  return (
    <section className="relative overflow-hidden bg-background py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative mx-auto mb-12 max-w-2xl text-center">
          <h2
            className="text-4xl font-normal italic text-foreground md:text-6xl"
            style={{
              fontFamily: "Shadows Into Light",
              fontWeight: 600,
            }}
          >
            Some good words
          </h2>

          <svg
            width="200"
            height="100"
            viewBox="0 0 268 97"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute -right-20 top-12 hidden md:block"
            aria-hidden="true"
          >
            <path
              d="M265.521 2C249.521 11.4 231.521 24.8 221.021 34.5C201.521 52.5 198.021 82.5 198.521 95"
              stroke="currentColor"
              strokeOpacity="0.4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 6"
            />
            <path
              d="M1 55.5C10.6 67.1 27.2 79.5 40 85C61.2 94.2 92.5 90.5 106.5 85C124.7 78.2 135.5 61.3333 141.5 50.5C150.3 34.3 161.833 16.6667 172.5 7C179.5 1.16667 190.3 -2.8 197 3"
              stroke="currentColor"
              strokeOpacity="0.4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="4 6"
            />
          </svg>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-20 relative max-w-5xl mx-auto">
          {testimonialsByGroup.map((group, index) => (
            <TestimonialCard
              key={group[0].context}
              testimonials={group}
              className={cn(
                "w-full h-full",
                testimonialsByGroup.length === 3 &&
                  index === 0 &&
                  "lg:-rotate-[2deg]",
                testimonialsByGroup.length === 3 &&
                  index === 2 &&
                  "lg:rotate-[2deg]"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export const TestimonialsSection = () => {
  const grouped_testimonials = getGroupedStaticTestimonials();
  return <TestimonialsView testimonialsByGroup={grouped_testimonials} />;
};
