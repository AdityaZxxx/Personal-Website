import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import redis from "../../../lib/redis";

const resend = new Resend(process.env.RESEND_API_KEY);

// Enhanced email template with better styling
const renderEmailTemplate = (data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { color: #2563eb; font-size: 24px; margin-bottom: 20px; }
        .detail { margin-bottom: 15px; }
        .message { background: #f5f5f5; padding: 15px; border-radius: 5px; white-space: pre-line; }
        .footer { margin-top: 20px; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class="header">New Contact Form Submission</div>
    
    <div class="detail"><strong>Name:</strong> ${data.name}</div>
    <div class="detail"><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></div>
    <div class="detail"><strong>Subject:</strong> ${data.subject}</div>
    
    <div class="detail"><strong>Message:</strong></div>
    <div class="message">${data.message}</div>
    
    <div class="footer">
        This message was sent from your website contact form.
    </div>
</body>
</html>
`;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const ip = request.headers.get("x-forwarded-for") || "local";

    // Enhanced rate limiting with IP-based tracking
    const { limited, remaining } = await redis.checkRateLimit(ip, {
      limit: 10,
      window: 60,
      prefix: "contact_form",
    });

    if (limited) {
      throw new Error(`Too many requests. Try again in ${remaining} seconds.`);
    }

    // Enhanced validation schema matching your contact form
    const ContactFormSchema = z.object({
      name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name cannot exceed 50 characters")
        .regex(/^[a-zA-Z\s'-]+$/, "Invalid characters in name"),
      email: z
        .string()
        .email("Invalid email address")
        .endsWith(".com", "We currently only accept .com domains"),
      subject: z
        .string()
        .min(5, "Subject must be at least 5 characters")
        .max(100, "Subject cannot exceed 100 characters"),
      message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message cannot exceed 1000 characters")
        .refine(
          (val) => !/(http|www\.|\.com|\.net)/i.test(val),
          "Links are not allowed in messages"
        ),
      honeypot: z.string().max(0).optional(), // Hidden spam trap
    });

    const validatedData = ContactFormSchema.parse(body);

    // Honeypot validation
    if (validatedData.honeypot) {
      console.log("Bot detected via honeypot");
      return NextResponse.json({ success: true }); // Fake success for bots
    }

    // Send email with retry logic
    let retries = 0;
    const maxRetries = 2;
    let lastError = null;

    while (retries < maxRetries) {
      try {
        const data = await resend.emails.send({
          from: "Your Website Contact <onboarding@resend.dev>",
          to: ["adityaofficial714@gmail.com"],
          replyTo: validatedData.email, // So you can reply directly
          subject: `New Contact: ${validatedData.subject}`,
          html: renderEmailTemplate(validatedData),
          headers: {
            "X-Entity-Ref-ID": new Date().getTime().toString(),
          },
        });

        return NextResponse.json({
          success: true,
          message: "Your message has been sent successfully!",
          data,
        });
      } catch (error) {
        lastError = error;
        retries++;
        if (retries < maxRetries) {
          await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second before retry
        }
      }
    }

    throw lastError || new Error("Failed to send email after retries");
  } catch (error) {
    console.error("Contact Form Error:", error);

    // Enhanced error responses
    if (error instanceof z.ZodError) {
      const fieldErrors = error.errors.reduce(
        (acc, curr) => {
          acc[curr.path[0]] = curr.message;
          return acc;
        },
        {} as Record<string, string>
      );

      return NextResponse.json(
        {
          error: "Validation failed",
          message: "Please check your form inputs",
          fields: fieldErrors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        error: "Submission failed",
        message:
          "An error occurred while sending your message. Please try again later.",
      },
      { status: 500 }
    );
  }
}
