export const dynamic = "force-static"

export default function PasswordResetPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6">Reset Password</h1>
        <p className="text-center mb-8">
          Please contact support at support@standalonecoders.in to reset your password.
        </p>
        <div className="text-center">
          <a
            href="/auth/login"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back to Login
          </a>
        </div>
      </div>
    </div>
  )
}
