"use server";

import { writeClient } from "@/lib/sanity/client";
import { revalidatePath } from "next/cache";

export async function deleteMessage(id: string) {
  try {
    await writeClient.delete(id);
    revalidatePath("/guestbook");
    return { success: true };
  } catch (error) {
    console.error("Error deleting message:", error);
    return { success: false };
  }
}
