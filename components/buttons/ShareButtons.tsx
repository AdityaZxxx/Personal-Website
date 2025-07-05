"use client";

import ShareButtonsSkeleton from "@/components/skeletons/ShareButtonsSkeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Link2, Mail, Share2 } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FaFacebook,
  FaLinkedin,
  FaReddit,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { toast } from "sonner";

// --- PROPS ---
interface ShareButtonsProps {
  title: string;
  description?: string;
}

// --- KONFIGURASI ---
// PERBAIKAN: hoverClass sekarang juga mengontrol border untuk tampilan yang lebih bersih
const brandConfig = {
  X: {
    icon: RiTwitterXFill,
    hoverClass: "hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]",
    getUrl: (url: string, title: string) =>
      `https://x.com/intent/tweet?text=${encodeURIComponent(`${title} by @adxxya30`)}&url=${encodeURIComponent(url)}`,
  },
  Facebook: {
    icon: FaFacebook,
    hoverClass: "hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2]",
    getUrl: (url: string, title: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
  },
  LinkedIn: {
    icon: FaLinkedin,
    hoverClass: "hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]",
    getUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  WhatsApp: {
    icon: FaWhatsapp,
    hoverClass: "hover:bg-[#25D366] hover:text-white hover:border-[#25D366]",
    getUrl: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${url}`)}`,
  },
  Telegram: {
    icon: FaTelegram,
    hoverClass: "hover:bg-[#2AABEE] hover:text-white hover:border-[#2AABEE]",
    getUrl: (url: string, title: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  Email: {
    icon: Mail,
    hoverClass: "hover:bg-[#7f7f7f] hover:text-white hover:border-[#7f7f7f]",
    getUrl: (url: string, title: string) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article:\n\n${url}`)}`,
  },
  Reddit: {
    icon: FaReddit,
    hoverClass: "hover:bg-[#FF4500] hover:text-white hover:border-[#FF4500]",
    getUrl: (url: string, title: string) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
};

// --- Komponen Tombol Share Individual (Telah Diperbaiki) ---
const ShareButton = ({
  name,
  url,
  title,
}: {
  name: keyof typeof brandConfig;
  url: string;
  title: string;
}) => {
  const config = brandConfig[name];
  return (
    <a
      href={config.getUrl(url, title)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Share on ${name}`}
    >
      <button
        className={cn(
          "p-2 rounded-full border transition-colors duration-300",
          "text-foreground",
          config.hoverClass
        )}
      >
        <config.icon className="h-4 w-4" />
      </button>
    </a>
  );
};

// --- KOMPONEN UTAMA ---
export function ShareButtons({ title, description }: ShareButtonsProps) {
  const pathname = usePathname();
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isShareApiAvailable, setIsShareApiAvailable] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (typeof navigator !== "undefined" && "share" in navigator) {
      setIsShareApiAvailable(true);
    }
    setUrl(window.location.origin + pathname);
  }, [pathname]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success("Link has been copied to your clipboard.");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Could not copy the link.");
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({ title, text: description, url });
    } catch (error) {
      console.error("Error using Web Share API:", error);
      await copyToClipboard();
    }
  };

  if (!isMounted) {
    return <ShareButtonsSkeleton />;
  }

  return (
    <div className="space-y-4 bg-transparent">
      <h3 className="text-lg font-semibold text-primary">Share this post</h3>

      {isShareApiAvailable ? (
        <div className="flex gap-2">
          <Button
            onClick={handleNativeShare}
            className="w-full"
            variant="outline"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share via...
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-foreground"
            onClick={copyToClipboard}
            aria-label="Copy link"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "check" : "link"}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Link2 className="h-4 w-4" />
                )}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {Object.keys(brandConfig).map((name) => (
            <ShareButton
              key={name}
              name={name as keyof typeof brandConfig}
              url={url}
              title={title}
            />
          ))}
          <Button
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
            aria-label="Copy link"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={copied ? "check" : "link"}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Link2 className="h-4 w-4" />
                )}
              </motion.span>
            </AnimatePresence>
          </Button>
        </div>
      )}
    </div>
  );
}
