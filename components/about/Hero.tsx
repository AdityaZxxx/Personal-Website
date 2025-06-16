"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaXTwitter } from "react-icons/fa6";

const cards = [
  {
    id: 1,
    image: "/im-coding.webp",
    text: "I Code",
  },
  {
    id: 2,
    image: "/im-coding.webp",
    text: "I Learn",
  },
  {
    id: 3,
    image: "/im-coding.webp",
    text: "I Create",
  },
];

export default function AboutHero() {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % cards.length);
    }, 4000); // Cards rotate every 4 seconds
    return () => clearInterval(interval);
  }, []);

  // Calculate dynamic styles for each card based on its position relative to the 'current' card
  const getCardProps = useCallback(
    (index: number) => {
      // Calculate the offset from the current active card
      // Using modulo for looping through cards and ensuring a positive offset
      const offset = (index - currentCardIndex + cards.length) % cards.length;

      let zIndex = cards.length - offset; // Cards further back have lower z-index
      let scale = 1;
      let translateX = 0;
      let rotateZ = 0;
      let opacity = 1;

      if (offset === 0) {
        // Active card: full size, no translation
        scale = 1;
        translateX = 0;
        rotateZ = 0;
        opacity = 1;
      } else if (offset === 1) {
        // Card to the right of the active card
        scale = 0.95;
        translateX = 50; // Move slightly right
        rotateZ = 5; // Slight rotation
        opacity = 1;
      } else if (offset === 2) {
        // Card to the left of the active card (or further back)
        scale = 0.9;
        translateX = -50; // Move slightly left
        rotateZ = -5; // Slight rotation
        opacity = 1;
      } else {
        // Hidden cards, further back (e.g., offset 3 for 3 cards means back to original position)
        // These cards are briefly visible when transition from last to first
        scale = 0.85;
        translateX = 0; // Center them to appear from behind
        opacity = 0; // Hidden
        zIndex = 0; // Ensure they are behind others
      }

      return {
        zIndex,
        scale,
        x: translateX,
        rotateZ,
        opacity,
        transition: {
          type: "spring",
          stiffness: 250, // Slightly less stiff for a smoother feel
          damping: 30, // Good damping
          mass: 1, // Default mass
          delay: 0.1, // Small delay for sequential animation
        },
      };
    },
    [currentCardIndex]
  );

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center pt-10 pb-8 md:pt-24 md:pb-12 px-4 overflow-hidden">
      {/* Background Image and Gradient */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/horizon.avif" // Ensure this image path is correct
          alt="Modern digital landscape background with horizon"
          fill
          className="object-cover opacity-80 sm:opacity-50" // Adjust opacity based on screen size
          quality={90}
          priority
          sizes="(max-width: 768px) 100vw, 100vw"
        />
        {/* Stronger gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/80 to-black" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center py-8">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col gap-4 px-4 text-center md:text-left"
        >
          <h3 className="uppercase text-sm tracking-widest text-blue-500 font-semibold">
            More about me
          </h3>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white mb-4">
            Hi there! I'm{" "}
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent italic font-serif">
              Aditya
            </span>
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
            I'm Aditya Rahmad, a{" "}
            <strong className="font-semibold">Software Engineer</strong> driven
            by a passion for crafting dynamic web experiences. Self-taught
            through online resources and leveraging AI, I've built my skills
            from HTML and JavaScript to mastering the{" "}
            <strong className="font-semibold">React & Next.js ecosystem</strong>
            .
          </p>
          <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-6">
            Constantly experimenting with new projects and exploring the digital
            frontier, I believe continuous learning and curiosity are key. My
            approach integrates tools like Copilot and ChatGPT, enabling rapid
            skill development and efficient delivery. Every day, I'm eager to
            make a difference.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex justify-center md:justify-start space-x-6 text-3xl"
          >
            <a
              href="https://instagram.com/adxxya30"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="text-zinc-400 hover:text-pink-500 transition-colors duration-300"
            >
              <FaInstagram />
            </a>
            <a
              href="https://github.com/AdityaZxxx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="text-zinc-400 hover:text-purple-500 transition-colors duration-300"
            >
              <FaGithub />
            </a>
            <a
              href="https://twitter.com/adxxya30"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter Profile"
              className="text-zinc-400 hover:text-sky-400 transition-colors duration-300"
            >
              <FaXTwitter />
            </a>
          </motion.div>
        </motion.div>

        {/* Image Carousel */}
        <div className="relative w-full h-[400px] sm:h-[450px] md:h-[500px] lg:h-[550px] flex items-center justify-center">
          <AnimatePresence initial={false}>
            {cards.map((card, index) => {
              const { zIndex, scale, x, rotateZ, opacity, transition } =
                getCardProps(index);
              return (
                <motion.div
                  key={card.id} // Use unique ID as key for AnimatePresence
                  className="absolute w-[260px] h-[360px] sm:w-[280px] sm:h-[380px] md:w-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-zinc-700/50 flex flex-col items-center justify-end"
                  style={{
                    zIndex: zIndex,
                    // Use a subtle background color that blends with the dark theme
                    backgroundColor: "#1a1a1a",
                  }}
                  initial={{ opacity: 0, x: 0, scale: 0.8, rotateZ: 0 }} // Start point for new cards entering
                  animate={{
                    opacity: opacity,
                    x: x,
                    scale: scale,
                    rotateZ: rotateZ,
                  }}
                  exit={{
                    opacity: 0,
                    x: x > 0 ? 100 : -100,
                    scale: 0.8,
                    transition: { duration: 0.3 },
                  }} // Exit animation
                  transition={transition}
                >
                  <Image
                    src={card.image}
                    alt={card.text} // Use text for alt for better accessibility
                    fill // Use fill for better responsive images
                    className="object-cover absolute inset-0 w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optimize image loading
                    priority={index === 0} // Prioritize loading for the first card
                  />
                  <div className="relative z-10 w-full p-4 text-center text-xl font-semibold bg-gradient-to-t from-black/80 to-transparent pt-12">
                    {card.text}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
