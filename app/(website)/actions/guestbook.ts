"use server";

import { writeClient } from "@/lib/sanity/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function addGuestbookEntry(formData: FormData) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    throw new Error("You must be logged in to sign the guestbook.");
  }

  const message = formData.get("message") as string;
  const authorEmail = formData.get("authorEmail") as string;

  if (!message || message.trim().length === 0) {
    throw new Error("Message cannot be empty.");
  }

  const newEntry = {
    _type: "guestbookEntry",
    authorName: session.user.name,
    authorImage: session.user.image,
    authorEmail: authorEmail,
    message: message.slice(0, 500),
  };

  try {
    await writeClient.create(newEntry);

    revalidatePath("/guestbook");

    return { success: true };
  } catch (error) {
    return { success: false, error: "Failed to save message." };
  }
}
