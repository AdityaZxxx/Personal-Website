import { ArrowRight, Github, Linkedin, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import AnimatedSection from "@/components/animated-section";
import { GitHubContributionGraph } from "@/components/github-contribution-graph";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ColourfulText } from "@/components/ui/colorful-text";
import { getFeaturedProjects, getLatestPosts } from "@/lib/sanity/queries";
import { ProjectType } from "@/types/ProjectType";

export default async function Home() {
  const featuredProjects = await getFeaturedProjects();
  const latestPosts = await getLatestPosts(3);

  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <AnimatedSection>
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Hi, I&apos;m <ColourfulText text="Aditya Rahmad" />
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Full-stack developer specializing in modern web
                    technologies. I build beautiful, functional websites and
                    applications with a focus on user experience.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/projects">
                    <Button className="gap-1">
                      View My Work
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/blog">
                    <Button variant="outline">Read My Blog</Button>
                  </Link>
                </div>
                <div className="flex gap-4 mt-4">
                  <Link
                    href="https://github.com/AdityaZxxx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="icon">
                      <Github className="h-5 w-5" />
                      <span className="sr-only">GitHub</span>
                    </Button>
                  </Link>
                  <Link
                    href="https://twitter.com/adxxya30"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="icon">
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </Button>
                  </Link>
                  <Link
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="ghost" size="icon">
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-full border">
                  <Image
                    src={"/profile.jpg"}
                    alt="Profile"
                    width={400}
                    height={400}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* About Section */}
      <AnimatedSection delay={100}>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
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

      {/* GitHub Contribution Graph */}
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

      {/* Featured Projects Section */}
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
        {/* Latest Blog Posts Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
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
                {latestPosts.map((post: any) => (
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

      {/* Contact Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
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
              <Link href="mailto:your.email@example.com">
                <Button className="w-full">Contact Me</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
