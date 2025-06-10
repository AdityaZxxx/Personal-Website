import { cn, slugify } from "@/lib/utils";
import {
  PortableText as SanityPortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import React from "react"; // Impor React untuk tipe React.ReactNode
import { urlFor } from "../lib/sanity/image";
import { CodeBlock } from "./code-block";

// ============================================================================
// 1. HELPER & SUB-COMPONENTS
// ============================================================================

const HeadingRenderer = ({
  value,
  children,
}: {
  value: any;
  children?: React.ReactNode;
}) => {
  const level = value.style;
  const Tag = level;
  const textContent =
    value.children?.map((child: any) => child.text).join("") || "";
  const id = slugify(textContent);

  return (
    <Tag id={id} className="group relative scroll-mt-24">
      <a
        href={`#${id}`}
        className="absolute -left-6 top-1/2 -translate-y-1/2 text-slate-500 opacity-0 transition-opacity group-hover:opacity-100"
        aria-label={`Link to section: ${textContent}`}
      >
        #
      </a>
      {children}
    </Tag>
  );
};

// ============================================================================
// 2. DEFINISI KOMPONEN PORTABLE TEXT
// ============================================================================

const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;
      const blurDataURL = value.asset.metadata?.lqip;
      return (
        <figure className="my-8 group">
          <div className="relative aspect-video overflow-hidden rounded-lg shadow-md border border-slate-200 dark:border-slate-800">
            <Image
              src={urlFor(value).width(1600).height(900).url()}
              alt={value.alt || "Blog post image"}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 800px"
              placeholder={blurDataURL ? "blur" : "empty"}
              blurDataURL={blurDataURL}
            />
          </div>
          {value.caption && (
            <figcaption className="mt-3 text-center text-sm text-slate-600 dark:text-slate-400">
              {value.caption}
            </figcaption>
          )}
        </figure>
      );
    },
    code: ({ value }) => (
      <CodeBlock
        language={value.language}
        value={value.code}
        filename={value.filename}
      />
    ),
  },
  marks: {
    link: ({ children, value }) => {
      if (!value?.href) {
        return (
          <span className="text-red-500" title="Link URL is missing">
            {children} (broken)
          </span>
        );
      }
      const isInternal =
        value.href.startsWith("/") || value.href.startsWith("#");
      const rel = !isInternal ? "noreferrer noopener" : undefined;
      const target = !isInternal ? "_blank" : undefined;

      return (
        <Link href={value.href} rel={rel} target={target}>
          {children}
        </Link>
      );
    },
  },
  block: {
    h2: (props) => <HeadingRenderer {...props} />,
    h3: (props) => <HeadingRenderer {...props} />,
    h4: (props) => <HeadingRenderer {...props} />,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-sky-400 pl-4 italic text-slate-400">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-6 space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-6 space-y-2">{children}</ol>
    ),
  },
};

// ============================================================================
// 3. KOMPONEN UTAMA
// ============================================================================

export function PortableText({
  value,
  className,
}: {
  value: any;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      <SanityPortableText value={value} components={components} />
    </div>
  );
}
