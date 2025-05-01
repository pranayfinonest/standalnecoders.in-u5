import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipping and Delivery Policy | Standalone Coders",
  description: "Shipping and Delivery Policy for Standalone Coders digital products and services.",
}

export default function ShippingDeliveryPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Shipping and Delivery Policy</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">Last Updated: May 1, 2024</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            This Shipping and Delivery Policy outlines how Standalone Coders delivers digital products and services to
            our clients. As we primarily provide digital services, this policy focuses on the delivery of digital
            assets, project milestones, and final deliverables.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Digital Deliverables</h2>
          <p>
            All digital deliverables, including but not limited to website files, source code, design assets, and
            documentation, will be delivered through one or more of the following methods:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Secure file transfer protocols</li>
            <li>Cloud storage services (Google Drive, Dropbox, etc.)</li>
            <li>Version control repositories (GitHub, GitLab, etc.)</li>
            <li>Client dashboard on our website</li>
            <li>Direct email for smaller files</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Delivery Timeframes</h2>
          <h3 className="text-xl font-medium mt-6 mb-3">3.1 Project Milestones</h3>
          <p>
            Delivery timeframes for project milestones will be outlined in the project agreement. Typical delivery
            schedules include:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>Design Concepts:</strong> 7-14 business days after project kickoff and receipt of all required
              materials
            </li>
            <li>
              <strong>Development Staging Site:</strong> 14-30 business days after design approval
            </li>
            <li>
              <strong>Final Website/Application:</strong> 7-14 business days after development approval and testing
            </li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">3.2 Revisions and Iterations</h3>
          <p>Each milestone may include a specified number of revision rounds, typically:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>2-3 rounds of design revisions</li>
            <li>1-2 rounds of development revisions</li>
          </ul>
          <p className="mt-4">
            Additional revision requests beyond the agreed-upon number may extend delivery timeframes and incur
            additional charges.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Deployment and Launch</h2>
          <p>Website and application deployment to production servers will be scheduled upon:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Final approval of all deliverables</li>
            <li>Receipt of final payment</li>
            <li>Confirmation of domain and hosting details</li>
          </ul>
          <p className="mt-4">
            Standard deployment typically takes 1-3 business days. Rush deployment may be available for an additional
            fee.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Delays and Extensions</h2>
          <p>Delivery timeframes may be extended due to:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Delays in receiving client feedback or required materials</li>
            <li>Changes to the project scope</li>
            <li>Technical issues with third-party services</li>
            <li>Force majeure events</li>
          </ul>
          <p className="mt-4">
            We will promptly notify clients of any anticipated delays and work to minimize their impact on the overall
            project timeline.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Physical Products</h2>
          <p>In rare cases where physical products are involved (such as hardware devices for IoT projects):</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Shipping will be arranged through reputable courier services</li>
            <li>Shipping costs will be calculated based on weight, dimensions, and destination</li>
            <li>Estimated delivery times will depend on the shipping method selected and destination</li>
            <li>Tracking information will be provided when available</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. International Deliveries</h2>
          <p>For international clients:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Digital deliverables will be provided through the same channels as domestic clients</li>
            <li>Time zone differences may affect communication and delivery schedules</li>
            <li>
              Any physical shipments may be subject to customs duties and taxes, which are the responsibility of the
              recipient
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Post-Delivery Support</h2>
          <p>After final delivery:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>A 30-day warranty period covers bug fixes and minor adjustments</li>
            <li>Training sessions will be scheduled as outlined in the project agreement</li>
            <li>Documentation will be provided for self-management</li>
            <li>Ongoing support and maintenance are available through separate service agreements</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
          <p>
            We reserve the right to modify this Shipping and Delivery Policy at any time. Changes will be effective
            immediately upon posting on our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
          <p>
            If you have any questions about this Shipping and Delivery Policy, please contact us at:
            <br />
            <strong>Email:</strong> support@standalonecoders.com
            <br />
            <strong>Phone:</strong> +91 XXXXXXXXXX
          </p>
        </section>
      </div>
    </div>
  )
}
