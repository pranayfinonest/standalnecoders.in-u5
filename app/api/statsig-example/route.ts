import { NextResponse } from "next/server"
import { Statsig } from "statsig-node"

let initialized = false

const initializeStatsig = async () => {
  if (!initialized) {
    await Statsig.initialize(process.env.STATSIG_SERVER_API_KEY || "")
    initialized = true
  }
}

export async function GET() {
  try {
    await initializeStatsig()

    const user = {
      userID: "server-user",
      custom: {
        userType: "api",
      },
    }

    const isFeatureEnabled = await Statsig.checkGate(user, "server_feature")
    const config = await Statsig.getConfig(user, "server_config")

    return NextResponse.json({
      isFeatureEnabled,
      config: config.value,
    })
  } catch (error) {
    console.error("Statsig API error:", error)
    return NextResponse.json({ error: "Failed to fetch Statsig data" }, { status: 500 })
  }
}
