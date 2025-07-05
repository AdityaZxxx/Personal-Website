import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

export async function POST(request: Request) {
  const { message } = await request.json();

  if (!process.env.GEMINI_API_KEY) {
    return new Response(
      JSON.stringify({ error: "GEMINI_API_KEY is not set" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  // Validasi pesan yang diterima
  if (typeof message !== "string" || message.trim() === "") {
    return new Response(
      JSON.stringify({ error: "Invalid or empty message provided" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  const google = createGoogleGenerativeAI({
    apiKey: process.env.GEMINI_API_KEY,
  });

  // TODO: Anda perlu menyediakan konteks tentang diri Anda di sini.
  // Ini adalah contoh placeholder. Ganti dengan informasi relevan tentang Anda.
  const aboutMeContext = `
    Anda adalah chatbot AI yang menjawab pertanyaan tentang Aditya Rahmad.
    Aditya Rahmad adalah seorang software developer, penulis, dan penggemar teknologi.
    Dia memiliki website pribadi di mana dia berbagi perjalanan, proyek, dan tulisannya.
    Dia tertarik pada web development, desain, dan tren teknologi.
    Dia juga kadang menulis tentang hal-hal acak seperti tren saat ini, politik, dan ekonomi.
    Dia tinggal di Indonesia.
    Dia menggunakan Next.js, React, Tailwind CSS, dan Sanity.io untuk website-nya.
    Dia suka belajar hal baru dan berbagi pengetahuannya.
    PENTING: Deteksi bahasa pertanyaan pengguna dan jawab dalam bahasa yang sama. Jika pertanyaan dalam Bahasa Inggris, jawab dalam Bahasa Inggris. Jika dalam Bahasa Indonesia, jawab dalam Bahasa Indonesia.
  `;

  try {
    const result = await streamText({
      model: google("gemini-2.0-flash"),
      messages: [
        { role: "system", content: aboutMeContext },
        { role: "user", content: message },
      ],
    });

    // Mengambil textStream secara eksplisit dan mengembalikannya sebagai Response
    const textStream = result.textStream;

    return new Response(textStream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    });
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return new Response(
      JSON.stringify({ error: "Failed to get response from AI" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
