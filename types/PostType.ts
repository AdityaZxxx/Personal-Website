export type PostType = {
  _id: string;
  title: string;
  slug: {
    current: string;
    _type: "slug";
  };
  excerpt: string;
  mainImage: {
    _type: "image";
    asset: {
      _ref: string;
      _type: "reference";
    };
  };
  author: string;
  publishedAt: string; // ISO string, bisa kamu parse ke Date kalau perlu
  categories: {
    _id: string;
    title: string;
    slug: {
      current: string;
      _type: "slug";
    };
  }[];
  estimatedReadingTime: number;
};
