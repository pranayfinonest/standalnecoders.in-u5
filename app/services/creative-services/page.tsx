import ServiceDetail from "@/components/service-detail"

export default function CreativeServicesPage() {
  return (
    <ServiceDetail
      title="Creative Services"
      description="Professional creative solutions to enhance your brand and visual communication. Our creative services are designed to help you stand out in a crowded marketplace with compelling visuals and engaging content."
      features={[
        "Video Editing & Production",
        "Graphic Design & Branding",
        "Banner & Advertisement Creation",
        "Website Design & UI/UX",
        "Content Creation & Copywriting",
        "Social Media Visual Assets",
        "Animation & Motion Graphics",
        "Photography & Image Editing",
      ]}
      process={[
        {
          step: 1,
          title: "Creative Brief",
          description:
            "We begin by understanding your brand, target audience, and project objectives to establish clear creative direction.",
        },
        {
          step: 2,
          title: "Concept Development",
          description:
            "Our creative team develops concepts and initial designs based on your brief, providing options for your feedback.",
        },
        {
          step: 3,
          title: "Creation & Refinement",
          description:
            "Based on your feedback, we create and refine the final deliverables, ensuring they meet your expectations and objectives.",
        },
        {
          step: 4,
          title: "Delivery & Support",
          description:
            "We deliver the final assets in appropriate formats and provide support for implementation and any adjustments needed.",
        },
      ]}
      packages={[
        {
          name: "Essential Creative",
          price: "₹20,000",
          description: "Basic creative services for small businesses",
          features: [
            "Logo Design OR Basic Video Edit",
            "Social Media Templates (5)",
            "Basic Banner Design",
            "Simple Content Creation",
          ],
        },
        {
          name: "Professional Creative",
          price: "₹45,000",
          description: "Comprehensive creative package for businesses",
          features: [
            "Logo Design & Brand Guidelines",
            "Video Editing (up to 3 minutes)",
            "Social Media Templates (10)",
            "Banner & Ad Designs",
            "Content Creation (5 pieces)",
            "Basic Animation",
          ],
          popular: true,
        },
        {
          name: "Premium Creative",
          price: "₹90,000+",
          description: "Advanced creative solutions for established brands",
          features: [
            "Complete Brand Identity Package",
            "Professional Video Production",
            "Comprehensive Social Media Kit",
            "Custom Illustrations & Graphics",
            "Advanced Animation & Motion Graphics",
            "Full Content Strategy & Creation",
          ],
        },
      ]}
      faqs={[
        {
          question: "How long does a typical creative project take?",
          answer:
            "Project timelines vary based on complexity and scope. Simple designs might take a few days, while comprehensive brand identities or video productions could take several weeks. We'll provide a detailed timeline during the initial consultation.",
        },
        {
          question: "Do you provide source files for the designs?",
          answer:
            "Yes, we provide source files for most projects, allowing you to make future adjustments or work with other designers. Specific deliverables will be outlined in your project agreement.",
        },
        {
          question: "How many revisions are included in your creative services?",
          answer:
            "Our standard packages include two rounds of revisions after the initial concept presentation. Additional revisions can be accommodated at an hourly rate if needed.",
        },
        {
          question: "Can you work with our existing brand guidelines?",
          answer:
            "We can work within your existing brand guidelines to ensure consistency across all materials. If you don't have formal guidelines, we can help develop them as part of our services.",
        },
      ]}
      cta={{
        title: "Elevate Your Brand with Creative Excellence",
        description:
          "Ready to make your brand stand out with professional creative services? Contact us today to discuss your project.",
      }}
    />
  )
}
