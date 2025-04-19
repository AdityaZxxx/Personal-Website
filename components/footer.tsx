import { Github, Mail } from "lucide-react";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";
import { CustomLogo } from "./custom-logo";

export function Footer() {
  return (
    <footer
      className="w-full z-10 
    backdrop-blur-md bg-gray-100/80 dark:bg-muted/60
    border-t border-gray-200/50 dark:border-gray-700/50
    shadow-xl dark:shadow-gray-900/30
    h-screen md:h-auto min-h-[400px] pb-5 py-10 md:pt-10 sm:pt-8 px-4 md:px-6
    flex flex-col"
    >
      <div className="section-container mx-auto px-4 sm:px-6 pt-5 pb-2">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {/* Enhanced Brand Section */}
          <div className="col-span-2 sm:col-span-2 md:col-span-1 mb-4 md:mb-0">
            <div className="flex items-center gap-3 mb-4 sm:mb-5">
              <div className="h-10 w-10 sm:h-12 sm:w-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md hover:shadow-lg transition-shadow duration-300">
                <span className="text-white font-bold text-lg sm:text-xl">
                  A
                </span>
              </div>
              <span className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Aditya
              </span>
            </div>
            <p className="text-gray-600 text-sm sm:text-base pl-3 border-l-4 border-purple-500/20 hover:border-purple-500/50 transition-colors duration-300 py-1 px-3">
              Creative portfolio showcasing my projects and blog.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-4">
              Quick Links
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground text-center md:text-right hover:text-foreground transition-colors text-sm sm:text-base"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/projects"
                  className="text-muted-foreground text-center md:text-right hover:text-foreground transition-colors text-sm sm:text-base"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-muted-foreground text-center md:text-right hover:text-foreground transition-colors text-sm sm:text-base"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/gallery"
                  className="text-muted-foreground text-center md:text-right hover:text-foreground transition-colors text-sm sm:text-base"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-4">
              Connect
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link
                  href="https://github.com/AdityaZxxx"
                  aria-label="GitHub"
                  target="_blank"
                  className="text-muted-foreground text-center md:text-right hover:text-foreground transition-colors text-sm sm:text-base"
                >
                  GitHub
                </Link>
              </li>
              <li>
                <Link
                  href="https://x.com/adxxya30"
                  aria-label="X"
                  target="_blank"
                  className="text-muted-foreground text-center md:text-right hover:text-foreground transition-colors text-sm sm:text-base"
                >
                  Twitter / X
                </Link>
              </li>
              <li>
                <Link
                  href="https://instagram.com/adxxya30"
                  aria-label="Instagram"
                  target="_blank"
                  className="text-muted-foreground text-center md:text-right hover:text-foreground transition-colors text-sm sm:text-base"
                >
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:adityaofficial714@gmail.com"
                  aria-label="Email"
                  className="text-muted-foreground text-center md:text-right hover:text-foreground transition-colors text-sm sm:text-base"
                >
                  Email
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Section */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-2 sm:mb-4">
              Legal
            </h3>
            <ul className="space-y-1 sm:space-y-2">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground text-center md:text-right hover:text-foreground transition-colors text-sm sm:text-base"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground text-center md:text-right hover:text-foreground transition-colors text-sm sm:text-base"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="shrink-0 bg-gray-400 dark:bg-gray-800 h-px w-full my-6 sm:my-8"></div>

        {/* Copyright and Social Icons */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm sm:text-base text-center sm:text-left">
            © {new Date().getFullYear()} Aditya. All rights reserved.
          </p>
          <div className="flex gap-4 mt-4 sm:mt-0">
            <Link
              href="https://github.com/AdityaZxxx"
              target="_blank"
              className="text-xs text-muted-foreground text-center md:text-right hover:text-foreground transition-colors"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link
              href="https://x.com/adxxya30"
              target="_blank"
              className="text-xs text-muted-foreground text-center md:text-right hover:text-foreground transition-colors"
            >
              <CustomLogo className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link
              href="https://instagram.com/adxxya30"
              target="_blank"
              className="text-xs text-muted-foreground text-center md:text-right hover:text-foreground transition-colors"
            >
              <FaInstagram className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
            <Link
              href="mailto:adityaofficial714@gmail.com"
              className="text-xs text-muted-foreground text-center md:text-right hover:text-foreground transition-colors"
            >
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
