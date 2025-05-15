import {
  Brain,
  Clock,
  Lightbulb,
  MessagesSquare,
  Paintbrush,
  RefreshCw,
  Trophy,
  Users,
  ZoomIn,
} from "lucide-react";
import * as motion from "motion/react-client";

// Soft skills data with icons
const softSkills = [
  { name: "Problem Solving", icon: <Lightbulb className="w-5 h-5" /> },
  { name: "Communication", icon: <MessagesSquare className="w-5 h-5" /> },
  { name: "Teamwork", icon: <Users className="w-5 h-5" /> },
  { name: "Time Management", icon: <Clock className="w-5 h-5" /> },
  { name: "Adaptability", icon: <RefreshCw className="w-5 h-5" /> },
  { name: "Critical Thinking", icon: <Brain className="w-5 h-5" /> },
  { name: "Creativity", icon: <Paintbrush className="w-5 h-5" /> },
  { name: "Leadership", icon: <Trophy className="w-5 h-5" /> },
  { name: "Attention to Detail", icon: <ZoomIn className="w-5 h-5" /> },
];

const AboutSkills = () => {
  return (
    <section className="w-full py-16 md:py-24">
      <div className="container px-4 sm:px-6">
        <h2 className="text-3xl font-bold tracking-tighter mb-12 text-center bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Soft Skills
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {softSkills.map((skill, index) => {
            const colors = [
              "bg-blue-500/10 text-blue-400 border-blue-500/20",
              "bg-purple-500/10 text-purple-400 border-purple-500/20",
              "bg-green-500/10 text-green-400 border-green-500/20",
              "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
              "bg-pink-500/10 text-pink-400 border-pink-500/20",
              "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
              "bg-green-500/10 text-green-400 border-green-500/20",
              "bg-orange-500/10 text-orange-400 border-orange-500/20",
              "bg-purple-500/10 text-purple-400 border-purple-500/20",
            ];
            const hoverColors = [
              "hover:bg-blue-500/20 hover:text-blue-300",
              "hover:bg-purple-500/20 hover:text-purple-300",
              "hover:bg-green-500/20 hover:text-green-300",
              "hover:bg-yellow-500/20 hover:text-yellow-300",
              "hover:bg-pink-500/20 hover:text-pink-300",
              "hover:bg-cyan-500/20 hover:text-cyan-300",
              "hover:bg-green-500/20 hover:text-green-300",
              "hover:bg-orange-500/20 hover:text-orange-300",
              "hover:bg-purple-500/20 hover:text-purple-300",
            ];

            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div
                  className={`flex items-center p-4 rounded-xl transition-all duration-300 group border ${colors[index]} ${hoverColors[index]}`}
                >
                  <div
                    className={`mr-4 rounded-full ${colors[index]} p-2 transition-all duration-300`}
                  >
                    {skill.icon}
                  </div>
                  <span className="font-medium text-lg">{skill.name}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSkills;
