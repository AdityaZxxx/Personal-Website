import { ArrowRight, Code, Server, ShieldCheck } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { cn } from "../../lib/utils";
import { Badge } from "../ui/badge";
import { Card, CardContent } from "../ui/card";

// Reusable component for skill cards with enhanced effects
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
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.2 }} // Staggered delay
    viewport={{ once: true }}
    whileHover={{ scale: 1.03, boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)" }} // Subtle scale and shadow
  >
    <Card
      className={cn(
        "h-full bg-gradient-to-br from-slate-900/90 to-black/90", // Gradient background
        "border border-slate-800",
        "hover:border-blue-500/40", // Interactive border
        "transition-all duration-300",
        "shadow-lg" // Add a subtle shadow
      )}
    >
      <CardContent className="p-6 flex flex-col items-center text-center">
        <motion.div
          className="mb-4 rounded-full bg-blue-500/10 p-3 border border-blue-500/20 shadow-md"
          // Add a pulse effect to the icon
          animate={{ scale: [1, 1.08, 1] }}
          transition={{
            loop: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
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
    <section
      className={cn(
        "w-full min-h-screen flex items-center justify-center",
        "bg-gradient-to-br from-black via-slate-900 to-black/90",
        "backdrop-blur-sm",
        "py-20" // Consistent vertical padding
      )}
    >
      <div className="container px-4 md:px-6">
        <div
          className={cn(
            "flex flex-col items-center justify-center space-y-12",
            "max-w-7xl mx-auto" // Increased max-width for larger screens
          )}
        >
          {/* Header with enhanced animation */}
          <motion.div
            initial={{ opacity: 0, y: 40 }} // Start further down
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }} // Smoother ease-out
            viewport={{ once: true }}
            className="text-center space-y-6" // Increased spacing
          >
            <Badge
              variant="outline"
              className={cn(
                "border-blue-500/40 text-blue-300", // Softer colors
                "hover:bg-blue-500/10",
                "transition-colors duration-300", // Add transition
                "shadow-md" // Add shadow
              )}
            >
              About Me
            </Badge>
            <h2
              className={cn(
                "text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight", // Larger text on bigger screens
                "bg-clip-text text-transparent",
                "bg-gradient-to-r from-white to-slate-200", // More subtle gradient
                "leading-tight",
                "drop-shadow-lg" // Add drop shadow
              )}
            >
              Crafting Digital Excellence
            </h2>
            <p
              className={cn(
                "text-lg sm:text-xl text-slate-300/80", // Larger text on sm+
                "max-w-3xl mx-auto", // Wider text area
                "leading-relaxed" // Improved readability
              )}
            >
              I specialize in building performant, accessible web applications
              with modern technologies. With 5+ years of experience, I bridge
              design and technology to create seamless user experiences. I'm
              passionate about creating solutions that are not only functional
              but also beautiful and engaging.
            </p>
          </motion.div>

          {/* Skills cards with enhanced effects */}
          <div
            className={cn(
              "grid grid-cols-1 md:grid-cols-3 gap-8", // Increased gap
              "w-full max-w-6xl" // Limit width of cards
            )}
          >
            {[
              {
                icon: <Code className="h-8 w-8 text-blue-400" />, // Larger icons
                title: "Frontend Architecture",
                description:
                  "React, Next.js, TypeScript, and modern CSS frameworks. Building scalable and maintainable frontends.",
              },
              {
                icon: <Server className="h-8 w-8 text-purple-400" />,
                title: "Backend Systems",
                description:
                  "Node.js, Express, PostgreSQL, and cloud infrastructure. Designing robust and efficient APIs.",
              },
              {
                icon: <ShieldCheck className="h-8 w-8 text-cyan-400" />,
                title: "Performance Optimization",
                description:
                  "Speed, security, and scalable solutions. Delivering optimal user experiences.",
              },
            ].map((skill, index) => (
              <SkillCard
                key={index}
                icon={skill.icon}
                title={skill.title}
                description={skill.description}
                index={index}
              />
            ))}
          </div>

          {/* Refined CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }} // Delayed appearance
            viewport={{ once: true }}
            className="pt-10" // Increased padding
          >
            <Link
              href="/about"
              className={cn(
                "inline-flex items-center text-sm font-medium",
                "text-blue-300 hover:text-blue-200", // Lighter hover color
                "group transition-colors",
                "bg-gradient-to-r from-blue-500/10 to-blue-500/10", // Subtle background
                "px-6 py-3 rounded-full", // More padding, rounded edges
                "shadow-lg hover:shadow-blue-500/20", // Add shadow on hover
                "transition-all duration-300" // Add smooth transition
              )}
            >
              Explore my full journey
              <ArrowRight
                className={cn(
                  "ml-2 h-5 w-5", // Larger arrow
                  "group-hover:translate-x-1",
                  "transition-transform" // Smooth transition
                )}
              />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
