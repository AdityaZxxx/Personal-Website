import Link from "next/link";

import { getFeaturedProjects, getLatestPosts } from "@/lib/sanity/queries";
import { PostType } from "@/types/PostType";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import AnimatedSection from "../components/animated-section";
import { EmailCopyBox } from "../components/email-copy";
import { GitHubContributionGraph } from "../components/github-contribution-graph";
import { PostCard } from "../components/post-card";
import { ProjectCard } from "../components/project-card";
import { SparklesCore } from "../components/sparkles";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ProjectType } from "../types/ProjectType";

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
            className="relative mb-5 md:mb-6 border-white/30 text-white/90 backdrop-blur-sm px-4 py-1.5 animate-float hover:animate-pulse overflow-hidden group"
            aria-label="Call to action"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-700 -z-10"></span>
            <span className="relative z-10 flex items-center gap-2">
              <span className="text-blue-300 group-hover:text-blue-200 transition-colors duration-300 text-lg">
                🚀
              </span>
              <span className="text-sm md:text-base">Let's grow together!</span>
            </span>
            <span className="absolute -right-1 -top-1 h-2.5 w-2.5">
              <span className="absolute h-full w-full rounded-full bg-blue-400 opacity-0 group-hover:opacity-70 group-hover:animate-ping-slow transition-opacity"></span>
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
                <span className="relative z-10 text-white">seamless </span>
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
              passHref
              legacyBehavior
              aria-label="Contact Aditya via email"
            >
              <a className="group relative inline-flex items-center justify-between overflow-hidden rounded-full border border-white/10 bg-gradient-to-br from-blue-600/30 via-purple-600/30 to-pink-600/30 px-6 py-2.5 text-base font-medium backdrop-blur-xs transition-all hover:opacity-100 hover:from-blue-500/50 hover:to-purple-500/50 shadow-lg hover:shadow-xl hover:shadow-blue-500/20">
                <span className="z-10 text-white transition-colors duration-300 group-hover:text-white/90 px-2">
                  Let's Connect
                </span>
                <span className="absolute inset-0 translate-x-[45%] scale-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:scale-110 group-hover:opacity-100"></span>
                <span className="z-10 flex items-center justify-center overflow-hidden rounded-full bg-white p-2 transition-all duration-300 group-hover:bg-transparent group-hover:rotate-180">
                  <svg
                    className="lucide lucide-arrow-right text-black transition-all duration-300 group-hover:translate-x-5 group-hover:opacity-0"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14"></path>
                    <path d="m12 5 7 7-7 7"></path>
                  </svg>
                  <svg
                    className="lucide lucide-mail absolute -translate-x-5 text-black opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                  </svg>
                </span>
              </a>
            </Link>
            <EmailCopyBox />
          </div>
        </div>
      </section>

      <AnimatedSection delay={100}>
        <section className="w-full py-20 md:py-32 bg-black/80 backdrop-blur-lg">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  About Me
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  I&apos;m a passionate developer with over 5 years of
                  experience in building web applications. I specialize in
                  React, Next.js, and modern JavaScript frameworks. My goal is
                  to create fast, accessible, and user-friendly digital
                  experiences.
                </p>
              </div>
              <div className="w-full max-w-full space-y-4">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <div className="mb-4 rounded-full bg-primary/10 p-3">
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
                          <path d="M12 19c-2.3 0-6.4-.2-8.1-.6-.7-.2-1.2-.7-1.4-1.4-.3-1.1-.5-3.4-.5-5s.2-3.9.5-5c.2-.7.7-1.2 1.4-1.4C5.6 5.2 9.7 5 12 5s6.4.2 8.1.6c.7.2 1.2.7 1.4 1.4.3 1.1.5 3.4.5 5s-.2 3.9-.5 5c-.2.7-.7 1.2-1.4 1.4-1.7.4-5.8.6-8.1.6 0 0 0 0 0 0z"></path>
                          <polygon points="10 15 15 12 10 9"></polygon>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold">
                        Frontend Development
                      </h3>
                      <p className="text-sm text-muted-foreground text-center mt-2">
                        Creating responsive and interactive user interfaces with
                        React, Next.js, and modern CSS.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <div className="mb-4 rounded-full bg-primary/10 p-3">
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
                          <path d="M3 3v18h18"></path>
                          <path d="m19 9-5 5-4-4-3 3"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold">Backend Development</h3>
                      <p className="text-sm text-muted-foreground text-center mt-2">
                        Building robust APIs and server-side applications with
                        Node.js, Express, and databases.
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <div className="mb-4 rounded-full bg-primary/10 p-3">
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
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"></path>
                          <path d="m9 12 2 2 4-4"></path>
                        </svg>
                      </div>
                      <h3 className="text-xl font-bold">
                        Security & Performance
                      </h3>
                      <p className="text-sm text-muted-foreground text-center mt-2">
                        Optimizing applications for speed and implementing best
                        security practices.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <section className="w-full py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                My GitHub Activity
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                A snapshot of my coding activity over the past year
              </p>
            </div>
            <div className="w-full">
              <GitHubContributionGraph username="AdityaZxxx" />
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Featured Projects
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Check out some of my recent work
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredProjects.map((project: ProjectType) => (
                  <ProjectCard key={project._id} project={project} />
                ))}
              </div>
              <Link href="/projects">
                <Button variant="outline" className="mt-4">
                  View All Projects
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Latest Blog Posts
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Thoughts, ideas, and insights on web development and design
                </p>
              </div>
              <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {latestPosts.map((post) => (
                  <PostCard key={post._id} post={post} />
                ))}
              </div>
              <Link href="/blog">
                <Button variant="outline" className="mt-4">
                  Read All Posts
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      <section className="w-full py-12 md:py-24 lg:py-32 z-10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Get In Touch
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Have a project in mind or just want to say hello? Feel free to
                reach out!
              </p>
            </div>
            <div className="w-full max-w-sm space-y-2">
              <Link href="/contact">
                <Button className="w-full">Contact Me</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
