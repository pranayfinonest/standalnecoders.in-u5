import type { Metadata } from "next"
import WebsiteCustomization from "@/components/admin/website-customization"

export const metadata: Metadata = {
  title: "Website Customization | Admin Dashboard",
  description: "Customize website appearance and content",
}

export default function CustomizePage() {
  return <WebsiteCustomization />
}
