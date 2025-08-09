import { cn } from "@/lib/utils";
import {
  PortableText as SanityPortableText,
  type PortableTextComponents,
} from "@portabletext/react";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Lightbulb,
  SquareArrowOutUpRightIcon,
} from "lucide-react";
import Link from "next/link";

const calloutConfig = {
  success: {
    icon: CheckCircle,
    lineClass: "bg-green-500",
    iconContainerClass: "bg-green-500 text-white",
    containerClass: "bg-green-950/60",
    textClass: "text-white",
  },
  note: {
    icon: Info,
    lineClass: "bg-blue-500",
    iconContainerClass: "bg-blue-500 text-white",
    containerClass: "bg-blue-950/60",
    textClass: "text-white",
  },
  tip: {
    icon: Lightbulb,
    lineClass: "bg-yellow-500",
    iconContainerClass: "bg-yellow-500 text-yellow-950",
    containerClass: "bg-yellow-950/60",
    textClass: "text-white",
  },
  warning: {
    icon: AlertTriangle,
    lineClass: "bg-red-500",
    iconContainerClass: "bg-red-500 text-white",
    containerClass: "bg-red-950/60",
    textClass: "text-white",
  },
};

interface CalloutProps {
  content: any;
  category?: keyof typeof calloutConfig;
}

const calloutComponents: PortableTextComponents = {
  marks: {
    em: ({ children }) => <em>{children}</em>,
    strong: ({ children }) => (
      <strong className="font-semibold">{children}</strong>
    ),
    code: ({ children }) => (
      <code className="rounded-md bg-neutral-800 px-1.5 py-1 font-mono text-sm">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      if (!value?.href) {
        return <span>{children}</span>;
      }
      const isInternal =
        value.href.startsWith("/") || value.href.startsWith("#");

      if (isInternal) {
        return (
          <Link href={value.href} className="underline underline-offset-2">
            {children}
          </Link>
        );
      }

      return (
        <a
          href={value.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline decoration-muted-foreground underline-offset-2 transition hover:decoration-white"
        >
          {children}
          <SquareArrowOutUpRightIcon className="ml-0.5 inline-block h-3 w-3" />
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="ml-4 list-disc space-y-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="ml-4 list-decimal space-y-2">{children}</ol>
    ),
  },
  block: {
    normal: ({ children }) => <p className="leading-7">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-neutral-600 pl-4 italic">
        {children}
      </blockquote>
    ),
    h1: ({ children }) => <div className="text-xl font-bold">{children}</div>,
    h2: ({ children }) => <div className="text-lg font-bold">{children}</div>,
    h3: ({ children }) => <div className="text-base font-bold">{children}</div>,
    h4: ({ children }) => (
      <div className="text-base font-semibold">{children}</div>
    ),
  },
};

function CalloutContent({ value }: { value: any }) {
  if (!value) return null;
  return <SanityPortableText value={value} components={calloutComponents} />;
}

export function Callout({ content, category = "note" }: CalloutProps) {
  const config = calloutConfig[category] || calloutConfig.note;
  const Icon = config.icon;

  return (
    <div
      className={cn(
        "relative my-6 rounded-lg border border-transparent py-5 pl-12 pr-6",
        config.containerClass
      )}
    >
      <div
        className={cn("absolute left-0 top-0 h-full w-1", config.lineClass)}
      />

      <div
        className={cn(
          "absolute left-0 top-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-4 border-neutral-950",
          config.iconContainerClass
        )}
      >
        <Icon className="h-4 w-4" />
      </div>

      <div className={cn("max-w-none", config.textClass)}>
        <CalloutContent value={content} />
      </div>
    </div>
  );
}
