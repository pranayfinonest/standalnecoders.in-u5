import AdminLayout from "@/components/admin/admin-layout"
import AdminOrderDetail from "@/components/admin/admin-order-detail"

export const metadata = {
  title: "Order Details | StandaloneCoders Admin",
  description: "View and manage order details in the admin panel.",
}

export default function AdminOrderDetailPage({ params }) {
  const orderId = params.id

  return (
    <AdminLayout>
      <AdminOrderDetail orderId={orderId} />
    </AdminLayout>
  )
}
