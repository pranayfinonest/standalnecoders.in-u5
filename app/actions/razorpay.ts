"use server"

export async function getRazorpayKey() {
  // Return the key from server-side
  return {
    keyId: process.env.RAZORPAY_KEY_ID || "rzp_test_yourkeyhere",
  }
}
