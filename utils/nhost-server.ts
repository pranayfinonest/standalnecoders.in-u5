import { cookies } from "next/headers"
import { NhostClient } from "@nhost/nhost-js"

export function getServerNhost() {
  return new NhostClient({
    backendUrl: process.env.NEXT_PUBLIC_NHOST_BACKEND_URL ?? "",
    clientStorageType: "cookie",
    clientStorage: {
      setItem: (key, value) => cookies().set(key, value),
      getItem: (key) => cookies().get(key)?.value ?? null,
      removeItem: (key) => cookies().delete(key),
    },
  })
}
