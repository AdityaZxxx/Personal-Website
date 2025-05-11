import AnimatedSection from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Brain,
  Clock,
  DatabaseIcon,
  GitBranch,
  // Tech Stack Icons
  // Soft Skills Icons
  Lightbulb,
  MessagesSquare,
  Paintbrush,
  RefreshCw,
  Trophy,
  Users,
  ZoomIn,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { AiFillApi } from "react-icons/ai";
import { DiVisualstudio } from "react-icons/di";
import {
  FaAws,
  FaCss3,
  FaDocker,
  FaGithub,
  FaHtml5,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import {
  RiFirebaseFill,
  RiJavascriptFill,
  RiNextjsFill,
  RiSupabaseFill,
  RiTailwindCssFill,
} from "react-icons/ri";
import {
  SiExpress,
  SiGraphql,
  SiMongodb,
  SiPostgresql,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

export const metadata: Metadata = {
  title: "About Me",
  description: "Learn more about my background, skills, and experience.",
};

// Tech stack data with icons
const techStack = {
  frontend: [
    { name: "React", icon: <FaReact className="w-4 h-4 mr-2" /> },
    { name: "Next.js", icon: <RiNextjsFill className="w-4 h-4 mr-2" /> },
    { name: "TypeScript", icon: <SiTypescript className="w-4 h-4 mr-2" /> },
    { name: "JavaScript", icon: <RiJavascriptFill className="w-4 h-4 mr-2" /> },
    {
      name: "Tailwind CSS",
      icon: <RiTailwindCssFill className="w-4 h-4 mr-2" />,
    },
    { name: "CSS/SCSS", icon: <FaCss3 className="w-4 h-4 mr-2" /> },
    { name: "HTML5", icon: <FaHtml5 className="w-4 h-4 mr-2" /> },
  ],
  backend: [
    { name: "Node.js", icon: <FaNodeJs className="w-4 h-4 mr-2" /> },
    { name: "Express", icon: <SiExpress className="w-4 h-4 mr-2" /> },
    { name: "GraphQL", icon: <SiGraphql className="w-4 h-4 mr-2" /> },
    { name: "REST API", icon: <AiFillApi className="w-4 h-4 mr-2" /> },
  ],
  database: [
    { name: "MongoDB", icon: <SiMongodb className="w-4 h-4 mr-2" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="w-4 h-4 mr-2" /> },
    { name: "MySQL", icon: <DatabaseIcon className="w-4 h-4 mr-2" /> },
    { name: "Firebase", icon: <RiFirebaseFill className="w-4 h-4 mr-2" /> },
    { name: "Supabase", icon: <RiSupabaseFill className="w-4 h-4 mr-2" /> },
  ],
  tools: [
    { name: "Git", icon: <GitBranch className="w-4 h-4 mr-2" /> },
    { name: "GitHub", icon: <FaGithub className="w-4 h-4 mr-2" /> },
    { name: "VS Code", icon: <DiVisualstudio className="w-4 h-4 mr-2" /> },
    { name: "Docker", icon: <FaDocker className="w-4 h-4 mr-2" /> },
    { name: "Vercel", icon: <SiVercel className="w-4 h-4 mr-2" /> },
    { name: "AWS", icon: <FaAws className="w-4 h-4 mr-2" /> },
  ],
};

// Soft skills data with icons
const softSkills = [
  { name: "Problem Solving", icon: <Lightbulb className="w-5 h-5 mr-3" /> },
  { name: "Communication", icon: <MessagesSquare className="w-5 h-5 mr-3" /> },
  { name: "Teamwork", icon: <Users className="w-5 h-5 mr-3" /> },
  { name: "Time Management", icon: <Clock className="w-5 h-5 mr-3" /> },
  { name: "Adaptability", icon: <RefreshCw className="w-5 h-5 mr-3" /> },
  { name: "Critical Thinking", icon: <Brain className="w-5 h-5 mr-3" /> },
  { name: "Creativity", icon: <Paintbrush className="w-5 h-5 mr-3" /> },
  { name: "Leadership", icon: <Trophy className="w-5 h-5 mr-3" /> },
  { name: "Attention to Detail", icon: <ZoomIn className="w-5 h-5 mr-3" /> },
];

export default function AboutPage() {
  return (
    <main className="container px-4 py-12 md:px-6 md:py-16 lg:py-20">
      {/* Hero Section */}
      <AnimatedSection className="mb-16">
        <div className="flex flex-col items-center text-center min-h-screen max-h-screen">
          <div className="relative w-40 h-40 mb-8 overflow-hidden rounded-full border-4 border-primary/20 dark:border-primary/30">
            <Image
              src="/profile.webp"
              alt="Aditya"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl pb-2 relative group">
            <span className="relative z-10 bg-gradient-to-r from-primary via-accent/90 to-primary bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent dark:via-accent">
              About Me
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-primary/40 via-accent/30 to-primary/40 dark:from-primary/20 dark:via-accent/15 dark:to-primary/20 bg-clip-text text-transparent blur-[12px] opacity-80 group-hover:opacity-100 transition-opacity duration-300">
              About Me
            </span>
            <span className="absolute -bottom-1 left-0 h-[3px] bg-gradient-to-r from-primary to-accent w-0 group-hover:w-full transition-all duration-700 ease-out [background-size:200%_auto] group-hover:animate-gradient" />
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed mt-4">
            Full-stack developer passionate about creating beautiful,
            functional, and user-friendly web applications.
          </p>
        </div>
      </AnimatedSection>

      {/* My Story Section */}
      <AnimatedSection className="mb-16" delay={100}>
        <div className="grid gap-8 md:grid-cols-[2fr_1fr] items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">My Journey</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Having no formal IT background, I learned to code from the
                internet and the help of AI. Starting from HTML, JavaScript,
                until finally falling in love with the React & Next.js
                ecosystem.
              </p>
              <p>
                Now I am actively creating small projects, experimenting with
                AI, and exploring the digital world. I believe that learning
                doesn't have to be linear — as long as you are consistent and
                curious, you can do it.
              </p>
              <p>
                Most of the time, I write code with Copilot or ChatGPT. But
                that's not a weakness — it's how I develop my skills and deliver
                things quickly.
              </p>
            </div>
          </div>
          <div className="relative h-64 w-full md:h-80 lg:h-96">
            {" "}
            <Image
              src="/im-coding.webp"
              alt="Working on code"
              fill
              className="object-cover rounded-lg border-4 border-primary/20 dark:border-primary/30"
              priority
            />
          </div>
        </div>
      </AnimatedSection>

      {/* What I Do Section */}
      <AnimatedSection className="mb-16" delay={200}>
        <h2 className="text-3xl font-bold tracking-tighter mb-8">What I Do</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="overflow-hidden transition-transform hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Web Development</h3>
              <p className="text-muted-foreground">
                Building responsive, accessible, and performant web applications
                using modern frameworks and best practices.
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden transition-transform hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 3v14"></path>
                  <path d="m17 8-5-5-5 5"></path>
                  <path d="M8 21h8"></path>
                  <path d="M12 17v4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">UI/UX Design</h3>
              <p className="text-muted-foreground">
                Creating intuitive and visually appealing user interfaces with a
                focus on user experience and accessibility.
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden transition-transform hover:scale-[1.02]">
            <CardContent className="p-6">
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                  <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                  <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Full-Stack Development</h3>
              <p className="text-muted-foreground">
                Developing end-to-end solutions with robust backend systems and
                seamless frontend experiences.
              </p>
            </CardContent>
          </Card>
        </div>
      </AnimatedSection>

      {/* Tech Stack Section */}
      <AnimatedSection className="mb-16" delay={300}>
        <h2 className="text-3xl font-bold tracking-tighter mb-8">Tech Stack</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {Object.entries(techStack).map(([category, items]) => (
            <Card
              key={category}
              className="h-full group/card hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <CardContent className="p-6 h-full flex flex-col">
                <h3 className="font-bold mb-4 text-lg capitalize flex items-center">
                  <span className="relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 group-hover/card:after:w-full">
                    {category}
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2 flex-grow">
                  {items.map((tech) => (
                    <Badge
                      key={tech.name}
                      variant="secondary"
                      className="flex items-center px-3 py-1 transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:shadow-sm hover:scale-105"
                    >
                      <span className="transition-transform duration-200 group-hover/badge:scale-110">
                        {tech.icon}
                      </span>
                      <span className="ml-2">{tech.name}</span>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedSection>

      {/* Soft Skills Section */}
      <AnimatedSection className="mb-16" delay={400}>
        <h2 className="text-3xl font-bold tracking-tighter mb-8">
          Soft Skills
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {softSkills.map((skill) => (
            <div
              key={skill.name}
              className="relative flex items-center p-4 border rounded-lg hover:bg-accent/5 transition-all duration-300 group overflow-hidden"
            >
              {/* Background highlight effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />

              {/* Icon animation */}
              <div className="mr-3 rounded-full bg-primary/10 p-2 text-primary group-hover:bg-primary/20 group-hover:text-primary/90 transition-all duration-300">
                {skill.icon}
              </div>

              {/* Text with underline effect */}
              <span className="font-medium relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-0.5 after:bg-primary after:transition-all after:duration-300 group-hover:after:w-full">
                {skill.name}
              </span>

              {/* Subtle pulse effect */}
              <div className="absolute -right-2 -top-2 w-16 h-16 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-all duration-1000 -z-20" />
            </div>
          ))}
        </div>
      </AnimatedSection>
    </main>
  );
}
