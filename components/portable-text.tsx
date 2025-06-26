// ============================================================================
// File: components/portable-text.tsx
// ============================================================================
import { cn, slugify } from "@/lib/utils";
import {
  PortableText as SanityPortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import { Hash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../lib/sanity/image";
import { CodeBlock } from "./code-block";
import { TableComponent } from "./TableBlogContent";

const HeadingRenderer = ({
  value,
  children,
  className,
}: {
  value: any;
  children?: React.ReactNode;
  className?: string;
}) => {
  const level = value.style;
  const Tag = level;
  const textContent =
    value.children?.map((child: any) => child.text).join("") || "";
  const id = slugify(textContent);

  return (
    <Tag id={id} className={cn("group relative scroll-mt-24", className)}>
      <a
        href={`#${id}`}
        className="absolute -left-6 top-1/2 -translate-y-1/2 text-slate-500 opacity-0 transition-opacity group-hover:opacity-100"
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
    table: ({ value }) => {
      if (!value?.rows) return null;
      return <TableComponent value={value} />;
    },
    image: ({ value }) => {
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
    code: ({ value }) => (
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
        className="text-2xl py-2 font-semibold text-[#F5F5F5] hover:text-[#D4D4D4] transition-colors duration-200 hover:underline no-underline"
      />
    ),
    h3: (props) => (
      <HeadingRenderer
        {...props}
        className="text-xl py-1 font-semibold text-[#F5F5F5] hover:text-[#D4D4D4] transition-colors duration-200 hover:underline no-underline"
      />
    ),
    h4: (props) => (
      <HeadingRenderer
        {...props}
        className="text-lg font-semibold text-[#F5F5F5] hover:text-[#D4D4D4] transition-colors duration-200 hover:underline no-underline py-1"
      />
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-sky-400 pl-4 my-4 italic text-[#D4D4D4] font-medium">
        {children}
      </blockquote>
    ),
    bold: ({ children }) => (
      <strong className="font-semibold text-[#D4D4D4]">{children}</strong>
    ),
  },
  marks: {
    em: ({ children }) => (
      <em className="text-[#D4D4D4] font-semibold">{children}</em>
    ),
    strong: ({ children }) => (
      <strong className="text-[#D4D4D4] font-semibold">{children}</strong>
    ),

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
        <Link
          href={value.href}
          rel={rel}
          target={target}
          className="text-[#F5F5F5] hover:text-[#D4D4D4] transition-colors duration-200 no-underline hover:underline font-semibold "
        >
          {children}
        </Link>
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
  value: any;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "font-normal hyphens-auto text-base/7 bg-[#0A0A0A] text-[#A3A3A3] ",
        className
      )}
    >
      <SanityPortableText value={value} components={components} />
    </div>
  );
}
