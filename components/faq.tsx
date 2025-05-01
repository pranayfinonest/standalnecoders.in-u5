"\"use client"

const faqs = [
  {
    question: "What services does StandaloneCoders offer?",
    answer:
      "StandaloneCoders offers a comprehensive range of digital services including web development, mobile app development, cybersecurity solutions, AI implementation, digital marketing, and creative services. We provide end-to-end technology solutions tailored to your business needs.",
  },
  {
    question: "How long does it take to develop a website?",
    answer:
      "The timeline for website development varies depending on the complexity and requirements of the project. A simple website can be completed in 2-4 weeks, while more complex websites with custom functionality may take 8-12 weeks. During our initial consultation, we'll provide you with a more accurate timeline based on your specific needs.",
  },
  {
    question: "What is your pricing structure?",
    answer:
      "Our pricing is project-based and depends on the scope, complexity, and requirements of your project. We offer transparent pricing with no hidden fees. After understanding your needs, we'll provide a detailed quote outlining all costs involved. We also offer flexible payment options to accommodate your budget.",
  },
  {
    question: "Do you provide ongoing support after the project is completed?",
    answer:
      "Yes, we offer various maintenance and support packages to ensure your digital assets continue to perform optimally. Our support services include regular updates, security monitoring, performance optimization, content updates, and technical troubleshooting. We can tailor a support package to meet your specific needs.",
  },
  {
    question: "How do you ensure the security of websites and applications?",
    answer:
      "Security is a top priority for us. We implement industry best practices for secure coding, use HTTPS/SSL encryption, conduct regular security audits, implement robust authentication systems, and follow OWASP guidelines. We also provide ongoing security monitoring and updates to protect against emerging threats.",
  },
  {
    question: "Can you help with improving our existing website?",
    answer:
      "We offer website audit and improvement services to enhance your existing website's performance, security, user experience, and SEO. Our team will analyze your current website, identify areas for improvement, and implement changes to optimize its effectiveness and achieve your business goals.",
  },
  {
    question: "What technologies do you use for development?",
    answer:
      "We use a wide range of modern technologies depending on the project requirements. For web development, we commonly use React, Next.js, Node.js, and PHP/Laravel. For mobile apps, we work with React Native, Flutter, and native iOS/Android development. We stay updated with the latest technologies to ensure we deliver cutting-edge solutions.",
  },
]

export default function FAQ() {
  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Have questions? We've got answers. Here are some of the most common questions we receive about our services.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
              <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
