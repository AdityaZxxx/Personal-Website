"use client";

import { ArrowRight, Send } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { useAnimate } from "../../hooks/use-animate";
import { cardVariants, cn } from "../../lib/utils";

export const LetsWorkTogetherCard = ({ className }: { className?: string }) => {
  const { ref, controls, isInView } = useAnimate();
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      whileHover={{ scale: 1.015 }} // Sedikit scale pada hover kartu
      transition={{
        duration: 0.6,
        delay: 0.4, // Sesuaikan delay agar sinkron dengan kartu lain jika ada
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.2 }}
      className={cn(
        "group relative flex h-full min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-2xl p-6 text-center md:p-8",
        "border border-sky-700/40 bg-gradient-to-br from-sky-900/70 via-sky-800/60 to-slate-900/70 backdrop-blur-lg", // Gradient disesuaikan
        "shadow-2xl shadow-sky-900/40 transition-all duration-400 hover:border-sky-500/60 hover:shadow-sky-500/25",
        className
      )}
    >
      {/* Animated background orbs - lebih halus */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-30"
        animate={
          {
            // Bisa ditambahkan animasi subtle pada orbs jika diinginkan
          }
        }
      >
        <motion.div
          className="absolute top-1/4 left-1/4 h-32 w-32 rounded-full bg-sky-500/20 blur-3xl md:h-40 md:w-40"
          animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 h-28 w-28 rounded-full bg-blue-600/20 blur-3xl md:h-36 md:w-36"
          animate={{ scale: [1, 1.08, 1], opacity: [0.6, 0.9, 0.6] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </motion.div>

      {/* Enhanced Shiny overlay effect */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-2xl">
        <motion.div
          className="absolute -inset-12" // Lebih besar agar efeknya lebih luas
          style={{
            backgroundImage:
              "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(14, 165, 233, 0.15) 0%, transparent 30%, transparent 100%)", // Radial gradient mengikuti mouse
            backgroundSize: "400% 400%", // Ukuran untuk efek
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1, transition: { duration: 0.3 } }}
          onMouseMove={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            e.currentTarget.style.setProperty(
              "--mouse-x",
              `${e.clientX - rect.left}px`
            );
            e.currentTarget.style.setProperty(
              "--mouse-y",
              `${e.clientY - rect.top}px`
            );
          }}
        />
      </div>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 12 }}
        className="relative z-10 mb-3 md:mb-4"
      >
        <Send className="h-10 w-10 text-sky-300/90 drop-shadow-lg md:h-12 md:w-12" />
      </motion.div>

      <motion.h3
        className="relative z-10 mb-2 text-xl font-semibold text-slate-50 md:text-2xl"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, ease: "easeOut", duration: 0.5 }}
      >
        <span className="bg-gradient-to-r from-sky-300 via-sky-200 to-slate-100 bg-clip-text text-transparent">
          Let&apos;s Work Together
        </span>
      </motion.h3>

      <motion.p
        className="relative z-10 mb-6 max-w-xs text-sm text-slate-300/80 md:text-base"
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, ease: "easeOut", duration: 0.5 }}
      >
        Have an innovative idea or a project in mind? I&apos;d love to hear
        about it.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, type: "spring", stiffness: 150 }}
        className="relative z-10 mt-auto"
      >
        <Link
          href="mailto:adityaofficial714@gmail.com"
          className={cn(
            "group/button relative inline-flex transform-gpu items-center gap-2 overflow-hidden rounded-lg px-6 py-3 text-sm font-medium outline-none md:px-8 md:py-3.5",
            "bg-gradient-to-r from-sky-500 via-sky-400 to-blue-500 text-white shadow-lg", // Warna tombol lebih vibrant
            "transition-all duration-300 ease-out hover:shadow-xl hover:shadow-sky-500/40 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-900"
          )}
        >
          {/* Pulsing background element */}
          <motion.span
            className="absolute inset-0 z-0"
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.15, 0.3, 0.15],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(56,189,248,0.5) 0%, transparent 70%)",
              borderRadius: "inherit",
            }}
          />

          {/* Text and Icon container */}
          <span className="relative z-10 flex items-center">
            <Send className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/button:scale-110 group-hover/button:rotate-[360deg]" />
            Get in Touch
          </span>
          <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1.5 group-hover/button:scale-110" />

          {/* Enhanced Button shine effect on hover */}
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
  );
};
