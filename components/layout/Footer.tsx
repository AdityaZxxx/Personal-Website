import { cn } from "@/lib/utils";
import { Github, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { CustomLogo } from "../custom-logo";

const currentYear = new Date().getFullYear();

const footerLinks = {
  quickLinks: [
    { href: "/about", label: "About" },
    { href: "/projects", label: "Projects" },
    { href: "/blog", label: "Blog" },
    { href: "/gallery", label: "Gallery" },
    { href: "/contact", label: "Contact" },
  ],
  connect: [
    {
      href: "https://github.com/AdityaZxxx",
      label: "GitHub",
      icon: <Github className="w-4 h-4" aria-hidden="true" />,
    },
    {
      href: "https://x.com/adxxya30",
      label: "Twitter / X",
      icon: <CustomLogo className="w-4 h-4" aria-hidden="true" />,
    },
    {
      href: "https://instagram.com/adxxya30",
      label: "Instagram",
      icon: <FaInstagram className="w-4 h-4" aria-hidden="true" />,
    },
    {
      href: "mailto:adityaofficial714@gmail.com",
      label: "Email",
      icon: <Mail className="w-4 h-4" aria-hidden="true" />,
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
        "bg-background/95 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80",
        "border-gray-200/50 dark:border-gray-700/50",
        "shadow-sm dark:shadow-gray-900/20",
        "min-h-[400px] py-10 sm:py-12 px-4 sm:px-6",
        "flex flex-col"
      )}
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand Section */}
          <div className="md:col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.jpg"
                alt="Aditya's Logo"
                width={40}
                height={40}
                className="w-10 h-10 rounded-full"
                priority={false}
                loading="lazy"
              />
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
                "hover:border-purple-500/50 transition-colors duration-300",
                "py-1 px-3"
              )}
            >
              Creative portfolio showcasing my projects and blog.
            </p>
          </div>

          {/* Quick Links */}
          <FooterSection
            title="Quick Links"
            links={footerLinks.quickLinks}
            aria-labelledby="quick-links-heading"
          />

          {/* Connect Section */}
          <FooterSection
            title="Connect"
            links={footerLinks.connect}
            iconLinks
            aria-labelledby="connect-heading"
          />

          {/* Legal Section */}
          <FooterSection
            title="Legal"
            links={footerLinks.legal}
            aria-labelledby="legal-links-heading"
          />
        </div>

        {/* Divider */}
        <div
          className={cn(
            "shrink-0 h-px w-full my-8 sm:my-10",
            "bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"
          )}
          aria-hidden="true"
        />

        {/* Copyright and Social Icons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm text-center sm:text-left">
            © {currentYear} Aditya. All rights reserved.
          </p>
          <div className="flex gap-2 sm:gap-4">
            {footerLinks.connect.map((link) => (
              <SocialIconLink
                key={link.href}
                href={link.href}
                ariaLabel={`Connect on ${link.label}`}
              >
                {link.icon}
                <span className="sr-only">{link.label}</span>
              </SocialIconLink>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

interface FooterSectionProps {
  title: string;
  links: Array<{ href: string; label: string; icon?: React.ReactNode }>;
  iconLinks?: boolean;
  ["aria-labelledby"]?: string;
}

function FooterSection({
  title,
  links,
  iconLinks = false,
  "aria-labelledby": ariaLabelledBy,
}: FooterSectionProps) {
  return (
    <div className="space-y-4">
      <h3 id={ariaLabelledBy} className="font-semibold text-base sm:text-lg">
        {title}
      </h3>
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
                "text-muted-foreground hover:text-foreground transition-colors duration-200",
                "text-sm sm:text-base",
                "flex items-center gap-2",
                iconLinks ? "hover:underline" : "hover:translate-x-1"
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

interface SocialIconLinkProps {
  href: string;
  children: React.ReactNode;
  ariaLabel: string;
}

function SocialIconLink({ href, children, ariaLabel }: SocialIconLinkProps) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className={cn(
        "text-muted-foreground hover:text-foreground transition-colors duration-200",
        "p-2 rounded-full hover:bg-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      )}
    >
      {children}
    </Link>
  );
}
