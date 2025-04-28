import { Check } from "lucide-react"
import Image from "next/image"

export default function WhyChooseUs() {
  const reasons = [
    "Cybersecurity Expertise & Modern Solutions",
    "Professional Digital Marketing",
    "AI Implementation & Prompt Engineering",
    "Dedicated Support & Communication",
    "100% Customer Satisfaction Guaranteed",
  ]

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900/50 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute top-40 right-0 w-72 h-72 bg-gray-200/30 dark:bg-gray-800/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-80 h-80 bg-gray-200/40 dark:bg-gray-800/30 rounded-full blur-3xl"></div>

      <div className="container-custom">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 text-sm font-medium mb-4">
              <span className="w-2 h-2 rounded-full bg-gray-900 dark:bg-gray-100 mr-2"></span>
              Our Advantages
            </div>
            <h2 className="section-title">Why Choose Us</h2>
            <ul className="space-y-5 mt-8">
              {reasons.map((reason, index) => (
                <li
                  key={index}
                  className="flex items-start animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex-shrink-0 p-1 bg-gray-900 dark:bg-gray-100 rounded-full mr-4">
                    <Check className="w-5 h-5 text-white dark:text-gray-900" />
                  </div>
                  <p className="text-lg text-gray-700 dark:text-gray-300">{reason}</p>
                </li>
              ))}
            </ul>
            <div className="mt-10">
              <a href="#contact" target="_blank" rel="noopener noreferrer" className="primary-button group">
                Get Started Today
                <svg
                  className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 rounded-2xl blur-xl opacity-50 dark:opacity-30"></div>
              <div className="relative bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-xl">
                <Image
                  src="/collaborative-coding-space.png"
                  alt="Why Choose Us"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-gray-900 dark:bg-gray-100 rounded-xl -rotate-12"></div>
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-gray-800 dark:bg-gray-200 rounded-xl rotate-12"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
