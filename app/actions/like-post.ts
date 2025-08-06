"use server";

import { writeClient } from "@/lib/sanity/client";

export async function likePost(contentId: string) {
  if (!contentId) throw new Error("Post ID is required");

  try {
    const updatedPost = await writeClient
      .patch(contentId)
      .setIfMissing({ likeCount: 0 })
      .inc({ likeCount: 1 })
      .commit();

    return { likeCount: updatedPost.likeCount };
  } catch (error) {
    console.error("Error updating like count:", error);
    throw new Error("Error updating like count");
  }
}

export async function unlikePost(contentId: string) {
  if (!contentId) throw new Error("Post ID is required");

  try {
    const updatedPost = await writeClient
      .patch(contentId)
      .setIfMissing({ likeCount: 0 })
      .dec({ likeCount: 1 })
      .commit();

    return { likeCount: updatedPost.likeCount };
  } catch (error) {
    console.error("Error updating unlike count:", error);
    throw new Error("Error updating unlike count");
  }
}
