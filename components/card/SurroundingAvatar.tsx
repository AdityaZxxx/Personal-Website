// SurroundingAvatar.tsx (komponen baru)
import { motion } from "framer-motion";
import Image from "next/image";
import React, { useState } from "react";
import { cn } from "../../lib/utils";

interface AvatarInfo {
  id: string;
  src: string;
  alt: string;
  name?: string;
  role?: string;
}

// PERUBAHAN: Props disederhanakan untuk menghindari tipe yang kompleks
interface SurroundingAvatarProps {
  avatar: AvatarInfo;
  isActive: boolean; // Langsung terima status aktif
  position: { x: number; y: number }; // Terima posisi final
  transitionConfig: object;
  borderColor: string;
  size: number;
}

const placeholderAvatar =
  "https://via.placeholder.com/150/1e293b/ffffff?text=Avatar";

// PERUBAHAN: React.memo untuk optimasi re-render tambahan
export const SurroundingAvatar: React.FC<SurroundingAvatarProps> = React.memo(
  ({ avatar, isActive, position, transitionConfig, borderColor, size }) => {
    const [isHovered, setIsHovered] = useState(false);

    // PERUBAHAN: Gunakan prop 'initial' dan 'animate' secara langsung
    const variants = {
      hidden: {
        opacity: 0,
        scale: 0.2,
        x: "-50%",
        y: "-50%",
        rotate: -45,
        left: "50%",
        top: "50%",
      },
      visible: {
        opacity: 1,
        scale: 1,
        x: `calc(-50% + ${position.x}px)`,
        y: `calc(-50% + ${position.y}px)`,
        rotate: Math.random() * 20 - 10,
        left: "50%",
        top: "50%",
      },
    };

    return (
      <motion.div
        key={avatar.id}
        className="absolute rounded-full will-change-transform"
        variants={variants}
        initial="hidden"
        animate={isActive ? "visible" : "hidden"} // Kontrol animasi dengan status 'isActive'
        transition={transitionConfig}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Image
          src={avatar.src || placeholderAvatar}
          alt={avatar.alt}
          width={size}
          height={size}
          className={cn(
            "rounded-full border-2 object-cover shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl",
            borderColor
          )}
        />
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute -top-12 left-1/2 z-20 w-max -translate-x-1/2 rounded-md bg-slate-800/90 px-3 py-1.5 text-xs font-medium text-white shadow-lg backdrop-blur-sm"
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
  }
);

// Tambahkan display name untuk debugging React DevTools
SurroundingAvatar.displayName = "SurroundingAvatar";
