export type GalleryType = {
  item: {
    _id: string;
    title: string;
    slug: string;
    description?: string;
    mediaType: "image" | "video";
    image?: any;
    video?: string;
    videoThumbnail?: any;
    date: string;
    categories?: Array<{
      _id: string;
      title: string;
      slug: string;
    }>;
  };
};
