import { NextResponse } from "next/server"
import { specialOffers } from "@/data/special-offers"

export async function GET() {
  try {
    // In a real application, this would fetch from a database or CMS
    // For now, we're using the static data but in a production app
    // you would replace this with a database or CMS query

    return NextResponse.json({
      offers: specialOffers,
      success: true,
    })
  } catch (error) {
    return NextResponse.json({ success: false, error: "Failed to fetch offers" }, { status: 500 })
  }
}
