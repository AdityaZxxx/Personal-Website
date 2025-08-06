import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import LazyGithubContributionGraph from "./LazyGithubContributionGraph";
export function GithubSection() {
  return (
    <section
      id="github-activity"
      className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="github-heading"
    >
      <div className="relative max-w-5xl mx-auto">
        <div className="mb-12 text-center">
          <h2
            id="github-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4"
          >
            My Coding Activity
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            I believe in consistent progress. Here&apos;s my GitHub contribution
            graph showing my daily coding activity over the past year.
          </p>
        </div>

        <div className="flex justify-center mb-12 px-2 sm:px-0">
          <div className="w-full max-w-4xl">
            <LazyGithubContributionGraph username="AdityaZxxx" />
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="https://github.com/AdityaZxxx">
            <Button
              variant="outline"
              className="group rounded-full cursor-pointer border-border bg-background hover:bg-accent px-6 py-3 text-base text-foreground transition-all hover:text-primary"
            >
              See My GitHub
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
