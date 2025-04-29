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
        background: "#0f172a", // Dark navy background matching the logo
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
          width: "80%",
        }}
      >
        {/* We can't directly use an external image in ImageResponse, so we'll use text */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              width: "100px",
              height: "240px",
              background: "#0f172a",
              boxShadow: "0 0 40px 5px #3b82f6",
              borderRadius: "30px",
            }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "80px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            <span>Standalone</span>
            <span>Coders</span>
          </div>
        </div>
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
