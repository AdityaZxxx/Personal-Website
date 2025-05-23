import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils"; // Assuming you have a cn utility
import { ArrowRight, Gift, Popcorn } from "lucide-react"; // Using Popcorn from lucide-react
import Link from "next/link";

interface TrakteerSupportProps {
  username: string;
  text?: string;
  className?: string;
}

export function TrakteerSupport({
  username,
  text = "Enjoying the content? Fuel more creations with some digital popcorn!",
  className,
}: TrakteerSupportProps) {
  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-xl border-2 border-transparent bg-card text-card-foreground shadow-lg transition-all duration-300 ease-out hover:shadow-2xl hover:border-purple-500/50 dark:hover:border-purple-400/60",
        "bg-gradient-to-br from-slate-50 via-gray-50 to-stone-100 dark:from-slate-900 dark:via-gray-800/95 dark:to-neutral-900", // Subtle background gradient
        className
      )}
    >
      <div className="absolute -top-12 -right-12 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500">
        <Popcorn
          className="h-40 w-40 text-purple-400/70 dark:text-purple-500/50 animate-pulse group-hover:animate-none"
          style={{ animationDuration: "3s" }}
        />
      </div>

      <div className="relative z-10 flex h-full flex-col p-6 space-y-6">
        {/* Icon & Title Section */}
        <div className="flex flex-col items-start space-y-3">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-purple-600 rounded-lg shadow-md text-white">
            <Gift className="h-7 w-7" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-gray-800 dark:text-gray-100">
            Support My Work
          </h2>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 dark:text-gray-400 flex-grow leading-relaxed">
          {text}
        </p>

        {/* Popcorn visual (subtle) */}
        <div className="flex items-center justify-start space-x-2 opacity-80 group-hover:opacity-100 transition-opacity">
          <Popcorn className="h-5 w-5 text-yellow-500" />
          <Popcorn className="h-6 w-6 text-yellow-400" />
          <Popcorn className="h-5 w-5 text-yellow-500" />
          <span className="text-xs text-muted-foreground ml-1">
            every bit helps!
          </span>
        </div>

        {/* Call to Action Button */}
        <div className="mt-auto pt-4">
          <Link
            href={`https://trakteer.id/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full block"
            aria-label={`Support ${username} on Trakteer`}
          >
            <Button
              size="lg" // Make button a bit larger
              className={cn(
                "w-full font-semibold text-base text-white transition-all duration-300 ease-out transform active:scale-[0.97]",
                "bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-500 hover:to-pink-400", // Main gradient
                "shadow-lg hover:shadow-pink-500/40 dark:hover:shadow-pink-400/30", // Enhanced hover shadow
                "group-hover:scale-[1.01] group-hover:brightness-110" // Button reacts to card hover too
              )}
            >
              Trakteer Me
              <ArrowRight className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
