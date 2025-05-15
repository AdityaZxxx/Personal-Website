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
  const pathname = usePathname();

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMenuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-300">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6 md:gap-10">
          <Link
            href="/"
            className="focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Image
              src="/logo.jpg"
              className="rounded-full shadow"
              alt="logo"
              width={36}
              height={36}
              priority
            />
          </Link>
          <nav className="hidden md:flex gap-6 absolute left-1/2 -translate-x-1/2">
            <NavItems />
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* <ThemeToggle /> */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className={cn(
              "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-y-auto p-6 pb-32 shadow-md bg-background"
            )}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.2 }}
            onClick={closeMenu}
          >
            <motion.div
              className="relative z-20 grid gap-4 rounded-md p-4 bg-card text-card-foreground shadow-sm"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <nav className="grid grid-flow-row auto-rows-max gap-2 text-lg">
                <NavItems icon />
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const NavItems = ({ icon = false }: { icon?: boolean }) => {
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "Home", icon: <HomeIcon size={18} /> },
    { href: "/about", label: "About", icon: <User size={18} /> },
    { href: "/projects", label: "Project", icon: <Folder size={18} /> },
    { href: "/blog", label: "Blog", icon: <Notebook size={18} /> },
    { href: "/gallery", label: "Gallery", icon: <ImageIcon size={18} /> },
    { href: "/contact", label: "Contact", icon: <Mail size={18} /> },
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
              "transition-colors flex items-center justify-center hover:text-foreground/80 rounded-md px-3 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              isActive
                ? "bg-primary text-primary-foreground font-semibold rounded-full"
                : "text-foreground/70",
              icon ? "gap-2 text-base" : "gap-0 text-sm md:text-base"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {icon && (
              <span
                className={cn(
                  isActive ? "text-primary-foreground" : "text-muted-foreground"
                )}
              >
                {item.icon}
              </span>
            )}
            <span>{item.label}</span>
          </Link>
        );
      })}
    </>
  );
};
