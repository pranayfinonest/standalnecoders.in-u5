import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions | Standalone Coders",
  description: "Terms and Conditions for using Standalone Coders services and website.",
}

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Terms and Conditions</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">Last Updated: May 1, 2024</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            These terms and conditions outline the rules and regulations for the use of Standalone Coders' website and
            services. By accessing this website or using our services, we assume you accept these terms and conditions
            in full. Do not continue to use Standalone Coders' website or services if you do not accept all of the terms
            and conditions stated on this page.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. License to Use Website</h2>
          <p>
            Unless otherwise stated, Standalone Coders and/or its licensors own the intellectual property rights for all
            material on this website. All intellectual property rights are reserved. You may view and/or print pages
            from the website for your own personal use subject to restrictions set in these terms and conditions.
          </p>
          <p className="mt-4">You must not:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Republish material from this website</li>
            <li>Sell, rent or sub-license material from this website</li>
            <li>Reproduce, duplicate or copy material from this website</li>
            <li>
              Redistribute content from Standalone Coders (unless content is specifically made for redistribution)
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Service Terms</h2>
          <p>
            Our services are provided "as is" without any warranty of any kind. We reserve the right to modify, suspend
            or discontinue our services at any time without notice.
          </p>
          <p className="mt-4">
            Project timelines, deliverables, and specifications will be outlined in individual project agreements. Any
            changes to the scope of work may result in additional charges and timeline adjustments.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Payment Terms</h2>
          <p>Payment schedules will be outlined in individual project agreements. Typically, we require:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>50% upfront payment before project commencement</li>
            <li>Remaining 50% upon project completion before final delivery</li>
          </ul>
          <p className="mt-4">
            Late payments may result in work suspension. All payments are non-refundable unless otherwise specified in
            our Cancellation and Refund Policy.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. User Obligations</h2>
          <p>
            You agree to provide all necessary materials, information, and approvals in a timely manner to allow us to
            complete the project as scheduled. You are responsible for the accuracy and legality of all content and
            materials you provide.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property Rights</h2>
          <p>
            Upon full payment, you will own the final deliverables specifically created for your project. However, we
            retain ownership of all preliminary designs and concepts not selected for final production.
          </p>
          <p className="mt-4">
            We reserve the right to display and link to your completed project as part of our portfolio and to write
            about the project on websites, in magazine articles, and in books about design.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
          <p>
            In no event shall Standalone Coders be liable for any indirect, incidental, special, consequential or
            punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible
            losses, resulting from your access to or use of or inability to access or use the services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Governing Law</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India and you
            irrevocably submit to the exclusive jurisdiction of the courts in that location.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. If we make changes to these terms, we will post the
            revised terms on our website and update the "Last Updated" date at the top of these terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
          <p>
            If you have any questions about these Terms and Conditions, please contact us at:
            <br />
            <strong>Email:</strong> legal@standalonecoders.com
            <br />
            <strong>Phone:</strong> +91 XXXXXXXXXX
          </p>
        </section>
      </div>
    </div>
  )
}
