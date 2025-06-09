"use client";

import { cn } from "@/lib/utils";
import { PortableText as SanityPortableText } from "@portabletext/react";
import { Geist } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../lib/sanity/image";
import { CodeBlock } from "./code-block";

const geist = Geist({ subsets: ["latin"] });

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <figure className="my-8 group">
          <div className="relative aspect-video overflow-hidden rounded-lg shadow-md border border-gray-200 dark:border-gray-800">
            <Image
              src={urlFor(value)?.width(200).url() || "/placeholder.svg"}
              alt={value.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400 font-normal">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }: any) => {
      return (
        <CodeBlock
          language={value.language}
          value={value.code}
          filename={value.filename}
        />
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      if (!value?.href) {
        console.warn("PortableText link is missing href:", value);
        return (
          <span
            className="text-red-500 font-semibold"
            title="Link URL is missing"
          >
            {children} (broken link)
          </span>
        );
      }
      const rel =
        !value.href.startsWith("/") && !value.href.startsWith("#")
          ? "noreferrer noopener"
          : undefined;
      const target =
        !value.href.startsWith("/") && !value.href.startsWith("#")
          ? "_blank"
          : undefined;

      return (
        <Link href={value.href} rel={rel} target={target}>
          {children}
        </Link>
      );
    },
  },
};

export function PortableText({
  value,
  className,
}: {
  value: any;
  className?: string;
}) {
  return (
    <div
      className={cn(
        geist.className,
        "prose prose-lg prose-slate dark:prose-invert max-w-none",
        "prose-headings:text-slate-100 prose-headings:font-semibold prose-headings:tracking-tight prose-headings:scroll-mt-24",
        "prose-p:text-slate-300",
        "prose-a:text-sky-400 prose-a:font-medium prose-a:underline-offset-4 hover:prose-a:text-sky-300 prose-a:transition-colors",
        "prose-strong:text-slate-100 prose-strong:font-semibold",
        "prose-em:text-slate-200 prose-em:italic",
        "prose-blockquote:border-sky-400 prose-blockquote:text-slate-300 prose-blockquote:italic",
        "prose-ul:text-slate-300 prose-li:marker:text-sky-400",
        "prose-ol:text-slate-300 prose-li:marker:text-sky-400",
        "prose-code:text-yellow-500 prose-code:bg-slate-700/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:font-mono prose-code:text-sm",
        "prose-img:rounded-lg prose-img:shadow-md",
        className
      )}
    >
      <SanityPortableText value={value} components={components} />
    </div>
  );
}
