import { cn } from "@/lib/utils";

interface PageHeroProps {
  className?: string;
  icon: React.ReactNode;
  title: string;
  coloredTitle: string;
  description: string;
}

const PageHero = ({
  icon,
  title,
  coloredTitle,
  description,
  className,
}: PageHeroProps) => {
  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      <div className="relative inline-flex items-center justify-center p-2">
        <div
          className={cn(
            "absolute inset-0 rounded-lg backdrop-blur-lg",
            "bg-white/40 dark:bg-neutral-900/60",
            "border border-white/30 dark:border-neutral-700/50",
            "shadow-sm hover:shadow-md transition-shadow",
            "group-hover:bg-white/50 dark:group-hover:bg-neutral-800/70"
          )}
        />
        <div
          className={cn(
            "relative z-10",
            "text-neutral-700 dark:text-neutral-300",
            "group-hover:text-neutral-900 dark:group-hover:text-neutral-100"
          )}
        >
          {icon}
        </div>
      </div>
      <div className="text-center z-10">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground ">
          {title}{" "}
          <span className="bg-[length:200%_200%] bg-clip-text text-transparent  bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400">
            {coloredTitle}
          </span>
        </h2>
        <p className="transition-colors max-w-3xl bg-gradient-to-r from-neutral-400/80 via-neutral-600 to-neutral-400/80 dark:from-neutral-500/80 dark:via-neutral-300 dark:to-neutral-500/80 bg-clip-text text-transparent">
          {description}
        </p>
      </div>
    </div>
  );
};

export default PageHero;
