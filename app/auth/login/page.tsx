import LoginForm from "@/components/auth/login-form"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "Login | StandaloneCoders",
  description: "Login to your StandaloneCoders account to manage your website projects.",
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Login to Your Account</h1>
            <LoginForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
