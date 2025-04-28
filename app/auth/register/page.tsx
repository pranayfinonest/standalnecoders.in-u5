import RegisterForm from "@/components/auth/register-form"
import Header from "@/components/header"
import Footer from "@/components/footer"

export const metadata = {
  title: "Register | StandaloneCoders",
  description: "Create a new account with StandaloneCoders to start booking your website project.",
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Header />
      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-center mb-8">Create an Account</h1>
            <RegisterForm />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
