"use client";

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

// const containerVariants: Variants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.1,
//     },
//   },
// };

// const itemVariants: Variants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.6,
//       ease: [0.22, 1, 0.36, 1],
//     },
//   },
// };

// const mainUser = {
//   id: "main",
//   src: "/profile.webp",
//   alt: "My Profile",
// };
// const collaborators = [
//   { id: "c1", src: "/profile.webp", alt: "User 1" },
//   { id: "c2", src: "/profile.webp", alt: "User 2" },
//   { id: "c3", src: "/profile.webp", alt: "User 3" },
//   { id: "c4", src: "/profile.webp", alt: "User 4" },
//   { id: "c5", src: "/profile.webp", alt: "User 5" },
//   { id: "c6", src: "/profile.webp", alt: "User 6" },
// ];

// const bentoItems = [
//   {
//     id: "collaboration",
//     content: (
//       <CollaborationCard
//         mainProfile={mainUser}
//         surroundingAvatars={collaborators}
//       />
//     ),

//     className: "lg:col-span-2 lg:row-span-1",

//     mdClassName: "md:col-span-2 md:row-span-1",
//   },
//   {
//     id: "tech-stack",
//     content: <TechStackCard />,
//     className: "lg:col-span-1 lg:row-span-1",
//     mdClassName: "md:col-span-1 md:row-span-1",
//   },
//   {
//     id: "timezone",
//     content: <TimezoneCard />,
//     className: "lg:col-span-1 lg:row-span-1",
//     mdClassName: "md:col-span-1 md:row-span-1",
//   },
//   {
//     id: "lets-work",
//     content: <LetsWorkTogetherCard />,
//     className: "lg:col-span-1 lg:row-span-1",
//     mdClassName: "md:col-span-1 md:row-span-1",
//   },
//   {
//     id: "projects-preview",
//     content: <ProjectsPreviewCard />,
//     className: "lg:col-span-1 lg:row-span-2",
//     mdClassName: "md:col-span-1 md:row-span-2",
//   },
//   {
//     id: "currently-played",
//     content: <NowPlaying />,
//     className: "lg:col-span-1 lg:row-span-1",
//     mdClassName: "md:col-span-1 md:row-span-1",
//   },
//   {
//     id: "current-project",
//     content: <CurrentProjectCard />,
//     className: "lg:col-span-2 lg:row-span-2",
//     mdClassName: "md:col-span-2 md:row-span-2",
//   },
// ];

// export default function BentoShowcase() {
//   return (
//     <motion.div
//       className="mx-auto w-full max-w-7xl px-4 py-8 md:py-12"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       <div className="grid grid-cols-1 gap-5 md:auto-rows-[20rem] md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
//         {/* Catatan: md:auto-rows-[20rem] berarti setiap unit baris di tablet & desktop adalah 20rem (320px).
//           Kartu dengan row-span-1 akan memiliki tinggi 20rem.
//           Kartu dengan row-span-2 akan memiliki tinggi 40rem.
//         */}
//         {bentoItems.map((item, i) => (
//           <motion.div
//             key={item.id || i}
//             className={cn(
//               "row-span-1 rounded-xl", // Default row-span-1, rounded-xl untuk konsistensi jika kartu internal tidak punya
//               // KELAS-KELAS STYLING PEMBUNGKUS DIHAPUS/DIBUAT TRANSPARAN:
//               // "border border-transparent bg-white p-4 shadow-none transition-all duration-200 hover:shadow-md dark:border-white/[0.1] dark:bg-black dark:hover:shadow-none",
//               // Menjadi:
//               "border-none bg-transparent p-0 shadow-none", // Pembungkus transparan, tanpa padding default
//               item.className, // Untuk lg screens (dan fallback jika mdClassName tidak ada)
//               item.mdClassName, // Untuk md screens
//             )}
//             variants={itemVariants}
//           >
//             {item.content}
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   );
// }

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // Efek stagger untuk item-item
    },
  },
};

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
  src: "/profile.webp", // Pastikan path gambar ini benar
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
      variants={containerVariants}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }} // Transisi masuk halaman lebih lama sedikit
      viewport={{ once: true }}
      aria-labelledby="about-heading"
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
            key={item.id || i} // Gunakan item.id untuk key yang stabil
            className={cn(
              "z-40 row-span-1", // Default row-span, akan di-override oleh item.className/mdClassName
              // Pembungkus ini seharusnya transparan dan tidak menambahkan styling visual
              // seperti background, border, atau shadow utama.
              // Padding (p-0) juga dihilangkan karena kartu internal akan mengaturnya.
              // Rounded-xl dihilangkan agar tidak bentrok dengan radius kartu internal.
              "border-none bg-transparent p-0 shadow-none",
              item.className, // Span untuk layar LG (dan fallback)
              item.mdClassName // Span spesifik untuk layar MD
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
