export interface Technology {
  _id: string;
  title: string;
  slug: string;
}

export interface SanityImage {
  _key: string;
  _type: string;
  asset: {
    _ref: string;
    _type: string;
  };
}
