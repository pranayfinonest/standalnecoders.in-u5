export default function AITechnologyPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">AI & Technology Solutions</h1>
      <div className="prose max-w-none dark:prose-invert">
        <p className="text-lg mb-6">
          At StandaloneCoders, we harness the power of artificial intelligence and cutting-edge technology to help
          businesses innovate, automate processes, and gain competitive advantages. Our solutions are designed to solve
          complex problems and drive digital transformation.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our AI & Technology Services Include:</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Custom AI Solutions</h3>
            <p>
              We develop tailored AI solutions that address your specific business challenges. From predictive analytics
              and natural language processing to computer vision and recommendation systems, our AI implementations
              deliver measurable results.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Data Analytics & Business Intelligence</h3>
            <p>
              Transform your raw data into actionable insights with our data analytics services. We help you collect,
              process, and visualize data to make informed business decisions and identify growth opportunities.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Process Automation</h3>
            <p>
              Streamline your operations and reduce costs with our process automation solutions. We identify repetitive
              tasks and implement intelligent automation to improve efficiency, accuracy, and employee productivity.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Custom Software Development</h3>
            <p>
              Our team of experienced developers creates custom software solutions that align with your business goals.
              From web and mobile applications to enterprise systems, we deliver high-quality software that solves your
              unique challenges.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Why Choose Our AI & Technology Services?</h2>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>Expertise in cutting-edge technologies and methodologies</li>
          <li>Focus on practical solutions with measurable business impact</li>
          <li>Scalable implementations that grow with your business</li>
          <li>Collaborative approach to understand your unique challenges</li>
          <li>Ongoing support and knowledge transfer</li>
          <li>Commitment to ethical AI and responsible innovation</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold mb-3">Ready to Transform Your Business with Technology?</h3>
          <p className="mb-4">
            Contact us today to discuss how our AI and technology solutions can help your business innovate and grow.
            We'll work with you to understand your challenges and develop a tailored approach to address them.
          </p>
          <a
            href="/contact"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  )
}
