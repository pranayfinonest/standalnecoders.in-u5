import type { CaseStudy } from "@/types/case-study"

export const caseStudiesData: CaseStudy[] = [
  {
    id: 1,
    slug: "ecommerce-platform-overhaul",
    title: "E-Commerce Platform Overhaul",
    summary:
      "Transforming a traditional retailer's outdated online store into a high-converting e-commerce platform with modern features and seamless user experience.",
    client: "LuxeRetail",
    industry: "Retail",
    date: "August 2023",
    duration: "4 months",
    image: "/blue-ecommerce-dashboard.png",
    additionalImages: ["/templates/ecommerce-template.png", "/templates/portfolio-template.png"],
    challenge:
      "LuxeRetail, a well-established retail brand, was struggling with an outdated e-commerce platform that was slow, difficult to navigate, and lacked modern features. This resulted in high cart abandonment rates, poor mobile experience, and declining online sales despite growing market demand.",
    solution: [
      "We developed a comprehensive e-commerce solution using Next.js for the frontend and a headless CMS for content management, allowing for a fast, responsive shopping experience.",
      "Implemented an intuitive product filtering and search system to help customers find products quickly and easily.",
      "Created a streamlined checkout process with multiple payment options to reduce cart abandonment.",
      "Built a robust inventory management system that integrated with their existing warehouse operations.",
      "Developed a mobile-first design approach to ensure a seamless shopping experience across all devices.",
    ],
    results: {
      metrics: [
        { value: "45%", label: "Increase in conversion rate" },
        { value: "30%", label: "Reduction in cart abandonment" },
        { value: "60%", label: "Increase in mobile sales" },
        { value: "3.5x", label: "Return on investment" },
      ],
      summary:
        "The new e-commerce platform launched to immediate success, with a 45% increase in conversion rates and a 30% reduction in cart abandonment. Mobile sales increased by 60%, reflecting the improved user experience across devices. The client reported a 3.5x return on their investment within the first year.",
      roi: "350% within first year",
    },
    testimonial: {
      quote:
        "StandaloneCoders transformed our online presence completely. Our customers love the new shopping experience, and our team finds the new admin system intuitive and powerful. The results have exceeded our expectations across all metrics.",
      name: "Priya Sharma",
      role: "Digital Marketing Director",
      company: "LuxeRetail",
      avatar: "/team-member-1.png",
    },
    technologies: ["React", "Next.js", "Node.js", "MongoDB", "Stripe", "AWS"],
    tags: ["E-commerce", "UI/UX Design", "Payment Integration", "Mobile-First"],
    featured: true,
  },
  {
    id: 2,
    slug: "secure-banking-mobile-app",
    title: "Secure Banking Mobile Application",
    summary:
      "Developing a secure, user-friendly mobile banking application with biometric authentication and real-time transaction tracking.",
    client: "TrustBank Financial",
    industry: "Banking & Finance",
    date: "November 2023",
    duration: "6 months",
    image: "/blue-mobile-banking.png",
    challenge:
      "TrustBank needed a secure, user-friendly mobile application that would allow customers to perform all banking operations remotely while ensuring the highest levels of security and compliance with financial regulations.",
    solution: [
      "Developed a native mobile application with a focus on security and user experience.",
      "Implemented multi-factor and biometric authentication for enhanced security.",
      "Created a real-time transaction monitoring system with instant notifications.",
      "Built a secure document upload and verification system for paperless account opening.",
      "Designed intuitive fund transfer and bill payment workflows to simplify common tasks.",
    ],
    results: {
      metrics: [
        { value: "4.8/5", label: "App store rating" },
        { value: "80%", label: "User adoption rate" },
        { value: "65%", label: "Reduction in branch visits" },
        { value: "40%", label: "Increase in customer satisfaction" },
      ],
      summary:
        "The mobile banking app achieved a 4.8/5 rating on app stores, with 80% of customers adopting mobile banking within 6 months of launch. Branch visits for routine transactions decreased by 65%, and overall customer satisfaction increased by 40%.",
      roi: "280% within 18 months",
    },
    testimonial: {
      quote:
        "StandaloneCoders delivered a mobile banking solution that perfectly balances security with usability. The app has transformed how our customers interact with the bank, and the security architecture gives us complete confidence in the platform.",
      name: "Rahul Verma",
      role: "CTO",
      company: "TrustBank Financial",
      avatar: "/team-member-2.png",
    },
    technologies: ["React Native", "Node.js", "PostgreSQL", "AWS", "OAuth 2.0"],
    tags: ["Mobile App", "Banking", "Security", "Biometrics"],
  },
  {
    id: 3,
    slug: "healthcare-analytics-dashboard",
    title: "Healthcare Analytics Dashboard",
    summary:
      "Creating an interactive analytics dashboard for healthcare providers to monitor patient data and improve clinical outcomes.",
    client: "MediCare Hospital Group",
    industry: "Healthcare",
    date: "March 2023",
    duration: "5 months",
    image: "/blue-health-overview.png",
    challenge:
      "MediCare Hospital Group needed a centralized dashboard to monitor patient data, track outcomes, and identify trends across their network of hospitals and clinics. Their existing systems were siloed, making it difficult to get a comprehensive view of patient care and operational efficiency.",
    solution:
      "We built an interactive healthcare analytics dashboard with real-time data visualization, customizable reports, and HIPAA-compliant data storage. The system integrated data from multiple sources including electronic health records, appointment systems, and billing platforms to provide a unified view of operations and patient outcomes.",
    results: {
      metrics: [
        { value: "35%", label: "Reduction in administrative time" },
        { value: "28%", label: "Improvement in patient scheduling" },
        { value: "42%", label: "Better resource allocation" },
        { value: "3.2x", label: "Return on investment" },
      ],
      summary:
        "The dashboard reduced administrative time by 35% and improved patient outcome tracking by providing actionable insights to healthcare providers. Resource allocation improved by 42%, and patient scheduling efficiency increased by 28%, resulting in shorter wait times and better patient experiences.",
      roi: "320% within two years",
    },
    testimonial: {
      quote:
        "The analytics dashboard has revolutionized how we track and improve patient care. We can now identify trends and make data-driven decisions that have measurably improved outcomes while reducing costs. It's been transformative for our entire organization.",
      name: "Dr. Neha Gupta",
      role: "Chief Medical Officer",
      company: "MediCare Hospital Group",
      avatar: "/team-member-3.png",
    },
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "HIPAA-compliant AWS infrastructure"],
    tags: ["Healthcare", "Analytics", "Data Visualization", "HIPAA Compliance"],
  },
  {
    id: 4,
    slug: "digital-transformation-manufacturing",
    title: "Digital Transformation for Manufacturing",
    summary:
      "Guiding a traditional manufacturing company through a comprehensive digital transformation to modernize operations and customer interactions.",
    client: "Precision Industries",
    industry: "Manufacturing",
    date: "January 2023",
    duration: "12 months",
    image: "/digital-transformation-blueprint.png",
    challenge:
      "Precision Industries, a traditional manufacturing company with decades of experience, was facing increasing competition from more technologically advanced competitors. They needed a comprehensive strategy to modernize their operations, improve efficiency, and enhance customer interactions through digital technologies.",
    solution: [
      "Developed a phased digital transformation blueprint tailored to the company's specific needs and capabilities.",
      "Implemented an IoT system to monitor and optimize manufacturing equipment performance.",
      "Created a customer portal for real-time order tracking, document access, and communication.",
      "Digitized internal workflows and approval processes to reduce paperwork and accelerate decision-making.",
      "Established a data analytics platform to identify production bottlenecks and quality issues.",
    ],
    results: {
      metrics: [
        { value: "25%", label: "Increase in operational efficiency" },
        { value: "30%", label: "Reduction in production downtime" },
        { value: "40%", label: "Faster order fulfillment" },
        { value: "20%", label: "Improvement in product quality" },
      ],
      summary:
        "The client successfully implemented the first phase of their digital transformation, resulting in a 25% increase in operational efficiency and a 30% reduction in production downtime. Order fulfillment time decreased by 40%, and product quality metrics improved by 20%, leading to higher customer satisfaction and retention.",
      roi: "220% on initial investment",
    },
    testimonial: {
      quote:
        "StandaloneCoders guided us through our digital transformation journey with expertise and patience. They understood our industry-specific challenges and developed solutions that made sense for our business. The results have been remarkable in terms of efficiency, quality, and customer satisfaction.",
      name: "Vikram Mehta",
      role: "Operations Director",
      company: "Precision Industries",
    },
    technologies: ["IoT", "Cloud Computing", "Process Automation", "Data Analytics", "Custom Software"],
    tags: ["Digital Transformation", "Manufacturing", "IoT", "Process Optimization"],
  },
  {
    id: 5,
    slug: "collaborative-coding-platform",
    title: "Collaborative Coding Platform",
    summary:
      "Building a real-time collaborative coding environment to enhance productivity for distributed development teams.",
    client: "TechInnovate Solutions",
    industry: "Software Development",
    date: "May 2023",
    duration: "7 months",
    image: "/collaborative-coding-space.png",
    challenge:
      "TechInnovate Solutions, a growing software development company with teams distributed across multiple locations, was struggling with collaboration challenges. Code reviews were time-consuming, pair programming was difficult to implement, and knowledge sharing was inefficient across their remote teams.",
    solution:
      "We developed a collaborative coding platform that enables real-time code editing, integrated version control, and communication tools. The platform features syntax highlighting for multiple languages, video conferencing capabilities, and automated code quality checks to streamline the development process.",
    results: {
      metrics: [
        { value: "20%", label: "Reduction in development time" },
        { value: "35%", label: "Faster code reviews" },
        { value: "45%", label: "Improved knowledge sharing" },
        { value: "15%", label: "Better code quality" },
      ],
      summary:
        "The platform reduced development time by 20% and accelerated code reviews by 35%. Knowledge sharing improved by 45%, particularly benefiting new team members who could learn from more experienced developers in real-time. Code quality metrics showed a 15% improvement through better collaboration and instant feedback.",
      roi: "185% within first year",
    },
    testimonial: {
      quote:
        "The collaborative coding platform has transformed how our distributed teams work together. It's like having everyone in the same room, despite being thousands of miles apart. The efficiency gains and quality improvements have been substantial and measurable.",
      name: "Amit Kumar",
      role: "Lead Developer",
      company: "TechInnovate Solutions",
      avatar: "/team-member-3.png",
    },
    technologies: ["WebSockets", "React", "Node.js", "MongoDB", "Git Integration"],
    tags: ["Collaboration Tools", "Developer Productivity", "Real-time Editing", "Remote Work"],
  },
  {
    id: 6,
    slug: "modern-portfolio-design",
    title: "Modern Portfolio Website",
    summary:
      "Designing and developing a striking portfolio website for a group of creative professionals to showcase their work and attract clients.",
    client: "Creative Collective",
    industry: "Creative & Design",
    date: "October 2023",
    duration: "2 months",
    image: "/modern-portfolio-design.png",
    challenge:
      "Creative Collective, a group of designers, photographers, and artists, needed a distinctive online portfolio to showcase their diverse work and attract potential clients. Their existing website was outdated, slow to load, and didn't effectively highlight the quality of their creative work.",
    solution:
      "We designed and developed a modern, responsive portfolio website with advanced filtering, smooth animations, and contact integration. The site features a content management system that allows team members to easily update their portfolios, a project showcase with detailed case studies, and an inquiry system for potential clients.",
    results: {
      metrics: [
        { value: "60%", label: "Increase in client inquiries" },
        { value: "75%", label: "Higher engagement metrics" },
        { value: "50%", label: "More time spent on site" },
        { value: "25%", label: "Growth in social media followers" },
      ],
      summary:
        "The new portfolio website increased client inquiries by 60% and provided a professional online presence for the creative team. Engagement metrics improved by 75%, with visitors spending 50% more time exploring the site. Social media following grew by 25% as more visitors shared the impressive portfolio pieces.",
      roi: "300% within 6 months",
    },
    testimonial: {
      quote:
        "Our new portfolio site perfectly captures the essence of our work and has dramatically increased our online presence. The intuitive CMS makes it easy for all team members to keep their portfolios fresh, and the inquiry system has brought us several high-value clients already.",
      name: "Sneha Gupta",
      role: "Creative Director",
      company: "Creative Collective",
    },
    technologies: ["React", "Next.js", "Framer Motion", "Tailwind CSS", "Headless CMS"],
    tags: ["Portfolio Design", "Creative Showcase", "Responsive Design", "Animation"],
  },
]
