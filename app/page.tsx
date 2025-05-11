import Link from "next/link";

import AnimatedSection from "@/components/animated-section";
import { EmailCopyBox } from "@/components/email-copy";
import { GitHubContributionGraph } from "@/components/gitgraph/GithubContributionGraph";
import { FeaturedProjectsSection } from "@/components/project/ProjectCard";
import { SparklesCore } from "@/components/sparkles";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects, getLatestPosts } from "@/lib/sanity/queries";
import { PostType } from "@/types/PostType";
import { ArrowRight, Mail, MessageSquare } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";
import { AboutSection } from "../components/about/AboutMotion";
import { BlogPostsSection } from "../components/blogPost/PostCard";
import { Badge } from "../components/ui/badge";

export const metadata = {
  title: "Home | Aditya",
  description: "Welcome to my personal website",
};
export default async function Home() {
  const featuredProjects = await getFeaturedProjects();
  const latestPosts: PostType[] = await getLatestPosts(6);

  return (
    <main className="relative flex flex-col items-center overflow-hidden bg-transparent text-white">
      {/* Section 1: Hero (unchanged) */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-start pt-20 md:pt-24 px-4">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-20">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={2.0}
            speed={0.8}
            particleDensity={30}
            className="w-full h-full"
            particleColor="#ffffff"
          />
        </div>

        <div className="absolute inset-0 -z-10">
          <Image
            src="/horizon.jpg"
            alt="Modern digital landscape background"
            fill
            className="object-cover opacity-50"
            quality={90}
            priority
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
        </div>

        {/* Enhanced Badge with Glow */}
        <div className="z-10 flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto">
          <Badge
            variant="outline"
            className="relative mb-5 md:mb-6 border-white/30 text-white/90 backdrop-blur-sm px-4 py-0 overflow-hidden group inline-flex h-8 rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transition-all duration-500"
            aria-label="Call to action"
          >
            <span className=" absolute  inset-[-1000%]  animate-[spin_3s_linear_infinite]  bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <span className=" relative z-10 inline-flex cursor-pointer  items-center  justify-center  rounded-full  bg-slate-950/90 px-6 py-[6px] text-sm  font-medium  text-white  backdrop-blur-md hover:bg-slate-950 transition-colors duration-300  ">
              🚀 Let's grow together
            </span>
          </Badge>

          {/* Responsive Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight md:leading-tighter">
            {/* Desktop Layout (2 lines) */}
            <div className="hidden md:block">
              <div className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400">
                I help founders turn ideas
              </div>
              <div className="relative group mt-2">
                <span className="relative z-10 text-white">into seamless </span>
                <span className="italic font-serif text-gradient bg-clip-text text-transparent bg-gradient-to-b from-gray-300 to-white">
                  digital experiences
                </span>
              </div>
            </div>

            {/* Mobile Layout (3 lines) */}
            <div className="md:hidden flex flex-col">
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                I help founders turn
              </span>
              <span className="text-white">ideas into seamless</span>
              <span className="italic font-serif text-gradient bg-clip-text text-transparent bg-gradient-to-b from-gray-300 via-white to-purple-400 mt-1">
                digital experiences
              </span>
            </div>
          </h1>

          {/* Enhanced Profile Section */}
          <div className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-4 group">
            <div className="relative">
              <Image
                height={64}
                width={64}
                src="/profile.webp"
                alt="Aditya Rahmad - Professional Full Stack Developer"
                className="rounded-full border-2 border-white/80 shadow-lg hover:shadow-xl transition-all duration-500 group-hover:rotate-3 group-hover:scale-110"
                priority
                sizes="(max-width: 768px) 64px, 72px"
              />
              <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-blue-400/50 group-hover:animate-ping-slow pointer-events-none transition-all duration-1000"></div>
            </div>
            <p className="text-lg sm:text-xl">
              Hello, I'm{" "}
              <span className="font-semibold text-white">Aditya Rahmad</span>, a{" "}
              <span className="relative inline-block">
                <span className="z-10 relative bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                  Full Stack Developer
                </span>
                <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"></span>
              </span>
            </p>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="mailto:hello@adityarahmad.com"
              className=" group relative inline-flex items-center gap-2 overflow-hidden rounded-full border-2 border-white/20 bg-gradient-to-r from-blue-500 to-purple-500 px-6 py-2 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <span className="font-medium">Let's Connect</span>
              <Mail className=" h-5 w-5 transition-transform duration-300 group-hover:scale-110 group-hover:text-white" />
            </Link>
            <EmailCopyBox />
          </div>
        </div>
      </section>

      <AnimatedSection delay={100}>
        <AboutSection />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-900/10 to-transparent opacity-20"></div>
            <div className="absolute top-0 left-1/4 w-32 h-32 bg-green-500/10 rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full filter blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12 text-center"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-600 mb-4">
                My Coding Activity
              </h2>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                I believe in consistent progress. Here's my GitHub contribution
                graph showing my daily coding activity over the past year.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex justify-center mb-12"
            >
              <GitHubContributionGraph
                username="AdityaZxxx"
                className="w-full max-w-4xl hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)] transition-all duration-500"
              />
            </motion.div>

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
                className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium hover:shadow-lg hover:shadow-green-500/20 transition-all duration-300 group"
              >
                View Full GitHub Profile
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <FeaturedProjectsSection featuredProjects={featuredProjects} />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <BlogPostsSection latestPosts={latestPosts} />
      </AnimatedSection>

      <section className="relative w-full py-16 md:py-24 lg:py-32 z-10 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute top-1/2 left-1/2 w-full max-w-2xl h-64 -translate-x-1/2 -translate-y-1/2 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-[100px]"></div>
        </div>

        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-300 mb-4"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Let's Collaborate
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 mb-4"
            >
              Get In Touch
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="max-w-[700px] text-lg text-gray-600 dark:text-slate-400 mb-8"
            >
              Have a project in mind or just want to say hello? I'd love to hear
              from you. Whether you need a website, have questions, or just want
              to connect, feel free to reach out!
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
            >
              <Link href="/contact" className="w-full">
                <Button
                  size="lg"
                  className="w-full group rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg transition-all hover:shadow-blue-500/30"
                >
                  Contact Form
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link
                href="mailto:adityaofficial714@gmail.com"
                className="w-full"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full group rounded-xl border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-300"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Me
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
