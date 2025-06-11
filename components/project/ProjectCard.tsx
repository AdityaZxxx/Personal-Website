import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../lib/sanity/image";
import { getFeaturedProjects } from "../../lib/sanity/queries";
import { Button } from "../ui/button";

type ProjectCardType = {
  _id: string;
  title: string;
  slug: {
    _type: string;
    current: string;
  };
  excerpt?: string;
  mainImage?: {
    alt?: string;
    lqip: string;
    asset: {
      url: string;
    };
  };
  technologies?: string[];
  repoUrl?: string;
  demoUrl?: string;
};

export function ProjectCard({ project }: { project: ProjectCardType }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      whileHover={{ y: -5 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/50 to-slate-900/20 shadow-lg transition-all duration-300 hover:border-slate-700 hover:shadow-slate-700/20"
      aria-labelledby={`project-${project._id}-title`}
    >
      <div className="flex flex-col flex-grow">
        <Link
          href={`/projects/${project.slug.current}`}
          className="block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-t-2xl"
          aria-label={`View ${project.title} project details`}
        >
          <div className="relative aspect-video overflow-hidden">
            {project.mainImage?.asset?.url ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent z-10" />
                <Image
                  src={urlFor(project.mainImage.asset.url).width(1200).url()}
                  alt={
                    project.mainImage.alt || `Screenshot of ${project.title}`
                  }
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  placeholder="blur"
                  blurDataURL={project.mainImage.lqip}
                />
              </>
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-800">
                <span className="text-slate-500">Image not available</span>
              </div>
            )}
          </div>
          <div className="p-6">
            <h3
              id={`project-${project._id}-title`}
              className="font-bold text-lg text-white line-clamp-2 group-hover:text-sky-400 transition-colors"
            >
              {project.title}
            </h3>
            {project.excerpt && (
              <p className="mt-2 text-sm text-slate-400 line-clamp-3">
                {project.excerpt}
              </p>
            )}
          </div>
        </Link>

        <div className="mt-auto px-6 pb-6">
          {/* PERBAIKAN 2: Logika map untuk 'technologies' sekarang menangani string */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies?.slice(0, 4).map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="rounded-full bg-slate-800/80 backdrop-blur-sm text-xs font-medium"
              >
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            {project.repoUrl && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-full"
              >
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View source code on GitHub"
                >
                  <Github className="h-4 w-4 mr-2" />
                  Code
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button
                asChild
                variant="default"
                size="sm"
                className="rounded-full bg-sky-500 hover:bg-sky-600 text-white"
              >
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label="View live demo"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export const FeaturedProjectsSection = async () => {
  const featuredProjects = await getFeaturedProjects();
  return (
    <section
      id="projects"
      className="relative overflow-hidden py-16 md:py-24 lg:py-32 scroll-mt-16"
      aria-labelledby="projects-heading"
    >
      {/* Background elements - marked as decorative */}
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-800/20 blur-3xl" />
        <div className="absolute right-1/4 bottom-0 h-[500px] w-[500px] translate-x-1/2 translate-y-1/2 rounded-full bg-indigo-900/10 blur-3xl" />
      </div>

      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto max-w-4xl text-center"
        >
          <div className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/50 px-4 py-1.5 text-sm font-medium text-slate-400 mb-4">
            <span className="relative flex h-2 w-2 mr-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            Featured Work
          </div>
          <h2
            id="projects-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-600 to-orange-600 mb-4"
          >
            Showcase What I Made
          </h2>
          <p className="mx-auto mt-4 max-w-[700px] text-lg text-slate-400 md:text-xl">
            Selected projects that showcase my problem-solving skills, technical
            expertise, and attention to detail.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
          viewport={{ once: true, margin: "0px 0px -100px 0px" }}
          className="mt-12 grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {featuredProjects.map((project: any) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/projects" aria-label="View full portfolio">
            <Button
              variant="outline"
              className={`
                inline-flex items-center px-6 py-3 rounded-full 
                bg-gradient-to-r from-red-500 to-amber-600 
                text-white font-medium 
                hover:shadow-lg hover:shadow-amber-500/20 
                focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-900
                transition-all duration-300 
                group
              `}
            >
              Explore Full Portfolio
              <ArrowRight
                className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
