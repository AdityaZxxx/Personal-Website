import { ProjectCard } from "@/components/project/ProjectCard";
import { getAllProjects } from "@/lib/sanity/queries";

interface ProjectListProps {
  searchParams: {
    category?: string;
  };
}

export async function ProjectList({ searchParams }: ProjectListProps) {
  // Extract category from searchParams here
  // const category = searchParams?.category;
  const category =
    typeof searchParams?.category === "string"
      ? searchParams.category
      : undefined;

  const projects = await getAllProjects(category);

  if (!projects || projects.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No projects found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project: any) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </div>
  );
}
