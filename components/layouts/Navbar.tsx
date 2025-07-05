"use client";

import { allNavItems } from "@/lib/nav-items";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronDown, Menu as MenuIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Popover, PopoverAnchor, PopoverTrigger } from "../ui/popover";
const MobileMenuPanel = dynamic(() => import("./MobileMenuPanel"));

const MorePopover = dynamic(() => import("./MorePopover"));

export function Navbar({ className }: { className?: string }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  const navItems = allNavItems.filter((item) => item.type === "main");

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        const currentScrollY = window.scrollY;

        if (Math.abs(currentScrollY - lastScrollY.current) > 10) {
          setPopoverOpen(false);
        }

        if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        lastScrollY.current = currentScrollY;
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar, { passive: true });
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, []);

  return (
    <header
      className={cn(
        "fixed top-4 inset-x-0 z-50",
        "mx-auto max-w-[90%] sm:max-w-md md:max-w-fit",
        "transition-transform duration-300 ease-in-out",
        !isVisible && "-translate-y-[150%]",
        className
      )}
    >
      <div className="bg-background/90 text-foreground rounded-lg backdrop-blur-combined">
        <Popover open={isPopoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverAnchor asChild>
            <nav className="hidden md:flex items-center px-3 py-1.5 relative ">
              <ul className="flex items-center gap-1">
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/"
                      ? pathname === item.href
                      : pathname.startsWith(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "px-4 py-1.5 text-sm font-medium transition-colors",
                          isActive
                            ? "text-sky-400"
                            : "text-muted-foreground hover:text-primary"
                        )}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="h-5 w-px bg-foreground mx-3"></div>

              <div className="">
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className="px-4 py-1.5 text-sm font-medium text-muted-foreground hover:text-primary data-[state=open]:bg-zinc-700/50 data-[state=open]:text-primary rounded-md flex items-center gap-1"
                    aria-haspopup="dialog"
                    aria-expanded={isPopoverOpen}
                  >
                    More
                    <motion.span
                      animate={{ rotate: isPopoverOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </Button>
                </PopoverTrigger>

                <MorePopover
                  isPopoverOpen={isPopoverOpen}
                  pathname={pathname}
                />
              </div>
            </nav>
          </PopoverAnchor>
        </Popover>

        <div className="md:hidden flex items-center justify-between px-4 py-2">
          <Link href="/" className="text-base font-bold text-primary">
            <Image
              src="/logo.avif"
              width={32}
              height={32}
              className="rounded-full"
              alt="Logo"
            />
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon className="h-5 w-5 text-primary" />
            </button>
          </div>
        </div>
      </div>

      <MobileMenuPanel
        isMobileMenuOpen={isMobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        pathname={pathname}
      />
    </header>
  );
}
