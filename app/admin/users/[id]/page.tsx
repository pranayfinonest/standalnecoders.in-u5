import AdminLayout from "@/components/admin/admin-layout"
import AdminUserDetail from "@/components/admin/admin-user-detail"

export default function UserDetailPage({ params }: { params: { id: string } }) {
  return (
    <AdminLayout>
      <AdminUserDetail userId={params.id} />
    </AdminLayout>
  )
}
