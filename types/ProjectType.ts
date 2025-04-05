export type ProjectType = {
  _id: string;
  title: string;
  slug: {
    _type: string;
    current: string;
  };
  excerpt?: string;
  mainImage?: any;
  categories?: Array<{
    _id: string;
    title: string;
    slug: string;
  }>;
  technologies?: string[];
};
