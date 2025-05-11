"use client";

import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Check, Copy, Maximize2 } from "lucide-react";
import Prism from "prismjs";
import { useEffect, useRef, useState } from "react";
import { Badge } from "./ui/badge";

// Import Prism languages
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

// Load all Prism languages
PRISM_LANGUAGES.forEach((lang) => {
  import(`prismjs/components/${lang}`);
});

// Glassmorphism theme with vibrant syntax highlighting
const glassTheme = `
  .glass-code .token.comment,
  .glass-code .token.prolog,
  .glass-code .token.doctype,
  .glass-code .token.cdata {
    color: #a1efe4;
    text-shadow: 0 0 8px rgba(161, 239, 228, 0.3);
  }

  .glass-code .token.punctuation {
    color: #ffffff;
    opacity: 0.8;
  }

  .glass-code .token.property,
  .glass-code .token.tag,
  .glass-code .token.boolean,
  .glass-code .token.number,
  .glass-code .token.constant,
  .glass-code .token.symbol,
  .glass-code .token.deleted {
    color: #ff9d5c;
    text-shadow: 0 0 8px rgba(255, 157, 92, 0.3);
  }

  .glass-code .token.selector,
  .glass-code .token.attr-name,
  .glass-code .token.string,
  .glass-code .token.char,
  .glass-code .token.builtin,
  .glass-code .token.inserted {
    color: #5cff9d;
    text-shadow: 0 0 8px rgba(92, 255, 157, 0.3);
  }

  .glass-code .token.operator,
  .glass-code .token.entity,
  .glass-code .token.url {
    color: #ffffff;
    opacity: 0.9;
  }

  .glass-code .token.atrule,
  .glass-code .token.attr-value,
  .glass-code .token.keyword {
    color: #9d5cff;
    text-shadow: 0 0 8px rgba(157, 92, 255, 0.3);
  }

  .glass-code .token.function,
  .glass-code .token.class-name {
    color: #ffd95c;
    text-shadow: 0 0 8px rgba(255, 217, 92, 0.3);
  }

  .glass-code .token.regex,
  .glass-code .token.important,
  .glass-code .token.variable {
    color: #ff5c9d;
    text-shadow: 0 0 8px rgba(255, 92, 157, 0.3);
  }
`;

// Inject custom theme
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = glassTheme;
  document.head.appendChild(style);
}

interface CodeBlockProps {
  language: string;
  value: string;
  filename?: string;
  className?: string;
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
  md: "markdown",
  html: "markup",
  css: "css",
  scss: "scss",
};

export function CodeBlock({
  language,
  value,
  filename,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
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
        "✨ Code copied",
        "The code has been copied to your clipboard."
      );
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showToast(
        "⚠️ Failed to copy",
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

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  if (!mounted) return null;

  return (
    <div
      className={cn(
        "relative my-8 rounded-2xl overflow-hidden",
        "border border-white/20",
        "shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
        "bg-gradient-to-br from-white/5 via-white/2 to-white/5",
        "backdrop-blur-xl",
        "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,_rgba(120,119,198,0.1)_0%,_transparent_70%)] before:opacity-40",
        "after:absolute after:inset-0 after:bg-[linear-gradient(135deg,_rgba(255,255,255,0.1)_0%,_transparent_50%)]",
        className
      )}
    >
      {/* Header with improved glassmorphism */}
      <div
        className={cn(
          "flex items-center justify-between px-4 py-3",
          "border-b border-white/20",
          "bg-gradient-to-r from-white/5 to-white/10",
          "backdrop-blur-lg",
          "relative overflow-hidden",
          "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.2)_0%,_transparent_50%)]"
        )}
      >
        <div className="flex space-x-2 z-10">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] shadow-[0_0_6px_#FF5F56] hover:brightness-125 transition-all"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-[0_0_6px_#FFBD2E] hover:brightness-125 transition-all"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F] shadow-[0_0_6px_#27C93F] hover:brightness-125 transition-all"></div>
        </div>

        {filename && (
          <Badge
            variant="secondary"
            className={cn(
              "bg-opacity-20 text-xs font-medium text-white/90 truncate max-w-[50%]",
              "backdrop-blur-md border-white/10",
              "hover:bg-opacity-30 transition-all"
            )}
          >
            {filename}
          </Badge>
        )}

        <div className="flex items-center space-x-3 z-10">
          <button
            onClick={toggleExpand}
            className={cn(
              "p-1.5 rounded-lg transition-all",
              "hover:bg-white/20 hover:shadow-[0_0_10px_rgba(255,255,255,0.15)]",
              "text-white/70 hover:text-white",
              "transform hover:scale-110"
            )}
            aria-label={isExpanded ? "Minimize" : "Expand"}
          >
            {isExpanded ? (
              <MinimizeIcon className="h-3.5 w-3.5" />
            ) : (
              <Maximize2 className="h-3.5 w-3.5" />
            )}
          </button>
          <button
            onClick={copyToClipboard}
            className={cn(
              "p-1.5 rounded-lg transition-all",
              "hover:bg-white/20 hover:shadow-[0_0_10px_rgba(255,255,255,0.15)]",
              "text-white/70 hover:text-white",
              "transform hover:scale-110"
            )}
            aria-label="Copy code to clipboard"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-[#27C93F] animate-pulse" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Enhanced code area with layered glass effect */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-500",
          "relative",
          isExpanded ? "max-h-[1000px]" : "max-h-[400px]",
          "before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_center,_rgba(100,210,255,0.05)_0%,_transparent_70%)]",
          "after:absolute after:inset-0 after:bg-[linear-gradient(145deg,_rgba(255,255,255,0.03)_0%,_transparent_50%)]"
        )}
      >
        <pre
          className={cn(
            "p-5 overflow-x-auto",
            "scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent",
            filename ? "pt-3" : "",
            "relative z-10"
          )}
        >
          <code
            ref={codeRef}
            className={`language-${languageClass} font-mono text-sm leading-relaxed`}
          >
            {value}
          </code>
        </pre>
      </div>

      {/* Floating language indicator */}
      <Badge
        className={cn(
          "absolute bottom-4 right-4",
          "px-3 py-1 rounded-full text-xs",
          "bg-white/15 backdrop-blur-lg z-10",
          "text-white/90 border border-white/20",
          "shadow-[0_4px_12px_rgba(0,0,0,0.2)]",
          "hover:bg-white/20 hover:shadow-[0_4px_16px_rgba(0,0,0,0.3)] transition-all",
          "transform hover:-translate-y-0.5"
        )}
      >
        {languageClass}
      </Badge>
    </div>
  );
}

// Custom minimize icon
function MinimizeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
