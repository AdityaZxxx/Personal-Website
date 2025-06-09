"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "../../lib/utils";

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

export const CollaborationCard: React.FC<CollaborationCardProps> = ({
  mainProfile,
  surroundingAvatars,
  title = "Our Collaboration",
  description = "We thrive on client collaboration, fostering open communication and agile feedback to bring visions to life, together.",
  className,
}) => {
  const [isCardActive, setIsCardActive] = useState(false);
  const [hoveredAvatar, setHoveredAvatar] = useState<AvatarInfo | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const isMobile =
    typeof window !== "undefined" ? window.innerWidth <= 768 : false;

  useEffect(() => {
    if (isMobile) {
      setIsCardActive(true);
    }
  }, [isMobile]);

  const numSurroundingAvatars = surroundingAvatars.length;
  const radius = isMobile ? 60 : 80; // Slightly smaller radius for side layout
  const startAngle = isMobile ? 15 : -90; // Adjusted angles for side layout
  const endAngle = isMobile ? 165 : 90;
  const angleStep =
    numSurroundingAvatars > 1
      ? (endAngle - startAngle) / (numSurroundingAvatars - 1)
      : 0;

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

  const cardVariants: Variants = {
    initial: { scale: 1, y: 0 },
    hover: { scale: 1.02, y: -4 },
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileHover={!isMobile ? "hover" : "initial"}
      variants={cardVariants}
      transition={{ duration: 0.5, delay: 0.5 }}
      animate={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseEnter={() => !isMobile && setIsCardActive(true)}
      onMouseLeave={() => !isMobile && setIsCardActive(false)}
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-3xl md:flex-row",
        "border border-slate-700/70 bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80 backdrop-blur-md",
        "shadow-xl transition-all duration-300 hover:border-sky-500/60 hover:shadow-2xl hover:shadow-sky-500/25",
        className,
      )}
    >
      {/* Left Side - Avatar Section (Desktop) */}
      <div
        className={cn(
          "relative z-10 flex h-48 w-full items-center justify-center",
          "md:h-full md:w-1/2 md:min-w-[300px] md:items-center md:justify-center",
        )}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
          className="z-10 cursor-pointer"
        >
          <Image
            src={mainProfile.src || placeholderAvatar}
            alt={mainProfile.alt}
            width={isMobile ? 88 : 96}
            height={isMobile ? 88 : 96}
            className={cn(
              "rounded-full border-[4px] border-sky-400/80 object-cover shadow-xl shadow-sky-500/30",
              "transition-all duration-300 hover:border-sky-300/90 hover:shadow-sky-400/40",
            )}
            priority
          />
        </motion.div>

        {surroundingAvatars.map((avatar, index) => {
          const angle =
            startAngle + (numSurroundingAvatars > 1 ? index * angleStep : 0);
          const angleRad = (angle * Math.PI) / 180;
          const xPos = radius * Math.cos(angleRad);
          const yPos = -radius * Math.sin(angleRad);
          const borderColor = avatarBorders[index % avatarBorders.length];

          return (
            <motion.div
              key={avatar.id}
              className="absolute rounded-full"
              style={{ left: "50%", top: "50%" }}
              initial={{
                opacity: 0,
                scale: 0.2,
                x: "-50%",
                y: "-50%",
                rotate: -45,
              }}
              animate={
                isCardActive
                  ? {
                      opacity: 1,
                      scale: 1,
                      x: `calc(-50% + ${xPos}px)`,
                      y: `calc(-50% + ${yPos}px)`,
                      rotate: Math.random() * 20 - 10,
                    }
                  : {
                      opacity: 0,
                      scale: 0.2,
                      x: "-50%",
                      y: "-50%",
                      rotate: -45,
                    }
              }
              transition={{
                type: "spring",
                stiffness: 180,
                damping: 15,
                delay: isCardActive ? index * 0.08 + (isMobile ? 0.2 : 0) : 0,
              }}
              onMouseEnter={() => setHoveredAvatar(avatar)}
              onMouseLeave={() => setHoveredAvatar(null)}
            >
              <Image
                src={avatar.src || placeholderAvatar}
                alt={avatar.alt}
                width={isMobile ? 40 : 44}
                height={isMobile ? 40 : 44}
                className={cn(
                  "rounded-full border-2 object-cover shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl",
                  borderColor,
                )}
              />

              {hoveredAvatar?.id === avatar.id && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-12 left-1/2 z-20 -translate-x-1/2 rounded-md bg-slate-800/90 px-3 py-1.5 text-xs font-medium whitespace-nowrap text-white shadow-lg backdrop-blur-sm"
                >
                  <div className="z-50 font-semibold text-sky-300">
                    {avatar.name ?? "Collaborator"}
                  </div>
                  {avatar.role && (
                    <div className="text-xs text-slate-400">{avatar.role}</div>
                  )}
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Right Side - Text Content (Desktop) */}
      <div
        className={cn(
          "relative z-10 flex flex-grow flex-col p-6 text-center",
          "md:h-full md:w-1/2 md:justify-center md:p-8 md:text-left",
        )}
      >
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
            <span className="font-semibold text-purple-400">50+</span> Projects
          </div>
        </div>
      </div>

      {/* Background elements */}
      {!isMobile && (
        <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 before:absolute before:inset-0 before:rounded-3xl before:bg-[radial-gradient(350px_circle_at_var(--mouse-x)_var(--mouse-y),_rgba(56,189,248,0.25),_transparent_70%)]" />
      )}
      <div className="absolute -top-1/4 -left-1/4 z-0 h-1/2 w-1/2 rounded-full bg-sky-600/20 opacity-50 blur-3xl" />
      <div className="absolute -right-1/4 -bottom-1/4 z-0 h-1/2 w-1/2 rounded-full bg-purple-600/20 opacity-50 blur-3xl" />
    </motion.div>
  );
};
