"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Impor Button
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { urlFor } from "@/lib/sanity/image"; // Pastikan path ini benar
import { cn, formatDate } from "@/lib/utils"; // Pastikan path ini benar
import { AnimatePresence, motion } from "framer-motion"; // Sudah Anda impor
import {
  Bookmark,
  Heart,
  Image as ImageIconPlaceholder, // Mengganti nama agar tidak konflik dengan next/image
  MessageSquare,
  Play,
  Share2,
  UserCircle2, // Avatar placeholder
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const DEFAULT_IMAGE_PLACEHOLDER = "/placeholder.svg"; // Definisikan path placeholder Anda

interface GalleryItemType {
  _id: string;
  title: string;
  slug: { current: string };
  description?: string;
  mediaType: "image" | "video";
  image?: any; // Objek gambar Sanity
  video?: string; // URL video
  videoThumbnail?: any; // Objek gambar Sanity untuk thumbnail video
  date: string;
  categories?: Array<{
    _id: string;
    title: string;
    slug: { current: string };
  }>;
  // Anda bisa menambahkan field author di sini jika ada per item galeri
  // author?: { name: string; avatar?: any };
}

interface GalleryItemProps {
  item: GalleryItemType;
  // notFoundMessage dihapus karena kita akan selalu render sesuatu atau placeholder
}

export function GalleryItem({ item }: GalleryItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // 1. Logika untuk menentukan URL thumbnail
  let thumbnailUrl = DEFAULT_IMAGE_PLACEHOLDER;
  let hasValidThumbnail = false;

  if (item.mediaType === "image" && item.image?.asset) {
    thumbnailUrl =
      urlFor(item.image).width(400).height(400).fit("crop").url() ||
      DEFAULT_IMAGE_PLACEHOLDER;
    hasValidThumbnail = thumbnailUrl !== DEFAULT_IMAGE_PLACEHOLDER;
  } else if (item.mediaType === "video") {
    if (item.videoThumbnail?.asset) {
      thumbnailUrl =
        urlFor(item.videoThumbnail).width(400).height(400).fit("crop").url() ||
        DEFAULT_IMAGE_PLACEHOLDER;
    } else if (item.image?.asset) {
      // Fallback ke item.image jika videoThumbnail tidak ada
      thumbnailUrl =
        urlFor(item.image).width(400).height(400).fit("crop").url() ||
        DEFAULT_IMAGE_PLACEHOLDER;
    }
    hasValidThumbnail = thumbnailUrl !== DEFAULT_IMAGE_PLACEHOLDER;
  }

  // Logika untuk media utama di dialog
  const dialogMediaUrl =
    item.mediaType === "image" && item.image?.asset
      ? urlFor(item.image).url() // Ambil versi lebih besar untuk dialog
      : null;
  const dialogVideoPosterUrl = item.videoThumbnail?.asset
    ? urlFor(item.videoThumbnail).url()
    : item.image?.asset
      ? urlFor(item.image).url()
      : undefined;

  return (
    <>
      {/* Gallery Thumbnail */}
      <div
        className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-slate-800 shadow-md" // Latar belakang untuk placeholder
        onClick={() => setIsOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setIsOpen(true)}
        aria-label={`View details for ${item.title}`}
      >
        {hasValidThumbnail ? (
          <Image
            src={thumbnailUrl}
            alt={`Thumbnail for ${item.title}`}
            fill
            className="object-cover transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:brightness-90"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-slate-700 text-slate-500">
            <ImageIconPlaceholder className="w-12 h-12" />
          </div>
        )}

        {item.mediaType === "video" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/10 transition-colors duration-300">
            <div className="rounded-full bg-black/60 p-3 backdrop-blur-sm shadow-lg">
              <Play className="h-5 w-5 text-white fill-white sm:h-6 sm:w-6" />
            </div>
          </div>
        )}

        {/* Overlay saat hover - lebih halus */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-between p-3 sm:p-4"
          >
            {/* Bagian atas overlay: Kosong atau ikon kecil jika perlu */}
            <div className="flex justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
              {/* Bisa tambahkan ikon tipe media jika perlu, misal ikon Video atau Foto */}
            </div>

            {/* Bagian bawah overlay: Kategori dan Judul */}
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100 transform group-hover:translate-y-0 translate-y-4">
              {item.categories && item.categories.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-1.5">
                  {item.categories.slice(0, 2).map(
                    (
                      category // Batasi jumlah kategori di thumbnail
                    ) => (
                      <Badge
                        key={category._id}
                        variant="secondary"
                        className="bg-white/15 text-white text-xs px-1.5 py-0.5 hover:bg-white/25 backdrop-blur-sm"
                      >
                        {category.title}
                      </Badge>
                    )
                  )}
                </div>
              )}
              <h3 className="text-white font-semibold text-sm sm:text-base line-clamp-2 leading-tight">
                {item.title}
              </h3>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dialog Tampilan Detail (Instagram-like) */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl lg:max-w-5xl w-[95vw] sm:w-full h-[90vh] max-h-[800px] p-0 flex flex-col sm:flex-row overflow-hidden data-[state=open]:animate-contentShow">
          {/* Bagian Media (Kiri di Desktop, Atas di Mobile) */}
          <DialogTitle className="sr-only">Dialog open</DialogTitle>
          <div className="relative w-full sm:w-[60%] h-1/2 sm:h-full bg-black flex items-center justify-center overflow-hidden">
            {item.mediaType === "image" && dialogMediaUrl ? (
              <Image
                src={dialogMediaUrl}
                alt={item.title}
                width={1920} // Beri nilai besar agar kualitas baik, next/image akan optimasi
                height={1080}
                className="w-auto h-auto max-w-full max-h-full object-contain"
                priority // Muat gambar ini dengan prioritas saat dialog terbuka
              />
            ) : item.mediaType === "video" && item.video ? (
              <video
                src={item.video}
                controls
                autoPlay
                loop
                className="w-full h-full object-contain"
                poster={dialogVideoPosterUrl}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-slate-900 text-slate-500">
                <ImageIconPlaceholder className="w-24 h-24" />
              </div>
            )}
          </div>

          {/* Bagian Info & Aksi (Kanan di Desktop, Bawah di Mobile) */}
          <div className="w-full sm:w-[40%] flex flex-col bg-card text-card-foreground border-t sm:border-t-0 sm:border-l border-border">
            {/* Header Info Penulis/Post */}
            <div className="p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                {/* Ganti dengan avatar penulis jika ada, atau avatar default situs */}
                <UserCircle2 className="h-9 w-9 text-muted-foreground rounded-full" />
                <div>
                  <span className="font-semibold text-sm block">adxxya30</span>{" "}
                  {/* Atau item.author.name */}
                  {/* <span className="text-xs text-muted-foreground">Original Post</span> */}
                </div>
              </div>
            </div>

            {/* Konten Deskripsi & Kategori (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
              <div className="space-y-1">
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {" "}
                  {/* whitespace-pre-wrap untuk menghargai baris baru */}
                  {/* Tampilkan deskripsi jika ada, jika tidak tampilkan judul */}
                  <span className="font-semibold text-sm mr-1">adxxya30</span>
                  {item.description || item.title}
                </p>
                <time
                  dateTime={item.date}
                  className="block text-xs text-muted-foreground hover:underline pt-1"
                >
                  {formatDate(item.date)}
                </time>
              </div>

              {item.categories && item.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {item.categories.map((category) => (
                    <Badge
                      key={category._id}
                      variant="secondary" // Gunakan variant yang sesuai dengan tema
                      className="text-xs bg-secondary hover:bg-secondary/80"
                    >
                      {category.title}
                    </Badge>
                  ))}
                </div>
              )}
              {/* Tempat untuk menampilkan komentar jika ada */}
            </div>

            {/* Bagian Aksi & Input Komentar */}
            <div className="p-4 border-t border-border space-y-3 bg-background/50 sm:bg-transparent">
              <div className="flex justify-between items-center">
                <div className="flex space-x-1 sm:space-x-2">
                  <motion.div whileTap={{ scale: 0.9 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsLiked(!isLiked)}
                      aria-label={isLiked ? "Unlike" : "Like"}
                    >
                      <Heart
                        className={cn(
                          "h-6 w-6 transition-colors",
                          isLiked
                            ? "fill-red-500 text-red-500"
                            : "text-foreground hover:text-red-500/80"
                        )}
                      />
                    </Button>
                  </motion.div>
                  <Button variant="ghost" size="icon" aria-label="Comment">
                    {" "}
                    {/* Arahkan ke input komentar */}
                    <MessageSquare className="h-6 w-6 text-foreground hover:text-foreground/80" />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label="Share">
                    <Share2 className="h-6 w-6 text-foreground hover:text-foreground/80" />
                  </Button>
                </div>
                <motion.div whileTap={{ scale: 0.9 }}>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSaved(!isSaved)}
                    aria-label={isSaved ? "Unsave" : "Save"}
                  >
                    <Bookmark
                      className={cn(
                        "h-6 w-6 transition-colors",
                        isSaved
                          ? "fill-foreground text-foreground"
                          : "text-foreground hover:text-foreground/80"
                      )}
                    />
                  </Button>
                </motion.div>
              </div>

              {/* Jika Anda memiliki data jumlah like yang sebenarnya */}
              {/* <div className="text-sm font-semibold">{item.likeCount || 0} likes</div> */}

              <div className="flex items-center pt-2 border-t border-border">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground py-1"
                  aria-label="Add a comment"
                />
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:text-primary/80 font-semibold"
                >
                  Post
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
