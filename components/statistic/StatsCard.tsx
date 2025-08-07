"use client";

import Counter from "@/components/statistic/Counter";
import {
  ArrowRightIcon,
  Clock,
  FileText,
  Heart,
  MessageSquare,
} from "lucide-react";
import Link from "next/link";

const icons = {
  FileText,
  MessageSquare,
  Heart,
  Clock,
};

interface StatCardProps {
  icon: keyof typeof icons;
  label: string;
  value: number | string | undefined | null;
  link: string;
  linkText: string;
  gradient: {
    startColor: string;
    endColor: string;
  };
  suffix?: string;
}

export function StatCard({
  icon,
  label,
  value,
  link,
  linkText,
  gradient,
  suffix,
}: StatCardProps) {
  const Icon = icons[icon];
  const hasValue = value !== undefined && value !== null;

  return (
    <Link
      href={link}
      className="shadow-xs group relative overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/50 p-4 transition-colors hover:bg-neutral-900"
    >
      <div className="flex flex-col items-center justify-center gap-2 transition-transform group-hover:-translate-y-24 group-focus:-translate-y-24">
        <div className="flex items-center gap-2 text-3xl font-semibold">
          {hasValue && Icon ? (
            <>
              <Icon className="h-8 w-8" />
              <div
                style={{
                  background: `linear-gradient(122.25deg, ${gradient.startColor} 12.16%, ${gradient.endColor} 70.98%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {typeof value === 'number' ? (
                  <Counter value={value} />
                ) : (
                  value
                )}
                {suffix && <span>{` ${suffix}`}</span>}
              </div>
            </>
          ) : (
            "--"
          )}
        </div>
        <div className="text-xl font-medium text-neutral-300">{label}</div>
      </div>
      <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 translate-y-24 items-center gap-1 text-2xl font-semibold opacity-0 transition group-hover:-translate-y-1/2 group-hover:opacity-100 group-focus:-translate-y-1/2 group-focus:opacity-100">
        {linkText}
        <ArrowRightIcon className="size-6" />
      </span>
    </Link>
  );
}
