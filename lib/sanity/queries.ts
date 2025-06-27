import { groq } from "next-sanity";
import { client } from "./client";

// ============================================================================
// FRAGMENTS (untuk kode yang lebih bersih dan reusable)
// ============================================================================

const imageFields = groq`
  alt,
  caption,
  "lqip": asset->metadata.lqip,
  asset->{
    _id,
    url,
    "width": metadata.dimensions.width,
    "height": metadata.dimensions.height
  }
`;

const postCardFields = groq`
  _id,
  title,
  slug,
  excerpt,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
  publishedAt,
  viewCount,
  likeCount,
  "categories": categories[]->{ _id, title, "slug": slug.current },
  "mainImage": mainImage { ${imageFields} }
`;

const projectCardFields = groq`
  _id,
  title,
  slug,
  excerpt,
  "mainImage": mainImage { ${imageFields} },
  technologies,
  "categories": categories[]->{ _id, title, "slug": slug.current }
`;

const galleryCardFields = groq`
  _id,
  title,
 "slug": slug.current,
  mediaType,
  // Membuat satu field 'thumbnail' yang cerdas
  "thumbnail": coalesce(videoThumbnail, image) { ${imageFields} }
`;

// ============================================================================
// POST QUERIES
// ============================================================================

export async function getLatestPosts(limit = 3) {
  return client.fetch(
    groq`*[_type == "post" && publishedAt < now() && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...${limit}] {
      ${postCardFields}
    }`
  );
}

export async function getFeaturedPosts(limit = 4) {
  return client.fetch(
    groq`*[_type == "post" && featured == true && publishedAt < now() && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...${limit}] {
      ${postCardFields}
    }`
  );
}

export async function getAllPosts(category?: string, searchQuery?: string) {
  const query = groq`*[_type == "post" && publishedAt < now() && !(_id in path("drafts.**"))
    && (!defined($category) || $category in categories[]->slug.current)
    && (!defined($searchQuery) || (
        title match $searchPattern ||
        excerpt match $searchPattern ||
        pt::text(body) match $searchPattern
      ))
  ] | order(publishedAt desc) {
    ${postCardFields}
  }`;

  const params = {
    category: category || null,
    searchQuery: searchQuery || null,
    searchPattern: searchQuery ? `*${searchQuery}*` : null,
  };

  return client.fetch(query, params);
}

export async function getPostBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      slug,
      excerpt,
      "mainImage": mainImage { ${imageFields} },
      body[]{
        ...,
        _type == "image" => { ${imageFields} }
      },
      publishedAt,
      _updatedAt,
      "viewCount": coalesce(viewCount, 0),      // PERBAIKAN DI SINI
      "likeCount": coalesce(likeCount, 0),      // PERBAIKAN DI SINI
      "categories": categories[]->{ _id, title, slug },
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
      "author": author->{
        _id,
        name,
        "image": image { ${imageFields} },
        bio,
        slug,
        socialLinks
      },
      tags
    }`,
    { slug }
  );
}

export async function getAllPostSlugs() {
  return client.fetch<string[]>(
    groq`*[_type == "post" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current`
  );
}

// ============================================================================
// PROJECT QUERIES
// ============================================================================

export async function getAllProjects(category?: string) {
  const query = groq`*[_type == "project" && !(_id in path("drafts.**"))
    && (!defined($category) || $category in categories[]->slug.current)
  ] | order(completedAt desc) {
    ${projectCardFields}
  }`;

  return client.fetch(query, { category: category || null });
}

export async function getFeaturedProjects(limit = 3) {
  return client.fetch(
    groq`*[_type == "project" && featured == true && !(_id in path("drafts.**"))] | order(completedAt desc)[0...${limit}] {
      ${projectCardFields}
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
      "mainImage": mainImage { ${imageFields} },
      description[]{
        ...,
        _type == "image" => { ${imageFields} }
      },
      technologies,
      completedAt,
      demoUrl,
      repoUrl,
      images[]{
        _key,
        ${imageFields}
      },
      "categories": categories[]->{ _id, title, "slug": slug.current }
    }`,
    { slug }
  );
}

export async function getAllProjectSlugs() {
  return client.fetch<string[]>(
    groq`*[_type == "project" && defined(slug.current) && !(_id in path("drafts.**"))].slug.current`
  );
}

// ============================================================================
// GALLERY QUERIES
// ============================================================================

export async function getAllGalleryItems(category?: string) {
  const query = groq`*[_type == "galleryItem" && !(_id in path("drafts.**"))
  && (!defined($category) || $category in categories[]->slug.current)
] | order(date desc) {
  ${galleryCardFields}
}`;

  return client.fetch(query, { category: category || null });
}

export async function getFeaturedGalleryItems(limit = 6) {
  return client.fetch(
    groq`*[_type == "galleryItem" && featured == true && !(_id in path("drafts.**"))] | order(date desc)[0...${limit}] {
    ${galleryCardFields}
  }`
  );
}

export async function getGalleryItemBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "galleryItem" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    slug,
    description,
    mediaType,
    "image": image { ${imageFields} },
    "videoUrl": video.asset->url,
    "videoThumbnail": videoThumbnail { ${imageFields} },
    date,
    tags, // PERBAIKAN: Diambil sebagai array of string
    "categories": categories[]->{ _id, title, "slug": slug.current }
  }`,
    { slug }
  );
}

export async function getAllShort() {
  return client.fetch(
    groq`*[_type == "short" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
      _id,
      title,
      slug,
      body,
      publishedAt,
      "categories": categories[]->{ _id, title, "slug": slug.current },
      tags
    }`
  );
}

export async function getShortBySlug(slug: string) {
  return client.fetch(
    groq`*[_type == "short" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      slug,
      body,
      publishedAt,
      "categories": categories[]->{ _id, title, "slug": slug.current },
      tags
    }`,
    { slug }
  );
}

// ============================================================================
// CATEGORY QUERIES
// ============================================================================

export async function getAllPostCategories() {
  return client.fetch(
    groq`*[_type == "category"] | order(title asc) { _id, title, "slug": slug.current }`
  );
}

export async function getAllProjectCategories() {
  return client.fetch(
    groq`*[_type == "projectCategory"] | order(title asc) { _id, title, "slug": slug.current }`
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
