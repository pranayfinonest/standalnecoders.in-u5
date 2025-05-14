"use client"

import { useSearchParams } from "next/navigation"

export default function QueryComponent() {
  // This is the problematic hook that needs to be in a client component
  // and wrapped in a Suspense boundary in the parent
  const searchParams = useSearchParams()
  const referralCode = searchParams.get("ref") || ""

  return (
    <div>
      {referralCode ? (
        <p>
          Referral Code: <strong>{referralCode}</strong>
        </p>
      ) : (
        <p>No referral code found.</p>
      )}
    </div>
  )
}
