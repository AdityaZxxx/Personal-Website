import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const PopoverIconLink = ({
  href,
  title,
  description,
  icon: Icon,
  isActive,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ElementType;
  isActive: boolean;
}) => (
  <Link
    href={href}
    className={cn(
      "group/header-link flex items-start gap-3 rounded-lg p-3 transition-colors hover:bg-background",
      isActive ? "bg-background/70" : "bg-[#1B1B1B]"
    )}
    aria-current={isActive ? "page" : undefined}
  >
    <div
      className={cn(
        "mt-0.5 flex h-10 w-10 items-center justify-center rounded-lg bg-background text-muted-foreground",
        isActive && "text-sky-400"
      )}
    >
      <Icon className="h-5 w-5" />
    </div>
    <div className="flex-grow">
      <p className="font-semibold text-primary group-hover/header-link:underline decoration-muted-foreground underline-offset-4">
        {title}
      </p>
      <p className="mt-0.5 text-xs text-muted-foreground">{description}</p>
    </div>
  </Link>
);

export const PopoverImageLink = ({
  href,
  title,
  description,
  imageSrc,
  isActive,
}: {
  href: string;
  title: string;
  description: string;
  imageSrc: string;
  isActive: boolean;
}) => (
  <Link
    href={href}
    className={cn(
      "group/header-link relative block h-full overflow-hidden rounded-lg",
      "ring-2 ring-transparent transition-shadow",
      isActive && "ring-sky-500"
    )}
    aria-current={isActive ? "page" : undefined}
  >
    <Image
      src={imageSrc}
      width={400}
      height={400}
      sizes="100vw"
      alt={title}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover/header-link:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
    <div className="relative flex h-full flex-col justify-end p-4 text-primary">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-xs text-muted-foreground line-clamp-2">
        {description}
      </p>
    </div>
  </Link>
);
