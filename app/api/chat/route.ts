// File: app/api/chat/route.ts

import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { streamText } from "ai";

// Izinkan Next.js untuk menjalankan ini di edge runtime
export const runtime = "edge";

// Buat instance klien Google Generative AI
const google = createGoogleGenerativeAI({
  // Pastikan Anda mengatur environment variable ini
  apiKey: process.env.GEMINI_API_KEY,
});

// Info tentang pemilik website (tidak berubah)
const OWNER_INFO = `
# About Adit
- Role: Full-Stack JavaScript Developer
- Skills: React, Next.js, Node.js, TypeScript, PostgreSQL, Docker
- Interests: Linux, Local AI models, K-pop, Ethical Hacking
... (Lengkapi dengan info Anda) ...
`;

// System prompt untuk AI (tidak berubah)
const SYSTEM_PROMPT = `
You are Archi, a friendly AI assistant for Aditya Rahmad's personal portfolio. 
You answer questions about him based on the provided information. 
Use a casual, helpful, and slightly geeky tone. If you don't know an answer, 
politely say so and redirect the conversation to Adit's projects or skills. 
Never make up information.
`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Panggil 'streamText' untuk memulai proses streaming dengan Gemini
  const result = await streamText({
    // Gunakan model Gemini yang Anda inginkan
    model: google("models/gemini-1.5-flash-latest"),

    // Gabungkan instruksi dan konteks ke dalam system prompt
    system: `${SYSTEM_PROMPT}\n\nHere is the information about Adit:\n\n${OWNER_INFO}`,

    // Teruskan histori pesan
    messages,
  });

  // Kembalikan hasilnya sebagai AIStreamResponse yang kompatibel dengan hook 'useChat'
  return result.toDataStreamResponse();
}
