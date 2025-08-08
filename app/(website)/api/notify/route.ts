import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const renderEmailTemplate = (newPost: any) => {
  return `
  <html>
  <body>
    <h1>New Blog Post</h1>
    <p>This is a test email to notify subscribers about a new blog post.</p>
  </body>
  </html>
  `;
};

// This API is currently not functional as it requires domain registration.
export async function POST(request: NextRequest) {
  try {
    const newPost = await request.json();

    const subscribers = "adityaofficial714@gmail.com";
    //  await client.fetch<string[]>(
    //   `*[_type == "subscriber"].email`
    // );
    console.log("ini subscriber", subscribers);
    if (subscribers.length === 0) {
      return NextResponse.json({ message: "No subscribers to notify." });
    }

    await resend.emails.send({
      from: "Your Name <onboarding@resend.dev>",
      to: subscribers,
      subject: `New Blog Post: ${newPost.title}`,
      html: renderEmailTemplate(newPost),
    });

    return NextResponse.json({ message: "Notifications sent successfully!" });
  } catch {
    return NextResponse.json(
      { message: "Error sending notifications." },
      { status: 500 }
    );
  }
}
