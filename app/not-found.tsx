"use client";

import { Button } from "@/components/ui/button";
import { motion, useReducedMotion } from "framer-motion";
import { Compass, Rocket } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  const shouldReduceMotion = useReducedMotion();

  // Basic animation for stability
  const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 },
  };

  const slideUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  // Non activated animation if user prefer reduced motion
  const motionProps = shouldReduceMotion ? {} : fadeIn;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-br from-background to-muted/30">
      <div className="max-w-md mx-auto text-center space-y-8">
        {/* Animated 404 Illustration */}
        <motion.div {...motionProps} className="relative mx-auto w-64 h-64">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-48 h-48 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center">
              <motion.div
                animate={
                  shouldReduceMotion
                    ? {}
                    : {
                        rotate: 360,
                        transition: {
                          duration: 20,
                          repeat: Infinity,
                          ease: "linear",
                        },
                      }
                }
                className="text-primary dark:text-primary/80"
              >
                <Compass size={96} strokeWidth={1.5} />
              </motion.div>
            </div>
          </div>

          <motion.div
            initial={shouldReduceMotion ? {} : { scale: 0.8, opacity: 0 }}
            animate={shouldReduceMotion ? {} : { scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="text-8xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              404
            </div>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.div {...slideUp} className="space-y-4">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Oops! Lost in Space
          </h1>
          <p className="text-lg text-muted-foreground">
            The page you're looking for has drifted out of orbit.
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          {...slideUp}
          transition={{ ...slideUp.transition, delay: 0.4 }}
          className="pt-6"
        >
          <Link href="/" className="inline-block">
            <Button size="lg" className="group relative overflow-hidden">
              <Rocket className="mr-2 h-5 w-5 group-hover:animate-pulse" />
              <span>Launch Me Home</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </Button>
          </Link>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          {...slideUp}
          transition={{ ...slideUp.transition, delay: 0.6 }}
          className="pt-8 text-sm text-muted-foreground"
        >
          <p>
            Need help?{" "}
            <Link href="/contact" className="underline hover:text-primary">
              Contact support
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
