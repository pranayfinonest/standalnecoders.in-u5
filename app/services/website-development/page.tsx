import ServiceCategoryTemplate from "@/components/service-category-template"
import type { Metadata } from "next"
import { Code, ShoppingCart, FileText, Zap, Database, Shield } from "lucide-react"

export const metadata: Metadata = {
  title: "Website Development Services | StandaloneCoders",
  description:
    "Custom website design and development services including e-commerce, CMS-based websites, and web applications.",
}

// Force static generation for this page
export const dynamic = "force-static"

export default function WebsiteDevelopmentPage() {
  const serviceData = {
    title: "Website Development",
    description:
      "Our Website Development services provide end-to-end solutions for businesses looking to establish or enhance their online presence. From custom designs to e-commerce platforms and content management systems, we deliver websites that are not only visually appealing but also functional and optimized for performance.",
    imageSrc: "/modern-portfolio-design.png",
    icon: <Code className="h-6 w-6 text-blue-600" />,
    services: [
      {
        title: "Custom Website Design & Development",
        description:
          "Bespoke website designs tailored to your brand identity and business goals, developed with clean code and modern technologies.",
        icon: <Code className="h-6 w-6 text-blue-600" />,
        features: [
          "Responsive design for all devices",
          "Custom UI/UX design",
          "Fast loading speeds",
          "SEO-friendly structure",
          "Accessibility compliance",
        ],
      },
      {
        title: "E-commerce Development",
        description:
          "Robust online stores built on platforms like Shopify, WooCommerce, or custom solutions using React.js and Node.js.",
        icon: <ShoppingCart className="h-6 w-6 text-blue-600" />,
        features: [
          "Secure payment gateways",
          "Inventory management",
          "Product catalog",
          "Customer accounts",
          "Order tracking",
        ],
      },
      {
        title: "CMS-based Websites",
        description:
          "Easy-to-manage websites built on popular content management systems like WordPress, Webflow, and other platforms.",
        icon: <FileText className="h-6 w-6 text-blue-600" />,
        features: [
          "User-friendly admin panel",
          "Content scheduling",
          "Media library",
          "User role management",
          "Plugin integration",
        ],
      },
      {
        title: "Landing Pages & Sales Funnels",
        description: "High-converting landing pages and sales funnels designed to capture leads and drive conversions.",
        icon: <Zap className="h-6 w-6 text-blue-600" />,
        features: [
          "A/B testing capability",
          "Lead capture forms",
          "Call-to-action optimization",
          "Analytics integration",
          "Conversion tracking",
        ],
      },
      {
        title: "API Integration & Backend Development",
        description:
          "Seamless integration with third-party APIs and custom backend development to power your website's functionality.",
        icon: <Database className="h-6 w-6 text-blue-600" />,
        features: [
          "RESTful API development",
          "Database design",
          "Authentication systems",
          "Third-party integrations",
          "Scalable architecture",
        ],
      },
      {
        title: "Website Maintenance & Support",
        description:
          "Ongoing maintenance, updates, and technical support to ensure your website remains secure and performs optimally.",
        icon: <Shield className="h-6 w-6 text-blue-600" />,
        features: [
          "Regular security updates",
          "Performance optimization",
          "Content updates",
          "Technical support",
          "Backup and recovery",
        ],
      },
    ],
    benefits: {
      description:
        "Our website development services are designed to give your business a competitive edge in the digital landscape.",
      items: [
        {
          title: "Increased Online Visibility",
          description:
            "A professionally developed website helps your business get found online and attract more potential customers.",
        },
        {
          title: "Enhanced User Experience",
          description:
            "We create intuitive, user-friendly websites that provide a seamless experience for your visitors.",
        },
        {
          title: "Higher Conversion Rates",
          description:
            "Strategic design and optimization lead to better conversion rates and more business opportunities.",
        },
        {
          title: "Mobile Responsiveness",
          description: "All our websites are fully responsive, ensuring a perfect experience across all devices.",
        },
      ],
    },
    process: {
      steps: [
        {
          title: "Discovery",
          description:
            "We analyze your business needs, target audience, and competitors to develop a strategic website plan.",
        },
        {
          title: "Design & Prototyping",
          description:
            "Our designers create wireframes and visual designs that align with your brand and business objectives.",
        },
        {
          title: "Development",
          description:
            "Our development team brings the designs to life with clean, efficient code and modern technologies.",
        },
        {
          title: "Testing & Launch",
          description:
            "Rigorous testing across devices and browsers ensures your website functions flawlessly before launch.",
        },
      ],
    },
    packages: [
      {
        title: "Basic Website",
        price: "₹24,999",
        features: [
          "Up to 5 pages",
          "Responsive design",
          "Basic SEO setup",
          "Contact form",
          "Social media integration",
          "3 rounds of revisions",
        ],
        cta: "Get Started",
      },
      {
        title: "Business Website",
        price: "₹49,999",
        features: [
          "Up to 10 pages",
          "Responsive design",
          "Advanced SEO setup",
          "Content management system",
          "Blog integration",
          "Custom forms",
          "Analytics integration",
          "5 rounds of revisions",
        ],
        cta: "Choose Plan",
        popular: true,
      },
      {
        title: "E-commerce Website",
        price: "₹99,999",
        features: [
          "Up to 100 products",
          "Responsive design",
          "E-commerce platform setup",
          "Payment gateway integration",
          "Inventory management",
          "Order tracking",
          "Customer accounts",
          "Advanced SEO",
          "Analytics & reporting",
        ],
        cta: "Contact Us",
      },
    ],
    faqs: [
      {
        question: "How long does it take to build a website?",
        answer:
          "The timeline for website development varies depending on the complexity and scope of the project. A basic website typically takes 2-4 weeks, while more complex websites or e-commerce platforms can take 8-12 weeks or more.",
      },
      {
        question: "Do you provide website hosting?",
        answer:
          "Yes, we offer website hosting solutions as part of our services. We can recommend and set up the most suitable hosting option based on your website's requirements and expected traffic.",
      },
      {
        question: "Can I update the website content myself?",
        answer:
          "We build websites with user-friendly content management systems that allow you to easily update content, add new pages, and manage your website without technical knowledge.",
      },
      {
        question: "Do you optimize websites for search engines?",
        answer:
          "Yes, we implement SEO best practices during the development process, including proper HTML structure, mobile responsiveness, site speed optimization, and basic on-page SEO elements to help your website rank better in search engines. We also offer more comprehensive SEO services if you need advanced optimization.",
      },
      {
        question: "What technologies do you use for website development?",
        answer:
          "We use a range of modern technologies depending on your project requirements. For frontend development, we work with HTML5, CSS3, JavaScript, React.js, and Next.js. For backend development, we use Node.js, PHP, and Python. We're also experienced with WordPress, Shopify, WooCommerce, and other popular platforms.",
      },
    ],
    technologies: [
      { name: "HTML5", icon: <Code className="h-6 w-6 text-blue-600" /> },
      { name: "CSS3", icon: <Code className="h-6 w-6 text-blue-600" /> },
      { name: "JavaScript", icon: <Code className="h-6 w-6 text-blue-600" /> },
      { name: "React.js", icon: <Code className="h-6 w-6 text-blue-600" /> },
      { name: "Next.js", icon: <Code className="h-6 w-6 text-blue-600" /> },
      { name: "Node.js", icon: <Code className="h-6 w-6 text-blue-600" /> },
      { name: "WordPress", icon: <Code className="h-6 w-6 text-blue-600" /> },
      { name: "Shopify", icon: <ShoppingCart className="h-6 w-6 text-blue-600" /> },
      { name: "WooCommerce", icon: <ShoppingCart className="h-6 w-6 text-blue-600" /> },
      { name: "PHP", icon: <Code className="h-6 w-6 text-blue-600" /> },
      { name: "Python", icon: <Code className="h-6 w-6 text-blue-600" /> },
      { name: "MongoDB", icon: <Database className="h-6 w-6 text-blue-600" /> },
    ],
    cta: {
      title: "Ready to Start Your Website Project?",
      description: "Contact us today to discuss your website development needs and get a free consultation.",
    },
  }

  return <ServiceCategoryTemplate {...serviceData} />
}
