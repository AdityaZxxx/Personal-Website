"use client";

import { Folder, HomeIcon, Image, Menu, Notebook, User, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-10">
          <Link
            href="/"
            className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
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
          >
            <Menu className={cn("h-5 w-5", isMenuOpen ? "hidden" : "block")} />
            <X className={cn("h-5 w-5", isMenuOpen ? "block" : "hidden")} />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in md:hidden bg-background",
          isMenuOpen ? "slide-in-from-top-80" : "hidden"
        )}
      >
        <div className="relative z-20 grid gap-6 rounded-md p-4">
          <nav className="grid grid-flow-row auto-rows-max text-center text-xl">
            <NavItems icon={true} />
          </nav>
        </div>
      </div>
    </header>
  );
}

function NavItems({ icon = false }: { icon?: boolean }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: <HomeIcon size={16} /> },
    { href: "/about", label: "About", icon: <User size={16} /> },
    { href: "/projects", label: "Projects", icon: <Folder size={16} /> },
    { href: "/blog", label: "Blog", icon: <Notebook size={16} /> },
    { href: "/gallery", label: "Gallery", icon: <Image size={16} /> },
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
            className={cn(
              "transition-colors flex hover:text-foreground/80 text-center items-center gap-2 rounded-lg px-3 py-1",
              isActive && icon ? "bg-muted text-foreground font-semibold" : "",
              isActive && !icon
                ? "text-foreground font-medium"
                : "text-foreground/60"
            )}
          >
            {icon && item.icon}
            {item.label}
          </Link>
        );
      })}
    </>
  );
}
