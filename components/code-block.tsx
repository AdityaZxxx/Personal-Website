// "use client" kita pindahkan ke komponen yang benar-benar butuh interaksi klien
import { getSingletonHighlighter } from "shiki";
import { CodeBlockClient } from "./code-block-client";
// Komponen ini sekarang menjadi Async Server Component
export async function CodeBlock({
  language,
  value,
  filename,
}: {
  language: string; // Tipe ini sebenarnya bisa undefined dari Sanity
  value: string;
  filename?: string;
}) {
  const getLanguageClass = (lang: string | undefined): string => {
    // ========================================================================
    // PERBAIKAN DI SINI
    // Tambahkan pengecekan untuk menangani jika 'lang' adalah undefined
    if (!lang) {
      return "plaintext"; // Default ke 'plaintext' jika bahasa tidak ada
    }
    // ========================================================================

    const languageMap: Record<string, string> = {
      js: "javascript",
      jsx: "jsx",
      ts: "typescript",
      tsx: "tsx",
      py: "python",
      rb: "ruby",
      sh: "bash",
      yml: "yaml",
      text: "plaintext",
    };

    const lowerCaseLang = lang.toLowerCase();
    return languageMap[lowerCaseLang] || lowerCaseLang;
  };

  const mappedLanguage = getLanguageClass(language);

  // Inisialisasi dan proses highlighting terjadi di server
  const highlighter = await getSingletonHighlighter({
    themes: ["tokyo-night"],
    langs: [mappedLanguage, "javascript", "typescript", "jsx", "json", "bash"], // Muat bahasa yang sering digunakan sebagai fallback
  });

  const highlightedCodeHtml = highlighter.codeToHtml(value, {
    lang: mappedLanguage,
    theme: "tokyo-night",
  });

  // Kita teruskan HTML yang sudah jadi dan data mentah ke komponen klien
  return (
    <CodeBlockClient
      rawCode={value}
      highlightedCodeHtml={highlightedCodeHtml}
      language={mappedLanguage}
      filename={filename}
    />
  );
}
