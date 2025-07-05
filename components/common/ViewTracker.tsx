"use client";

import { updateViewCount } from "@/app/actions/update-view";
import { useEffect } from "react";

export function ViewTracker({
  contentId,
  docType,
}: {
  contentId: string;
  docType: "post" | "short";
}) {
  useEffect(() => {
    const viewedKey = `viewed_${docType}_${contentId}`;
    const hasViewed = sessionStorage.getItem(viewedKey);

    if (!hasViewed) {
      updateViewCount(contentId, docType)
        .then(() => {
          sessionStorage.setItem(viewedKey, "true");
        })
        .catch((err) => {
          console.error("Failed to update view count:", err);
        });
    }
  }, [contentId, docType]);

  return null;
}
