import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cancellation & Refund Policy | StandaloneCoders",
  description:
    "Cancellation and Refund Policy for StandaloneCoders - Learn about our cancellation procedures and refund terms.",
}

export default function CancellationRefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Cancellation & Refund Policy</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400 mb-8">Last Updated: May 1, 2023</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            At StandaloneCoders, we strive to ensure complete satisfaction with our services. This Cancellation and
            Refund Policy outlines the terms and conditions for cancellations, refunds, and project terminations.
          </p>
          <p>
            By purchasing our services, you agree to the terms of this policy. Please read it carefully to understand
            your rights and obligations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Definitions</h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>"Company"</strong> refers to StandaloneCoders.
            </li>
            <li>
              <strong>"Client"</strong> refers to any individual or entity that purchases our services.
            </li>
            <li>
              <strong>"Services"</strong> refers to all website development, design, and related services offered by the
              Company.
            </li>
            <li>
              <strong>"Project"</strong> refers to the specific work agreed upon between the Company and the Client.
            </li>
            <li>
              <strong>"Milestone"</strong> refers to a specific stage or deliverable in the Project.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Cancellation Policy</h2>

          <h3 className="text-xl font-medium mb-3">Project Cancellation by Client</h3>
          <p>If you wish to cancel a project, the following terms apply:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Before Project Commencement:</strong> If you cancel before we begin work on your project, you will
              receive a full refund of any payments made, minus a 5% administrative fee.
            </li>
            <li>
              <strong>During Initial Planning Phase:</strong> If you cancel during the planning phase (before any design
              or development work has begun), you will receive a 75% refund of any payments made.
            </li>
            <li>
              <strong>After Work Has Begun:</strong> If you cancel after we have begun design or development work,
              refunds will be prorated based on the percentage of work completed, as determined by our project
              management system.
            </li>
            <li>
              <strong>After Project Completion:</strong> No refunds will be issued after the project has been completed
              and delivered.
            </li>
          </ul>

          <h3 className="text-xl font-medium mb-3">Project Cancellation by Company</h3>
          <p>We reserve the right to cancel a project under the following circumstances:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              If the Client fails to provide necessary information, content, or feedback within 30 days of request.
            </li>
            <li>If the Client requests changes that significantly alter the original project scope.</li>
            <li>If the Client violates any terms of our service agreement.</li>
            <li>If unforeseen circumstances prevent us from completing the project.</li>
          </ul>
          <p>
            In case of cancellation by the Company, refunds will be issued on a prorated basis for work not completed.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Refund Policy</h2>

          <h3 className="text-xl font-medium mb-3">Standard Services</h3>
          <p>For our standard website development and design services:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Deposit/Initial Payment:</strong> The initial payment or deposit (typically 30-50% of the total
              project cost) is non-refundable once work has begun, as it covers initial planning, research, and resource
              allocation.
            </li>
            <li>
              <strong>Milestone Payments:</strong> Payments made for completed milestones are non-refundable, as they
              represent work already delivered.
            </li>
            <li>
              <strong>Final Payment:</strong> The final payment is due upon project completion and is non-refundable.
            </li>
          </ul>

          <h3 className="text-xl font-medium mb-3">Maintenance and Support Plans</h3>
          <p>For ongoing maintenance and support plans:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Monthly Plans:</strong> No refunds are provided for the current month. You may cancel at any time,
              and the service will continue until the end of the current billing period.
            </li>
            <li>
              <strong>Annual Plans:</strong> If you cancel an annual plan, we will provide a prorated refund for the
              remaining full months, minus a 10% administrative fee.
            </li>
          </ul>

          <h3 className="text-xl font-medium mb-3">Hosting Services</h3>
          <p>For hosting services:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Monthly Hosting:</strong> No refunds are provided for the current month.
            </li>
            <li>
              <strong>Annual Hosting:</strong> If you cancel annual hosting, we will provide a prorated refund for the
              remaining full months, minus a 10% administrative fee.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How to Request a Cancellation or Refund</h2>
          <p>To request a cancellation or refund, please follow these steps:</p>
          <ol className="list-decimal pl-6 mb-4">
            <li>
              Contact your project manager or our customer support team via email at support@standalonecoders.com.
            </li>
            <li>Provide your project ID, name, and reason for cancellation or refund.</li>
            <li>Our team will review your request and respond within 3 business days.</li>
            <li>If approved, refunds will be processed within 7-14 business days using the original payment method.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Exceptions</h2>
          <p>
            We understand that exceptional circumstances may arise. We may consider exceptions to this policy on a
            case-by-case basis, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Serious illness or death of the client or immediate family member.</li>
            <li>Natural disasters or other force majeure events.</li>
            <li>Significant and demonstrable failure on our part to deliver as promised.</li>
          </ul>
          <p>Documentation may be required to support exception requests.</p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Dispute Resolution</h2>
          <p>If you are dissatisfied with our services or have a dispute regarding a refund:</p>
          <ol className="list-decimal pl-6 mb-4">
            <li>Contact our customer support team to explain your concerns.</li>
            <li>If the issue cannot be resolved by our support team, it will be escalated to management.</li>
            <li>If a resolution still cannot be reached, we may agree to mediation or arbitration.</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
          <p>
            We reserve the right to modify this Cancellation and Refund Policy at any time. Changes will be effective
            immediately upon posting on our website. We will notify active clients of significant changes via email.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>If you have any questions about this Cancellation and Refund Policy, please contact us at:</p>
          <p className="mt-2">
            <strong>Email:</strong> support@standalonecoders.com
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
