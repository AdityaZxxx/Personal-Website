import { getFeaturedProjects } from "@/lib/sanity/queries";
import { FeaturedProjectsView } from "../project/FeaturedProjectCard";

export type ProjectType = {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  mainImage?: {
    alt?: string;
    asset: {
      url: string;
    };
  };
};

export const FeaturedProjectsSection = async () => {
  const featuredProjects: ProjectType[] = await getFeaturedProjects();

  return <FeaturedProjectsView projects={featuredProjects} />;
};
