export type ShortType = {
  _id: string;
  title: string;
  slug: string;
  publishedAt: string; // ISO string, bisa kamu parse ke Date kalau perlu
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
