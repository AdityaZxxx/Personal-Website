"use client";

import { motion } from "framer-motion"; // PERUBAHAN: Menggunakan framer-motion
import { ArrowRight, Send } from "lucide-react";
import Link from "next/link";
import { useAnimate } from "../../hooks/use-animate";
import { cardVariants, cn } from "../../lib/utils";

// OPTIMASI: Definisikan variants untuk staggering
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.6,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 15 },
  },
};

export const LetsWorkTogetherCard = ({ className }: { className?: string }) => {
  const { ref, controls, isInView } = useAnimate();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // OPTIMASI: Throttle dengan requestAnimationFrame
    const { currentTarget } = e;
    const rect = currentTarget.getBoundingClientRect();
    requestAnimationFrame(() => {
      currentTarget.style.setProperty(
        "--mouse-x",
        `${e.clientX - rect.left}px`
      );
      currentTarget.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
    });
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      viewport={{ once: true, amount: 0.2 }}
      onMouseMove={handleMouseMove}
      className={cn(
        "group relative flex h-full min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-2xl p-6 text-center md:p-8",
        "border border-sky-700/40 bg-gradient-to-br from-sky-900/70 via-sky-800/60 to-slate-900/70 backdrop-blur-lg",
        "shadow-2xl shadow-sky-900/40 transition-all duration-400 hover:border-sky-500/60 hover:shadow-sky-500/25",
        className
      )}
    >
      {/* OPTIMASI: Animasi hanya aktif saat terlihat */}
      <motion.div className="absolute inset-0 -z-10 opacity-30 will-change-transform">
        <motion.div
          className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-sky-500/20 blur-3xl md:h-40 md:w-40"
          animate={
            isInView
              ? { scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }
              : { scale: 1, opacity: 0.7 }
          }
          transition={{
            duration: 8,
            repeat: isInView ? Infinity : 0,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 h-28 w-28 rounded-full bg-blue-600/20 blur-3xl md:h-36 md:w-36"
          animate={
            isInView
              ? { scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }
              : { scale: 1, opacity: 0.6 }
          }
          transition={{
            duration: 10,
            repeat: isInView ? Infinity : 0,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>

      {/* Shiny overlay effect */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
        <motion.div
          className="absolute -inset-12 will-change-transform"
          style={{
            backgroundImage:
              "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(14, 165, 233, 0.15) 0%, transparent 30%, transparent 100%)",
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
        />
      </div>

      {/* OPTIMASI: Kontainer untuk stagger animation */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls} // Gunakan controls yang sama dengan parent
      >
        <motion.div variants={itemVariants} className="mb-3 md:mb-4">
          <Send className="h-10 w-10 text-sky-300/90 drop-shadow-lg md:h-12 md:w-12" />
        </motion.div>

        <motion.h3
          variants={itemVariants}
          className="mb-2 text-xl font-semibold text-slate-50 md:text-2xl"
        >
          <span className="bg-gradient-to-r from-sky-300 via-sky-200 to-slate-100 bg-clip-text text-transparent">
            Let&apos;s Work Together
          </span>
        </motion.h3>

        <motion.p
          variants={itemVariants}
          className="mb-6 max-w-xs text-sm text-slate-300/80 md:text-base"
        >
          Have an innovative idea or a project in mind? I&apos;d love to hear
          about it.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-auto">
          <Link
            href="mailto:adityaofficial714@gmail.com"
            className="group/button relative inline-flex ..."
          >
            {/* Pulsing background (juga dioptimalkan) */}
            <motion.span
              className="absolute inset-0 z-0"
              animate={
                isInView
                  ? { scale: [1, 1.15, 1], opacity: [0.15, 0.3, 0.15] }
                  : { scale: 1, opacity: 0.15 }
              }
              transition={{
                duration: 2,
                repeat: isInView ? Infinity : 0,
                ease: "easeInOut",
              }}
              style={{
                background:
                  "radial-gradient(circle, rgba(56,189,248,0.5) 0%, transparent 70%)",
                borderRadius: "inherit",
              }}
            />

            {/* Konten Tombol */}
            <span className="relative z-10 flex items-center">
              <Send className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/button:scale-110 group-hover/button:rotate-[360deg]" />
              Get in Touch
              <ArrowRight className="relative ml-2 z-10 h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1.5 group-hover/button:scale-110" />
            </span>

            {/* Efek shine */}
            <motion.div
              className="absolute inset-0 z-0"
              initial={{ x: "-100%", opacity: 0 }}
              whileHover={{
                x: "100%",
                opacity: 0.3,
                transition: { duration: 0.7, ease: "easeOut" },
              }}
              style={{
                backgroundImage:
                  "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
              }}
            />
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
