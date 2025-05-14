"use client"

import { useState, useEffect } from "react"

export default function QueryComponent() {
  const [referralCode, setReferralCode] = useState("")

  useEffect(() => {
    // Get referral code from URL
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("ref") || ""
    setReferralCode(code)
  }, [])

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
