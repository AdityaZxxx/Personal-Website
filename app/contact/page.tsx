"use client";
import { OpenMap } from "@/components/open-map";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import {
  Github,
  Instagram,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Send,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CustomLogo } from "../../components/custom-logo";

const ContactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s'-]+$/, "Invalid characters in name"),
  email: z
    .string()
    .email("Invalid email address")
    .endsWith(".com", "We currently only accept .com domains"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
    .refine(
      (val) => !/(http|www\.|\.com|\.net)/i.test(val),
      "Links are not allowed"
    ),
  honeypot: z.string().max(0).optional(),
});

type ContactFormValues = z.infer<typeof ContactFormSchema>;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(ContactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      setSubmitError("");
      setSubmitSuccess(false);

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          subject: data.subject,
          message: data.message,
          honeypot: "", // Leave empty - hidden field
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to send message");
      }

      setSubmitSuccess(true);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to send message"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container px-4 py-12 md:py-16 lg:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Animated Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent bg-[length:200%_auto] animate-gradient">
              Let's Connect
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Have a project in mind or want to chat? Drop me a message below!
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Contact Form */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-background/80 border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <Send className="h-5 w-5 text-primary" />
                </motion.span>
                Send a Message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Hidden honeypot field */}
                <input
                  type="text"
                  id="honeypot"
                  {...register("honeypot")}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-1"
                    >
                      Name
                    </label>
                    <input
                      id="name"
                      {...register("name")}
                      className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.name.message}
                      </motion.p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-1 text-sm text-red-500"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-1"
                  >
                    Subject
                  </label>
                  <input
                    id="subject"
                    {...register("subject")}
                    className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
                  />
                  {errors.subject && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors.subject.message}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    {...register("message")}
                    className="w-full px-3 py-2 border rounded-md focus:ring-primary focus:border-primary"
                  />
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors.message.message}
                    </motion.p>
                  )}
                </div>

                <AnimatePresence>
                  {submitError && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-red-500 text-sm"
                    >
                      {submitError}
                    </motion.p>
                  )}
                </AnimatePresence>

                <AnimatePresence>
                  {submitSuccess && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="text-green-500 text-sm"
                    >
                      Thank you! Your message has been sent successfully.
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 flex justify-center items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-background/80 border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">contact@aditya.com</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Typically replies within 24 hours
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">+62 123 4567 890</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Available Mon-Fri, 9AM-5PM
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4"
                >
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-muted-foreground">Jakarta, Indonesia</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Open to remote work
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="font-medium mb-4">Find me online</h3>
                <div className="flex gap-4">
                  <motion.div whileHover={{ y: -3 }}>
                    <Button variant="outline" size="icon" asChild>
                      <Link href="https://x.com/adxxya30" target="_blank">
                        <CustomLogo className="h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ y: -3 }}>
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        href="https://github.com/AdityaZxxx"
                        target="_blank"
                      >
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ y: -3 }}>
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        href="https://instagram.com/adxxya30"
                        target="_blank"
                      >
                        <Instagram className="h-4 w-4" />
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Map */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <OpenMap
                latitude={-6.2094}
                longitude={106.7996}
                className="mt-8"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
