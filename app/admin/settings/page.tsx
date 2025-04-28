import AdminLayout from "@/components/admin/admin-layout"
import AdminSettings from "@/components/admin/admin-settings"

export const metadata = {
  title: "Admin Settings | StandaloneCoders Admin",
  description: "Configure admin settings for StandaloneCoders website.",
}

export default function SettingsPage() {
  return (
    <AdminLayout>
      <AdminSettings />
    </AdminLayout>
  )
}
