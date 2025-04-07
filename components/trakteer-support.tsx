"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Gift } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface TrakteerSupportProps {
  username: string;
  text?: string;
  className?: string;
}

export function TrakteerSupport({
  username,
  text = "If you enjoy my content, consider supporting me on Trakteer!",
  className,
}: TrakteerSupportProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card
      className={`overflow-hidden border-orange-100 dark:border-orange-900 ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardHeader className="pb-2 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <Gift className={`h-5 w-5 ${isHovered ? "animate-bounce" : ""}`} />
          Support My Work
        </CardTitle>
        <CardDescription className="text-white/90">{text}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2 pt-4">
        <div className="flex justify-center">
          <div className="relative w-20 h-20">
            <svg
              viewBox="0 0 512 512"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM381.9 161.3l-22.93 137.6c-1.71 10.28-10.52 17.66-20.93 17.66c-1.188 0-2.405-.1094-3.622-.3438l-70.52-11.75l-37.99 38c-4.281 4.281-9.968 6.406-15.64 6.406c-4.062 0-8.156-1.094-11.78-3.25c-8.594-5.156-13.59-14.34-13.59-24.22V290.6l-50.28-8.375c-10.69-1.781-18.13-11.77-16.41-22.39c1.719-10.67 11.63-18.09 22.39-16.41l55.34 9.219l122.3-77.86c9.5-5.906 21.53-4.531 29.53 3.469c7.969 7.969 9.344 20 3.438 29.5l-65.73 103.1l70.66 11.75c10.69 1.781 17.88 11.77 16.16 22.39H381.9z"
                fill="#FF5C63"
              />
            </svg>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link
          href={`https://trakteer.id/${username}`}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button className="w-full bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white">
            Trakteer Me
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
