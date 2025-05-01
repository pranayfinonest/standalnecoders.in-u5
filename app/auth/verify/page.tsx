import OtpVerificationForm from "@/components/auth/otp-verification-form"

export const metadata = {
  title: "Verify Email - StandaloneCoders",
  description: "Verify your email address to complete your registration",
}

export default function VerifyPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <OtpVerificationForm />
      </div>
    </div>
  )
}
