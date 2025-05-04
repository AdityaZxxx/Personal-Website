import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Aditya",
  description:
    "Learn how we collect, use, and protect your personal information",
};

export default function PrivacyPage() {
  return (
    <div className="container px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-muted-foreground">
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="prose prose-gray dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              1. Information We Collect
            </h2>
            <p>
              We may collect the following types of information when you use our
              website:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Personal information (name, email address)</li>
              <li>Usage data (pages visited, time spent)</li>
              <li>Cookies and tracking technologies</li>
              <li>Information from third-party services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              2. How We Use Your Information
            </h2>
            <p>Your information may be used to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Provide and maintain our service</li>
              <li>Improve user experience</li>
              <li>Communicate with you</li>
              <li>Analyze website usage</li>
              <li>Prevent fraud and abuse</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">3. Data Sharing</h2>
            <p>
              We do not sell your personal information. We may share data with:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Service providers (hosting, analytics)</li>
              <li>Legal authorities when required</li>
              <li>Business partners (with your consent)</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">4. Cookies</h2>
            <p>We use cookies to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Remember user preferences</li>
              <li>Analyze traffic patterns</li>
              <li>Enable essential website functions</li>
            </ul>
            <p className="mt-4">
              You can control cookies through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p>
              We implement appropriate security measures to protect your data,
              but no internet transmission is 100% secure. We cannot guarantee
              absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>Access your personal data</li>
              <li>Request correction or deletion</li>
              <li>Object to processing</li>
              <li>Request data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              7. Children's Privacy
            </h2>
            <p>
              Our service does not address anyone under 13. We do not knowingly
              collect personal information from children.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
            <p>
              For privacy-related inquiries, please contact us at{" "}
              <Link
                href="mailto:privacy@aditya.com"
                className="text-primary hover:underline"
              >
                privacy@aditya.com
              </Link>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
