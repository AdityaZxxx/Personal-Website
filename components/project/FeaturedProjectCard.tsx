"use client";

import { ProjectType } from "@/components/sections/FeaturedProject";
import { Button } from "@/components/ui/button";
import { urlFor } from "@/lib/sanity/image";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ProjectCard({ project }: { project: ProjectType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, amount: 0.3 }}
      className="w-full flex flex-col group"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="relative block w-full overflow-hidden rounded-2xl shadow-xl border border-zinc-800 bg-gradient-to-tr from-zinc-900/40 to-zinc-800/30 backdrop-blur-md transition-all duration-300 hover:scale-[1.02]"
        aria-label={`View project: ${project.title}`}
      >
        <div className="relative h-[300px] w-full">
          {project.mainImage?.asset?.url ? (
            <Image
              src={urlFor(project.mainImage).width(800).height(800).url()}
              alt={project.mainImage.alt || project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-zinc-800">
              <span className="text-sm text-slate-400">No Image</span>
            </div>
          )}
        </div>

        <div className="absolute bottom-4 left-4 right-4 group-hover:scale-[1.01] group-hover:translate-y-[-4px] transform transition-all duration-300 ease-out bg-zinc-900/80 backdrop-blur-md rounded-xl p-4 shadow-md border border-zinc-700">
          <div className="flex flex-col gap-1">
            <h3 className="text-base font-semibold text-primary">
              {project.title}
            </h3>
            <p className="text-sm text-zinc-300 leading-snug line-clamp-2">
              {project.excerpt}
            </p>
            <div className="flex justify-end mt-2">
              <div className="group/arrow relative w-7 h-7 flex items-center justify-center rounded-full bg-zinc-800/60 transition-all duration-300 hover:scale-110 hover:shadow-md">
                <ArrowUpRight className="w-3.5 h-3.5 text-primary transition-transform duration-300 group-hover/arrow:rotate-45" />
                <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover/arrow:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function FeaturedProjectsView({
  projects,
}: {
  projects: ProjectType[];
}) {
  return (
    <section
      id="projects"
      className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-labelledby="projects-heading"
    >
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="text-start mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary">
            <span>
              Showcase My{" "}
              <span className="relative">
                <span className="bg-[length:200%_200%] bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400">
                  Work
                </span>
                <svg
                  className="absolute right-0 z-[-1] bottom-1 w-[90px] sm:w-[130px]"
                  width="200"
                  height="10"
                  viewBox="0 0 224 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    d="M0.500244 1.63051C8.87551 2.3919 17.451 1.9251 25.8672 1.9251C68.0427 1.9251 110.216 1.63051 152.391 1.63051C171.006 1.63051 189.616 1.33593 208.231 1.33593C212.099 1.33593 215.967 1.36279 219.835 1.33593C220.447 1.33168 222.926 0.77558 223.206 1.33593"
                    stroke="#F5F5F5"
                    strokeWidth="0.5"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </span>
            </span>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mt-3">
            A selection of projects that I&apos;ve worked on.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Link href="/projects" aria-label="View full portfolio">
            <Button
              variant="outline"
              className="group rounded-full cursor-pointer border-slate-700 bg-slate-800/50 px-6 py-3 text-base text-primary transition-all hover:border-slate-600 hover:bg-slate-800"
            >
              Explore Full Portfolio
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
