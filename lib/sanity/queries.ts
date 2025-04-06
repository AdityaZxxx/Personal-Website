import { groq } from "next-sanity";
import { client } from "./client";

// Blog post queries
export async function getAllPosts(category?: string) {
  const filter = category
    ? `&& references(*[_type == "category" && slug.current == "${category}"]._id)`
    : "";

  return client.fetch(
    groq`*[_type == "post" ${filter}] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      mainImage,
      publishedAt,
      estimatedReadingTime,
      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    }`
  );
}

export async function getLatestPosts(limit = 3) {
  return client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc)[0...${limit}] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      mainImage,
      publishedAt,
      estimatedReadingTime,
      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    }`
  );
}

// Add debugging to getPostBySlug
export async function getPostBySlug(slug: string) {
  console.log("Fetching post with slug:", slug);

  const post = await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      author->{
        name,
        image,
        bio
      },
      mainImage,
      categories[]->{
        _id,
        title,
        "slug": slug.current
      },
      publishedAt,
      excerpt,
      body,
      estimatedReadingTime
    }`,
    { slug }
  );

  console.log("Post data:", post);
  return post;
}

// Update the getAllPostSlugs function to return objects with slug property
export async function getAllPostSlugs() {
  const slugs = await client.fetch(
    groq`*[_type == "post" && defined(slug.current)][].slug.current`
  );

  return slugs.map((slug: string) => ({ slug }));
}

export async function getAllCategories() {
  return client.fetch(
    groq`*[_type == "category"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description
    }`
  );
}

// Project queries
export async function getAllProjects(category?: string) {
  const filter = category
    ? `&& references(*[_type == "projectCategory" && slug.current == "${category}"]._id)`
    : "";

  return client.fetch(
    groq`*[_type == "project" ${filter}] | order(_createdAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      mainImage,
      technologies,
      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    }`
  );
}

export async function getFeaturedProjects(limit = 3) {
  return client.fetch(
    groq`*[_type == "project" && featured == true] | order(_createdAt desc)[0...${limit}] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      mainImage,
      technologies,
      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    }`
  );
}

// Add debugging to getProjectBySlug
export async function getProjectBySlug(slug: string) {
  console.log("Fetching project with slug:", slug);

  const project = await client.fetch(
    groq`*[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      mainImage,
      categories[]->{
        _id,
        title,
        "slug": slug.current
      },
      excerpt,
      description,
      technologies,
      completedAt,
      demoUrl,
      repoUrl,
      images
    }`,
    { slug }
  );

  console.log("Project data:", project);
  return project;
}

// Update the getAllProjectSlugs function to return objects with slug property
export async function getAllProjectSlugs() {
  const slugs = await client.fetch(
    groq`*[_type == "project" && defined(slug.current)][].slug.current`
  );

  return slugs.map((slug: string) => ({ slug }));
}

export async function getAllProjectCategories() {
  return client.fetch(
    groq`*[_type == "projectCategory"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description
    }`
  );
}

// Gallery queries - Adding the missing functions
export async function getAllGalleryItems(category?: string) {
  const filter = category
    ? `&& references(*[_type == "galleryCategory" && slug.current == "${category}"]._id)`
    : "";

  return client.fetch(
    groq`*[_type == "galleryItem" ${filter}] | order(date desc) {
      _id,
      title,
      "slug": slug.current,
      description,
      mediaType,
      image,
      "video": video.asset->url,
      videoThumbnail,
      date,
      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    }`
  );
}

export async function getFeaturedGalleryItems(limit = 6) {
  return client.fetch(
    groq`*[_type == "galleryItem" && featured == true] | order(date desc)[0...${limit}] {
      _id,
      title,
      "slug": slug.current,
      description,
      mediaType,
      image,
      "video": video.asset->url,
      videoThumbnail,
      date,
      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    }`
  );
}

export async function getGalleryItemBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "galleryItem" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      description,
      mediaType,
      image,
      "video": video.asset->url,
      videoThumbnail,
      date,
      tags,
      "categories": categories[]->{
        _id,
        title,
        "slug": slug.current
      }
    }`,
    { slug }
  );
}

export async function getAllGalleryCategories() {
  return client.fetch(
    groq`*[_type == "galleryCategory"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description
    }`
  );
}
