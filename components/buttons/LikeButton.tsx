// components/LikeButton.tsx
"use client";

import { likePost, unlikePost } from "@/app/actions/like-post"; // ⬅️ server actions

import { Heart } from "lucide-react";
import { useEffect, useState, useTransition } from "react";

export function LikeButton({
  contentId,
  initialLikes,
}: {
  contentId: string;
  initialLikes: number;
}) {
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
    if (likedPosts.includes(contentId)) {
      setIsLiked(true);
    }
  }, [contentId]);

  const handleLikeToggle = () => {
    startTransition(async () => {
      const newIsLiked = !isLiked;
      const newLikes = newIsLiked ? likes + 1 : likes - 1;

      // Optimistic UI
      setIsLiked(newIsLiked);
      setLikes(newLikes);

      // LocalStorage update
      const likedPosts = JSON.parse(localStorage.getItem("likedPosts") || "[]");
      if (newIsLiked) {
        localStorage.setItem(
          "likedPosts",
          JSON.stringify([...likedPosts, contentId])
        );
      } else {
        localStorage.setItem(
          "likedPosts",
          JSON.stringify(likedPosts.filter((id: string) => id !== contentId))
        );
      }

      // Call server action langsung
      try {
        const data = newIsLiked
          ? await likePost(contentId)
          : await unlikePost(contentId);

        // Sinkronin likes real-time dari server
        setLikes(data.likeCount);
      } catch (error) {
        console.error("Failed to toggle like:", error);
        setIsLiked(!newIsLiked);
        setLikes(newIsLiked ? newLikes - 1 : newLikes + 1);
      }
    });
  };

  const formattedLikes = new Intl.NumberFormat("id-ID").format(likes);

  return (
    <button
      onClick={handleLikeToggle}
      disabled={isPending}
      className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400"
    >
      <div className="transition-all duration-200 ease-in-out transform">
        <Heart
          className={`h-4 w-4 ${isLiked ? "fill-red-500 text-red-500 scale-110" : "fill-none text-gray-600 dark:text-gray-400"} transition-all duration-200 ease-in-out`}
        />
      </div>
      <span>{formattedLikes}</span>
    </button>
  );
}
