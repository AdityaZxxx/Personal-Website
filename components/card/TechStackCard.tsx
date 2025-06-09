"use client";

import { Briefcase } from "lucide-react";
import React from "react";
import { FaNode } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import {
  SiBun,
  SiDocker,
  SiDrizzle,
  SiFramer,
  SiGit,
  SiGithub,
  SiLinux,
  SiNpm,
  SiPnpm,
  SiPostgresql,
  SiReact,
  SiShadcnui,
  SiSupabase,
  SiTailwindcss,
  SiTrpc,
  SiTypescript,
  SiZod,
} from "react-icons/si";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";

const technologies = [
  {
    name: "TypeScript",
    icon: <SiTypescript className="h-3.5 w-3.5 text-blue-400" />,
    color: "text-blue-400",
  },
  {
    name: "React",
    icon: <SiReact className="h-3.5 w-3.5 text-sky-400" />,
    color: "text-sky-400",
  },
  {
    name: "Next.js",
    icon: <RiNextjsFill className="h-3.5 w-3.5 text-white" />,
    color: "text-white",
  },
  {
    name: "Tailwind CSS",
    icon: <SiTailwindcss className="h-3.5 w-3.5 text-teal-400" />,
    color: "text-teal-400",
  },
  {
    name: "Node.js",
    icon: <FaNode className="h-3.5 w-3.5 text-green-500" />,
    color: "text-green-500",
  },
  {
    name: "PostgreSQL",
    icon: <SiPostgresql className="h-3.5 w-3.5 text-indigo-400" />,
    color: "text-indigo-400",
  },
  {
    name: "Framer Motion",
    icon: <SiFramer className="h-3.5 w-3.5 text-pink-400" />,
    color: "text-pink-400",
  },
  {
    name: "Drizzle ORM",
    icon: <SiDrizzle className="h-3.5 w-3.5 text-lime-400" />,
    color: "text-lime-400",
  },
  {
    name: "tRPC",
    icon: <SiTrpc className="h-3.5 w-3.5 text-orange-400" />,
    color: "text-orange-400",
  },
  {
    name: "Supabase",
    icon: <SiSupabase className="h-3.5 w-3.5 text-emerald-400" />,
    color: "text-emerald-400",
  },
  {
    name: "Zod",
    icon: <SiZod className="h-3.5 w-3.5 text-emerald-500" />,
    color: "text-emerald-500",
  },
  {
    name: "Linux",
    icon: <SiLinux className="h-3.5 w-3.5 text-yellow-400" />,
    color: "text-yellow-400",
  },
  {
    name: "Pnpm",
    icon: <SiPnpm className="h-3.5 w-3.5 text-orange-500" />,
    color: "text-orange-500",
  },
  {
    name: "Bun",
    icon: <SiBun className="h-3.5 w-3.5 text-white" />,
    color: "text-white",
  },
  {
    name: "Npm",
    icon: <SiNpm className="h-3.5 w-3.5 text-red-500" />,
    color: "text-red-500",
  },
  {
    name: "Git",
    icon: <SiGit className="h-3.5 w-3.5 text-orange-500" />,
    color: "text-orange-500",
  },
  {
    name: "Github",
    icon: <SiGithub className="h-3.5 w-3.5 text-gray-300" />,
    color: "text-gray-300",
  },
  {
    name: "Docker",
    icon: <SiDocker className="h-3.5 w-3.5 text-blue-500" />,
    color: "text-blue-500",
  },
  {
    name: "ShadCn UI",
    icon: <SiShadcnui className="h-3.5 w-3.5 text-sky-500" />,
    color: "text-sky-500",
  },
];

// OPTIMASI TOTAL PADA KOMPONEN INI
const TechMarquee = ({
  items,
  direction = "left",
  speed = "fast",
  className,
}: {
  items: { name: string; icon: React.ReactNode; color: string }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  className?: string;
}) => {
  // Durasi animasi di-map langsung ke nilai CSS
  const duration =
    speed === "fast" ? "20s" : speed === "normal" ? "40s" : "80s";

  return (
    // Menggunakan data-attributes untuk kejelasan, bukan state 'start'
    <div
      data-direction={direction}
      className={cn(
        "scroller w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
        className
      )}
    >
      {/* Tidak ada lagi useRef atau useEffect.
        Kita render list dua kali secara langsung di JSX.
        Ini memastikan output server & client sama, MENGHILANGKAN HYDRATION ERROR.
      */}
      <div
        // Variabel CSS untuk durasi & arah dilewatkan langsung via style prop
        style={
          {
            "--animation-duration": duration,
            "--animation-direction":
              direction === "left" ? "forwards" : "reverse",
          } as React.CSSProperties
        }
        className="flex w-max min-w-full shrink-0 flex-nowrap gap-3 animate-scroll"
      >
        {/* Render Pertama Kali */}
        {items.map((item, idx) => (
          <div className="relative shrink-0" key={`${item.name}-${idx}`}>
            <Badge
              variant="outline"
              className={cn(
                "flex items-center gap-1.5 border-slate-700 bg-slate-800/50 px-3 py-1.5 backdrop-blur-sm",
                item.color
              )}
            >
              {item.icon}
              <span className="text-sm font-medium text-slate-200">
                {item.name}
              </span>
            </Badge>
          </div>
        ))}
        {/* Render Kedua Kali (Duplikat untuk efek infinite) */}
        {items.map((item, idx) => (
          <div
            className="relative shrink-0"
            key={`${item.name}-${idx}-duplicate`}
            aria-hidden="true" // Penting untuk aksesibilitas, agar screen reader tidak membacanya dua kali
          >
            <Badge
              variant="outline"
              className={cn(
                "flex items-center gap-1.5 border-slate-700 bg-slate-800/50 px-3 py-1.5 backdrop-blur-sm",
                item.color
              )}
            >
              {item.icon}
              <span className="text-sm font-medium text-slate-200">
                {item.name}
              </span>
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TechStackCard = ({ className }: { className?: string }) => {
  // Split technologies into three rows
  const rowSize = Math.ceil(technologies.length / 3);
  const rows = [
    technologies.slice(0, rowSize),
    technologies.slice(rowSize, rowSize * 2),
    technologies.slice(rowSize * 2),
  ];

  return (
    <div
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6 md:p-8",
        "border border-slate-700/50 bg-gradient-to-br from-slate-800/70 to-slate-900/70 backdrop-blur-md",
        "shadow-xl transition-all duration-300 hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-600/20",
        className
      )}
    >
      {/* Glow effect */}
      <div className="absolute -inset-1 -z-10 bg-gradient-to-r from-sky-500/10 to-purple-500/10 opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-50" />

      <div className="flex flex-col">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10">
            <Briefcase className="h-5 w-5 text-sky-400" />
          </div>
          <h3 className="text-xl font-semibold text-slate-100 md:text-2xl">
            Cutting-Edge Tech Stack
          </h3>
        </div>
        <p className="mb-6 text-sm text-slate-400">
          Technologies I work with and passionate about
        </p>
      </div>

      {/* Three marquee rows with different speeds and directions */}
      <div className="flex flex-col gap-3">
        <TechMarquee
          items={rows[0]!}
          direction="left"
          speed="normal"
          className="h-8"
        />
        <TechMarquee
          items={rows[1]!}
          direction="right"
          speed="fast"
          className="h-8"
        />
        <TechMarquee
          items={rows[2]!}
          direction="left"
          speed="normal"
          className="h-8"
        />
      </div>
    </div>
  );
};
