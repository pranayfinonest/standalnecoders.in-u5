import ServiceDetail from "@/components/service-detail"

export default function DigitalMarketingPage() {
  return (
    <ServiceDetail
      title="Digital Marketing Services"
      description="Strategic marketing solutions to enhance your online presence, drive targeted traffic, and generate quality leads. Our digital marketing services are designed to help your business grow and thrive in the competitive digital landscape."
      features={[
        "Search Engine Optimization (SEO)",
        "Social Media Marketing",
        "Content Creation & Marketing",
        "Email Marketing Campaigns",
        "Pay-Per-Click (PPC) Advertising",
        "Analytics & Performance Tracking",
        "Conversion Rate Optimization",
        "Brand Development & Strategy",
      ]}
      process={[
        {
          step: 1,
          title: "Discovery & Analysis",
          description:
            "We begin by understanding your business, target audience, and competitors to develop a clear picture of your current digital presence.",
        },
        {
          step: 2,
          title: "Strategy Development",
          description:
            "Based on our analysis, we create a customized digital marketing strategy aligned with your business goals and target audience.",
        },
        {
          step: 3,
          title: "Implementation",
          description:
            "Our team executes the strategy across relevant channels, creating compelling content and campaigns to engage your audience.",
        },
        {
          step: 4,
          title: "Monitoring & Optimization",
          description:
            "We continuously monitor performance, analyze results, and make data-driven adjustments to maximize ROI and achieve your goals.",
        },
      ]}
      packages={[
        {
          name: "Starter",
          price: "₹15,000/mo",
          description: "Essential digital marketing for small businesses",
          features: [
            "Basic SEO Optimization",
            "Social Media Management (2 platforms)",
            "Monthly Content Creation (2 posts)",
            "Basic Analytics Reporting",
          ],
        },
        {
          name: "Growth",
          price: "₹35,000/mo",
          description: "Comprehensive marketing for growing businesses",
          features: [
            "Advanced SEO Strategy",
            "Social Media Management (4 platforms)",
            "Weekly Content Creation",
            "Email Marketing Campaigns",
            "PPC Campaign Management",
            "Bi-weekly Performance Reports",
          ],
          popular: true,
        },
        {
          name: "Premium",
          price: "₹75,000+/mo",
          description: "Full-service marketing for established businesses",
          features: [
            "Everything in Growth Package",
            "Custom Marketing Strategy",
            "Daily Social Media Management",
            "Advanced Content Marketing",
            "Conversion Rate Optimization",
            "Competitor Analysis",
            "Weekly Strategy Calls",
          ],
        },
      ]}
      faqs={[
        {
          question: "How long does it take to see results from digital marketing?",
          answer:
            "Results vary depending on your starting point, industry, and competition. SEO typically takes 3-6 months to show significant results, while paid advertising can generate immediate traffic. We provide regular reports to track progress.",
        },
        {
          question: "Which social media platforms should my business be on?",
          answer:
            "This depends on your target audience and business type. We'll help you identify the platforms where your audience is most active and focus efforts there rather than spreading resources too thin across all platforms.",
        },
        {
          question: "Do you offer one-time projects or only ongoing services?",
          answer:
            "We offer both ongoing marketing services and one-time projects such as website SEO audits, campaign setups, or marketing strategy development. We can tailor our services to your specific needs.",
        },
        {
          question: "How do you measure the success of digital marketing campaigns?",
          answer:
            "We track key performance indicators (KPIs) aligned with your business goals, which may include website traffic, conversion rates, lead generation, engagement metrics, and ultimately ROI. We provide regular reports with insights and recommendations.",
        },
      ]}
      cta={{
        title: "Boost Your Online Presence",
        description:
          "Ready to take your digital marketing to the next level? Contact us today to discuss how our services can help grow your business.",
      }}
    />
  )
}
