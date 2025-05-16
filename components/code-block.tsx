"use client";

import { toast } from "@/hooks/use-toast"; // Asumsikan path ini benar
import { cn } from "@/lib/utils"; // Asumsikan path ini benar
import { Check, Copy } from "lucide-react";
import Prism from "prismjs";
import { useEffect, useRef, useState } from "react";

// Import Prism languages (sudah baik)
const PRISM_LANGUAGES = [
  "prism-markup-templating",
  "prism-bash",
  "prism-c",
  "prism-cpp",
  "prism-csharp",
  "prism-css",
  "prism-dart",
  "prism-go",
  "prism-graphql",
  "prism-java",
  "prism-javascript",
  "prism-json",
  "prism-jsx",
  "prism-markdown",
  "prism-php",
  "prism-python",
  "prism-ruby",
  "prism-rust",
  "prism-scss",
  "prism-sql",
  "prism-swift",
  "prism-tsx",
  "prism-typescript",
  "prism-yaml",
] as const;

PRISM_LANGUAGES.forEach((lang) => {
  import(`prismjs/components/${lang}`);
});

// Impor plugin Line Numbers (JS)
// Pastikan ini diimpor setelah PrismJS core dan sebelum Anda memanggil highlightAll atau highlightElement
// Dalam kasus dynamic import bahasa, ini seharusnya aman
import "prismjs/plugins/line-numbers/prism-line-numbers.js";

interface CodeBlockProps {
  language: string; // Penting untuk menentukan bahasa dari data Anda
  value: string;
  filename?: string;
  showLineNumbers?: boolean; // Opsi untuk menampilkan/menyembunyikan nomor baris
  wordWrap?: boolean; // Opsi untuk word wrap
}

const LANGUAGE_MAP: Record<string, string> = {
  js: "javascript",
  jsx: "jsx",
  ts: "typescript",
  tsx: "tsx",
  py: "python",
  rb: "ruby",
  sh: "bash",
  yml: "yaml",
  html: "markup",
  xml: "markup",
  svg: "markup",
  css: "css",
  scss: "scss",
  json: "json",
  md: "markdown",
  sql: "sql",
};

export function CodeBlock({
  language,
  value,
  filename,
  showLineNumbers = false, // Default ke false
  wordWrap = false, // Default ke false
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const getLanguageClass = (lang: string): string => {
    if (!lang) return "javascript"; // Fallback jika tidak ada bahasa
    const lowerLang = lang.toLowerCase();
    return LANGUAGE_MAP[lowerLang] || lowerLang;
  };

  const languageClass = getLanguageClass(language);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [mounted, value, language, showLineNumbers]); // Tambahkan showLineNumbers ke dependencies jika logikanya memengaruhi highlighting

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      showToast(
        "✅ Code copied",
        "The code has been copied to your clipboard."
      );
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      showToast(
        "❎ Failed to copy",
        "Could not copy the code to your clipboard.",
        "destructive"
      );
    }
  };

  const showToast = (
    title: string,
    description: string,
    variant?: "destructive"
  ) => {
    // Pastikan toast diimpor dan dikonfigurasi dengan benar di aplikasi Anda
    toast({ title, description, variant });
  };

  if (!mounted) {
    // Sediakan placeholder atau skeleton loader sederhana jika diinginkan selama SSR/mounting awal
    // Untuk saat ini, null sudah cukup untuk menghindari hydration mismatch
    return null;
  }

  const preClasses = cn(
    "p-4 overflow-x-auto", // overflow-x-auto tetap berguna jika word-wrap tidak cukup
    filename ? "pt-2" : "",
    showLineNumbers ? "line-numbers" : "",
    { "whitespace-pre-wrap break-words": wordWrap } // Kelas untuk word wrap
  );

  const codeClasses = cn(
    `language-${languageClass}`
    // Anda bisa menambahkan kelas lain di sini jika perlu
  );

  return (
    <div className="relative my-6 rounded-lg overflow-hidden bg-zinc-900 dark:bg-zinc-900 group">
      {" "}
      {/* Ganti bg-muted dengan tema gelap, sesuaikan */}
      {(filename || languageClass !== "text") && (
        <div className="flex justify-between items-center bg-zinc-800 dark:bg-zinc-800 px-4 py-2 text-sm border-b border-zinc-700 dark:border-zinc-700 text-zinc-400 dark:text-zinc-400 font-mono">
          <span>{filename || languageClass}</span>
          <button
            onClick={copyToClipboard}
            className="p-1.5 rounded-md bg-zinc-700 hover:bg-zinc-600 transition-colors text-zinc-300"
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      )}
      {!filename &&
        languageClass === "text" && ( // Tombol copy untuk blok tanpa filename, jaga konsistensi
          <div className="absolute right-2 top-2 z-10">
            <button
              onClick={copyToClipboard}
              className="p-2 rounded-md bg-background/80 hover:bg-background transition-colors"
              aria-label="Copy code to clipboard"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <Copy className="h-4 w-4 text-muted-foreground" />
              )}
            </button>
          </div>
        )}
      <pre className={preClasses}>
        {/* Atribut data-prismjs-copy dan sejenisnya bisa dinonaktifkan jika menggunakan tombol copy sendiri */}
        {/* Untuk line numbers, plugin akan menangani penambahan elemen span */}
        <code ref={codeRef} className={codeClasses}>
          {value}
        </code>
      </pre>
    </div>
  );
}
