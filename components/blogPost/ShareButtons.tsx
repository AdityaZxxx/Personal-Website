"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
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

// --- PROPS ---
interface ShareButtonsProps {
  title: string;
  imageUrl?: string;
  description?: string;
}

// --- KONFIGURASI ---
const brandColors = {
  X: "hover:bg-[#1DA1F2] hover:text-white",
  Facebook: "hover:bg-[#1877F2] hover:text-white",
  LinkedIn: "hover:bg-[#0A66C2] hover:text-white",
  WhatsApp: "hover:bg-[#25D366] hover:text-white",
  Telegram: "hover:bg-[#2AABEE] hover:text-white",
  Email: "hover:bg-[#7f7f7f] hover:text-white",

  Reddit: "hover:bg-[#FF4500] hover:text-white",
};

const shareLinks = [
  {
    name: "X",
    icon: RiTwitterXFill,
    getUrl: (url: string, title: string) =>
      `https://x.com/intent/tweet?text=${encodeURIComponent(`${title} by @adxxya30`)}&url=${encodeURIComponent(url)}`,
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    getUrl: (url: string, title: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(title)}`,
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    getUrl: (url: string) =>
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: "WhatsApp",
    icon: FaWhatsapp,
    getUrl: (url: string, title: string) =>
      `https://wa.me/?text=${encodeURIComponent(`${title}\n\n${url}`)}`,
  },
  {
    name: "Telegram",
    icon: FaTelegram,
    getUrl: (url: string, title: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: "Email",
    icon: Mail,
    getUrl: (url: string, title: string) =>
      `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`Check out this article:\n\n${url}`)}`,
  },
  {
    name: "Reddit",
    icon: FaReddit,
    getUrl: (url: string, title: string) =>
      `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
];

export function ShareButtons({
  title,
  imageUrl,
  description,
}: ShareButtonsProps) {
  const pathname = usePathname();
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [isShareApiAvailable, setIsShareApiAvailable] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      setIsShareApiAvailable(true);
    }
  }, []);

  useEffect(() => {
    setUrl(window.location.origin + pathname);
  }, [pathname]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "✅ Link copied",
        description: "Link has been copied to your clipboard.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "❎ Failed to copy",
        description: "Could not copy the link.",
        variant: "destructive",
      });
    }
  };

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: title,
        text: description,
        url: url,
      });
    } catch (error) {
      console.error("Error using Web Share API:", error);
      await copyToClipboard();
    }
  };

  if (!url) {
    return (
      <div className="h-16 w-full animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg" />
    );
  }

  if (isShareApiAvailable) {
    return (
      <div className="space-y-3">
        <h4 className="text-lg font-medium">Share this post</h4>
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
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
            aria-label="Copy link"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Link2 className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h4 className="text-lg font-medium">Share this post</h4>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((link) => {
          return (
            <a
              key={link.name}
              href={link.getUrl(url, title)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${link.name}`}
            >
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  "transition-colors",
                  brandColors[link.name as keyof typeof brandColors]
                )}
              >
                <link.icon className="h-4 w-4" />
              </Button>
            </a>
          );
        })}

        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          className="relative transition-colors"
          aria-label="Copy link"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Link2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
