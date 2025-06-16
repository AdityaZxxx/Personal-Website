import { Mail } from "lucide-react";
import * as motion from "motion/react-client";
import Image from "next/image";
import Link from "next/link";
import { EmailCopyBox } from "../email-copy";
import { SparklesCore } from "../sparkles";
import { Badge } from "../ui/badge";

function HeroPage() {
  return (
    <motion.section
      className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-20 md:py-24"
      aria-labelledby="hero-heading"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="absolute inset-0 -z-20 overflow-hidden">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={2.0}
          speed={0.8}
          particleDensity={30}
          className="h-full w-full"
          particleColor="#3b82f6"
          aria-hidden="true"
        />
      </div>

      <div className="absolute inset-0 -z-10">
        <Image
          src="/horizon.avif"
          alt="Background Image"
          fill
          className="object-cover opacity-50"
          quality={90}
          priority
          sizes="100vw"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-transparent"
          aria-hidden="true"
        />
      </div>

      <div className="z-10 mx-auto flex w-full max-w-4xl flex-col items-center justify-center text-center">
        <h1 id="hero-heading" className="sr-only">
          Aditya Rahmad - Software Engineer
        </h1>

        <div className="mb-6 md:mb-8">
          <Badge
            variant="outline"
            className="group relative inline-flex h-8 overflow-hidden rounded-full border-transparent p-[2px] text-slate-100 backdrop-blur-sm transition-all duration-500 focus:ring-2 focus:ring-sky-500 focus:outline-none"
            aria-label="Call to action"
          >
            <span
              className="absolute inset-0 rounded-full bg-[conic-gradient(from_var(--angle),#60a5fa_0%,#7c3aed_50%,#60a5fa_100%)] opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              style={
                {
                  "--angle": "0deg",
                  animation: "spin 3s linear infinite",
                } as React.CSSProperties & Record<string, string>
              }
              aria-hidden="true"
            />
            <span
              className="absolute inset-0 rounded-full bg-[conic-gradient(from_var(--angle),#60a5fa_0%,#7c3aed_50%,#60a5fa_100%)] opacity-90 transition-opacity duration-500 group-hover:opacity-100"
              style={
                {
                  "--angle": "120deg",
                  animation: "spin 3s linear infinite",
                } as React.CSSProperties & Record<string, string>
              }
              aria-hidden="true"
            />

            <span className="relative z-10 flex h-full w-full items-center justify-center rounded-full bg-slate-800/90 px-6 py-[6px] text-sm font-medium text-slate-100 backdrop-blur-md transition-colors duration-300 group-hover:bg-slate-800/80">
              🚀 {""}Let&apos;s grow together
            </span>
          </Badge>
        </div>

        <div className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="md:leading-tighter text-4xl leading-tight font-bold sm:text-5xl md:text-6xl"
          >
            <span className="sr-only">
              I help founders turn ideas into seamless digital experiences
            </span>

            <span className="hidden md:block">
              <span className="text-gradient bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-400 bg-clip-text text-transparent">
                I help founders turn ideas
              </span>
              <br />
              <span className="group relative mt-2">
                <span className="relative z-10 text-slate-100">
                  into seamless{" "}
                </span>
                <span className="text-gradient bg-gradient-to-b from-slate-300 to-white bg-clip-text font-serif text-transparent italic">
                  digital experiences
                </span>
              </span>
            </span>

            <span className="flex flex-col md:hidden">
              <span className="text-gradient bg-gradient-to-r from-sky-400 to-indigo-500 bg-clip-text text-transparent">
                I help founders turn
              </span>
              <span className="text-slate-100">ideas into seamless</span>
              <span className="text-gradient mt-1 bg-gradient-to-b from-slate-300 via-white to-indigo-400 bg-clip-text font-serif text-transparent italic">
                digital experiences
              </span>
            </span>
          </motion.p>
        </div>

        <div
          className="group mt-8 flex flex-col items-center gap-4 sm:flex-row md:mt-10"
          role="region"
          aria-label="About me"
        >
          <figure className="relative">
            <Image
              height={72}
              width={72}
              src="/profile.webp"
              alt="Aditya Rahmad - Professional Software Engineer"
              className="rounded-full border-2 border-slate-100/80 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:rotate-3 hover:shadow-xl"
              priority
              sizes="(max-width: 768px) 72px, 80px"
            />
            <div
              className="group-hover:animate-ping-slow pointer-events-none absolute inset-0 rounded-full border-2 border-transparent transition-all duration-700 group-hover:border-sky-400/50"
              aria-hidden="true"
            />
          </figure>
          <p className="text-lg text-balance sm:text-xl">
            Hello, I&apos;m{" "}
            <strong className="font-semibold text-white">Aditya Rahmad</strong>,
            a{" "}
            <span className="relative inline-block">
              <span className="relative z-10 bg-gradient-to-r from-sky-500 to-indigo-500 bg-clip-text text-transparent ">
                Software Engineer
              </span>
              <span
                className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 rounded-full bg-gradient-to-r from-sky-500 to-indigo-500 transition-transform duration-500 ease-out group-hover:scale-x-100"
                aria-hidden="true"
              />
            </span>
          </p>
        </div>

        <div
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row md:mt-12"
          role="group"
          aria-label="Call to action buttons"
        >
          <Link
            href="mailto:hello@adityarahmad.com"
            className="group relative inline-flex min-w-[180px] items-center justify-center gap-2 overflow-hidden rounded-full border-2 border-slate-100/20 bg-gradient-to-r from-sky-600 to-indigo-600 px-6 py-2 text-white shadow-lg transition-all duration-300 hover:from-sky-500 hover:to-indigo-500 hover:shadow-xl hover:shadow-sky-500/30 focus:ring-2 focus:ring-sky-500 focus:outline-none"
          >
            <span className="bg-gradient-to-r from-white to-white/90 bg-clip-text font-medium text-transparent">
              Let&apos;s Connect
            </span>
            <Mail
              className="h-5 w-5 transition-transform duration-300 group-hover:scale-110"
              aria-hidden="true"
            />
          </Link>

          <EmailCopyBox />
        </div>
      </div>
    </motion.section>
  );
}

export default HeroPage;
