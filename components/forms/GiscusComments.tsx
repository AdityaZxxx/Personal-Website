"use client";

import Giscus from "@giscus/react";
import { useTheme } from "next-themes";
export function GiscusComments() {
  const { theme } = useTheme();

  if (!theme) {
    return null;
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold text-primary">Comments</h3>
      <Giscus
        // ---------------------------------------------
        repo="AdityaZxxx/Personal-Website"
        repoId="R_kgDOOUZR5Q"
        category="Show and tell"
        categoryId="DIC_kwDOOUZR5c4Co2d9"
        // ---------------------------------------------

        mapping="title"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme === "dark" ? "dark" : "light"}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
