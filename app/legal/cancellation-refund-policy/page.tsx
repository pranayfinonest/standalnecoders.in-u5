import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cancellation and Refund Policy | Standalone Coders",
  description: "Cancellation and Refund Policy for Standalone Coders services.",
}

export default function CancellationRefundPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Cancellation and Refund Policy</h1>

      <div className="prose prose-lg max-w-none">
        <p className="text-gray-600 mb-6">Last Updated: May 1, 2024</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            This Cancellation and Refund Policy outlines the terms under which you may cancel services and request
            refunds from Standalone Coders. We strive to ensure complete satisfaction with our services, but we
            understand that circumstances may arise where cancellations or refunds are necessary.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. Project Cancellation</h2>
          <h3 className="text-xl font-medium mt-6 mb-3">2.1 Client-Initiated Cancellation</h3>
          <p>
            If you wish to cancel a project after signing the agreement and making the initial payment, the following
            terms apply:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>Within 48 hours of signing:</strong> Full refund of the initial payment, minus any transaction
              fees.
            </li>
            <li>
              <strong>After project work has begun but before 25% completion:</strong> 50% of the initial payment will
              be retained as compensation for work already performed.
            </li>
            <li>
              <strong>After 25% project completion:</strong> The initial payment is non-refundable.
            </li>
            <li>
              <strong>After 50% project completion:</strong> The client is liable for up to 75% of the total project
              cost, depending on the actual work completed.
            </li>
          </ul>

          <h3 className="text-xl font-medium mt-6 mb-3">2.2 Company-Initiated Cancellation</h3>
          <p>Standalone Coders reserves the right to cancel a project under the following circumstances:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Client's failure to provide necessary information, content, or feedback within 30 days of request</li>
            <li>Client's request for services outside our scope or expertise</li>
            <li>Unethical or illegal requests</li>
            <li>Abusive behavior towards our team members</li>
          </ul>
          <p className="mt-4">
            In case of company-initiated cancellation, refund terms will depend on the reason for cancellation and the
            stage of the project.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Refund Process</h2>
          <p>
            To request a refund, please contact us at refunds@standalonecoders.com with your order details and reason
            for the refund request.
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>All refund requests will be processed within 7-10 business days.</li>
            <li>Refunds will be issued using the original payment method when possible.</li>
            <li>Bank charges or transaction fees may be deducted from the refund amount.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Non-Refundable Services</h2>
          <p>The following services are non-refundable:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Domain registration and transfer fees</li>
            <li>SSL certificates</li>
            <li>Third-party software licenses purchased on your behalf</li>
            <li>Completed maintenance work</li>
            <li>Rush fees for expedited services</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Maintenance and Support Plans</h2>
          <p>For ongoing maintenance and support plans:</p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Monthly plans can be cancelled with 15 days' notice before the next billing cycle.</li>
            <li>
              Annual plans can be cancelled with 30 days' notice, with a prorated refund for unused months minus a 10%
              administrative fee.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">6. Disputes</h2>
          <p>
            If you are dissatisfied with our services, please contact us to resolve the issue before initiating a
            payment dispute or chargeback. We are committed to finding a fair resolution to any concerns you may have.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">7. Changes to This Policy</h2>
          <p>
            We reserve the right to modify this Cancellation and Refund Policy at any time. Changes will be effective
            immediately upon posting on our website.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">8. Contact Us</h2>
          <p>
            If you have any questions about this Cancellation and Refund Policy, please contact us at:
            <br />
            <strong>Email:</strong> refunds@standalonecoders.com
            <br />
            <strong>Phone:</strong> +91 XXXXXXXXXX
          </p>
        </section>
      </div>
    </div>
  )
}
