import { ProjectCard } from "@/components/project-card";
import { getAllProjects } from "@/lib/sanity/queries";
import { ProjectType } from "@/types/ProjectType";

interface ProjectListProps {
  category?: string;
}

export async function ProjectList({ category }: ProjectListProps) {
  const projects = await getAllProjects(category);

  if (projects.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No projects found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project: ProjectType) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
