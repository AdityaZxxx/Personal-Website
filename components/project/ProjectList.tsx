// File: components/project/ProjectList.tsx
import { getAllProjects } from "@/lib/sanity/queries";
import { ProjectNotFound } from "../custom-not-found";
import { ProjectCard } from "./ProjectCard";

interface ProjectListProps {
  category?: string;
}

export async function ProjectList({ category }: ProjectListProps) {
  const projects = await getAllProjects(category);

  if (!projects || projects.length === 0) {
    return <ProjectNotFound message={"Your search not found"} />;
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project: any) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
