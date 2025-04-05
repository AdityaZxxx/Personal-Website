export interface PostCardProps {
  post: {
    _id: string;
    title: string;
    slug: {
      _type: string;
      current: string;
    };
    excerpt?: string;
    mainImage?: any;
    publishedAt: string;
    categories?: Array<{
      _id: string;
      title: string;
      slug: string;
    }>;
    estimatedReadingTime?: number;
  };
}
