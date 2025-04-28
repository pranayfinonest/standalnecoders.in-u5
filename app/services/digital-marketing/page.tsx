export default function DigitalMarketingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Digital Marketing Services</h1>
      <div className="prose max-w-none dark:prose-invert">
        <p className="text-lg mb-6">
          At StandaloneCoders, we deliver results-driven digital marketing strategies that help businesses grow their
          online presence, attract qualified leads, and increase conversions. Our data-driven approach ensures that your
          marketing budget is invested effectively.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Digital Marketing Services Include:</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Search Engine Optimization (SEO)</h3>
            <p>
              We improve your website's visibility in search engine results through technical optimization, content
              strategy, and ethical link building. Our SEO services help you attract organic traffic and reach potential
              customers when they're searching for your products or services.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Pay-Per-Click (PPC) Advertising</h3>
            <p>
              Our PPC campaigns deliver immediate traffic and conversions through strategic ad placement on search
              engines and social media platforms. We optimize your campaigns for maximum ROI, targeting the right
              audience with compelling ad copy and landing pages.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Social Media Marketing</h3>
            <p>
              We help you build and engage with your audience across relevant social media platforms. Our social media
              strategies include content creation, community management, paid advertising, and performance analysis to
              drive brand awareness and customer loyalty.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Content Marketing</h3>
            <p>
              Our content marketing services help you attract and retain customers through valuable, relevant content.
              From blog posts and articles to videos and infographics, we create content that resonates with your target
              audience and supports your business goals.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Why Choose Our Digital Marketing Services?</h2>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>Customized strategies tailored to your business goals</li>
          <li>Transparent reporting and measurable results</li>
          <li>Experienced team of digital marketing specialists</li>
          <li>Data-driven approach to campaign optimization</li>
          <li>Continuous testing and improvement</li>
          <li>Focus on ROI and business growth</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold mb-3">Ready to Grow Your Online Presence?</h3>
          <p className="mb-4">
            Contact us today to discuss your digital marketing needs. We'll analyze your current online presence and
            develop a strategy to help you reach your target audience and achieve your business objectives.
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
