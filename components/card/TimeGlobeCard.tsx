"use client";

import { Clock, MapPin } from "lucide-react";
import * as motion from "motion/react-client";
import { useState } from "react";
import { useAnimate } from "../../hooks/use-animate";
import { cardVariants, cn } from "../../lib/utils";

const timezones = [
  { country: "UK", flag: "🇬🇧", offset: 0 },
  { country: "Indonesia", flag: "🇮🇩", offset: 5.5 },
  { country: "USA", flag: "🇺🇸", offset: -5 },
];

export function TimezoneCard({ className }: { className?: string }) {
  const { ref, controls } = useAnimate();
  const [currentTime, setCurrentTime] = useState(() => {
    const now = new Date();
    return {
      hours: now.getHours(),
      minutes: now.getMinutes(),
    };
  });

  // Update time every minute
  useState(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime({
        hours: now.getHours(),
        minutes: now.getMinutes(),
      });
    }, 60000);

    return () => clearInterval(interval);
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={cardVariants}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.5 }} // Sesuaikan delay jika perlu agar cocok dengan item lain
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-4 md:p-5", // Padding dikurangi (p-6 -> p-4 atau p-5)
        "border border-slate-700/70 bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80 backdrop-blur-md", // Sedikit penyesuaian gradient
        "shadow-xl transition-all duration-300 hover:border-sky-500/60 hover:shadow-2xl hover:shadow-sky-500/25",
        className
      )}
    >
      <div className="hover:bg-card-hover group h-full min-h-[280px] overflow-hidden rounded-2xl p-6 backdrop-blur-sm transition-all duration-300">
        <div className="flex h-full flex-col">
          <div className="mb-3 flex items-center gap-2 text-amber-400">
            <Clock size={20} />
            <span className="text-sm font-medium">Timezone</span>
          </div>

          <h3 className="font-display mb-3 text-xl font-semibold">
            I&apos;m very flexible with time zone communications
          </h3>

          <div className="mt-2 flex items-center gap-3">
            {timezones.map((tz) => (
              <span
                key={tz.country}
                className="flex items-center gap-1.5 rounded-full bg-slate-800/40 px-3 py-1.5 text-sm text-slate-300"
              >
                <span className="text-base">{tz.flag}</span> {tz.country}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-2 text-slate-400">
            <MapPin size={16} className="text-slate-500" />
            <span className="flex items-center gap-1">
              <span className="font-mono">Remote</span>
              <span className="text-slate-600">|</span>
              <span className="font-mono">
                Indonesia - {currentTime.hours.toString().padStart(2, "0")}:
                {currentTime.minutes.toString().padStart(2, "0")}
              </span>
            </span>
          </div>
        </div>

        {/* Globe wireframe visualization */}
        <motion.div
          className="group-hover:color-yellow-500/70 absolute right-0 bottom-0 h-40 w-40 opacity-100 transition-opacity"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <svg
            viewBox="0 0 200 200"
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-full"
          >
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="none"
              stroke="rgba(255, 176, 0, 0.2)"
            />
            <ellipse
              cx="100"
              cy="100"
              rx="80"
              ry="30"
              fill="none"
              stroke="rgba(255, 176, 246, 0.3)"
            />
            <ellipse
              cx="100"
              cy="100"
              rx="80"
              ry="30"
              fill="none"
              stroke="rgba(255, 176, 246, 0.1)"
              transform="rotate(30 100 100)"
            />
            <ellipse
              cx="100"
              cy="100"
              rx="80"
              ry="30"
              fill="none"
              stroke="rgba(255, 176, 246, 0.1)"
              transform="rotate(60 100 100)"
            />
            <ellipse
              cx="100"
              cy="100"
              rx="80"
              ry="30"
              fill="none"
              stroke="rgba(255, 176, 246, 0.2)"
              transform="rotate(90 100 100)"
            />
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
