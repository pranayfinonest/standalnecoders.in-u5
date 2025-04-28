import AdminLayout from "@/components/admin/admin-layout"
import OrderManagement from "@/components/admin/order-management"

export const metadata = {
  title: "Order Management | StandaloneCoders Admin",
  description: "Manage orders of StandaloneCoders website.",
}

export default function OrdersPage() {
  return (
    <AdminLayout>
      <OrderManagement />
    </AdminLayout>
  )
}
