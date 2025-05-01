import WebsiteCustomization from "@/components/admin/website-customization"
import { requireAdmin } from "@/app/actions/admin"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Website Customization | Admin Dashboard",
  description: "Customize website appearance and content",
}

export default async function CustomizePage() {
  // This will redirect if not admin
  await requireAdmin()

  return <WebsiteCustomization />
}
