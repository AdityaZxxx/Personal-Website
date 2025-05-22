import { Badge } from "@/components/ui/badge";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { ProjectType } from "../../types/ProjectType";
import { BlurImage } from "../blur-image";
import { Button } from "../ui/button";

interface ProjectCardProps {
  project: {
    _id: string;
    title: string;
    slug: {
      _type: string;
      current: string;
    };
    excerpt?: string;
    mainImage?: any;
    technologies?: string[];
    githubUrl?: string;
    liveUrl?: string;
  };
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: "0px 0px -50px 0px" }}
      whileHover={{ y: -5 }}
      className="group relative h-full overflow-hidden rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/50 to-slate-900/20 shadow-lg transition-all duration-300 hover:border-slate-700 hover:shadow-slate-700/20 flex flex-col"
      aria-labelledby={`project-${project._id}-title`}
    >
      <Link
        href={`/projects/${project.slug.current}`}
        className="flex flex-col flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-t-2xl"
        aria-label={`View ${project.title} project details`}
      >
        <div className="relative aspect-video overflow-hidden">
          {project.mainImage ? (
            <>
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-transparent to-slate-900/80 z-10" />
              <BlurImage
                image={project.mainImage}
                alt={`Screenshot of ${project.title} project`}
                fill
                className="transition-transform duration-500 group-hover:scale-105 object-cover"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={false}
              />
            </>
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-muted-foreground">No image available</span>
            </div>
          )}
        </div>

        <div className="p-6 flex-grow">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3
                id={`project-${project._id}-title`}
                className="font-bold text-white line-clamp-1"
              >
                {project.title}
              </h3>
              {project.excerpt && (
                <p className="mt-2 text-sm text-slate-400 line-clamp-2">
                  {project.excerpt}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>

      {/* Technologies */}
      <div className="px-6 pb-4 flex flex-wrap gap-2">
        {project.technologies?.slice(0, 3).map((tech) => (
          <Badge
            key={tech}
            variant="secondary"
            className="rounded-full bg-slate-800/80 backdrop-blur-sm text-xs font-medium"
          >
            {tech}
          </Badge>
        ))}
        {project.technologies && project.technologies.length > 3 && (
          <Badge variant="outline" className="text-xs">
            +{project.technologies.length - 3} more
          </Badge>
        )}
      </div>

      {/* Project links */}
      <div className="px-6 pb-6 flex gap-2">
        {project.githubUrl && (
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label={`View ${project.title} source code on GitHub (opens in new tab)`}
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="h-4 w-4" />
            <span className="sr-only">GitHub</span>
          </Link>
        )}
        {project.liveUrl && (
          <Link
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-700 bg-slate-800/50 p-1.5 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label={`View ${project.title} live demo (opens in new tab)`}
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="h-4 w-4" />
            <span className="sr-only">Live Demo</span>
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export const FeaturedProjectsSection = ({
  featuredProjects,
}: {
  featuredProjects: ProjectType[];
}) => {
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
          {featuredProjects.map((project) => (
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
          <Link
            href="/projects"
            className="inline-block focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-full"
            aria-label="View full portfolio"
          >
            <Button
              variant="outline"
              className="group rounded-full border border-slate-700 bg-slate-900/50 px-6 py-5 text-white shadow-sm transition-all hover:bg-slate-800 hover:text-white hover:shadow-md hover:shadow-slate-700/30"
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
