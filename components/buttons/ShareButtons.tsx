"use client";

import ShareButtonsSkeleton from "@/components/skeletons/ShareButtonsSkeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { CheckIcon, Link2Icon, MailIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaReddit,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { toast } from "sonner";

interface ShareButtonsProps {
  title: string;
}

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
    icon: MailIcon,
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
  Instagram: {
    icon: FaInstagram,
    hoverClass: "hover:bg-[#E4405F] hover:text-white hover:border-[#E4405F]",
    getUrl: (url: string, title: string) => "#",
  },
};

const ShareButton = ({
  name,
  url,
  title,
  onClick,
}: {
  name: keyof typeof brandConfig;
  url: string;
  title: string;
  onClick?: () => void;
}) => {
  const config = brandConfig[name];
  return (
    <a
      href={onClick ? undefined : config.getUrl(url, title)}
      target={onClick ? undefined : "_blank"}
      rel={onClick ? undefined : "noopener noreferrer"}
      aria-label={`Share on ${name}`}
      onClick={onClick}
    >
      <button
        className={cn(
          "p-2 rounded-full border transition-colors duration-300",
          "text-foreground cursor-pointer",
          config.hoverClass
        )}
      >
        <config.icon className="h-4 w-4" />
      </button>
    </a>
  );
};

export function ShareButtons({ title }: ShareButtonsProps) {
  const pathname = usePathname();
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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

  const handleInstagramShare = async () => {
    await copyToClipboard();
    toast.info("Link copied! Paste it in your Instagram story or post.");
  };

  if (!isMounted) {
    return <ShareButtonsSkeleton />;
  }

  return (
    <div className="space-y-4 bg-transparent overflow-hidden">
      <h3 className="text-lg font-semibold text-primary">Share this post</h3>

      <div className="flex flex-wrap gap-2">
        {Object.keys(brandConfig).map((name) => (
          <ShareButton
            key={name}
            name={name as keyof typeof brandConfig}
            url={url}
            title={title}
            onClick={name === "Instagram" ? handleInstagramShare : undefined}
          />
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          aria-label="Copy link"
          className="cursor-pointer"
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
                <CheckIcon className="h-4 w-4 text-green-500" />
              ) : (
                <Link2Icon className="h-4 w-4" />
              )}
            </motion.span>
          </AnimatePresence>
        </Button>
      </div>
    </div>
  );
}
