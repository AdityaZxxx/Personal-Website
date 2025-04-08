import { CodeBlock } from "@/components/code-block";
import { urlForImage } from "@/lib/sanity/image";
import { PortableText as SanityPortableText } from "@portabletext/react";
import Image from "next/image";
import Link from "next/link";

const components = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }

      return (
        <div className="my-6 relative aspect-video">
          <Image
            src={urlForImage(value)?.url() || "/placeholder.svg"}
            alt={value.alt || ""}
            fill
            className="object-cover rounded-md"
          />
          {value.caption && (
            <div className="text-center text-sm text-muted-foreground mt-2">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
    code: ({ value }: any) => {
      return (
        <CodeBlock
          language={value.language || "text"}
          value={value.code}
          filename={value._key && value.filename ? value.filename : undefined}
        />
      );
    },
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
          className="text-primary underline underline-offset-4 hover:text-primary/80"
        >
          {children}
        </Link>
      );
    },
  },
};

export function PortableText({ value }: { value: any }) {
  return <SanityPortableText value={value} components={components} />;
}
