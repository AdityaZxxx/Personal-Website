"use client";

import { urlForImage } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import { PortableText as SanityPortableText } from "@portabletext/react";
import { Geist } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
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
              src={urlForImage(value)?.url() || "/placeholder.svg"}
              alt={value.alt || ""}
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
          language={value.language || "text"}
          value={value.code}
          filename={value.filename}
        />
      );
    },
    // blockquote: ({ value }: any) => {
    //   return (
    //     <Blockquote className="my-6 border-l-4 border-gray-300 dark:border-gray-600 pl-6 italic font-normal text-gray-700 dark:text-gray-300">
    //       {value.text}
    //       {value.attribution && (
    //         <footer className="not-italic mt-2 text-sm text-gray-500 dark:text-gray-400">
    //           — {value.attribution}
    //         </footer>
    //       )}
    //     </Blockquote>
    //   );
    // },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith("/")
        ? "noreferrer noopener"
        : undefined;
      const target = !value.href.startsWith("/") ? "_blank" : undefined;

      return (
        <Link
          href={value.href}
          rel={rel}
          target={target}
          className="text-blue-600 dark:text-blue-400 hover:underline hover:text-blue-500/80 underline-offset-4 font-medium"
        >
          {children}
        </Link>
      );
    },
    strong: ({ children }: any) => {
      return <strong className="font-semibold">{children}</strong>;
    },
    em: ({ children }: any) => {
      return <em className="italic">{children}</em>;
    },
  },
  block: {
    normal: ({ children }: any) => {
      return <p className="mb-4 font-normal leading-relaxed">{children}</p>;
    },
    h1: ({ children }: any) => {
      return <h1 className="text-4xl font-normal mt-8 mb-6">{children}</h1>;
    },
    h2: ({ children }: any) => {
      return <h2 className="text-3xl font-normal mt-8 mb-4">{children}</h2>;
    },
    h3: ({ children }: any) => {
      return <h3 className="text-2xl font-normal mt-6 mb-3">{children}</h3>;
    },
    h4: ({ children }: any) => {
      return <h4 className="text-xl font-normal mt-5 mb-2">{children}</h4>;
    },
  },
  list: {
    bullet: ({ children }: any) => {
      return <ul className="list-disc mb-4 font-normal">{children}</ul>;
    },
    number: ({ children }: any) => {
      return <ol className="list-decimal mb-4 font-normal">{children}</ol>;
    },
  },
  listItem: {
    bullet: ({ children }: any) => {
      return <li className="mb-2">{children}</li>;
    },
    number: ({ children }: any) => {
      return <li className="mb-2">{children}</li>;
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
        `${geist} prose dark:prose-invert max-w-none font-normal`,
        className
      )}
    >
      <SanityPortableText value={value} components={components} />
    </div>
  );
}
