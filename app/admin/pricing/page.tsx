import type { Metadata } from "next"
import PricingManagement from "@/components/admin/pricing-management"

export const metadata: Metadata = {
  title: "Pricing Management | Admin Dashboard",
  description: "Configure service pricing and packages",
}

export default function PricingPage() {
  return <PricingManagement />
}
