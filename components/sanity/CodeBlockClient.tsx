"use client";

import { Check, Copy, FileCode } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

interface CodeBlockClientProps {
  rawCode: string;
  highlightedCodeHtml: string;
  language: string;
  filename?: string;
}

export function CodeBlockClient({
  rawCode,
  highlightedCodeHtml,
  language,
  filename,
}: CodeBlockClientProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(rawCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLanguageDisplayName = (lang: string) => {
    const displayNames: Record<string, string> = {
      javascript: "JavaScript",
      typescript: "TypeScript",
    };
    return displayNames[lang] || lang.toUpperCase();
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden bg-[#171717] backdrop-blur-sm">
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
        <Button
          onClick={copyToClipboard}
          variant="ghost"
          aria-label="Copy code"
          className="p-1.5 rounded-md text-zinc-400 hover:bg-zinc-800 hover:text-zinc-50 transition-colors"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>

      <ScrollArea>
        <div
          className="shiki-container text-sm [&>pre]:!bg-transparent [&>pre]:!p-4 [&>pre]:!m-0 overflow-x-auto"
          dangerouslySetInnerHTML={{ __html: highlightedCodeHtml }}
        />
        <ScrollBar orientation="horizontal" className="!bg-zinc-900" />
      </ScrollArea>
    </div>
  );
}
