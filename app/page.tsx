import Link from "next/link";

import AnimatedSection from "@/components/animated-section";
import { EmailCopyBox } from "@/components/email-copy";
import { FeaturedProjectsSection } from "@/components/project/ProjectCard";
import { SparklesCore } from "@/components/sparkles";
import { Mail } from "lucide-react";
import Image from "next/image";
import { AboutSection } from "../components/about/AboutMotion";
import { BlogPostsSection } from "../components/blogPost/PostCard";
import ContactSection from "../components/contact/ContactSection";
import GithubSection from "../components/gitgraph/GithubSection";
import { Badge } from "../components/ui/badge";

export const metadata = {
  title: "Home",
  description: "Welcome to my personal website",
};
export default function Home() {
  return (
    <main className="relative flex flex-col items-center overflow-hidden bg-transparent text-white">
      <section
        className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-4 py-20 md:py-24"
        aria-labelledby="hero-heading"
      >
        {/* Background elements - moved to bottom for better stacking context */}
        <div className="absolute inset-0 -z-20 overflow-hidden">
          <SparklesCore
            id="tsparticlesfullpage"
            background="transparent"
            minSize={0.6}
            maxSize={2.0}
            speed={0.8}
            particleDensity={30}
            className="w-full h-full"
            particleColor="#ffffff"
            aria-hidden="true"
          />
        </div>

        <div className="absolute inset-0 -z-10">
          <Image
            src="/horizon.jpg"
            alt=""
            fill
            className="object-cover opacity-50"
            quality={90}
            priority
            sizes="100vw"
            aria-hidden="true"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"
            aria-hidden="true"
          />
        </div>

        {/* Content container */}
        <div className="z-10 flex flex-col items-center justify-center text-center w-full max-w-4xl mx-auto">
          <h1 id="hero-heading" className="sr-only">
            Aditya Rahmad - Full Stack Developer
          </h1>

          {/* Animated badge */}
          <div className="mb-6 md:mb-8">
            <Badge
              variant="outline"
              className="relative border-white/30 text-white/90 backdrop-blur-sm px-4 py-0 overflow-hidden group inline-flex h-8 rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent transition-all duration-500"
              aria-label="Call to action"
            >
              <span
                className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)] opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                aria-hidden="true"
              />
              <span className="relative z-10 inline-flex items-center justify-center rounded-full bg-slate-950/90 px-6 py-[6px] text-sm font-medium text-white backdrop-blur-md hover:bg-slate-950 transition-colors duration-300">
                🚀 Let's grow together
              </span>
            </Badge>
          </div>

          {/* Headline - optimized for performance and accessibility */}
          <div className="max-w-3xl">
            <p className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight md:leading-tighter">
              <span className="sr-only">
                I help founders turn ideas into seamless digital experiences
              </span>

              {/* Desktop version */}
              <span className="hidden md:block">
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400">
                  I help founders turn ideas
                </span>
                <br />
                <span className="relative group mt-2">
                  <span className="relative z-10 text-white">
                    into seamless{" "}
                  </span>
                  <span className="italic font-serif text-gradient bg-clip-text text-transparent bg-gradient-to-b from-gray-300 to-white">
                    digital experiences
                  </span>
                </span>
              </span>

              {/* Mobile version */}
              <span className="md:hidden flex flex-col">
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                  I help founders turn
                </span>
                <span className="text-white">ideas into seamless</span>
                <span className="italic font-serif text-gradient bg-clip-text text-transparent bg-gradient-to-b from-gray-300 via-white to-purple-400 mt-1">
                  digital experiences
                </span>
              </span>
            </p>
          </div>

          {/* Profile section - improved semantics and animation */}
          <div
            className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center gap-4 group"
            role="region"
            aria-label="About me"
          >
            <figure className="relative">
              <Image
                height={72}
                width={72}
                src="/profile.webp"
                alt="Aditya Rahmad - Professional Full Stack Developer"
                className="rounded-full border-2 border-white/80 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:rotate-3 group-hover:scale-105"
                priority
                sizes="(max-width: 768px) 72px, 80px"
              />
              <div
                className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-blue-400/50 group-hover:animate-ping-slow pointer-events-none transition-all duration-700"
                aria-hidden="true"
              />
            </figure>
            <p className="text-lg sm:text-xl text-balance">
              Hello, I'm{" "}
              <strong className="font-semibold text-white">
                Aditya Rahmad
              </strong>
              , a{" "}
              <span className="relative inline-block">
                <span className="z-10 relative bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
                  Full Stack Developer
                </span>
                <span
                  className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 ease-out"
                  aria-hidden="true"
                />
              </span>
            </p>
          </div>

          {/* CTA buttons - improved accessibility */}
          <div
            className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center gap-4"
            role="group"
            aria-label="Call to action buttons"
          >
            <Link
              href="mailto:hello@adityarahmad.com"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-white/20 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:from-blue-500 hover:to-purple-500 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-[180px]"
            >
              <span className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                Let's Connect
              </span>
              <Mail
                className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
                aria-hidden="true"
              />
            </Link>

            <EmailCopyBox />
          </div>
        </div>
      </section>

      <AnimatedSection delay={100}>
        <AboutSection />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <GithubSection />
      </AnimatedSection>

      <AnimatedSection>
        <FeaturedProjectsSection />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <BlogPostsSection />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <ContactSection />
      </AnimatedSection>
    </main>
  );
}
