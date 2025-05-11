"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Activity, GitBranch, Github, Star } from "lucide-react";
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
  className?: string;
}

export function GitHubContributionGraph({
  username,
  className = "",
}: GitHubContributionGraphProps) {
  const [data, setData] = useState<GitHubApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    // Handle resize
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

  // Responsive cell sizing
  const cellSize = windowWidth < 640 ? 10 : 12;
  const cellSpacing = windowWidth < 640 ? 2 : 4;
  const svgWidth = weeks.length * (cellSize + cellSpacing);

  if (error) {
    return (
      <div className="rounded-lg bg-slate-900/50 p-6 text-center border border-slate-800">
        <div className="flex items-center justify-center gap-2 text-slate-400">
          <Github className="h-5 w-5" />
          <span>{error}</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`rounded-2xl bg-gradient-to-br from-slate-900/50 to-black/50 border border-slate-800 p-6 backdrop-blur-sm hover:border-slate-700 transition-all duration-300 shadow-2xl ${className}`}
    >
      <div className="flex flex-col space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Github className="h-5 w-5 text-green-400" />
            <span className="font-mono text-sm text-slate-300">
              @{username}
            </span>
          </div>

          {!loading && (
            <div className="flex items-center space-x-2 sm:space-x-4">
              <span className="text-xs text-slate-400">Less</span>
              <div className="flex space-x-1">
                {["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"].map(
                  (color, i) => (
                    <div
                      key={i}
                      className="h-3 w-3 sm:h-4 sm:w-4 rounded-sm"
                      style={{ backgroundColor: color }}
                    />
                  )
                )}
              </div>
              <span className="text-xs text-slate-400">More</span>
            </div>
          )}
        </div>

        {/* Graph */}
        {loading ? (
          <Skeleton className="h-[120px] w-full rounded-lg" />
        ) : (
          <div className="overflow-x-auto pb-2 -mx-2 px-2">
            <svg
              width={svgWidth}
              height={7 * (cellSize + cellSpacing)}
              className="block"
              role="img"
            >
              {weeks.map((week, weekIndex) =>
                week.map((day, dayIndex) => (
                  <rect
                    key={`${weekIndex}-${dayIndex}`}
                    x={weekIndex * (cellSize + cellSpacing)}
                    y={dayIndex * (cellSize + cellSpacing)}
                    width={cellSize}
                    height={cellSize}
                    rx={2}
                    ry={2}
                    fill={
                      ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"][
                        day.level
                      ]
                    }
                  >
                    <title>
                      {day.count} contributions on{" "}
                      {new Date(day.date).toLocaleDateString()}
                    </title>
                  </rect>
                ))
              )}
            </svg>
          </div>
        )}

        {/* Stats */}
        {!loading && (
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-between items-center gap-3 text-xs sm:text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-blue-400" />
              <span>{totalContributions}+ commits</span>
            </div>
            <div className="flex items-center space-x-2">
              <GitBranch className="h-4 w-4 text-purple-400" />
              <span>12 repositories</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>150+ stars</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
