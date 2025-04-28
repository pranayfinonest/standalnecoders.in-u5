export default function CybersecurityPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Cybersecurity Services</h1>
      <div className="prose max-w-none dark:prose-invert">
        <p className="text-lg mb-6">
          At StandaloneCoders, we provide comprehensive cybersecurity solutions to protect your business from evolving
          digital threats. Our team of security experts employs industry-leading practices and cutting-edge technologies
          to safeguard your valuable data and systems.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Cybersecurity Services Include:</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Vulnerability Assessment</h3>
            <p>
              We conduct thorough assessments to identify vulnerabilities in your systems, applications, and network
              infrastructure. Our detailed reports provide actionable insights to address security gaps.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Penetration Testing</h3>
            <p>
              Our ethical hackers simulate real-world attacks to test your defenses and identify potential entry points
              that malicious actors could exploit. We help you strengthen your security posture based on our findings.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Security Audits & Compliance</h3>
            <p>
              We ensure your organization meets industry standards and regulatory requirements such as GDPR, HIPAA, and
              PCI DSS. Our comprehensive audits help you maintain compliance and avoid penalties.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Incident Response Planning</h3>
            <p>
              We help you develop and implement effective incident response plans to minimize damage and recovery time
              in the event of a security breach. Our team provides guidance on best practices for handling security
              incidents.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Why Choose Our Cybersecurity Services?</h2>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>Expert team with certified security professionals</li>
          <li>Customized security solutions tailored to your business needs</li>
          <li>Proactive approach to identifying and mitigating security risks</li>
          <li>Continuous monitoring and threat intelligence</li>
          <li>Clear communication and detailed reporting</li>
          <li>Cost-effective security measures with measurable ROI</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold mb-3">Ready to Secure Your Business?</h3>
          <p className="mb-4">
            Contact us today to schedule a consultation with our cybersecurity experts. We'll help you identify your
            security needs and develop a comprehensive strategy to protect your digital assets.
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  )
}
