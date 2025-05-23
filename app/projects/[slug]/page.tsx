import { ArrowLeft, Calendar, ExternalLink, Github } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image"; // Diimpor dari next/image
import Link from "next/link";
import { notFound } from "next/navigation";

import { PortableText } from "@/components/portable-text";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllProjectSlugs, getProjectBySlug } from "@/lib/sanity/queries";
import { cn, formatDate } from "@/lib/utils"; // cn ditambahkan jika belum ada
import { Geist } from "next/font/google"; // Menggunakan next/font/google
import { urlFor } from "../../../lib/sanity/image"; // Pastikan path ini benar

const GeistSans = Geist({ subsets: ["latin"] });

// Constants
const APP_NAME = "Aditya"; // Atau nama aplikasi/situs Anda
const NOT_FOUND_TITLE = "Project Not Found";
const DEFAULT_IMAGE_PLACEHOLDER = "/placeholder.svg"; // Pastikan file ini ada di folder /public
const NEXT_PUBLIC_SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://example.com"; // Fallback URL

export async function generateMetadata({
  params: promiseParams, // Nama variabel promiseParams sudah baik
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await promiseParams; // Menggunakan await pada promiseParams

  if (!slug) {
    // Jika slug tidak ada di params (seharusnya tidak terjadi jika rute terdefinisi)
    return { title: `${NOT_FOUND_TITLE} | ${APP_NAME}` };
  }

  const project = await getProjectBySlug(slug);

  if (!project) {
    return { title: `${NOT_FOUND_TITLE} | ${APP_NAME}` };
  }

  const metadata: Metadata = {
    title: `${project.title} | ${APP_NAME}`,
    description: project.excerpt,
    alternates: {
      // Menambahkan canonical URL
      canonical: `${NEXT_PUBLIC_SITE_URL}/projects/${slug}`,
    },
  };

  // Hanya tambahkan OpenGraph images jika mainImage ada dan URL valid
  if (project.mainImage) {
    const imageUrl = urlFor(project.mainImage)?.width(1200)?.height(630)?.url(); // .url() mengembalikan string | null

    if (imageUrl) {
      // Pastikan imageUrl adalah string valid
      metadata.openGraph = {
        images: [{ url: imageUrl, width: 1200, height: 630 }],
        title: project.title,
        description: project.excerpt,
        url: `${NEXT_PUBLIC_SITE_URL}/projects/${slug}`,
        siteName: APP_NAME,
        type: "article", // Atau 'website' jika lebih sesuai
      };
      metadata.twitter = {
        // Menambahkan Twitter card metadata
        card: "summary_large_image",
        title: project.title,
        description: project.excerpt,
        images: [imageUrl],
      };
    }
  }

  return metadata;
}

export async function generateStaticParams() {
  const projectSlugs = await getAllProjectSlugs(); // Fungsi ini mengembalikan string[]
  return projectSlugs
    .filter(
      (slug: string | null | undefined): slug is string =>
        typeof slug === "string" && slug.length > 0
    ) // Memastikan slug adalah string valid
    .map((slug: string) => ({
      slug: slug,
    }));
}

// Komponen kecil untuk tombol link proyek
const ProjectLinkButton = ({
  href,
  icon: Icon,
  children,
  variant = "default",
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined; // Menggunakan tipe ButtonProps['variant'] jika tersedia
}) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    passHref
    legacyBehavior
  >
    <Button variant={variant} asChild={false}>
      {" "}
      {/* asChild={false} jika Link adalah parent langsung */}
      <Icon className="mr-2 h-4 w-4" />
      {children}
    </Button>
  </Link>
);

// Komponen kecil untuk galeri proyek
const ProjectGallery = ({
  images,
  projectTitle, // Mengganti 'title' menjadi 'projectTitle' agar lebih spesifik
}: {
  images: any[]; // Sebaiknya ganti 'any' dengan tipe spesifik untuk image Sanity
  projectTitle: string;
}) => {
  if (!images || images.length === 0) {
    return null; // Tidak render apa-apa jika tidak ada gambar
  }

  return (
    <div className="space-y-6 pt-6">
      <h2 className="text-2xl font-semibold tracking-tight text-slate-100">
        Project Gallery
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
        {images.map((image, index) => {
          const imageUrl = image.asset
            ? urlFor(image.asset).url()
            : typeof image === "string"
              ? image
              : DEFAULT_IMAGE_PLACEHOLDER;

          return (
            <div
              key={index}
              className="relative aspect-video overflow-hidden rounded-lg border border-slate-700 shadow-md group"
            >
              {imageUrl && imageUrl !== DEFAULT_IMAGE_PLACEHOLDER ? (
                <Image
                  src={imageUrl}
                  alt={`${projectTitle} - Gallery Image ${index + 1}`}
                  fill
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                  <span className="text-slate-500 text-sm">
                    Image not available
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default async function ProjectDetailPage({
  params: promiseParams,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await promiseParams;

  if (!slug) {
    notFound();
  }

  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const {
    title = "Untitled Project",
    categories,
    completedAt,
    mainImage,
    technologies,
    demoUrl,
    repoUrl,
    description,
    images,
  } = project;

  const mainImageUrl = mainImage ? urlFor(mainImage).url() : null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: title,
    applicationCategory: categories?.[0]?.title,
    operatingSystem: "Cross-platform",
    description: project.excerpt || "No description available.",
    ...(mainImageUrl && { image: mainImageUrl }),
    ...(demoUrl && { url: demoUrl }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main
        className={cn(
          "container text-slate-100 px-4 py-12 md:px-6 md:py-16 lg:py-24",
          GeistSans.className
        )}
      >
        <div className="mx-auto max-w-3xl">
          <Link href="/projects" legacyBehavior>
            <a className="inline-flex items-center text-sky-400 hover:text-sky-300 mb-8 group">
              <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back to Projects
            </a>
          </Link>

          <div className="space-y-8">
            <header className="space-y-3">
              {categories && categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {categories.map((category: any, index: number) => (
                    <Link
                      key={index}
                      href={`/projects?category=${category.slug?.current || category.slug}`}
                      passHref
                      legacyBehavior
                    >
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-slate-700 text-sky-300 border-sky-700 hover:bg-slate-600"
                      >
                        {category.title}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
              <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-slate-50">
                {title}
              </h1>
              {completedAt && (
                <div className="flex items-center gap-1.5 text-sm text-slate-400">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={completedAt}>{formatDate(completedAt)}</time>
                </div>
              )}
            </header>

            {mainImageUrl && ( // Render hanya jika mainImageUrl valid
              <figure className="relative aspect-video overflow-hidden rounded-xl border border-slate-700 shadow-lg">
                <Image
                  src={mainImageUrl}
                  alt={project.alt || `Cover image for ${title}`}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 80vw, 70vw"
                />
              </figure>
            )}

            {technologies && technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-2">
                {technologies.map((tech: string, index: number) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="border-slate-600 text-slate-300 bg-slate-700/50"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            )}

            <div className="flex flex-wrap gap-3 pt-2">
              {demoUrl && (
                <ProjectLinkButton
                  href={demoUrl}
                  icon={ExternalLink}
                  variant="default"
                >
                  Live Demo
                </ProjectLinkButton>
              )}
              {repoUrl && (
                <ProjectLinkButton
                  href={repoUrl}
                  icon={Github}
                  variant="outline"
                >
                  Source Code
                </ProjectLinkButton>
              )}
            </div>

            {description && description.length > 0 && (
              <div
                className="prose prose-lg prose-slate dark:prose-invert max-w-none 
                              prose-headings:text-slate-100 prose-a:text-sky-400 hover:prose-a:text-sky-300
                              prose-strong:text-slate-100 prose-code:text-pink-400 
                              prose-blockquote:border-sky-400 prose-blockquote:text-slate-300"
              >
                <PortableText value={description} />
              </div>
            )}

            {images && images.length > 0 && (
              <ProjectGallery images={images} projectTitle={title} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
