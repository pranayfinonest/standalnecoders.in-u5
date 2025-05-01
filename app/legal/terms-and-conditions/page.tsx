import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms and Conditions | StandaloneCoders",
  description:
    "Terms and Conditions for StandaloneCoders - The rules and guidelines for using our website and services.",
}

export default function TermsAndConditionsPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400 mb-8">Last Updated: May 1, 2023</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            Welcome to StandaloneCoders. These Terms and Conditions ("Terms") govern your use of our website and
            services. By accessing or using our website or services, you agree to be bound by these Terms. If you
            disagree with any part of these Terms, you may not access our website or use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Definitions</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>"Company"</strong> refers to StandaloneCoders.
            </li>
            <li>
              <strong>"Website"</strong> refers to standalonecoders.com and all related subdomains.
            </li>
            <li>
              <strong>"Services"</strong> refers to all website development, design, and related services offered by the
              Company.
            </li>
            <li>
              <strong>"Client"</strong> refers to any individual or entity that purchases or uses our Services.
            </li>
            <li>
              <strong>"User"</strong> refers to any individual who accesses or uses our Website.
            </li>
            <li>
              <strong>"Content"</strong> refers to all text, images, videos, software, and other materials on our
              Website.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Use of Our Website</h2>
          <p>You may use our Website only for lawful purposes and in accordance with these Terms. You agree not to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Use our Website in any way that violates applicable laws or regulations.</li>
            <li>Use our Website to transmit or send unsolicited commercial communications.</li>
            <li>
              Attempt to gain unauthorized access to any portion of our Website or any systems or networks connected to
              our Website.
            </li>
            <li>
              Engage in any activity that disrupts or interferes with our Website, including the servers and networks
              connected to our Website.
            </li>
            <li>Use any robot, spider, or other automatic device or process to access our Website for any purpose.</li>
            <li>Introduce any viruses, trojan horses, worms, logic bombs, or other harmful material to our Website.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p>
            The Website and its original Content, features, and functionality are owned by the Company and are protected
            by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary
            rights laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform,
            republish, download, store, or transmit any of the material on our Website, except as follows:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Your computer may temporarily store copies of such materials in RAM incidental to your accessing and
              viewing those materials.
            </li>
            <li>
              You may store files that are automatically cached by your Web browser for display enhancement purposes.
            </li>
            <li>
              You may print or download one copy of a reasonable number of pages of the Website for your own personal,
              non-commercial use and not for further reproduction, publication, or distribution.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Service Terms</h2>
          <p>When you purchase our Services, the following terms apply:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Project Scope:</strong> The scope of work will be defined in a separate agreement or statement of
              work.
            </li>
            <li>
              <strong>Payment:</strong> Payment terms, including amounts and schedules, will be specified in the
              agreement or invoice.
            </li>
            <li>
              <strong>Delivery:</strong> Estimated delivery timelines will be provided but are not guaranteed unless
              explicitly stated in the agreement.
            </li>
            <li>
              <strong>Revisions:</strong> The number of revisions included in the project will be specified in the
              agreement.
            </li>
            <li>
              <strong>Client Responsibilities:</strong> Clients are responsible for providing necessary content,
              feedback, and approvals in a timely manner.
            </li>
            <li>
              <strong>Ownership:</strong> Upon full payment, the Client will own the final deliverables, except for
              third-party elements and our proprietary tools and processes.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">User Accounts</h2>
          <p>
            When you create an account with us, you must provide accurate, complete, and current information. You are
            responsible for safeguarding the password and for all activities that occur under your account.
          </p>
          <p>
            You agree to notify us immediately of any unauthorized access to or use of your account. We reserve the
            right to disable any user account at any time if, in our opinion, you have violated any provision of these
            Terms.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, the Company shall not be liable for any indirect, incidental,
            special, consequential, or punitive damages, including but not limited to, loss of profits, data, use,
            goodwill, or other intangible losses, resulting from:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Your access to or use of or inability to access or use the Website or Services;</li>
            <li>Any conduct or content of any third party on the Website;</li>
            <li>Any content obtained from the Website; and</li>
            <li>Unauthorized access, use, or alteration of your transmissions or content.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Indemnification</h2>
          <p>
            You agree to defend, indemnify, and hold harmless the Company, its affiliates, licensors, and service
            providers, and its and their respective officers, directors, employees, contractors, agents, licensors,
            suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards,
            losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your
            violation of these Terms or your use of the Website or Services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to its
            conflict of law provisions.
          </p>
          <p>
            Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction
            of the courts located in Bangalore, Karnataka, India.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to These Terms</h2>
          <p>
            We reserve the right to modify or replace these Terms at any time. If a revision is material, we will
            provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change
            will be determined at our sole discretion.
          </p>
          <p>
            By continuing to access or use our Website or Services after any revisions become effective, you agree to be
            bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the
            Website or Services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <p className="mt-2">
            <strong>Email:</strong> legal@standalonecoders.com
            <br />
            <strong>Address:</strong> 123 Tech Park, Bangalore, Karnataka, India 560001
            <br />
            <strong>Phone:</strong> +91 98765 43210
          </p>
        </section>
      </div>
    </div>
  )
}
