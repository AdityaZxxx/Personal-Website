"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Github } from "lucide-react"
import { useEffect, useState } from "react"

interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

interface GitHubApiResponse {
  total: Record<string, number>
  contributions: ContributionDay[]
}

interface GitHubContributionGraphProps {
  username: string
}

export function GitHubContributionGraph({ username }: GitHubContributionGraphProps) {
  const [contributionData, setContributionData] = useState<GitHubApiResponse | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchContributions() {
      try {
        setLoading(true)
        const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}`)

        if (!response.ok) {
          throw new Error("Failed to fetch GitHub contributions")
        }

        const data = await response.json()
        setContributionData(data)
      } catch (err) {
        console.error("Error fetching GitHub contributions:", err)
        setError("Could not load GitHub contributions")
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      fetchContributions()
    }
  }, [username])

  const getLevelColor = (level: number) => {
    const colors = [
      "bg-gray-100 dark:bg-gray-800", // Level 0
      "bg-emerald-100 dark:bg-emerald-900", // Level 1
      "bg-emerald-300 dark:bg-emerald-700", // Level 2
      "bg-emerald-500 dark:bg-emerald-500", // Level 3
      "bg-emerald-700 dark:bg-emerald-300", // Level 4
    ]
    return colors[level] || colors[0]
  }

  // Process contributions into weeks for display
  const getContributionWeeks = () => {
    if (!contributionData?.contributions) return []

    // Get only the last year of contributions
    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

    const lastYearContributions = contributionData.contributions.filter(
      (contrib) => new Date(contrib.date) >= oneYearAgo,
    )

    // Sort by date
    const sortedContributions = [...lastYearContributions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    )

    // Group by week
    const weeks: ContributionDay[][] = []
    let currentWeek: ContributionDay[] = []
    const currentDay = 0

    sortedContributions.forEach((contrib) => {
      const date = new Date(contrib.date)
      const dayOfWeek = date.getDay()

      // If we're at the start of a new week (Sunday) and we have days in the current week
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        weeks.push([...currentWeek])
        currentWeek = []
      }

      // Add the current day
      currentWeek.push(contrib)

      // If we're at the end of the data, push the remaining week
      if (sortedContributions.indexOf(contrib) === sortedContributions.length - 1) {
        weeks.push([...currentWeek])
      }
    })

    return weeks
  }

  // Calculate total contributions for the last year
  const getLastYearTotal = () => {
    if (!contributionData?.contributions) return 0

    const oneYearAgo = new Date()
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

    return contributionData.contributions
      .filter((contrib) => new Date(contrib.date) >= oneYearAgo)
      .reduce((total, day) => total + day.count, 0)
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Github className="h-5 w-5" />
            <span>Could not load GitHub contributions</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  const weeks = getContributionWeeks()
  const lastYearTotal = getLastYearTotal()

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            <h3 className="font-medium">GitHub Contributions</h3>
          </div>
          {!loading && contributionData && (
            <span className="text-sm text-muted-foreground">{lastYearTotal} contributions in the last year</span>
          )}
        </div>

        {loading ? (
          <div className="space-y-2">
            <Skeleton className="h-[100px] w-full" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex gap-[3px] min-w-[750px]">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-[3px]">
                  {week.map((day, dayIndex) => (
                    <div
                      key={`${weekIndex}-${dayIndex}`}
                      className={`w-3 h-3 rounded-sm ${getLevelColor(day.level)}`}
                      title={`${day.count} contributions on ${day.date}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

