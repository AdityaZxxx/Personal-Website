import { groq } from "next-sanity";
import { client } from "./client";

// Blog post queries
export async function getAllPosts(category?: string) {
  const filter = category
    ? `&& references(*[_type == "category" && slug.current == "${category}"]._id)`
    : "";

  return client.fetch(
    groq`*[_type == "post" && publishedAt < now() ${filter}] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      "categories": categories[]->{ _id, title, slug },
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
    }`
  );
}

export async function getLatestPosts(limit = 3) {
  return client.fetch(
    groq`*[_type == "post" && publishedAt < now()] | order(publishedAt desc)[0...${limit}] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      publishedAt,
      "categories": categories[]->{ _id, title, slug },
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
    }`
  );
}

export async function getPostBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      body,
      publishedAt,
      "categories": categories[]->{ _id, title, slug },
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
    }`,
    { slug }
  );
}

export async function getAllPostSlugs() {
  return client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );
}

export async function getAllCategories() {
  return client.fetch(
    groq`*[_type == "category"] | order(title asc) {
      _id,
      title,
      slug
    }`
  );
}

// Project queries
export async function getAllProjects(category?: string) {
  const filter = category
    ? `&& references(*[_type == "projectCategory" && slug.current == "${category}"]._id)`
    : "";

  return client.fetch(
    groq`*[_type == "project" ${filter}] | order(completedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      technologies,
      "categories": categories[]->{ _id, title, slug }
    }`
  );
}

export async function getFeaturedProjects(limit = 3) {
  return client.fetch(
    groq`*[_type == "project" && featured == true] | order(completedAt desc)[0...${limit}] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      technologies,
      "categories": categories[]->{ _id, title, slug }
    }`
  );
}

export async function getProjectBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      excerpt,
      mainImage,
      description,
      technologies,
      completedAt,
      demoUrl,
      repoUrl,
      images,
      "categories": categories[]->{ _id, title, slug }
    }`,
    { slug }
  );
}

export async function getAllProjectSlugs() {
  return client.fetch(
    groq`*[_type == "project" && defined(slug.current)][].slug.current`
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

// Gallery queries
export async function getAllGalleryItems(category?: string) {
  const filter = category
    ? `&& references(*[_type == "galleryCategory" && slug.current == "${category}"]._id)`
    : "";

  return client.fetch(
    groq`*[_type == "galleryItem" ${filter}] | order(date desc) {
      _id,
      title,
      slug,
      description,
      mediaType,
      image,
      "video": video.asset->url,
      videoThumbnail,
      date,
      "categories": categories[]->{ _id, title, slug }
    }`
  );
}

export async function getFeaturedGalleryItems(limit = 6) {
  return client.fetch(
    groq`*[_type == "galleryItem" && featured == true] | order(date desc)[0...${limit}] {
      _id,
      title,
      slug,
      description,
      mediaType,
      image,
      "video": video.asset->url,
      videoThumbnail,
      date,
      "categories": categories[]->{ _id, title, slug }
    }`
  );
}

export async function getGalleryItemBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "galleryItem" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      mediaType,
      image,
      "video": video.asset->url,
      videoThumbnail,
      date,
      tags,
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
      description
    }`
  );
}
