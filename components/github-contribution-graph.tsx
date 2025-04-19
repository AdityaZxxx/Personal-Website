"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Github } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubApiResponse {
  contributions: ContributionDay[];
}

interface GitHubContributionGraphProps {
  username: string;
}

export function GitHubContributionGraph({
  username,
}: GitHubContributionGraphProps) {
  const [data, setData] = useState<GitHubApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const checkDark = () => {
    const isDark = document.documentElement.classList.contains("dark");
    setIsDarkMode(isDark);
  };

  useEffect(() => {
    checkDark();

    const observer = new MutationObserver(() => {
      checkDark();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!username) return;

    setLoading(true);
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then(setData)
      .catch(() => setError("Could not load GitHub contributions"))
      .finally(() => setLoading(false));
  }, [username]);

  const weeks = useMemo(() => {
    if (!data?.contributions) return [];

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const filtered = data.contributions.filter(
      (c) => new Date(c.date) >= oneYearAgo
    );

    const sorted = [...filtered].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const weeks: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];

    sorted.forEach((contrib) => {
      const day = new Date(contrib.date).getDay();
      if (day === 0 && currentWeek.length) {
        weeks.push(currentWeek);
        currentWeek = [];
      }
      currentWeek.push(contrib);
    });

    if (currentWeek.length) weeks.push(currentWeek);
    return weeks;
  }, [data]);

  const totalContributions = useMemo(() => {
    if (!data?.contributions) return 0;
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    return data.contributions
      .filter((d) => new Date(d.date) >= oneYearAgo)
      .reduce((sum, day) => sum + day.count, 0);
  }, [data]);

  const getColor = (level: number) => {
    const light = ["#e5e7eb", "#bbf7d0", "#6ee7b7", "#34d399", "#059669"];
    const dark = ["#1f2937", "#064e3b", "#047857", "#10b981", "#6ee7b7"];

    return (isDarkMode ? dark : light)[level] || light[0];
  };

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Github className="h-5 w-5" />
            <span>{error}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            <h3 className="font-medium">GitHub Contributions</h3>
          </div>
          {!loading && (
            <span className="text-sm text-muted-foreground">
              {totalContributions} contributions in the last year
            </span>
          )}
        </div>

        {loading ? (
          <Skeleton className="h-[120px] w-full" />
        ) : (
          <div className="overflow-x-auto">
            <svg
              width={weeks.length * 14}
              height={100}
              className="block"
              role="img"
            >
              {weeks.map((week, weekIndex) =>
                week.map((day, dayIndex) => (
                  <rect
                    key={`${weekIndex}-${dayIndex}`}
                    x={weekIndex * 14}
                    y={dayIndex * 14}
                    width={12}
                    height={12}
                    rx={2}
                    ry={2}
                    fill={getColor(day.level)}
                  >
                    <title>
                      {day.count} contributions on {day.date}
                    </title>
                  </rect>
                ))
              )}
            </svg>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
