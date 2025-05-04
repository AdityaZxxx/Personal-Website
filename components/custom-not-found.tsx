"use client";

import { Button } from "@/components/ui/button";
import { Home, RotateCw, Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface NotFoundProps {
  /**
   * Custom message to display
   * @default "No items found"
   */
  message?: string;
  /**
   * Type of content not found (used in default message)
   */
  type?: "post" | "gallery" | "page" | "item";
  /**
   * Show refresh button
   * @default true
   */
  showRefresh?: boolean;
  /**
   * Show home button
   * @default true
   */
  showHome?: boolean;
  /**
   * Custom home URL
   * @default "/"
   */
  homeUrl?: string;
  /**
   * Custom icon
   */
  icon?: React.ReactNode;
  /**
   * Additional actions to display
   */
  actions?: React.ReactNode;
}

export function NotFound({
  message,
  type = "item",
  showRefresh = true,
  showHome = true,
  homeUrl = "/",
  icon,
  actions,
}: NotFoundProps) {
  const router = useRouter();
  const defaultMessages = {
    post: "No posts found",
    gallery: "No gallery items found",
    page: "Page not found",
    item: "No items found",
  };

  const displayMessage = message || defaultMessages[type];

  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-6">
      <div className="relative">
        {icon || (
          <>
            <Search className="h-16 w-16 text-muted-foreground opacity-50" />
            <div className="absolute -inset-4 rounded-full bg-muted/50 animate-pulse" />
          </>
        )}
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-xl font-medium text-foreground">
          {type === "page" ? "404" : "Oops!"}
        </h3>
        <p className="text-muted-foreground max-w-md">
          {displayMessage}.{" "}
          {type !== "page" && "Try adjusting your search or check back later."}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 justify-center">
        {showRefresh && (
          <Button
            onClick={() => window.location.reload()}
            variant="default"
            className="gap-2"
          >
            <RotateCw className="h-4 w-4" />
            Refresh
          </Button>
        )}

        {showHome && (
          <Button
            onClick={() => router.push(homeUrl)}
            variant="outline"
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Go Home
          </Button>
        )}

        {actions}
      </div>
    </div>
  );
}

// Variants for common use cases
export function PostNotFound(props: Omit<NotFoundProps, "type">) {
  return <NotFound type="post" {...props} />;
}

export function GalleryNotFound(props: Omit<NotFoundProps, "type">) {
  return <NotFound type="gallery" {...props} />;
}

export function PageNotFound(props: Omit<NotFoundProps, "type">) {
  return <NotFound type="page" {...props} />;
}
