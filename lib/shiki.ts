import { getHighlighter } from "shiki";

let highlighter;

export async function highlightCode(code, lang) {
  if (!highlighter) {
    highlighter = await getHighlighter({
      themes: ["github-dark", "github-light"],
      langs: [
        "javascript",
        "typescript",
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
        "kotlin",
        "dart",
        "bash",
        "json",
        "html",
        "css",
        "sql",
        "markdown",
        "yaml",
        "xml",
        "dockerfile",
        "plaintext",
      ],
    });
  }

  return highlighter.codeToHtml(code, {
    lang,
    theme: "github-dark",
  });
}
