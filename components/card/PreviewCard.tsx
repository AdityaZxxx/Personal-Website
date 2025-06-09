import { ArrowRight, Code, Eye, Github, Terminal } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

// Placeholder Visual - Refined with explicit mock code
const ProjectVisualPlaceholder = () => {
  return (
    <motion.div
      className="group/placeholder relative aspect-[16/10] overflow-hidden rounded-lg border border-slate-700/50 bg-slate-800/70 shadow-inner transition-all duration-300 hover:border-sky-600/70"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      {/* Browser-style top bar - more subtle */}
      <div className="flex h-5 items-center gap-1.5 border-b border-slate-700/60 bg-slate-700/50 px-2.5 shadow-sm">
        <div className="h-2 w-2 rounded-full bg-red-500/80"></div>
        <div className="h-2 w-2 rounded-full bg-yellow-500/80"></div>
        <div className="h-2 w-2 rounded-full bg-green-500/80"></div>
        <div className="ml-2 h-2.5 flex-grow rounded-sm bg-slate-600/40 opacity-50 group-hover/placeholder:opacity-75"></div>
      </div>

      {/* Explicit Mock Code Representation */}
      <div className="p-3 font-mono text-[0.65rem] leading-relaxed text-slate-300 sm:text-xs sm:leading-normal">
        <div className="flex">
          <span className="mr-2 w-4 flex-shrink-0 text-right text-slate-500">
            1
          </span>
          <span className="ml-0 sm:ml-0">
            <span className="text-pink-400">const</span>{" "}
            <span className="text-sky-300"> project</span>{" "}
            <span className="text-slate-400">=</span>{" "}
            <span className="text-slate-200">{"{"}</span>
          </span>
        </div>
        <div className="flex">
          <span className="mr-2 w-4 flex-shrink-0 text-right text-slate-500">
            2
          </span>
          <span className="ml-3 sm:ml-4">
            <span className="text-sky-300">name</span>
            <span className="text-slate-400">:</span>{" "}
            <span className="text-amber-300">&apos;Aditya Rahmad&apos;</span>
            <span className="text-slate-400">,</span>
          </span>
        </div>
        <div className="flex">
          <span className="mr-2 w-4 flex-shrink-0 text-right text-slate-500">
            3
          </span>
          <span className="ml-3 sm:ml-4">
            <span className="text-sky-300">status</span>
            <span className="text-slate-400">:</span>{" "}
            <span className="text-purple-300">&apos;Free&apos;</span>
            <span className="text-slate-400">,</span>
          </span>
        </div>
        <div className="flex">
          <span className="mr-2 w-4 flex-shrink-0 text-right text-slate-500">
            4
          </span>
          <span className="ml-3 sm:ml-4">
            <span className="text-sky-300">tech</span>
            <span className="text-slate-400">:</span>{" "}
            <span className="text-slate-200">[</span>
            <span className="text-amber-300">&apos;Next.js&apos;</span>
            <span className="text-slate-400">,</span>{" "}
            <span className="text-amber-300">&apos;TRPC&apos;</span>
            <span className="text-slate-400">,</span>{" "}
            <span className="text-amber-300">&apos;React&apos;</span>
            <span className="text-slate-200">]</span>
          </span>
        </div>
        <div className="flex">
          <span className="mr-2 w-4 flex-shrink-0 text-right text-slate-500">
            5
          </span>
          <span className="text-slate-200">{"}"};</span>
        </div>
      </div>

      {/* Subtle Icon in corner */}
      <Terminal
        size={28} // Ukuran disesuaikan
        className="absolute right-2.5 bottom-2.5 text-slate-600/40 opacity-60 transition-all duration-300 group-hover/placeholder:text-sky-500/40 group-hover/placeholder:opacity-75"
      />

      {/* Subtle shine on hover */}
      <motion.div
        className="absolute inset-0 z-10"
        initial={{ x: "-100%", opacity: 0 }}
        whileHover={{
          x: "100%",
          opacity: 0.08,
          transition: { duration: 0.7, ease: "easeOut" },
        }} // Opacity dikurangi
        style={{
          backgroundImage:
            "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
        }}
      />
    </motion.div>
  );
};

export const ProjectsPreviewCard = ({ className }: { className?: string }) => {
  const technologies = [
    "React",
    "Next.js",
    "TailwindCSS",
    "TypeScript",
    "Node.js",
    "Drizzle",
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      viewport={{ once: true, amount: 0.1 }}
      className={cn(
        "group/card relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-5 md:p-6",
        "border border-slate-700/50 bg-gradient-to-br from-slate-800/70 via-slate-800/50 to-slate-900/70 backdrop-blur-lg",
        "shadow-xl shadow-slate-900/30 transition-all duration-300 hover:border-sky-600/70 hover:shadow-sky-600/20",
        className
      )}
    >
      {/* Subtle Animated background orbs */}
      <motion.div
        className="absolute inset-0 -z-10 opacity-20"
        animate={{}} // Can add subtle animations here if desired
      >
        <motion.div
          className="absolute top-[-20%] left-[-10%] h-48 w-48 rounded-full bg-sky-500/15 blur-3xl md:h-56 md:w-56"
          animate={{ scale: [1, 1.03, 1], opacity: [0.7, 0.9, 0.7] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[-10%] bottom-[-20%] h-40 w-40 rounded-full bg-purple-600/15 blur-3xl md:h-48 md:w-48"
          animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.8, 0.6] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        />
      </motion.div>

      {/* Content Area */}
      <div className="relative z-10 flex flex-grow flex-col">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-3"
        >
          <div className="mb-1 flex items-center gap-2">
            <Code size={20} className="text-sky-400" />
            <h3 className="text-lg font-semibold text-slate-100 md:text-xl">
              Featured Projects
            </h3>
          </div>
          <p className="text-xs text-slate-400 sm:text-sm">
            A glimpse into impactful web solutions I&apos;ve crafted.
          </p>
        </motion.div>

        <div className="mb-4 flex-grow">
          {" "}
          {/* flex-grow agar placeholder mengisi ruang */}
          <ProjectVisualPlaceholder />
        </div>

        <motion.div
          className="mb-4 flex flex-wrap gap-1.5 md:gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.05, delayChildren: 0.8 }}
        >
          {technologies.map((tech) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{
                scale: 1.08,
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
            >
              <Badge
                variant="secondary"
                className="cursor-default border-slate-600/50 bg-slate-700/50 px-2.5 py-1 text-[0.7rem] font-medium text-slate-300 backdrop-blur-sm transition-colors hover:border-sky-500/60 hover:bg-slate-700/80 hover:text-sky-300 sm:text-xs"
              >
                {tech}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Action Buttons Area */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }} // Delay after badges
        className="relative z-10 mt-auto flex flex-col gap-2 pt-2 sm:flex-row sm:justify-between"
      >
        <Button
          variant="ghost"
          size="sm"
          className="group/gitbutton flex-grow items-center justify-center gap-1.5 rounded-md px-3 py-2 text-xs text-slate-300 transition-colors hover:bg-slate-700/70 hover:text-slate-100 sm:flex-grow-0 md:text-sm"
          asChild
        >
          <Link
            href="https://github.com/AdityaZxxx"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github
              size={14}
              className="transition-transform duration-300 group-hover/gitbutton:scale-110"
            />
            View on GitHub
          </Link>
        </Button>
        <Button
          size="sm"
          className={cn(
            "group/demobutton relative inline-flex flex-grow items-center justify-center gap-1.5 overflow-hidden rounded-md px-3 py-2 text-xs font-medium outline-none md:text-sm",
            "bg-gradient-to-r from-sky-500 via-sky-400 to-blue-500 text-white shadow-md",
            "transition-all duration-300 ease-out hover:shadow-lg hover:shadow-sky-500/30 focus-visible:ring-2 focus-visible:ring-sky-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 sm:flex-grow-0"
          )}
          asChild
        >
          <Link href="/projects">
            {" "}
            {/* Ganti dengan link ke halaman project Anda */}
            {/* Pulsing background element */}
            <motion.span
              className="absolute inset-0 z-0"
              animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.25, 0.1] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background:
                  "radial-gradient(circle, rgba(56,189,248,0.6) 0%, transparent 65%)",
                borderRadius: "inherit",
              }}
            />
            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 z-0"
              initial={{ x: "-110%", skewX: "-20deg", opacity: 0 }}
              whileHover={{
                x: "110%",
                opacity: 0.3,
                transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] },
              }}
              style={{
                backgroundImage:
                  "linear-gradient(to right, transparent 0%, rgba(255,255,255,0.7) 50%, transparent 100%)",
              }}
            />
            <span className="relative z-10 flex items-center">
              <Eye
                size={14}
                className="mr-1.5 transition-transform duration-300 group-hover/demobutton:scale-110"
              />
              Explore Projects
            </span>
            <ArrowRight
              size={14}
              className="relative z-10 ml-0.5 transition-transform duration-300 group-hover/demobutton:translate-x-0.5"
            />
          </Link>
        </Button>
      </motion.div>
    </motion.div>
  );
};
