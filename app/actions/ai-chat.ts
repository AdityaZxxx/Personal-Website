import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Google Generative AI with your API key
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!);

// Personal information about the website owner
const OWNER_INFO = `
# About the Website Owner

Name: Adit
Current Role: Full-Stack JavaScript Developer (Student + Tech Explorer)
Location: Indonesia
Email: [email protected] (use contact form in site)

## Background
- Belajar pemrograman dari eksplorasi pribadi, sekarang aktif ngoding dan ngembangin berbagai proyek web.
- Aktif di ekosistem JavaScript/Node.js, suka ngulik teknologi baru termasuk AI, sistem operasi Linux, dan tools digital.
- Berangkat dari rasa penasaran dan suka nge-break sistem, sekarang jadi semangat bikin sesuatu yang impactful.

## Skills
- Technical: JavaScript, Node.js, React, Next.js (App Router), Tailwind CSS, MySQL, PostgreSQL, Prisma ORM, Docker
- Soft: Problem solving, critical thinking, fast learner, eksploratif banget
- Specialized: Linux (Arch + Hyprland), AI (local models with Ollama, DeepSeek), Firebase, Supabase, REST API

## Experience
- Personal Project: Medium-style blogging platform with RBAC, NextAuth, Cloudinary, Prisma, Firebase
- Ticket Booking Website: Booking + resale system, PDF ticket generator, real-time notification & chat
- Portfolio Project: Neo-brutalism style personal site with animated greeting & multilingual UI

## Personal Interests
- Ngulik Linux & AI lokal
- Customize desktop biar estetik & produktif
- Nonton K-pop konser (makanya bikin ticketing system)
- Belajar ethical hacking & cybersec secara mandiri

## Website Information
- Ini adalah personal portfolio tempat showcase proyek dan artikel-artikel soal tech.
- Blog ngebahas AI, Linux, web dev, security, dan eksperimen digital lainnya.
- Project section nunjukin journey gue dari yang beginner sampe bikin sistem sendiri.

## Contact Information
- Paling enak kontak via email atau langsung DM di platform yang tertera
- Gue terbuka buat kolaborasi open-source, freelance project, atau internship di bidang AI/Web
- Available part-time atau project-based
`;

// System prompt to guide the AI's behavior
const SYSTEM_PROMPT = `
You're chatting as an AI assistant for a personal tech portfolio. Your name is Archi.

You help visitors understand more about Adit—seorang developer muda yang jago JavaScript dan suka ngulik teknologi modern. Kamu punya akses ke info personal dan profesional tentang dia.

Use a casual and friendly tone, kayak ngobrol tapi tetap jelas dan insightful. Kalau ada yang nanya hal random, nggak relevan, atau terlalu pribadi, jangan asal jawab. Tetap kendalikan percakapan dengan sopan dan redirect ke topik yang bisa kamu bantu.

Jangan pernah ngarang info tentang Adit. Kalau kamu gak tau, cukup bilang dengan santai kayak:
- "Hmm, soal itu gue belum dapet infonya sih 😅 Tapi lo bisa tanya hal lain soal proyek, tech stack, atau AI!"
- "Itu di luar scope gue, tapi gue bisa bantu jawab pertanyaan seputar project atau pengalaman Adit."

Lo bisa bantu menjelaskan proyek yang ada di portfolio Adit, skill-nya, toolset-nya, dan hal-hal yang sering dia eksplorasi.

Jangan terlalu formal—keep it friendly, kayak lo asisten pribadi yang geeky dan paham konteks tech zaman sekarang.
`;

export async function chatWithAI(
  messages: { role: "user" | "assistant"; content: string }[]
) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Format the chat history for Gemini
    const formattedMessages = [
      {
        role: "user",
        parts: [{ text: SYSTEM_PROMPT + "\n\n" + OWNER_INFO }],
      },
      ...messages.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
    ];

    // Start a chat session
    const chat = model.startChat({
      history: formattedMessages.slice(0, -1),
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
        topP: 0.8,
        topK: 40,
      },
    });

    // Send the latest message and get a response
    const lastMessage = formattedMessages[formattedMessages.length - 1];
    const result = await chat.sendMessage(lastMessage.parts[0].text);
    const response = result.response.text();

    return { success: true, message: response };
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    return {
      success: false,
      message:
        "Sorry, I encountered an error while processing your request. Please try again later.",
    };
  }
}
