"use client";

import { ArrowRight, Code, Server, ShieldCheck } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

const SkillCard = ({
  icon,
  title,
  description,
  index,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.12 }}
    viewport={{ once: true }}
    whileHover={{ y: -8 }}
    className="h-full"
  >
    <Card
      className={cn(
        "h-full overflow-hidden", // Mencegah konten keluar jika ada scaling aneh
        "bg-slate-800/60 backdrop-blur-md", // Efek "frosted glass" atau semi-transparan
        "border border-slate-700/80", // Border yang lebih menyatu dengan background
        "hover:border-sky-500/70", // Aksen border saat hover
        "transition-all duration-300 ease-in-out", // Transisi halus untuk semua properti
        "shadow-lg hover:shadow-2xl hover:shadow-sky-600/20", // Bayangan yang lebih lembut dan aksen hover
      )}
    >
      <CardContent className="flex flex-col items-center p-6 text-center">
        <motion.div
          className="mb-5 rounded-full border border-sky-500/40 bg-sky-500/20 p-3.5 shadow-lg shadow-sky-500/10" // Padding dan shadow ikon disesuaikan
          whileHover={{ scale: 1.12, rotate: 5 }} // Efek hover pada ikon
          transition={{ type: "spring", stiffness: 300, damping: 10 }}
        >
          {icon}
        </motion.div>
        <h3 className="mb-2.5 text-xl font-semibold text-slate-100">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-300/90">
          {description}
        </p>
      </CardContent>
    </Card>
  </motion.div>
);

function AboutPage() {
  const skills = [
    {
      icon: (
        <Code
          className="h-6 w-6 text-sky-400" // Warna ikon disesuaikan
          aria-hidden="true"
        />
      ),
      title: "Frontend Architecture",
      description:
        "Building intuitive and performant UIs with React, Next.js, TypeScript, and modern CSS.",
    },
    {
      icon: (
        <Server
          className="h-6 w-6 text-teal-400" // Warna ikon disesuaikan
          aria-hidden="true"
        />
      ),
      title: "Backend Systems",
      description:
        "Developing robust APIs and services using Node.js, Drizzle ORM, PostgreSQL, and cloud platforms.",
    },
    {
      icon: (
        <ShieldCheck
          className="h-6 w-6 text-cyan-400" // Warna ikon disesuaikan
          aria-hidden="true"
        />
      ),
      title: "Web Excellence",
      description:
        "Focusing on web performance, security best practices, and creating scalable solutions.",
    },
  ];

  return (
    <motion.section
      id="about"
      className={cn(
        "flex min-h-screen w-full items-center justify-center",
        "bg-gradient-to-br from-slate-950 via-slate-900 to-black", // Latar belakang lebih dalam
        "px-4 py-24 sm:px-6 lg:py-32", // Penyesuaian padding vertikal
        "scroll-mt-20", // Untuk offset anchor link jika ada fixed header
      )}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }} // Transisi masuk halaman lebih lama sedikit
      viewport={{ once: true }}
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center space-y-16 md:space-y-20">
          {" "}
          {/* Spasi antar section ditambah */}
          {/* Header section */}
          <motion.header
            className="mx-auto max-w-4xl space-y-6 text-center"
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className={cn(
                "border-sky-600/50 bg-sky-500/10 text-sky-400", // Warna badge disesuaikan
                "transition-all duration-300 hover:border-sky-600/70 hover:bg-sky-500/20",
                "px-4 py-1.5 text-sm shadow-md shadow-sky-500/10", // Ukuran dan shadow badge
              )}
              aria-label="About section"
            >
              About Me
            </Badge>
            <h2
              id="about-heading"
              className={cn(
                "text-4xl font-bold md:text-5xl lg:text-6xl", // Ukuran font heading sedikit lebih besar
                "bg-gradient-to-r from-sky-400 via-cyan-400 to-sky-500 bg-clip-text text-transparent", // Gradient heading disesuaikan
                "leading-tight md:leading-tight", // Line height disesuaikan
              )}
            >
              Crafting Digital Excellence
            </h2>
            <p className="text-lg leading-relaxed text-slate-300 sm:text-xl">
              I specialize in building performant, accessible web applications
              with modern technologies. With 5+ years of experience, I bridge
              design and technology to create seamless user experiences.
            </p>
          </motion.header>
          {/* Skills grid */}
          <div className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {" "}
            {/* Gap antar kartu ditambah */}
            {skills.map((skill, index) => (
              <SkillCard
                key={`skill-${index}`}
                icon={skill.icon}
                title={skill.title}
                description={skill.description}
                index={index}
              />
            ))}
          </div>
          {/* CTA */}
          <motion.div
            className="pt-8 text-center" // Text align center untuk tombol
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 + skills.length * 0.1 }} // Delay CTA setelah semua kartu muncul
            viewport={{ once: true }}
          >
            <Link
              href="/about" // Pastikan path ini sesuai
              className={cn(
                "inline-flex items-center text-base font-medium", // Ukuran font tombol
                "text-sky-300 hover:text-sky-100",
                "group transition-all duration-300 ease-in-out",
                "bg-sky-600/20 hover:bg-sky-600/30", // Background tombol lebih jelas
                "rounded-lg px-8 py-3.5", // Padding dan border radius tombol
                "shadow-lg hover:shadow-xl hover:shadow-sky-500/20", // Shadow tombol
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
              )}
              aria-label="Learn more about my journey"
            >
              Explore My Full Journey
              <motion.div
                className="ml-2.5 transition-transform duration-300 group-hover:translate-x-1" // Efek hover pada arrow lebih smooth
              >
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default AboutPage;
