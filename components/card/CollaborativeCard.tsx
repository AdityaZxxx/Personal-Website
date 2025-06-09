"use client";

import { LazyMotion, domAnimation, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { cardVariants, cn } from "../../lib/utils";
import { SurroundingAvatar } from "./SurroundingAvatar";

// Hook kustom untuk deteksi media query yang lebih robust
const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener("resize", listener);
    return () => window.removeEventListener("resize", listener);
  }, [matches, query]);
  return matches;
};

interface AvatarInfo {
  id: string;
  src: string;
  alt: string;
  name?: string;
  role?: string;
}

interface CollaborationCardProps {
  mainProfile: AvatarInfo;
  surroundingAvatars: AvatarInfo[];
  title?: string;
  description?: string;
  className?: string;
}

const placeholderAvatar =
  "https://via.placeholder.com/150/1e293b/ffffff?text=Avatar";
const avatarBorders = [
  "border-pink-500/80 shadow-pink-500/20",
  "border-teal-400/80 shadow-teal-400/20",
  "border-purple-500/80 shadow-purple-500/20",
  "border-yellow-400/80 shadow-yellow-400/20",
  "border-emerald-400/80 shadow-emerald-400/20",
  "border-amber-500/80 shadow-amber-500/20",
];

export const CollaborationCard: React.FC<CollaborationCardProps> = ({
  mainProfile,
  surroundingAvatars,
  title = "Our Collaboration",
  description = "We thrive on client collaboration...",
  className,
}) => {
  const [isCardActive, setIsCardActive] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery("(max-width: 768px)");

  // State isCardActive langsung di-set true di mobile
  useEffect(() => {
    if (isMobile) {
      setIsCardActive(true);
    }
  }, [isMobile]);

  // Optimasi: Gunakan useMemo untuk mengkalkulasi posisi avatar
  // Ini hanya akan dihitung ulang jika dependensi berubah
  const avatarPositions = useMemo(() => {
    const num = surroundingAvatars.length;
    const radius = isMobile ? 60 : 80;
    const startAngle = isMobile ? 15 : -90;
    const endAngle = isMobile ? 165 : 90;
    const angleStep = num > 1 ? (endAngle - startAngle) / (num - 1) : 0;

    return surroundingAvatars.map((_, index) => {
      const angle = startAngle + (num > 1 ? index * angleStep : 0);
      const angleRad = (angle * Math.PI) / 180;
      return {
        x: radius * Math.cos(angleRad),
        y: -radius * Math.sin(angleRad),
      };
    });
  }, [surroundingAvatars.length, isMobile]);

  // Optimasi untuk event mouse follow (jika ingin digunakan)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isMobile) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    // Optimasi: Gunakan LazyMotion untuk mengurangi bundle size
    <LazyMotion features={domAnimation}>
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 20 }}
        whileHover={!isMobile ? "hover" : "initial"}
        variants={cardVariants}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        viewport={{ once: true }}
        onMouseEnter={() => !isMobile && setIsCardActive(true)}
        onMouseLeave={() => !isMobile && setIsCardActive(false)}
        onMouseMove={handleMouseMove}
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-3xl md:flex-row",
          "border border-slate-700/70 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-md",
          "shadow-xl transition-all duration-300 hover:border-sky-500/60 hover:shadow-2xl hover:shadow-sky-500/25",
          className
        )}
      >
        {/* AVATAR SECTION */}
        <div className="relative z-10 flex h-48 w-full items-center justify-center md:h-full md:w-1/2 md:min-w-[300px]">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="z-10 cursor-pointer"
          >
            <Image
              src={mainProfile.src || placeholderAvatar}
              alt={mainProfile.alt}
              width={isMobile ? 88 : 96}
              height={isMobile ? 88 : 96}
              className="rounded-full border-[4px] border-sky-400/80 object-cover shadow-xl shadow-sky-500/30 transition-all duration-300 hover:border-sky-300/90"
              priority
            />
          </motion.div>

          {surroundingAvatars.map((avatar, index) => {
            return (
              <SurroundingAvatar
                key={avatar.id}
                avatar={avatar}
                isActive={isCardActive} // Lewatkan status aktif
                position={avatarPositions[index]} // Lewatkan posisi yang sudah di-memoize
                size={isMobile ? 40 : 44}
                borderColor={avatarBorders[index % avatarBorders.length]}
                transitionConfig={{
                  type: "spring",
                  stiffness: 180,
                  damping: 15,
                  delay: isCardActive ? index * 0.08 + (isMobile ? 0.2 : 0) : 0,
                }}
              />
            );
          })}
        </div>

        {/* TEXT CONTENT SECTION */}
        <div className="relative z-10 flex flex-grow flex-col p-6 text-center md:h-full md:w-1/2 md:justify-center md:p-8 md:text-left">
          <motion.h3 className="mb-3 bg-gradient-to-r from-slate-100 via-sky-200 to-cyan-300 bg-clip-text text-2xl font-bold text-transparent md:text-3xl">
            {title}
          </motion.h3>
          <p className="mb-6 text-sm leading-relaxed text-slate-300 md:text-base md:leading-loose">
            {description}
          </p>
          <div className="flex justify-center gap-4 text-sm text-slate-400 md:justify-start">
            <div>
              <span className="font-semibold text-sky-400">
                {surroundingAvatars.length}+
              </span>{" "}
              Collaborators
            </div>
            <div>
              <span className="font-semibold text-purple-400">50+</span>{" "}
              Projects
            </div>
          </div>
        </div>

        {/* BACKGROUND ELEMENTS */}
        {!isMobile && (
          <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 before:absolute before:inset-0 before:rounded-3xl before:bg-[radial-gradient(350px_circle_at_var(--mouse-x)_var(--mouse-y),_rgba(56,189,248,0.25),_transparent_70%)]" />
        )}
        <div className="absolute -top-1/4 -left-1/4 z-0 h-1/2 w-1/2 rounded-full bg-sky-600/20 opacity-50 blur-3xl" />
        <div className="absolute -right-1/4 -bottom-1/4 z-0 h-1/2 w-1/2 rounded-full bg-purple-600/20 opacity-50 blur-3xl" />
      </motion.div>
    </LazyMotion>
  );
};
