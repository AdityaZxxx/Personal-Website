"use client";

import { cn } from "@/lib/utils";
import { Activity, Github } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

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
  data: GitHubApiResponse | null;
}

const GitHubContributionGraph = ({
  username,
  className = "",
  data,
}: GitHubContributionGraphProps) => {
  const [windowWidth, setWindowWidth] = useState(0);

  const [tooltipContent, setTooltipContent] = useState<string | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const contributionColors = useMemo(() => {
    return [
      "var(--contribution-level-0)",
      "var(--contribution-level-1)",
      "var(--contribution-level-2)",
      "var(--contribution-level-3)",
      "var(--contribution-level-4)",
    ];
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    const debouncedResize = debounce(handleResize, 200);
    setWindowWidth(window.innerWidth);
    window.addEventListener("resize", debouncedResize);
    return () => window.removeEventListener("resize", debouncedResize);
  }, []);

  const { weeks, monthLabels, totalContributions } = useMemo(() => {
    if (!data?.contributions) {
      return { weeks: [], monthLabels: [], totalContributions: 0 };
    }

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const filteredContributions = data.contributions
      .filter((c) => new Date(c.date) >= oneYearAgo)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const total = filteredContributions.reduce(
      (sum, day) => sum + day.count,
      0
    );

    const weeksData: ContributionDay[][] = Array.from({ length: 53 }, () => []);
    let currentWeek = 0;
    const currentDate = new Date(filteredContributions[0]?.date);

    filteredContributions.forEach((c) => {
      const date = new Date(c.date);
      const dayOfWeek = date.getDay();

      const diffInDays = Math.floor(
        (date.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)
      );
      currentWeek = Math.floor(diffInDays / 7);

      if (weeksData[currentWeek]) {
        weeksData[currentWeek][dayOfWeek] = c;
      }
    });

    const monthLabelsData: {
      weekIndex: number;
      label: string;
      year: number;
    }[] = [];
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let lastMonth = -1;
    let lastYear = -1;

    weeksData.forEach((week, weekIndex) => {
      const firstDayOfWeek = week.find((d) => d);
      if (firstDayOfWeek) {
        const date = new Date(firstDayOfWeek.date);
        const month = date.getMonth();
        const year = date.getFullYear();
        if (month !== lastMonth || year !== lastYear) {
          monthLabelsData.push({
            weekIndex,
            label: monthNames[month],
            year,
          });
          lastMonth = month;
          lastYear = year;
        }
      }
    });

    return {
      weeks: weeksData,
      monthLabels: monthLabelsData,
      totalContributions: total,
    };
  }, [data]);

  const { cellSize, cellSpacing, graphWidth } = useMemo(() => {
    const size = windowWidth < 640 ? 10 : 12;
    const spacing = windowWidth < 640 ? 2 : 4;
    return {
      cellSize: size,
      cellSpacing: spacing,
      graphWidth: weeks.length * (size + spacing),
    };
  }, [windowWidth, weeks.length]);

  return (
    <div
      className={cn(
        "rounded-2xl bg-background p-4 sm:p-6 border border-border/50 shadow-sm",
        className
      )}
    >
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-2">
            <Github className="h-5 w-5 text-primary" />
            <span className="font-mono text-sm text-primary">@{username}</span>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-xs text-muted-foreground">Less</span>
            <div className="flex space-x-1">
              {contributionColors.map((color, i) => (
                <div
                  key={i}
                  className="h-3 w-3 sm:h-4 sm:w-4 rounded-sm"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground">More</span>
          </div>
        </div>

        <ScrollArea>
          <div className="overflow-visible pb-2 -mx-2 px-2">
            <div
              style={{ width: `${graphWidth}px` }}
              className="relative h-5 mb-1"
            >
              {monthLabels.map(({ weekIndex, label, year }) => (
                <span
                  key={`${year}-${label}`}
                  className="absolute text-xs text-muted-foreground"
                  style={{
                    left: `${weekIndex * (cellSize + cellSpacing)}px`,
                  }}
                >
                  {label}
                </span>
              ))}
            </div>

            <svg
              width={graphWidth}
              height={7 * (cellSize + cellSpacing)}
              className="block"
              aria-label="GitHub contribution graph"
              role="img"
            >
              {weeks.map((week, weekIndex) =>
                week.map((day, dayIndex) => {
                  if (!day) return null;

                  const date = new Date(day.date);
                  const dateString = date.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  });
                  const contributionText =
                    day.count === 1
                      ? "1 contribution"
                      : `${day.count} contributions`;

                  return (
                    <rect
                      key={day.date}
                      x={weekIndex * (cellSize + cellSpacing)}
                      y={dayIndex * (cellSize + cellSpacing)}
                      width={cellSize}
                      height={cellSize}
                      fill={contributionColors[day.level]}
                      rx="2"
                      ry="2"
                      onMouseEnter={(e) => {
                        setTooltipContent(
                          `${contributionText} on ${dateString}`
                        );
                        setTooltipPosition({
                          x: e.clientX,
                          y: e.clientY,
                        });
                      }}
                      onMouseLeave={() => {
                        setTooltipContent(null);
                        setTooltipPosition(null);
                      }}
                    />
                  );
                })
              )}
            </svg>
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="flex justify-center items-center gap-3 text-xs sm:text-sm text-muted-foreground">
          <div className="flex items-center space-x-2 min-w-[120px] sm:min-w-0">
            <Activity className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <span className="truncate">
              {totalContributions}+ contributions in the last year
            </span>
          </div>
        </div>
      </div>

      {tooltipContent && tooltipPosition && (
        <div
          className="fixed z-50 px-3 py-1.5 text-xs bg-gray-800 text-white rounded shadow-lg pointer-events-none"
          style={{
            left: tooltipPosition.x + 10,
            top: tooltipPosition.y + 10,
          }}
        >
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default GitHubContributionGraph;

function debounce<T extends (...args: Parameters<T>) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}
