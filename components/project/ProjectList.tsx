import * as motion from "motion/react-client";
import { getAllProjects } from "../../lib/sanity/queries";
import { ProjectNotFound } from "../custom-not-found";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
  category?: string;
}

export async function ProjectList({ category }: ProjectListProps) {
  const projects = await getAllProjects(category);

  if (!projects || projects.length === 0) {
    return <ProjectNotFound message={"No projects found for this category."} />;
  }

  return (
    <motion.div
      className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.1 }}
    >
      {projects.map((project: any) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </motion.div>
  );
}
