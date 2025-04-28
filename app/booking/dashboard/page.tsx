import UserDashboard from "@/components/booking/user-dashboard"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "User Dashboard | StandaloneCoders",
  description: "Manage your website projects and account settings.",
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main>
        <UserDashboard />
      </main>
      <Footer />
    </div>
  )
}
