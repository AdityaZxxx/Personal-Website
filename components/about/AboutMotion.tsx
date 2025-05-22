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
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    viewport={{ once: true }}
    whileHover={{ y: -5 }}
    className="h-full"
  >
    <Card
      className={cn(
        "h-full bg-gradient-to-br from-slate-900/90 to-black/90",
        "border border-slate-800 hover:border-blue-500/40",
        "transition-all duration-300 ease-in-out",
        "shadow-lg hover:shadow-xl hover:shadow-blue-500/10"
      )}
    >
      <CardContent className="p-6 flex flex-col items-center text-center">
        <motion.div
          className="mb-4 rounded-full bg-blue-500/10 p-3 border border-blue-500/20 shadow-md"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          {icon}
        </motion.div>
        <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-slate-300/80 text-sm">{description}</p>
      </CardContent>
    </Card>
  </motion.div>
);

export const AboutSection = () => {
  return (
    <motion.div
      id="about"
      className={cn(
        "w-full min-h-screen flex items-center justify-center",
        "bg-gradient-to-br from-black via-slate-900 to-black/90",
        "py-20 px-4 sm:px-6",
        "scroll-mt-20"
      )}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      aria-labelledby="about-heading"
    >
      <div className="container max-w-7xl mx-auto">
        <div className="flex flex-col items-center justify-center space-y-12">
          {/* Header section */}
          <motion.header
            className="text-center space-y-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Badge
              variant="outline"
              className={cn(
                "border-amber-500/40 text-amber-600",
                "hover:bg-amber-500/10 transition-colors duration-300",
                "shadow-md px-4 py-1"
              )}
              aria-label="About section"
            >
              About Me
            </Badge>
            <h2
              id="about-heading"
              className={cn(
                "text-3xl md:text-4xl lg:text-5xl font-bold",
                "bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-orange-300",
                "leading-tight md:leading-tighter"
              )}
            >
              Crafting Digital Excellence
            </h2>
            <p className="text-lg sm:text-xl text-slate-300/80 leading-relaxed">
              I specialize in building performant, accessible web applications
              with modern technologies. With 5+ years of experience, I bridge
              design and technology to create seamless user experiences.
            </p>
          </motion.header>

          {/* Skills grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
            {[
              {
                icon: (
                  <Code className="h-6 w-6 text-blue-400" aria-hidden="true" />
                ),
                title: "Frontend Architecture",
                description:
                  "React, Next.js, TypeScript, and modern CSS frameworks.",
              },
              {
                icon: (
                  <Server
                    className="h-6 w-6 text-purple-400"
                    aria-hidden="true"
                  />
                ),
                title: "Backend Systems",
                description:
                  "Node.js, Express, PostgreSQL, and cloud infrastructure.",
              },
              {
                icon: (
                  <ShieldCheck
                    className="h-6 w-6 text-cyan-400"
                    aria-hidden="true"
                  />
                ),
                title: "Performance Optimization",
                description: "Speed, security, and scalable solutions.",
              },
            ].map((skill, index) => (
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
            className="pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="/about"
              className={cn(
                "inline-flex items-center text-sm font-medium",
                "text-blue-300 hover:text-blue-200",
                "group transition-colors duration-300",
                "bg-blue-500/10 hover:bg-blue-500/20",
                "px-6 py-3 rounded-full",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900"
              )}
              aria-label="Learn more about my journey"
            >
              Explore my full journey
              <motion.div
                className="ml-2"
                whileHover={{ x: 3 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
