import { ArrowRight, Code, Server, ShieldCheck } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

export const AboutSection = () => {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-slate-900 to-black/90 backdrop-blur-sm">
      <div className="container px-4 md:px-6 py-20">
        <div className="flex flex-col items-center justify-center space-y-12 max-w-full mx-auto">
          {/* Header with subtle animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4"
          >
            <Badge
              variant="outline"
              className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
            >
              About Me
            </Badge>
            <h2 className="text-4xl font-bold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-300  leading-tight">
              Crafting Digital Excellence
            </h2>
            <p className="text-lg text-slate-300/80 max-w-2xl mx-auto">
              I specialize in building performant, accessible web applications
              with modern technologies. With 5+ years of experience, I bridge
              design and technology to create seamless user experiences.
            </p>
          </motion.div>

          {/* Skills cards with hover effects */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {[
              {
                icon: <Code className="h-6 w-6 text-blue-400" />,
                title: "Frontend Architecture",
                description:
                  "React, Next.js, TypeScript, and modern CSS frameworks",
              },
              {
                icon: <Server className="h-6 w-6 text-purple-400" />,
                title: "Backend Systems",
                description:
                  "Node.js, Express, PostgreSQL, and cloud infrastructure",
              },
              {
                icon: <ShieldCheck className="h-6 w-6 text-cyan-400" />,
                title: "Performance Optimization",
                description: "Speed, security, and scalable solutions",
              },
            ].map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-slate-900/50 border border-slate-800 hover:border-blue-500/30 transition-colors hover:bg-slate-900/70">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <div className="mb-4 rounded-full bg-blue-500/10 p-3 border border-blue-500/20">
                      {skill.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {skill.title}
                    </h3>
                    <p className="text-slate-300/80 text-sm">
                      {skill.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Subtle CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            viewport={{ once: true }}
            className="pt-8"
          >
            <Link
              href="/about"
              className="inline-flex items-center text-sm font-medium text-blue-400 hover:text-blue-300 group transition-colors"
            >
              Explore my full journey
              <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
