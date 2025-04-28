import OrderDetails from "@/components/booking/order-details"

export default function OrderDetailsPage({ params }: { params: { id: string } }) {
  return <OrderDetails orderId={params.id} />
}
