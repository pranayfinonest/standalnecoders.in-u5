import AdminSetup from "@/components/admin/admin-setup"

export const dynamic = "force-dynamic"

export default function SetupPage() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">StandaloneCoders Admin Setup</h1>
      <AdminSetup />
      <p className="mt-8 text-sm text-gray-500 text-center">
        This page is only accessible during initial setup. Once an admin user is created, you should secure this route.
      </p>
    </div>
  )
}
