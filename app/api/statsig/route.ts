import { type NextRequest, NextResponse } from "next/server"
import { Statsig } from "statsig-node"

// Initialize Statsig on the server side
let initialized = false

const initializeStatsigServer = async () => {
  if (!initialized) {
    await Statsig.initialize(process.env.STATSIG_SERVER_API_KEY || "")
    initialized = true
  }
}

export async function POST(request: NextRequest) {
  try {
    await initializeStatsigServer()

    const { userId, gateName } = await request.json()

    if (!userId || !gateName) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const user = { userID: userId, custom: { userType: "website_visitor" } }
    const gateValue = await Statsig.checkGate(user, gateName)

    return NextResponse.json({ value: gateValue })
  } catch (error) {
    console.error("Statsig API error:", error)
    return NextResponse.json({ error: "Failed to check gate" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    await initializeStatsigServer()

    const searchParams = request.nextUrl.searchParams
    const userId = searchParams.get("userId")
    const configName = searchParams.get("configName")

    if (!userId || !configName) {
      return NextResponse.json({ error: "Missing required parameters" }, { status: 400 })
    }

    const user = { userID: userId, custom: { userType: "website_visitor" } }
    const config = await Statsig.getConfig(user, configName)

    return NextResponse.json({ config: config.value })
  } catch (error) {
    console.error("Statsig API error:", error)
    return NextResponse.json({ error: "Failed to get config" }, { status: 500 })
  }
}
