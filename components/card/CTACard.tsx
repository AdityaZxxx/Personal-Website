"use client";

// Impor yang dibutuhkan
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowRight, Send } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";
import { cn } from "../../lib/utils"; // Impor 'cn' dari utils tetap dipertahankan

// Variants untuk animasi masuk (staggering), tidak berubah
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.4, // Sedikit dipercepat
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 150, damping: 15 },
  },
};

export const LetsWorkTogetherCard = ({ className }: { className?: string }) => {
  // Logika dari hook 'useAnimate' digabungkan ke sini
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 }); // 'once: true' penting

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"} // Lebih deklaratif, tanpa 'controls'
      className={cn(
        "group relative flex h-full min-h-[300px] flex-col items-center justify-center overflow-hidden rounded-2xl p-6 text-center md:p-8",
        "border border-slate-700/40 bg-gradient-to-br from-sky-900/70 via-sky-800/60 to-slate-900/70 backdrop-blur-lg",
        "shadow-xl shadow-sky-900/40 transition-all duration-300 hover:border-sky-500/60",
        className
      )}
    >
      {/* [DIHAPUS] Semua animasi background (orbs dan mouse-follow) dihilangkan. */}
      {/* Tampilan kini statis dan sangat ringan. */}

      {/* Kontainer untuk stagger animation */}
      <div className="relative z-10 flex flex-col items-center justify-center">
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
            className={cn(
              "group/button relative inline-flex transform-gpu items-center gap-2 overflow-hidden rounded-lg px-6 py-3 text-sm font-medium outline-none md:px-8 md:py-3.5",
              "bg-gradient-to-r from-sky-500 via-sky-400 to-blue-500 text-white shadow-lg",
              "transition-all duration-300 ease-out hover:shadow-xl hover:shadow-sky-500/40 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-sky-900"
            )}
          >
            {/* [DIHAPUS] Efek 'pulse' pada background tombol dihilangkan. */}

            {/* Konten Tombol */}
            <span className="relative z-10 flex items-center">
              {/* [DISEDERHANAKAN] Animasi ikon menggunakan CSS transisi yang ringan */}
              <Send className="mr-2 h-4 w-4 transition-transform duration-300 group-hover/button:scale-110 group-hover/button:rotate-[360deg]" />
              Get in Touch
            </span>
            <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/button:translate-x-1.5" />

            {/* [DIPERTAHANKAN] Efek 'shiny' ini adalah animasi utama saat hover. */}
            {/* Ini hanya aktif saat interaksi, jadi tidak memberatkan. */}
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
      </div>
    </motion.div>
  );
};
