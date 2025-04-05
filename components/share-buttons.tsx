"use client"

import { usePathname } from "next/navigation"
import { Twitter, Facebook, Linkedin, Link2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

interface ShareButtonsProps {
  title: string
}

export function ShareButtons({ title }: ShareButtonsProps) {
  const pathname = usePathname()
  const url = typeof window !== "undefined" ? `${window.location.origin}${pathname}` : ""

  const shareLinks = [
    {
      name: "Twitter",
      icon: Twitter,
      getUrl: () => `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: "Facebook",
      icon: Facebook,
      getUrl: () => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      getUrl: () => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    },
  ]

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast({
        title: "Link copied",
        description: "The link has been copied to your clipboard.",
      })
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Could not copy the link to your clipboard.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Share this post</h3>
      <div className="flex gap-2">
        {shareLinks.map((link) => (
          <Button key={link.name} variant="outline" size="icon" onClick={() => window.open(link.getUrl(), "_blank")}>
            <link.icon className="h-4 w-4" />
            <span className="sr-only">Share on {link.name}</span>
          </Button>
        ))}
        <Button variant="outline" size="icon" onClick={copyToClipboard}>
          <Link2 className="h-4 w-4" />
          <span className="sr-only">Copy link</span>
        </Button>
      </div>
    </div>
  )
}

