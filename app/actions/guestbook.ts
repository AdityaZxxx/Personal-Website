"use server";

import { writeClient } from "@/lib/sanity/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { authOptions } from "../api/auth/[...nextauth]/route";

export async function addGuestbookEntry(formData: FormData) {
  const session = await getServerSession(authOptions);

  // 1. Validasi: Pastikan pengguna sudah login
  if (!session?.user) {
    throw new Error("You must be logged in to sign the guestbook.");
  }

  const message = formData.get("message") as string;
  const authorEmail = formData.get("authorEmail") as string;

  // 2. Validasi: Pastikan pesan tidak kosong
  if (!message || message.trim().length === 0) {
    throw new Error("Message cannot be empty.");
  }

  // 3. Siapkan data untuk disimpan ke Sanity
  const newEntry = {
    _type: "guestbookEntry",
    authorName: session.user.name,
    authorImage: session.user.image,
    authorEmail: authorEmail,
    message: message.slice(0, 500), // Batasi panjang pesan
  };

  try {
    // 4. Buat dokumen baru di Sanity
    await writeClient.create(newEntry);

    // 5. Revalidasi halaman agar pesan baru langsung muncul
    revalidatePath("/guestbook");

    return { success: true };
  } catch (error) {
    console.error("Error creating guestbook entry:", error);
    return { success: false, error: "Failed to save message." };
  }
}
