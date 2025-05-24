import { groq } from "next-sanity";
import { client } from "./client";

// --- Post Queries ---

export async function getLatestPosts(limit = 3) {
  return client.fetch(
    groq`*[_type == "post" && publishedAt < now() && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...${limit}] {
      _id,
      title,
      slug,
      excerpt,
      mainImage, // Fetches the image object including 'alt', 'caption' (if defined) and 'asset' reference
      publishedAt,
      "categories": categories[]->{ _id, title, slug },
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
    }`
  );
}

export async function getPostBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      slug,
      excerpt,
      mainImage, // Fetches image object with 'alt', 'caption', 'asset' ref
      body[]{
        ...,
        _type == "image" => { // For images within Portable Text
          alt,
          caption,
          asset // Fetches the asset reference { _ref: "...", _type: "reference" }
        }
      },
      publishedAt,
      "categories": categories[]->{ _id, title, slug },
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
      "author": author->{
        _id,
        name,
        image, // Fetches author's image object with 'alt', 'caption', 'asset' ref
        bio,
        slug,
        socialLinks
      },
      // "rawTags": tags
      tags
    }`,
    { slug }
  );
}

export async function getFeaturedPosts(limit = 4) {
  return client.fetch(
    groq`*[_type == "post" && featured == true && publishedAt < now() && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...${limit}] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      "categories": categories[]->{ _id, title, slug }
    }`
  );
}

export async function getAllPostSlugs() {
  return client.fetch(
    groq`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))][].slug.current`
  );
}

export async function getAllPostCategories() {
  return client.fetch(
    groq`*[_type == "category"] | order(title asc) {
      _id,
      title,
      slug
    }`
  );
}

export async function getAllPosts(category?: string, searchQuery?: string) {
  let query = `*[_type == "post" && publishedAt < now() && !(_id in path("drafts.**"))`;
  const params: Record<string, any> = {};
  const conditions: string[] = [];

  if (category) {
    conditions.push(`$category in categories[]->slug.current`);
    params.category = category;
  }

  if (searchQuery && searchQuery.trim() !== "no") {
    conditions.push(`(
      title match $searchPattern ||
      excerpt match $searchPattern ||
      pt::text(body) match $searchPattern
    )`);
    params.searchPattern = `*${searchQuery}*`; // For "contains" style search
  }

  if (conditions.length > 0) {
    query += ` && (${conditions.join(" && ")})`;
  }

  query += `] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    "categories": categories[]->{ _id, title, slug },
    mainImage // Fetches image object with 'alt', 'caption', 'asset' ref
  }`;

  return client.fetch(query, params);
}

// --- Project Queries ---

export async function getAllProjects(category?: string) {
  let query = `*[_type == "project" && !(_id in path("drafts.**"))`;
  const params: Record<string, any> = {};

  if (category) {
    query += ` && references(*[_type == "projectCategory" && slug.current == $category]._id)`;
    params.category = category;
  }

  query += `] | order(completedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage, // Fetches image object
    "technologies": technologies[]->{ _id, title, slug },
    "categories": categories[]->{ _id, title, slug }
  }`;
  return client.fetch(query, params);
}

export async function getFeaturedProjects(limit = 3) {
  return client.fetch(
    groq`*[_type == "project" && featured == true && !(_id in path("drafts.**"))] | order(completedAt desc)[0...${limit}] {
      _id,
      title,
      slug,
      excerpt,
      mainImage, // Fetches image object
      "technologies": technologies[]->{ _id, title, slug },
      "categories": categories[]->{ _id, title, slug }
    }`
  );
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      slug,
      excerpt,
      mainImage, // Fetches image object
      description[]{ // Assuming description is Portable Text
        ...,
        _type == "image" => {
          alt,
          caption,
          asset // Fetches asset reference
        }
      },
      "technologies": technologies[]->{ _id, title, slug },
      completedAt,
      demoUrl,
      repoUrl,
      images[]{ // Assuming 'images' is an array of image objects
        _key,
        alt,
        caption,
        asset // Fetches asset reference
      },
      "categories": categories[]->{ _id, title, slug }
    }`,
    { slug }
  );
}

export async function getAllProjectSlugs() {
  return client.fetch(
    groq`*[_type == "project" && defined(slug.current) && !(_id in path("drafts.**"))][].slug.current`
  );
}

export async function getAllProjectCategories() {
  return client.fetch(
    groq`*[_type == "projectCategory"] | order(title asc) {
      _id,
      title,
      slug
    }`
  );
}

// --- Gallery Queries ---

export async function getAllGalleryItems(category?: string) {
  let query = `*[_type == "galleryItem" && !(_id in path("drafts.**"))`;
  const params: Record<string, any> = {};

  if (category) {
    query += ` && references(*[_type == "galleryCategory" && slug.current == $category]._id)`;
    params.category = category;
  }

  query += `] | order(date desc) {
    _id,
    title,
    slug,
    description, // If Portable Text with images, expand asset ref inside
    mediaType,
    image, // Fetches image object (if mediaType is 'image')
    "videoUrl": video.asset->url, // Keep dereferencing for direct URL if 'video' is a file type
    videoThumbnail, // Fetches image object for thumbnail
    date,
    "categories": categories[]->{ _id, title, slug }
  }`;
  return client.fetch(query, params);
}

export async function getFeaturedGalleryItems(limit = 6) {
  return client.fetch(
    groq`*[_type == "galleryItem" && featured == true && !(_id in path("drafts.**"))] | order(date desc)[0...${limit}] {
      _id,
      title,
      slug,
      description,
      mediaType,
      image,
      "videoUrl": video.asset->url,
      videoThumbnail,
      date,
      "categories": categories[]->{ _id, title, slug }
    }`
  );
}

export async function getGalleryItemBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "galleryItem" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      slug,
      description, // If Portable Text with images, expand asset ref inside
      mediaType,
      image,
      "videoUrl": video.asset->url,
      videoThumbnail,
      date,
      "tags": tags[]->{ _id, title, slug },
      "categories": categories[]->{ _id, title, slug }
    }`,
    { slug }
  );
}

export async function getAllGalleryCategories() {
  return client.fetch(
    groq`*[_type == "galleryCategory"] | order(title asc) {
      _id,
      title,
      slug,
      description // If Portable Text with images, expand asset ref inside
    }`
  );
}
