import { Layout } from "@/components/landing/Layout";
import React from "react";

export default function PrivacyPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:p-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
            Privacy Policy
          </h1>

          <div className="prose prose-blue max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Last updated: March 15, 2025
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Information We Collect
              </h2>
              <p className="text-gray-600 mb-4">
                We collect information that you provide directly to us,
                including:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Account information (name, email, password)</li>
                <li>Profile information (professional experience, skills)</li>
                <li>Usage data and preferences</li>
                <li>Communication data (messages, feedback)</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-gray-600 mb-4">
                We use the collected information to:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide and improve our services</li>
                <li>Personalize your experience</li>
                <li>Process your transactions</li>
                <li>Send you updates and marketing communications</li>
                <li>Ensure platform security</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Data Security
              </h2>
              <p className="text-gray-600">
                We implement appropriate security measures to protect your
                personal information. However, no method of transmission over
                the Internet is 100% secure, and we cannot guarantee absolute
                security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Contact Us
              </h2>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please
                contact us at{" "}
                <a
                  href="mailto:support@uphero.io"
                  className="text-blue-600 hover:text-blue-700"
                >
                  support@uphero.io
                </a>
              </p>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
