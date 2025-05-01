import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy | StandaloneCoders",
  description:
    "Shipping and Delivery Policy for StandaloneCoders - Learn about our digital delivery processes and timelines.",
}

export default function ShippingDeliveryPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Shipping & Delivery Policy</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400 mb-8">Last Updated: May 1, 2023</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            At StandaloneCoders, we primarily provide digital services and products. This Shipping and Delivery Policy
            outlines how we deliver our digital services, the expected timelines, and related terms and conditions.
          </p>
          <p>
            By purchasing our services, you agree to the terms of this policy. Please read it carefully to understand
            our delivery processes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Digital Services Delivery</h2>

          <h3 className="text-xl font-medium mb-3">Website Development and Design Services</h3>
          <p>Our website development and design services follow a structured delivery process:</p>
          <ol className="list-decimal pl-6 mb-4">
            <li>
              <strong>Discovery Phase:</strong> After project initiation, we conduct a discovery phase to understand
              your requirements. This typically takes 1-2 weeks, depending on project complexity.
            </li>
            <li>
              <strong>Design Phase:</strong> Once requirements are finalized, we create design mockups. The timeline
              varies based on project scope, typically 2-4 weeks.
            </li>
            <li>
              <strong>Development Phase:</strong> After design approval, we begin development. This phase typically
              takes 4-8 weeks, depending on complexity.
            </li>
            <li>
              <strong>Testing Phase:</strong> We conduct thorough testing to ensure quality. This typically takes 1-2
              weeks.
            </li>
            <li>
              <strong>Deployment:</strong> Once testing is complete and you approve the final product, we deploy the
              website to your hosting environment. This typically takes 1-3 business days.
            </li>
            <li>
              <strong>Post-Launch Support:</strong> We provide post-launch support as specified in your service
              agreement.
            </li>
          </ol>
          <p>
            The total delivery timeline for website projects typically ranges from 8-16 weeks, depending on project
            scope and complexity.
          </p>

          <h3 className="text-xl font-medium mb-3">Digital Products</h3>
          <p>For digital products such as templates, themes, or plugins:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Immediate Download:</strong> Most digital products are available for immediate download after
              purchase.
            </li>
            <li>
              <strong>Email Delivery:</strong> Download links and access instructions are sent to your registered email
              address.
            </li>
            <li>
              <strong>Account Access:</strong> Products may also be accessible through your account on our website.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Delivery Timelines</h2>

          <h3 className="text-xl font-medium mb-3">Estimated Timelines</h3>
          <p>While we provide estimated delivery timelines for all projects, please note:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Timelines are estimates and may vary based on project complexity, client feedback turnaround, and
              unforeseen technical challenges.
            </li>
            <li>The delivery schedule will be outlined in your project proposal or statement of work.</li>
            <li>Any significant delays will be communicated promptly, along with revised timelines.</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">Factors Affecting Delivery</h3>
          <p>Several factors can affect delivery timelines:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Client Responsiveness:</strong> Timely feedback and content provision from clients are essential
              for meeting deadlines.
            </li>
            <li>
              <strong>Scope Changes:</strong> Additions or modifications to the original project scope may extend
              delivery timelines.
            </li>
            <li>
              <strong>Technical Complexity:</strong> Unforeseen technical challenges may require additional development
              time.
            </li>
            <li>
              <strong>Third-Party Integrations:</strong> Integration with external services may depend on their
              availability and API limitations.
            </li>
            <li>
              <strong>Content Readiness:</strong> Delays in receiving final content (text, images, videos) can affect
              project completion.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Delivery Methods</h2>
          <p>We deliver our services and products through various methods:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Project Management System:</strong> We use professional project management tools to share files,
              updates, and deliverables.
            </li>
            <li>
              <strong>Email:</strong> Important documents, access credentials, and notifications are sent via email.
            </li>
            <li>
              <strong>Cloud Storage:</strong> Large files may be shared through secure cloud storage services.
            </li>
            <li>
              <strong>Client Portal:</strong> Clients may access deliverables and project information through our secure
              client portal.
            </li>
            <li>
              <strong>Remote Deployment:</strong> We can deploy websites and applications directly to your hosting
              environment.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Physical Products</h2>
          <p>
            While we primarily offer digital services, in rare cases where physical items (such as printed materials or
            hardware) are involved:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Shipping Methods:</strong> We use reliable courier services for domestic and international
              shipping.
            </li>
            <li>
              <strong>Shipping Costs:</strong> Shipping costs will be clearly communicated before purchase and are
              typically borne by the client.
            </li>
            <li>
              <strong>Delivery Timeframes:</strong> Domestic deliveries typically take 3-7 business days, while
              international deliveries may take 7-21 business days.
            </li>
            <li>
              <strong>Tracking:</strong> Tracking information will be provided for all shipped items.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Delivery Confirmation</h2>
          <p>For all deliverables:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>We will request confirmation of receipt for all major deliverables.</li>
            <li>Clients are encouraged to review deliverables promptly and provide feedback or approval.</li>
            <li>If no feedback is received within 7 days of delivery, the deliverable may be considered accepted.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Post-Delivery Support</h2>
          <p>After delivery of the final product:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>We provide a warranty period as specified in your service agreement (typically 30 days).</li>
            <li>
              During this period, we will address any bugs or issues related to the original project scope at no
              additional cost.
            </li>
            <li>Additional support and maintenance services are available through our support plans.</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
          <p>
            We reserve the right to modify this Shipping and Delivery Policy at any time. Changes will be effective
            immediately upon posting on our website. We will notify active clients of significant changes via email.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>If you have any questions about this Shipping and Delivery Policy, please contact us at:</p>
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
