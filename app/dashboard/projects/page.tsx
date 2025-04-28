import type { Metadata } from "next"
import ProjectsList from "@/components/dashboard/projects-list"

export const metadata: Metadata = {
  title: "Your Projects | Dashboard",
  description: "View and manage your website development projects.",
}

export default function ProjectsPage() {
  return <ProjectsList />
}
