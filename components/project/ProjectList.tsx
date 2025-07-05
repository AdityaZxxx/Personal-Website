import { getAllProjects } from "@/lib/sanity/queries";
import { ProjectType } from "../../types/ProjectType";
import { ProjectNotFound } from "../common/CustomNotFound";
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
    <div className="flex flex-col gap-16 md:gap-24">
      {projects.map((project: ProjectType, index: number) => (
        <ProjectCard key={project._id} project={project} index={index} />
      ))}
    </div>
  );
}
