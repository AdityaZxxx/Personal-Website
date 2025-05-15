import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Database, GitBranch } from "lucide-react";
import * as motion from "motion/react-client";
import {
  FaAws,
  FaDocker,
  FaGithub,
  FaJs,
  FaNodeJs,
  FaReact
} from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssLine } from "react-icons/ri";
import {
  SiFirebase,
  SiGo,
  SiGraphql,
  SiMysql,
  SiSupabase,
  SiTypescript,
} from "react-icons/si";

interface Tech {
  name: string;
  icon: React.ReactNode;
}

interface TechStack {
  [category: string]: Tech[];
}

const techStack: TechStack = {
  Frontend: [
    { name: "Javascript", icon: <FaJs size={20} /> },
    { name: "Typescript", icon: <SiTypescript size={20} /> },
    { name: "React", icon: <FaReact size={20} /> },
    { name: "Next.js", icon: <RiNextjsFill size={20} /> },
    { name: "Tailwind CSS", icon: <RiTailwindCssLine size={20} /> },
  ],
  Backend: [
    { name: "Node.js", icon: <FaNodeJs size={20} /> },
    { name: "GraphQL", icon: <SiGraphql size={20} /> },
    { name: "Golang", icon: <SiGo size={20} /> },
  ],
  Database: [
    { name: "PostgreSQL", icon: <Database size={20} /> },
    { name: "Firebase", icon: <SiFirebase size={20} /> },
    { name: "Supabase", icon: <SiSupabase size={20} /> },
    { name: "MySQL", icon: <SiMysql size={20} /> },
  ],
  DevOps: [
    { name: "Git", icon: <GitBranch size={20} /> },
    { name: "Docker", icon: <FaDocker size={20} /> },
    { name: "AWS", icon: <FaAws size={20} /> },
    { name: "GitHub", icon: <FaGithub size={20} /> },
  ],
};

const TechStackSection = () => {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tighter mb-12 lg:text-center sm:text-left bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Tech Stack
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(techStack).map(([category, items], index) => {
            const categoryColors = [
              "bg-blue-500/10 text-blue-400",
              "bg-purple-500/10 text-purple-400",
              "bg-green-500/10 text-green-400",
              "bg-yellow-500/10 text-yellow-400",
            ];

            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
              >
                <Card
                  className={cn(
                    "h-full group",
                    "bg-gradient-to-br from-white/10 to-white/5", // Latar belakang lebih terang
                    "backdrop-blur-md", // Efek blur latar belakang
                    "rounded-xl border border-white/10", // Tepi membulat dan border tipis
                    "shadow-lg", // Tambah bayangan halus
                    "transition-all duration-300",
                    "hover:translate-y-[-8px] hover:shadow-2xl", // Efek melayang dan bayangan lebih besar
                    "overflow-hidden", // Penting untuk sudut membulat di dalam
                    "relative", // Untuk positioning pseudo-element
                    "before:absolute before:inset-0 before:rounded-xl", // Pseudo-element untuk border animasi
                    "before:bg-gradient-to-br before:from-purple-500/20 before:to-pink-500/20", // Gradien border
                    "before:opacity-0 before:transition-opacity before:duration-300", // Transisi opasitas
                    "group-hover:before:opacity-100" // Tampilkan border animasi saat hover
                  )}
                >
                  <CardContent className="p-6 h-full flex flex-col">
                    <h3
                      className={cn(
                        "font-bold mb-6 text-lg capitalize",
                        categoryColors[index % categoryColors.length],
                        "text-white", // Teks putih
                        "relative", // Untuk efek garis bawah
                        "after:absolute after:bottom-[-2px] after:left-0 after:h-[2px]", // Garis bawah yang lebih tipis
                        "after:w-0 after:bg-current after:transition-all after:duration-300",
                        "group-hover:after:w-full" // Animasi garis bawah saat hover
                      )}
                    >
                      <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-white">
                        {category}
                      </span>
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {items.map((tech) => (
                        <Badge
                          key={tech.name}
                          variant="outline"
                          className={cn(
                            "flex items-center px-4 py-2 rounded-full transition-all duration-300",
                            "bg-white/5 text-white border border-white/10",
                            "hover:bg-opacity-20 hover:scale-105 shadow-md",
                            "hover:text-white hover:border-white/20" // Keep text white on hover
                          )}
                        >
                          <span className="mr-2">{tech.icon}</span>
                          <span>{tech.name}</span>
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
