"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Folder, HomeIcon, Image, Menu, Notebook, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Memoized close menu function
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  // Close mobile menu when route changes
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", isMenuOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6 md:gap-10">
          <Link
            href="/"
            className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-purple-700 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:rounded"
            aria-label="Home"
            prefetch
          >
            Aditya
          </Link>

          <nav className="hidden md:flex gap-6 absolute left-1/2 -translate-x-1/2">
            <NavItems />
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
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
      {isMenuOpen && (
        <div
          className={cn(
            "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-top-80 md:hidden bg-background"
          )}
          onClick={closeMenu} // Close when clicking outside
        >
          <div
            className="relative z-20 grid gap-6 rounded-md p-4 bg-background"
            onClick={(e) => e.stopPropagation()} // Prevent event bubbling
          >
            <nav className="grid grid-flow-row auto-rows-max text-center text-xl">
              <NavItems icon />
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

const NavItems = ({ icon = false }: { icon?: boolean }) => {
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "Home", icon: <HomeIcon size={18} /> },
    { href: "/about", label: "About", icon: <User size={18} /> },
    { href: "/projects", label: "Projects", icon: <Folder size={18} /> },
    { href: "/blog", label: "Blog", icon: <Notebook size={18} /> },
    { href: "/gallery", label: "Gallery", icon: <Image size={18} /> },
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
              "transition-colors flex items-center justify-center hover:text-foreground/80 rounded-lg px-3 py-2",
              isActive
                ? "bg-accent text-foreground font-medium"
                : "text-foreground/70",
              icon ? "gap-3 text-lg" : "gap-0 text-base"
            )}
            aria-current={isActive ? "page" : undefined}
          >
            {icon && (
              <span
                className={cn(
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.icon}
              </span>
            )}
            {item.label}
          </Link>
        );
      })}
    </>
  );
};
