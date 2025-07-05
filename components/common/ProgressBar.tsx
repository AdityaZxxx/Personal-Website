// components/ProgressBar.tsx
"use client";

import { useEffect, useLayoutEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Konfigurasi NProgress untuk menyembunyikan spinner
NProgress.configure({ showSpinner: false });

export function ProgressBar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Gunakan useLayoutEffect untuk memulai NProgress secara sinkron sebelum browser melakukan paint.
  // Ini memastikan progress bar muncul segera saat navigasi dimulai.
  useLayoutEffect(() => {
    NProgress.start();
  }, [pathname, searchParams]); // Dependencies: path dan search params berubah saat navigasi

  // Gunakan useEffect untuk menghentikan NProgress setelah komponen selesai dirender.
  // Ini menandakan bahwa konten halaman baru sudah siap.
  useEffect(() => {
    NProgress.done();
  }, [pathname, searchParams]); // Dependencies: path dan search params berubah saat navigasi

  return null;
}
