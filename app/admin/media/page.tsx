import type { Metadata } from "next"
import MediaManagement from "@/components/admin/media-management"

export const metadata: Metadata = {
  title: "Media Library | Admin Dashboard",
  description: "Upload and manage website images and media files",
}

export default function MediaPage() {
  return <MediaManagement />
}
