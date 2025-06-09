"use client";

import { CheckCircle, Layers, Lightbulb, Rocket } from "lucide-react";
import * as motion from "motion/react-client";
import { useAnimate } from "../../hooks/use-animate";
import { cardVariants, cn, itemVariants } from "../../lib/utils";

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

export const CurrentProjectCard = ({ className }: { className?: string }) => {
  const { ref, controls, isInView } = useAnimate();
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-5 md:p-6",
        "border border-slate-700/60 bg-gradient-to-br from-slate-800/90 via-slate-800/70 to-slate-900/90 backdrop-blur-lg",
        "shadow-2xl shadow-slate-900/30 transition-all duration-300 hover:border-sky-500/70 hover:shadow-sky-500/20",
        className
      )}
    >
      {/* Animated rotating conic gradient background - lebih subtle */}
      <motion.div
        className="absolute inset-0 z-0 opacity-[0.08]" // Opacity sangat dikurangi
        style={{
          backgroundImage:
            "conic-gradient(from 0deg at 50% 50%, #0ea5e920, #6366f120, #0ea5e920)", // Warna lebih transparan
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 30, // Durasi lebih lama
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Pulsing orb decorations - lebih subtle */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.05, 0.1, 0.05] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-sky-500/50 blur-3xl md:h-56 md:w-56"
      />
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.04, 0.08, 0.04] }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
        className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-purple-500/40 blur-3xl md:h-48 md:w-48"
      />

      {/* Header */}
      <div className="relative z-10 mb-6 md:mb-8">
        <motion.div
          variants={itemVariants}
          className="mb-4 flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-400/15 p-2 shadow-md backdrop-blur-sm">
            <Lightbulb className="h-5 w-5 text-amber-400" />
          </div>
          <motion.div // Animasi rocket yang lebih halus
            initial={{ y: 0, opacity: 0.7 }}
            animate={{ y: [-2, 2, -2], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Rocket className="h-4 w-4 text-purple-400/70" />
          </motion.div>
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
        variants={itemVariants} // Menggunakan itemVariants untuk animasi masuknya grid
        className="relative z-10 mb-6 grid flex-grow grid-cols-2 gap-3 md:grid-cols-3 md:gap-4"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            variants={itemVariants} // Setiap item juga menggunakan itemVariants (akan di-stagger oleh parent)
            whileHover={{
              scale: 1.03, // Sedikit scale
              y: -3,
              boxShadow: "0px 7px 20px rgba(0, 0, 0, 0.2)", // Shadow yang lebih halus saat hover
              transition: { type: "spring", stiffness: 300, damping: 10 },
            }}
            className={cn(
              "rounded-xl p-3 transition-colors duration-200", // Transisi warna
              feature.status === "completed"
                ? "border border-emerald-600/30 bg-emerald-500/10 hover:bg-emerald-500/20"
                : "border border-sky-600/30 bg-sky-500/10 hover:bg-sky-500/20"
            )}
          >
            <div className="flex items-start gap-2.5">
              <div
                className={cn(
                  "mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg shadow-inner",
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
          </motion.div>
        ))}
      </motion.div>

      {/* Progress bar */}
      <motion.div
        variants={itemVariants} // Menggunakan itemVariants
        className="relative z-10 mt-auto"
      >
        <div className="mb-1.5 flex justify-between text-xs font-semibold text-slate-200">
          <span>Overall Progress</span>
          <span>67%</span> {/* Animasi text shadow dihapus untuk kebersihan */}
        </div>
        <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-700/80 shadow-inner">
          <motion.div
            initial={{ width: "0%" }}
            animate={isInView ? { width: "67%" } : { width: "0%" }} // Animate width saat in view
            transition={{
              delay: 0.5 + features.length * 0.05, // Delay setelah semua fitur masuk
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1], // Custom cubic bezier untuk feel yang lebih 'snappy'
            }}
            className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400"
          >
            {/* Inner glowing element for progress bar - lebih subtle */}
            <motion.div
              className="h-full w-full rounded-full opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(90deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
              }}
              animate={{ backgroundPosition: ["-150% 0%", "150% 0%"] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "linear",
                delay: 1.5 + features.length * 0.05,
              }}
            />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};
