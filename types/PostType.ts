export type PostType = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage?: any;
  author: string;
  publishedAt: string;
  _updatedAt: string;
  categories: {
    _id: string;
    title: string;
    slug: string;
  }[];
  estimatedReadingTime: number;
  tags: string[];
  viewCount: number;
  likeCount: number;
};
