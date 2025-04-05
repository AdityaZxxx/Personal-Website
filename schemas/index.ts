import author from "./author";
import blockContent from "./blockContent";
import category from "./category";
import galleryCategory from "./galleryCategory";
import galleryItem from "./galleryItem";
import post from "./post";
import project from "./project";
import projectCategory from "./projectCategory";

// For debugging
console.log("Gallery Item Schema:", galleryItem);
console.log("Gallery Category Schema:", galleryCategory);

export const schemaTypes = [
  post,
  author,
  category,
  project,
  projectCategory,
  blockContent,
  galleryItem,
  galleryCategory,
];
