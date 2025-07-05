import { getLatestPosts } from "@/lib/sanity/queries";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { PostType } from "../../types/PostType";
import { BlogPostCard } from "../blog/BlogPostCard";
import { Button } from "../ui/button";

const FeaturedBlog = async () => {
  const latestPosts: PostType[] = await getLatestPosts(3);
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-background">
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full filter blur-3xl opacity-70 dark:opacity-30"></div>
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-full filter blur-3xl opacity-70 dark:opacity-30"></div>
      </div>

      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="text-start mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground flex items-center gap-3">
            <span>
              My Recent{" "}
              <span className="bg-[length:200%_200%] bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400">
                Writings
              </span>
            </span>
            <svg
              width="75"
              height="62"
              viewBox="0 0 75 62"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="translate-y-8 hidden sm:block"
              aria-hidden="true"
            >
              <path
                d="M1 1C6.24431 1.21626 11.5365 2.05428 16.6516 3.13955C28.7596 5.70848 41.2898 9.45859 51.3287 17.0631C61.1747 24.5214 66.3737 34.4703 69.1034 46.2597C70.3557 51.6681 70.3959 56.1136 70.6176 61.434"
                stroke="currentColor"
                strokeOpacity="0.3"
                strokeWidth="0.8"
                strokeLinecap="round"
                strokeDasharray="4 4"
              ></path>
              <path
                d="M63 57.185C65.135 58.2982 67.2076 59.4555 69.2541 60.7235C70.1813 61.2979 70.997 62.1916 71.624 60.9045C72.5057 59.0948 73.0026 57.3294 74.5536 56"
                stroke="currentColor"
                strokeOpacity="0.3"
                strokeWidth="0.5"
                strokeLinecap="round"
              ></path>
            </svg>
          </h2>
          <p className="text-sm md:text-base text-muted-foreground max-w-xl mt-3">
            I write about what I build, what I learn, and what keeps me curious
            — from software to society.
          </p>
        </div>

        <ul className="grid grid-cols-1 max-w-5xl">
          {latestPosts.map((post) => (
            <li key={post._id}>
              <BlogPostCard post={post} />
            </li>
          ))}
        </ul>

        <div className="mt-12 text-center">
          <Link href="/blog">
            <Button
              variant="outline"
              className="group rounded-full border-border bg-background hover:bg-accent px-6 py-3 text-base text-foreground transition-all hover:text-primary"
            >
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
