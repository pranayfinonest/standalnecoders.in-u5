"use client"

import { useFeatureFlag, useDynamicConfig } from "@/utils/statsig"

export default function FeatureExample() {
  const { value: isFeatureEnabled, loading: flagLoading } = useFeatureFlag("new_feature", false)
  const { config, loading: configLoading } = useDynamicConfig("website_config")

  if (flagLoading || configLoading) {
    return <div>Loading feature flags...</div>
  }

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold mb-4">Feature Flag Example</h2>
      <p>New Feature Enabled: {isFeatureEnabled ? "Yes" : "No"}</p>
      <p>Config Value: {JSON.stringify(config)}</p>
    </div>
  )
}
