export type ProjectType = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: any;
  categories?: Array<{
    _id: string;
    title: string;
    slug: string;
  }>;
  technologies?: string[];
  repoUrl?: string;
  demoUrl?: string;
};
