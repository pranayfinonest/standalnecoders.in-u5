import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const alt = "StandaloneCoders.in - Cybersecurity, AI & Digital Solutions"
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = "image/png"

// Image generation
export default async function Image() {
  return new ImageResponse(
    // ImageResponse JSX element
    <div
      style={{
        fontSize: 128,
        background: "linear-gradient(to bottom, #1e3a8a, #1e40af)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        padding: "40px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <span
          style={{
            background: "linear-gradient(to right, #60a5fa, #3b82f6)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            fontWeight: "bold",
          }}
        >
          Standalone
        </span>
        <span style={{ color: "white" }}>Coders</span>
      </div>
      <div
        style={{
          fontSize: "32px",
          textAlign: "center",
          maxWidth: "80%",
          marginTop: "20px",
        }}
      >
        Cybersecurity, AI & Digital Solutions
      </div>
    </div>,
    // ImageResponse options
    {
      ...size,
    },
  )
}
