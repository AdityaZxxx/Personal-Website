"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface MobileNavLinkProps {
  href: string;
  title: string;
  description?: string;
  icon: React.ReactNode;
  onClick: () => void;
  isActive?: boolean;
}

export const MobileNavLink = React.memo(function MobileNavLink({
  href,
  title,
  description = "",
  icon,
  onClick,
  isActive,
}: MobileNavLinkProps) {
  const pathname = usePathname();
  const isCurrent =
    isActive !== undefined
      ? isActive
      : href === "/"
        ? pathname === href
        : pathname.startsWith(href);

  return (
    <motion.div
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full px-2 py-1"
    >
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "group flex w-full items-start gap-3 rounded-lg p-1 transition-colors",
          "bg-background/50 hover:bg-background",
          isCurrent && "bg-background/70"
        )}
        aria-current={isCurrent ? "page" : undefined}
      >
        <div
          className={cn(
            "mt-0.5 flex h-5 w-5 items-center justify-center rounded-lg",
            "bg-background text-muted-foreground group-hover:bg-background",
            isCurrent && "text-sky-400"
          )}
        >
          {icon}
        </div>

        <div className="flex-grow">
          <div className="flex items-center justify-between">
            <p
              className={cn(
                "font-normal text-primary",
                !isCurrent &&
                  "group-hover:underline decoration-neutral-400 underline-offset-4"
              )}
            >
              {title}
            </p>
            {isCurrent && (
              <span className="rounded-full bg-sky-500/10 px-2 py-0.5 text-xs font-medium text-sky-400">
                Current
              </span>
            )}
          </div>
          {description && (
            <p className="mt-0.5 text-xs text-muted-foreground">
              {description}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
});

MobileNavLink.displayName = "MobileNavLink";
