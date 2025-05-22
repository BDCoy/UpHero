import { Layout } from "@/components/landing/Layout";

export default function TermsPage() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8 lg:p-12">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6">
            Terms of Service
          </h1>

          <div className="prose prose-blue max-w-none">
            <p className="text-lg text-gray-600 mb-8">
              Last updated: March 15, 2025
            </p>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                1. Agreement to Terms
              </h2>
              <p className="text-gray-600">
                By accessing or using FreelanceHero, you agree to be bound by
                these Terms of Service and all applicable laws and regulations.
                If you do not agree with any of these terms, you are prohibited
                from using or accessing this site.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                2. Use License
              </h2>
              <p className="text-gray-600 mb-4">
                Permission is granted to temporarily access FreelanceHero for
                personal, non-commercial transitory viewing only. This is the
                grant of a license, not a transfer of title, and under this
                license you may not:
              </p>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software</li>
                <li>Remove any copyright or other proprietary notations</li>
                <li>Transfer the materials to another person</li>
              </ul>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                3. Disclaimer
              </h2>
              <p className="text-gray-600">
                The materials on FreelanceHero are provided on an 'as is' basis.
                FreelanceHero makes no warranties, expressed or implied, and
                hereby disclaims and negates all other warranties including,
                without limitation, implied warranties or conditions of
                merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of
                rights.
              </p>
            </section>

            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                4. Limitations
              </h2>
              <p className="text-gray-600">
                In no event shall FreelanceHero or its suppliers be liable for
                any damages (including, without limitation, damages for loss of
                data or profit, or due to business interruption) arising out of
                the use or inability to use FreelanceHero.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                5. Contact
              </h2>
              <p className="text-gray-600">
                If you have any questions about these Terms, please contact us
                at{" "}
                <a
                  href="mailto:support@uphero.io"
                  className="text-blue-600 hover:text-blue-700 transition-colors"
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
