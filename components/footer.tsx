"use client";

import { cn } from "@/lib/utils";
import { Github, Mail } from "lucide-react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { CustomLogo } from "./custom-logo";

const currentYear = new Date().getFullYear();

const footerLinks = {
  quickLinks: [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/gallery", label: "Gallery" },
  ],
  connect: [
    {
      href: "https://github.com/AdityaZxxx",
      label: "GitHub",
      icon: <Github className="w-4 h-4" />,
    },
    {
      href: "https://x.com/adxxya30",
      label: "Twitter / X",
      icon: <CustomLogo className="w-4 h-4" />,
    },
    {
      href: "https://instagram.com/adxxya30",
      label: "Instagram",
      icon: <FaInstagram className="w-4 h-4" />,
    },
    {
      href: "mailto:adityaofficial714@gmail.com",
      label: "Email",
      icon: <Mail className="w-4 h-4" />,
    },
  ],
  legal: [
    { href: "/terms", label: "Terms of Service" },
    { href: "/privacy", label: "Privacy Policy" },
  ],
};

export function Footer() {
  return (
    <footer
      className={cn(
        "w-full z-10 border-t",
        "bg-background/80 backdrop-blur-md",
        "border-gray-200/50 dark:border-gray-700/50",
        "shadow-lg dark:shadow-gray-900/30",
        "min-h-[400px] py-10 sm:py-12 px-4 sm:px-6",
        "flex flex-col"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand Section */}
          <div className="sm:col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "h-10 w-10 flex items-center justify-center rounded-lg",
                  "bg-gradient-to-br from-blue-500 to-purple-600",
                  "shadow-md hover:shadow-lg transition-shadow"
                )}
              >
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span
                className={cn(
                  "font-bold text-xl sm:text-2xl",
                  "bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
                )}
              >
                Aditya
              </span>
            </div>
            <p
              className={cn(
                "text-muted-foreground text-sm sm:text-base",
                "pl-3 border-l-4 border-purple-500/20",
                "hover:border-purple-500/50 transition-colors",
                "py-1 px-3"
              )}
            >
              Creative portfolio showcasing my projects and blog.
            </p>
          </div>

          {/* Quick Links */}
          <FooterSection title="Quick Links" links={footerLinks.quickLinks} />

          {/* Connect Section */}
          <FooterSection
            title="Connect"
            links={footerLinks.connect}
            iconLinks
          />

          {/* Legal Section */}
          <FooterSection title="Legal" links={footerLinks.legal} />
        </div>

        {/* Divider */}
        <div
          className={cn(
            "shrink-0 h-px w-full my-8",
            "bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"
          )}
        />

        {/* Copyright and Social Icons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Aditya. All rights reserved.
          </p>
          <div className="flex gap-4">
            {footerLinks.connect.map((link) => (
              <SocialIconLink
                key={link.href}
                href={link.href}
                ariaLabel={link.label}
              >
                {link.icon}
              </SocialIconLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterSection({
  title,
  links,
  iconLinks = false,
}: {
  title: string;
  links: Array<{ href: string; label: string; icon?: React.ReactNode }>;
  iconLinks?: boolean;
}) {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-base sm:text-lg">{title}</h3>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className={cn(
                "text-muted-foreground hover:text-foreground transition-colors",
                "text-sm sm:text-base",
                "flex items-center gap-2",
                iconLinks
                  ? "justify-start"
                  : "justify-start sm:justify-end md:justify-start"
              )}
            >
              {iconLinks && link.icon}
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIconLink({
  href,
  children,
  ariaLabel,
}: {
  href: string;
  children: React.ReactNode;
  ariaLabel: string;
}) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        "text-muted-foreground hover:text-foreground transition-colors",
        "p-2 rounded-full hover:bg-accent"
      )}
    >
      {children}
    </Link>
  );
}
