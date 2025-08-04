import { urlFor } from "@/lib/sanity/image";
import { cn, slugify } from "@/lib/utils";
import {
  PortableTextBlock,
  PortableText as SanityPortableText,
  type PortableTextComponents,
  type PortableTextProps,
} from "@portabletext/react";
import { Hash, SquareArrowOutUpRightIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CodeBlock } from "./CodeBlock";
import { TableBlogContent } from "./TableBlogContent";

interface SanityTableValue {
  _key: string;
  _type: "table";
  rows: Array<{
    _key: string;
    _type: "row";
    cells: string[];
  }>;
}

interface SanityImageValue {
  _key: string;
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
    metadata?: {
      lqip?: string;
    };
  };
  caption?: string;
  alt?: string;
}

interface SanityCodeValue {
  _key: string;
  _type: "code";
  language: string;
  code: string;
  filename?: string;
}

const HeadingRenderer = ({
  value,
  children,
  className,
}: {
  value: PortableTextBlock;
  children?: React.ReactNode;
  className?: string;
}) => {
  const level = value.style as string;
  const Tag = level as keyof HTMLElementTagNameMap;
  const textContent =
    value.children
      ?.map((child) => {
        if ("text" in child && typeof child.text === "string") {
          return child.text;
        }
        return "";
      })
      .join("") || "";
  const baseId = slugify(textContent);
  const id = `${baseId}-${Math.random().toString(36).substring(2, 9)}`;

  return (
    <Tag id={id} className={cn("group relative scroll-mt-24", className)}>
      <a
        href={`#${id}`}
        className="absolute -left-6 text-primary opacity-0 transition-opacity group-hover:opacity-100"
        aria-label={`Link to section: ${textContent}`}
      >
        <Hash />
      </a>
      {children}
    </Tag>
  );
};

const components: PortableTextComponents = {
  types: {
    table: ({ value }: { value: SanityTableValue }) => {
      if (!value?.rows) return null;
      return <TableBlogContent value={value} />;
    },
    image: ({ value }: { value: SanityImageValue }) => {
      if (!value?.asset?._ref) return null;
      const blurDataURL = value.asset.metadata?.lqip;
      return (
        <figure>
          <div className="relative aspect-video overflow-hidden rounded-lg">
            <Image
              src={urlFor(value).width(1600).height(900).url()}
              alt={value.alt || "Blog post image"}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
              placeholder={blurDataURL ? "blur" : "empty"}
              blurDataURL={blurDataURL}
            />
          </div>
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
    code: ({ value }: { value: SanityCodeValue }) => (
      <CodeBlock
        language={value.language}
        value={value.code}
        filename={value.filename}
      />
    ),
  },
  block: {
    h2: (props) => (
      <HeadingRenderer
        {...props}
        className="text-2xl pb-4 pt-8 font-semibold text-primary transition-colors duration-200 hover:underline no-underline"
      />
    ),
    h3: (props) => (
      <HeadingRenderer
        {...props}
        className="text-xl py-1 font-semibold text-primary  transition-colors duration-200 hover:underline no-underline"
      />
    ),
    h4: (props) => (
      <HeadingRenderer
        {...props}
        className="text-lg font-semibold text-primary transition-colors duration-200 hover:underline no-underline py-1"
      />
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-sky-400 pl-4 my-4 italic text-primary font-medium">
        {children}
      </blockquote>
    ),
    bold: ({ children }) => (
      <strong className="font-semibold text-primary">{children}</strong>
    ),
  },
  marks: {
    em: ({ children }) => <em className="text-muted-foreground">{children}</em>,
    strong: ({ children }) => (
      <strong className="text-muted-foreground font-semibold">
        {children}
      </strong>
    ),
    code: ({ children }) => (
      <code className="font-mono font-semibold px-1">{children}</code>
    ),

    link: ({ children, value }) => {
      if (!value?.href) {
        return <span>{children}</span>;
      }

      const isInternal =
        value.href.startsWith("/") || value.href.startsWith("#");

      if (isInternal) {
        return (
          <Link
            href={value.href}
            className="text-[#D4D4D4] font-medium underline decoration-muted-foreground underline-offset-2 transition hover:decoration-[#D4D4D4]"
          >
            {children}
          </Link>
        );
      }

      return (
        <a
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-[#D4D4D4] underline decoration-muted-foreground underline-offset-2 transition hover:decoration-[#D4D4D4]"
        >
          {children}
          <SquareArrowOutUpRightIcon className="inline-block h-4 w-4 ml-0.5" />
        </a>
      );
    },
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

export function PortableText({
  value,
  className,
}: {
  value: PortableTextProps["value"];
  className?: string;
}) {
  return (
    <div
      className={cn(
        "font-light text-base/7 bg-background text-muted-foreground ",
        className
      )}
    >
      <SanityPortableText value={value} components={components} />
    </div>
  );
}
