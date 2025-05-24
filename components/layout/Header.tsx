"use client";

import { BlogSearch } from "@/components/blog-search"; // <-- 1. Impor BlogSearch
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import {
  Folder,
  HomeIcon,
  ImageIcon,
  Mail,
  Menu,
  Notebook,
  User,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // 2. Logika untuk menampilkan BlogSearch
  const showBlogSearch = pathname === "/blog" || pathname?.startsWith("/blog/");

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMenuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b transition-all duration-300",
        "bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80",
        isScrolled ? "shadow-sm" : "shadow-none",
        isMenuOpen ? "border-transparent" : "border-border/50" // Atau bg-background saat menu terbuka
      )}
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo di kiri */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full"
            aria-label="Home"
            onClick={closeMenu} // Tutup menu jika logo diklik saat di mobile
          >
            <Image
              src="/logo.jpg" // Pastikan path logo ini benar
              className="rounded-full shadow-sm hover:shadow-md transition-all duration-300"
              alt="Website logo"
              width={36}
              height={36}
              priority
            />
          </Link>
        </div>

        {/* Navigasi tengah untuk Desktop */}
        <nav className="hidden md:flex items-center absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <NavItems closeMenu={closeMenu} />
        </nav>

        {/* Konten tengah untuk Mobile (bisa BlogSearch atau kosong) */}
        <div className="md:hidden flex-1 flex justify-center items-center min-w-0 px-2 sm:px-4">
          {showBlogSearch && !isMenuOpen && (
            <div className="w-full max-w-xs">
              <BlogSearch />
            </div>
          )}
        </div>

        {/* Bagian kanan Header */}
        <div className="flex-shrink-0 flex items-center">
          {/* BlogSearch untuk Desktop */}
          {showBlogSearch && (
            <div className="hidden md:block">
              <div className="w-auto md:w-56 lg:w-64">
                {" "}
                {/* Sesuaikan lebar search bar desktop */}
                <BlogSearch />
              </div>
            </div>
          )}

          {/* Tombol Menu Mobile */}
          <div className="md:hidden ml-2">
            {" "}
            {/* Tambahkan ml-2 jika BlogSearch tidak tampil di mobile untuk spacing */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={
                isMenuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Panel Menu Mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            className={cn(
              "fixed inset-0 top-16 z-40 h-[calc(100vh-4rem)] overflow-y-auto", // Sesuaikan tinggi agar tidak overlap header
              "bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80"
            )}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            // Tidak perlu onClick={closeMenu} di sini karena NavItems akan menanganinya
          >
            {/* Wrapper untuk konten menu agar bisa di-scroll jika item banyak */}
            <div className="pt-4 pb-12">
              <motion.div
                className="relative z-20 mx-4 mt-2 mb-4 rounded-lg bg-card shadow-lg border border-border/50" // Styling menu card
                onClick={(e) => e.stopPropagation()} // Cegah penutupan menu saat klik di dalam card
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  delay: 0.05,
                }}
              >
                <nav className="grid gap-1 p-2" aria-label="Mobile navigation">
                  {/* NavItems menerima closeMenu untuk menutup menu saat item diklik */}
                  <NavItems icon closeMenu={closeMenu} />
                </nav>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

interface NavItemProps {
  href: string;
  label: string;
  icon: React.ReactNode;
}

// NavItems sekarang menerima prop closeMenu
const NavItems = ({
  icon = false,
  closeMenu,
}: {
  icon?: boolean;
  closeMenu?: () => void;
}) => {
  const pathname = usePathname();
  const navItems: NavItemProps[] = [
    {
      href: "/",
      label: "Home",
      icon: <HomeIcon size={18} aria-hidden="true" />,
    },
    {
      href: "/about",
      label: "About",
      icon: <User size={18} aria-hidden="true" />,
    },
    {
      href: "/projects",
      label: "Projects",
      icon: <Folder size={18} aria-hidden="true" />,
    },
    {
      href: "/blog",
      label: "Blog",
      icon: <Notebook size={18} aria-hidden="true" />,
    },
    {
      href: "/gallery",
      label: "Gallery",
      icon: <ImageIcon size={18} aria-hidden="true" />,
    },
    {
      href: "/contact",
      label: "Contact",
      icon: <Mail size={18} aria-hidden="true" />,
    },
  ];

  return (
    <>
      {navItems.map((item) => {
        const isActive =
          (item.href === "/" && pathname === item.href) || // Penanganan khusus untuk Home
          (item.href !== "/" && pathname?.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch={false} // Bisa diatur true jika ingin prefetch
            onClick={closeMenu} // Panggil closeMenu saat item navigasi diklik
            className={cn(
              "flex items-center relative group rounded-md transition-colors duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              icon
                ? "gap-3 px-3 py-2.5 text-base hover:bg-muted/80 dark:hover:bg-slate-700/60" // Styling untuk mobile menu items
                : "gap-2 px-3 py-2 text-sm hover:bg-muted/50 dark:hover:bg-slate-700/50", // Styling untuk desktop nav items
              isActive && icon
                ? "text-primary dark:text-sky-400 bg-muted dark:bg-slate-700"
                : "",
              isActive && !icon
                ? "text-primary dark:text-sky-400"
                : "text-foreground/70 dark:text-slate-300 hover:text-foreground dark:hover:text-slate-100"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {icon && (
              <span
                className={cn(
                  isActive
                    ? "text-primary dark:text-sky-400"
                    : "text-muted-foreground dark:text-slate-400",
                  "flex-shrink-0 transition-colors duration-200"
                )}
              >
                {item.icon}
              </span>
            )}
            <span className={cn("relative", icon ? "font-medium" : "")}>
              {item.label}
              {!icon && ( // Hanya tampilkan garis bawah untuk navigasi desktop
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-[2px] bg-sky-400 transition-all duration-300 ease-out",
                    isActive
                      ? "w-3/4 opacity-100"
                      : "w-0 opacity-0 group-hover:w-1/2 group-hover:opacity-75" // Efek hover yang lebih halus
                  )}
                />
              )}
            </span>
            {isActive && <span className="sr-only">(current page)</span>}
          </Link>
        );
      })}
    </>
  );
};
