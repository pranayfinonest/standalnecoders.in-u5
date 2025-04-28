import { Check } from "lucide-react"

export default function WhyChooseUs() {
  const reasons = [
    "Cybersecurity Expertise & Modern Solutions",
    "Professional Digital Marketing",
    "AI Implementation & Prompt Engineering",
    "Dedicated Support & Communication",
    "100% Customer Satisfaction Guaranteed",
  ]

  return (
    <section className="py-24 bg-white dark:bg-gray-900 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-40 right-0 w-72 h-72 bg-blue-400/5 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-blue-300/5 dark:bg-blue-400/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg blur opacity-20 dark:opacity-30"></div>
              <img
                src="/collaborative-coding-space.png"
                alt="Why Choose Us"
                className="w-full h-auto rounded-lg shadow-xl relative"
              />
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-16">
            <span className="inline-block py-1 px-3 mb-4 text-sm font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full">
              Our Advantages
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Choose Us</h2>
            <ul className="space-y-5">
              {reasons.map((reason, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 p-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-full mr-4">
                    <Check className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300">{reason}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <a
                href="#contact"
                className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 inline-flex items-center"
              >
                Get Started Today
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
