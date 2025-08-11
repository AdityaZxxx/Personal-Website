"use client";

import { motion } from "framer-motion";

const barCount = 4;

const barVariants = {
  initial: {
    scaleY: 0.2,
    opacity: 0.5,
  },
  animate: {
    scaleY: 1,
    opacity: 1,
  },
};

export function MusicBar() {
  return (
    <div className="flex items-end justify-center gap-1 h-6 w-6">
      {[...Array(barCount)].map((_, i) => (
        <motion.div
          key={i}
          className="w-1 h-full bg-green-500 rounded-full"
          variants={barVariants}
          initial="initial"
          animate="animate"
          transition={{
            duration: Math.random() * 0.5 + 0.3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: Math.random() * 0.3,
          }}
        />
      ))}
    </div>
  );
}
