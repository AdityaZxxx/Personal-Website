import { ContactForm } from "@/components/forms/ContactForm";
import PageHero from "@/components/hero/PageHero";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import {
  RiFacebookFill,
  RiGithubFill,
  RiInstagramFill,
  RiLinkedinFill,
  RiTwitterXFill,
} from "react-icons/ri";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Aditya Rahmad for collaborations, inquiries, or just to say hello. Fill out the contact form or find my social media links.",
  keywords: [
    "Contact Aditya Rahmad",
    "Get in touch",
    "Collaboration",
    "Inquiry",
    "Email",
    "Social Media",
  ],
  openGraph: {
    title: "Contact Aditya Rahmad",
    description:
      "Get in touch with Aditya Rahmad for collaborations, inquiries, or just to say hello. Fill out the contact form or my social media links.",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/contact`,
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image-contact.png`,
        width: 1200,
        height: 630,
        alt: "Contact Aditya Rahmad",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Aditya Rahmad",
    description:
      "Get in touch with Aditya Rahmad for collaborations, inquiries, or just to say hello. Fill out the contact form or find my social media links.",
    creator: "@adxxya30",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image-contact.png`,
        width: 1200,
        height: 630,
        alt: "Contact Aditya Rahmad",
      },
    ],
  },
};

export default function ContactPage() {
  return (
    <main className="flex flex-col max-w-5xl mx-auto px-4 py-16 md:py-24 gap-16">
      <div className="max-w-5xl mx-auto">
        <PageHero
          icon={<Mail />}
          title="Contact"
          coloredTitle="Me"
          description="Get in touch with me."
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
          <div className="space-y-6">
            <ContactForm />
          </div>

          <div className="space-y-6">
            <div className="bg-background/80 border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <h2 className="text-2xl font-semibold mb-6">
                Contact Information
              </h2>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Email</h3>
                    <p className="text-muted-foreground">
                      adityaofficial714@gmail.com
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Typically replies within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phone</h3>
                    <p className="text-muted-foreground">+62 857 3092 2812</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Available Mon-Fri, 9AM-5PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-muted-foreground">Kediri, Indonesia</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Open to remote work
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t">
                <h3 className="font-medium mb-4">Find me online</h3>
                <div className="flex gap-4">
                  <div>
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        href="https://instagram.com/adxxya30"
                        target="_blank"
                      >
                        <RiInstagramFill className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div>
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        href="https://facebook.com/adxxya30"
                        target="_blank"
                      >
                        <RiFacebookFill className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div>
                    <Button variant="outline" size="icon" asChild>
                      <Link href="https://x.com/adxxya30" target="_blank">
                        <RiTwitterXFill className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div>
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        href="https://linkedin.com/in/adxxya30"
                        target="_blank"
                      >
                        <RiLinkedinFill className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                  <div>
                    <Button variant="outline" size="icon" asChild>
                      <Link
                        href="https://github.com/AdityaZxxx"
                        target="_blank"
                      >
                        <RiGithubFill className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
