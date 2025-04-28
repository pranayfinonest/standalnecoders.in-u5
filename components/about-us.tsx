export default function AboutUs() {
  return (
    <section id="about" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">About Us</h2>
          <p className="text-xl leading-relaxed text-gray-700 dark:text-gray-300 mb-10">
            We are passionate tech creators helping startups, businesses, and brands achieve digital success. From
            websites and apps to complete tech ecosystems, StandaloneCoders builds everything you need to succeed.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">100+</div>
              <p className="text-gray-600 dark:text-gray-400">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">50+</div>
              <p className="text-gray-600 dark:text-gray-400">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">5+</div>
              <p className="text-gray-600 dark:text-gray-400">Years Experience</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">24/7</div>
              <p className="text-gray-600 dark:text-gray-400">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
