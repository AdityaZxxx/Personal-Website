// app/api/notify/route.ts
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { client } from "../../../lib/sanity/client";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // 1. Terima data post yang baru dipublikasikan dari Sanity
    const newPost = await request.json();

    // 2. Ambil semua email subscriber dari Sanity
    const subscribers = await client.fetch<string[]>(
      `*[_type == "subscriber"].email`
    );

    if (subscribers.length === 0) {
      return NextResponse.json({ message: "No subscribers to notify." });
    }

    // 3. Kirim email ke semua subscriber
    await resend.emails.send({
      from: "Your Name <newsletter@yourdomain.com>", // Ganti dengan domain terverifikasi di Resend
      to: subscribers, // Resend bisa mengirim ke array email
      subject: `New Blog Post: ${newPost.title}`,
      html: `
        <h1>${newPost.title}</h1>
        <p>A new post has been published on my blog. Check it out!</p>
        <a href="https://adxxya30.vercel.app/blog/${newPost.slug}">Read Now</a>
      `,
    });

    return NextResponse.json({ message: "Notifications sent successfully!" });
  } catch (error) {
    return NextResponse.json(
      { message: "Error sending notifications." },
      { status: 500 }
    );
  }
}
