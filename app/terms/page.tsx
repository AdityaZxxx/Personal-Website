import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Learn about the terms and conditions governing your use of our services",
};

export default function TermsPage() {
  return (
    <div className="container px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-muted-foreground">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using this website, you agree to be bound by these
              Terms of Service. If you disagree with any part of the terms, you
              may not access the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              2. User Responsibilities
            </h2>
            <p>You agree not to use the website:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>For any unlawful purpose</li>
              <li>To harass, abuse, or harm others</li>
              <li>To violate any intellectual property rights</li>
              <li>To transmit malicious software</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              3. Content Ownership
            </h2>
            <p>
              All content on this website, including text, graphics, and code,
              is owned by Aditya and protected by copyright laws. You may not
              reproduce, distribute, or create derivative works without
              permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Termination</h2>
            <p>
              We may terminate or suspend access to our service immediately,
              without prior notice, for any breach of these Terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              5. Limitation of Liability
            </h2>
            <p>
              Aditya shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages resulting from your use of or
              inability to use the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Your
              continued use of the service after changes constitutes acceptance
              of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              7. Contact Information
            </h2>
            <p>
              For questions about these Terms, please contact us at{" "}
              <Link
                href="mailto:legal@aditya.com"
                className="text-primary hover:underline"
              >
                legal@aditya.com
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
