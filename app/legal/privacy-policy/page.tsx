import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | StandaloneCoders",
  description:
    "Privacy Policy for StandaloneCoders - Learn how we collect, use, and protect your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>

      <div className="prose prose-lg dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400 mb-8">Last Updated: May 1, 2023</p>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p>
            StandaloneCoders ("we," "our," or "us") respects your privacy and is committed to protecting your personal
            information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
            you visit our website or use our services.
          </p>
          <p>
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please
            do not access the site or use our services.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>

          <h3 className="text-xl font-medium mb-3">Personal Information</h3>
          <p>We may collect personal information that you voluntarily provide to us when you:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Register for an account</li>
            <li>Sign up for our newsletter</li>
            <li>Request a quote or consultation</li>
            <li>Purchase our services</li>
            <li>Contact our customer support</li>
            <li>Participate in surveys or promotions</li>
          </ul>
          <p>This information may include:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Billing and shipping address</li>
            <li>Payment information</li>
            <li>Business information</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h3 className="text-xl font-medium mb-3">Automatically Collected Information</h3>
          <p>
            When you visit our website, we may automatically collect certain information about your device, including:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>IP address</li>
            <li>Browser type</li>
            <li>Operating system</li>
            <li>Pages visited</li>
            <li>Time and date of your visit</li>
            <li>Referring website</li>
            <li>Other statistics</li>
          </ul>
          <p>
            We collect this information using cookies, web beacons, and similar technologies. Please see our Cookie
            Policy for more information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p>We may use the information we collect for various purposes, including to:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send administrative information, such as updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Communicate with you about products, services, offers, promotions, and events</li>
            <li>Monitor and analyze trends, usage, and activities</li>
            <li>Detect, prevent, and address technical issues</li>
            <li>Comply with legal obligations</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Disclosure of Your Information</h2>
          <p>We may share your information in the following situations:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <strong>Service Providers:</strong> We may share your information with third-party vendors, service
              providers, contractors, or agents who perform services for us.
            </li>
            <li>
              <strong>Business Transfers:</strong> We may share or transfer your information in connection with, or
              during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion
              of our business.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in
              response to valid requests by public authorities.
            </li>
            <li>
              <strong>Protection of Rights:</strong> We may disclose your information to protect our rights, privacy,
              safety, or property, and/or that of our clients or others.
            </li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect the security of your personal
            information. However, please be aware that no method of transmission over the internet or electronic storage
            is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Privacy Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, such as:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>The right to access your personal information</li>
            <li>The right to rectify inaccurate or incomplete information</li>
            <li>The right to erasure of your personal information</li>
            <li>The right to restrict processing of your personal information</li>
            <li>The right to data portability</li>
            <li>The right to object to processing</li>
            <li>The right to withdraw consent</li>
          </ul>
          <p>
            To exercise these rights, please contact us using the information provided in the "Contact Us" section
            below.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Children's Privacy</h2>
          <p>
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal
            information from children. If you are a parent or guardian and believe your child has provided us with
            personal information, please contact us, and we will take steps to delete such information.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy
            Policy periodically for any changes.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="mt-2">
            <strong>Email:</strong> privacy@standalonecoders.com
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
