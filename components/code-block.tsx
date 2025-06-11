import { getSingletonHighlighter } from "shiki";
import { CodeBlockClient } from "./code-block-client";
export async function CodeBlock({
  language,
  value,
  filename,
}: {
  language: string;
  value: string;
  filename?: string;
}) {
  const getLanguageClass = (lang: string | undefined): string => {
    if (!lang) {
      return "javascript";
    }

    const languageMap: Record<string, string> = {
      js: "javascript",
      jsx: "jsx",
      ts: "typescript",
      tsx: "tsx",
      py: "python",
      rb: "ruby",
      sh: "bash",
      go: "golang",
      yml: "yaml",
      text: "plaintext",
    };

    const lowerCaseLang = lang.toLowerCase();
    return languageMap[lowerCaseLang] || lowerCaseLang;
  };

  const mappedLanguage = getLanguageClass(language);

  const highlighter = await getSingletonHighlighter({
    themes: ["tokyo-night"],
    langs: [mappedLanguage, "javascript", "typescript", "jsx", "json", "bash"],
  });

  const highlightedCodeHtml = highlighter.codeToHtml(value, {
    lang: mappedLanguage,
    theme: "tokyo-night",
  });

  return (
    <CodeBlockClient
      rawCode={value}
      highlightedCodeHtml={highlightedCodeHtml}
      language={mappedLanguage}
      filename={filename}
    />
  );
}
