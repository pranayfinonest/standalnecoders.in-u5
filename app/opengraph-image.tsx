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
        background: "white",
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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontSize: "120px",
            fontWeight: "bold",
            textTransform: "uppercase",
          }}
        >
          <div style={{ display: "flex" }}>
            <span
              style={{
                color: "#dc2626", // red-600
                textShadow: `
                  0 1px 0 #ccc,
                  0 2px 0 #c9c9c9,
                  0 3px 0 #bbb,
                  0 4px 0 #b9b9b9,
                  0 5px 0 #aaa,
                  0 6px 1px rgba(0,0,0,.1),
                  0 0 5px rgba(0,0,0,.1),
                  0 1px 3px rgba(0,0,0,.3),
                  0 3px 5px rgba(0,0,0,.2),
                  0 5px 10px rgba(0,0,0,.25),
                  0 10px 10px rgba(0,0,0,.2),
                  0 20px 20px rgba(0,0,0,.15)
                `,
              }}
            >
              S
            </span>
            <span
              style={{
                color: "#2563eb", // blue-600
                textShadow: `
                  0 1px 0 #ccc,
                  0 2px 0 #c9c9c9,
                  0 3px 0 #bbb,
                  0 4px 0 #b9b9b9,
                  0 5px 0 #aaa,
                  0 6px 1px rgba(0,0,0,.1),
                  0 0 5px rgba(0,0,0,.1),
                  0 1px 3px rgba(0,0,0,.3),
                  0 3px 5px rgba(0,0,0,.2),
                  0 5px 10px rgba(0,0,0,.25),
                  0 10px 10px rgba(0,0,0,.2),
                  0 20px 20px rgba(0,0,0,.15)
                `,
              }}
            >
              tandalone
            </span>
          </div>
          <div style={{ display: "flex" }}>
            <span
              style={{
                color: "#dc2626", // red-600
                textShadow: `
                  0 1px 0 #ccc,
                  0 2px 0 #c9c9c9,
                  0 3px 0 #bbb,
                  0 4px 0 #b9b9b9,
                  0 5px 0 #aaa,
                  0 6px 1px rgba(0,0,0,.1),
                  0 0 5px rgba(0,0,0,.1),
                  0 1px 3px rgba(0,0,0,.3),
                  0 3px 5px rgba(0,0,0,.2),
                  0 5px 10px rgba(0,0,0,.25),
                  0 10px 10px rgba(0,0,0,.2),
                  0 20px 20px rgba(0,0,0,.15)
                `,
              }}
            >
              C
            </span>
            <span
              style={{
                color: "#111827", // gray-900
                textShadow: `
                  0 1px 0 #ccc,
                  0 2px 0 #c9c9c9,
                  0 3px 0 #bbb,
                  0 4px 0 #b9b9b9,
                  0 5px 0 #aaa,
                  0 6px 1px rgba(0,0,0,.1),
                  0 0 5px rgba(0,0,0,.1),
                  0 1px 3px rgba(0,0,0,.3),
                  0 3px 5px rgba(0,0,0,.2),
                  0 5px 10px rgba(0,0,0,.25),
                  0 10px 10px rgba(0,0,0,.2),
                  0 20px 20px rgba(0,0,0,.15)
                `,
              }}
            >
              oders
            </span>
          </div>
        </div>
      </div>
      <div
        style={{
          fontSize: "32px",
          textAlign: "center",
          maxWidth: "80%",
          marginTop: "20px",
          color: "#4b5563", // gray-600
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
