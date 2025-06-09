import AnimatedSection from "@/components/animated-section";
import { BlogPostsSection } from "../components/blogPost/PostCard";
import ContactSection from "../components/contact/ContactSection";
import GithubSection from "../components/gitgraph/GithubSection";
import AboutPage from "../components/pages/AboutPage";
import BentoShowcase from "../components/pages/BentoPage";
import HeroPage from "../components/pages/HeroPage";
import { FeaturedProjectsSection } from "../components/project/ProjectCard";

export const metadata = {
  title: "Home",
  description: "Welcome to my personal website",
};
export default function Home() {
  return (
    <main className="relative flex flex-col items-center overflow-hidden bg-transparent text-white">
      <HeroPage />

      <AnimatedSection delay={100}>
        <AboutPage />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <BentoShowcase />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <GithubSection />
      </AnimatedSection>

      <AnimatedSection>
        <FeaturedProjectsSection />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <BlogPostsSection />
      </AnimatedSection>

      <AnimatedSection delay={100}>
        <ContactSection />
      </AnimatedSection>
    </main>
  );
}
