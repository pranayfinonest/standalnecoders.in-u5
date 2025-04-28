export default function CreativeServicesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8">Creative Services</h1>
      <div className="prose max-w-none dark:prose-invert">
        <p className="text-lg mb-6">
          At StandaloneCoders, our creative team combines artistic vision with strategic thinking to deliver compelling
          visual assets and content that elevate your brand. We focus on creating memorable experiences that resonate
          with your target audience and drive engagement.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Our Creative Services Include:</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Brand Identity & Design</h3>
            <p>
              We create distinctive brand identities that communicate your values and resonate with your audience. Our
              services include logo design, visual identity systems, brand guidelines, and brand strategy to ensure
              consistency across all touchpoints.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Web & UI/UX Design</h3>
            <p>
              Our web and UI/UX design services focus on creating intuitive, engaging, and visually appealing digital
              experiences. We combine aesthetics with functionality to design websites and applications that delight
              users and achieve your business objectives.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Content Creation</h3>
            <p>
              From compelling copywriting to engaging videos and graphics, we create content that tells your story and
              connects with your audience. Our content strategy ensures that every piece of content serves your broader
              marketing and business goals.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-3">Digital & Print Design</h3>
            <p>
              We design a wide range of digital and print materials, including social media graphics, email templates,
              brochures, packaging, and marketing collateral. Our designs are not only visually striking but also
              strategically aligned with your brand and objectives.
            </p>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Why Choose Our Creative Services?</h2>
        <ul className="list-disc pl-6 space-y-2 mb-8">
          <li>Talented team of designers, writers, and creative strategists</li>
          <li>Strategic approach that aligns creativity with business goals</li>
          <li>Collaborative process that values your input and vision</li>
          <li>Attention to detail and commitment to quality</li>
          <li>Versatility across different media and platforms</li>
          <li>Focus on results and measurable impact</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg mb-8">
          <h3 className="text-xl font-semibold mb-3">Ready to Elevate Your Brand?</h3>
          <p className="mb-4">
            Contact us today to discuss your creative needs. Whether you're looking to refresh your brand, design a new
            website, or create engaging content, our creative team is ready to bring your vision to life.
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
