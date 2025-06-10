"use client";

// Impor yang dibutuhkan, semua dalam satu file
import { motion, useInView, type Variants } from "framer-motion";
import { CheckCircle, Layers, Lightbulb, Rocket } from "lucide-react";
import { useRef } from "react";
import { cn } from "../../lib/utils";

// Data fitur (tidak berubah)
const features = [
  {
    title: "API Gateway Integration",
    icon: <Layers size={16} className="text-sky-400" />,
    status: "completed",
  },
  {
    title: "User Onboarding Flow",
    icon: <CheckCircle size={16} className="text-emerald-400" />,
    status: "completed",
  },
  // ... sisa data fitur
  {
    title: "Secure Payment System",
    icon: <CheckCircle size={16} className="text-emerald-400" />,
    status: "completed",
  },
  {
    title: "Advanced Data Analytics",
    icon: <Layers size={16} className="text-sky-400" />,
    status: "in-progress",
  },
  {
    title: "UI/UX Design Iteration",
    icon: <Layers size={16} className="text-sky-400" />,
    status: "in-progress",
  },
  {
    title: "Comprehensive API Docs",
    icon: <CheckCircle size={16} className="text-emerald-400" />,
    status: "completed",
  },
  {
    title: "Scalability Operations",
    icon: <Layers size={16} className="text-sky-400" />,
    status: "in-progress",
  },
  {
    title: "Security Audits & Hardening",
    icon: <CheckCircle size={16} className="text-emerald-400" />,
    status: "completed",
  },
];

// Variants untuk animasi masuk (entry animation)
// Kita definisikan di sini agar kode lebih terorganisir
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Animasi anak-anaknya akan muncul berurutan
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export const CurrentProjectCard = ({ className }: { className?: string }) => {
  // Logika dari hook 'useAnimate' digabungkan ke sini
  const ref = useRef(null);
  // 'once: true' memastikan animasi hanya berjalan sekali saat elemen masuk layar
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    // Kita gunakan 'variants' untuk mengelola animasi masuk secara terpusat
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"} // Animasi dikontrol oleh isInView
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-5 md:p-6",
        "border border-slate-700/60 bg-gradient-to-br from-slate-800/90 via-slate-800/70 to-slate-900/90 backdrop-blur-lg",
        "shadow-xl shadow-slate-900/30 transition-all duration-300 hover:border-sky-500/70", // Shadow saat hover lebih simpel
        className
      )}
    >
      {/* [DIHAPUS] Semua animasi background yang berulang (conic-gradient, orbs) 
        dihilangkan untuk meringankan beban GPU. Tampilan statis jauh lebih ringan.
      */}

      {/* Header */}
      <div className="relative z-10 mb-6 md:mb-8">
        <motion.div
          variants={itemVariants}
          className="mb-4 flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15 p-2">
            <Lightbulb className="h-5 w-5 text-amber-400" />
          </div>
          {/* [DIHAPUS] Animasi rocket yang 'terbang' dihilangkan, ikon statis lebih ringan */}
          <Rocket className="h-4 w-4 text-purple-400/70" />
        </motion.div>
        <motion.h3
          variants={itemVariants}
          className="mb-1.5 text-xl font-semibold text-slate-50 sm:text-2xl md:text-3xl"
        >
          Current{" "}
          <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-orange-400 bg-clip-text text-transparent">
            Project Focus
          </span>
        </motion.h3>
        <motion.p
          variants={itemVariants}
          className="text-sm leading-relaxed text-slate-300/90 md:text-base"
        >
          Building a cutting-edge, scalable SaaS platform with a focus on user
          experience.
        </motion.p>
      </div>

      {/* Features Grid */}
      <motion.div
        variants={itemVariants}
        className="relative z-10 mb-6 grid flex-grow grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
      >
        {features.map((feature) => (
          // [DISEDERHANAKAN] Efek hover kini hanya menggunakan transisi CSS, tanpa Framer Motion
          <div
            key={feature.title}
            className={cn(
              "rounded-xl p-3 transition-all duration-200 ease-out", // Transisi untuk hover
              "border border-slate-700/80 bg-slate-800/50",
              "hover:bg-slate-700/60 hover:-translate-y-1" // Efek hover simpel
            )}
          >
            <div className="flex items-start gap-2.5">
              <div
                className={cn(
                  "mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg",
                  feature.status === "completed"
                    ? "bg-emerald-500/25 text-emerald-300"
                    : "bg-sky-500/25 text-sky-300"
                )}
              >
                {feature.icon}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="truncate text-xs font-medium text-slate-100 sm:text-sm">
                  {feature.title}
                </h4>
                <p
                  className={cn(
                    "mt-0.5 text-[0.7rem] font-medium sm:text-xs",
                    feature.status === "completed"
                      ? "text-emerald-400"
                      : "text-sky-400"
                  )}
                >
                  {feature.status === "completed" ? "Completed" : "In Progress"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Progress bar */}
      <motion.div variants={itemVariants} className="relative z-10 mt-auto">
        <div className="mb-1.5 flex justify-between text-xs font-semibold text-slate-200">
          <span>Overall Progress</span>
          <span>67%</span>
        </div>
        <div className="h-2.5 w-full rounded-full bg-slate-700/80 shadow-inner overflow-hidden">
          {/* [DIPERTAHANKAN] Animasi progress bar ini penting dan hanya berjalan sekali */}
          <motion.div
            className="h-full w-full origin-left rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 0.67 } : { scaleX: 0 }}
            transition={{
              delay: 0.5,
              duration: 1.2,
              ease: "easeOut",
            }}
          />
          {/* [DIHAPUS] Efek 'shimmer' pada progress bar dihilangkan */}
        </div>
      </motion.div>
    </motion.div>
  );
};
