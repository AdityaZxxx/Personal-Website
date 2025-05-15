"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

type Card = {
  id: number;
  name: string;
  designation: string;
  content: React.ReactNode;
  image: string;
  text: string;
};

export const EnhancedCardStack = ({ cards }: { cards: Card[] }) => {
  const CARD_OFFSET = 15;
  const SCALE_FACTOR = 0.06;
  const [activeCards, setActiveCards] = useState<Card[]>(cards);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCards((prevCards) => {
        const newArray = [...prevCards];
        newArray.unshift(newArray.pop()!);
        return newArray;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[400px] w-full flex items-center justify-center">
      {activeCards.map((card, index) => (
        <motion.div
          key={card.id}
          className="absolute w-[240px] h-[320px] rounded-2xl overflow-hidden shadow-2xl bg-black text-white flex flex-col items-center justify-end"
          style={{
            transformOrigin: "top center",
            zIndex: activeCards.length - index,
          }}
          animate={{
            top: index * -CARD_OFFSET,
            scale: 1 - index * SCALE_FACTOR,
            opacity: index < 3 ? 1 : 0,
            x: 0,
          }}
          initial={{ opacity: 0, x: 100 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          whileHover={{
            scale: index === 0 ? 1.05 : 1 - index * SCALE_FACTOR + 0.05,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          }}
        >
          <Image
            src={card.image}
            alt={card.text}
            width={240}
            height={320}
            className="object-cover absolute inset-0 w-full h-full"
            priority={index === 0}
          />
          <div className="relative z-10 w-full p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
            <div className="text-white text-lg font-semibold">{card.text}</div>
            <div className="text-neutral-300 text-sm mt-1">{card.name}</div>
            <div className="text-neutral-400 text-xs">{card.designation}</div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
