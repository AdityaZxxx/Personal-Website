"use client";

import { AIChatWidget } from "@/components/ai-chat-widget";
import { Footer } from "@/components/layout/Footer";
import { Toaster } from "@/components/ui/toaster";
import { usePathname } from "next/navigation";

export default function ConditionalComponents() {
  const pathname = usePathname();

  // Jangan render Footer di route /studio
  const shouldRenderFooter = !pathname.startsWith("/studio");

  // Jangan render AIChatWidget di blog/[slug]
  const shouldRenderChatWidget =
    !pathname.startsWith("/blog/") || pathname === "/blog";

  return (
    <>
      {shouldRenderFooter && <Footer />}
      <Toaster />
      {shouldRenderChatWidget && <AIChatWidget />}
    </>
  );
}
