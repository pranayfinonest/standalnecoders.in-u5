import ServiceDetail from "@/components/service-detail"

export default function AITechnologyPage() {
  return (
    <ServiceDetail
      title="AI & Technology Solutions"
      description="Cutting-edge AI and technology implementations to transform your business operations, enhance efficiency, and drive innovation. Our solutions are designed to help you leverage the power of artificial intelligence and modern technology."
      features={[
        "AI Implementation & Integration",
        "Prompt Engineering & Optimization",
        "Custom Software Development",
        "CRM Implementation & Management",
        "Business Process Automation",
        "Data Analysis & Visualization",
        "Cloud Solutions & Migration",
        "Technology Consulting & Strategy",
      ]}
      process={[
        {
          step: 1,
          title: "Requirements Analysis",
          description:
            "We begin by understanding your business challenges, processes, and goals to identify opportunities for AI and technology solutions.",
        },
        {
          step: 2,
          title: "Solution Design",
          description:
            "Our team designs a tailored solution that addresses your specific needs, leveraging appropriate technologies and methodologies.",
        },
        {
          step: 3,
          title: "Development & Implementation",
          description:
            "We develop and implement the solution, ensuring seamless integration with your existing systems and processes.",
        },
        {
          step: 4,
          title: "Training & Support",
          description:
            "We provide comprehensive training for your team and ongoing support to ensure you get the maximum value from your technology investment.",
        },
      ]}
      packages={[
        {
          name: "Starter Tech",
          price: "₹40,000",
          description: "Basic technology solutions for small businesses",
          features: [
            "Basic AI Integration",
            "CRM Setup & Configuration",
            "Process Automation (1 workflow)",
            "Technology Assessment",
            "Basic Training & Documentation",
          ],
        },
        {
          name: "Business Tech",
          price: "₹90,000",
          description: "Comprehensive solutions for growing businesses",
          features: [
            "Advanced AI Implementation",
            "Custom Software Development",
            "Process Automation (3 workflows)",
            "Data Analysis & Reporting",
            "Cloud Migration Assistance",
            "Comprehensive Training",
          ],
          popular: true,
        },
        {
          name: "Enterprise Tech",
          price: "₹2,00,000+",
          description: "Advanced solutions for large organizations",
          features: [
            "Enterprise-grade AI Solutions",
            "Custom Software Ecosystem",
            "Complete Business Process Automation",
            "Advanced Data Analytics",
            "Full Cloud Integration",
            "Dedicated Support & Maintenance",
          ],
        },
      ]}
      faqs={[
        {
          question: "How can AI benefit my specific business?",
          answer:
            "AI can benefit businesses in numerous ways, from automating repetitive tasks to providing insights from data analysis. We'll assess your specific operations to identify where AI can create the most value, whether through cost reduction, efficiency improvements, or new capabilities.",
        },
        {
          question: "Do I need technical expertise to use your AI solutions?",
          answer:
            "No, our solutions are designed to be user-friendly, and we provide comprehensive training and documentation. Our goal is to make advanced technology accessible to all businesses, regardless of their technical expertise.",
        },
        {
          question: "How long does implementation typically take?",
          answer:
            "Implementation timelines vary based on the complexity of the solution and your organization's size. Simple integrations may take a few weeks, while comprehensive enterprise solutions could take several months. We'll provide a detailed timeline during the planning phase.",
        },
        {
          question: "Can your solutions integrate with our existing systems?",
          answer:
            "Yes, we design our solutions to integrate with your existing systems whenever possible. During the requirements analysis phase, we'll assess your current technology stack and design integrations to ensure a seamless experience.",
        },
      ]}
      cta={{
        title: "Transform Your Business with Technology",
        description:
          "Ready to harness the power of AI and modern technology? Contact us today to discuss how our solutions can transform your business operations.",
      }}
    />
  )
}
