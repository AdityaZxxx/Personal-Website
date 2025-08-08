"use server";

import { writeClient } from "@/lib/sanity/client";

export async function updateViewCount(
  contentId: string,
  docType: "post" | "short"
) {
  if (!contentId || !docType) {
    throw new Error("Post ID and Document Type are required");
  }

  if (!["post", "short"].includes(docType)) {
    throw new Error("Invalid Document Type");
  }

  try {
    const updatedPost = await writeClient
      .patch(contentId)
      .setIfMissing({ viewCount: 0 })
      .inc({ viewCount: 1 })
      .commit();

    return {
      viewCount: updatedPost.viewCount,
    };
  } catch (err) {
    throw new Error("Failed to update view count");
  }
}
