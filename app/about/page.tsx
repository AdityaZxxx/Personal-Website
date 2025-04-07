import AnimatedSection from "@/components/animated-section";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Me | Aditya",
  description: "Learn more about my background, skills, and experience.",
};

export default function AboutPage() {
  // Tech stack data
  const techStack = {
    frontend: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Tailwind CSS",
      "CSS/SCSS",
      "HTML5",
    ],
    backend: ["Node.js", "Express", "Python", "Django", "GraphQL", "REST API"],
    database: ["MongoDB", "PostgreSQL", "MySQL", "Firebase"],
    tools: ["Git", "GitHub", "VS Code", "Docker", "Figma", "Vercel", "AWS"],
  };

  // Soft skills data
  const softSkills = [
    "Problem Solving",
    "Communication",
    "Teamwork",
    "Time Management",
    "Adaptability",
    "Critical Thinking",
    "Creativity",
    "Leadership",
    "Attention to Detail",
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Jane Smith",
      role: "Senior Developer at TechCorp",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "Working with this developer was a fantastic experience. Their attention to detail and problem-solving skills are exceptional.",
    },
    {
      name: "John Doe",
      role: "Project Manager at WebSolutions",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "One of the most reliable developers I've worked with. Always delivers high-quality code on time and communicates effectively.",
    },
    {
      name: "Emily Johnson",
      role: "UX Designer at CreativeStudio",
      image: "/placeholder.svg?height=100&width=100",
      quote:
        "A true professional who understands both the technical and design aspects of web development. A pleasure to collaborate with.",
    },
  ];

  // Contributors/mentors data
  const contributors = [
    {
      name: "Dr. Robert Chen",
      role: "Former Professor",
      contribution:
        "Introduced me to software development and encouraged me to pursue it professionally.",
    },
    {
      name: "Sarah Williams",
      role: "First Tech Lead",
      contribution:
        "Mentored me during my early career and taught me best practices in web development.",
    },
    {
      name: "Michael Brown",
      role: "Open Source Maintainer",
      contribution:
        "Guided me through my first open source contributions and helped me grow as a developer.",
    },
  ];

  return (
    <main className="container px-4 py-12 md:px-6 md:py-24">
      {/* Hero Section */}
      <AnimatedSection className="mb-16">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-32 h-32 mb-6 overflow-hidden rounded-full">
            <Image
              src="/profile.jpg"
              alt="Aditya"
              fill
              className="object-cover"
              priority
            />
          </div>
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4">
            About Me
          </h1>
          <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed">
            Full-stack developer passionate about creating beautiful,
            functional, and user-friendly web applications.
          </p>
        </div>
      </AnimatedSection>

      {/* My Story Section */}
      <AnimatedSection className="mb-16" delay={100}>
        <div className="grid gap-8 md:grid-cols-[2fr_1fr] items-center">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter">My Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                I began my journey in web development over 5 years ago, starting
                with HTML and CSS before diving deeper into JavaScript and
                modern frameworks.
              </p>
              <p>
                With a background in computer science and a passion for creating
                intuitive user experiences, I've worked on a variety of projects
                ranging from e-commerce platforms to data visualization tools.
              </p>
              <p>
                I'm constantly learning and exploring new technologies to stay
                at the forefront of web development. My goal is to build
                applications that are not only functional but also accessible,
                performant, and enjoyable to use.
              </p>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden rounded-lg">
            <Image
              src="/placeholder.svg?height=400&width=400"
              alt="Working on code"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </AnimatedSection>

      {/* What I Do Section */}
      <AnimatedSection className="mb-16" delay={200}>
        <h2 className="text-3xl font-bold tracking-tighter mb-8">What I Do</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Web Development</h3>
              <p className="text-muted-foreground">
                Building responsive, accessible, and performant web applications
                using modern frameworks and best practices.
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M12 3v14"></path>
                  <path d="m17 8-5-5-5 5"></path>
                  <path d="M8 21h8"></path>
                  <path d="M12 17v4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">UI/UX Design</h3>
              <p className="text-muted-foreground">
                Creating intuitive and visually appealing user interfaces with a
                focus on user experience and accessibility.
              </p>
            </CardContent>
          </Card>
          <Card className="overflow-hidden">
            <CardContent className="p-6">
              <div className="mb-4 rounded-full bg-primary/10 p-3 w-12 h-12 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6 text-primary"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                  <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                  <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-2">Full-Stack Development</h3>
              <p className="text-muted-foreground">
                Developing end-to-end solutions with robust backend systems and
                seamless frontend experiences.
              </p>
            </CardContent>
          </Card>
        </div>
      </AnimatedSection>

      {/* Tech Stack Section */}
      <AnimatedSection className="mb-16" delay={300}>
        <h2 className="text-3xl font-bold tracking-tighter mb-8">Tech Stack</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.frontend.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Backend</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.backend.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Database</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.database.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="font-bold mb-4">Tools</h3>
              <div className="flex flex-wrap gap-2">
                {techStack.tools.map((tech) => (
                  <Badge key={tech} variant="secondary">
                    {tech}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </AnimatedSection>

      {/* Soft Skills Section */}
      <AnimatedSection className="mb-16" delay={400}>
        <h2 className="text-3xl font-bold tracking-tighter mb-8">
          Soft Skills
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          {softSkills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center p-4 border rounded-lg"
            >
              <div className="mr-4 rounded-full bg-primary/10 p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </AnimatedSection>

      {/* Testimonials Section */}
      <AnimatedSection className="mb-16" delay={500}>
        <h2 className="text-3xl font-bold tracking-tighter mb-8">
          What People Say
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="relative w-12 h-12 mr-4 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="italic text-muted-foreground">
                  "{testimonial.quote}"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedSection>

      {/* Contributors Section */}
      <AnimatedSection delay={600}>
        <h2 className="text-3xl font-bold tracking-tighter mb-8">
          People Who Shaped My Journey
        </h2>
        <div className="space-y-6">
          {contributors.map((contributor, index) => (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="mb-4 md:mb-0">
                    <h3 className="font-bold">{contributor.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {contributor.role}
                    </p>
                  </div>
                  <p className="text-muted-foreground max-w-md">
                    {contributor.contribution}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedSection>
    </main>
  );
}
