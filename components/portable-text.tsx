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

      function getImageUrl(image: any): string {
        try {
          return (
            urlForImage(image)?.width(600).height(340).url() ??
            "/placeholder.svg"
          );
        } catch {
          return "/placeholder.svg";
        }
      }

      return (
        <div className="my-6 relative aspect-video">
          <Image
            src={getImageUrl(value)}
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
        <pre className="bg-muted p-4 rounded-md overflow-x-auto my-6">
          <code>{value.code}</code>
        </pre>
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
