"use client";
import { useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export function useAnimate() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      void controls.start("visible");
    }
  }, [isInView, controls]);

  return {
    ref,
    isInView,
    controls,
  };
}
