import { groq } from "next-sanity";
import { readClient } from "./client";

// ============================================================================
// FRAGMENTS (for more reusable code)
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
  "slug": slug.current,
  excerpt,
  "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
  publishedAt,
  "viewCount": coalesce(viewCount, 0),
  "likeCount": coalesce(likeCount, 0),
  "categories": categories[]->{ _id, title, "slug": slug.current },
  "author": author->{ name, "image": image.asset->url },
  "mainImage": mainImage { ${imageFields} }
`;

const projectCardFields = groq`
  _id,
  title,
  "slug": slug.current,
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

const shortCardFields = groq`
  _id,
  title,
  "slug": slug.current,
  body,
  publishedAt,
  "categories": categories[]->{ _id, title, "slug": slug.current },
  tags,
  "viewCount": coalesce(viewCount, 0),
  "likeCount": coalesce(likeCount, 0)
`;

// ============================================================================
// POST QUERIES
// ============================================================================

export async function getLatestPosts(limit = 3) {
  return readClient.fetch(
    groq`*[_type == "post" && publishedAt < now() && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...${limit}] {
      ${postCardFields}
    }`
  );
}

export async function getFeaturedPosts(limit = 4) {
  return readClient.fetch(
    groq`*[_type == "post" && featured == true && publishedAt < now() && !(_id in path("drafts.**"))] | order(publishedAt desc)[0...${limit}] {
      ${postCardFields}
    }`
  );
}

export async function getAllPosts(
  category?: string,
  searchQuery?: string,
  tag?: string
) {
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

  return readClient.fetch(query, params);
}

export async function getPostBySlug(slug: string) {
  return readClient.fetch(
    groq`*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      "mainImage": mainImage { ${imageFields} },
      body[]{
        ...,
        _type == "image" => { ${imageFields} }
      },
      publishedAt,
      _updatedAt,
      "viewCount": coalesce(viewCount, 0),
      "likeCount": coalesce(likeCount, 0),
      "categories": categories[]->{ _id, title, "slug": slug.current },
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180),
      "author": author->{
        _id,
        name,
        "image": image { ${imageFields} },
        bio,
        "slug": slug.current,
        socialLinks
      },
      tags
    }`,
    { slug }
  );
}

export async function getAllPostSlugs() {
  return readClient.fetch<string[]>(
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

  return readClient.fetch(query, { category: category || null });
}

export async function getFeaturedProjects(limit = 3) {
  return readClient.fetch(
    groq`*[_type == "project" && featured == true && !(_id in path("drafts.**"))] | order(completedAt desc)[0...${limit}] {
      ${projectCardFields}
    }`
  );
}

export async function getProjectBySlug(slug: string) {
  return readClient.fetch(
    groq`*[_type == "project" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      "slug": slug.current,
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
  return readClient.fetch<string[]>(
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

  return readClient.fetch(query, { category: category || null });
}

export async function getFeaturedGalleryItems(limit = 6) {
  return readClient.fetch(
    groq`*[_type == "galleryItem" && featured == true && !(_id in path("drafts.**"))] | order(date desc)[0...${limit}] {
    ${galleryCardFields}
  }`
  );
}

export async function getGalleryItemBySlug(slug: string) {
  return readClient.fetch(
    groq`*[_type == "galleryItem" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    mediaType,
    "image": image { ${imageFields} },
    "videoUrl": video.asset->url,
    "videoThumbnail": videoThumbnail { ${imageFields} },
    date,
    tags,
    "categories": categories[]->{ _id, title, "slug": slug.current }
  }`,
    { slug }
  );
}

// ============================================================================
// SHORT QUERIES
// ============================================================================

export async function getAllShort(
  category?: string,
  searchQuery?: string,
  tag?: string
) {
  const query = groq`*[_type == "short" && publishedAt < now() && !(_id in path("drafts.**"))
    && (!defined($category) || $category in categories[]->slug.current)
    && (!defined($searchQuery) || (
        title match $searchPattern ||
        pt::text(body) match $searchPattern
      ))
    && (!defined($tag) || $tag == null || $tag in tags)
  ] | order(publishedAt desc) {
    ${shortCardFields}
  }`;

  const params = {
    category: category || null,
    searchQuery: searchQuery || null,
    searchPattern: searchQuery ? `*${searchQuery}*` : null,
    tag: tag || null,
  };

  // @ts-ignore
  return readClient.fetch(query, params);
}

export async function getAllShortTags() {
  return readClient.fetch(
    groq`array::unique(*[_type == "short" && defined(tags)].tags[])`
  );
}

export async function getShortBySlug(slug: string) {
  return readClient.fetch(
    groq`*[_type == "short" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
      _id,
      title,
      "slug": slug.current,
      body,
      publishedAt,
      "categories": categories[]->{ _id, title, "slug": slug.current },
      tags,
      "viewCount": coalesce(viewCount, 0),
      "likeCount": coalesce(likeCount, 0),
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
    }`,
    { slug }
  );
}

// ============================================================================
// CATEGORY QUERIES
// ============================================================================

export async function getAllPostCategories() {
  return readClient.fetch(
    groq`*[_type == "category"] | order(title asc) { _id, title, "slug": slug.current }`
  );
}

export async function getAllProjectCategories() {
  return readClient.fetch(
    groq`*[_type == "projectCategory"] | order(title asc) { _id, title, "slug": slug.current }`
  );
}

export async function getAllGalleryCategories() {
  return readClient.fetch(
    groq`*[_type == "galleryCategory"] | order(title asc) {
      _id,
      title,
      "slug": slug.current,
      description
    }`
  );
}

// ============================================================================
// ABOUT PAGE QUERIES
// ============================================================================
export async function getAboutPageData() {
  return readClient.fetch(
    groq`*[_type == "aboutPage"][0] {
      currentActivities[]{
        _key,
        title,
        description
      },
      timelineEvents[]{
        _key,
        year,
        description
      }
    }`
  );
}

// ============================================================================
// USES PAGE QUERIES
// ============================================================================
export async function getUsesPageData() {
  return readClient.fetch(
    groq`*[_type == "usesPage"][0] {
      uses[]{
        _key,
        name,
        description,
        category,
        link,
        image
      },
    }`
  );
}

// ============================================================================
// STATISTICS PAGE QUERIES
// ============================================================================

export async function getDashboardStats() {
  // Query ini mengambil semua post dan short, lalu memproyeksikan data yang kita butuhkan
  return readClient.fetch(
    groq`{
      "postCount": count(*[_type == "post" && !(_id in path("drafts.**"))]),
      "shortCount": count(*[_type == "short" && !(_id in path("drafts.**"))]),
      "totalViews": math::sum(*[_type in ["post", "short"] && !(_id in path("drafts.**"))].viewCount),
      "totalLikes": math::sum(*[_type in ["post", "short"] && !(_id in path("drafts.**"))].likeCount)
    }`
  );
}
