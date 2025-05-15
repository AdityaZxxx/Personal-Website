import AnimatedSection from "@/components/animated-section";
import { Card, CardContent } from "@/components/ui/card";
import { DatabaseIcon, GitBranch } from "lucide-react";
import * as motion from "motion/react-client";
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
import AboutSoftSkill from "../../components/about/AboutSoftSkill";
import AboutHero from "../../components/about/Hero";
import TechStackSection from "../../components/about/TechStackSection";
import { Timeline } from "../../components/about/TimelineJourney";

// Tech stack data with icons
const techStack = {
  frontend: [
    { name: "React", icon: <FaReact className="w-5 h-5" /> },
    { name: "Next.js", icon: <RiNextjsFill className="w-5 h-5" /> },
    { name: "TypeScript", icon: <SiTypescript className="w-5 h-5" /> },
    { name: "JavaScript", icon: <RiJavascriptFill className="w-5 h-5" /> },
    { name: "Tailwind CSS", icon: <RiTailwindCssFill className="w-5 h-5" /> },
    { name: "CSS/SCSS", icon: <FaCss3 className="w-5 h-5" /> },
    { name: "HTML5", icon: <FaHtml5 className="w-5 h-5" /> },
  ],
  backend: [
    { name: "Node.js", icon: <FaNodeJs className="w-5 h-5" /> },
    { name: "Express", icon: <SiExpress className="w-5 h-5" /> },
    { name: "GraphQL", icon: <SiGraphql className="w-5 h-5" /> },
    { name: "REST API", icon: <AiFillApi className="w-5 h-5" /> },
  ],
  database: [
    { name: "MongoDB", icon: <SiMongodb className="w-5 h-5" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="w-5 h-5" /> },
    { name: "MySQL", icon: <DatabaseIcon className="w-5 h-5" /> },
    { name: "Firebase", icon: <RiFirebaseFill className="w-5 h-5" /> },
    { name: "Supabase", icon: <RiSupabaseFill className="w-5 h-5" /> },
  ],
  tools: [
    { name: "Git", icon: <GitBranch className="w-5 h-5" /> },
    { name: "GitHub", icon: <FaGithub className="w-5 h-5" /> },
    { name: "VS Code", icon: <DiVisualstudio className="w-5 h-5" /> },
    { name: "Docker", icon: <FaDocker className="w-5 h-5" /> },
    { name: "Vercel", icon: <SiVercel className="w-5 h-5" /> },
    { name: "AWS", icon: <FaAws className="w-5 h-5" /> },
  ],
};

// Timeline data
const timelineData = [
  {
    title: "2020",
    content: (
      <p className="text-neutral-600 dark:text-neutral-400">
        Started learning web development basics (HTML, CSS, JavaScript) through
        online resources.
      </p>
    ),
  },
  {
    title: "2021",
    content: (
      <p className="text-neutral-600 dark:text-neutral-400">
        Built first projects and discovered React. Began contributing to open
        source.
      </p>
    ),
  },
  {
    title: "2022",
    content: (
      <p className="text-neutral-600 dark:text-neutral-400">
        Deepened knowledge in full-stack development. Learned Node.js, Express,
        and databases.
      </p>
    ),
  },
  {
    title: "2023",
    content: (
      <p className="text-neutral-600 dark:text-neutral-400">
        Mastered TypeScript and Next.js. Started building complex applications
        with modern tooling.
      </p>
    ),
  },
  {
    title: "2024",
    content: (
      <p className="text-neutral-600 dark:text-neutral-400">
        Focused on performance optimization, accessibility, and advanced React
        patterns.
      </p>
    ),
  },
];

export default function AboutPage() {
  return (
    <main className="relative flex flex-col items-center overflow-hidden bg-transparent text-white">
      {/* Hero Section */}
      <AnimatedSection>
        <AboutHero />
      </AnimatedSection>

      {/* What I Do Section */}
      <AnimatedSection className="my-16" delay={200}>
        <section className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tighter mb-8 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            What I Do
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Web Development",
                description:
                  "Building responsive, accessible, and performant web applications using modern frameworks and best practices.",
                icon: (
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
                    className="h-6 w-6"
                  >
                    <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                  </svg>
                ),
              },
              {
                title: "UI/UX Design",
                description:
                  "Creating intuitive and visually appealing user interfaces with a focus on user experience and accessibility.",
                icon: (
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
                    className="h-6 w-6"
                  >
                    <path d="M12 3v14"></path>
                    <path d="m17 8-5-5-5 5"></path>
                    <path d="M8 21h8"></path>
                    <path d="M12 17v4"></path>
                  </svg>
                ),
              },
              {
                title: "Full-Stack Development",
                description:
                  "Developing end-to-end solutions with robust backend systems and seamless frontend experiences.",
                icon: (
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
                    className="h-6 w-6"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                    <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                    <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                    <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                    <line x1="12" y1="22.08" x2="12" y2="12"></line>
                  </svg>
                ),
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-border/50">
                  <CardContent className="p-6 h-full">
                    <div className="mb-4 rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:text-primary/90 transition-all duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </AnimatedSection>

      {/* Tech Stack Section */}
      <AnimatedSection className="mb-16" delay={300}>
        <TechStackSection />
      </AnimatedSection>

      {/* Soft Skills Section */}
      <AnimatedSection className="mb-16" delay={400}>
        <AboutSoftSkill />
      </AnimatedSection>

      {/* Timeline Section */}
      <Timeline data={timelineData} />
    </main>
  );
}
