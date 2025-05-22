"use client";

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

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent body scroll when menu is open
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
        isMenuOpen ? "border-transparent" : "border-border"
      )}
      aria-label="Main navigation"
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Link
            href="/"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-full"
            aria-label="Home"
          >
            <Image
              src="/logo.jpg"
              className="rounded-full shadow-sm hover:shadow-md transition-shadow duration-300"
              alt="Website logo"
              width={36}
              height={36}
              priority
            />
          </Link>
        </div>

        {/* Centered navigation on desktop */}
        <nav className="hidden md:flex items-center absolute left-1/2 transform -translate-x-1/2">
          <NavItems />
        </nav>

        {/* Mobile menu button (right side) */}
        <div className="flex items-center md:hidden">
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

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-navigation"
            className={cn(
              "fixed inset-0 top-16 z-40 h-[calc(100vh-4rem)] overflow-y-auto",
              "bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80"
            )}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onClick={closeMenu}
          >
            <motion.div
              className="relative z-20 mx-4 mt-4 rounded-lg bg-card shadow-lg"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <nav className="grid gap-1 p-2" aria-label="Mobile navigation">
                <NavItems icon />
              </nav>
            </motion.div>
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

const NavItems = ({ icon = false }: { icon?: boolean }) => {
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
          pathname === item.href ||
          (item.href !== "/" && pathname?.startsWith(item.href));

        return (
          <Link
            key={item.href}
            href={item.href}
            prefetch
            className={cn(
              "flex items-center transition-all duration-200 hover:bg-accent/50 rounded-lg",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "bg-primary text-primary-foreground font-medium"
                : "text-foreground/90 hover:text-foreground",
              icon ? "gap-3 px-4 py-3 text-base" : "gap-2 px-3 py-2 text-sm"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {icon && (
              <span
                className={cn(
                  isActive
                    ? "text-primary-foreground"
                    : "text-muted-foreground",
                  "flex-shrink-0"
                )}
              >
                {item.icon}
              </span>
            )}
            <span>{item.label}</span>
            {isActive && <span className="sr-only">(current page)</span>}
          </Link>
        );
      })}
    </>
  );
};
