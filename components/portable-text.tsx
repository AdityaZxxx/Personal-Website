import { cn } from "@/lib/utils";
import { PortableText as SanityPortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../lib/sanity/image";
import { CodeBlock } from "./code-block"; // Pastikan path ini benar

// ============================================================================
// 1. HELPER & SUB-COMPONENTS
// ============================================================================

const slugify = (text: string) => {
  if (typeof text !== "string") return ""; // Pengaman tambahan
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

// Komponen untuk me-render Heading dengan Anchor Link (SUDAH DIPERBAIKI)
const HeadingRenderer = ({
  level,
  children,
}: {
  level: number;
  children: any;
}) => {
  const textContent = Array.isArray(children)
    ? children.map((child) => child.text).join("")
    : children;

  const id = slugify(textContent);

  const commonProps = {
    id,
    className: "group relative scroll-mt-24",
  };

  const anchorLink = (
    <a
      href={`#${id}`}
      className="absolute -left-6 top-1/2 -translate-y-1/2 text-slate-500 opacity-0 transition-opacity group-hover:opacity-100"
      aria-label={`Link to section: ${textContent}`}
    >
      #
    </a>
  );

  switch (level) {
    case 2:
      return (
        <h2 {...commonProps}>
          {anchorLink}
          {children}
        </h2>
      );
    case 3:
      return (
        <h3 {...commonProps}>
          {anchorLink}
          {children}
        </h3>
      );
    case 4:
      return (
        <h4 {...commonProps}>
          {anchorLink}
          {children}
        </h4>
      );
    default:
      return (
        <h2 {...commonProps}>
          {anchorLink}
          {children}
        </h2>
      );
  }
};

// ============================================================================
// 2. DEFINISI KOMPONEN PORTABLE TEXT
// ============================================================================

const components = {
  types: {
    image: ({ value }: any) => {
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
    code: ({ value }: any) => (
      <CodeBlock
        language={value.language}
        value={value.code}
        filename={value.filename}
      />
    ),
  },
  marks: {
    link: ({ children, value }: any) => {
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
    h2: ({ children }: any) => (
      <HeadingRenderer level={2}>{children}</HeadingRenderer>
    ),
    h3: ({ children }: any) => (
      <HeadingRenderer level={3}>{children}</HeadingRenderer>
    ),
    h4: ({ children }: any) => (
      <HeadingRenderer level={4}>{children}</HeadingRenderer>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-sky-400 pl-4 italic text-slate-400">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 space-y-2">{children}</ul>
    ),
    number: ({ children }: any) => (
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
