import { allNavItems } from "@/lib/nav-items";
import { AnimatePresence, motion } from "framer-motion";
import { Wrench, X } from "lucide-react";
import { MobileNavLink } from "./MobileNav";

interface MobileMenuPanelProps {
  isMobileMenuOpen: boolean;
  setMobileMenuOpen: (isOpen: boolean) => void;
  pathname: string;
}

export default function MobileMenuPanel({
  isMobileMenuOpen,
  setMobileMenuOpen,
  pathname,
}: MobileMenuPanelProps) {
  const mobileNavItems = allNavItems.map((item) => {
    const Icon = item.icon || Wrench;
    return { ...item, icon: <Icon /> };
  });

  return (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="fixed inset-x-0 top-0 p-4 md:hidden"
        >
          <div className="bg-background/90 border border-zinc-700 rounded-2xl shadow-lg backdrop-blur-lg p-4">
            <div className="flex items-center justify-end mb-4">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-full text-primary hover:text-primary hover:bg-zinc-800 transition-colors -mr-2 -mt-2"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-col space-y-2">
              {mobileNavItems.map((item) => (
                <MobileNavLink
                  key={item.href}
                  href={item.href}
                  title={item.title}
                  description={item.description}
                  icon={item.icon}
                  onClick={() => setMobileMenuOpen(false)}
                  isActive={
                    item.href === "/"
                      ? pathname === item.href
                      : pathname.startsWith(item.href)
                  }
                />
              ))}
            </nav>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
