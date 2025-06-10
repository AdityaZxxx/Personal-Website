"use client";

import { useEffect, useState } from "react";

export const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Pastikan kode hanya berjalan di browser (client-side)
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia(query);

    // Set state awal saat komponen dimuat
    if (media.matches !== matches) {
      setMatches(media.matches);
    }

    // Buat listener untuk memantau perubahan ukuran layar
    const listener = () => {
      setMatches(media.matches);
    };

    // Tambahkan listener
    media.addEventListener("change", listener);

    // Cleanup: Hapus listener saat komponen di-unmount untuk mencegah memory leak
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
};
