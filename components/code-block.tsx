"use client";

import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import Prism from "prismjs";
import { useEffect, useRef, useState } from "react";

// Import markup-templating first (dependency for other languages)
import "prismjs/components/prism-markup-templating";

// Import Prism languages
import { toast } from "@/hooks/use-toast";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-css";
import "prismjs/components/prism-dart";
import "prismjs/components/prism-go";
import "prismjs/components/prism-graphql";
import "prismjs/components/prism-java";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-json";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-markdown";
import "prismjs/components/prism-php";
import "prismjs/components/prism-python";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-rust";
import "prismjs/components/prism-scss";
import "prismjs/components/prism-sql";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-yaml";

interface CodeBlockProps {
  language: string;
  value: string;
  filename?: string;
}

export function CodeBlock({ language, value, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  // Map language aliases to Prism.js supported languages
  const getLanguageClass = (lang: string) => {
    if (!lang) return "text";

    const languageMap: Record<string, string> = {
      js: "javascript",
      jsx: "jsx",
      ts: "typescript",
      tsx: "tsx",
      py: "python",
      rb: "ruby",
      sh: "bash",
      yml: "yaml",
    };

    return languageMap[lang.toLowerCase()] || lang.toLowerCase();
  };

  const languageClass = getLanguageClass(language);

  // Wait for client-side hydration to complete before highlighting
  useEffect(() => {
    setMounted(true);
  }, []);

  // Highlight code after component is mounted and DOM is hydrated
  useEffect(() => {
    if (mounted && codeRef.current) {
      Prism.highlightElement(codeRef.current);
    }
  }, [mounted, value, language]);

  if (!mounted) return null;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast({
        title: "✅ Code copied",
        description: "The code has been copied to your clipboard.",
      });

      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      toast({
        title: "❎ Failed to copy",
        description: "Could not copy the code to your clipboard.",
        variant: "destructive",
      });
    }
  };

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
