import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export type PostType = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  mainImage?: SanityImageSource;
  author: {
    name: string;
    image: string;
  };
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
