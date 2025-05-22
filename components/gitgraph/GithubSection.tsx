import { ArrowRight } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { GitHubContributionGraph } from "./GithubContributionGraph";
export default function GithubSection() {
  return (
    <section
      id="github-activity"
      className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="github-heading"
    >
      {/* Background elements with reduced motion */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-green-900/10 to-transparent opacity-20" />
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-green-500/10 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Header with semantic HTML */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="mb-12 text-center"
        >
          <h2
            id="github-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 mb-4"
          >
            My Coding Activity
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            I believe in consistent progress. Here's my GitHub contribution
            graph showing my daily coding activity over the past year.
          </p>
        </motion.div>

        {/* Contribution graph with reduced motion */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          className="flex justify-center mb-12 px-2 sm:px-0"
        >
          <div className="w-full max-w-4xl">
            <GitHubContributionGraph
              username="AdityaZxxx"
              className="w-full hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] transition-all duration-300"
              aria-label="GitHub contribution graph"
            />
          </div>
        </motion.div>

        {/* CTA button with better accessibility */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link
            href="https://github.com/AdityaZxxx"
            target="_blank"
            rel="noopener noreferrer"
            className={`
              inline-flex items-center px-6 py-3 rounded-full 
              bg-gradient-to-r from-green-500 to-emerald-600 
              text-white font-medium 
              hover:shadow-lg hover:shadow-green-500/20 
              focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-slate-900
              transition-all duration-300 
              group
            `}
            aria-label="View full GitHub profile (opens in new tab)"
          >
            View Full GitHub Profile
            <span className="sr-only">(opens in new tab)</span>
            <ArrowRight
              className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
