"use client";

import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import Prism from "prismjs";
import { useEffect, useRef, useState } from "react";

// Import Prism languages in a more organized way
const PRISM_LANGUAGES = [
  "prism-markup-templating", // Must be first (dependency for others)
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

// Dynamically import all Prism languages
PRISM_LANGUAGES.forEach((lang) => {
  import(`prismjs/components/${lang}`);
});

interface CodeBlockProps {
  language: string;
  value: string;
  filename?: string;
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
};

export function CodeBlock({ language, value, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  const getLanguageClass = (lang: string) => {
    if (!lang) return "text";
    return LANGUAGE_MAP[lang.toLowerCase()] || lang.toLowerCase();
  };

  const languageClass = getLanguageClass(language);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [mounted, value, language]);

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
    toast({ title, description, variant });
  };

  if (!mounted) return null;

  return (
    <div className="relative my-6 rounded-lg overflow-hidden bg-muted">
      {filename && (
        <div className="bg-muted/80 px-4 py-2 text-sm border-b text-muted-foreground font-mono">
          {filename}
        </div>
      )}
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
      <pre className={cn("p-4 overflow-x-auto", filename ? "pt-2" : "")}>
        <code ref={codeRef} className={`language-${languageClass}`}>
          {value}
        </code>
      </pre>
    </div>
  );
}
