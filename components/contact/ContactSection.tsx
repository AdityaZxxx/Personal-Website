import { ArrowRight, Mail, MessageSquare } from "lucide-react";
import * as motion from "motion/react-client";
import Link from "next/link";
import { Button } from "../ui/button";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Background decoration - marked as aria-hidden */}
      <div
        className="absolute inset-0 overflow-hidden -z-10"
        aria-hidden="true"
      >
        <div className="absolute top-1/2 left-1/2 w-full max-w-2xl h-64 -translate-x-1/2 -translate-y-1/2 bg-blue-500/10 dark:bg-blue-400/5 rounded-full blur-[100px]" />
      </div>

      <div className="container px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          className="flex flex-col items-center justify-center text-center"
        >
          {/* Badge with animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 px-4 py-1.5 text-sm font-medium text-blue-600 dark:text-blue-300 mb-4"
            aria-label="Collaboration invitation"
          >
            <MessageSquare className="h-4 w-4 mr-2" aria-hidden="true" />
            Let's Collaborate
          </motion.div>

          {/* Main heading */}
          <h2
            id="contact-heading"
            className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 dark:from-blue-400 dark:to-cyan-400 mb-4"
          >
            Get In Touch
          </h2>

          {/* Description text */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="max-w-[700px] text-lg text-gray-600 dark:text-slate-400 mb-8"
          >
            <p>
              Have a project in mind or just want to say hello? I'd love to hear
              from you. Whether you need a website, have questions, or just want
              to connect, feel free to reach out!
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-4 w-full max-w-md"
          >
            <Link
              href="/contact"
              className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 rounded-xl"
              aria-label="Go to contact form"
            >
              <Button
                size="lg"
                className="w-full group rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              >
                Contact Form
                <ArrowRight
                  className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </Button>
            </Link>

            <Link
              href="mailto:adityaofficial714@gmail.com"
              className="w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900 rounded-xl"
              aria-label="Send email (opens your email client)"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full group rounded-xl border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-300 transition-colors duration-300"
              >
                <Mail className="h-4 w-4 mr-2" aria-hidden="true" />
                Email Me
                <span className="sr-only">(opens your email client)</span>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
