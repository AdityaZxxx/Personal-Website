"use client";
import { motion, useScroll } from "framer-motion";
import { BookHeartIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section className="max-w-5xl w-full mx-auto px-4 py-8 md:py-12">
      <div className="w-full py-16 md:py-24" ref={containerRef}>
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-12 text-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.5 }}
              className="inline-flex items-center gap-3"
            >
              <BookHeartIcon className="h-8 w-8 text-muted-foreground" />
              <h2 className="text-3xl font-semibold text-primary md:text-4xl">
                My Journey
              </h2>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true, amount: 0.5 }}
              className="mt-4 text-muted-foreground"
            >
              From my first line of code to becoming a software developer.
            </motion.p>
          </div>

          <div className="relative">
            <div className="absolute left-4 top-0 h-full w-0.5 bg-border" />
            <motion.div
              style={{ scaleY: scrollYProgress }}
              className="absolute left-4 top-0 h-full w-0.5 origin-top bg-primary"
            />

            <div className="space-y-12">
              {data.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isMobile ? 20 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true, amount: 0.5 }}
                  className="relative flex items-start gap-6"
                >
                  <div className="absolute left-4 top-2.5 h-4 w-4 -translate-x-1/2 transform rounded-full border-2 border-primary bg-background" />
                  <div className="pl-10">
                    <h3 className="text-xl font-semibold text-foreground">
                      {item.title}
                    </h3>
                    <div className="mt-2 text-muted-foreground">
                      {item.content}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
