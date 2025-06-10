import type { Variants } from "framer-motion";
import * as motion from "motion/react-client";
import { cn } from "../../lib/utils";
import { CollaborationCard } from "../card/CollaborativeCard";
import { LetsWorkTogetherCard } from "../card/CTACard";
import { CurrentProjectCard } from "../card/CurrentProgressCard";
import { ProjectsPreviewCard } from "../card/PreviewCard";
import { NowPlaying } from "../card/SpotifyCard";
import { TechStackCard } from "../card/TechStackCard";
import { TimezoneCard } from "../card/TimeGlobeCard";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1], // Kurva easing yang smooth
    },
  },
};

// Data dummy untuk avatar (seperti yang Anda berikan)
const mainUser = {
  id: "main",
  src: "/logo.avif", // Pastikan path gambar ini benar
  alt: "My Profile",
};
const collaborators = [
  { id: "c1", src: "/profile.webp", alt: "User 1" },
  { id: "c2", src: "/profile.webp", alt: "User 2" },
  { id: "c3", src: "/profile.webp", alt: "User 3" },
  { id: "c4", src: "/profile.webp", alt: "User 4" },
  { id: "c5", src: "/profile.webp", alt: "User 5" },
  { id: "c6", src: "/profile.webp", alt: "User 6" },
];

// Array item bento dengan konfigurasi layout
// Pastikan setiap komponen yang dirender di 'content' memiliki h-full
const bentoItems = [
  {
    id: "collaboration",
    content: (
      <CollaborationCard
        mainProfile={mainUser}
        surroundingAvatars={collaborators}
      />
    ),
    className: "lg:col-span-2 lg:row-span-1", // Untuk layar besar (LG)
    mdClassName: "md:col-span-2 md:row-span-1", // Untuk layar medium (MD)
  },
  {
    id: "tech-stack",
    content: <TechStackCard />,
    className: "lg:col-span-1 lg:row-span-1",
    mdClassName: "md:col-span-1 md:row-span-1",
  },
  {
    id: "timezone",
    content: <TimezoneCard />,
    className: "lg:col-span-1 lg:row-span-1",
    mdClassName: "md:col-span-1 md:row-span-1",
  },
  {
    id: "lets-work",
    content: <LetsWorkTogetherCard />,
    className: "lg:col-span-1 lg:row-span-1",
    mdClassName: "md:col-span-1 md:row-span-1",
  },
  {
    id: "currently-played",
    content: <NowPlaying />, // Pastikan NowPlaying juga memiliki h-full jika ingin mengisi sel
    className: "lg:col-span-1 lg:row-span-1",
    mdClassName: "md:col-span-1 md:row-span-1 sm:col-span-1 sm:row-span-2",
  },
  {
    id: "projects-preview",
    content: <ProjectsPreviewCard />,
    className: "lg:col-span-1 lg:row-span-2", // ProjectsPreview lebih tinggi di LG
    mdClassName: "md:col-span-2 md:row-span-1", // Juga lebih tinggi di MD
  },
  {
    id: "current-project",
    content: <CurrentProjectCard />, // Ini adalah kartu yang besar
    className: "lg:col-span-2 lg:row-span-2", // Lebih lebar dan tinggi di LG
    mdClassName: "md:col-span-2 md:row-span-2", // Juga lebih lebar dan tinggi di MD
  },
];

export default function BentoShowcase() {
  return (
    <motion.section
      id="about"
      className={cn(
        "flex min-h-screen w-full items-center justify-center",
        "bg-gradient-to-br from-slate-950 via-slate-900 to-black", // Latar belakang lebih dalam
        "px-4 py-24 sm:px-6 lg:py-32", // Penyesuaian padding vertikal
        "scroll-mt-20" // Untuk offset anchor link jika ada fixed header
      )}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
    >
      <div
        className={cn(
          "grid grid-cols-1 gap-5", // Default: 1 kolom untuk mobile
          "md:auto-rows-[20rem] md:grid-cols-2 md:gap-5", // Tablet: 2 kolom, tinggi baris 20rem
          "lg:grid-cols-3 lg:gap-6" // Desktop: 3 kolom, tinggi baris tetap 20rem dari MD
        )}
      >
        {bentoItems.map((item, i) => (
          <motion.div
            key={item.id || i}
            className={cn(
              "z-40 row-span-1",
              "border-none bg-transparent p-0 shadow-none",
              item.className,
              item.mdClassName
            )}
            variants={itemVariants}
          >
            {item.content}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
