"use client";
import { useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export function useAnimate() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      // Tidak perlu 'void', cukup panggil start
      controls.start("visible");
    }
    // 'controls' dari useAnimation dijamin stabil, tapi untuk kebersihan,
    // kita bisa menghapusnya dari dependency array karena logikanya hanya bergantung pada isInView.
  }, [isInView]);

  return {
    ref,
    isInView,
    controls,
  };
}
