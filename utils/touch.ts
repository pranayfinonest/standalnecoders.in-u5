"use client"

import type React from "react"

import { useState, useEffect } from "react"

interface TouchPosition {
  x: number
  y: number
}

interface SwipeDirection {
  horizontal: "left" | "right" | null
  vertical: "up" | "down" | null
}

interface UseSwipeOptions {
  threshold?: number
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
}

export function useSwipe(options: UseSwipeOptions = {}) {
  const { threshold = 50, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown } = options

  const [touchStart, setTouchStart] = useState<TouchPosition | null>(null)
  const [touchEnd, setTouchEnd] = useState<TouchPosition | null>(null)
  const [swipeDirection, setSwipeDirection] = useState<SwipeDirection>({
    horizontal: null,
    vertical: null,
  })

  // Reset swipe direction when touch starts
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
    setSwipeDirection({ horizontal: null, vertical: null })
  }

  // Update touch end position
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    })
  }

  // Calculate swipe direction when touch ends
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const horizontalDistance = touchStart.x - touchEnd.x
    const verticalDistance = touchStart.y - touchEnd.y

    // Determine horizontal swipe
    if (Math.abs(horizontalDistance) > threshold) {
      const direction = horizontalDistance > 0 ? "left" : "right"
      setSwipeDirection((prev) => ({ ...prev, horizontal: direction }))

      if (direction === "left" && onSwipeLeft) {
        onSwipeLeft()
      } else if (direction === "right" && onSwipeRight) {
        onSwipeRight()
      }
    }

    // Determine vertical swipe
    if (Math.abs(verticalDistance) > threshold) {
      const direction = verticalDistance > 0 ? "up" : "down"
      setSwipeDirection((prev) => ({ ...prev, vertical: direction }))

      if (direction === "up" && onSwipeUp) {
        onSwipeUp()
      } else if (direction === "down" && onSwipeDown) {
        onSwipeDown()
      }
    }

    // Reset touch positions
    setTouchStart(null)
    setTouchEnd(null)
  }

  return {
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
    swipeDirection,
  }
}

// Detect if device supports touch
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    setIsTouch("ontouchstart" in window || navigator.maxTouchPoints > 0 || (navigator as any).msMaxTouchPoints > 0)
  }, [])

  return isTouch
}
