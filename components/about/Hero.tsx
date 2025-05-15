"use client";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const cards = [
  {
    image: "/im-coding.webp",
    text: "I Code",
  },
  {
    image: "/im-coding.webp",
    text: "I Learn",
  },
];

export default function AboutHero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % cards.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getCardStyle = (index: number) => {
    const offset = (index - current + cards.length) % cards.length;
    const baseZ = cards.length - offset;
    const scale = 1 - offset * 0.05;
    const translateX = offset === 0 ? 0 : offset === 1 ? 60 : -60;

    return {
      zIndex: baseZ,
      scale,
      x: offset === 0 ? 0 : offset === 1 ? translateX : -translateX,
      opacity: offset > 2 ? 0 : 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    };
  };

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-start pt-20 md:pt-24 px-4">
      {/* Background Image and Gradient */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/horizon.jpg" // Replace with your actual image path
          alt="Modern digital landscape background"
          fill
          className="object-cover opacity-50"
          quality={90}
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 px-auto w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Content */}
        <div className="flex flex-col gap-4 lg:px-20 md:px-10 sm:px-4">
          <h3 className="uppercase text-sm tracking-widest text-gray-400 ">
            More about me
          </h3>
          <h1 className="text-5xl font-bold mb-4">
            Hi there! I'm{" "}
            <span className="italic font-serif bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Aditya
            </span>
          </h1>
          <p className="text-gray-300 mb-6 font-light">
            I'm Aditya Rahmad, a proactive full-stack developer passionate about
            creating dynamic web experiences. Having no formal IT background, I
            learned to code from the internet and the help of AI. Starting from
            HTML, JavaScript, until finally falling in love with the React &
            Next.js ecosystem.
          </p>
          <p className="text-gray-300 mb-6">
            Now I am actively creating small projects, experimenting with AI,
            and exploring the digital world. I believe that learning doesn't
            have to be linear — as long as you are consistent and curious, you
            can do it. Most of the time, I write code with Copilot or ChatGPT.
            But that's not a weakness — it's how I develop my skills and deliver
            things quickly.
          </p>
          <p className="text-gray-300 mb-6">
            I believe in waking up each day eager to make a difference!
          </p>
          <div className="flex space-x-4 text-xl">
            <i className="ri-linkedin-box-fill" />
            <i className="ri-github-fill" />
            <i className="ri-twitter-x-fill" />
          </div>
        </div>

        {/* Image Carousel */}
        <div className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
          <AnimatePresence>
            {cards.map((card, index) => {
              const cardStyle = getCardStyle(index);
              return (
                <motion.div
                  key={index}
                  className="absolute w-[240px] h-[320px] rounded-2xl overflow-hidden shadow-2xl bg-black text-white flex flex-col items-center justify-end p-4"
                  style={{ zIndex: cardStyle.zIndex }}
                  animate={cardStyle}
                  initial={{ opacity: 0, x: 100 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <Image
                    src={card.image}
                    alt={card.text}
                    width={240}
                    height={320}
                    className="object-cover absolute inset-0 w-full h-full"
                  />
                  <div className="relative z-10 bg-black bg-opacity-50 w-full text-center text-lg font-semibold pt-2">
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
