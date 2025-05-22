"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: isMobile ? ["start 30%", "end 70%"] : ["start 40%", "end 60%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  useEffect(() => {
    if (ref.current) {
      const calculateHeight = () => {
        const rect = ref.current?.getBoundingClientRect();
        if (rect) {
          // Add extra space for mobile to account for viewport differences
          const extraSpace = isMobile ? window.innerHeight * 0.2 : 0;
          setHeight(rect.height + extraSpace);
        }
      };

      calculateHeight();
      window.addEventListener("resize", calculateHeight);
      return () => window.removeEventListener("resize", calculateHeight);
    }
  }, [ref, isMobile]);

  return (
    <div
      className="w-full bg-gradient-to-b from-background to-accent/10 py-16"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.h2
          className="text-3xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-green-500 to-green-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          My Journey
        </motion.h2>

        <motion.p
          className="text-muted-foreground mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          From my first line of code to becoming a full-stack developer.
        </motion.p>

        <div ref={ref} className="relative">
          {/* Timeline line container - moved outside the mapping */}
          <div
            style={{ height: `${height}px` }}
            className={`absolute ${isMobile ? "left-8" : "left-8 md:left-8"} top-0 overflow-hidden w-[2px] bg-gradient-to-b from-transparent via-neutral-200 dark:via-neutral-700 to-transparent`}
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-yellow-500 via-green-500 to-transparent rounded-full"
            />
          </div>

          {data.map((item, index) => (
            <motion.div
              key={index}
              className="flex justify-start pt-10 md:pt-16"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ margin: isMobile ? "0px 0px -100px 0px" : "0px" }}
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-background flex items-center justify-center border-2 border-primary/30">
                  <div className="h-3 w-3 rounded-full bg-green-500" />
                </div>

                <h3 className="hidden md:block text-xl md:pl-20 md:text-3xl font-bold text-white">
                  {item.title}
                </h3>
              </div>

              <div className="relative pl-20 pr-4 md:pl-4 w-full">
                <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-white">
                  {item.title}
                </h3>
                <div className="p-6 bg-background rounded-lg border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                  {item.content}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
