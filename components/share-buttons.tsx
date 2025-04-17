"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Check, Facebook, Link2, Linkedin, Twitter } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

interface ShareButtonsProps {
  title: string;
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const pathname = usePathname();
  const url =
    typeof window !== "undefined" ? `${window.location.origin}${pathname}` : "";
  const [copied, setCopied] = useState(false);

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      getUrl: () =>
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      getUrl: () =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`,
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
      name: "Whatsapp",
      icon: FaWhatsapp,
      getUrl: () =>
        `https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`,
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

      // Reset the copied state after 2 seconds
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
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Share this post</h3>
      <div className="flex gap-2">
        {shareLinks.map((link) => (
          <Button
            key={link.name}
            variant="outline"
            size="icon"
            rel="noopener noreferrer"
            onClick={() => window.open(link.getUrl(), "_blank")}
          >
            <link.icon className="h-4 w-4" />
            <span className="sr-only">Share on {link.name}</span>
          </Button>
        ))}
        <Button
          variant="outline"
          size="icon"
          onClick={copyToClipboard}
          className="relative"
          rel="noopener noreferrer"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Link2 className="h-4 w-4" />
          )}
          <span className="sr-only">Copy link</span>
        </Button>
      </div>
    </div>
  );
}
