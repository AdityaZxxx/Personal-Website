"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Github } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const GithubContributionGraph = dynamic(
  () => import("./GithubContributionGraph"),
  { ssr: false }
);

interface LazyGithubContributionGraphProps {
  username: string;
  className?: string;
}

export default function LazyGithubContributionGraph({
  username,
  className,
}: LazyGithubContributionGraphProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && !data && !loading && !error) {
      setLoading(true);
      fetch(`/api/github-contributions/${username}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch contributions");
          }
          return res.json();
        })
        .then((jsonData) => {
          setData(jsonData);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [isVisible, username, data, loading, error]);

  if (error) {
    return (
      <div className="rounded-lg bg-background p-6 text-center">
        <div className="flex items-center justify-center gap-2 text-muted-foreground">
          <Github className="h-5 w-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={className}>
      {isVisible && !loading && data ? (
        <GithubContributionGraph
          username={username}
          className={className}
          data={data}
        />
      ) : (
        <Skeleton className="h-[200px] w-full rounded-lg" />
      )}
    </div>
  );
}
