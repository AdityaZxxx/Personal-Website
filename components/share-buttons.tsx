"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Check, Facebook, Link2, Linkedin, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaPinterest, FaReddit, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { CustomLogo } from "./custom-logo";

interface ShareButtonsProps {
  title: string;
  imageUrl?: string; // Add image URL for sharing
  description?: string; // Optional description for sharing
}

export function ShareButtons({
  title,
  imageUrl,
  description,
}: ShareButtonsProps) {
  const pathname = usePathname();
  const url =
    typeof window !== "undefined" ? `${window.location.origin}${pathname}` : "";
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: "X",
      icon: CustomLogo,
      getUrl: () =>
        `https://x.com/intent/tweet?text=${encodeURIComponent(
          `${title} ${description ? `- ${description}` : ""}`
        )}&url=${encodeURIComponent(url)}${
          imageUrl ? `&media=${encodeURIComponent(imageUrl)}` : ""
        }`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      getUrl: () =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}&quote=${encodeURIComponent(title)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      getUrl: () =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          url
        )}`,
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      getUrl: () => {
        const text = `${title}${
          description ? `\n\n${description}` : ""
        }\n\n${url}`;
        return `https://wa.me/?text=${encodeURIComponent(text)}`;
      },
    },
    {
      name: "Telegram",
      icon: FaTelegram,
      getUrl: () =>
        `https://t.me/share/url?url=${encodeURIComponent(
          url
        )}&text=${encodeURIComponent(title)}`,
    },
    {
      name: "Email",
      icon: Mail,
      getUrl: () => {
        const subject = title;
        const body = `${description ? `${description}\n\n` : ""}${url}`;
        return `mailto:?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
      },
    },
    {
      name: "Pinterest",
      icon: FaPinterest,
      getUrl: () =>
        imageUrl
          ? `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
              url
            )}&media=${encodeURIComponent(
              imageUrl
            )}&description=${encodeURIComponent(title)}`
          : `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(
              url
            )}&description=${encodeURIComponent(title)}`,
    },
    {
      name: "Reddit",
      icon: FaReddit,
      getUrl: () =>
        `https://www.reddit.com/submit?url=${encodeURIComponent(
          url
        )}&title=${encodeURIComponent(title)}`,
    },
  ];

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast({
        title: "✅ Link copied",
        description: "The link has been copied to your clipboard.",
      });

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      toast({
        title: "❎ Failed to copy",
        description: "Could not copy the link to your clipboard.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-3">
      <h4 className="text-lg font-medium">Share this post</h4>
      <div className="flex flex-wrap gap-2">
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            size="icon"
            rel="noopener noreferrer"
            onClick={() => window.open(link.getUrl(), "_blank")}
            className="hover:bg-accent/50 transition-colors"
            aria-label={`Share on ${link.name}`}
          >
            <link.icon className="h-4 w-4" />
          </Button>
        ))}

        {/* Fallback copy button */}
        {/* {(!navigator.share || typeof navigator === "undefined") && ( */}
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          className="relative hover:bg-accent/50 transition-colors"
          aria-label="Copy link"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Link2 className="h-4 w-4" />
          )}
        </Button>
        {/* )} */}
      </div>
    </div>
  );
}
