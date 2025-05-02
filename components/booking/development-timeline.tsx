"use client"

import type React from "react"

import { useState } from "react"
import { CheckCircle, ChevronDown, ChevronUp, Code, FileText, Layers, Rocket, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

interface DevelopmentTimelineProps {
  websiteType: string
  selectedFeatures: string[]
  complexity?: "simple" | "standard" | "complex"
}

interface TimelinePhase {
  id: string
  name: string
  description: string
  duration: number // in days
  icon: React.ReactNode
  tasks: TimelineTask[]
  dependencies?: string[]
}

interface TimelineTask {
  id: string
  name: string
  description: string
  duration: number // in days
  deliverables?: string[]
}

export function DevelopmentTimeline({
  websiteType,
  selectedFeatures,
  complexity = "standard",
}: DevelopmentTimelineProps) {
  const [expandedPhases, setExpandedPhases] = useState<string[]>([])

  // Calculate complexity multiplier
  const getComplexityMultiplier = () => {
    switch (complexity) {
      case "simple":
        return 0.8
      case "complex":
        return 1.5
      default:
        return 1
    }
  }

  // Calculate feature complexity
  const calculateFeatureComplexity = () => {
    let additionalDays = 0

    selectedFeatures.forEach((feature) => {
      switch (feature) {
        case "ecommerce":
          additionalDays += 10
          break
        case "blog":
          additionalDays += 5
          break
        case "booking":
          additionalDays += 7
          break
        case "gallery":
          additionalDays += 3
          break
        case "contactForm":
          additionalDays += 1
          break
        case "newsletter":
          additionalDays += 2
          break
        case "testimonials":
          additionalDays += 1
          break
        case "socialMedia":
          additionalDays += 2
          break
        default:
          break
      }
    })

    return additionalDays
  }

  // Base timeline phases
  const baseTimelinePhases: TimelinePhase[] = [
    {
      id: "discovery",
      name: "Discovery & Planning",
      description: "Understanding requirements and planning the project",
      duration: 5,
      icon: <FileText className="h-5 w-5" />,
      tasks: [
        {
          id: "requirements",
          name: "Requirements Gathering",
          description: "Collecting and documenting all project requirements",
          duration: 2,
          deliverables: ["Requirements Document", "Project Scope"],
        },
        {
          id: "sitemap",
          name: "Sitemap & Information Architecture",
          description: "Planning the structure and organization of the website",
          duration: 1,
          deliverables: ["Sitemap Diagram", "User Flow Charts"],
        },
        {
          id: "project-plan",
          name: "Project Planning",
          description: "Creating a detailed project plan with milestones",
          duration: 2,
          deliverables: ["Project Timeline", "Resource Allocation Plan"],
        },
      ],
    },
    {
      id: "design",
      name: "Design",
      description: "Creating the visual design and user experience",
      duration: 10,
      icon: <Layers className="h-5 w-5" />,
      dependencies: ["discovery"],
      tasks: [
        {
          id: "wireframes",
          name: "Wireframing",
          description: "Creating low-fidelity layouts of key pages",
          duration: 3,
          deliverables: ["Wireframes for Key Pages", "Navigation Structure"],
        },
        {
          id: "ui-design",
          name: "UI Design",
          description: "Creating high-fidelity designs for all pages",
          duration: 5,
          deliverables: ["UI Design Files", "Style Guide"],
        },
        {
          id: "design-review",
          name: "Design Review & Revisions",
          description: "Reviewing designs and making necessary revisions",
          duration: 2,
          deliverables: ["Final Approved Designs"],
        },
      ],
    },
    {
      id: "development",
      name: "Development",
      description: "Building the website with the selected technologies",
      duration: 15,
      icon: <Code className="h-5 w-5" />,
      dependencies: ["design"],
      tasks: [
        {
          id: "frontend",
          name: "Frontend Development",
          description: "Building the user interface and client-side functionality",
          duration: 7,
          deliverables: ["Responsive Frontend", "Interactive Components"],
        },
        {
          id: "backend",
          name: "Backend Development",
          description: "Building server-side functionality and APIs",
          duration: 5,
          deliverables: ["API Endpoints", "Database Schema"],
        },
        {
          id: "integration",
          name: "Integration",
          description: "Connecting frontend and backend components",
          duration: 3,
          deliverables: ["Integrated Application"],
        },
      ],
    },
    {
      id: "testing",
      name: "Testing & QA",
      description: "Ensuring the website works correctly and is bug-free",
      duration: 5,
      icon: <Settings className="h-5 w-5" />,
      dependencies: ["development"],
      tasks: [
        {
          id: "functional-testing",
          name: "Functional Testing",
          description: "Testing all features and functionality",
          duration: 2,
          deliverables: ["Test Reports", "Bug Tracking Document"],
        },
        {
          id: "cross-browser",
          name: "Cross-browser & Responsive Testing",
          description: "Testing across different browsers and devices",
          duration: 1,
          deliverables: ["Compatibility Report"],
        },
        {
          id: "performance",
          name: "Performance Testing",
          description: "Testing website speed and performance",
          duration: 1,
          deliverables: ["Performance Metrics", "Optimization Recommendations"],
        },
        {
          id: "bug-fixing",
          name: "Bug Fixing",
          description: "Addressing issues found during testing",
          duration: 1,
          deliverables: ["Updated Codebase"],
        },
      ],
    },
    {
      id: "deployment",
      name: "Deployment",
      description: "Launching the website to production",
      duration: 3,
      icon: <Rocket className="h-5 w-5" />,
      dependencies: ["testing"],
      tasks: [
        {
          id: "staging",
          name: "Staging Deployment",
          description: "Deploying to a staging environment for final review",
          duration: 1,
          deliverables: ["Staging Environment URL"],
        },
        {
          id: "production",
          name: "Production Deployment",
          description: "Deploying to the production environment",
          duration: 1,
          deliverables: ["Live Website"],
        },
        {
          id: "dns-config",
          name: "DNS Configuration & SSL Setup",
          description: "Setting up domain and security certificates",
          duration: 1,
          deliverables: ["Configured Domain", "SSL Certificate"],
        },
      ],
    },
    {
      id: "post-launch",
      name: "Post-Launch Support",
      description: "Providing support and monitoring after launch",
      duration: 7,
      icon: <CheckCircle className="h-5 w-5" />,
      dependencies: ["deployment"],
      tasks: [
        {
          id: "monitoring",
          name: "Monitoring & Performance Tuning",
          description: "Monitoring website performance and making adjustments",
          duration: 3,
          deliverables: ["Performance Reports", "Optimization Updates"],
        },
        {
          id: "training",
          name: "Client Training",
          description: "Training client on how to use and maintain the website",
          duration: 2,
          deliverables: ["Training Sessions", "Documentation"],
        },
        {
          id: "support",
          name: "Initial Support Period",
          description: "Providing support for any issues that arise",
          duration: 2,
          deliverables: ["Support Tickets Resolution"],
        },
      ],
    },
  ]

  // Adjust timeline based on website type and features
  const adjustTimelineForWebsiteType = () => {
    const complexityMultiplier = getComplexityMultiplier()
    const additionalFeatureDays = calculateFeatureComplexity()

    // Clone the base timeline
    const adjustedTimeline = JSON.parse(JSON.stringify(baseTimelinePhases)) as TimelinePhase[]

    // Adjust development phase based on features
    const developmentPhase = adjustedTimeline.find((phase) => phase.id === "development")
    if (developmentPhase) {
      developmentPhase.duration = Math.round((developmentPhase.duration + additionalFeatureDays) * complexityMultiplier)

      // Adjust tasks within development
      developmentPhase.tasks.forEach((task) => {
        task.duration = Math.round(task.duration * complexityMultiplier)
      })
    }

    // Adjust testing phase based on complexity
    const testingPhase = adjustedTimeline.find((phase) => phase.id === "testing")
    if (testingPhase) {
      testingPhase.duration = Math.round(testingPhase.duration * complexityMultiplier)
    }

    // Special adjustments for e-commerce sites
    if (websiteType === "E-commerce" || selectedFeatures.includes("ecommerce")) {
      // Add payment integration task
      const developmentPhase = adjustedTimeline.find((phase) => phase.id === "development")
      if (developmentPhase) {
        developmentPhase.tasks.push({
          id: "payment",
          name: "Payment Gateway Integration",
          description: "Integrating and testing payment processing",
          duration: 5,
          deliverables: ["Payment Gateway Integration"],
        })
      }
    }

    return adjustedTimeline
  }

  const adjustedTimeline = adjustTimelineForWebsiteType()
  const totalDuration = adjustedTimeline.reduce((acc, phase) => acc + phase.duration, 0)

  const togglePhase = (id: string) => {
    if (expandedPhases.includes(id)) {
      setExpandedPhases(expandedPhases.filter((phaseId) => phaseId !== id))
    } else {
      setExpandedPhases([...expandedPhases, id])
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Development Timeline</CardTitle>
        <CardDescription>Estimated timeline for your {websiteType.toLowerCase()} website.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Progress
          value={
            (adjustedTimeline.reduce((acc, phase, index) => {
              if (
                index < adjustedTimeline.findIndex((phase) => expandedPhases.includes(phase.id)) ||
                !expandedPhases.includes(adjustedTimeline[0].id)
              ) {
                return acc + phase.duration
              } else if (expandedPhases.includes(phase.id)) {
                return acc
              }
              return acc
            }, 0) /
              totalDuration) *
            100
          }
        />
        {adjustedTimeline.map((phase) => (
          <Collapsible key={phase.id} className="w-full space-y-2" onOpenChange={() => togglePhase(phase.id)}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {phase.icon}
                <CardTitle className="text-sm">
                  {phase.name} ({phase.duration} days)
                </CardTitle>
              </div>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  {expandedPhases.includes(phase.id) ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </Button>
              </CollapsibleTrigger>
            </div>
            <CollapsibleContent className="pl-8">
              <CardDescription>{phase.description}</CardDescription>
              <Separator className="my-2" />
              <div className="space-y-2">
                {phase.tasks.map((task) => (
                  <div key={task.id} className="space-y-1">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xs">
                        {task.name} ({task.duration} days)
                      </CardTitle>
                      {task.deliverables && task.deliverables.length > 0 && (
                        <Badge variant="secondary">
                          {task.deliverables.length} Deliverable{task.deliverables.length > 1 ? "s" : ""}
                        </Badge>
                      )}
                    </div>
                    <CardDescription className="text-muted-foreground text-xs">{task.description}</CardDescription>
                    {task.deliverables && task.deliverables.length > 0 && (
                      <div className="mt-1">
                        <CardDescription className="text-muted-foreground text-xs">
                          Deliverables: {task.deliverables.join(", ")}
                        </CardDescription>
                      </div>
                    )}
                    <Separator className="my-2" />
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  )
}
