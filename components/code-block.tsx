"use client";

import { Check, Copy, FileCode } from "lucide-react";
import { useEffect, useState } from "react";
import { getSingletonHighlighter, type Highlighter } from "shiki";

interface CodeBlockProps {
  language: string;
  value: string;
  filename?: string;
}

export function CodeBlock({ language, value, filename }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState<string>("");
  const [highlighter, setHighlighter] = useState<Highlighter | null>(null);

  // Initialize Shiki highlighter
  useEffect(() => {
    const initHighlighter = async () => {
      try {
        const shikiHighlighter = await getSingletonHighlighter({
          themes: ["tokyo-night"],
          langs: [
            "javascript",
            "typescript",
            "jsx",
            "tsx",
            "css",
            "scss",
            "html",
            "json",
            "python",
            "java",
            "c",
            "cpp",
            "csharp",
            "php",
            "ruby",
            "go",
            "rust",
            "swift",
            "dart",
            "bash",
            "shell",
            "yaml",
            "sql",
            "graphql",
            "markdown",
            "xml",
            "dockerfile",
            "plaintext",
          ],
        });
        setHighlighter(shikiHighlighter);
      } catch (error) {
        console.error("Failed to initialize Shiki highlighter:", error);
      }
    };

    initHighlighter();
  }, []);

  const getLanguageClass = (lang: string) => {
    if (!lang) return "javascript";

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

    return languageMap[lang.toLowerCase()] || lang.toLowerCase();
  };

  // Get a display name for the language
  const getLanguageDisplayName = (lang: string) => {
    const displayNames: Record<string, string> = {
      javascript: "JavaScript",
      jsx: "JSX",
      typescript: "TypeScript",
      tsx: "TSX",
      python: "Python",
      ruby: "Ruby",
      bash: "Bash",
      yaml: "YAML",
      json: "JSON",
      html: "HTML",
      css: "CSS",
      scss: "SCSS",
      sql: "SQL",
      graphql: "GraphQL",
      go: "Go",
      rust: "Rust",
      dart: "Dart",
      php: "PHP",
      swift: "Swift",
      csharp: "C#",
      java: "Java",
      c: "C",
      cpp: "C++",
      markdown: "Markdown",
      plaintext: "Text",
    };

    const mappedLang = getLanguageClass(lang);
    return displayNames[mappedLang] || mappedLang.toUpperCase();
  };

  // Highlight code when highlighter is ready
  useEffect(() => {
    if (highlighter && value) {
      try {
        const mappedLanguage = getLanguageClass(language);
        const highlighted = highlighter.codeToHtml(value, {
          lang: mappedLanguage,
          theme: "tokyo-night",
        });
        setHighlightedCode(highlighted);
      } catch (error) {
        console.error("Failed to highlight code:", error);
        // Fallback to plain text
        setHighlightedCode(
          `<pre style="background: transparent; padding: 1rem; margin: 0; overflow-x: auto;"><code style="color: #e5e7eb;">${value}</code></pre>`
        );
      }
    }
  }, [highlighter, value, language]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  // Split code into lines for line numbers
  const lines = value.split("\n");

  return (
    <div className="my-6 rounded-lg overflow-hidden border bg-zinc-950 dark:bg-zinc-900">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          {filename ? (
            <>
              <FileCode className="h-4 w-4" />
              <span className="font-medium">{filename}</span>
            </>
            
          ) : (
            <span className="font-medium">
              {getLanguageDisplayName(language)}
            </span>
          )}
        </div>
        <button
          onClick={copyToClipboard}
          className="p-1.5 rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 transition-colors"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Code content */}
      <div className="relative overflow-x-auto">
        <div className="flex">
          {/* Line numbers */}
          <div className="flex flex-col text-right pr-4 py-3 pl-4 text-zinc-500 text-sm font-mono select-none bg-zinc-900/50 border-r border-zinc-800">
            {lines.map((_, index) => (
              <div key={index} className="leading-6">
                {index + 1}
              </div>
            ))}
          </div>

          {/* Code with syntax highlighting */}
          <div className="flex-1 min-w-0">
            {highlightedCode ? (
              <div
                className="shiki-container [&>pre]:!bg-transparent [&>pre]:!p-4 [&>pre]:!m-0"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            ) : (
              <pre className="p-4 text-zinc-200 bg-transparent font-mono text-sm leading-6">
                <code>{value}</code>
              </pre>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
